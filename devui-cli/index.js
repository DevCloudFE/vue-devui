#!/usr/bin/env node
const { Command } = require('commander')
const { create, validateCreateType } = require('./commands/create')
const { build } = require('./commands/build')
const { VERSION, CREATE_SUPPORT_TYPES } = require('./shared/constant')

const program = new Command()

program
  .command('create')
  .description('创建一个组件模板或配置文件')
  .option('-t --type <type>', `创建类型，可选值：${CREATE_SUPPORT_TYPES.join(', ')}`, validateCreateType)
  .option('--ignore-parse-error', '忽略解析错误', false)
  .option('--cover', '覆盖原文件', false)
  .action(create)

program
  .command('build')
  .description('打包组件库')
  .action(build)

program.parse().version(VERSION)
