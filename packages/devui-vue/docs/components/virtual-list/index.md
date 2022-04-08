# VirtualList 虚拟列表

虚拟列表无限滚动

### 何时使用

大量列表数据显示

### 基本用法

:::demo // todo 展开代码的内部描述

```vue
<template>
  <d-virtual-list :style="style" :tv="val" />
  <br />
  <button @click="click">click</button>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const style = ref({ color: 'red' });
    const val = ref('998');
    const click = () => {
      const a = `${Math.random()}`;
      val.value = a;
    }
    return { style, click, val };
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
