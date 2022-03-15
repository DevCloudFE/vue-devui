#!/usr/bin/env node
const { Command } = require('commander');
const { create, validateCreateType } = require('./commands/create');
const { build } = require('./commands/build');
const { generateTheme } = require('./commands/generate-theme');
const { generateDts } = require('./commands/generate-dts');
const { VERSION, CREATE_SUPPORT_TYPES } = require('./shared/constant');

const program = new Command();

program
  .command('create')
  .description('创建一个组件模板或配置文件')
  .option('-t --type <type>', `创建类型，可选值：${CREATE_SUPPORT_TYPES.join(', ')}`, validateCreateType)
  .option('--ignore-parse-error', '忽略解析错误', false)
  .option('--cover', '覆盖原文件', false)
  .action(create);

program
  .command('build')
  .description('打包组件库')
  .hook('postAction', generateTheme)
  .hook('postAction', generateDts)
  .action(build);

program
  .command('generate:theme')
  .description('生成主题变量文件')
  .action(generateTheme);

program
  .command('generate:dts')
  .description('生成ts类型文件')
  .action(generateDts);

program.parse().version(VERSION);
