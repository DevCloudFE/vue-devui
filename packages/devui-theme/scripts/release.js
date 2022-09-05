const path = require('path');
const shelljs = require('shelljs');
const { Command } = require('commander');
const { createPackage } = require('./create-package');

const version = require('../package.json').version;

const program = new Command();

program.option('-v, --version <type>', 'Add release version number');

program.parse(process.argv);
const options = program.opts();
if (options.versions) {
  version = options.versions;
}

const outputDir = path.resolve(__dirname, '../build');

const stylesVarPath = path.resolve(__dirname, '../src/styles-var');
async function copyStylesVar() {
  await shelljs.cp('-R', stylesVarPath, outputDir);
}

const extendThemePath = path.resolve(__dirname, '../src/theme-collection/extend-theme.scss');
const extendThemeVuePath = path.resolve(__dirname, '../src/theme-collection/extend-theme-vue.scss');
async function copyExtendTheme() {
  await shelljs.cp('-R', extendThemePath, outputDir);
  await shelljs.cp('-R', extendThemeVuePath, outputDir);
}

const typingsPath = path.resolve(__dirname, '../typings');
const typingsThemePath = path.resolve(typingsPath, 'theme/*');
async function copyTypings() {
  await shelljs.cp('-R', typingsThemePath, outputDir);
  await shelljs.rm('-rf', typingsPath);
}

async function publish() {
  await shelljs.exec('tsc');
  await copyStylesVar();
  await copyExtendTheme();
  await createPackage('devui-theme', version, outputDir);
  await copyTypings();
}

publish();
