"""Where the chat agent gets information from, and how it picks the right source.

# Copyright (c) Pretzel AI GmbH.
# This file is part of the Pretzel project and is licensed under the
# GNU Affero General Public License version 3.
# See the LICENSE_AGPLv3 file at the root of the project for the full license text.

A single scraped search engine is not enough: free engines throttle and start serving captchas,
and a search result page is a poor way to answer "what is in this repository" or "which version of
this package is current". So each question goes to the source that can actually answer it:

    GitHub        repositories, their files and their READMEs, through the GitHub API
    PyPI          Python package versions and summaries
    Stack Overflow  programming questions, through the Stack Exchange API
    Wikipedia     background on a topic
    the web       everything else, through DuckDuckGo or a paid search API if a key is set

All of these work without an account. GitHub is used with the local `gh` CLI's token when there is
one, which raises the rate limit and makes the user's private repositories readable.

Blocked or throttled responses are reported as failures, never as "no results found": the agent
must be able to tell "I could not search" from "there is nothing there".
"""

import asyncio
import html
import os
import re
import shutil
import subprocess
from urllib.parse import parse_qs, unquote, urlparse

import httpx
from bs4 import BeautifulSoup

# Sites are slow and the agent waits on them, so fail fast rather than hang
SOURCE_TIMEOUT = httpx.Timeout(10.0, read=25.0)

# Wikipedia and GitHub ask that tools identify themselves; browsers' user agents get refused
USER_AGENT = "PretzelAgent/1.0 (Jupyter AI assistant; +https://github.com/pretzelai/pretzelai)"

GITHUB_API = "https://api.github.com"

# HTTP statuses these sources use to mean something specific
HTTP_BAD_REQUEST = 400
HTTP_UNAUTHORIZED = 401
HTTP_FORBIDDEN = 403
HTTP_NOT_FOUND = 404
HTTP_TOO_MANY_REQUESTS = 429
HTTP_THROTTLE_STATUSES = (202, HTTP_FORBIDDEN, HTTP_TOO_MANY_REQUESTS)

# A challenge page is short; a real result page is not
SHORT_ENOUGH_TO_BE_A_CHALLENGE = 20000
MAX_DOWNLOAD_BYTES = 5_000_000


class SourceError(Exception):
    """A source could not be reached, or refused to answer. Distinct from "no results"."""


class SourceBlockedError(SourceError):
    """A source is throttling or challenging us. Worth reporting as such, and worth backing off."""


def _clean(text: str) -> str:
    text = html.unescape(text)
    text = re.sub(r"[ \t\r\f\v]+", " ", text)
    text = re.sub(r"\n\s*\n\s*\n+", "\n\n", text)
    return text.strip()


def _client(**kwargs) -> httpx.AsyncClient:
    headers = {"User-Agent": USER_AGENT, **kwargs.pop("headers", {})}
    return httpx.AsyncClient(
        timeout=SOURCE_TIMEOUT, follow_redirects=True, headers=headers, **kwargs
    )


# --------------------------------------------------------------------------------------
# GitHub
# --------------------------------------------------------------------------------------

_github_token_cache: list = []


def github_token() -> str:
    """The local GitHub token, if there is one.

    Checked in order: GITHUB_TOKEN, GH_TOKEN, then the `gh` CLI's stored token. Without a token
    the API allows 60 requests an hour and only public data; with one, 5000 an hour and whatever
    the user themselves can see. The token is only ever sent to api.github.com.
    """
    if _github_token_cache:
        return _github_token_cache[0]

    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN") or ""
    gh_path = shutil.which("gh")
    if not token and gh_path:
        try:
            # The gh CLI, found on PATH, with fixed arguments and no user input
            result = subprocess.run(
                [gh_path, "auth", "token"],
                capture_output=True,
                text=True,
                timeout=5,
                check=False,
            )
            token = result.stdout.strip() if result.returncode == 0 else ""
        except (subprocess.SubprocessError, OSError):
            token = ""
    _github_token_cache.append(token)
    return token


