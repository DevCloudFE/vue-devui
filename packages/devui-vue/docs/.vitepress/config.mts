import { defineConfig } from 'vitepress';
import head from './config/head';
import nav from './config/nav';
import sidebar from './config/sidebar';
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue DevUI',
  description: 'Vue DevUI 组件库',

  head,
  markdown: {
    config: (md) => {
      md.use(demoblockPlugin as any);
    },
  },
  vite: {
    plugins: [demoblockVitePlugin() as any],
  },

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en-US/',
    },
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,

    logo: '../../assets/logo.svg',

    algolia: {
      appId: 'HOQD3NUZNM',
      apiKey: '07456b4a262e8c84eb892088e5cc3791',
      indexName: 'vue-devui',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/DevCloudFE/vue-devui' }],

    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © 2021-present DevCloudFE',
    },
  },

  ignoreDeadLinks: 'localhostLinks',
});
