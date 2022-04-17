const { camelCase, upperFirst } = require('lodash');
const { INDEX_FILE_NAME, DEVUI_DIR, WHITE_LIST_READY_COMPONENTS } = require('./constant');
const { resolve } = require('path');
const logger = require('./logger');
const fs = require('fs-extra');
const traverse = require('@babel/traverse').default;
const babelParser = require('@babel/parser');

exports.bigCamelCase = (str) => {
  return upperFirst(camelCase(str));
};

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
    }));
};

exports.parseExportByFileInfo = (fileInfo, ignoreParseError) => {
  const exportModule = {};
  const indexContent = fs.readFileSync(fileInfo.path, { encoding: 'utf-8' });

  const ast = babelParser.parse(indexContent, {
    sourceType: 'module',
    plugins: [
      'typescript'
    ]
  });

  const exportName = [];
  let exportDefault = null;

  traverse(ast, {
    ExportNamedDeclaration({node}) {
      if (node.specifiers.length) {
        node.specifiers.forEach(specifier => {
          exportName.push(specifier.local.name);
        });
      } else if (node.declaration) {
        if (node.declaration.declarations) {
          node.declaration.declarations.forEach(dec => {
            exportName.push(dec.id.name);
          });
        } else if (node.declaration.id) {
          exportName.push(node.declaration.id.name);
        }
      }
    },
    ExportDefaultDeclaration() {
      exportDefault = fileInfo.name + 'Install';
    }
  });

  if (!exportDefault) {
    logger.error(`${fileInfo.path} must have "export default".`);

    if (ignoreParseError) {
      return exportModule;
    } else {
      process.exit(1);
    }
  }

  if (!exportName.length) {
    logger.error(`${fileInfo.path} must have "export xxx".`);

    if (ignoreParseError) {
      return exportModule;
    } else {
      process.exit(1);
    }
  }

  exportModule.default = exportDefault;
  exportModule.parts = exportName;
  exportModule.fileInfo = fileInfo;

  return exportModule;
};

const parseComponentInfo = (name) => {
  const componentInfo = {
    name: this.bigCamelCase(name)
  };
  let hasExportDefault = false;
  const indexContent = fs.readFileSync(resolve(DEVUI_DIR, name, INDEX_FILE_NAME), { encoding: 'utf-8' });

  const ast = babelParser.parse(indexContent, {
    sourceType: 'module',
    plugins: [
      'typescript'
    ]
  });
  traverse(ast, {
    ExportDefaultDeclaration({node}) {
      hasExportDefault = true;
      if (node.declaration && node.declaration.properties) {
        const properties = node.declaration.properties;
        properties.forEach(pro => {
          if (pro.type === 'ObjectProperty') {
            componentInfo[pro.key.name] = pro.value.value;
          }
        });
      }
    }
  });

  if (!hasExportDefault) {
    logger.warning(`${componentInfo.name} must have "export default" and component info.`);
  }

  return componentInfo;
};

exports.parseComponentInfo = parseComponentInfo;

exports.isReadyToRelease = (componentName) => {
  return parseComponentInfo(componentName).status === '100%'
    || WHITE_LIST_READY_COMPONENTS.includes(componentName);
};
