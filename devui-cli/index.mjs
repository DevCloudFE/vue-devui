#!/usr/bin/env node
import { Command } from 'commander'
import { create, validateCreateType } from './commands/create.mjs'
import { VERSION } from './shared/constant.js'

const program = new Command()

program
  .command('create')
  .description('创建一个组件模板或配置文件')
  .option('-t --type <type>', '创建类型，可选值：component, vue-devui, vitepress/sidebar', validateCreateType)
  .action(create)

program.parse().version(VERSION)
