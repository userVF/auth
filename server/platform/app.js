import fastify from 'fastify'
import autoLoad from '@fastify/autoload'
import { join } from 'node:path'

export async function build(opts = {}) {

  const app = fastify(opts)

  app.register(autoLoad, {
    dir: join(import.meta.dirname, 'setup'),
  })
  app.register(autoLoad, {
    dir: join(import.meta.dirname, 'decorators'),
  }) 
 

  app.register(autoLoad, {
    dir: join(import.meta.dirname, 'plugins'),
  })

  app.register(autoLoad, {
    dir: join(import.meta.dirname, 'routes/auth'),
    autoHooks: true,
  })
  app.register(autoLoad, {
    dir: join(import.meta.dirname, 'routes/public/api'),
    options: { prefix: '/:lang/api' },
  })
  app.register(autoLoad, {
    dir: join(import.meta.dirname, 'routes/public/pages'),
    autoHooks: true,
    cascadeHooks: true,
    dirNameRoutePrefix: false,
  })

  app.register(autoLoad, {
    dir: join(import.meta.dirname, 'routes/private/api'),
    autoHooks: true,
    options: { prefix: '/:lang/api' },
  })
  app.register(autoLoad, {
    dir: join(import.meta.dirname, 'routes/private/pages'),
    autoHooks: true,
    cascadeHooks: true,
    dirNameRoutePrefix: false,
    options: { prefix: '/:lang' },
  })
  
  app.setErrorHandler(async (err, request, reply) => {
    request.log.error({ err })
    reply.code(err.statusCode || 500)
    return
  })
  
  return app
}