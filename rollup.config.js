import path from 'path';

import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonJs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import manifest from 'rollup-plugin-output-manifest';

import { isDevelopment, NODE_ENV, SITE_ENV } from './utilities/env';
import babelConfig from './critical/babel.config';

const { CRITICAL_DIR, ROOT_DIR, STATIC_DIR } = require('./utilities/constants');

const plugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    'process.env.SITE_ENV': JSON.stringify(SITE_ENV),
    'process.server': JSON.stringify(false),
    'process.client': JSON.stringify(true),
  }),

  resolve({
    browser: true,
  }),

  commonJs({
    include: 'node_modules/**',
  }),

  babel({
    exclude: 'node_modules/**',
    babelrc: false,
    ...babelConfig,
  }),

  !isDevelopment &&
    terser({
      compress: {
        pure_funcs: ['console.log'],
      },

      output: {
        comments: false,
      },
    }),

  filesize(),

  manifest({
    fileName: path.join(ROOT_DIR, 'assets/critical-manifest.json'),
    isMerge: true,
    nameSuffix: '',
  }),
].filter(Boolean);

export default [
  {
    input: path.join(CRITICAL_DIR, 'critical.js'),

    output: {
      file: path.join(CRITICAL_DIR, 'critical.min.js'),
      format: 'iife',
      sourcemap: isDevelopment ? 'inline' : false,
    },

    plugins,
  },

  {
    input: path.join(CRITICAL_DIR, 'index.js'),

    output: {
      dir: STATIC_DIR,
      entryFileNames: isDevelopment ? 'index.min.js' : 'index.[hash].min.js',
      format: 'iife',
      sourcemap: true,
    },

    plugins,
  },
].filter(Boolean);
