import fs from 'node:fs/promises'
import { join } from 'node:path'
import crypto from 'node:crypto'

import fp from 'fastify-plugin'

import { renderAppHtml } from '../../../build/server/entry-server.js'

const rawHtmlPath = join(import.meta.dirname, '..', '..', '..', 'build/client/html/index.html')
const rawHtml = await fs.readFile(rawHtmlPath, { encoding: 'utf8' })

export default fp(async function(app) {

  app.decorate('getHtml', async ctx => {

    const { context, head, data } = ctx
    const nonceStr = crypto.randomUUID()
    const appHtml = await renderAppHtml(ctx)

    let html = rawHtml
      .replace('!--title--', head.title)
			.replace('!--lang--', context.lang)
      .replace('!--description--',  head.description)
      .replace('!--canonical--', `<link rel="canonical" href="${process.env.APP_ORIGIN}${context.path}">`)
      .replace('!--hreflangs--', 
        `<link rel="alternate" hreflang="ru" href="${process.env.APP_ORIGIN}/ru${context.path.substring(3)}">
         <link rel="alternate" hreflang="kk" href="${process.env.APP_ORIGIN}/kz${context.path.substring(3)}">
         <link rel="alternate" hreflang="en" href="${process.env.APP_ORIGIN}/en${context.path.substring(3)}">
         <link rel="alternate" hreflang="x-default" href="${process.env.APP_ORIGIN}/en${context.path.substring(3)}">`)
      .replace('!--csp--', 
        `<meta http-equiv="Content-Security-Policy" 
          content="default-src 'self' ${process.env.STATIC_ORIGIN} data: ;
          script-src 'nonce-${nonceStr}' ${process.env.STATIC_ORIGIN} ;
          style-src ${process.env.STATIC_ORIGIN} ;"
        >`
      )
      .replace('!--state--', 
        `<script nonce="${nonceStr}">
          window.__INIT_STATE__ = ${JSON.stringify({ context, data })
            .replace(/</g, '\\u003c').replace(/>/g, '\\u003e')}
        </script>`
      )
			.replace('!--html--', appHtml)

    return html
    
  })
})