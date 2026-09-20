/*
 * Copyright (c) Pretzel AI GmbH.
 * This file is part of the Pretzel project and is licensed under the
 * GNU Affero General Public License version 3.
 * See the LICENSE_AGPLv3 file at the root of the project for the full license text.
 * Contributions by contributors listed in the PRETZEL_CONTRIBUTORS file (found at
 * the root of the project) are licensed under AGPLv3.
 */
import { INotebookTracker } from '@jupyterlab/notebook';
import { IAgentTool } from './webTools';
import { ENV_PROBE, INSTALL_PROBE, unsafeRequirement } from './envProbe';
import { kernelProblem, runInKernel, runInKernelForJson } from './kernel';

/** What the probe reports back about the kernel's environment. */
export interface IEnvReport {
  python: string;
  implementation: string;
  executable: string;
  prefix: string;
  in_venv: boolean;
  conda_env: string | null;
  platform: string;
  system: string;
  machine: string;
  hostname: string;
  display: string;
  pip: string | null;
  setuptools: string | null;
  ipykernel: string | null;
  ipywidgets: string | null;
  package_count: number;
  gui_toolkits: string[];
  imported: Record<string, string>;
  packages?: Record<
    string,
    { version: string | null; importable: boolean; elsewhere?: { version: string; path: string }[] }
  >;
}

const probeFor = (wanted: string[]): string =>
  `exec(compile(${JSON.stringify(
    ENV_PROBE.replace('__WANTED__', JSON.stringify(wanted))
  )}, '<pretzel-env>', 'exec'), {})`;

/** Read the kernel's environment, optionally asking about particular packages. */
export async function readEnvironment(tracker: INotebookTracker | null, wanted: string[] = []): Promise<IEnvReport> {
  return (await runInKernelForJson(tracker, probeFor(wanted), 30000)) as IEnvReport;
}

/**
 * The environment as a few lines of prose for the model.
 *
 * Every assistant in Pretzel gets this, because most of the loops people get stuck in are not
 * bugs in their code: the library is missing, or it is there but does not work on this Python.
 * A model that cannot see the Python version will keep rewriting working code.
 */
export const describeEnvironment = (report: IEnvReport): string => {
  const where = report.conda_env
    ? `conda environment "${report.conda_env}"`
    : report.in_venv
    ? 'a virtual environment'
    : 'the system Python';
  const lines = [
    `Python ${report.python} (${report.implementation}) in ${where} at ${report.prefix}`,
    `Running on ${report.system} (${report.platform}, ${report.machine})`,
    `pip ${report.pip ?? 'not available'}${
      report.setuptools ? `, setuptools ${report.setuptools}` : ', setuptools is NOT installed'
    }` + `${report.ipywidgets ? `, ipywidgets ${report.ipywidgets}` : ''}`,
    `${report.package_count} packages installed in this environment`
  ];
  const imported = Object.entries(report.imported || {});
  if (imported.length) {
    lines.push(`Already imported in this kernel: ${imported.map(([name, v]) => `${name} ${v}`).join(', ')}`);
  }
  return lines.join('\n');
};

/** One package's answer, in the words the model should be reading. */
const describePackage = (
  name: string,
  entry: { version: string | null; importable: boolean; elsewhere?: { version: string; path: string }[] }
): string => {
  if (entry.version) {
    return `${name}: ${entry.version} installed${
      entry.importable ? '' : ' (installed, but `import` cannot find it — the import name may differ)'
    }`;
  }
  if (entry.importable) {
    return `${name}: importable, but with no package metadata (a local file or folder of that name may be shadowing it)`;
  }
  if (entry.elsewhere?.length) {
    const places = entry.elsewhere.map(p => `${p.version} in ${p.path}`).join('; ');
    return `${name}: NOT installed in this kernel's environment, but found elsewhere on this machine: ${places}. Installing it here is what would fix that, not changing the code.`;
  }
  return `${name}: not installed`;
};

/**
 * Install packages into the kernel's environment.
 *
 * Shared by the chat's install tool and the error fixer's install button, so a package installed
 * from either place lands in the same environment and reports the same way.
 */
export async function installPackages(
  tracker: INotebookTracker | null,
  names: string[]
): Promise<{ ok: boolean; message: string }> {
  const rejected = names.filter(unsafeRequirement);
  if (rejected.length) {
    return {
      ok: false,
      message:
        `Nothing was installed. These are not plain package requirements: ${rejected.join(', ')}. ` +
        'Only names with optional extras and version constraints can be installed this way. ' +
        'Anything else — a URL, a path, a git checkout, extra pip options — the user has to run themselves.'
    };
  }

  const source = JSON.stringify(INSTALL_PROBE.replace('__NAMES__', JSON.stringify(names)));
  const code = `exec(compile(${source}, '<pretzel-install>', 'exec'), {})`;
  // pip over a slow connection is not stuck, it is downloading; five minutes is a fair wait
  const result = await runInKernelForJson(tracker, code, 300000);
  if (result.code !== 0) {
    const detail = (result.err || result.out || '').trim().split('\n').slice(-6).join('\n');
    return { ok: false, message: `pip could not install ${names.join(', ')}:\n${detail}` };
  }
  forgetEnvironment();
  const tail = (result.out || '').trim().split('\n').slice(-3).join('\n');
  return {
    ok: true,
    message:
      `Installed ${names.join(', ')}.\n${tail}\n\n` +
      'Anything already imported in this kernel is still the old version. If this package was ' +
      'imported before now, the kernel has to be restarted before the change takes effect — ' +
      'say that rather than assuming it worked.'
  };
}

