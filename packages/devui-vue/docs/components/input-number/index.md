# InputNumber 数字输入框

数字输入框组件。

#### 何时使用

当需要获取标准数值时。

### 基本用法

:::demo 使用它，只需要在d-input-number元素中使用v-model绑定变量即可，变量的初始值即为默认值。

```vue
<template>
  <div>
    <d-input-number v-model="num" @change="onChange" :max="10" :min="1" :placeholder="'请输入'"></d-input-number>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup(props,ctx){
      const num = ref(0)
      const onChange = (val) => {
        console.log(val)
      }
      return {
        num,
        onChange
      }
    }
  })
</script>
```
:::

### 禁用状态

:::demo disabled属性接受一个Boolean，设置为true即可禁用整个组件，如果你只需要控制数值在某一范围内，可以设置min属性和max属性，不设置min和max时，最小值为 0。

```vue
<template>
  <div>
    <d-input-number v-model="num" :disabled="true"></d-input-number>
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

### 步数

:::demo 设置step属性可以控制步长，接受一个Number。

```vue
<template>
  <div>
    <d-input-number v-model="num" :step="2"></d-input-number>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup(props,ctx){
      const num = ref(3)
      return {
        num
      }
    }
  })
</script>
```
:::

### 尺寸

:::demo 额外提供了 lg、normal、sm 三种尺寸的数字输入框。

```vue
<template>
  <div>
    <d-input-number v-model="num1" :size="'lg'"></d-input-number>
    <d-input-number v-model="num2" :size="'normal'"></d-input-number>
    <d-input-number v-model="num3" :size="'sm'"></d-input-number>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup(props,ctx){
      const num1 = ref(1)
      const num2 = ref(2)
      const num3 = ref(3)
      return {
        num1,
        num2,
        num3
      }
    }
  })
</script>
```
:::
### API

|    参数     |   类型   |   默认    | 说明                     | 跳转 Demo                         |
| :---------: | :------: | :-------: | :-----------------------: | :---------------------------------: |
|    step     | `number` |    0     | 可选，步数             | [步数](#步数)  |
|    placeholder     | `string` |  --   | 可选，文本框 placeholder     | [基本用法](#基本用法) |
|    max     | `number` |  --   | 可选，输入框的最大值max    |  [基本用法](#基本用法) |
|    min     | `number` |  --   | 可选，输入框的最小值min    |  [基本用法](#基本用法) |
|    disabled    | `boolean` | false | 可选，文本框是否被禁用           | [禁用状态](#禁用状态)  |
| value | `number` |  0   | 可选，文本框默认值 | [基本用法](#基本用法) |
| size | `'lg'\|'normal'\|'sm'` |  ''   | 可选，文本框尺寸，有三种选择`'lg'`,`'narmal'`,`'sm'` | [尺寸](#尺寸) |

### Events

|    事件名称     |   说明   |   回调参数    | 
| :---------: | :------: | :-------: | 
|    change     | 绑定值被改变时触发 |    (currentValue)     | 
|    blur     | 在组件 Input 失去焦点时触发 |  (event: Event)   | 
|    focus     | 在组件 Input 获得焦点时触发 |  (event: Event)   | 
|    input     | 在组件 Input 获得输入时触发 |  (currentValue)   | 
