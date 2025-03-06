import {
  app,
  BrowserWindow,
  Tray,
  Menu,
  nativeImage,
  nativeTheme,
} from 'electron'
import { join } from 'node:path'
import { registerIpcMain } from '@egoist/tipc/main'
import { router } from './tipc'
import { isWin11 } from './utils'

registerIpcMain(router)

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let tray: Tray
let win: BrowserWindow

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })
}

app.whenReady().then(() => {
  const iconPath = join(
    __dirname,
    `..${import.meta.env.PROD ? '/.output' : ''}/public/favicon.ico`,
  )

  const isDark = nativeTheme.shouldUseDarkColors
  win = new BrowserWindow({
    frame: false,
    width: 1550,
    height: 900,
    minHeight: 400,
    minWidth: 350,
    backgroundMaterial: isWin11 ? 'mica' : undefined,
    backgroundColor: isWin11 ? undefined : isDark ? '#121212' : '#f3f3f3',
    icon: iconPath,
    titleBarStyle: 'hidden',
    titleBarOverlay: isDark
      ? { color: '#21212100', symbolColor: '#aaaaaa' }
      : { color: '#f3f3f300', symbolColor: '#434343' },
    webPreferences: {
      preload: join(__dirname, 'preload.mjs'),
      sandbox: false,
      contextIsolation: true,
      backgroundThrottling: false,
      webSecurity: import.meta.env.DEV ? false : true,
    },
  })

  tray = new Tray(nativeImage.createFromPath(iconPath))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      click() {
        win.destroy()
        app.quit()
      },
    },
  ])
  tray.setToolTip('Vitify Admin')
  tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    win.show()
  })

  if (import.meta.env.DEV) {
    win.loadURL(JSON.parse(process.env.__NUXT_DEV__!).proxy.url)
    win.webContents.on('before-input-event', (event, input) => {
      if (input.type === 'keyDown' && input.key === 'F12') {
        win.webContents.toggleDevTools()
      }
    })
  } else {
    win.loadFile('.output/public/200.html')
  }
})

app.on('browser-window-created', (e, win) => {
  win.removeMenu()
})
