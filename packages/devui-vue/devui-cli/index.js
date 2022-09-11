#!/usr/bin/env node
const { Command, Option } = require('commander');
const { create, validateCreateType } = require('./commands/create');
const { build } = require('./commands/build');
const { generateTheme } = require('./commands/generate-theme');
const { generateDts } = require('./commands/generate-dts');
const { release } = require('./commands/release');
const { codeCheck } = require('./commands/code-check');
const { VERSION, CREATE_SUPPORT_TYPES } = require('./shared/constant');

const program = new Command();

program
  .command('create')
  .description('创建一个组件模板或配置文件')
  .option('-t --type <type>', `创建类型，可选值：${CREATE_SUPPORT_TYPES.join(', ')}`, validateCreateType)
  .option('-e --env <env>', '环境，可选值：dev, prod')
  .option('--ignore-parse-error', '忽略解析错误', false)
  .option('--cover', '覆盖原文件', false)
  .action(create);

program
  .command('build')
  .description('打包组件库')
  .hook('postAction', generateTheme)
  .action(build);

program
  .command('generate:theme')
  .description('生成主题变量文件')
  .action(generateTheme);

program
  .command('generate:dts')
  .description('生成ts类型文件')
  .action(generateDts);

program
  .command('release')
  .option('-v --version <version>', '版本号')
  .description('发布npm包')
  .action(release);

program
  .command('code-check')
  .option('-c --components <components>', '组件名称（支持英文逗号分隔）')
  .addOption(new Option('-t --type <type>', '代码检查类型').choices(['eslint', 'unit-test']))
  .description('代码检查')
  .action(codeCheck);

program.parse().version(VERSION);
