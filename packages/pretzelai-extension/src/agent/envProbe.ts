/*
 * Copyright (c) Pretzel AI GmbH.
 * This file is part of the Pretzel project and is licensed under the
 * GNU Affero General Public License version 3.
 * See the LICENSE_AGPLv3 file at the root of the project for the full license text.
 * Contributions by contributors listed in the PRETZEL_CONTRIBUTORS file (found at
 * the root of the project) are licensed under AGPLv3.
 */

/**
 * The Python that looks at the kernel's environment.
 *
 * It is run through `exec(compile(...), {})` with a fresh globals dict, so none of these names
 * reach the user's namespace: someone with a variable called `json` or `os` keeps it.
 *
 * Nothing here imports a library to find out about it. Importing numpy to read its version costs
 * seconds, and importing matplotlib or gymnasium has side effects — a backend gets chosen, a
 * window may open. Distribution metadata answers the version question without any of that.
 */
export const ENV_PROBE = `
import json, os, platform, sys, socket, glob, site
import importlib.metadata as md
import importlib.util as iu

def dist_version(name):
    try:
        return md.version(name)
    except Exception:
        return None

def importable(name):
    try:
        return iu.find_spec(name) is not None
    except Exception:
        return False

def other_places(name):
    """Where else on this machine that package sits, when the kernel cannot see it.

    People install with one Python and run with another constantly; when that has happened the
    honest answer is "it is installed, just not here", not "it is not installed"."""
    key = name.lower().replace('-', '_')
    roots = []
    for base in {sys.base_prefix, sys.prefix, os.path.expanduser('~/.local')}:
        roots += glob.glob(os.path.join(base, 'lib', 'python*', 'site-packages'))
        roots += glob.glob(os.path.join(base, 'Lib', 'site-packages'))
    try:
        roots.append(site.getusersitepackages())
    except Exception:
        pass
    on_path = {os.path.realpath(p) for p in sys.path}
    found = []
    for root in dict.fromkeys(roots):
        if not root or os.path.realpath(root) in on_path:
            continue
        for meta in glob.glob(os.path.join(root, key + '-*.dist-info')) + glob.glob(
            os.path.join(root, name + '-*.dist-info')
        ):
            found.append({'version': os.path.basename(meta).rsplit('.dist-info', 1)[0], 'path': root})
    return found[:4]

# What the notebook has actually imported so far. This says more about the work in progress than
# any list of what is installed.
def in_use():
    stdlib = getattr(sys, 'stdlib_module_names', frozenset())
    tops = sorted({m.split('.')[0] for m in list(sys.modules)})
    out = {}
    for name in tops:
        if name.startswith('_') or name in stdlib:
            continue
        version = getattr(sys.modules.get(name), '__version__', None)
        out[name] = version if isinstance(version, str) else (dist_version(name) or '?')
    return dict(list(out.items())[:40])

# Has this kernel outlived the page looking at it?
#
# A kernel survives a browser reload; anything in it that had wired itself to the old page does
# not. VPython is the worst case: after a reload it draws into a connection that no longer
# exists, silently, for ever. We leave a token in a private module (never in the user's
# namespace) and compare it with the one this page carries.
def page_check(token):
    import types
    mod = sys.modules.get('_pretzel_page')
    if mod is None:
        mod = types.ModuleType('_pretzel_page')
        sys.modules['_pretzel_page'] = mod
    seen = getattr(mod, 'token', None)
    mod.token = token
    return {'earlier_page': seen is not None and seen != token,
            'first_seen': seen is None}

report = {
    'python': platform.python_version(),
    'implementation': platform.python_implementation(),
    'executable': sys.executable,
    'prefix': sys.prefix,
    'in_venv': sys.prefix != sys.base_prefix,
    'conda_env': os.environ.get('CONDA_DEFAULT_ENV'),
    'platform': platform.platform(),
    'system': platform.system(),
    'machine': platform.machine(),
    'hostname': socket.gethostname(),
    'display': os.environ.get('DISPLAY') or '',
    'pip': dist_version('pip'),
    'setuptools': dist_version('setuptools'),
    'ipykernel': dist_version('ipykernel'),
    'ipywidgets': dist_version('ipywidgets'),
    'package_count': len(list(md.distributions())),
    'gui_toolkits': [n for n in ('tkinter', 'PyQt5', 'PyQt6', 'PySide6', 'wx') if importable(n)],
    'imported': in_use(),
    'page': page_check(__PAGE__),
    # Libraries that talk to the browser directly and so cannot survive a reload
    'browser_bound': [n for n in ('vpython', 'glowscript') if n in sys.modules],
}

wanted = __WANTED__
if wanted:
    packages = {}
    for name in wanted:
        entry = {'version': dist_version(name), 'importable': importable(name.replace('-', '_'))}
        if entry['version'] is None:
            entry['elsewhere'] = other_places(name)
        packages[name] = entry
    report['packages'] = packages

print(json.dumps(report))
`;

/** Ask pip to install, in the kernel's own environment, with no shell in the way. */
export const INSTALL_PROBE = `
import json, subprocess, sys
names = __NAMES__
run = subprocess.run(
    [sys.executable, '-m', 'pip', 'install', '--disable-pip-version-check'] + names,
    capture_output=True, text=True,
)
print(json.dumps({'code': run.returncode, 'out': (run.stdout or '')[-2500:], 'err': (run.stderr or '')[-1500:]}))
`;

/**
 * Package names pip may be handed.
 *
 * Only a name, optional extras and an optional version constraint. This is the line between
 * "install pandas" and an argument that changes what pip does — `--index-url` pointing somewhere
 * else, a path, a URL, a git checkout. The model chooses these strings, so the check is on what
 * it may ask for, not on how the string is quoted.
 */
const SAFE_REQUIREMENT =
  /^[A-Za-z0-9][A-Za-z0-9._-]*(\[[A-Za-z0-9,._-]+\])?((==|>=|<=|~=|!=|<|>)[A-Za-z0-9._*+!-]+)?(,((==|>=|<=|~=|!=|<|>)[A-Za-z0-9._*+!-]+))*$/;

export const unsafeRequirement = (name: string): boolean => !SAFE_REQUIREMENT.test(name.trim());