async def _github_api(path: str, params: dict | None = None, raw: bool = False):
    token = github_token()
    headers = {"Accept": "application/vnd.github.raw" if raw else "application/vnd.github+json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"

    async with _client(headers=headers) as client:
        try:
            response = await client.get(f"{GITHUB_API}{path}", params=params)
        except httpx.HTTPError as e:
            msg = f"Couldn't reach GitHub: {e}"
            raise SourceError(msg) from e

    if (
        response.status_code == HTTP_FORBIDDEN
        and response.headers.get("x-ratelimit-remaining") == "0"
    ):
        msg = (
            "GitHub's rate limit is used up. It resets within the hour; "
            "signing in with `gh auth login` raises the limit a lot."
        )
        raise SourceBlockedError(msg)
    if response.status_code == HTTP_NOT_FOUND:
        msg = "Not found on GitHub (it may be private, renamed or deleted)"
        raise SourceError(msg)
    if response.status_code >= HTTP_BAD_REQUEST:
        msg = f"GitHub returned an error ({response.status_code})"
        raise SourceError(msg)
    return response.text if raw else response.json()


# github.com/<owner>/<repo>, and with a file: github.com/<owner>/<repo>/blob/<ref>/<path>
_OWNER_AND_REPO = 2
_BEFORE_FILE_PATH = 4


def parse_github_target(text: str) -> tuple[str, str, str] | None:
    """Pull "owner/repo" (and any file path) out of a URL or a plain "owner/repo" string."""
    text = text.strip()
    if text.startswith("http"):
        parsed = urlparse(text)
        if "github.com" not in parsed.netloc:
            return None
        parts = [p for p in parsed.path.split("/") if p]
        if len(parts) < _OWNER_AND_REPO:
            return None
        owner, repo = parts[0], parts[1].removesuffix(".git")
        # /blob/<ref>/<path...> and /tree/<ref>/<path...>
        is_file = len(parts) > _BEFORE_FILE_PATH and parts[2] in ("blob", "tree")
        path = "/".join(parts[_BEFORE_FILE_PATH:]) if is_file else ""
        return owner, repo, path

    match = re.fullmatch(r"([\w.-]+)/([\w.-]+?)(?:\.git)?", text)
    return (match.group(1), match.group(2), "") if match else None


async def github_repo(
    owner: str, repo: str, want_readme: bool = True, want_files: bool = True
) -> dict:
    """Everything worth knowing about a repository at a glance."""
    info = await _github_api(f"/repos/{owner}/{repo}")
    out = {
        "full_name": info.get("full_name"),
        "url": info.get("html_url"),
        "description": info.get("description") or "",
        "language": info.get("language") or "",
        "topics": info.get("topics") or [],
        "stars": info.get("stargazers_count", 0),
        "default_branch": info.get("default_branch", "main"),
        "updated": (info.get("pushed_at") or "")[:10],
        "private": info.get("private", False),
        "license": (info.get("license") or {}).get("spdx_id") or "",
    }

    if want_readme:
        try:
            out["readme"] = _clean(await _github_api(f"/repos/{owner}/{repo}/readme", raw=True))
        except SourceError:
            out["readme"] = ""

    if want_files:
        try:
            tree = await _github_api(
                f"/repos/{owner}/{repo}/git/trees/{out['default_branch']}", {"recursive": "1"}
            )
            out["files"] = [
                node["path"] for node in tree.get("tree", []) if node.get("type") == "blob"
            ][:300]
            out["files_truncated"] = bool(tree.get("truncated"))
        except SourceError:
            out["files"] = []
    return out


async def github_file(owner: str, repo: str, path: str, ref: str = "") -> str:
    params = {"ref": ref} if ref else None
    return await _github_api(f"/repos/{owner}/{repo}/contents/{path}", params, raw=True)


def _github_terms(query: str) -> list:
    """Ways to ask GitHub about a query, best first.

    GitHub matches a repository's name and description, not its owner's username, so
    "varadarajjborkar hisaabhkitaabh" finds nothing while "hisaabhkitaabh" finds the repository.
    Each single word is therefore worth trying on its own, longest first.
    """
    noise = {
        "github",
        "repo",
        "repos",
        "repository",
        "the",
        "for",
        "and",
        "search",
        "find",
        "code",
        "project",
        "look",
        "into",
        "about",
        "from",
        "user",
        "profile",
        "account",
        "com",
    }
    tokens = [t for t in re.findall(r"[\w.-]{3,}", query) if t.lower() not in noise]
    if not tokens:
        return []
    attempts = [" ".join(tokens)] if len(tokens) > 1 else []
    attempts += [f"{t} in:name" for t in sorted(set(tokens), key=len, reverse=True)[:3]]
    return attempts


async def github_search_repos(query: str, limit: int) -> list:
    """Find repositories. Several phrasings are tried, because one word often finds what the
    whole phrase does not."""
    wanted = {t.lower() for t in re.findall(r"[\w.-]{3,}", query)}
    found: dict = {}
    for attempt in _github_terms(query) or [query]:
        data = await _github_api("/search/repositories", {"q": attempt, "per_page": min(limit, 20)})
        for item in data.get("items", []):
            found.setdefault(item["full_name"], item)
        if len(found) >= limit * 3:
            break

    def rank(item):
        owner, _, name = item["full_name"].lower().partition("/")
        named = name in wanted and name != owner  # the repository the query actually named
        profile = name == owner  # someone's profile repository, rarely the answer
        return (
            0 if named else 2 if profile else 1 if owner in wanted else 3,
            -item.get("stargazers_count", 0),
        )

    return [
        {
            "title": item["full_name"],
            "url": item["html_url"],
            "snippet": _clean(
                f"{item.get('description') or 'No description'} "
                f"({item.get('stargazers_count', 0)} stars, "
                f"{item.get('language') or 'no language set'})"
            ),
        }
        for item in sorted(found.values(), key=rank)[:limit]
    ]


async def github_search_code(query: str, limit: int) -> list:
    """Search inside repositories. Needs a token; without one GitHub refuses code search."""
    if not github_token():
        msg = "Searching code inside repositories needs a GitHub login (`gh auth login`)"
        raise SourceError(msg)
    data = await _github_api("/search/code", {"q": query, "per_page": min(limit, 20)})
    return [
        {
            "title": f"{item['repository']['full_name']}: {item['path']}",
            "url": item["html_url"],
            "snippet": "",
        }
        for item in data.get("items", [])[:limit]
    ]


# --------------------------------------------------------------------------------------
# Other sources that answer better than a search engine
# --------------------------------------------------------------------------------------


async def pypi_package(name: str) -> dict | None:
    async with _client() as client:
        try:
            response = await client.get(f"https://pypi.org/pypi/{name}/json")
        except httpx.HTTPError as e:
            msg = f"Couldn't reach PyPI: {e}"
            raise SourceError(msg) from e
    if response.status_code == HTTP_NOT_FOUND:
        return None
    if response.status_code >= HTTP_BAD_REQUEST:
        msg = f"PyPI returned an error ({response.status_code})"
        raise SourceError(msg)

    info = response.json().get("info", {})
    return {
        "name": info.get("name"),
        "version": info.get("version"),
        "summary": info.get("summary") or "",
        "requires_python": info.get("requires_python") or "",
        "home_page": info.get("project_url") or info.get("home_page") or "",
        "url": f"https://pypi.org/project/{info.get('name')}/",
    }


async def stackoverflow_search(query: str, limit: int) -> list:
    async with _client() as client:
        try:
            response = await client.get(
                "https://api.stackexchange.com/2.3/search/advanced",
                params={
                    "order": "desc",
                    "sort": "relevance",
                    "q": query,
                    "site": "stackoverflow",
                    "filter": "withbody",
                    "pagesize": min(limit, 10),
                },
            )
        except httpx.HTTPError as e:
            msg = f"Couldn't reach Stack Overflow: {e}"
            raise SourceError(msg) from e
    if response.status_code >= HTTP_BAD_REQUEST:
        msg = f"Stack Overflow returned an error ({response.status_code})"
        raise SourceError(msg)

    results = []
    for item in response.json().get("items", [])[:limit]:
        body = BeautifulSoup(item.get("body", ""), "html.parser").get_text(" ")
        results.append(
            {
                "title": _clean(item.get("title", "")),
                "url": item.get("link", ""),
                "snippet": _clean(
                    f"{'Answered' if item.get('is_answered') else 'Unanswered'}, "
                    f"score {item.get('score', 0)}. {body[:400]}"
                ),
            }
        )
    return results


async def wikipedia_search(query: str, limit: int) -> list:
    async with _client() as client:
        try:
            response = await client.get(
                "https://en.wikipedia.org/w/api.php",
                params={
                    "action": "query",
                    "list": "search",
                    "srsearch": query,
                    "format": "json",
                    "srlimit": min(limit, 10),
                },
            )
        except httpx.HTTPError as e:
            msg = f"Couldn't reach Wikipedia: {e}"
            raise SourceError(msg) from e
    if response.status_code >= HTTP_BAD_REQUEST:
        msg = f"Wikipedia returned an error ({response.status_code})"
        raise SourceError(msg)

    return [
        {
            "title": hit["title"],
            "url": f"https://en.wikipedia.org/wiki/{hit['title'].replace(' ', '_')}",
            "snippet": _clean(BeautifulSoup(hit.get("snippet", ""), "html.parser").get_text(" ")),
        }
        for hit in response.json().get("query", {}).get("search", [])[:limit]
    ]


# --------------------------------------------------------------------------------------
# General web search
# --------------------------------------------------------------------------------------


def _unwrap_duckduckgo_link(href: str) -> str:
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


async def duckduckgo_search(query: str, limit: int) -> list:
    """DuckDuckGo's HTML endpoint. Free and keyless, but it throttles, and when it does it answers
    200/202 with a challenge page rather than an error, which must not be read as "no results"."""
    async with _client() as client:
        try:
            response = await client.post(
                "https://html.duckduckgo.com/html/",
                data={"q": query},
                headers={"Content-Type": "application/x-www-form-urlencoded"},
            )
        except httpx.HTTPError as e:
            msg = f"Couldn't reach DuckDuckGo: {e}"
            raise SourceError(msg) from e

    body = response.text
    if response.status_code in HTTP_THROTTLE_STATUSES:
        msg = "DuckDuckGo is refusing automated searches at the moment"
        raise SourceBlockedError(msg)
    if response.status_code >= HTTP_BAD_REQUEST:
        msg = f"DuckDuckGo returned an error ({response.status_code})"
        raise SourceError(msg)

    soup = BeautifulSoup(body, "html.parser")
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
                "title": _clean(link.get_text()),
                "url": url,
                "snippet": _clean(snippet.get_text()) if snippet else "",
            }
        )
        if len(results) >= limit:
            break

    if not results and (
        "anomaly" in body.lower()
        or "captcha" in body.lower()
        or len(body) < SHORT_ENOUGH_TO_BE_A_CHALLENGE
    ):
        msg = "DuckDuckGo served a challenge page instead of results"
        raise SourceBlockedError(msg)
    return results


