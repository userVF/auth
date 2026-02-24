'use strict'

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { join } from 'node:path'
import { loadEnvFile } from 'node:process'

import ajvErrors from 'ajv-errors'
import { build } from '../server/platform/app.js'

loadEnvFile(join(import.meta.dirname, '..', '.env'))

const opts = {  
  ajv: {
    customOptions: {
      allErrors: true
    },
    plugins: [
      ajvErrors
    ]
  },
}

test('Default lang redirect', async () => {
  const app = await build(opts)
  const p = process.env
  const response = await app.inject({
    method: 'GET',
    url: '/'
  })
  assert.strictEqual(response.statusCode, 302)
  assert.strictEqual(response.headers['location'], `/${app.langConfig.default}`)
})

test('Home page', async () => {
  const app = await build(opts)
  const response = await app.inject({
    method: 'GET',
    url: `/${app.langConfig.default}`
  })
  assert.strictEqual(response.statusCode, 200)
  assert.strictEqual(response.headers['content-type'], 'text/html')
})

test('About page', async () => {
  const app = await build(opts)
  const response = await app.inject({
    method: 'GET',
    url: `/${app.langConfig.default}/about`
  })
  assert.strictEqual(response.statusCode, 200)
  assert.strictEqual(response.headers['content-type'], 'text/html')
})

test('Wrong lang redirect', async () => {
  const app = await build(opts)
  const response = await app.inject({
    method: 'GET',
    url: '/xxx/about'
  })
  assert.strictEqual(response.statusCode, 302)
  assert.strictEqual(response.headers['location'], `/${app.langConfig.default}/about`)
})

test('Not found page', async () => {
  const app = await build(opts)
  const response = await app.inject({
    method: 'GET',
    url: `/${app.langConfig.default}/xxx`
  })
  assert.strictEqual(response.statusCode, 404)
})

test('Home API', async () => {
  const app = await build(opts)
  const response = await app.inject({
    method: 'GET',
    url: `/${app.langConfig.default}/api/home`
  })
  assert.strictEqual(response.statusCode, 200)
  assert.ok(response.headers['content-type'].includes('application/json'))
})

test('Not found API', async () => {
  const app = await build(opts)
  const response = await app.inject({
    method: 'GET',
    url: `/${app.langConfig.default}/api/xxx`
  })
  assert.strictEqual(response.statusCode, 404)
})

