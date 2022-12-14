const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');
const { defineConfig, build } = require('vite');
const vue = require('@vitejs/plugin-vue');
const vueJsx = require('@vitejs/plugin-vue-jsx');
const nuxtBuild = require('./build-nuxt-auto-import');
const { isReadyToRelease } = require('../shared/utils');
const { execSync } = require('child_process');
const { volarSupport } = require('./build-volar-support');
const logger = require('../shared/logger');
const replaceIdentifierPath = path.resolve(__dirname,'../replaceIdentifer.json');
const replaceIdentifier = JSON.parse(fs.readFileSync(replaceIdentifierPath).toString());
const entryDir = path.resolve(__dirname, '../../devui');
const outputDir = path.resolve(__dirname, '../../build');

const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()],
});

const rollupOptions = {
  external: ['vue', 'vue-router', '@vueuse/core', '@floating-ui/dom'],
  output: {
    globals: {
      vue: 'Vue',
    },
  },
};

const buildSingle = async (name) => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: path.resolve(entryDir, name),
          name: 'index',
          fileName: 'index',
          formats: ['es', 'umd'],
        },
        outDir: path.resolve(outputDir, name),
      },
    })
  );
};

const buildAll = async () => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: path.resolve(entryDir, 'vue-devui.ts'),
          name: 'VueDevui',
          fileName: 'vue-devui',
          formats: ['es', 'umd'],
        },
        outDir: outputDir,
      },
    })
  );
};

const createPackageJson = (name) => {
  const fileStr = `{
  "name": "${name}",
  "version": "0.0.0",
  "main": "index.umd.js",
  "module": "index.es.js",
  "style": "style.css",
  "types": "../types/${name}/index.d.ts"
}`;

  fsExtra.outputFile(path.resolve(outputDir, `${name}/package.json`), fileStr, 'utf-8');
};

exports.build = async () => {
  await buildAll();

  const components = fs.readdirSync(entryDir).filter((name) => {
    const componentDir = path.resolve(entryDir, name);
    const isDir = fs.lstatSync(componentDir).isDirectory();
    return isDir && fs.readdirSync(componentDir).includes('index.ts');
  });
  const readyToReleaseComponentName = [];
  for (const name of components) {
    if (!isReadyToRelease(name)) {
      continue;
    }
    readyToReleaseComponentName.push(name);
    await buildSingle(name);
    createPackageJson(name);
    nuxtBuild.createAutoImportedComponent(name);
  }
  // 生成global.d.ts
  try {
    execSync(`pnpm run build:components:dts`);
  } catch {}
  nuxtBuild.createNuxtPlugin();
  logger.success('准备生成global.d.ts');
  const volarSupportbuildState = volarSupport(replaceIdentifier, readyToReleaseComponentName);
  fs.writeFileSync('./build/index.d.ts', `
export * from './types/vue-devui';
import _default from './types/vue-devui';
export default _default;
`);
  if (volarSupportbuildState){
    logger.success('global.d.ts生成成功');
  } else {
    logger.error('global.d.ts生成失败, 因为发生错误');
  }
};