async def tavily_search(query: str, limit: int, api_key: str) -> list:
    async with _client() as client:
        response = await client.post(
            "https://api.tavily.com/search",
            json={"query": query, "max_results": limit},
            headers={"Authorization": f"Bearer {api_key}"},
        )
    if response.status_code >= HTTP_BAD_REQUEST:
        msg = f"Tavily returned an error ({response.status_code})"
        raise SourceError(msg)
    return [
        {
            "title": r.get("title", ""),
            "url": r.get("url", ""),
            "snippet": _clean(r.get("content", "")),
        }
        for r in response.json().get("results", [])[:limit]
    ]


async def parallel_search(query: str, limit: int, api_key: str) -> list:
    async with _client() as client:
        response = await client.post(
            "https://api.parallel.ai/v1beta/search",
            json={"objective": query, "search_queries": [query], "max_results": limit},
            headers={"x-api-key": api_key, "Content-Type": "application/json"},
        )
    if response.status_code >= HTTP_BAD_REQUEST:
        msg = f"Parallel returned an error ({response.status_code})"
        raise SourceError(msg)
    return [
        {
            "title": r.get("title", ""),
            "url": r.get("url", ""),
            "snippet": _clean(" ".join(r.get("excerpts") or [])[:1000]),
        }
        for r in response.json().get("results", [])[:limit]
    ]


