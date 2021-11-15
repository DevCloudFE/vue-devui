import { readdirSync, statSync } from 'fs-extra'
import { merge } from 'lodash-es'
import { resolve } from 'path'
import { loadCliConfig } from '../commands/base'
import { CWD } from './constant'
import { DEFAULT_CLI_CONFIG_NAME } from './generate-config'

export type CliConfig = {
  /**
   * current workspace directory
   *
   * ***Should be the root directory of the component library.***
   *
   * @default process.cwd()
   */
  cwd: string
  /**
   * Generate the root directory of component.
   *
   * ***Note that the path should be based on the `cwd` of configuration item.***
   *
   * @default .
   */
  componentRootDir: string
  /**
   * category of component
   *
   * @default ['通用', '导航', '反馈', '数据录入', '数据展示', '布局']
   */
  componentCategories: string[]
  /**
   * prefix of the component library
   *
   * @default ''
   */
  libPrefix: string
  /**
   * component style file suffix of the component library
   *
   * @default .css
   */
  libStyleFileSuffix: string
  /**
   * component class prefix of the component library
   */
  libClassPrefix: string
  /**
   * component library entry file name
   *
   * @default index
   */
  libEntryFileName: string
  /**
   * Generate the root directory of the lib entry file.
   *
   * ***Note that the path should be based on the `cwd` of configuration item.***
   *
   * @default .
   */
  libEntryRootDir: string
  /**
   * version of component library
   *
   * @default 0.0.0
   */
  version: string
}

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
}

export function mergeCliConfig(config: Partial<CliConfig> = {}) {
  return merge(cliConfig, config)
}

export function detectCliConfig() {
  const re = new RegExp(`^${DEFAULT_CLI_CONFIG_NAME}\.(js|ts)$`)
  const file = readdirSync(CWD).find((f) => statSync(resolve(CWD, f)).isFile() && re.test(f))

  if (!file) return

  loadCliConfig({ config: resolve(CWD, file) })
}
