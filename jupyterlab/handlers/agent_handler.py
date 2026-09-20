"""Server endpoints for the chat agent's tools.

# Copyright (c) Pretzel AI GmbH.
# This file is part of the Pretzel project and is licensed under the
# GNU Affero General Public License version 3.
# See the LICENSE_AGPLv3 file at the root of the project for the full license text.

The browser cannot call search engines or most websites itself (no CORS headers), so the frontend
posts here and the server makes the request. Which sources answer which question is decided in
agent_sources.py.

``POST /lab/api/agent/search``  {"query", "max_results", "provider", "api_key"}
    -> {"results": [{"title", "url", "snippet"}], "sources": [...], "notes": [...]}

``POST /lab/api/agent/fetch``   {"url", "max_chars", "query"}
    -> {"url", "title", "text", "truncated"}

``POST /lab/api/agent/github``  {"action": "repo" | "file" | "search_code", ...}
    -> the repository, one of its files, or code search results
"""

import asyncio
import ipaddress
import socket
from urllib.parse import urlparse

from jupyter_server.base.handlers import APIHandler
from tornado import web

from .agent_sources import (
    SourceBlockedError,
    SourceError,
    github_file,
    github_repo,
    github_search_code,
    parse_github_target,
    read_page,
    search_everything,
)

DEFAULT_MAX_CHARS = 8000
HARD_MAX_CHARS = 40000
DEFAULT_MAX_RESULTS = 5
HARD_MAX_RESULTS = 15

agent_search_handler_path = r"/lab/api/agent/search"
agent_fetch_handler_path = r"/lab/api/agent/fetch"
agent_github_handler_path = r"/lab/api/agent/github"


def _is_public_url(url: str) -> bool:
    """Reject anything that isn't a public http(s) address.

    The agent chooses these URLs while reading web pages, so a hostile page could try to make it
    fetch something on this machine or the local network. Resolving the name first also blocks a
    public name that points at a private address.
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


def _fail(error: Exception) -> web.HTTPError:
    """Blocked sources are reported as 429 so the agent can say "I was turned away", not "nothing found"."""
    if isinstance(error, SourceBlockedError):
        return web.HTTPError(429, str(error))
    if isinstance(error, SourceError):
        return web.HTTPError(502, str(error))
    return web.HTTPError(502, f"The tool failed: {error}")


class AgentSearchHandler(APIHandler):
    """Search the web and the places that answer better than the web."""

    @web.authenticated
    async def post(self) -> None:
        body = self.get_json_body() or {}
        query = (body.get("query") or "").strip()
        if not query:
            raise web.HTTPError(400, "A search query is required")
        max_results = max(
            1, min(int(body.get("max_results") or DEFAULT_MAX_RESULTS), HARD_MAX_RESULTS)
        )

        try:
            found = await search_everything(
                query,
                max_results,
                provider=(body.get("provider") or "").lower(),
                api_key=(body.get("api_key") or "").strip(),
            )
        except (SourceError, asyncio.TimeoutError) as e:
            raise _fail(e) from e

        # Every source refused: that is a failure, not an empty result set
        if not found["results"] and found["notes"] and not found["sources"]:
            raise web.HTTPError(429, "; ".join(found["notes"])[:400])

        self.finish({"query": query, **found})


class AgentFetchHandler(APIHandler):
    """Read one page, keeping the part that matches the question."""

    @web.authenticated
    async def post(self) -> None:
        body = self.get_json_body() or {}
        url = (body.get("url") or "").strip()
        query = (body.get("query") or "").strip()
        max_chars = max(500, min(int(body.get("max_chars") or DEFAULT_MAX_CHARS), HARD_MAX_CHARS))

        if not _is_public_url(url):
            raise web.HTTPError(400, "Only public http(s) addresses can be read")

        try:
            self.finish(await read_page(url, max_chars, query))
        except (SourceError, asyncio.TimeoutError) as e:
            raise _fail(e) from e


class AgentGithubHandler(APIHandler):
    """Look inside a repository: what it is, what files it has, and what they contain."""

    @web.authenticated
    async def post(self) -> None:
        body = self.get_json_body() or {}
        action = (body.get("action") or "repo").lower()
        repo = (body.get("repo") or "").strip()

        try:
            if action == "search_code":
                query = (body.get("query") or "").strip()
                if not query:
                    raise web.HTTPError(400, "A search query is required")
                results = await github_search_code(query, int(body.get("max_results") or 5))
                self.finish({"results": results})
                return

            target = parse_github_target(repo)
            if not target:
                raise web.HTTPError(
                    400, 'Give the repository as "owner/name" or its github.com URL'
                )
            owner, name, path_from_url = target

            if action == "file":
                path = (body.get("path") or path_from_url).strip()
                if not path:
                    raise web.HTTPError(400, "A file path is required")
                content = await github_file(owner, name, path, (body.get("ref") or "").strip())
                self.finish(
                    {"repo": f"{owner}/{name}", "path": path, "content": content[:HARD_MAX_CHARS]}
                )
                return

            self.finish(await github_repo(owner, name))
        except web.HTTPError:
            raise
        except (SourceError, asyncio.TimeoutError) as e:
            raise _fail(e) from e
