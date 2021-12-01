# Rate

Rate.

### When To Use

When you expect users to rate a product.

### Demo

### Read-only Mode

:::demo

```vue
<template>
  <d-rate :read="true" v-model="value1" />
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const value1 = ref(3.5)
    return {
      value1
    }
  }
}
</script>
```

:::

### Dynamic Mode

:::demo

```vue
<template>
  <d-rate v-model="value" icon="star-o" />
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const value = ref(2)
    return {
      value
    }
  }
}
</script>
```

:::

### Dynamic Mode-Custom

:::demo

```vue
<template>
  <d-rate character="A" color="#ffa500" v-model="value" :count="6" />
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const value = ref(3)
    return {
      value
    }
  }
}
</script>
```

:::

### Half Star Mode

:::demo

```vue
<template>
  <d-rate v-model="value" :allowHalf="true" @change="change" />
  {{ value }}
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const value = ref(2)
    const change = (val) => {
      console.log(val)
    }
    return {
      value,
      change
    }
  }
}
</script>
```

:::

### Use the type parameter

:::demo

```vue
<template>
  <div>
    <d-rate v-model="value1" :read="true" type="success" :count="5" icon="star" />
  </div>
  <div>
    <d-rate v-model="value2" :read="true" type="warning" :count="5" icon="star" />
  </div>
  <div>
    <d-rate v-model="value3" :read="true" type="error" :count="5" />
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const value1 = ref(3.5)
    const value2 = ref(2)
    const value3 = ref(3)
    return {
      value1,
      value2,
      value3
    }
  }
}
</script>
```

:::

### API

d-rate parameter

| Parameter |              Type               | Default | Description                                                                                                           | Jump to Demo                                      |
| :-------: | :-----------------------------: | :-----: | :-------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
|   read    |            `boolean`            |  false  | Optional. This parameter specifies whether to enable read-only mode. In read-only mode, interaction is not supported. | [Read-only Mode](#read-only-mode)                 |
|   count   |            `number`             |    5    | Optional. Sets the total number of levels.                                                                            | [Read-only Mode](#read-only-mode)                 |
|   type    | `'success'\|'warning'\|'error'` |   --    | Optional. Set the current rating type. Different types correspond to different colors.                                | [Use the type parameter](#use-the-type-parameter) |
|   color   |            `string`             |   --    | Optional. Star color.                                                                                                 | [Dynamic Mode Custom](#dynamic-mode-custom)       |
|   icon    |            `string`             |   --    | Optional. Style of the rating icon. Only all icons in the DevUI icon library are supported.                           | [Dynamic Mode](#dynamic-mode)                     |
| character |            `string`             |   --    | Optional. Scoring icon style. Only one of icon and character can be set.                                              | [Dynamic Mode Custom](#dynamic-mode-custom)       |
| allowHalf |            `boolean`            |  false  | Optional. Whether allow Half Selection in Dynamic Mode.                                                               | [Half Selection Mode](#half-star-mode)            |

d-rate event

| Parameter | Type                   | Description                  | parameters    | Jump to Demo                           |
| --------- | ---------------------- | ---------------------------- | ------------- | -------------------------------------- |
| change    | `EventEmitter<number>` | triggers when `count` change | the new count | [Half Selection Mode](#half-star-mode) |
