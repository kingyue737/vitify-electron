import { contextBridge, ipcRenderer, webUtils } from 'electron'

const { invoke, on, off, send } = ipcRenderer
const exposed = { ...ipcRenderer, invoke, on, off, send }
contextBridge.exposeInMainWorld('ipcRenderer', exposed)
contextBridge.exposeInMainWorld('webUtils', webUtils)

declare global {
  interface Window {
    ipcRenderer: typeof exposed
    webUtils: typeof webUtils
  }
}
