# ProQuadrantDiagramgress 象限图

象限图。

### 何时使用

根据需求对事务进行区域划分与价值排序，可用于管理事务的优先级。

### 基本用法

<h4>Basic Usage</h4>

:::demo

```vue
<template>
  <d-quadrant-diagram :view='view'/>
  <d-button @click='handle'/>
</template>


<script>
import { defineComponent, reactive } from 'vue'

export default ({
  setup() {
    const view = reactive({
      height: 200,
      width: 200,
    });
    const handle = () => {
      view.height = 400;
      view.width = 400;
    };
    return {
      handle,
      view,
    }
  }
})
</script>
```

:::
