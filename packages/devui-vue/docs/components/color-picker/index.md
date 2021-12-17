# ColorPicker 颜色选择器

### 何时使用


### 基本用法
:::demo 

```vue
<template>
  <d-input v-model="msg"></d-input>
  <div class="aa" :style="{background: msg}"></div>
  <d-button @click="isShowAlpha">test showAlpha {{show}}</d-button>
  <d-color-picker mode="hsl" v-model="msg" :show-alpha="show"></d-color-picker>
</template>

<script>
import { defineComponent, watch, ref } from 'vue'

export default defineComponent({
  setup() {
    const msg = ref('')
    const show = ref(true)
    const isShowAlpha = () => {
      show.value = !show.value
    }
    watch(() => msg.value, (e) => {
      console.log(e)
    })
    return {
      msg,
      isShowAlpha,
      show
    }
  }
})
</script>

<style>
.aa {
  width: 50px;
  height: 50px;
}
</style>
```

:::

### d-color-picker

d-color-picker 参数

| 参数 | 类型 | 默认 | 说明 | 跳转 Demo | 全局配置项 |
| ---- | ---- | ---- | ---- | --------- | ---------- |
|      |      |      |      |           |            |
|      |      |      |      |           |            |
|      |      |      |      |           |            |

d-color-picker 事件

| 事件 | 类型 | 说明 | 跳转 Demo |
| ---- | ---- | ---- | --------- |
|      |      |      |           |
|      |      |      |           |
|      |      |      |           |

