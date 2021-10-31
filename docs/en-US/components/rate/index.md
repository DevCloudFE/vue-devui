# Rate

Grade evaluation。

When to sue 
It can be used when users rate a product。

### Demo

### Read-only mode

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
      value1,
    }
  },
}
</script>
```

:::

### Dynamic mode

:::demo

```vue
<template>
  <d-rate v-model="value" icon="emoji" />
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const value = ref(2)
    return {
      value,
    }
  },
}
</script>
```

:::

### Dynamic mode-custom

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
      value,
    }
  },
}
</script>
```

:::

### Use the type parameter

:::demo

```vue
<template>
  <div>
    <d-rate
      v-model="value1"
      :read="true"
      type="success"
      :count="5"
      icon="ban"
    />
  </div>
  <div>
    <d-rate
      v-model="value2"
      :read="true"
      type="warning"
      :count="5"
      character="B"
      color="red"
    />
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
      value3,
    }
  },
}
</script>
```

:::

### API

d-rate parameter

|   parameter    |              type               | default | description                                                     | jump Demo                           |
| :-------: | :-----------------------------: | :----: | :------------------------------------------------------- | ----------------------------------- |
|   read    |            `boolean`            | false  | Optional, set whether to read-only mode, read-only mode cannot be interactive               | [只读模式](#只读模式)               |
|   count   |            `number`             |   5    | Optional, set the total number of levels                                       | [只读模式](#只读模式)               |
|   type    | `'success'\|'warning'\|'error'` |   --   | Optional, set the current rating type, different types correspond to different colors           | [使用 type 参数](#使用-type-参数)   |
|   color   |            `string`             |   --   | Optional, star color                                           | [动态模式-自定义](#动态模式-自定义) |
|   icon    |            `string`             |   --   | Optional, the style of the rating icon, only supports all icons in the devUI icon library      | [动态模式](#动态模式)               |
| character |            `string`             |   --   | Optional, the style of the rating icon, only one of icon and character can be set | [动态模式-自定义](#动态模式-自定义) |
