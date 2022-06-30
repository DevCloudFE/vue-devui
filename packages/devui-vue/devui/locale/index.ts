import { App, reactive, ref } from 'vue';
import { deepAssign } from '../shared/utils/deep-assign';
import zhCN from './lang/zh-cn';

const lang = ref('zh-CN');
let langMessages = reactive({
  [lang.value]: zhCN
});

const Locale = {
  messages(): Record<string, unknown> {
    return langMessages[lang.value];
  },

  lang(): string {
    return lang.value;
  },

  use(newLang: string, newMessages?: Record<string, unknown>): void {
    lang.value = newLang;
    this.add({ [newLang]: newMessages });
  },

  add(newMessages = {}): void {
    langMessages = deepAssign(langMessages, newMessages);
  },
};

export { Locale };

export default {
  install(app: App): void {
    app.config.globalProperties.langMessages = ref(Locale.messages());
  }
};
