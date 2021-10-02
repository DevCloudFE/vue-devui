const { kebabCase } = require('lodash')
const { SITES_COMPONENTS_DIR_NAME, VITEPRESS_SIDEBAR_CATEGORY } = require('../shared/constant')
const logger = require('../shared/logger')

function buildComponentOptions(text, name, status) {
  return { text, link: `/${SITES_COMPONENTS_DIR_NAME}/${kebabCase(name)}/`, status }
}

function buildCategoryOptions(text, children = []) {
  return { text, children }
}

exports.createVitepressSidebarTemplate = (componentsInfo = []) => {
  const rootNav = { text: '快速开始', link: '/' }
  const categoryMap = VITEPRESS_SIDEBAR_CATEGORY.reduce((map, cate) => map.set(cate, []), new Map())

  componentsInfo.forEach((info) => {
    if (categoryMap.has(info.category)) {
      categoryMap.get(info.category).push(buildComponentOptions(info.title, info.name, info.status))
    } else {
      logger.warning(`组件 ${info.name} 的分类 ${info.category} 不存在！`)
    }
  })

  const sidebar = [].concat(
    rootNav,
    Array.from(categoryMap).map(([k, v]) => buildCategoryOptions(k, v))
  )

  return `\
export default {
  '/': ${JSON.stringify(sidebar, null, 2).replace(/\n/g, '\n\t')}
}
`
}
