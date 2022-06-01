# Steps 步骤条

// todo 组件描述

#### 何时使用

// todo 使用场景描述

### 基本用法

:::demo // todo 基本用法描述

```vue
<template>
  <d-steps>{{ data }}</d-steps>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const data = ref('步骤条');

    return {
      data
    }
  }
})
</script>

<style lang="scss">
// demo中的样式不支持 scoped，需要使用约定的class名称包裹，格式：demo-componentname-demoname
.demo-steps-basic {
  // css
}
</style>
```

:::

### Steps 参数

| 参数名 | 类型 | 默认值 | 说明 | 跳转 Demo |
| :---- | :---- | :---- | :---- | :--------- |
|      |   `string`   |      |      |     [基本用法](#基本用法)      |
|      |   [IXxx](#ixxx)   |      |      |           |
|      |      |      |      |           |

### Steps 事件

| 事件名 | 回调参数 | 说明 | 跳转 Demo |
| :---- | :---- | :---- | :--------- |
|      |      |      |           |
|      |      |      |           |
|      |      |      |           |

### Steps 插槽

| 插槽名 | 说明 | 跳转 Demo |
| :---- | :---- | :--------- |
|   default   |      |           |
|      |      |           |
|      |      |           |

### Steps 类型定义

#### IXxx

```ts
interface IXxx {
  xxx: string;
}
```

