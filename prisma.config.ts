import 'dotenv/config'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations'
  },
  typedSql: {
    path: 'prisma/sql'
  },
  datasource: {
    url: process.env['DATABASE_URL']
  }
})
