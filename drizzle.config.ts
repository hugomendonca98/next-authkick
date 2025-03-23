import type { Config } from 'drizzle-kit'

const isDev = process.env.USE_DEV_MIGRATIONS_PATH === 'true'

export default {
  schema: './src/lib/db/schema.ts',
  out: isDev ? './src/lib/db/dev/migrations' : './src/lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL as string,
  },
} satisfies Config
