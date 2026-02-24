import { createApp } from './app.js'

import './css/app.css'

const ctx = window.__INIT_STATE__

const app = createApp(ctx)

app.mount('#app')