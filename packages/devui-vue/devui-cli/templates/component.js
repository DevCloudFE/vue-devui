const { DEVUI_NAMESPACE, CSS_CLASS_PREFIX } = require('../shared/constant');
const { camelCase } = require('lodash');
const { bigCamelCase } = require('../shared/utils');

// 创建组件模板
exports.createComponentTemplate = ({ styleName, componentName, typesName }) => `\
import { defineComponent } from 'vue'
import { ${camelCase(componentName)}Props, ${bigCamelCase(
  componentName
)}Props } from './${typesName}'
import './${styleName}.scss'

export default defineComponent({
  name: '${bigCamelCase(DEVUI_NAMESPACE)}${bigCamelCase(componentName)}',
  props: ${camelCase(componentName)}Props,
  emits: [],
  setup(props: ${bigCamelCase(componentName)}Props, ctx) {
    return () => {
      return (<div class="${CSS_CLASS_PREFIX}-${componentName}"></div>)
    }
  }
})
`;

// 创建类型声明模板
exports.createTypesTemplate = ({ componentName }) => `\
import type { PropType, ExtractPropTypes } from 'vue'

export const ${camelCase(componentName)}Props = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
} as const

export type ${bigCamelCase(componentName)}Props = ExtractPropTypes<typeof ${camelCase(
  componentName
)}Props>
`;

// 创建指令模板
exports.createDirectiveTemplate = () => `\
// can export function.
export default {
  created() { },
  beforeMount() { },
  mounted() { },
  beforeUpdate() { },
  updated() { },
  beforeUnmount() { },
  unmounted() { }
}
`;
// 创建server模板
exports.createServiceTemplate = ({ componentName, typesName, serviceName }) => `\
import { ${bigCamelCase(componentName)}Props } from './${typesName}'

const ${bigCamelCase(serviceName)} = {
  // open(props: ${bigCamelCase(componentName)}Props) { }
}

export default ${bigCamelCase(serviceName)}
`;

// 创建scss模板
exports.createStyleTemplate = ({ componentName }) => `\
.${CSS_CLASS_PREFIX}-${componentName} {
  //
}
`;

// 创建index模板
exports.createIndexTemplate = ({
  title,
  category,
  hasComponent,
  hasDirective,
  hasService,
  componentName,
  directiveName,
  serviceName
}) => {
  const importComponentStr = `\nimport ${bigCamelCase(componentName)} from './src/${componentName}'`;
  const importDirectiveStr = `\nimport ${bigCamelCase(directiveName)} from './src/${directiveName}'`;
  const importServiceStr = `\nimport ${bigCamelCase(serviceName)} from './src/${serviceName}'`;

  const installComponentStr = `    app.use(${bigCamelCase(componentName)} as any)`;
  const installDirectiveStr = `\n    app.directive('${bigCamelCase(componentName)}', ${bigCamelCase(
    directiveName
  )})`;
  const installServiceStr = `\n    app.config.globalProperties.$${camelCase(
    serviceName
  )} = ${bigCamelCase(serviceName)}`;

  const getPartStr = (state, str) => (state ? str : '');

  const importStr =
    getPartStr(hasComponent, importComponentStr) +
    getPartStr(hasDirective, importDirectiveStr) +
    getPartStr(hasService, importServiceStr);

  const installStr =
    getPartStr(hasComponent, installComponentStr) +
    getPartStr(hasDirective, installDirectiveStr) +
    getPartStr(hasService, installServiceStr);

  return `\
import type { App } from 'vue'\
${importStr}
${
  hasComponent
    ? `\n${bigCamelCase(componentName)}.install = function(app: App): void {
  app.component(${bigCamelCase(componentName)}.name, ${bigCamelCase(componentName)})
}\n`
    : ''
}
export { ${[
    hasComponent ? bigCamelCase(componentName) : null,
    hasDirective ? bigCamelCase(directiveName) : null,
    hasService ? bigCamelCase(serviceName) : null
  ]
    .filter((p) => p !== null)
    .join(', ')} }

export default {
  title: '${bigCamelCase(componentName)} ${title}',
  category: '${category}',
  status: undefined, // TODO: 组件若开发完成则填入"100%"，并删除该注释
  install(app: App): void {
    ${installStr}
  }
}
`;
};

// 创建测试模板
exports.createTestsTemplate = ({
  componentName,
  directiveName,
  serviceName,
  hasComponent,
  hasDirective,
  hasService
}) => `\
import { mount } from '@vue/test-utils';
import { ${[
    hasComponent ? bigCamelCase(componentName) : null,
    hasDirective ? bigCamelCase(directiveName) : null,
    hasService ? bigCamelCase(serviceName) : null
  ]
    .filter((p) => p !== null)
    .join(', ')} } from '../index';

describe('${componentName} test', () => {
  it('${componentName} init render', async () => {
    // todo
  })
})
`;

// 创建文档模板
exports.createDocumentTemplate = ({ componentName, title }) => `\
# ${bigCamelCase(componentName)} ${title}

// todo 组件描述

### 何时使用

// todo 使用时机描述


### 基本用法
// todo 用法描述
:::demo // todo 展开代码的内部描述

\`\`\`vue
<template>
  <div>{{ msg }}</div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      msg: '${bigCamelCase(componentName)} ${title} 组件文档示例'
    }
  }
})
</script>

<style>

</style>
\`\`\`

:::

### d-${componentName}

d-${componentName} 参数

| 参数 | 类型 | 默认 | 说明 | 跳转 Demo | 全局配置项 |
| ---- | ---- | ---- | ---- | --------- | --------- |
|      |      |      |      |           |           |
|      |      |      |      |           |           |
|      |      |      |      |           |           |

d-${componentName} 事件

| 事件 | 类型 | 说明 | 跳转 Demo |
| ---- | ---- | ---- | --------- |
|      |      |      |           |
|      |      |      |           |
|      |      |      |           |

`;
