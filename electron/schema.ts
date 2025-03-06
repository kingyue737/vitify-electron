import { sqliteTable } from 'drizzle-orm/sqlite-core'

export const people = sqliteTable('people', ({ integer, text }) => ({
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  title: text().notNull(),
  email: text(),
  role: text(),
}))
