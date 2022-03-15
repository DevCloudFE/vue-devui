const path = require('path');
const fsExtra = require('fs-extra');

const outputDir = path.resolve(__dirname, '../../build');
const outputNuxtDir = path.resolve(__dirname, '../../build/nuxt');

exports.createNuxtPlugin = () => {
  const fileStr = `import { join } from 'pathe'
  import { defineNuxtModule } from '@nuxt/kit'
  
  export default defineNuxtModule({
    hooks: {
      'components:dirs'(dirs) {
        dirs.push({
          path: join(__dirname,'./components'),
          prefix:'D'
        })
      }
    }
  })`;

  fsExtra.outputFile(path.resolve(outputNuxtDir, `index.js`), fileStr, 'utf-8');
};

exports.createAutoImportedComponent = (dirName) => {
  const importStyle = fsExtra.pathExistsSync(path.resolve(outputDir, `${dirName}/style.css`))
    ? `import '../../${dirName}/style.css' \n`
    : ``;

  const comps = require(path.resolve(outputDir, `${dirName}/index.es.js`));

  Object.keys(comps).forEach((compName) => {
    if (compName !== 'default' && compName.indexOf('Directive') === -1) {
      const fileStr = `${importStyle}\nexport  { ${compName} as default } from '../../${dirName}/index.es.js'`;

      fsExtra.outputFile(path.resolve(outputNuxtDir, `components/${compName}.js`), fileStr, 'utf-8');
    }
  });
};
