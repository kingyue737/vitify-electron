import { notBundle } from 'vite-plugin-electron/plugin'
import esmShim from '@rollup/plugin-esm-shim'

const isDev = import.meta.env.NODE_ENV === 'development'
const isProd = import.meta.env.NODE_ENV === 'production'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: { port: 29999 },
  ssr: false,
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'vuetify-nuxt-module',
    'nuxt-echarts',
    'nuxt-electron',
    '@nuxt/icon',
    '@nuxt/eslint',
  ],
  css: ['~/assets/styles/index.css'],
  experimental: { typedPages: true },
  typescript: { shim: false, strict: true },
  app: { cdnURL: './' },
  routeRules: {
    '/': { redirect: { to: '/homepage', statusCode: 301 } },
  },
  vue: { propsDestructure: true },
  vuetify: {
    moduleOptions: {
      ssrClientHints: {
        viewportSize: true,
        prefersColorScheme: true,
        prefersColorSchemeOptions: {},
        reloadOnFirstRequest: true,
      },
    },
  },
  router: { options: { hashMode: true } },
  icon: {
    clientBundle: {
      scan: {
        globInclude: ['**/*.{vue,js,ts}'],
        globExclude: [
          'node_modules',
          'dist',
          'release',
          'dist-electron',
          'electron',
          '.*',
        ],
      },
    },
    customCollections: [
      {
        prefix: 'custom',
        dir: './assets/icons',
      },
    ],
  },
  electron: {
    disableDefaultOptions: true,
    build: [
      {
        vite: {
          plugins: [isDev ? notBundle() : undefined, esmShim()],
          build: {
            target: 'esnext',
            minify: true,
            commonjsOptions: {
              ignoreDynamicRequires: true,
            },
            // disable vite-plugin-electron default lib mode
            lib: false,
            rollupOptions: {
              // overwrite default .html entry
              input: 'electron/main.ts',
              output: {
                entryFileNames: '[name].js',
              },
            },
          },
        },
      },
      {
        onstart(options) {
          options.reload()
        },
        vite: {
          build: {
            minify: isProd,
            rollupOptions: {
              input: 'electron/preload.ts',
              output: {
                // preload script ignore `type: module` and must use `mjs`
                entryFileNames: '[name].mjs',
              },
            },
          },
        },
      },
    ],
  },
  echarts: {
    charts: ['LineChart', 'BarChart', 'PieChart', 'RadarChart'],
    components: [
      'DataZoomComponent',
      'LegendComponent',
      'TooltipComponent',
      'ToolboxComponent',
      'GridComponent',
      'TitleComponent',
      'DatasetComponent',
      'VisualMapComponent',
    ],
  },
  vite: {
    build: {
      target: 'esnext',
      modulePreload: { polyfill: false },
      chunkSizeWarningLimit: 5000,
    },
  },
  compatibilityDate: '2025-03-06',
})
