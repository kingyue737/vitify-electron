import { app, BrowserWindow } from 'electron'

app.whenReady().then(() => {
  const win = new BrowserWindow({
    frame: false,
    width: 1500,
    height: 900,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#fdfdfd',
      symbolColor: '#434343',
      height: 30,
    },
  })

  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    // Load your file
    win.loadFile('dist/index.html')
  }
})