# --------------------------------------------------------------------------------------
# Routing: pick the sources that can answer this particular question
# --------------------------------------------------------------------------------------

_GITHUB_HINT = re.compile(r"\bgithub\b|\brepo(sitory)?\b|github\.com", re.I)
_PACKAGE_HINT = re.compile(
    r"\b(pypi|pip|install|package|library|module|import|version|release)\b", re.I
)
_CODE_HINT = re.compile(
    r"\b(error|exception|traceback|how (do|to)|why does|fix|typeerror|valueerror|importerror)\b",
    re.I,
)
_ENCYCLOPEDIC_HINT = re.compile(
    r"\b(who|what) (is|was|are|were)\b|\bhistory of\b|\bmeaning of\b", re.I
)


def _package_candidate(query: str) -> str:
    """The word in a question most likely to be a package name."""
    noise = {
        "pypi",
        "pip",
        "install",
        "package",
        "packages",
        "library",
        "module",
        "import",
        "latest",
        "version",
        "release",
        "current",
        "newest",
        "what",
        "which",
        "the",
        "is",
        "of",
        "for",
        "and",
        "how",
        "do",
        "does",
        "python",
        "use",
        "using",
        "there",
        "any",
        "have",
        "has",
        "installed",
    }
    words = [w for w in re.findall(r"[A-Za-z][\w.-]{1,}", query) if w.lower() not in noise]
    return words[0] if words else ""


