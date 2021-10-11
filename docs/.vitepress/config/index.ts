import sidebar from './sidebar'
import enSidebar from './enSidebar'
import head from './head'
import nav from './nav'
import markdown from './markdown'
import lang from './lang'
import { language } from './language'


const config = {
  title: "Vue DevUI",
  description: "Vue DevUI 组件库",
  head,
  markdown,
  themeConfig: {
    sidebar,
    nav,
    demoblock: lang,
    logo: '../../assets/logo.svg',
    lang: language,
  }
};

export default config;
