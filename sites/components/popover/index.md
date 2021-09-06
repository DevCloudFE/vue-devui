:::demo

```vue
<template>
<d-popover content="popover" position="left">
    <template #content>
      <span >我是内容</span>
    </template>
    <template #reference>
        <d-button bsStyle="common">contentdev</d-button>
    <template>
</d-popover>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return {
     
    }
  },
})
</script>
```