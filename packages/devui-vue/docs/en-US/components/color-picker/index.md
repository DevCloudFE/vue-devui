# ColorPicker 

### When to use

Allows users to use various interactive methods to select colors

### Basic Usage

:::demo

```vue
<template>
  <d-color-picker></d-color-picker>
</template>
```

:::

### Color transparency

Allows users to dynamically adjust the display alpha mode, which is true by default
:::demo

```vue
<template>
  <d-button btnStyle="common" @click="isShowAlpha">test showAlpha Be {{ show }}</d-button>
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

### Color mode

Set dynamic output color mode
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

### Historical color

Customize whether to display historical colors. By default, it is true
:::demo

```vue
<template>
  <d-button btnStyle="common" @click="isShowAlpha">test showAlpha Be {{ show }}</d-button>
  <d-color-picker :show-history="show" v-model="color" mode="hsl"></d-color-picker>
</template>

<script>
import { defineComponent, watch, ref } from 'vue'

export default defineComponent({
  setup() {
    let show = ref(true)
    const isShowAlpha = () => {
      show.value = !show.value
    }
    const color = ref('hsla(353, 1, 0.58, 1)')
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

### Foundation panel customization
Sets a customizable base panel color swatch
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

| parameter         | type      | default   | introduce                                        | Jump Demo                   |
| :---: | :---: | :---: | :---: | :---: |
| mode         | `String`  | `rgb`  | Toggle color mode                                | [mode](#color-mode)       |  |
| dotSize      | `Number`  | `15`   | Palette dot size                              |                             |  |
| swatches     | `Array`   |        | Predefined sample panels                              | [swatches](#foundation-panel-customization) |  |
| show-alpha   | `Boolean` | `true` | Show transparency progress bar                        | [Color transparency](#color-transparency)   |  |
| show-history | `Boolean` | `true` | Show historical colors                            | [show-history](#historical-color)   |  |
| v-model      | `String`  |        | Binding color value support（hex , rgb , hsl , hsv ） |                             |  |
