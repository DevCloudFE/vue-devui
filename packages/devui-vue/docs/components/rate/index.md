# Rate 等级评估

等级评估。

#### 何时使用

用户对一个产品进行评分时可以使用。

### 只读模式

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

### 动态模式

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
      value,
    }
  },
}
</script>
```

:::

### 动态模式-自定义

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

### 半选模式

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
    const value = ref(2.5)
    const change = (val) => {
      console.log(val)
    }
    return {
      value,
      change,
    }
  },
}
</script>
```

:::

### 使用 type 参数

:::demo

```vue
<template>
  <div>
    <d-rate
      v-model="value1"
      :read="true"
      type="success"
      :count="5"
      icon="star"
    />
  </div>
  <div>
    <d-rate
      v-model="value2"
      :read="true"
      type="warning"
      :count="5"
      icon="star"
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

d-rate 参数

|   参数    |              类型               | 默认值 | 描述                                                     | 跳转 Demo                           |
| :-------: | :-----------------------------: | :----: | :------------------------------------------------------- | ----------------------------------- |
|   read    |            `boolean`            | false  | 可选，设置是否为只读模式，只读模式无法交互               | [只读模式](#只读模式)               |
|   count   |            `number`             |   5    | 可选，设置总等级数                                       | [只读模式](#只读模式)               |
|   type    | `'success'\|'warning'\|'error'` |   --   | 可选，设置当前评分的类型，不同类型对应不同颜色           | [使用 type 参数](#使用-type-参数)   |
|   color   |            `string`             |   --   | 可选，星星颜色                                           | [动态模式-自定义](#动态模式-自定义) |
|   icon    |            `string`             |   --   | 可选，评分图标的样式，只支持 devUI 图标库中所有图标      | [动态模式](#动态模式)               |
| character |            `string`             |   --   | 可选，评分图标的样式，icon 与 character 只能设置其中一个 | [动态模式-自定义](#动态模式-自定义) |
| allowHalf |            `boolean`            | false  | 可选，动态模式下是否允许半选                             | [半选模式](#半选模式)               |

d-rate 事件

| 参数   | 类型                   | 说明           | 回调参数     | 跳转 Demo             |
| ------ | ---------------------- | -------------- | ------------ | --------------------- |
| change | `EventEmitter<number>` | 分值改变时触发 | 改变后的分值 | [半选模式](#半选模式) |
