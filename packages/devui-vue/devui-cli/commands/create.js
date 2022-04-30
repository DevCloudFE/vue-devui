const logger = require('../shared/logger');
const {
  bigCamelCase,
  resolveDirFilesInfo,
  parseExportByFileInfo,
  parseComponentInfo,
  isReadyToRelease
} = require('../shared/utils');
const fs = require('fs-extra');
const { resolve } = require('path');
const {
  DEVUI_DIR,
  TESTS_DIR_NAME,
  INDEX_FILE_NAME,
  DOCS_FILE_NAME,
  VUE_DEVUI_FILE,
  VUE_DEVUI_IGNORE_DIRS,
  VUE_DEVUI_FILE_NAME,
  CREATE_SUPPORT_TYPES,
  CREATE_UNFINISHED_TYPES,
  CREATE_SUPPORT_TYPE_MAP,
  SITES_COMPONENTS_DIR,
  VITEPRESS_SIDEBAR_FILE,
  VITEPRESS_SIDEBAR_FILE_NAME,
  VITEPRESS_SIDEBAR_FILE_EN,
  VITEPRESS_SIDEBAR_FILE_NAME_EN,
  isProd
} = require('../shared/constant');
const { isEmpty, kebabCase } = require('lodash');
const inquirer = require('inquirer');
const { selectCreateType } = require('../inquirers/create');
const { selectCategory, selectParts, typeName, typeTitle } = require('../inquirers/component');
const {
  createComponentTemplate,
  createStyleTemplate,
  createTypesTemplate,
  createDirectiveTemplate,
  createServiceTemplate,
  createIndexTemplate,
  createTestsTemplate,
  createDocumentTemplate
} = require('../templates/component');
const { createVueDevuiTemplate } = require('../templates/vue-devui');
const ora = require('ora');
const { createVitepressSidebarTemplates } = require('../templates/vitepress-sidebar');

async function createComponent(params = {}) {
  const { name, hasComponent, hasDirective, hasService } = params;

  const componentName = kebabCase(name);
  const styleName = kebabCase(name);
  const typesName = kebabCase(name) + '-types';
  const directiveName = kebabCase(name) + '-directive';
  const serviceName = kebabCase(name) + '-service';
  const testName = kebabCase(name) + '.spec';

  const _params = {
    ...params,
    componentName,
    typesName,
    directiveName,
    serviceName,
    styleName,
    testName
  };

  const componentTemplate = createComponentTemplate(_params);
  const styleTemplate = createStyleTemplate(_params);
  const typesTemplate = createTypesTemplate(_params);
  const directiveTemplate = createDirectiveTemplate(_params);
  const serviceTemplate = createServiceTemplate(_params);
  const indexTemplate = createIndexTemplate(_params);
  // 增加测试模板
  const testsTemplate = createTestsTemplate(_params);
  // 增加文档模板
  const docTemplate = createDocumentTemplate(_params);

  const componentDir = resolve(DEVUI_DIR, componentName);
  const srcDir = resolve(componentDir, 'src');
  const testsDir = resolve(DEVUI_DIR, componentName, TESTS_DIR_NAME);
  const docsDir = resolve(SITES_COMPONENTS_DIR, componentName);

  if (fs.pathExistsSync(componentDir)) {
    logger.error(`${bigCamelCase(componentName)} 组件目录已存在！`);
    process.exit(1);
  }

  const spinner = ora(`开始创建 ${bigCamelCase(componentName)} 组件...`).start();

  try {
    await Promise.all([fs.mkdirs(componentDir), fs.mkdirs(srcDir), fs.mkdirs(testsDir)]);

    const writeFiles = [
      fs.writeFile(resolve(componentDir, INDEX_FILE_NAME), indexTemplate),
      fs.writeFile(resolve(testsDir, `${testName}.tsx`), testsTemplate)
    ];

    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir);
      writeFiles.push(fs.writeFile(resolve(docsDir, DOCS_FILE_NAME), docTemplate));
    } else {
      logger.warning(
        `\n${bigCamelCase(componentName)} 组件文档已存在：${resolve(docsDir, DOCS_FILE_NAME)}`
      );
    }

    if (hasComponent || hasService) {
      writeFiles.push(fs.writeFile(resolve(srcDir, `${typesName}.ts`), typesTemplate));
    }

    if (hasComponent) {
      writeFiles.push(
        fs.writeFile(resolve(srcDir, `${componentName}.tsx`), componentTemplate),
        fs.writeFile(resolve(srcDir, `${styleName}.scss`), styleTemplate)
      );
    }

    if (hasDirective) {
      writeFiles.push(fs.writeFile(resolve(srcDir, `${directiveName}.ts`), directiveTemplate));
    }

    if (hasService) {
      writeFiles.push(fs.writeFile(resolve(srcDir, `${serviceName}.ts`), serviceTemplate));
    }

    await Promise.all(writeFiles);

    spinner.succeed(`${bigCamelCase(componentName)} 组件创建成功！`);
    logger.info(`组件目录：${componentDir}`);
  } catch (e) {
    spinner.fail(e.toString());
    process.exit(1);
  }
}

