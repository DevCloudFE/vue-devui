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
允许用户动态调节展示alpha模式
:::demo 

```vue
<template>
  <d-button @click="isShowAlpha">test showAlpha {{show}}</d-button>
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
设置mode展示响应颜色模式
:::demo 

```vue
<template>
  <d-color-picker v-model="color" mode="hex"></d-color-picker>
</template>

<script>
import { defineComponent, watch, ref } from 'vue'

export default defineComponent({
  setup() {
    const show = ref(true)
    const color = ref('#FF6827FF')
    return {
      show,
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
  <d-color-picker v-model="color" mode="hex"></d-color-picker>
</template>

<script>
import { defineComponent, watch, ref } from 'vue'

export default defineComponent({
  setup() {
    const show = ref(true)
    const color = ref('#FF6827FF')
    return {
      show,
      color
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

