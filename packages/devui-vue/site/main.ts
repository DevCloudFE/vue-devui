import { createApp } from 'vue';
import DevUI from '../devui/vue-devui';
import App from './app.vue';

createApp(App).use(DevUI).mount('#testWeb');