def _dedupe(results: list, limit: int) -> list:
    """Drop repeats, and keep one result per site until every site has had a turn."""
    seen_urls = set()
    by_host: dict = {}
    ordered = []
    for item in results:
        url = (item.get("url") or "").rstrip("/")
        if not url or url in seen_urls:
            continue
        seen_urls.add(url)
        host = urlparse(url).netloc.removeprefix("www.")
        by_host.setdefault(host, []).append(item)
        ordered.append((host, item))

    spread, leftovers = [], []
    used_hosts = set()
    for host, item in ordered:
        (spread if host not in used_hosts else leftovers).append(item)
        used_hosts.add(host)
    return (spread + leftovers)[:limit]


async def search_everything(  # noqa: C901, PLR0912, PLR0915 - one branch per source, which is the point
    query: str, limit: int, provider: str = "", api_key: str = ""
) -> dict:
    """Answer a search query from whichever sources suit it, and say which ones were used.

    Returns {"results", "sources", "notes"}: notes carry the failures, so the agent can tell the
    difference between "nothing exists" and "the search engine turned us away".
    """
    tasks: dict = {}
    github_target = parse_github_target(query)

    if provider == "tavily" and api_key:
        tasks["tavily"] = tavily_search(query, limit, api_key)
    elif provider == "parallel" and api_key:
        tasks["parallel"] = parallel_search(query, limit, api_key)
    else:
        tasks["web"] = duckduckgo_search(query, limit)

        # A question about a repository is answered by GitHub itself, not by a search engine
        if github_target or _GITHUB_HINT.search(query):
            terms = query
            if github_target:
                terms = f"{github_target[1]} user:{github_target[0]}"
            else:
                terms = re.sub(r"\bgithub\b|\brepo(sitory)?\b", " ", query, flags=re.I).strip()
            if terms:
                tasks["github"] = github_search_repos(terms, limit)
        if _PACKAGE_HINT.search(query):
            candidate = _package_candidate(query)
            if candidate:
                tasks["pypi"] = pypi_package(candidate)
        if _CODE_HINT.search(query):
            tasks["stackoverflow"] = stackoverflow_search(query, limit)
        if _ENCYCLOPEDIC_HINT.search(query):
            tasks["wikipedia"] = wikipedia_search(query, limit)

    done = await asyncio.gather(*tasks.values(), return_exceptions=True)
    gathered = dict(zip(tasks.keys(), done))

    # If the web search was turned away and nothing else was asked, try the sources that need no
    # search engine before reporting failure: a question often has a home somewhere specific.
    usable = [v for v in gathered.values() if not isinstance(v, Exception) and v]
    if not usable:
        fallbacks = {}
        if "github" not in gathered:
            fallbacks["github"] = github_search_repos(query, limit)
        if "stackoverflow" not in gathered:
            fallbacks["stackoverflow"] = stackoverflow_search(query, limit)
        candidate = _package_candidate(query)
        if "pypi" not in gathered and candidate:
            fallbacks["pypi"] = pypi_package(candidate)
        if "wikipedia" not in gathered and _ENCYCLOPEDIC_HINT.search(query):
            fallbacks["wikipedia"] = wikipedia_search(query, limit)
        if fallbacks:
            extra = await asyncio.gather(*fallbacks.values(), return_exceptions=True)
            gathered.update(dict(zip(fallbacks.keys(), extra)))

    results, sources, notes = [], [], []
    for name, outcome in gathered.items():
        if isinstance(outcome, SourceBlockedError):
            notes.append(f"{name}: {outcome}")
            continue
        if isinstance(outcome, Exception):
            notes.append(f"{name}: {outcome}")
            continue
        if name == "pypi":
            if outcome:
                sources.append("pypi")
                results.append(
                    {
                        "title": f"{outcome['name']} {outcome['version']} (PyPI)",
                        "url": outcome["url"],
                        "snippet": _clean(
                            f"{outcome['summary']} Latest version {outcome['version']}."
                            + (
                                f" Requires Python {outcome['requires_python']}."
                                if outcome["requires_python"]
                                else ""
                            )
                        ),
                    }
                )
            continue
        if outcome:
            sources.append(name)
            results.extend(outcome)

    specific = {"github", "pypi", "stackoverflow"} & set(sources)
    if specific and "wikipedia" in sources:
        results = [r for r in results if "wikipedia.org" not in r.get("url", "")]
        sources.remove("wikipedia")

    # GitHub and PyPI answer the question directly, so they lead
    priority = {
        "github": 0,
        "pypi": 0,
        "stackoverflow": 1,
        "wikipedia": 1,
        "web": 2,
        "tavily": 2,
        "parallel": 2,
    }
    ranked = sorted(
        results,
        key=lambda item: priority.get(
            "github"
            if "github.com" in item.get("url", "")
            else "pypi"
            if "pypi.org" in item.get("url", "")
            else "stackoverflow"
            if "stackoverflow.com" in item.get("url", "")
            else "wikipedia"
            if "wikipedia.org" in item.get("url", "")
            else "web",
            2,
        ),
    )
    return {"results": _dedupe(ranked, limit), "sources": sources, "notes": notes}


