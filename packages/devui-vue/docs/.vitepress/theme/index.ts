import DevUI from '../../../devui/vue-devui';
import Locale from '../../../devui/locale';
import '@devui-design/icons/icomoon/devui-icon.css';

import { h } from 'vue';
import Theme from 'vitepress/theme';
import './styles/index.scss';

import 'vitepress-theme-demoblock/theme/styles/index.css';
import { registerComponents } from './register-components.js';
import { insertBaiduScript } from './insert-baidu-script';

import ThemePicker from './components/ThemePicker.vue';


export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      'nav-bar-content-after': () => h(ThemePicker),
    });
  },
  enhanceApp({ app }) {
    app.use(Locale).use(DevUI);
    registerComponents(app);
    insertBaiduScript();
  },
};
