# ColorPicker 颜色选择器

### 何时使用

允许用户使用各种交互方法来选择颜色

### 基本用法

:::demo

```vue
<template>
  <d-color-picker></d-color-picker>
</template>
```

:::

### 颜色透明度

允许用户动态调节展示 alpha 模式
:::demo

```vue
<template>
  <d-button @click="isShowAlpha">test showAlpha {{ show }}</d-button>
  <d-color-picker v-model="color" :show-alpha="show"></d-color-picker>
</template>

<script>
import { defineComponent, watch, ref } from 'vue'

export default defineComponent({
  setup() {
    const show = ref(true)
    const color = ref('rgba(83, 199, 212, 0.72)')
    const isShowAlpha = () => {
      show.value = !show.value
    }
    return {
      color,
      isShowAlpha,
      show
    }
  }
})
</script>
```

:::

### 颜色模式

设置 mode 展示响应颜色模式
:::demo

```vue
<template>
  <d-color-picker v-model="color" mode="hex"></d-color-picker>
</template>

<script>
import { defineComponent, watch, ref } from 'vue'

export default defineComponent({
  setup() {
    const color = ref('#FF6827A1')
    return {
      color
    }
  }
})
</script>
```

:::

### 历史颜色

自定义是否展示历史颜色
:::demo

```vue
<template>
  <d-color-picker :show-history="false" v-model="color" mode="hsl"></d-color-picker>
</template>

<script>
import { defineComponent, watch, ref } from 'vue'

export default defineComponent({
  setup() {
    const color = ref('hsla(353, 1, 0.58, 1)')
    return {
      color
    }
  }
})
</script>
```

:::

### 基础面板自定义
设置可供选择的基础面板颜色样本
:::demo

```vue
<template>
  <d-color-picker :swatches="colors" v-model="color"></d-color-picker>
</template>

<script>
import { defineComponent, watch, ref } from 'vue'

export default defineComponent({
  setup() {
    const colors = [
      '#f44336',
      '#e91e63',
      '#9c27b0',
      '#673ab7',
      '#3f51b5',
      '#2196f3',
      '#03a9f4',
      '#00bcd4',
      '#009688',
      '#4caf50'
    ]
    const color = ref('rgba(155, 39, 176, 1)')
    return {
      color,
      colors
    }
  }
})
</script>
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
