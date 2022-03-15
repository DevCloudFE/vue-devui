import { existsSync, writeFileSync } from 'fs-extra';
import { resolve } from 'path';
import genConfigTemplate from '../templates/base/config';
import { CWD } from './constant';
import logger from './logger';

export const DEFAULT_CLI_CONFIG_NAME = 'dc.config';
export const DEFAULT_CLI_CONFIG_EXT_NAME = '.ts';
export const DEFAULT_CLI_CONFIG_FILE_NAME = DEFAULT_CLI_CONFIG_NAME + DEFAULT_CLI_CONFIG_EXT_NAME;

export default function generateConfig() {
  const configPath = resolve(CWD, DEFAULT_CLI_CONFIG_FILE_NAME);

  if (existsSync(configPath)) {
    logger.error(`The configuration path "${configPath}" already exists.`);
    process.exit(1);
  }

  writeFileSync(configPath, genConfigTemplate(), { encoding: 'utf-8' });

  logger.success(`The configuration file has been generated successfully.`);
  logger.info(`Target file: ${configPath}`);
}
