# MultiAutoComplete 多项自动补全

// todo 组件描述

#### 何时使用

// todo 使用场景描述

### 基本用法

:::demo // todo 基本用法描述

```vue
<template>
  <d-multi-auto-complete>{{ data }}</d-multi-auto-complete>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const data = ref('多项自动补全');

    return {
      data
    }
  }
})
</script>

<style lang="scss">
// demo中的样式不支持 scoped，需要使用约定的class名称包裹，格式：demo-componentname-demoname
.demo-multi-auto-complete-basic {
  // css
}
</style>
```

:::

### MultiAutoComplete 参数

| 参数名 | 类型 | 默认值 | 说明 | 跳转 Demo |
| :---- | :---- | :---- | :---- | :--------- |
|      |   `string`   |      |      |     [基本用法](#基本用法)      |
|      |   [IXxx](#ixxx)   |      |      |           |
|      |      |      |      |           |

### MultiAutoComplete 事件

| 事件名 | 回调参数 | 说明 | 跳转 Demo |
| :---- | :---- | :---- | :--------- |
|      |      |      |           |
|      |      |      |           |
|      |      |      |           |

### MultiAutoComplete 插槽

| 插槽名 | 说明 | 跳转 Demo |
| :---- | :---- | :--------- |
|   default   |      |           |
|      |      |           |
|      |      |           |

### MultiAutoComplete 类型定义

#### IXxx

```ts
interface IXxx {
  xxx: string;
}
```

