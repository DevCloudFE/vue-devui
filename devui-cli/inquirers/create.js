exports.selectCreateType = () => ({
  name: 'type',
  type: 'list',
  message: '（必填）请选择创建类型：',
  choices: ['component', 'vue-devui', 'vitepress/sidebar'],
  default: 0
})
