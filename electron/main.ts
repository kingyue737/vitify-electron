import { app, BrowserWindow, ipcMain } from 'electron'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

app.whenReady().then(() => {
  const win = new BrowserWindow({
    frame: false,
    width: 1500,
    height: 900,
    minHeight: 400,
    minWidth: 300,
    icon: join(__dirname, '../public/favicon.ico'),
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#f3f3f300',
      symbolColor: '#434343',
      height: 30,
    },
    webPreferences: {
      preload: join(__dirname, 'preload.mjs'),
    },
  })

  ipcMain.handle('darkMode:toggle', (event, dark: boolean) => {
    win.setTitleBarOverlay(
      dark
        ? { color: '#21212100', symbolColor: '#999999' }
        : { color: '#f3f3f300', symbolColor: '#434343' },
    )
  })

  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (process.env.VITE_DEV_SERVER_URL) {
    win.webContents.openDevTools()
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    // Load your file
    win.loadFile('dist/index.html')
  }
})

app.on('browser-window-created', (e, win) => {
  win.removeMenu()
})
