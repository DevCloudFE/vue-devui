const { resolve } = require('path')
const { version } = require('../../package.json')

exports.VERSION = version
exports.CWD = process.cwd()
exports.DEVUI_DIR = resolve(this.CWD, 'devui')
exports.DEVUI_NAMESPACE = 'd'
exports.DEVUI_INDEX_FILE = 'vue-devui.ts'
exports.TESTS_DIR_NAME = '__tests__'

exports.COMPONENT_PARTS_MAP = new Map([
  ['component', 'component（组件）'],
  ['directive', 'directive（指令）'],
  ['service', 'service（服务）']
])
