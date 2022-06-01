const { DEVUI_NAMESPACE, CSS_CLASS_PREFIX } = require('../shared/constant');
const { camelCase } = require('lodash');
const { bigCamelCase } = require('../shared/utils');

// 创建组件模板
exports.createComponentTemplate = ({ styleName, componentName, typesName }) => `\
import { defineComponent, toRefs } from 'vue';
import type { SetupContext } from 'vue';
import { ${camelCase(componentName)}Props, ${bigCamelCase(
  componentName
)}Props } from './${typesName}';
import './${styleName}.scss';

export default defineComponent({
  name: '${bigCamelCase(DEVUI_NAMESPACE)}${bigCamelCase(componentName)}',
  props: ${camelCase(componentName)}Props,
  emits: [],
  setup(props: ${bigCamelCase(componentName)}Props, ctx: SetupContext) {
    // 直接解构 props 会导致响应式失效，需要使用 toRefs 进行包裹
    // const { data } = toRefs(props);
    // console.log(data.value);

    return () => {
      return (
        <div class="${CSS_CLASS_PREFIX}-${componentName}"></div>
      );
    };
  }
});
`;

// 创建类型声明模板
exports.createTypesTemplate = ({ componentName }) => `\
import type { PropType, ExtractPropTypes } from 'vue';

export const ${camelCase(componentName)}Props = {
  // data: {
  //   type: type,
  //   default: defaultValue
  // },
} as const;

export type ${bigCamelCase(componentName)}Props = ExtractPropTypes<typeof ${camelCase(
  componentName
)}Props>;
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
};
`;
// 创建 service 模板
exports.createServiceTemplate = ({ componentName, typesName, serviceName }) => `\
import { ${bigCamelCase(componentName)}Props } from './${typesName}';

const ${bigCamelCase(serviceName)} = {
  // open(props: ${bigCamelCase(componentName)}Props) { }
};

export default ${bigCamelCase(serviceName)};
`;

// 创建scss模板
exports.createStyleTemplate = ({ componentName }) => `\
// 引入主题变量
@import '../../styles-var/devui-var.scss';

.#{$devui-prefix}-${componentName} {
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
  const importComponentStr = `\nimport ${bigCamelCase(componentName)} from './src/${componentName}';`;
  const importDirectiveStr = `\nimport ${bigCamelCase(directiveName)} from './src/${directiveName}';`;
  const importServiceStr = `\nimport ${bigCamelCase(serviceName)} from './src/${serviceName}';`;

  const installComponentStr = `app.component(${bigCamelCase(componentName)}.name, ${bigCamelCase(componentName)});`;
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
import type { App } from 'vue';\
${importStr}

export * from './src/${componentName}-types';

export { ${[
    hasComponent ? bigCamelCase(componentName) : null,
    hasDirective ? bigCamelCase(directiveName) : null,
    hasService ? bigCamelCase(serviceName) : null
  ]
    .filter((p) => p !== null)
    .join(', ')} };

export default {
  title: '${bigCamelCase(componentName)} ${title}',
  category: '${category}',
  status: '1%', // TODO 组件完成状态，开发完组件新特性请及时更新该状态值；若组件开发完成则填入'100%'，并删除该注释
  install(app: App): void {
    ${installStr}
  }
};
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
import { ComponentPublicInstance } from 'vue';
import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import { ${[
    hasComponent ? bigCamelCase(componentName) : null,
    hasDirective ? bigCamelCase(directiveName) : null,
    hasService ? bigCamelCase(serviceName) : null
  ]
    .filter((p) => p !== null)
    .join(', ')} } from '..';

describe('${componentName}', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;

  it('${componentName} init render', async () => {
    wrapper = mount({
      setup() {
        return () => {
          return <${bigCamelCase(componentName)} />;
        };
      },
    });

    // todo
  })
})
`;

// 创建文档模板
exports.createDocumentTemplate = ({ componentName, title }) => `\
# ${bigCamelCase(componentName)} ${title}

// todo 组件描述

#### 何时使用

// todo 使用场景描述

### 基本用法

:::demo // todo 基本用法描述

\`\`\`vue
<template>
  <d-${componentName}>{{ data }}</d-${componentName}>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const data = ref('${title}');

    return {
      data
    }
  }
})
</script>

<style lang="scss">
// demo中的样式不支持 scoped，需要使用约定的class名称包裹，格式：demo-componentname-demoname
.demo-${componentName}-basic {
  // css
}
</style>
\`\`\`

:::

### ${bigCamelCase(componentName)} 参数

| 参数名 | 类型 | 默认值 | 说明 | 跳转 Demo |
| :---- | :---- | :---- | :---- | :--------- |
|      |   \`string\`   |      |      |     [基本用法](#基本用法)      |
|      |   [IXxx](#ixxx)   |      |      |           |
|      |      |      |      |           |

### ${bigCamelCase(componentName)} 事件

| 事件名 | 回调参数 | 说明 | 跳转 Demo |
| :---- | :---- | :---- | :--------- |
|      |      |      |           |
|      |      |      |           |
|      |      |      |           |

### ${bigCamelCase(componentName)} 插槽

| 插槽名 | 说明 | 跳转 Demo |
| :---- | :---- | :--------- |
|   default   |      |           |
|      |      |           |
|      |      |           |

### ${bigCamelCase(componentName)} 类型定义

#### IXxx

\`\`\`ts
interface IXxx {
  xxx: string;
}
\`\`\`

`;
