const logger = require('../shared/logger')
const { bigCamelCase, resolveDirFilesInfo, parseExportByFileInfo, parseComponentInfo } = require('../shared/utils')
const fs = require('fs-extra')
const { resolve } = require('path')
const {
  DEVUI_NAMESPACE,
  DEVUI_DIR,
  TESTS_DIR_NAME,
  COMPONENT_PARTS_MAP,
  INDEX_FILE_NAME,
  VUE_DEVUI_FILE,
  VUE_DEVUI_IGNORE_DIRS,
  VUE_DEVUI_FILE_NAME,
  CREATE_SUPPORT_TYPES,
  CREATE_UNFINISHED_TYPES,
  CREATE_SUPPORT_TYPE_MAP,
  SITES_COMPONENTS_DIR,
  VITEPRESS_SIDEBAR_FILE,
  VITEPRESS_SIDEBAR_FILE_NAME
} = require('../shared/constant')
const { isEmpty, kebabCase } = require('lodash')
const inquirer = require('inquirer')
const { selectCreateType } = require('../inquirers/create')
const { selectCategory, selectParts, typeName, typeTitle } = require('../inquirers/component')
const {
  createComponentTemplate,
  createStyleTemplate,
  createTypesTemplate,
  createDirectiveTemplate,
  createServiceTemplate,
  createIndexTemplate,
  createTestsTemplate
} = require('../templates/component')
const { createVueDevuiTemplate } = require('../templates/vue-devui')
const ora = require('ora')
const { createVitepressSidebarTemplate } = require('../templates/vitepress-sidebar')

exports.validateCreateType = (type) => {
  const re = new RegExp('^(' + CREATE_SUPPORT_TYPES.map((t) => `(${t})`).join('|') + ')$')
  const flag = re.test(type)

  !flag && logger.error(`类型错误，可选类型为：${CREATE_SUPPORT_TYPES.join(', ')}`)

  return flag ? type : null
}

// TODO: 待优化代码结构
exports.create = async (cwd) => {
  let { type } = cwd

  if (isEmpty(type)) {
    const result = await inquirer.prompt([selectCreateType()])
    type = result.type
  }

  if (CREATE_UNFINISHED_TYPES.includes(type)) {
    logger.info('抱歉，该功能暂未完成！')
    process.exit(0)
  }

  let params = {}

  try {
    switch (type) {
      case CREATE_SUPPORT_TYPE_MAP.component:
        params = await inquirer.prompt([typeName(), typeTitle(), selectCategory(), selectParts()])
        params.hasComponent = params.parts.includes(COMPONENT_PARTS_MAP.get('component'))
        params.hasDirective = params.parts.includes(COMPONENT_PARTS_MAP.get('directive'))
        params.hasService = params.parts.includes(COMPONENT_PARTS_MAP.get('service'))

        await createComponent(params, cwd)
        break
      case CREATE_SUPPORT_TYPE_MAP['vue-devui']:
        await createVueDevui(params, cwd)
        break
      case CREATE_SUPPORT_TYPE_MAP['vitepress/sidebar']:
        await createVitepressSidebar(params, cwd)
        break
      default:
        break
    }
  } catch (e) {
    logger.error(e.toString())
    process.exit(1)
  }
}

