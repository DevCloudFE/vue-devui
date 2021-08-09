const sidebar = {
  '/': [
    { text: '快速开始', link: '/' },
    {
      text: '通用',
      children: [
        { text: 'Button 按钮', link: '/components/button/' },
        { text: 'Icon 图标', link: '/components/icon/' },
        { text: 'Panel 面板', link: '/components/panel/' },
      ]
    },
    {
      text: '导航',
      children: [
        { text: 'Tabs 选项卡切换', link: '/components/tabs/' },
        { text: 'Anchor 锚点', link: '/components/Anchor/' },
      ]
    },
    {
      text: '反馈',
      children: [
        { text: 'Alert 警告', link: '/components/alert/' },
        { text: 'Loading 加载提示', link: '/components/loading/' },
      ]
    },
    {
      text: '数据录入',
      children: [
        { text: 'Checkbox 复选框', link: '/components/checkbox/' },
        { text: 'Radio 单选框', link: '/components/radio/' },
        { text: 'Switch 开关', link: '/components/switch/' },
        { text: 'TagsInput 标签输入', link: '/components/tags-input/' },
        { text: 'TextInput 文本框', link: '/components/text-input/' },
      ]
    },
    {
      text: '数据展示',
      children: [
        { text: 'Avatar 头像', link: '/components/avatar/' },
        { text: 'Carousel 走马灯', link: '/components/carousel/' },
      ]
    },
  ],
}

export default sidebar