async function createVueDevui(params, { ignoreParseError, env }) {
  const fileInfo = resolveDirFilesInfo(DEVUI_DIR, VUE_DEVUI_IGNORE_DIRS)
    .filter(({ name }) => (env === 'prod' && isReadyToRelease(kebabCase(name))) || !env || env === 'dev');

  const exportModules = [];

  fileInfo.forEach((f) => {
    const em = parseExportByFileInfo(f, ignoreParseError);

    if (isEmpty(em)) {return;}

    exportModules.push(em);
  });

  const template = createVueDevuiTemplate(exportModules);

  const spinner = ora(`开始创建 ${VUE_DEVUI_FILE_NAME} 文件...`).start();

  try {
    await fs.writeFile(VUE_DEVUI_FILE, template, { encoding: 'utf-8' });

    spinner.succeed(`${VUE_DEVUI_FILE_NAME} 文件创建成功！`);
    logger.info(`文件地址：${VUE_DEVUI_FILE}`);
  } catch (e) {
    spinner.fail(e.toString());
    process.exit(1);
  }
}

async function createVitepressSidebar() {
  const generateFileConfig = {
    zh: {
      fileName: VITEPRESS_SIDEBAR_FILE_NAME,
      location: VITEPRESS_SIDEBAR_FILE
    },
    en: {
      fileName: VITEPRESS_SIDEBAR_FILE_NAME_EN,
      location: VITEPRESS_SIDEBAR_FILE_EN
    }
  };
  const fileInfo = resolveDirFilesInfo(DEVUI_DIR, VUE_DEVUI_IGNORE_DIRS);
  const componentsInfo = [];
  fileInfo.forEach((f) => {
    const info = parseComponentInfo(f.dirname);

    if (isEmpty(info) || (isProd && !isReadyToRelease(f.dirname))) {return;}

    componentsInfo.push(info);
  });

  const templates = createVitepressSidebarTemplates(componentsInfo);
  templates.forEach((template) => {
    const { fileName, location } = generateFileConfig[template.lang];
    const spinner = ora(`开始创建 ${fileName} 文件...`).start();

    try {
      fs.writeFile(location, template.content, { encoding: 'utf-8' });

      spinner.succeed(`${fileName} 文件创建成功！`);
      logger.info(`文件地址：${location}`);
    } catch (e) {
      spinner.fail(e.toString());
      process.exit(1);
    }
  });
}

exports.validateCreateType = (type) => {
  const re = new RegExp('^(' + CREATE_SUPPORT_TYPES.map((t) => `(${t})`).join('|') + ')$');
  const flag = re.test(type);

  !flag && logger.error(`类型错误，可选类型为：${CREATE_SUPPORT_TYPES.join(', ')}`);

  return flag ? type : null;
};

// TODO: 待优化代码结构
exports.create = async (cwd) => {
  let { type } = cwd;

  if (isEmpty(type)) {
    const result = await inquirer.prompt([selectCreateType()]);
    type = result.type;
  }

  if (CREATE_UNFINISHED_TYPES.includes(type)) {
    logger.info('抱歉，该功能暂未完成！');
    process.exit(0);
  }

  let params = {};

  try {
    switch (type) {
    case CREATE_SUPPORT_TYPE_MAP.component:
      params = await inquirer.prompt([typeName(), typeTitle(), selectCategory(), selectParts()]);
      params.hasComponent = params.parts.includes('component');
      params.hasDirective = params.parts.includes('directive');
      params.hasService = params.parts.includes('service');

      await createComponent(params, cwd);
      break;
    case CREATE_SUPPORT_TYPE_MAP['vue-devui']:
      // 创建 devui/vue-devui.ts
      await createVueDevui(params, cwd);
      // 创建 docs/.vitepress/config/sidebar.ts enSidebar.ts
      await createVitepressSidebar();
      break;
    default:
      break;
    }
  } catch (e) {
    logger.error(e.toString());
    process.exit(1);
  }
};
