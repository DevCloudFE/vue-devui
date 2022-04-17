import { getPartName } from '../lib-entry/lib-entry';
import { ComponentMeta } from './meta';

export default function genDocTemplate(meta: ComponentMeta) {
  return `\
# ${meta.fullTitle}

\/\/ todo 组件描述

### 何时使用

\/\/ todo 使用时机描述

### 基本用法

\/\/ todo 用法描述

:::demo \/\/ todo 展开代码的内部描述

\`\`\`vue
<template>
  <div>{{ msg }}</div>
</template>

<script setup>
import { ${meta.parts.map((part) => getPartName(part, meta.name)).join(', ')} } from '../index'

const msg = '${meta.fullTitle} 组件文档示例'
</script>

<style>
</style>
\`\`\`

:::

### ${meta.realName}

${meta.realName} 参数

| 参数 | 类型 | 默认 | 说明 | 跳转 Demo | 全局配置项 |
| ---- | ---- | ---- | ---- | --------- | --------- |
|      |      |      |      |           |           |
|      |      |      |      |           |           |
|      |      |      |      |           |           |

${meta.realName} 事件

| 事件 | 类型 | 说明 | 跳转 Demo |
| ---- | ---- | ---- | --------- |
|      |      |      |           |
|      |      |      |           |
|      |      |      |           |
`;
}
