const { resolve } = require('path')
const { version } = require('../../package.json')

exports.VERSION = version
exports.CWD = process.cwd()
exports.DEVUI_DIR = resolve(this.CWD, 'devui')
exports.DEVUI_NAMESPACE = 'd'
exports.TESTS_DIR_NAME = '__tests__'
exports.INDEX_FILE_NAME = 'index.ts'
exports.VUE_DEVUI_IGNORE_DIRS = ['shared', 'style']
exports.VUE_DEVUI_FILE_NAME = 'vue-devui.ts'
exports.VUE_DEVUI_FILE = resolve(this.DEVUI_DIR, this.VUE_DEVUI_FILE_NAME)
exports.SITES_DIR = resolve(this.CWD, 'docs')
exports.SITES_COMPONENTS_DIR_NAME = 'components'
exports.SITES_COMPONENTS_DIR = resolve(this.SITES_DIR, this.SITES_COMPONENTS_DIR_NAME)
exports.VITEPRESS_DIR = resolve(this.SITES_DIR, '.vitepress')
exports.VITEPRESS_SIDEBAR_FILE_NAME = 'sidebar.ts'
exports.VITEPRESS_SIDEBAR_FILE = resolve(this.VITEPRESS_DIR, `config/${this.VITEPRESS_SIDEBAR_FILE_NAME}`)

// 这里的分类顺序将会影响最终生成的页面侧边栏顺序
exports.VITEPRESS_SIDEBAR_CATEGORY = ['通用', '导航', '反馈', '数据录入', '数据展示', '布局']

exports.COMPONENT_PARTS_MAP = new Map([
  ['component', 'component（组件）'],
  ['directive', 'directive（指令）'],
  ['service', 'service（服务）']
])

exports.CREATE_SUPPORT_TYPE_MAP = Object.freeze({
  component: 'component',
  'vue-devui': 'vue-devui',
  'vitepress/sidebar': 'vitepress/sidebar',
  'theme-variable': 'theme-variable',
})
exports.CREATE_SUPPORT_TYPES = Object.keys(this.CREATE_SUPPORT_TYPE_MAP)
exports.CREATE_UNFINISHED_TYPES = []
