# MyPretzal

Jupyter notebooks with AI built in. It's based on [Pretzel AI](https://github.com/pretzelai/pretzelai), plus:

- **Ollama Cloud:** a Local / Cloud switch for Ollama, so cloud models (such as `gemma4:31b`) work with an API key.
- **Recent chats:** open, rename and delete past chats, or start a new one, from the clock button in the chat.
- **Model picker:** switch the AI model from the chat. The conversation carries on with the new model.
- **Clear errors:** if a model or API key fails, the chat says why instead of hanging.

## Install

It needs Python 3.8 or newer. Give it its own environment, because it replaces JupyterLab.

```bash
python3 -m venv ~/pretzel-env
source ~/pretzel-env/bin/activate
pip install "git+https://github.com/varadarajjborkar/MyPretzal.git"
```

This repo is private, so run `gh auth login` and `gh auth setup-git` once first, so pip can read it.

## Run

```bash
source ~/pretzel-env/bin/activate
cd your-project
pretzel lab
```

- **Open the chat:** `Ctrl+Cmd+B` on Mac, `Ctrl+Alt+B` elsewhere.
- **Set up models and keys:** in **Settings → Pretzel AI Settings**.

## Update

```bash
pip install --force-reinstall --no-deps "git+https://github.com/varadarajjborkar/MyPretzal.git"
```

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

## Feedback

Questions, bugs or ideas: **borkarvaradaraj@gmail.com**

## Credits

Built on [Pretzel AI](https://github.com/pretzelai/pretzelai) by Pretzel AI GmbH (AGPL-3.0), which is built on [JupyterLab](https://github.com/jupyterlab/jupyterlab) (BSD-3-Clause). Pretzel's original README is in [PRETZEL_README.md](PRETZEL_README.md).
