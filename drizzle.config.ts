import { defineConfig } from 'drizzle-kit'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import packageJson from './package.json'

export default defineConfig({
  out: './drizzle',
  schema: './electron/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: pathToFileURL(
      join(homedir(), `AppData/Roaming/${packageJson.name}/sqlite.db`),
    ).href,
  },
  casing: 'snake_case',
})
