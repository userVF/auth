import { build } from './app.js'
import closeWithGrace from 'close-with-grace'
import { loadEnvFile } from 'node:process'
import { join } from 'node:path'
import ajvErrors from 'ajv-errors'

loadEnvFile(join(import.meta.dirname, '..', '..', '.env'))

const opts = {
  logger: {
    level: 'info',
    transport: { 
      target: 'pino-pretty',
      options: {
        colorize: true,
        ignore: 'pid,hostname',
        translateTime: 'SYS:standard',
      },
    }
  },
  ajv: {
    customOptions: {
      allErrors: true
    },
    plugins: [
      ajvErrors
    ]
  },
}

const app = await build(opts)

await app.listen({ host: 'localhost', port: process.env.APP_PORT })

// app.ready(app.log.info(app.printRoutes()))

closeWithGrace(async ({ err }) => {
  if (err) {
    app.log.error({ err }, 'server closing due to error')
  }
  app.log.info('shutting down gracefully')
  await app.close()
})