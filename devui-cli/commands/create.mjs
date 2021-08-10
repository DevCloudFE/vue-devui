import logger from '../shared/logger.mjs'
import { bigCamelCase } from '../shared/utils.mjs'
import fs from 'fs-extra'
import { resolve } from 'path'
import { DEVUI_NAMESPACE, DEVUI_DIR, TESTS_DIR_NAME, COMPONENT_PARTS_MAP } from '../shared/constant.js'
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

export function validateCreateType(type) {
  const flag = /^(component|(vue-devui)|(vitepress\/sidebar))$/.test(type)

  !flag && logger.error('类型错误，可选类型为：component, vue-devui, vitepress/sidebar')

  return flag ? type : null
}

export async function create(cwd) {
  let { type } = cwd

  if (isEmpty(type)) {
    const result = await inquirer.prompt([selectCreateType()])
    type = result.type
  }

  if (type !== 'component') {
    logger.info('抱歉，该功能暂未完成！')
    return process.exit(0)
  }

  const result = await inquirer.prompt([typeName(), typeTitle(), selectCategory(), selectParts()])
  result.hasComponent = result.parts.includes(COMPONENT_PARTS_MAP.get('component'))
  result.hasDirective = result.parts.includes(COMPONENT_PARTS_MAP.get('directive'))
  result.hasService = result.parts.includes(COMPONENT_PARTS_MAP.get('service'))

  try {
    await createComponent(result)
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

  await Promise.all([fs.mkdirs(componentDir), fs.mkdirs(srcDir), fs.mkdirs(testsDir)])

  const writeFiles = [fs.writeFile(resolve(componentDir, `index.ts`), indexTemplate)]

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

  logger.info(`组件目录：${componentDir}`)
  logger.success('创建成功!')
}
