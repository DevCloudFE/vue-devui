const path = require('path');
const fs = require('fs');
const shelljs = require('shelljs');
const fsExtra = require('fs-extra');
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
const typingsCollectionThemePath = path.resolve(typingsPath, 'theme-collection/*');
async function copyTypings() {
  const themePublicApi = fs.readFileSync(path.resolve(typingsPath, 'theme/public-api.d.ts'), 'utf8');
  const themeCollectionPublicApi = fs.readFileSync(path.resolve(typingsPath, 'theme-collection/public-api.d.ts'), 'utf8');
  let extendThemeContent = fs.readFileSync(path.resolve(typingsPath, 'theme-collection/extend-theme.d.ts'), 'utf8');
  extendThemeContent = extendThemeContent.replace('../', './');

  await shelljs.cp('-R', typingsThemePath, outputDir);
  await shelljs.cp('-R', typingsCollectionThemePath, outputDir);
  fsExtra.outputFileSync(path.resolve(outputDir, 'public-api.d.ts'), `${themePublicApi}${themeCollectionPublicApi}`, 'utf8');
  fsExtra.outputFileSync(path.resolve(outputDir, 'extend-theme.d.ts'), extendThemeContent, 'utf8');
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
