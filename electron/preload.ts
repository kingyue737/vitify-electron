import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  toggleDark: (dark: boolean) => ipcRenderer.invoke('darkMode:toggle', dark),
})
