/*
 * Copyright (c) Pretzel AI GmbH.
 * This file is part of the Pretzel project and is licensed under the
 * GNU Affero General Public License version 3.
 * See the LICENSE_AGPLv3 file at the root of the project for the full license text.
 * Contributions by contributors listed in the PRETZEL_CONTRIBUTORS file (found at
 * the root of the project) are licensed under AGPLv3.
 */

/**
 * The libraries someone names in a question, so we can look them up before answering.
 *
 * A model that has a tool for checking the environment still has to remember to use it, and when
 * it forgets you get confident code around a library that isn't installed — which fails, gets
 * "fixed", and fails again. Asking "you said gymnasium, is gymnasium here?" costs one silent
 * lookup and takes the remembering out of it.
 */

/**
 * Names worth looking up when they appear in a sentence.
 *
 * Deliberately a list rather than a guess: "cartpole" and "window" are not packages, and telling
 * a model that "cartpole is not installed" would be worse than saying nothing. Leaning towards
 * libraries that draw something — those are the ones whose absence or whose windows surprise
 * people in a notebook — plus the everyday scientific stack.
 */
/* eslint-disable camelcase -- Python import names, not identifiers of ours */
const KNOWN_LIBRARIES = new Set([
  'altair',
  'anthropic',
  'bokeh',
  'boto3',
  'bs4',
  'catboost',
  'cv2',
  'dash',
  'datasets',
  'django',
  'duckdb',
  'fastapi',
  'flask',
  'folium',
  'geopandas',
  'gradio',
  'gym',
  'gymnasium',
  'h5py',
  'imageio',
  'ipywidgets',
  'jax',
  'keras',
  'kivy',
  'langchain',
  'librosa',
  'lightgbm',
  'manim',
  'matplotlib',
  'mediapipe',
  'mlflow',
  'moviepy',
  'mujoco',
  'networkx',
  'nltk',
  'numba',
  'numpy',
  'open3d',
  'openai',
  'optuna',
  'pandas',
  'panel',
  'pettingzoo',
  'PIL',
  'plotly',
  'polars',
  'pyarrow',
  'pyaudio',
  'pybullet',
  'pydantic',
  'pygame',
  'pyglet',
  'pymongo',
  'pyqt5',
  'pyside6',
  'pyvista',
  'requests',
  'scipy',
  'seaborn',
  'selenium',
  'serial',
  'shapely',
  'skimage',
  'sklearn',
  'sounddevice',
  'soundfile',
  'spacy',
  'sqlalchemy',
  'stable_baselines3',
  'statsmodels',
  'streamlit',
  'sympy',
  'tensorflow',
  'torch',
  'torchvision',
  'tqdm',
  'transformers',
  'trimesh',
  'turtle',
  'vpython',
  'vtk',
  'wandb',
  'xarray',
  'xgboost',
  'yaml'
]);

/**
 * What people call a library out loud, mapped to what Python calls it.
 *
 * Nobody says "import cv2" in a sentence; they say OpenCV. Looking up the spoken name finds
 * nothing and we would wrongly report it missing, so the spoken names are translated first.
 */
const SPOKEN_AS: Record<string, string> = {
  beautifulsoup: 'bs4',
  beautifulsoup4: 'bs4',
  'hugging-face': 'transformers',
  huggingface: 'transformers',
  opencv: 'cv2',
  'opencv-python': 'cv2',
  'opencv-contrib-python': 'cv2',
  pillow: 'PIL',
  pyqt: 'pyqt5',
  pyside: 'pyside6',
  pytorch: 'torch',
  'scikit-image': 'skimage',
  'scikit-learn': 'sklearn',
  'stable-baselines3': 'stable_baselines3',
  'python-dotenv': 'dotenv',
  pyyaml: 'yaml',
  tf: 'tensorflow'
};
/* eslint-enable camelcase */

const LOOKUP = new Map<string, string>();
for (const name of KNOWN_LIBRARIES) {
  LOOKUP.set(name.toLowerCase(), name);
}
for (const [spoken, real] of Object.entries(SPOKEN_AS)) {
  LOOKUP.set(spoken, real);
}

/**
 * The libraries a piece of text names, in the form Python would import them.
 *
 * Capped, because the point is to check what the question is about, not to survey an essay.
 */
export function libraryMentions(text: string, limit = 6): string[] {
  if (!text) {
    return [];
  }
  const found: string[] = [];
  for (const token of text.toLowerCase().match(/[a-z][a-z0-9_-]{1,30}/g) ?? []) {
    const name = LOOKUP.get(token);
    if (name && !found.includes(name)) {
      found.push(name);
      if (found.length >= limit) {
        break;
      }
    }
  }
  return found;
}
