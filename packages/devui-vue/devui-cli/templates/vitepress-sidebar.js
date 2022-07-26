const { kebabCase } = require('lodash');
const {
  SITES_COMPONENTS_DIR_NAME,
  VITEPRESS_SIDEBAR_CATEGORY,
  VITEPRESS_SIDEBAR_CATEGORY_EN,
  VITEPRESS_SIDEBAR_CATEGORY_ZH_TO_EN,
  SITES_COMPONENTS_DIR_NAME_EN,
} = require('../shared/constant');
const logger = require('../shared/logger');
const { isReadyToRelease } = require('../shared/utils');

// function buildComponentOptions(text, name, status) {
//   return { text, link: `/${SITES_COMPONENTS_DIR_NAME}/${kebabCase(name)}/`, status }
// }

function buildCategoryOptions(text, children = []) {
  return { text, children };
}

function generateZhMenus(componentsInfo) {
  const categoryMap = VITEPRESS_SIDEBAR_CATEGORY.reduce((map, cate) => map.set(cate, []), new Map());
  componentsInfo.forEach((info) => {
    if (categoryMap.has(info.category)) {
      categoryMap.get(info.category).push({
        text: info.title,
        link: `/${SITES_COMPONENTS_DIR_NAME}/${kebabCase(info.name)}/`,
        status: info.status,
        hide: !isReadyToRelease(kebabCase(info.name)),
      });
    } else {
      logger.warning(`组件 ${info.name} 的分类 ${info.category} 不存在！`);
    }
  });
  return Array.from(categoryMap).map(([k, v]) => buildCategoryOptions(k, v));
}

function generateEnMenus(componentsInfo) {
  const categoryMapEn = VITEPRESS_SIDEBAR_CATEGORY_EN.reduce((map, cate) => map.set(cate, []), new Map());
  componentsInfo.forEach((info) => {
    if (categoryMapEn.has(VITEPRESS_SIDEBAR_CATEGORY_ZH_TO_EN[info.category])) {
      categoryMapEn.get(VITEPRESS_SIDEBAR_CATEGORY_ZH_TO_EN[info.category]).push({
        text: info.name,
        link: `/${SITES_COMPONENTS_DIR_NAME_EN}/${kebabCase(info.name)}/`,
        status: info.status,
        hide: !isReadyToRelease(kebabCase(info.name)),
      });
    }
  });
  return Array.from(categoryMapEn).map(([k, v]) => buildCategoryOptions(k, v));
}

exports.createVitepressSidebarTemplates = (componentsInfo = []) => {
  const rootNavs = [
    {
      rootItems: [
        {
          text: '快速开始',
          link: '/quick-start/',
        },
        {
          text: '按需引入',
          link: '/on-demand/',
        },
        {
          text: '主题定制',
          link: '/theme-guide/',
        },
      ],
      handler: generateZhMenus,
      lang: 'zh',
    },
    {
      rootItems: [
        {
          text: 'Quick Start',
          link: '/en-US/quick-start/',
        },
        {
          text: 'On-demand Import',
          link: '/on-demand/',
        },
        {
          text: 'Theme Guide',
          link: '/theme-guide/',
        },
      ],
      handler: generateEnMenus,
      lang: 'en',
    },
  ];

  const templates = rootNavs.map((nav) => {
    const sidebar = [].concat(...nav.rootItems, nav.handler(componentsInfo));
    return {
      lang: nav.lang,
      content: `\
      export default {
        '/': ${JSON.stringify(sidebar, null, 2).replace(/\n/g, '\n\t')}
      }
      `,
    };
  });

  return templates;
};
