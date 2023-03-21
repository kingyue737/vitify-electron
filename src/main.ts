import { createApp, type Plugin } from 'vue'

import App from './App.vue'
import '@/assets/styles/index.scss'

/* Vue devtools */
if (import.meta.env.DEV) {
  const script = document.createElement('script')
  script.src = 'http://localhost:8098'
  document.head.appendChild(script)
}

const app = createApp(App)

Object.values(
  import.meta.glob<Plugin>('./plugins/*.ts', { eager: true, import: 'default' })
).forEach((v) => app.use(v))

app.mount('#app')
