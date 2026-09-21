# MyPretzal

Jupyter notebooks with AI built in. It's based on [Pretzel AI](https://github.com/pretzelai/pretzelai), plus:

- **Ollama Cloud:** a Local / Cloud switch for Ollama, so cloud models (such as `gemma4:31b`) work with an API key.
- **Recent chats:** open, rename and delete past chats, or start a new one, from the clock button in the chat.
- **Model picker:** switch the AI model from the chat. The conversation carries on with the new model.
- **Clear errors:** if a model or API key fails, the chat says why instead of hanging.
- **Web search:** the AI can search the web and read pages before answering, instead of guessing from memory.
- **Notebook access:** the AI can read your cells, edit them, add them and run them — and it knows a notebook is stateful, so it can tell you when a cell has been edited since it ran.
- **Knows your environment:** it reads the Python version and packages of the kernel you are actually using, and offers to install what's missing instead of rewriting your code forever.

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

## What the AI can do

The **Tools** button at the bottom of the chat decides what the AI may reach for. Three groups, each on or off:

- **Read and change this notebook** *(on by default)* — list the cells, read one in full with its output, rewrite a cell, add or delete one, and run cells. It is told what the kernel currently holds: which cells have run, in what order, and which have been edited since they last ran, so it doesn't assume your file and your kernel agree.
- **Look at the environment and install packages** *(on by default)* — the Python version, where it lives, what is installed and at what version, and what is already imported. If a package is missing here but installed under another Python on your machine, it says so. Installing runs `pip` in the kernel's own environment.
- **Search the web when needed** *(off by default)* — search and read pages, as many times as a question needs. It uses DuckDuckGo, GitHub, PyPI, Stack Overflow and Wikipedia, choosing whichever can actually answer. Off by default because it goes out to other people's servers and takes seconds.

**Before it acts**, in the same menu:

- *Let it run* — no interruptions.
- *Ask before it changes anything* **(default)** — it reads freely, but editing a cell, running code or installing waits for you.
- *Ask before every step* — every call waits.

When it does ask, **you see the code first**: the cell as it is against the cell as it would be, in the same red and green Cmd+K uses, with **Accept**, **Accept and run**, **Reject** and **Edit prompt** underneath. *Edit prompt* stops the run and puts your message back in the box, which is usually quicker than arguing with a wrong change.

**Always allow in \<folder\>** on that card stops the asking for changes while you work in that folder — and nowhere else. Turn it off again from the Tools menu. Installing a package is never covered by it, and neither is running a cell that installs one: *Running cell 1 — it installs packages* asks even on *Let it run*.

**Installing a package always asks**, whichever of those you pick, because it changes your machine outside the notebook.

It needs an Ollama model that can call tools, such as `gpt-oss` or `qwen3`. With a model that can't, the chat quietly answers without them and the Tools menu says which model it was. Other providers aren't wired up yet.

Every step appears in the chat as it happens and stays in the saved conversation, so you can see later what it did. Answers that used the web end with the URLs.

Only public web addresses can be read. Anything on this machine or the local network is refused, so a web page can't talk the AI into fetching your own services.

## When something is missing, not broken

Click **Fix Error with AI** on a cell that failed with `ModuleNotFoundError` and you get an offer to install the package, not another rewrite — with the exact Python it looked in, and the right package name (`cv2` offers `opencv-python`). Say *No, fix the code instead* and it goes to the model as before.

The same offer comes up from **Cmd+K** in a cell whose imports don't resolve, before any code is written, with *Write the code anyway* if you meant it. Naming a library in the question counts too: ask for *a bouncing ball with pygame* in a kernel with no pygame and you are offered the install before a line is written.

The chat does the same check on its own. Libraries you name are looked up in the kernel before the model answers, so it is told *gymnasium is not installed here* rather than having to remember to ask — which is the difference between an honest answer and a confident block of code that cannot run.

Installing always waits for **Allow**, and so does running a cell that installs something: *Running cell 1 — it installs packages* asks even on *Let it run*. Nothing is installed without you clicking.

This is there because no rewrite of an import statement has ever installed anything, and asking a model to fix the same error twice gets you the same wrong answer twice. If you do go round again, the fixer is told which attempt this is and asked to name what it now thinks is really wrong.

## Things Jupyter can't show

Some libraries open a window on your desktop rather than drawing in the notebook — `gymnasium` with `render_mode="human"`, `cv2.imshow`, `pygame.display`, matplotlib with a desktop backend. In a notebook that window either appears somewhere you aren't looking or freezes the cell, and if your kernel is on another machine it never appears at all.

The AI is told this, and told the inline alternative for each of them, so it should offer you `render_mode="rgb_array"` and a frame display rather than code that silently does nothing.

### VPython, and the hour it costs people

VPython draws through a live connection to the page, made when `vpython` is first imported in that kernel. **Reload the page and that connection is dead**: from then on nothing it draws appears anywhere — not even a brand-new `canvas()` — and no error is raised. The cell runs, prints, and shows nothing. Only **Kernel → Restart Kernel** brings it back; no rewrite of the code can, which is exactly why asking an AI to fix it turns into a loop.

Pretzel now notices. The kernel is asked whether it was already running before this page was loaded, and if a browser-bound library is imported in it the AI is told plainly that the connection is stale and that restarting the kernel — not rewriting the code — is the fix.

Two more rules it is told about: `scene` is one canvas per kernel, so the picture appears under the cell that *first* made it and later cells that draw on `scene` look empty — make a `canvas()` in the cell where you want the picture. And `while True: rate(30)` never ends, so prefer a bounded loop.

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

### Testing against a checkout

`--dev-mode` is the quick way to try a change, but it loads **no prebuilt extensions at all** — no ipywidgets, no VPython, no plotly renderer. Nothing warns you; those libraries simply produce no output. To test anything involving them, point at the built app instead:

```bash
jupyter lab --app-dir=/path/to/pretzelai/jupyterlab
```

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
