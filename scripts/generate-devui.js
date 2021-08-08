require('esbuild-register');

const path = require('path');
const fs = require('fs-extra');

const config = require('../sites/.vitepress/config/sidebar').default;
console.log('config:', config);

let importStr = `import { App } from 'vue';\n\n`;
const components = [];

config['/'].forEach(({ text: ctext, children }) => {
  if (ctext !== '快速开始') {
    importStr += `// ${ctext}\n`;
    console.log('ctext:', ctext);
    console.log('children:', children);
    children && children.forEach(({ text, link }) => {
      const name = text.split(' ')[0];
      const linkItem = link.split('/').filter(item => item);
      const filename = linkItem[1];
      importStr += `import ${name} from './${filename}';\n`;
      components.push(name);
    })
    importStr += `\n`;
  }
});

const componentStr = components.join(', ');

let installStr = `function install(app: App): void {
  const packages = [ ${componentStr} ];
  packages.forEach((item: any) => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}\n\n`;

const exportStr = `export { ${componentStr} };
export default { install, version: '0.0.1' };`;

const fileStr = importStr + installStr + exportStr;

const targetFile = path.resolve(__dirname, '../devui/vue-devui.ts');
fs.outputFile(targetFile, fileStr, 'utf8');
