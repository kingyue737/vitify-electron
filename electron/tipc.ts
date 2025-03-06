import { tipc } from '@egoist/tipc/main'
import { BrowserWindow, shell, nativeTheme } from 'electron'
import { desc, eq } from 'drizzle-orm'
import { db, userDataPath } from './db'
import { isWin11 } from './utils'
import { people } from './schema'

const t = tipc.create()

export const router = {
  toggleDark: t.procedure
    .input<'dark' | 'light' | 'auto'>()
    .action(async ({ context, input: mode }) => {
      const win = BrowserWindow.fromWebContents(context.sender)!
      const themeSource = mode === 'auto' ? 'system' : mode
      nativeTheme.themeSource = themeSource
      const isDark = nativeTheme.shouldUseDarkColors
      win.setTitleBarOverlay(
        isDark
          ? { color: '#21212100', symbolColor: '#aaaaaa' }
          : { color: '#f3f3f300', symbolColor: '#434343' },
      )
      if (!isWin11) {
        win.setBackgroundColor(isDark ? '#121212' : '#f3f3f3')
      }
    }),

  getPeople: t.procedure.action(async () => {
    const data = await db.select().from(people).orderBy(desc(people.id))
    return data
  }),

  deletePerson: t.procedure.input<number>().action(async ({ input: id }) => {
    const [deleted] = await db
      .delete(people)
      .where(eq(people.id, id))
      .returning()
    return deleted
  }),

  showAppFolder: t.procedure.action(async () => {
    shell.openPath(userDataPath)
  }),
}

export type TipcRouter = typeof router
export type RendererHandlers = {
  // add your renderer handler types here
  // https://github.com/egoist/tipc?tab=readme-ov-file#calling-renderer-from-main
  onFooBar: () => void
}
