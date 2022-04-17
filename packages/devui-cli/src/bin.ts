#!/usr/bin/env node
import { Command } from 'commander';
import type { CliConfig } from '../types/config';
import baseAction from './commands/base';
import createAction, { validateCreateType } from './commands/create';
import { detectCliConfig } from './shared/config';
import { VERSION } from './shared/constant';
import {
  DEFAULT_CLI_CONFIG_FILE_NAME
} from './shared/generate-config';

// detect cli config
detectCliConfig();

const program = new Command();

program
  .command('create [name...]')
  .option(
    '-c --config <config>',
    `Specify a configuration file. By default, find the file at the beginning of "${DEFAULT_CLI_CONFIG_FILE_NAME}" in the current working directory.`
  )
  .option('-t --type <type>', 'Select create type.', validateCreateType)
  .option('--core', 'Include core when creating a component.')
  .option('--service', 'Include service when creating a component.')
  .option('--directive', 'Include service when creating a component.')
  .option('-f --force', 'For force overwriting.')
  .description('Create a component structure, library entry file or other...')
  .action(createAction);

program
  .option('--init', 'Initialize the cli configuration file in the current working directory.')
  .option(
    '-c --config <config>',
    `Specify a configuration file. By default, find the file at the beginning of "${DEFAULT_CLI_CONFIG_FILE_NAME}" in the current working directory.`
  )
  .usage('[command] [options]')
  .version(VERSION, '-v --version')
  .description('Cli of devui.')
  .action(baseAction);

program.parse(process.argv);

export function defineCliConfig(config: Partial<CliConfig> = {}) {
  return config;
}
