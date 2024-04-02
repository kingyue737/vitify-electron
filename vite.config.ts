import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-meta-layouts'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import pluginRegexp from 'rollup-plugin-regexp'
import * as mdicons from '@mdi/js'
import Electron from 'vite-plugin-electron/simple'
import { notBundle } from 'vite-plugin-electron/plugin'

const mdi: Record<string, string> = {}
Object.keys(mdicons).forEach((key) => {
  const value = (mdicons as Record<string, string>)[key]
  mdi[
    key.replace(
      /[A-Z]+(?![a-z])|[A-Z0-9]/g,
      ($, ofs) => (ofs ? '-' : '') + $.toLowerCase(),
    )
  ] = value
})

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  fs.rmSync('dist-electron', { recursive: true, force: true })
  const isServe = command === 'serve'
  const isBuild = command === 'build'
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG

  return {
    build: { target: 'esnext', chunkSizeWarningLimit: 5000 },
    plugins: [
      pluginRegexp({
        exclude: ['node_modules/**'],
        find: /\b(?<![/\w])(mdi-[\w-]+)\b(?!\.)/,
        replace: (match: string) => {
          if (mdi[match]) {
            return mdi[match]
          } else {
            console.warn('[plugin-regexp] No matched svg icon for ' + match)
            return match
          }
        },
        sourcemap: false,
      }),
      VueDevTools(),
      VueRouter({ importMode: 'sync', dts: './src/typed-router.d.ts' }),
      Vue({ template: { transformAssetUrls } }),
      Layouts(),
      Vuetify({ autoImport: true }),
      Components({ dts: './src/components.d.ts', types: [] }),
      AutoImport({
        imports: [
          'vue',
          'pinia',
          VueRouterAutoImports,
          {
            vuetify: [
              'useTheme',
              'useRtl',
              'useLocale',
              'useDisplay',
              'useLayout',
            ],
          },
        ],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/stores'],
      }),
      Electron({
        main: {
          // Shortcut of `build.lib.entry`
          entry: 'electron/main.ts',
          onstart({ startup }) {
            if (process.env.VSCODE_DEBUG) {
              console.log(
                /* For `.vscode/.debug.script.mjs` */ '[startup] Electron App',
              )
            } else {
              startup()
            }
          },
          vite: {
            build: {
              target: 'esnext',
              sourcemap,
              minify: isBuild,
              outDir: 'dist-electron',
              rollupOptions: {
                output: {
                  inlineDynamicImports: true,
                },
              },
            },
            plugins: [command === 'serve' && notBundle(/* NotBundleOptions */)],
          },
        },
        preload: {
          // Shortcut of `build.rollupOptions.input`.
          // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
          input: 'electron/preload.ts',
          vite: {
            build: {
              target: 'esnext',
              sourcemap: sourcemap ? 'inline' : undefined, // #332
              minify: isBuild,
              outDir: 'dist-electron',
            },
          },
        },
        // Ployfill the Electron and Node.js API for Renderer process.
        // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
        // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
        // renderer: {},
      }),
    ],
    css: {
      devSourcemap: true,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    test: {
      globals: true,
      include: ['test/**/*.test.ts', 'src/**/__tests__/*'],
      environment: 'jsdom',
      setupFiles: ['./test/setup.ts'],
      server: { deps: { inline: ['vuetify'] } },
    },
  }
})
