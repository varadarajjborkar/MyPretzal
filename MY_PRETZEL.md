# My Pretzel build

This is [Pretzel AI](https://github.com/pretzelai/pretzelai) (a Jupyter notebook app with AI built in) with a few additions:

- **Ollama Cloud:** a Local / Cloud switch for Ollama in Pretzel AI Settings, so cloud models such as `gemma4:31b` work with an API key.
- **Recent chats:** the clock button in the chat lists your chats. You can open, rename and delete them, and start a New chat.
- **Model picker in the chat:** switch the chat model from the chat itself. The conversation carries on with the new model.
- **Clear error messages:** when an AI provider or model fails, the chat explains what happened instead of hanging.
- **Extension manager fix:** installing JupyterLab extensions from the sidebar works with the current `httpx`.

## Install

Pretzel replaces JupyterLab (both provide the `jupyterlab` Python package), so give it **its own environment**. Don't install it next to a regular JupyterLab.

```bash
python3 -m venv ~/pretzel-env
source ~/pretzel-env/bin/activate
pip install "git+https://github.com/<your-username>/<this-repo>.git"
```

- **Private repo:** pip uses your git login. Run `gh auth login` and `gh auth setup-git` once, or install over SSH with `pip install "git+ssh://git@github.com/<your-username>/<this-repo>.git"`.
- **From a wheel file:** if you have the `.whl` file (for example attached to a GitHub Release), `pip install pretzelai-4.2.11-py3-none-any.whl` works too.
- **No Node.js needed:** the built app is already in this repo.

## Run

```bash
source ~/pretzel-env/bin/activate
cd path/to/your/project
pretzel lab          # or: jupyter lab
```

It opens in your browser. Open the chat with `Ctrl+Cmd+B` (Mac) or `Ctrl+Alt+B`. Set up models in **Settings → Pretzel AI Settings**.

## Where things are saved

- **Settings and API keys:** `~/.jupyter/lab/user-settings/`. They're shared by all your projects.
- **Chats:** saved next to your notebooks, in a `.pretzel/` folder, so each project folder has its own chats.

## Using it in different projects

Install Pretzel once, as above. Then give each project its own Python environment and connect it as a **kernel**:

```bash
cd path/to/project
python3 -m venv .venv
source .venv/bin/activate
pip install ipykernel pandas          # plus whatever the project needs
python -m ipykernel install --user --name my-project
```

Then, in Pretzel: **Kernel → Change Kernel… → my-project**. The notebook runs with that project's packages, while Pretzel itself stays in `~/pretzel-env`.

## Rebuilding after changing the code

This needs Node.js, run from the repo folder, with `node_modules` already installed (run `jlpm install` once; a warning about `canvas` failing to build is fine).

```bash
# 1. compile the Pretzel extension
node node_modules/typescript/bin/tsc -p packages/pretzelai-extension
# 2. build the app from scratch
rm -rf jupyterlab/static jupyterlab/schemas jupyterlab/themes
(cd jupyterlab/staging && node yarn.js install && node yarn.js run build:prod:minimize)
rm -f jupyterlab/static/*.js.map
# 3. commit the new build, so pip installs from git pick it up
git add -A -f jupyterlab/static jupyterlab/schemas jupyterlab/themes jupyterlab/staging/yarn.lock
git commit -m "Rebuild the app"
```

To make a wheel file: `pip install build`, then `python -m build --wheel`. The file lands in `dist/`.
