import { createApp } from 'vue'
// TypeScript error? Run VSCode command
// TypeScript: Select TypeScript version - > Use Workspace Version
import App from './app.vue'
import appRoutes from './app.route'

const app = createApp(App)

app.use(appRoutes)

app.mount('#app')
