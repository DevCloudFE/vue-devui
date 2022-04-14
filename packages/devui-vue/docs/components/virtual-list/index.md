# VirtualList 虚拟列表

虚拟列表无限滚动

### 何时使用

大量列表数据显示

### 基本用法

:::demo // todo 展开代码的内部描述

```vue
<template>
  <d-virtual-list :data="data" :height="100" :itemHeight="20">
    <template #default="{ value }">
      <div>children{{ value }}</div>
    </template>
  </d-virtual-list>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const data = ref(Array.from({ length: 5000 }).map((_, index) => ({ value: index })));
    return { data };
  },
};
</script>

<style>
</style>
```

:::

### VirtualList

VirtualList 参数

| 参数 | 类型 | 默认 | 说明 | 跳转 Demo | 全局配置项 |
| ---- | ---- | ---- | ---- | --------- | --------- |
|      |      |      |      |           |           |
|      |      |      |      |           |           |
|      |      |      |      |           |           |

VirtualList 事件

| 事件 | 类型 | 说明 | 跳转 Demo |
| ---- | ---- | ---- | --------- |
|      |      |      |           |
|      |      |      |           |
|      |      |      |           |
