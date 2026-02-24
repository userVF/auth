import fp from 'fastify-plugin'
import fastifyCookie from '@fastify/cookie'

export default fp(async function(app) {
  app.register(fastifyCookie, {
    secret: process.env.COOKIE_KEY,
    parseOptions: {
      signed: true,
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      maxAge: Number(process.env.COOKIE_MAX_AGE),
      secure: process.env.COOKIE_SECURE === 'true'
    },
  })
})