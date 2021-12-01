const { kebabCase } = require('lodash')
const {
  SITES_COMPONENTS_DIR_NAME,
  VITEPRESS_SIDEBAR_CATEGORY,
  VITEPRESS_SIDEBAR_CATEGORY_EN,
  VITEPRESS_SIDEBAR_CATEGORY_ZH_TO_EN,
  SITES_COMPONENTS_DIR_NAME_EN
} = require('../shared/constant')
const logger = require('../shared/logger')

// function buildComponentOptions(text, name, status) {
//   return { text, link: `/${SITES_COMPONENTS_DIR_NAME}/${kebabCase(name)}/`, status }
// }

function buildCategoryOptions(text, children = []) {
  return { text, children }
}

function generateZhMenus(componentsInfo) {
  const categoryMap = VITEPRESS_SIDEBAR_CATEGORY.reduce((map, cate) => map.set(cate, []), new Map())
  componentsInfo.forEach((info) => {
    if (categoryMap.has(info.category)) {
      categoryMap.get(info.category).push({
        text: info.title,
        link: `/${SITES_COMPONENTS_DIR_NAME}/${kebabCase(info.name)}/`,
        status: info.status
      })
    } else {
      logger.warning(`组件 ${info.name} 的分类 ${info.category} 不存在！`)
    }
  })
  return Array.from(categoryMap).map(([k, v]) => buildCategoryOptions(k, v))
}

function generateEnMenus(componentsInfo) {
  const categoryMapEn = VITEPRESS_SIDEBAR_CATEGORY_EN.reduce(
    (map, cate) => map.set(cate, []),
    new Map()
  )
  componentsInfo.forEach((info) => {
    if (categoryMapEn.has(VITEPRESS_SIDEBAR_CATEGORY_ZH_TO_EN[info.category])) {
      categoryMapEn.get(VITEPRESS_SIDEBAR_CATEGORY_ZH_TO_EN[info.category]).push({
        text: info.name,
        link: `/${SITES_COMPONENTS_DIR_NAME_EN}/${kebabCase(info.name)}/`,
        status: info.status
      })
    }
  })
  return Array.from(categoryMapEn).map(([k, v]) => buildCategoryOptions(k, v))
}

exports.createVitepressSidebarTemplates = (componentsInfo = []) => {
  const rootNavs = [
    {
      text: '快速开始',
      link: '/',
      handler: generateZhMenus,
      lang: 'zh'
    },
    { text: 'Quick Start', link: '/en-US/', handler: generateEnMenus, lang: 'en' }
  ]

  const templates = rootNavs.map((nav) => {
    const rootItem = {
      text: nav.text,
      link: nav.link
    }
    const sidebar = [].concat(rootItem, nav.handler(componentsInfo))
    return {
      lang: nav.lang,
      content: `\
      export default {
        '/': ${JSON.stringify(sidebar, null, 2).replace(/\n/g, '\n\t')}
      }
      `
    }
  })

  return templates
}
