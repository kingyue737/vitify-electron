export interface IElectronAPI {
  toggleDark: (dark: boolean) => Promise<void>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