export interface IEnvToolOptions {
  tracker: INotebookTracker | null;
  /** Told when an install finished, so the chat can say the kernel needs restarting. */
  onInstalled?: (names: string[]) => void;
}

export function createEnvTools({ tracker, onInstalled }: IEnvToolOptions): IAgentTool[] {
  const checkEnvironment: IAgentTool = {
    name: 'check_environment',
    risk: 'read',
    description:
      'Look at the environment this notebook actually runs in: Python version, where it lives, ' +
      'the platform, pip and setuptools, and which libraries are already imported. ' +
      'Use it before writing code that depends on a library, and always when an import fails, ' +
      'a version looks wrong, or the same error keeps coming back.',
    parameters: { type: 'object', properties: {} },
    label: () => 'Checking the environment',
    run: async () => {
      const report = await readEnvironment(tracker);
      return describeEnvironment(report);
    }
  };

  const checkPackages: IAgentTool = {
    name: 'check_packages',
    risk: 'read',
    description:
      'Ask whether particular packages are installed in this kernel and at which version. ' +
      'If a package is missing here but installed somewhere else on the machine, that is reported too. ' +
      'Use the distribution name as it is on PyPI, for example "opencv-python" or "scikit-learn".',
    parameters: {
      type: 'object',
      properties: {
        packages: {
          type: 'array',
          items: { type: 'string' },
          description: 'The package names to look up'
        }
      },
      required: ['packages']
    },
    label: args => {
      const names: string[] = Array.isArray(args?.packages) ? args.packages : [];
      return `Checking whether ${names.join(', ') || 'a package'} is installed`;
    },
    run: async args => {
      const names: string[] = (Array.isArray(args?.packages) ? args.packages : [])
        .map((n: any) => String(n).trim())
        .filter(Boolean)
        .slice(0, 12);
      if (!names.length) {
        return 'No package names were given.';
      }
      const report = await readEnvironment(tracker, names);
      const lines = names.map(name =>
        describePackage(name, report.packages?.[name] ?? { version: null, importable: false })
      );
      return `In Python ${report.python} at ${report.prefix}:\n${lines.join('\n')}`;
    }
  };

  const installTool: IAgentTool = {
    name: 'install_packages',
    risk: 'write',
    // Installing changes the machine outside the notebook, and it can break work that
    // currently runs. That is the user's call every time, whatever the approval setting says.
    alwaysAsk: true,
    description:
      "Install or upgrade packages in this kernel's environment with pip. " +
      'The user is asked first and may refuse. Give exact requirements when the version matters, ' +
      'for example "setuptools<81" or "numpy==1.26.4". Say in `reason` what this fixes, ' +
      'because that is what the user sees when deciding.',
    parameters: {
      type: 'object',
      properties: {
        packages: {
          type: 'array',
          items: { type: 'string' },
          description: 'Requirements to install, e.g. ["gymnasium[classic-control]", "setuptools<81"]'
        },
        reason: { type: 'string', description: 'One line: what this fixes or enables' }
      },
      required: ['packages']
    },
    label: args => {
      const names: string[] = Array.isArray(args?.packages) ? args.packages : [];
      const reason = args?.reason ? ` — ${args.reason}` : '';
      return `Installing ${names.join(', ') || 'a package'}${reason}`;
    },
    run: async args => {
      const names: string[] = (Array.isArray(args?.packages) ? args.packages : [])
        .map((n: any) => String(n).trim())
        .filter(Boolean)
        .slice(0, 12);
      if (!names.length) {
        return 'No packages were given, so nothing was installed.';
      }
      const outcome = await installPackages(tracker, names);
      if (outcome.ok) {
        onInstalled?.(names);
      }
      return outcome.message;
    }
  };

  return [checkEnvironment, checkPackages, installTool];
}

/**
 * The environment block that goes into a prompt, or "" when it cannot be read.
 *
 * Cached per kernel: the Python version does not change while a kernel runs, and asking on every
 * keystroke would put a round trip in front of every answer. An install clears the cache.
 */
const cache = new Map<string, string>();

export const forgetEnvironment = (): void => cache.clear();

export async function environmentContext(tracker: INotebookTracker | null): Promise<string> {
  if (kernelProblem(tracker)) {
    return '';
  }
  const key = tracker?.currentWidget?.sessionContext?.session?.kernel?.id ?? '';
  const known = cache.get(key);
  if (known !== undefined) {
    return known;
  }
  // A kernel running the user's cell would make this probe queue behind it, and the chat would
  // sit there saying nothing for as long as that cell takes. The question is worth more than
  // the context, so ask again next time.
  if (tracker?.currentWidget?.sessionContext?.kernelDisplayStatus === 'busy') {
    return '';
  }
  try {
    const text = describeEnvironment(await readEnvironment(tracker, []));
    cache.set(key, text);
    return text;
  } catch {
    // Not being able to read the environment is not a reason to fail the user's question
    return '';
  }
}

/** A quick, silent import check used by the single-shot assistants. */
export async function missingImports(tracker: INotebookTracker | null, names: string[]): Promise<string[]> {
  if (!names.length || kernelProblem(tracker)) {
    return [];
  }
  // Same reasoning as environmentContext: never make the user wait on a busy kernel
  if (tracker?.currentWidget?.sessionContext?.kernelDisplayStatus === 'busy') {
    return [];
  }
  try {
    const { text } = await runInKernel(
      tracker,
      `exec(compile(${JSON.stringify(
        'import importlib.util as _iu\nprint(",".join(n for n in __NAMES__ if _iu.find_spec(n) is None))'.replace(
          '__NAMES__',
          JSON.stringify(names)
        )
      )}, '<pretzel-imports>', 'exec'), {})`,
      15000
    );
    return text
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}
