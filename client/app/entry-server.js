import { createApp } from './app.js'
import { renderToString } from 'vue/server-renderer'

export async function renderAppHtml(ctx) {

  const app = createApp(ctx)
  
  return await renderToString(app)

}

