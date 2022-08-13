const nav = [
  { text: '文档', link: '/docs/quick-start', activeMatch: '/docs/' },
  { text: '组件', link: '/components/overview', activeMatch: '/components/' },
  { text: '贡献指南', link: '/contributing/index', activeMatch: '/contributing/' },
  {
    text: '资源',
    items: [
      {
        text: '设计',
        link: 'https://devui.design/design-cn/start',
      },
    ],
  },
  { text: 'Playground', link: 'https://devcloudfe.github.io/devui-playground' },
  { text: '更新日志', link: 'https://github.com/DevCloudFE/vue-devui/releases' },
  {
    text: '生态',
    items: [
      { text: 'Ng DevUI', link: 'https://devui.design/' },
      { text: 'Ng DevUI Admin', link: 'https://devui.design/admin-page/home' },
      { text: 'React DevUI', link: 'https://react-devui.com/' },
      { text: 'DevUI Helper', link: 'https://github.com/DevCloudFE/DevUIHelper' },
      { text: 'DevUI Playground', link: 'https://github.com/DevCloudFE/devui-playground' },
    ],
  },
];

export default nav;
