# QuadrantDiagram 象限图

象限图。

:::tip 何时使用
根据需求对事务进行区域划分与价值排序，可用于管理事务的优先级。
:::

## 用法

### 基本用法

#### Basic Usage

:::demo

```vue
<template>
  <d-quadrant-diagram :view="view" />
</template>

<script>
import { defineComponent, reactive } from 'vue';

export default {
  setup() {
    const view = reactive({
      height: 500,
      width: 500,
    });
    return {
      view,
    };
  },
};
</script>
```

:::
