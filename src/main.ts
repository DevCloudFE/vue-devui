import { createApp } from 'vue'
import App from './app.vue'
import appRoutes from './app.route'

const app = createApp(App)

app.use(appRoutes)

app.mount('#app')