async function createComponent(params = {}) {
  let { name, hasComponent, hasDirective, hasService } = params

  const componentName = kebabCase(name)
  const styleName = kebabCase(name)
  const typesName = kebabCase(name) + '-types'
  const directiveName = kebabCase(name) + '-directive'
  const serviceName = kebabCase(name) + '-service'

  const _params = {
    ...params,
    componentName,
    typesName,
    directiveName,
    serviceName,
    styleName
  }

  const componentTemplate = createComponentTemplate(_params)
  const styleTemplate = createStyleTemplate(_params)
  const typesTemplate = createTypesTemplate(_params)
  const directiveTemplate = createDirectiveTemplate(_params)
  const serviceTemplate = createServiceTemplate(_params)
  const indexTemplate = createIndexTemplate(_params)
  // TODO: 增加测试模板
  const testsTemplate = createTestsTemplate(_params)

  const componentDir = resolve(DEVUI_DIR, componentName)
  const srcDir = resolve(componentDir, 'src')
  const testsDir = resolve(DEVUI_DIR, componentName, TESTS_DIR_NAME)

  if (fs.pathExistsSync(componentDir)) {
    logger.error(`${bigCamelCase(componentName)} 组件目录已存在！`)
    process.exit(1)
  }

  let spinner = ora(`创建组件 ${bigCamelCase(componentName)} 开始...`).start()

  try {
    await Promise.all([fs.mkdirs(componentDir), fs.mkdirs(srcDir), fs.mkdirs(testsDir)])

    const writeFiles = [fs.writeFile(resolve(componentDir, INDEX_FILE_NAME), indexTemplate)]

    if (hasComponent || hasService) {
      writeFiles.push(fs.writeFile(resolve(srcDir, `${typesName}.ts`), typesTemplate))
    }

    if (hasComponent) {
      writeFiles.push(
        fs.writeFile(resolve(srcDir, `${componentName}.tsx`), componentTemplate),
        fs.writeFile(resolve(srcDir, `${styleName}.scss`), styleTemplate)
      )
    }

    if (hasDirective) {
      writeFiles.push(fs.writeFile(resolve(srcDir, `${directiveName}.ts`), directiveTemplate))
    }

    if (hasService) {
      writeFiles.push(fs.writeFile(resolve(srcDir, `${serviceName}.ts`), serviceTemplate))
    }

    await Promise.all(writeFiles)

    spinner.succeed(`创建组件 ${bigCamelCase(componentName)} 成功！`)
    logger.info(`组件目录：${componentDir}`)
  } catch (e) {
    spinner.fail(e.toString())
    process.exit(1)
  }
}

async function createVueDevui(params, { ignoreParseError }) {
  const fileInfo = resolveDirFilesInfo(DEVUI_DIR, VUE_DEVUI_IGNORE_DIRS)
  const exportModules = []

  fileInfo.forEach((f) => {
    const em = parseExportByFileInfo(f, ignoreParseError)

    if (isEmpty(em)) return

    exportModules.push(em)
  })

  const template = createVueDevuiTemplate(exportModules)

  let spinner = ora(`创建 ${VUE_DEVUI_FILE_NAME} 文件开始...`).start()

  try {
    await fs.writeFile(VUE_DEVUI_FILE, template, { encoding: 'utf-8' })

    spinner.succeed(`创建 ${VUE_DEVUI_FILE_NAME} 文件成功！`)
    logger.info(`文件地址：${VUE_DEVUI_FILE}`)
  } catch (e) {
    spinner.fail(e.toString())
    process.exit(1)
  }
}

async function createVitepressSidebar(params, { cover }) {
  if (fs.pathExistsSync(VITEPRESS_SIDEBAR_FILE) && !cover) {
    logger.warning(`${VITEPRESS_SIDEBAR_FILE_NAME} 文件已存在！`)
    process.exit(0)
  }

  const fileInfo = resolveDirFilesInfo(DEVUI_DIR, VUE_DEVUI_IGNORE_DIRS)
  const componentsInfo = []

  fileInfo.forEach((f) => {
    const info = parseComponentInfo(f.dirname)

    if (isEmpty(info)) return

    componentsInfo.push(info)
  })

  const template = createVitepressSidebarTemplate(componentsInfo)

  let spinner = ora(`创建 ${VITEPRESS_SIDEBAR_FILE_NAME} 文件开始...`).start()

  try {
    await fs.writeFile(VITEPRESS_SIDEBAR_FILE, template, { encoding: 'utf-8' })

    spinner.succeed(`创建 ${VITEPRESS_SIDEBAR_FILE_NAME} 文件成功！`)
    logger.info(`文件地址：${VITEPRESS_SIDEBAR_FILE}`)
  } catch (e) {
    spinner.fail(e.toString())
    process.exit(1)
  }
}
