module.exports = {
  types: [
    {
      value: 'feat',
      name: 'feat:     新特性',
    },
    {
      value: 'fix',
      name: 'fix:      Bug 问题修复',
    },
    {
      value: 'perf',
      name: 'perf:     性能优化',
    },
    {
      value: 'refactor',
      name: 'refactor: 代码重构',
    },
    {
      value: 'docs',
      name: 'docs:     文档更新',
    },
    {
      value: 'test',
      name: 'test:     单元测试用例修改',
    },
    {
      value: 'style',
      name: 'style:    代码格式修改, 注意不是 css 修改',
    },
    {
      value: 'revert',
      name: 'revert:   Revert 一个 commit',
    },
    {
      value: 'version',
      name: 'version:  版本发布',
    },
  ],

  scopes: ['公共模块', 'README', '版本发布'],

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
};