# VirtualList 虚拟列表

虚拟列表无限滚动

### 何时使用

大量列表数据显示

### 基本用法

:::demo 渲染五千条数据

```vue
<template>
  <d-virtual-list :data="data">
    <template #item="{ value }">
      <div>children{{ value }}</div>
    </template>
  </d-virtual-list>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const data = ref(
      Array
        .from({ length: 5000 })
        .map((_, index) => ({ value: index }))
    );
    return { data };
  },
};
</script>

<style>
</style>
```

:::

### d-virtual-list 参数

| 参数 | 类型 | 默认 | 说明 | 跳转 Demo |
| ---- | ---- | ---- | ---- | --------- |
|   data   | `Array<Object>` |      | 数据数组 | [基本用法](#基本用法) |
| component | `string` | `div` | 定义滚动标签 | [基本用法](#基本用法) |
| height | `number` | `100` | 滚动区域高度 | [基本用法](#基本用法) |
| virtual | `boolean` | `true` | 是否禁用滚动 | [基本用法](#基本用法) |

### d-virtual-list 事件

| 事件        | 类型                                                         | 说明                   | 跳转 Demo             |
| ----------- | ------------------------------------------------------------ | ---------------------- | --------------------- |
| scroll      | `(e: Event) => void`                                         | 滚动事件               | [基本用法](#基本用法) |
| show-change | `(renderList: Array<Object>, allList: Array<Object>) => void` | 当前虚拟滚动渲染的数据 | [基本用法](#基本用法) |

### d-virtual-list 插槽

| 名称           | 默认 | 说明                                                         | 跳转 Demo                     |
| -------------- | ---- | ------------------------------------------------------------ | ----------------------------- |
| item           | --   | 自定义默认内容                                               | [基本用法](#基本用法) |
