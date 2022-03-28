const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const { parseComponentInfo } = require('../shared/utils');

const entryDir = path.resolve(__dirname, '../../devui');

const eslintCheck = (name) => {
  shell.exec(`eslint --color "./devui/${name}/**/{*.ts,*.tsx}"`);
};

const eslintCheckSome = (components) => {
  const componentArr = components.split(',');

  for (const name of componentArr) {
    eslintCheck(name);
  }
};

const eslintCheckAll = () => {
  const components = fs.readdirSync(entryDir).filter((name) => {
    const componentDir = path.resolve(entryDir, name);
    const isDir = fs.lstatSync(componentDir).isDirectory();
    return isDir && fs.readdirSync(componentDir).includes('index.ts');
  });

  for (const name of components) {
    if (parseComponentInfo(name).status !== '100%') {
      continue;
    }
    eslintCheck(name);
  }
};

exports.codeCheck = function () {
  const { components } = this.opts();
  if (components) {
    eslintCheckSome(components);
  } else {
    eslintCheckAll();
  }
};
