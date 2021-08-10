import logger from '../shared/logger.mjs'
import { bigCamelCase, resolveDirFilesInfo, parseExportByFileInfo } from '../shared/utils.mjs'
import fs from 'fs-extra'
import { resolve } from 'path'
import {
  DEVUI_NAMESPACE,
  DEVUI_DIR,
  TESTS_DIR_NAME,
  COMPONENT_PARTS_MAP,
  INDEX_FILE_NAME,
  VUE_DEVUI_FILE,
  VUE_DEVUI_IGNORE_DIRS,
  VUE_DEVUI_FILE_NAME
} from '../shared/constant.js'
import { isEmpty, kebabCase } from 'lodash-es'
import inquirer from 'inquirer'
import { selectCreateType } from '../inquirers/create.mjs'
import { selectCategory, selectParts, typeName, typeTitle } from '../inquirers/component.mjs'
import {
  createComponentTemplate,
  createStyleTemplate,
  createTypesTemplate,
  createDirectiveTemplate,
  createServiceTemplate,
  createIndexTemplate,
  createTestsTemplate
} from '../templates/component.mjs'
import { createVueDevuiTemplate } from '../templates/vue-devui.mjs'
import ora from 'ora'

export function validateCreateType(type) {
  const flag = /^(component|(vue-devui)|(vitepress\/sidebar))$/.test(type)

  !flag && logger.error('类型错误，可选类型为：component, vue-devui, vitepress/sidebar')

  return flag ? type : null
}

export async function create(cwd) {
  let { type, ignoreParseError } = cwd

  if (isEmpty(type)) {
    const result = await inquirer.prompt([selectCreateType()])
    type = result.type
  }

  if (['vitepress/sidebar'].includes(type)) {
    logger.info('抱歉，该功能暂未完成！')
    return process.exit(0)
  }

  try {
    switch (type) {
      case 'component':
        const result = await inquirer.prompt([typeName(), typeTitle(), selectCategory(), selectParts()])
        result.hasComponent = result.parts.includes(COMPONENT_PARTS_MAP.get('component'))
        result.hasDirective = result.parts.includes(COMPONENT_PARTS_MAP.get('directive'))
        result.hasService = result.parts.includes(COMPONENT_PARTS_MAP.get('service'))

        await createComponent(result)
        break
      case 'vue-devui':
        await createVueDevui(ignoreParseError)
        break
      case 'vitepress/sidebar':
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

  name = name.replace(new RegExp(`^${DEVUI_NAMESPACE}`, 'i'), '')

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
  const testsTemplate = createTestsTemplate(_params)

  const componentDir = resolve(DEVUI_DIR, componentName)
  const srcDir = resolve(componentDir, 'src')
  const testsDir = resolve(DEVUI_DIR, componentName, TESTS_DIR_NAME)

  if (fs.pathExistsSync(componentDir)) {
    logger.error(`${bigCamelCase(componentName)} 组件目录已存在！`)
    return process.exit(1)
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

async function createVueDevui(ignoreParseError) {
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
