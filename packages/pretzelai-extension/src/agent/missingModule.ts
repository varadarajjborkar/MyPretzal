/*
 * Copyright (c) Pretzel AI GmbH.
 * This file is part of the Pretzel project and is licensed under the
 * GNU Affero General Public License version 3.
 * See the LICENSE_AGPLv3 file at the root of the project for the full license text.
 * Contributions by contributors listed in the PRETZEL_CONTRIBUTORS file (found at
 * the root of the project) are licensed under AGPLv3.
 */

/**
 * Reading a traceback for the one thing a model cannot fix by rewriting code: a package that
 * is not there.
 *
 * This is the loop people get stuck in. The cell fails, the fixer rewrites it, it fails the same
 * way, and round it goes — because no arrangement of import statements installs anything.
 */

/**
 * What to install for an import that failed.
 *
 * The name you import and the name you install are often different, and guessing wrong sends the
 * user to a package that does not exist. Only well-known pairs are listed; anything else is
 * offered under its own name, which is right far more often than not.
 */
/* eslint-disable camelcase -- these are Python import names, not identifiers of ours */
const DISTRIBUTION_FOR: Record<string, string> = {
  bs4: 'beautifulsoup4',
  cv2: 'opencv-python',
  Crypto: 'pycryptodome',
  dateutil: 'python-dateutil',
  dotenv: 'python-dotenv',
  fitz: 'PyMuPDF',
  OpenGL: 'PyOpenGL',
  PIL: 'pillow',
  pkg_resources: 'setuptools',
  serial: 'pyserial',
  skimage: 'scikit-image',
  sklearn: 'scikit-learn',
  usb: 'pyusb',
  win32api: 'pywin32',
  yaml: 'PyYAML',
  zmq: 'pyzmq'
};

/** Packages that need pinning rather than installing, because the newest release is the problem. */
const KNOWN_PIN: Record<string, { requirement: string; why: string }> = {
  // setuptools 81 dropped pkg_resources, which plenty of libraries still import at startup
  pkg_resources: {
    requirement: 'setuptools<81',
    why: 'setuptools 81 removed pkg_resources, and something here still imports it'
  }
};

/* eslint-enable camelcase */

export interface IMissingModule {
  /** The name in the traceback, as Python reported it. */
  module: string;
  /** What to hand pip. */
  requirement: string;
  /** One line for the user, explaining what this install is for. */
  why: string;
}

/**
 * The module a traceback says is missing, or null when the error is about something else.
 *
 * Only the failures an install can actually fix are reported: a missing module. An ImportError
 * over a name that moved between versions is a different problem and belongs to the model.
 */
/** What to install for a module that will not import, whatever told us it won't. */
export function requirementFor(module: string): IMissingModule {
  const pinned = KNOWN_PIN[module];
  if (pinned) {
    return { module, requirement: pinned.requirement, why: pinned.why };
  }
  const requirement = DISTRIBUTION_FOR[module] ?? module;
  return {
    module,
    requirement,
    why:
      requirement === module
        ? `${module} is not installed in this kernel`
        : `${module} comes from the ${requirement} package, which is not installed in this kernel`
  };
}

export function missingModuleFrom(traceback: string): IMissingModule | null {
  if (!traceback) {
    return null;
  }
  const notFound = /ModuleNotFoundError:\s*No module named ['"]([A-Za-z0-9_.]+)['"]/.exec(traceback);
  const importFailed = notFound ?? /ImportError:\s*No module named ['"]?([A-Za-z0-9_.]+)['"]?/.exec(traceback);
  if (!importFailed) {
    return null;
  }

  // "No module named 'a.b'" means the top-level package is what has to be installed
  return requirementFor(importFailed[1].split('.')[0]);
}

/** The error's name, for telling "the same failure again" from "a new one". */
export const errorNameFrom = (traceback: string): string => {
  const named = /^\s*([A-Za-z_][A-Za-z0-9_.]*(?:Error|Exception|Warning)):/m.exec(traceback || '');
  return named ? named[1] : '';
};
