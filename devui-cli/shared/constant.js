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

exports.COMPONENT_PARTS_MAP = new Map([
  ['component', 'component（组件）'],
  ['directive', 'directive（指令）'],
  ['service', 'service（服务）']
])
