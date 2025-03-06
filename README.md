<p align="center">
<img src="https://github.com/user-attachments/assets/88ba1bd2-4a56-484b-ae58-98a90c6ba97c" width="800"/>
</p>

<h2 align="center">
<a href="https://github.com/kingyue737/vitify-nuxt">Vitify</a> with Electron
</h2><br>

<pre align="center">
⚛️ Electron + Nuxt + Vuetify
Opinionated Starter Template
</pre>

## Features

- ⚛️ [Electron](https://github.com/electron/electron) - Build cross-platform desktop apps with JavaScript, HTML, and CSS

- 💚 [Nuxt](https://nuxt.com/) - SPA, File-based routing, Layout system, components auto importing, modules, etc

- 🍍 [State Management via Pinia](https://pinia.vuejs.org/)

- 🧼 [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new) powered by [@nuxt/eslint](https://github.com/nuxt/eslint), future-proof

- 🦾 Typed IPC communication powered with [`@egoist/tipc`](https://github.com/egoist/tipc)

- 📦 ESM Only - Configured [Rollup](https://rollupjs.org/) to transform CJS both in your main/renderer processes

- 💾 Database - [SQLite](https://www.sqlite.org/) + [Drizzle ORM](https://orm.drizzle.team/), next gen TypeScript ORM DX

### App Starter Template

- 🪟 Default layout with drawer, header(title bar) and footer (status bar)

- 🧭 Auto generated navigation drawer and breadcrumbs based on routes

- 🔔 Notification store

- 📉 Data visualization with [nuxt-echarts](https://github.com/kingyue737/nuxt-echarts)

- 🎨 Theme color customization and dark mode

- 📱 Responsive layout

## Variations

- [vitify-nuxt](https://github.com/kingyue737/vitify-nuxt) - Vuetify 3 with Nuxt 3, the best DX 🔥🔥🔥

- [vitify-next](https://github.com/kingyue737/vitify-next) - Lightweight Vue 3 version without Electron
- [vitify-admin](https://github.com/kingyue737/vitify-electron) - Vite + Vuetify 2, Opinionated Admin Stater Template

## TODO

- [x] Windows 11
- [x] Windows 10
- [] Linux
- [] MacOS

## Usage

### Development

```bash
pnpm dev
```

### Build

To build the App, run

```bash
pnpm build
```

And you will see the generated executable and `setup.exe` in `release` folder.
