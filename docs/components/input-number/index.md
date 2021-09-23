# InputNum 数字输入框

数字输入框仅允许输入标准的数字值，可定义范围。


### 基本用法

:::demo 使用它，只需要在d-input-number元素中使用v-model绑定变量即可，变量的初始值即为默认值。

```vue
<template>
  <div>
    <d-input-number v-model:value="num" :max="10" :min="1"></d-input-number>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup(props,ctx){
      const num = ref(0)
      return {
        num
      }
    }
  })
</script>
```
:::
