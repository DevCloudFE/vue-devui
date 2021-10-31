# ProQuadrantDiagramgress

Quadrant diagram。

### When to use

Regional division and value sorting of affairs according to needs, which can be used to manage the priority of affairs。

### Basic usage

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
