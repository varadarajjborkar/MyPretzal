# MyPretzal

Jupyter notebooks with AI built in. It's based on [Pretzel AI](https://github.com/pretzelai/pretzelai), plus:

- **Ollama Cloud:** a Local / Cloud switch for Ollama, so cloud models (such as `gemma4:31b`) work with an API key.
- **Recent chats:** open, rename and delete past chats, or start a new one, from the clock button in the chat.
- **Model picker:** switch the AI model from the chat. The conversation carries on with the new model.
- **Clear errors:** if a model or API key fails, the chat says why instead of hanging.
- **Web search:** the AI can search the web and read pages before answering, instead of guessing from memory.

## Install

It needs Python 3.8 or newer. Give it its own environment, because it replaces JupyterLab.

```bash
python3 -m venv ~/pretzel-env
source ~/pretzel-env/bin/activate
pip install "git+https://github.com/varadarajjborkar/MyPretzal.git"
```

This repo is private, so run `gh auth login` and `gh auth setup-git` once first, so pip can read it.

### If the install looks frozen

It is working. pip draws its green progress bar only when it downloads one finished file whose size it knows in advance. Installing from a git link is not that: pip copies this whole repo with git and then builds the package, and neither step has a total to count towards. So you get pip's spinner lines and a few quiet minutes.

For a quick, tidy install, install the built file instead. Build it once (see *Rebuild after changing the code*, then `pip wheel --no-deps .`), keep the `.whl` somewhere handy, and:

```bash
pip install ~/pretzel-dist/pretzelai-4.2.11-py3-none-any.whl
```

That takes seconds and prints the familiar `Installing collected packages` / `Successfully installed`, because there is nothing to clone or build.

## Run

```bash
source ~/pretzel-env/bin/activate
cd your-project
pretzel lab
```

- **Open the chat:** `Ctrl+Cmd+B` on Mac, `Ctrl+Alt+B` elsewhere.
- **Set up models and keys:** in **Settings → Pretzel AI Settings**.

## Web search

The **Web** button at the bottom of the chat lets the AI look things up before answering. With it on, the AI can search the web and read pages, as many times as a question needs, and the chat shows each step as it happens.

- **It needs an Ollama model that supports tool calling**, such as `gpt-oss` or `qwen3`. With a model that can't, the chat says so rather than answering from memory. Other providers aren't wired up yet.
- **Searching is free and needs no account.** It uses DuckDuckGo. A paid search key (Tavily or Parallel) can be used instead, and is only worth it if the free results get thin.
- **Choose how tools run** in the same menu: *Let it run* does the searching by itself, *Ask me first* waits for Allow or Skip on every call.
- The steps stay in the saved chat, so you can see later where an answer came from. Answers end with the URLs used.
- Only public web addresses can be read. Anything on this machine or the local network is refused, so a web page can't talk the AI into fetching your own services.

## Update

```bash
pip install --force-reinstall --no-deps "git+https://github.com/varadarajjborkar/MyPretzal.git"
```

## Uninstall

```bash
source ~/pretzel-env/bin/activate
pip uninstall pretzelai
```

The package is named `pretzelai`, not MyPretzal. To remove it and everything it installed in one go, delete the environment instead: `rm -rf ~/pretzel-env`.

Either way your own data stays: settings and keys in `~/.jupyter`, and each project's chats in its `.pretzel/chat_history.json`.

## Shortcuts

Optional. Add this to `~/.zshrc` for one-word install, update, remove and run:

```bash
pretzel-install() {
  local repo="git+https://github.com/varadarajjborkar/MyPretzal.git"
  local pip="${VIRTUAL_ENV:-$HOME/pretzel-env}/bin/pip"
  if [ ! -x "$pip" ]; then
    echo "No environment yet. Make one first:  python3 -m venv ~/pretzel-env"
    return 1
  fi
  if "$pip" show pretzelai >/dev/null 2>&1; then
    "$pip" install --force-reinstall --no-deps "$repo"
  else
    "$pip" install "$repo"
  fi
}

pretzel-uninstall() {
  "${VIRTUAL_ENV:-$HOME/pretzel-env}/bin/pip" uninstall pretzelai
}

pretzel-run() {
  "${VIRTUAL_ENV:-$HOME/pretzel-env}/bin/pretzel" lab "$@"
}
```

Then `pretzel-install` installs or updates, and `pretzel-run` starts the app in the current folder without activating anything. They use whichever environment is active, or `~/pretzel-env` if none is.

## Use a project's own packages

```bash
cd your-project && python3 -m venv .venv && source .venv/bin/activate
pip install ipykernel pandas        # plus whatever the project needs
python -m ipykernel install --user --name your-project
```

Then, in the app: **Kernel → Change Kernel → your-project**.

## Rebuild after changing the code

This needs Node.js, and `jlpm install` run once in the repo.

```bash
node node_modules/typescript/bin/tsc -p packages/pretzelai-extension
rm -rf jupyterlab/static jupyterlab/schemas jupyterlab/themes
(cd jupyterlab/staging && node yarn.js install && node yarn.js run build:prod:minimize)
rm -f jupyterlab/static/*.js.map
git add -A -f jupyterlab/static jupyterlab/schemas jupyterlab/themes jupyterlab/staging/yarn.lock
```

Don't skip the `node yarn.js install` line. The build reads a *copy* of the extension inside `jupyterlab/staging/node_modules`, and that step is what refreshes it. Without it the build quietly packages the old code, and `git status` shows nothing changed.

## Feedback

Questions, bugs or ideas: [borkarvaradaraj@gmail.com](mailto:borkarvaradaraj@gmail.com)

## Contributed to Pretzel

This build is linked to my contributions to Pretzel. Each feature was also submitted to the original project as a pull request:

- [#173](https://github.com/pretzelai/pretzelai/pull/173): Ollama Cloud support (Local / Cloud switch)
- [#174](https://github.com/pretzelai/pretzelai/pull/174): recent chats list (open, rename, delete, New chat)
- [#175](https://github.com/pretzelai/pretzelai/pull/175): model picker in the chat, and clear error messages

This build also fixes Pretzel's extension manager for newer `httpx` versions.

## Credits and licenses

This is not my original project. It builds on the work of others, and full credit goes to them:

- [**Pretzel AI**](https://github.com/pretzelai/pretzelai), by Pretzel AI GmbH (Prasoon Shukla and Ramon Garate Funcia). Pretzel's own code is under the GNU AGPL v3, see [LICENSE_AGPLv3](LICENSE_AGPLv3); its contributors are listed in [PRETZEL_CONTRIBUTORS](PRETZEL_CONTRIBUTORS).
- [**JupyterLab**](https://github.com/jupyterlab/jupyterlab), by Project Jupyter. Its code is under the BSD 3-Clause license, see [LICENSE](LICENSE).
- **My changes** are released under the same AGPL v3 license as Pretzel.

The full git history is kept, so every original author's work stays credited. Pretzel's original README is in [PRETZEL_README.md](PRETZEL_README.md).
