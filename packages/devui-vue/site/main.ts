import { createApp } from 'vue';
import DevUI from '../devui/vue-devui';
import App from './app.vue';
import '@devui-design/icons/icomoon/devui-icon.css'

createApp(App).use(DevUI).mount('#testWeb');
