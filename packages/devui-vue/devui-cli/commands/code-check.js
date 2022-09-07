const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const chalk = require('chalk');
const { isReadyToRelease } = require('../shared/utils');

const log = console.log;
const chalkEslint = chalk.hex('#4b32c3');
const chalkUnitTest = chalk.hex('#99425b');
const chalkError = chalk.hex('#F66F6A');
const chalkSuccess = chalk.hex('#3DCCA6');
const entryDir = path.resolve(__dirname, '../../devui');
const unitTestFailedComponents = [];

const completeComponents = fs.readdirSync(entryDir).filter((name) => {
  const componentDir = path.resolve(entryDir, name);
  const isDir = fs.lstatSync(componentDir).isDirectory();
  return isDir && fs.readdirSync(componentDir).includes('index.ts') && isReadyToRelease(name);
});

const eslintCheckSingle = async (name) => {
  const eslintResult = await shell.exec(`eslint --color "./devui/${name}/**/{*.ts,*.tsx}"`);

  if (eslintResult.stdout !== '') {
    shell.echo(chalkError('Error: ESLint failed.'));
    shell.exit(1);
  }

  log(chalkEslint(`PASS ${name}`));
};

const eslintCheckSome = async (components) => {
  const componentArr = components.split(',');

  for (const name of componentArr) {
    await eslintCheckSingle(name);
  }

  log(chalkSuccess('\nCongratulations, all components have passed the ESLint check!'));
};

const eslintCheckAll = async () => {
  for (const name of completeComponents) {
    await eslintCheckSingle(name);
  }

  log(chalkSuccess('\nCongratulations, all components have passed the ESLint check!'));
};

const eslintCheck = async (components) => {
  if (components) {
    await eslintCheckSome(components);
  } else {
    await eslintCheckAll();
  }
};

const unitTestSingle = async (name) => {
  const unitTestResult = await shell.exec(`pnpm test --filter vue-devui -- \
  --colors --noStackTrace --testMatch **/**/${name}/**/*.spec.{ts,tsx}`);

  if (/failed|ERR_/.test(unitTestResult.stderr)) {
    unitTestFailedComponents.push(name);
    shell.echo(chalkError('Error: Unit test failed.'));

    // 注释这一行可以统计未通过单元测试的组件列表
    shell.exit(1);
  }

  log(chalkUnitTest(`PASS ${name}`));
};

const unitTestSome = async (components) => {
  const componentArr = components.split(',');

  for (const name of componentArr) {
    await unitTestSingle(name);
  }

  log(chalkSuccess('\nCongratulations, all components have passed the unit test!'));
};

const unitTestAll = async () => {
  // 单个组件执行单元测试，总耗时太长
  // for (const name of completeComponents) {
  //   await unitTestSingle(name);
  // }

  const unitTestResult = await shell.exec('pnpm --filter vue-devui test --reporter default');
  // 解决单元测试报错，但PR合入门禁不中断问题
  if (/failed|ERR_/.test(unitTestResult.stderr)) {
    shell.echo(chalkError('Error: Unit test failed.'));
    shell.exit(1);
  }

  log(chalkSuccess('\nCongratulations, all components have passed the unit test!'));
};

const unitTest = async (components) => {
  if (components) {
    await unitTestSome(components);
  } else {
    await unitTestAll();
  }

  log(chalkUnitTest(`The following components failed the unit test:`));
  log(chalkError(`${unitTestFailedComponents.join('\n')}`));
};

exports.codeCheck = async function () {
  const { components, type } = this.opts();

  if (!type) {
    await eslintCheck(components);
    await unitTest(components);
  } else if (type === 'eslint') {
    await eslintCheck(components);
  } else if (type === 'unit-test') {
    await unitTest(components);
  }
};