# --------------------------------------------------------------------------------------
# Reading a page, with the relevant part first
# --------------------------------------------------------------------------------------

STRIP_TAGS = ("script", "style", "noscript", "nav", "header", "footer", "aside", "form", "svg")
_WORD = re.compile(r"[a-z0-9_.+#-]{2,}")

# Below this, there is nothing to choose between, so the text is simply cut
_ENOUGH_PARAGRAPHS_TO_RANK = 2


def _terms(text: str) -> list:
    stop = {
        "the",
        "and",
        "for",
        "with",
        "that",
        "this",
        "from",
        "what",
        "which",
        "how",
        "does",
        "are",
        "was",
        "were",
        "you",
        "your",
        "can",
        "will",
        "would",
        "should",
        "into",
        "about",
        "use",
    }
    return [w for w in _WORD.findall(text.lower()) if w not in stop]


def most_relevant(text: str, query: str, max_chars: int) -> tuple[str, bool]:  # noqa: C901, PLR0912
    """Return the parts of a page that match the question, rather than simply its first page.

    A long reference page answers a question somewhere in the middle; cutting it at a character
    count usually throws that part away and keeps the introduction. Paragraphs are scored on how
    many of the question's words they contain (rarer words count for more), and the best ones are
    returned in their original order so the text still reads correctly.
    """
    if len(text) <= max_chars:
        return text, False
    wanted = set(_terms(query))
    if not wanted:
        return text[:max_chars], True

    paragraphs = [p for p in re.split(r"\n{2,}", text) if p.strip()]
    if len(paragraphs) < _ENOUGH_PARAGRAPHS_TO_RANK:
        paragraphs = [text[i : i + 800] for i in range(0, len(text), 800)]

    # A word that appears in every paragraph tells us nothing; one that appears in a few is a signal
    appearances: dict = {}
    for para in paragraphs:
        for word in set(_terms(para)) & wanted:
            appearances[word] = appearances.get(word, 0) + 1

    scored = []
    for index, para in enumerate(paragraphs):
        words = _terms(para)
        if not words:
            continue
        counts: dict = {}
        for word in words:
            if word in wanted:
                counts[word] = counts.get(word, 0) + 1
        score = sum(
            count / (1 + count) * (len(paragraphs) / (1 + appearances.get(word, 0)))
            for word, count in counts.items()
        )
        scored.append((score, index, para))

    scored.sort(key=lambda row: -row[0])
    chosen, used = [], 0
    for score, index, para in scored:
        if score <= 0:
            break
        if used + len(para) > max_chars:
            continue
        chosen.append((index, para))
        used += len(para)
        if used > max_chars * 0.9:
            break

    if not chosen:
        return text[:max_chars], True

    chosen.sort()
    pieces, previous = [], -1
    for index, para in chosen:
        if previous >= 0 and index > previous + 1:
            pieces.append("[…]")
        pieces.append(para)
        previous = index
    return "\n\n".join(pieces), True


