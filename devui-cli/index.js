#!/usr/bin/env node
const { Command } = require('commander')
const { create, validateCreateType } = require('./commands/create')
const { VERSION } = require('./shared/constant')

const program = new Command()

program
  .command('create')
  .description('创建一个组件模板或配置文件')
  .option('-t --type <type>', '创建类型，可选值：component, vue-devui, vitepress/sidebar', validateCreateType)
  .option('--ignore-parse-error', '忽略解析错误', false)
  .action(create)

program.parse().version(VERSION)
