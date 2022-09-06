import { inBrowser } from 'vitepress';

export const ZH_CN = 'zh-CN';
export const EN_US = 'en-US';
export const DEFAULT_LANG = ZH_CN;
export const LANG_KEY = 'vue-devui-preferred-lang';
export const CURRENT_LANG = (inBrowser && localStorage.getItem(LANG_KEY)) || DEFAULT_LANG;