async def read_page(url: str, max_chars: int, query: str = "") -> dict:
    """Read one page as text. GitHub pages are read through the API, because their HTML is a shell."""
    target = parse_github_target(url)
    if target and "github.com" in url:
        owner, repo, path = target
        if path:
            content = await github_file(owner, repo, path)
            text, truncated = most_relevant(_clean(content), query, max_chars)
            return {
                "url": url,
                "title": f"{owner}/{repo}: {path}",
                "text": text,
                "truncated": truncated,
            }

        info = await github_repo(owner, repo)
        listing = "\n".join(info.get("files", [])[:100])
        body = (
            f"{info['full_name']} — {info['description']}\n"
            f"Language: {info['language'] or 'not set'} | Stars: {info['stars']} | "
            f"Updated: {info['updated']} | License: {info['license'] or 'none stated'}\n"
            f"{'This repository is private.' if info['private'] else ''}\n\n"
            f"README:\n{info.get('readme', '')}\n\n"
            f"Files:\n{listing}"
        )
        text, truncated = most_relevant(_clean(body), query, max_chars)
        return {
            "url": info["url"],
            "title": info["full_name"],
            "text": text,
            "truncated": truncated,
        }

    async with _client() as client:
        try:
            response = await client.get(url)
        except httpx.HTTPError as e:
            msg = f"Couldn't read that page: {e}"
            raise SourceError(msg) from e
    if response.status_code == HTTP_NOT_FOUND:
        msg = "That page does not exist (404)"
        raise SourceError(msg)
    if response.status_code in (HTTP_UNAUTHORIZED, HTTP_FORBIDDEN):
        msg = "That site refused the request (it may block automated readers)"
        raise SourceBlockedError(msg)
    if response.status_code >= HTTP_BAD_REQUEST:
        msg = f"That page returned an error ({response.status_code})"
        raise SourceError(msg)

    raw = response.content[:MAX_DOWNLOAD_BYTES]
    if "html" in response.headers.get("Content-Type", ""):
        soup = BeautifulSoup(raw, "html.parser")
        for tag in soup(list(STRIP_TAGS)):
            tag.decompose()
        title = _clean(soup.title.get_text()) if soup.title else ""
        main = soup.find("main") or soup.find("article") or soup.find(attrs={"role": "main"})
        full = _clean((main or soup).get_text("\n"))
    else:
        title = ""
        full = _clean(raw.decode("utf-8", errors="replace"))

    text, truncated = most_relevant(full, query, max_chars)
    return {"url": str(response.url), "title": title, "text": text, "truncated": truncated}
