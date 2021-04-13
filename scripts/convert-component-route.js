const fs = require('fs');
const path = require('path');
const shelljs = require('shelljs');
const program = require('commander');

const DEFAULT_SOURCE_PATH = path.resolve(__dirname, '../docs/component.route.ts');
const DEFAULT_TARGET_PATH = path.resolve(__dirname, '../src/components');

// 从命令行参数中取源文件和目标文件路径
program
  .option('-s, --source <type>', 'Original file path', DEFAULT_SOURCE_PATH)
  .option('-t, --target <type>', 'Target file path', DEFAULT_TARGET_PATH)
program.parse(process.argv);

const { source, target } = program.opts();

/**
 * 将 ng-devui 的组件路由文件转换成 vue-devui 的路由文件
 * 
 * 主要转换规则：
 * 1. loadChildren 整行移除，loadChildren 分多行的，需要将多行都移除
 * 2. data 改成 meta
 * 3. import 的组件都从 app-demo-cell 导入
 * 
 * 例如：
 * import { ExamplePanelComponent } from './example-panel.component'; -> import ExamplePanelComponent from './app-demo-cell.vue';
 * import { GetStartedComponent } from './get-started.component'; -> import GetStartedComponent from './app-demo-cell.vue';
 * import { ColorComponent } from './color/color.component'; -> import ColorComponent from './app-demo-cell.vue';
 * import { ThemeGuideComponent } from './theme-guide.component'; -> import ThemeGuideComponent from './app-demo-cell.vue';
 * 
 *   {
 *     path: 'accordion',
 *     component: ExamplePanelComponent,
 *     loadChildren: () => import('../../../devui/accordion/demo/accordion-demo.moudule').then((m) => m.AccordionDemoModule),
 *     data: {
 *       type: '导航',
 *       enType: 'Navigation',
 *       name: 'Accordion',
 *       cnName: '手风琴',
 *     },
 *   },
 * ->
 *   {
 *     path: 'accordion',
 *     component: ExamplePanelComponent,
 *     meta: {
 *       type: '导航',
 *       enType: 'Navigation',
 *       name: 'Accordion',
 *       cnName: '手风琴',
 *     },
 *   },
 */
function convertComponentRoute(source, target) {
  shelljs.sed('-i', /import { ExamplePanelComponent } from '.\/example-panel.component'/, 'import ExamplePanelComponent from \'.\/app-demo-cell.vue\'', source);
  shelljs.sed('-i', /import { GetStartedComponent } from '.\/get-started.component'/, 'import GetStartedComponent from \'.\/app-demo-cell.vue\'', source);
  shelljs.sed('-i', /import { ColorComponent } from '.\/color\/color.component'/, 'import ColorComponent from \'.\/app-demo-cell.vue\'', source);
  shelljs.sed('-i', /import { ThemeGuideComponent } from '.\/theme-guide.component'/, 'import ThemeGuideComponent from \'.\/app-demo-cell.vue\'', source);
  
  shelljs.sed('-i', /redirectTo: 'get-start'/, 'redirect: \'/components/button\'', source);

  shelljs.sed('-i', /^.*loadChildren.*$/, '', source);
  shelljs.sed('-i', /^.*import\(.*$/, '', source);

  shelljs.sed('-i', /data: {/, 'meta: {', source);

  shelljs.sed('-i', /];/, '];\n\nexport default routesConfig;', source);

  shelljs.cp(source, target);
}

convertComponentRoute(source, target);
