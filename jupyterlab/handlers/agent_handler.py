"""Web tools for the Pretzel chat agent: search the web, and read a page.

# Copyright (c) Pretzel AI GmbH.
# This file is part of the Pretzel project and is licensed under the
# GNU Affero General Public License version 3.
# See the LICENSE_AGPLv3 file at the root of the project for the full license text.

The browser can't call search engines or arbitrary sites directly (no CORS headers), so the
frontend posts here and the server makes the request. Two endpoints:

``POST /lab/api/agent/search``  {"query", "max_results", "provider", "api_key"}
    -> {"results": [{"title", "url", "snippet"}], "provider": "..."}

``POST /lab/api/agent/fetch``   {"url", "max_chars"}
    -> {"url", "title", "text", "truncated"}

Search defaults to DuckDuckGo, which needs no account and costs nothing. A key for a paid
search API can be passed per request, and is used instead when present.
"""

import asyncio
import ipaddress
import re
import socket
from urllib.parse import parse_qs, unquote, urlparse

import httpx
from bs4 import BeautifulSoup
from jupyter_server.base.handlers import APIHandler
from tornado import web

# Sites are slow and the agent waits on them, so keep these short enough to fail fast
AGENT_TIMEOUT = httpx.Timeout(10.0, read=25.0)

# A page can be enormous; the model only needs the readable part of it
DEFAULT_MAX_CHARS = 8000
HARD_MAX_CHARS = 40000
MAX_DOWNLOAD_BYTES = 5_000_000

DEFAULT_MAX_RESULTS = 5
HARD_MAX_RESULTS = 15

# Identify ourselves rather than pretending to be a browser
USER_AGENT = "Mozilla/5.0 (compatible; PretzelAgent/1.0; +https://github.com/pretzelai/pretzelai)"

# Page furniture that carries no content
STRIP_TAGS = ("script", "style", "noscript", "nav", "header", "footer", "aside", "form", "svg")

agent_search_handler_path = r"/lab/api/agent/search"
agent_fetch_handler_path = r"/lab/api/agent/fetch"


def _is_public_url(url: str) -> bool:
    """Reject anything that isn't a public http(s) address.

    The agent picks these URLs while reading web pages, so a hostile page could try to make it
    fetch something on this machine or the local network. Resolving the name first also blocks
    a public name that points at a private address.
    """
    parsed = urlparse(url)
    if parsed.scheme not in ("http", "https") or not parsed.hostname:
        return False
    try:
        infos = socket.getaddrinfo(parsed.hostname, None)
    except socket.gaierror:
        return False
    for info in infos:
        try:
            address = ipaddress.ip_address(info[4][0])
        except ValueError:
            return False
        if not address.is_global or address.is_multicast:
            return False
    return True


def _clean_text(text: str) -> str:
    text = re.sub(r"[ \t\r\f\v]+", " ", text)
    text = re.sub(r"\n\s*\n\s*\n+", "\n\n", text)
    return text.strip()


def _unwrap_duckduckgo_link(href: str) -> str:
    """DuckDuckGo wraps results as /l/?uddg=<encoded target>; give back the real URL."""
    if not href:
        return ""
    if href.startswith("//"):
        href = f"https:{href}"
    parsed = urlparse(href)
    if parsed.path.startswith("/l/"):
        target = parse_qs(parsed.query).get("uddg")
        if target:
            return unquote(target[0])
    return href


async def _duckduckgo_search(query: str, max_results: int) -> list:
    """Search with DuckDuckGo's HTML endpoint. No account, no key, no cost."""
    async with httpx.AsyncClient(timeout=AGENT_TIMEOUT, follow_redirects=True) as client:
        response = await client.post(
            "https://html.duckduckgo.com/html/",
            data={"q": query},
            headers={"User-Agent": USER_AGENT, "Content-Type": "application/x-www-form-urlencoded"},
        )
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")
    results = []
    for node in soup.select("div.result, div.web-result"):
        link = node.select_one("a.result__a")
        if not link:
            continue
        url = _unwrap_duckduckgo_link(link.get("href", ""))
        if not url.startswith("http"):
            continue
        snippet = node.select_one(".result__snippet")
        results.append(
            {
                "title": _clean_text(link.get_text()),
                "url": url,
                "snippet": _clean_text(snippet.get_text()) if snippet else "",
            }
        )
        if len(results) >= max_results:
            break
    return results


