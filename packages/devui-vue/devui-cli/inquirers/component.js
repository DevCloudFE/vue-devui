const { COMPONENT_PARTS_MAP, VITEPRESS_SIDEBAR_CATEGORY } = require('../shared/constant');

exports.typeName = () => ({
  name: 'name',
  type: 'input',
  message: '（必填）请输入组件 name ，将用作目录及文件名：',
  validate: (value) => {
    if (value.trim() === '') {
      return '组件 name 是必填项！';
    }
    return true;
  }
});

exports.typeTitle = () => ({
  name: 'title',
  type: 'input',
  message: '（必填）请输入组件中文名称，将用作文档列表显示：',
  validate: (value) => {
    if (value.trim() === '') {
      return '组件名称是必填项！';
    }
    return true;
  }
});

exports.selectCategory = () => ({
  name: 'category',
  type: 'list',
  message: '（必填）请选择组件分类，将用作文档列表分类：',
  choices: VITEPRESS_SIDEBAR_CATEGORY,
  default: 0
});

exports.typeAliasName = () => ({
  name: 'alias',
  type: 'input',
  message: '（选填）请输入组件 name 别名，将用作组件别名被导出：'
});

exports.selectParts = () => ({
  name: 'parts',
  type: 'checkbox',
  message: '（必填）请选择包含部件，将自动生成部件文件：',
  choices: COMPONENT_PARTS_MAP,
  default: [],
  validate: (value) => {
    if (value.length === 0) {
      return '部件必须包含至少一项';
    }
    return true;
  }
});
