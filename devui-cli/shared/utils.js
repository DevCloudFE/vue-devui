const { camelCase, upperFirst } = require('lodash')
const { INDEX_FILE_NAME, DEVUI_DIR } = require('./constant')
const { resolve } = require('path')
const logger = require('./logger')
const fs = require('fs-extra')

exports.bigCamelCase = (str) => {
  return upperFirst(camelCase(str))
}

exports.resolveDirFilesInfo = (targetDir, ignoreDirs = []) => {
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
      name: this.bigCamelCase(dir),
      dirname: dir,
      path: resolve(targetDir, dir, INDEX_FILE_NAME)
    }))
}

exports.parseExportByFileInfo = (fileInfo, ignoreParseError) => {
  const exportModule = {}
  const indexContent = fs.readFileSync(fileInfo.path, { encoding: 'utf-8' })

  const defaultRe = /export default/
  const partRe = /export {/

  if (!defaultRe.test(indexContent)) {
    logger.error(`${fileInfo.path} must have "export default".`)

    if (ignoreParseError) {
      return exportModule
    } else {
      process.exit(1)
    }
  }

  if (!partRe.test(indexContent)) {
    logger.error(`${fileInfo.path} must have "export {}".`)

    if (ignoreParseError) {
      return exportModule
    } else {
      process.exit(1)
    }
  }

  const parts = []
  let searchContent = indexContent

  while (searchContent.search(partRe) !== -1) {
    const reStartIndex = indexContent.search(partRe)
    const partContent = this.extractStr(indexContent, '{', '}', reStartIndex)

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

exports.parseComponentInfo = (name) => {
  const componentInfo = {}
  const indexContent = fs.readFileSync(resolve(DEVUI_DIR, name, INDEX_FILE_NAME), { encoding: 'utf-8' })

  const defaultRe = /export default/

  if (!defaultRe.test(indexContent)) {
    logger.warning(`${fileInfo.path} must have "export default" and component info.`)
  } else {
    const reStartIndex = indexContent.indexOf('export default {')
    componentInfo.title = this.extractStr(indexContent, 'title:', ',', reStartIndex).replace(/['"]/g, '')
    componentInfo.category = this.extractStr(indexContent, 'category:', ',', reStartIndex).replace(/['"]/g, '')
    componentInfo.status = this.extractStr(indexContent, 'status:', ',', reStartIndex).replace(/['"]/g, '')
  }

  componentInfo.name = this.bigCamelCase(name)

  return componentInfo
}

exports.extractStr = (content = '', startKeywords = '', endKeywords = '', startIndex = 0) => {
  const keywordsStartIndex = content.indexOf(startKeywords, startIndex) + startKeywords.length
  const keywordsEndIndex = content.indexOf(endKeywords, keywordsStartIndex)

  if ([keywordsStartIndex - startIndex, keywordsEndIndex].some((index) => index < 0)) return ''

  return content.slice(keywordsStartIndex, keywordsEndIndex).trim()
}
