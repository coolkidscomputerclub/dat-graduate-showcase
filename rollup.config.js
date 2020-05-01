import path from 'path';

import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonJs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';

import {
  isDevelopment,
  isProduction,
  SITE_ENV,
  FATHOM_SITE_ID,
  NODE_ENV,
} from './utilities/env';
import babelConfig from './critical/babel.config';

const CRITICAL_DIR = path.join(process.cwd(), 'critical');

const plugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    'process.env.SITE_ENV': JSON.stringify(SITE_ENV),
    'process.env.FATHOM_SITE_ID': JSON.stringify(FATHOM_SITE_ID),
    'process.server': JSON.stringify(false),
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

  isProduction && {
    input: path.join(CRITICAL_DIR, 'fathom.js'),

    output: {
      file: path.join(CRITICAL_DIR, 'fathom.min.js'),
      format: 'iife',
    },

    plugins,
  },
].filter(Boolean);