async def _tavily_search(query: str, max_results: int, api_key: str) -> list:
    async with httpx.AsyncClient(timeout=AGENT_TIMEOUT) as client:
        response = await client.post(
            "https://api.tavily.com/search",
            json={"query": query, "max_results": max_results},
            headers={"Authorization": f"Bearer {api_key}"},
        )
    response.raise_for_status()
    return [
        {
            "title": r.get("title", ""),
            "url": r.get("url", ""),
            "snippet": _clean_text(r.get("content", "")),
        }
        for r in response.json().get("results", [])[:max_results]
    ]


async def _parallel_search(query: str, max_results: int, api_key: str) -> list:
    async with httpx.AsyncClient(timeout=AGENT_TIMEOUT) as client:
        response = await client.post(
            "https://api.parallel.ai/v1beta/search",
            json={"objective": query, "search_queries": [query], "max_results": max_results},
            headers={"x-api-key": api_key, "Content-Type": "application/json"},
        )
    response.raise_for_status()
    results = []
    for r in response.json().get("results", [])[:max_results]:
        excerpts = r.get("excerpts") or []
        results.append(
            {
                "title": r.get("title", ""),
                "url": r.get("url", ""),
                "snippet": _clean_text(" ".join(excerpts)[:1000]),
            }
        )
    return results


class AgentSearchHandler(APIHandler):
    """Run a web search and return the top results as plain data."""

    @web.authenticated
    async def post(self) -> None:
        body = self.get_json_body() or {}
        query = (body.get("query") or "").strip()
        if not query:
            raise web.HTTPError(400, "A search query is required")
        max_results = max(
            1, min(int(body.get("max_results") or DEFAULT_MAX_RESULTS), HARD_MAX_RESULTS)
        )
        api_key = (body.get("api_key") or "").strip()
        provider = (body.get("provider") or ("duckduckgo" if not api_key else "tavily")).lower()

        try:
            if provider == "tavily" and api_key:
                results = await _tavily_search(query, max_results, api_key)
            elif provider == "parallel" and api_key:
                results = await _parallel_search(query, max_results, api_key)
            else:
                provider = "duckduckgo"
                results = await _duckduckgo_search(query, max_results)
        except httpx.HTTPStatusError as e:
            status = e.response.status_code
            if status in (429, 403):
                raise web.HTTPError(
                    429, f"{provider} is rate limiting searches; try again shortly"
                ) from e
            raise web.HTTPError(502, f"{provider} returned an error ({status})") from e
        except (httpx.HTTPError, asyncio.TimeoutError) as e:
            raise web.HTTPError(502, f"Couldn't reach {provider}: {e}") from e

        self.finish({"provider": provider, "query": query, "results": results})


async def _read_page(url: str, max_chars: int) -> dict:
    """Download one page and return its readable text, stripped of markup and page furniture."""
    async with httpx.AsyncClient(timeout=AGENT_TIMEOUT, follow_redirects=True) as client:
        response = await client.get(url, headers={"User-Agent": USER_AGENT})
        response.raise_for_status()
        content_type = response.headers.get("Content-Type", "")
        raw = response.content[:MAX_DOWNLOAD_BYTES]

    if "html" in content_type:
        soup = BeautifulSoup(raw, "html.parser")
        for tag in soup(list(STRIP_TAGS)):
            tag.decompose()
        title = _clean_text(soup.title.get_text()) if soup.title else ""
        # Most documentation and article pages mark their content; using it drops menus,
        # sidebars and cookie notices, which would otherwise eat the character budget
        main = soup.find("main") or soup.find("article") or soup.find(attrs={"role": "main"})
        text = _clean_text((main or soup).get_text("\n"))
    else:
        title = ""
        text = _clean_text(raw.decode("utf-8", errors="replace"))

    return {
        "url": str(response.url),
        "title": title,
        "text": text[:max_chars],
        "truncated": len(text) > max_chars,
    }


class AgentFetchHandler(APIHandler):
    """Download one page and return its readable text."""

    @web.authenticated
    async def post(self) -> None:
        body = self.get_json_body() or {}
        url = (body.get("url") or "").strip()
        max_chars = max(500, min(int(body.get("max_chars") or DEFAULT_MAX_CHARS), HARD_MAX_CHARS))

        if not _is_public_url(url):
            raise web.HTTPError(400, "Only public http(s) addresses can be read")

        try:
            page = await _read_page(url, max_chars)
        except httpx.HTTPStatusError as e:
            raise web.HTTPError(
                502, f"The page returned an error ({e.response.status_code})"
            ) from e
        except (httpx.HTTPError, asyncio.TimeoutError) as e:
            raise web.HTTPError(502, f"Couldn't read that page: {e}") from e

        self.finish(page)
