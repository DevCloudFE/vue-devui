import { readdirSync, statSync } from 'fs-extra';
import { merge } from 'lodash-es';
import { resolve } from 'path';
import type { CliConfig } from '../../types/config';
import { loadCliConfig } from '../commands/base';
import { CWD } from './constant';
import { DEFAULT_CLI_CONFIG_NAME } from './generate-config';

export const cliConfig: CliConfig = {
  cwd: CWD,
  componentRootDir: '.',
  componentCategories: ['通用', '导航', '反馈', '数据录入', '数据展示', '布局'],
  libPrefix: '',
  libStyleFileSuffix: '.css',
  libClassPrefix: '',
  libEntryRootDir: '.',
  libEntryFileName: 'index',
  version: '0.0.0'
};

export function mergeCliConfig(config: Partial<CliConfig> = {}) {
  return merge(cliConfig, config);
}

export function detectCliConfig() {
  const re = new RegExp(`^${DEFAULT_CLI_CONFIG_NAME}\.(js|ts)$`);
  const file = readdirSync(CWD).find((f) => statSync(resolve(CWD, f)).isFile() && re.test(f));

  if (!file) {return;}

  loadCliConfig({ config: resolve(CWD, file) });
}
