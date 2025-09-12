import { App, reactive, ref } from 'vue';
import zhCN from './lang/zh-cn';
import enUS from './lang/en-us';

const lang = ref('zh-CN');
const nowApp = ref(); // 用来存储install注册实例的app
let langMessages = reactive<{[index: string]: any}> ({
  ['zh-CN']: zhCN,
  ['en-US']: enUS,
});

const Locale = {
  messages(language = lang.value): Record<string, unknown> {
    return langMessages[language];
  },
  lang(): string {
    return lang.value;
  },
  // 切换语言
  use(newLang: string): void {
    const app = nowApp.value;
    lang.value = newLang;
    app.config.globalProperties.langMessages = Locale.messages();
  },
  // 在列表中增加一种语言，相同则覆盖 (可以在不影响加载的情况下添加，提高切换性能)
  add(newMessages: Record<string, unknown>): void {
    langMessages = {
      ...langMessages,
      ...newMessages
    };
  },
};
// 导出
export { Locale };

export default {
  title: '国际化',
  category: '基础',
  status: '100%',
  install(app: App, language?: string): void {
    app.config.globalProperties.langMessages = Locale.messages(language);
    nowApp.value = app;
  }
};
