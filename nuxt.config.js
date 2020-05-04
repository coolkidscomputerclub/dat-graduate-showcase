import path from 'path';

import cssnano from 'cssnano';

import * as env from './utilities/env';
import hooks from './utilities/hooks';
import { projectUrlFromSlug } from './assets/js/urls';
import BREAKPOINTS from './assets/js/breakpoints';
import { SITE_TITLE } from './assets/js/constants';
import entries from './entries.json';
import criticalManifest from './assets/critical-manifest.json';

const {
  isDevelopment,
  isProduction,

  ANALYZE,
  SITE_ENV,
  NODE_ENV,
  URL,
} = env;
const NOW = new Date().toISOString();

console.info({
  SITE_ENV,
  NODE_ENV,

  URL,
});

export default {
  env: {
    SITE_ENV,
    NODE_ENV,
    URL,
  },

  modules: ['@nuxtjs/sitemap', '@saulhardman/nuxt-robotize'],

  buildModules: [
    '@saulhardman/nuxt-release',
    '@saulhardman/nuxt-html-validate',
  ],

  plugins: [
    '~/plugins/critical.server',
    '~/plugins/lazysizes.client',
    '~/plugins/focus-visible.client',
  ].filter(Boolean),

  htmlValidate: {
    ignoreList: [
      'Error: Attribute “loading” not allowed on element “img” at this point.',
      'Warning: Article lacks heading. Consider using “h2”-“h6” elements to add identifying headings to all articles.',
      /^Error: CSS:/,
      'Error: Attribute “site” not allowed on element “script” at this point.',
    ],
  },

  sitemap: {
    path: '/sitemap.xml',
    hostname: URL,

    exclude: ['/404'],

    routes: () => [
      {
        url: '/',
        lastmod: NOW,
        changefreq: 'yearly',
      },

      ...entries.map(({ project: { slug } }) => ({
        url: projectUrlFromSlug(slug),
        lastmod: NOW,
        changefreq: 'yearly',
      })),
    ],
  },

  robotize: () => ({
    useragent: '*',
    allow: '/',
    sitemap: `${URL}sitemap.xml`,
  }),

  watchers: {
    chokidar: {
      awaitWriteFinish: true,
    },
  },

  watch: ['~/critical/*.min.js', '~/assets/css/settings/*'],

  head: {
    htmlAttrs: {
      lang: 'en',
      dir: 'ltr',
    },

    title: SITE_TITLE,

    meta: [
      { hid: 'charset', charset: 'utf-8' },

      {
        hid: 'viewport',
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },

      { hid: 'og:type', property: 'og:type', content: 'website' },

      { hid: 'og:locale', property: 'og:locale', content: 'en_GB' },

      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'DAT’13',
      },

      {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content: '@saulhardman',
      },
    ]
      .filter(Boolean)
      .map(meta => ({ ...meta, once: true })),

    link: [
      ...(isProduction
        ? [
            {
              hid: 'use-fathom-dns-prefetch',
              rel: 'dns-prefetch',
              href: 'cdn.usefathom.com',
            },

            {
              hid: 'use-fathom-preconnect',
              rel: 'preconnect',
              href: 'cdn.usefathom.com',
            },
          ]
        : []),

      {
        hid: 'apple-touch-icon',
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicons/apple-touch-icon.png',
      },

      {
        hid: 'favicon-32x32',
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicons/favicon-32x32.png',
      },

      {
        hid: 'favicon-16x16',
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicons/favicon-16x16.png',
      },

      {
        hid: 'mask-icon',
        rel: 'mask-icon',
        color: '#ffffff',
        href: '/favicons/safari-pinned-tab.svg',
      },

      {
        hid: 'favicon',
        rel: 'shortcut icon',
        href: '/favicon.ico',
      },
    ]
      .filter(Boolean)
      .map(link => ({ ...link, once: true })),

    script: [
      isProduction && {
        hid: 'fathom-js',
        src: 'https://cdn.usefathom.com/3.js',
        site: 'LQZWWCJY',
        async: true,
      },

      {
        src: `${URL}${criticalManifest.index}`,
        async: true,
        defer: true,
        body: true,
      },
    ].filter(Boolean),
  },

  /* start `afterNavigation` Vue Meta fix */
  features: {
    transitions: false,
  },

  vueMeta: {
    refreshOnceOnNavigation: true,
  },
  /* end `afterNavigation` Vue Meta fix */

  css: ['~/assets/css/index.css'],

  loading: {
    height: '4px',
  },

  generate: {
    routes: () =>
      entries.map(({ project: { slug } }) => projectUrlFromSlug(slug)),

    fallback: false,
  },

  build: {
    analyze: ANALYZE,

    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[name].[contenthash].js'),
    },

    terser: {
      sourceMap: true,

      terserOptions: {
        compress: {
          pure_funcs: ['console.log'],
        },

        output: {
          comments: false,
        },
      },
    },

    extend(config, { isClient }) {
      if (isClient && !isDevelopment) {
        config.devtool = 'source-map';
      }

      config.module.rules.unshift({
        test: /\.ico$/,
        loader: 'file-loader',
      });
    },

    optimizeCSS: {
      cssProcessor: cssnano,
      cssProcessorPluginOptions: {
        preset: [
          'default',
          {
            mergeRules: false,
            discardComments: {
              removeAll: true,
            },
          },
        ],
      },
    },

    postcss: {
      plugins: {
        cssnano: false,

        'postcss-hover-media-feature': {},

        tailwindcss: {},

        'postcss-calc': {
          warnWhenCannotResolve: true,
        },

        ...(isDevelopment
          ? {}
          : {
              '@fullhuman/postcss-purgecss': {
                content: [
                  path.resolve(__dirname, 'layouts/**/*.vue'),
                  path.resolve(__dirname, 'pages/**/*.vue'),
                  path.resolve(__dirname, 'components/**/*.vue'),
                ],

                whitelist: ['html', 'body', 'nuxt-progress'],
                whitelistPatterns: [
                  /^\.no-js/,
                  /^\.js/,
                  /^\.is-/,
                  /\.focus-visible/,
                ],
                whitelistPatternsChildren: [
                  /^\.no-js/,
                  /^\.js/,
                  /^\.is-/,
                  /\.focus-visible/,
                ],

                defaultExtractor: content => content.match(/[\w-/:]+/g) || [],

                extractors: [
                  {
                    extractor: content =>
                      content
                        .replace(/<style[\s\S]*>[\s\S]*<\/style>/gi, '')
                        .match(/[\w-/:]+/g) || [],

                    extensions: ['vue'],
                  },
                ],

                rejected: ANALYZE,
              },
            }),

        ...(isDevelopment
          ? {}
          : {
              'postcss-pxtorem': {
                replace: false,
                selectorBlackList: ['html'],
              },
            }),
        ...(isDevelopment ? {} : { 'css-mqpacker': { sort: true } }),
      },

      order: [
        'postcss-import',
        'postcss-preset-env',
        'postcss-hover-media-feature',
        'postcss-calc',
        'tailwindcss',
        !isDevelopment && '@fullhuman/postcss-purgecss',
      ].filter(Boolean),

      preset: {
        stage: false,

        features: {
          'nesting-rules': true,
          'custom-properties': {
            preserve: false,
          },
          'focus-visible-pseudo-class': true,
          'custom-media-queries': true,
          'system-ui-font-family': true,
        },

        importFrom: [
          path.join(process.cwd(), 'assets/css/settings/settings.color.css'),

          path.join(process.cwd(), 'assets/css/settings/settings.spacing.css'),

          path.join(
            process.cwd(),
            'assets/css/settings/settings.typography.css',
          ),

          () => {
            const customMedia = Object.entries(BREAKPOINTS).reduce(
              (accumulator, [name, { em }]) => ({
                ...accumulator,
                [`--${name}`]: `(min-width: ${em}em)`,
                [`--until-${name}`]: `(max-width: ${em - 0.01}em)`,
              }),
              {},
            );

            return {
              customMedia,
            };
          },
        ],
      },
    },
  },

  hooks,
};