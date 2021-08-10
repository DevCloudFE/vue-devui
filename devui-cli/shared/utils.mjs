import { camelCase, upperFirst } from 'lodash-es'
import { INDEX_FILE_NAME } from './constant.js'
import { resolve } from 'path'
import logger from './logger.mjs'
import fs from 'fs-extra'

export function bigCamelCase(str) {
  return upperFirst(camelCase(str))
}

export function resolveDirFilesInfo(targetDir, ignoreDirs = []) {
  return fs
    .readdirSync(targetDir)
    .filter(
      (dir) =>
        // 过滤：必须是目录，且不存在与忽略目录内，拥有 INDEX_FILE_NAME
        fs.statSync(resolve(targetDir, dir)).isDirectory() &&
        !ignoreDirs.includes(dir) &&
        fs.existsSync(resolve(targetDir, dir, INDEX_FILE_NAME))
    )
    .map((dir) => ({
      name: bigCamelCase(dir),
      dirname: dir,
      path: resolve(targetDir, dir, INDEX_FILE_NAME)
    }))
}

export function parseExportByFileInfo(fileInfo) {
  const exportModule = {}
  const indexContent = fs.readFileSync(fileInfo.path, { encoding: 'utf-8' })

  const defaultRe = /export default/
  const partRe = /export {/

  if (!defaultRe.test(indexContent)) {
    logger.error(`${fileInfo.path} must have "export default".`)
    return process.exit(1)
  }

  if (!partRe.test(indexContent)) {
    logger.error(`${fileInfo.path} must have "export {}".`)
    return process.exit(1)
  }

  const parts = []
  let searchContent = indexContent

  while (searchContent.search(partRe) !== -1) {
    const reStartIndex = indexContent.search(partRe)
    const partStartIndex = indexContent.indexOf('{', reStartIndex) + 1
    const partEndIndex = indexContent.indexOf('}', partStartIndex) - 1

    const partContent = indexContent.slice(partStartIndex, partEndIndex)

    partContent
      .replace(/(\s|\r|\n|\t)/g, '')
      .split(',')
      .forEach((p) => parts.push(p))

    searchContent = indexContent.slice(partEndIndex)
  }

  exportModule.default = fileInfo.name + 'Install'
  exportModule.parts = parts
  exportModule.fileInfo = fileInfo

  return exportModule
}
