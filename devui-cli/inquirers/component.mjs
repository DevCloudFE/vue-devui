import { COMPONENT_PARTS_MAP } from '../shared/constant.js'

export const typeName = () => ({
  name: 'name',
  type: 'input',
  message: '（必填）请输入组件 name ，将用作目录及文件名：',
  validate: (value) => {
    if (value.trim() === '') {
      return '组件 name 是必填项！'
    }
    return true
  }
})

export const typeTitle = () => ({
  name: 'title',
  type: 'input',
  message: '（必填）请输入组件中文名称，将用作文档列表显示：',
  validate: (value) => {
    if (value.trim() === '') {
      return '组件名称是必填项！'
    }
    return true
  }
})

export const selectCategory = () => ({
  name: 'category',
  type: 'list',
  message: '（必填）请选择组件分类，将用作文档列表分类：',
  choices: ['通用', '导航', '反馈', '扩展服务', '数据录入', '数据展示', '布局'],
  default: 0
})

export const typeAliasName = () => ({
  name: 'alias',
  type: 'input',
  message: '（选填）请输入组件 name 别名，将用作组件别名被导出：'
})

export const selectParts = () => ({
  name: 'parts',
  type: 'checkbox',
  message: '（必填）请选择包含部件，将自动生成部件文件：',
  choices: [
    COMPONENT_PARTS_MAP.get('component'),
    COMPONENT_PARTS_MAP.get('directive'),
    COMPONENT_PARTS_MAP.get('service')
  ],
  default: [],
  validate: (value) => {
    if (value.length === 0) {
      return '部件必须包含至少一项'
    }
    return true
  }
})
