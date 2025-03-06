import { createClient, createEventHandlers } from '@egoist/tipc/renderer'
import type { TipcRouter, RendererHandlers } from '~/electron/tipc'

export const client = createClient<TipcRouter>({
  ipcInvoke: window.ipcRenderer.invoke,
})

export const handlers = createEventHandlers<RendererHandlers>({
  on: (channel, callback) => {
    window.ipcRenderer.on(channel, callback)
    return () => {
      window.ipcRenderer.off(channel, callback)
    }
  },

  send: window.ipcRenderer.send,
})
