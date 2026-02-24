import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command, mode }) => {

  const env = loadEnv(mode, process.cwd(), '')

  const config = {    
    base: env.STATIC_ORIGIN,
    plugins: [ 
      vue(), 
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./client', import.meta.url)),
      },
    },
    build: {
      emptyOutDir: true,
      // sourcemap: true,
      // minify: false,
    },
  }

  config['build']['rollupOptions'] = {
    input: {
      index: './html/index.html',
    },
  }

  config['server'] = {}

  if (command === 'serve') {
    config['server']['watch'] = {
      usePolling: true,
      interval: 5000,      
    }
    config['server']['proxy'] = {
      '^/(ru|kz|en)/api/.*': {
        target: env.APP_ORIGIN,
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, _req, _res) => {
            // proxyReq.setHeader('Cookie',`sessionId=${env.DEV_SESSION_ID}`)
            proxyReq.setHeader('X-Real-IP', '127.0.0.1')
          })
        },
      },  
    }
  }

  return config
  
})

