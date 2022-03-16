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
const outputDirThemeCollection = path.resolve(__dirname, '../build-theme-collection');

const source = path.resolve(__dirname, '../build-theme-collection');
const target = path.resolve(__dirname, '../build/theme-collection');
async function copyThemeCollection() {
  await shelljs.cp('-R', source, target);
  await shelljs.rm('-rf', outputDirThemeCollection);
}

const stylesVarPath = path.resolve(__dirname, '../src/styles-var');
async function copyStylesVar() {
  await shelljs.cp('-R', stylesVarPath, outputDir);
}

const extendThemePath = path.resolve(__dirname, '../src/theme-collection/extend-theme.scss');
const extendThemeVuePath = path.resolve(__dirname, '../src/theme-collection/extend-theme-vue.scss');
async function copyExtendTheme() {
  await shelljs.cp('-R', extendThemePath, outputDirThemeCollection);
  await shelljs.cp('-R', extendThemeVuePath, outputDirThemeCollection);
}

const typingsPath = path.resolve(__dirname, '../typings');
const typingsThemePath = path.resolve(typingsPath, 'theme/*');
const typingsThemeCollectionPath = path.resolve(typingsPath, 'theme-collection/*');
async function copyTypings() {
  await shelljs.cp('-R', typingsThemePath, outputDir);
  await shelljs.cp('-R', typingsThemeCollectionPath, target);
  await shelljs.cp('-rf', typingsPath);
}

async function publish() {
  await shelljs.exec('tsc');
  await copyStylesVar();
  await copyExtendTheme();
  await createPackage('@devui/theme', version, outputDir);
  await createPackage('@devui/theme-collection', version, outputDirThemeCollection);
  await copyThemeCollection();
  await copyTypings();
  shelljs.sed('-i', /\/theme/g, '', path.resolve(target, 'extend-theme.d.ts'));
}

publish();
