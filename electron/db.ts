import { drizzle } from 'drizzle-orm/libsql'
import { migrate } from 'drizzle-orm/libsql/migrator'
import { app } from 'electron'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

export const userDataPath = app.getPath('userData')

const dbPath = pathToFileURL(join(userDataPath, 'sqlite.db')).href

export const db = drizzle(dbPath, { casing: 'snake_case' })

if (import.meta.env.PROD) {
  try {
    migrate(db, { migrationsFolder: './drizzle' })
  } catch (e) {
    console.log(e)
  }
}
