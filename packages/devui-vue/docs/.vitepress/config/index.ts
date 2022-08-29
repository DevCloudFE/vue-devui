import { defineConfig } from 'vitepress'
import sidebar from './sidebar'
import head from './head'
import nav from './nav'
import markdown from './markdown'
import lang from './lang'

const config = defineConfig({
  title: 'Vue DevUI',
  description: 'Vue DevUI 组件库',
  head,
  markdown,
  locales: {
    '/': {
      lang: 'zh-CN',
      label: '简体中文'
    },
    '/en-US': {
      lang: 'en-US',
      label: 'English'
    }
  },
  themeConfig: {
    sidebar,
    nav,
    demoblock: lang,
    // algolia: {
    //   apiKey: '6520762209638bd68d6778a845e13a12',
    //   indexName: 'VUE_DEVUI',
    //   appId: '2NGA4ZWE9B',
    // },
    logo: '../../assets/logo.svg',
    locales: {
      '/': {
        lang: 'zh-CN',
        label: '简体中文'
      },
      '/en-US': {
        lang: 'en-US',
        label: 'English'
      }
    }
  }
})

export default config
