import { defineConfig } from 'vitepress';
import sidebar from './sidebar';
import head from './head';
import nav from './nav';
import markdown from './markdown';
import lang from './lang';

const config = defineConfig({
  base: '/',
  title: 'Vue DevUI',
  description: 'Vue DevUI 组件库',
  appearance: false, // 是否启用暗模式
  head,
  markdown,
  locales: {
    '/': {
      lang: 'zh-CN',
      label: '简体中文',
    },
    '/en-US': {
      lang: 'en-US',
      label: 'English',
    },
  },
  themeConfig: {
    sidebar,
    nav,
    // outline: [2, 6], todo 大纲中的标题等级 新版本启用
    outlineTitle: '快速前往',
    algolia: {},
    socialLinks: [
      { icon: 'github', link: 'https://github.com/DevCloudFE/vue-devui' },
    ],
    demoblock: lang,
    logo: '../../assets/logo.svg',
    locales: {
      '/': {
        lang: 'zh-CN',
        label: '简体中文',
      },
      '/en-US': {
        lang: 'en-US',
        label: 'English',
      },
    },
    footer: {
      // todo 新版本中启用
      // license: {
      //   text: 'MIT License',
      //   link: 'https://opensource.org/licenses/MIT'
      // },
      message: 'MIT Licensed',
      copyright: `Copyright © 2021-${new Date().getFullYear()} DevUI`,
    },
  },
});

export default config;
