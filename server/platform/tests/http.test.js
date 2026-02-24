'use strict'

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadEnvFile } from 'node:process'
import { build } from '../app.js'

loadEnvFile('.env')

//node --test --test-only --inspect-brk test/<test-file.test.js> {only: true}
const opts = {
  trustProxy: ['127.0.0.1'],
  logger: {
    level: 'info',
    transport: { 
      target: 'pino-pretty',
      options: {
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    }
  }
}

test('Default lang redirect', async () => {
  const app = await build()
  const response = await app.inject({
    method: 'GET',
    url: '/'
  })
  assert.strictEqual(response.statusCode, 302)
  assert.strictEqual(response.headers['location'], `/${app.langConfig.default}`)
})

test('Home page', async () => {
  const app = await build()
  const response = await app.inject({
    method: 'GET',
    url: `/${app.langConfig.default}`,
    headers: {
      Cookie: process.env.DEV_COOKIE
    },
  })
  assert.strictEqual(response.statusCode, 200)
  assert.strictEqual(response.headers['content-type'], 'text/html')
})

test('About page', async () => {
  const app = await build()
  const response = await app.inject({
    method: 'GET',
    url: `/${app.langConfig.default}/about`
  })
  assert.strictEqual(response.statusCode, 200)
  assert.strictEqual(response.headers['content-type'], 'text/html')
})

test('Wrong lang redirect', async () => {
  const app = await build()
  const response = await app.inject({
    method: 'GET',
    url: '/xxx/about'
  })
  assert.strictEqual(response.statusCode, 302)
  assert.strictEqual(response.headers['location'], `/${app.langConfig.default}/about`)
})

test('Not found page', async () => {
  const app = await build()
  const response = await app.inject({
    method: 'GET',
    url: `/${app.langConfig.default}/xxx`
  })
  assert.strictEqual(response.statusCode, 404)
})

test('Home API', async () => {
  const app = await build()
  const response = await app.inject({
    method: 'GET',
    url: `/${app.langConfig.default}/api/home`
  })
  assert.strictEqual(response.statusCode, 200)
  assert.ok(response.headers['content-type'].includes('application/json'))
})

test('Not found API', async () => {
  const app = await build()
  const response = await app.inject({
    method: 'GET',
    url: `/${app.langConfig.default}/api/xxx`
  })
  assert.strictEqual(response.statusCode, 404)
})

test('Login page for loggedOut', async () => {
  const app = await build()
  const response = await app.inject({
    method: 'GET',
    url: `/${app.langConfig.default}/login`
  })
  assert.strictEqual(response.statusCode, 200) 
})

test('Logout page for loggedOut', async () => {
  const app = await build()
  const response = await app.inject({
    method: 'GET',
    url: `/${app.langConfig.default}/logout`
  })
  assert.strictEqual(response.statusCode, 302)
  assert.strictEqual(response.headers['location'], `/${app.langConfig.default}/login`)
})

test('Denied private page', async () => {
  const app = await build()
  const response = await app.inject({
    method: 'GET',
    url: `/${app.langConfig.default}/profile`
  })
  assert.strictEqual(response.statusCode, 302)
  assert.strictEqual(response.headers['location'], `/${app.langConfig.default}/login`)
})

test('Denied private API', async () => {
  const app = await build()
  const response = await app.inject({
    method: 'GET',
    url: `/${app.langConfig.default}/api/profile`
  })
  assert.strictEqual(response.statusCode, 403)
})
