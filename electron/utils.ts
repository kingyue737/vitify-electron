import os from 'node:os'

export const isWin11 = os.version().startsWith('Windows 11')
