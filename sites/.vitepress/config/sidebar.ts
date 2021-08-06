const sidebar = {
  '/': [
    { text: '快速开始', link: '/' },
    {
      text: '通用',
      children: [
        { text: 'Button 按钮', link: '/components/button/' },
        { text: 'Switch 开关', link: '/components/switch/' },
      ]
    },
    {
      text: '导航',
      children: [
        { text: 'Anchor 锚点', link: '/components/anchor/' },
      ]
    }
  ],
}

export default sidebar