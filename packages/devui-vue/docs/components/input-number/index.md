# InputNumber 数字输入框

数字输入框组件。

#### 何时使用

当需要获取标准数值时。

### 基本用法

:::demo 只需要在 d-input-number 元素中使用 `v-model` 绑定变量即可，变量的初始值即为默认值。

```vue
<template>
  <div>
    <d-input-number v-model="num" @change="onChange" placeholder="请输入"></d-input-number>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup(props) {
    const num = ref(0);
    const onChange = (newVal, oldVal) => {
      console.log(newVal, oldVal);
    };
    return {
      num,
      onChange,
    };
  },
});
</script>
```

:::

### 禁用状态

:::demo `disabled` 属性设置为 `true` 即可禁用整个组件。

```vue
<template>
  <div>
    <d-input-number v-model="num" disabled></d-input-number>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup(props) {
    const num = ref(0);
    return {
      num,
    };
  },
});
</script>
```

:::

### 数值范围

:::demo 如果你需要控制数值在某一范围内，可以设置 `min` 属性和 `max` 属性。当给组件设置的初始值大于 `max` 属性值时会自动被重置为 `max`属性值，小于 `min` 属性值时会自动被重置为 `min`属性值。

```vue
<template>
  <div>
    <d-input-number v-model="num" :min="1" :max="5"></d-input-number>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup(props) {
    const num = ref(0);
    return {
      num,
    };
  },
});
</script>
```

:::

### 步数

:::demo 设置 `step` 属性可以控制步长。

```vue
<template>
  <div>
    <d-input-number v-model="num" :step="3"></d-input-number>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup(props) {
    const num = ref(3);
    return {
      num,
    };
  },
});
</script>
```

:::

### 精度

:::demo `precision`属性可以控制数值精度。

```vue
<template>
  <div>
    <d-input-number v-model="num" :precision="2" :step="0.1"></d-input-number>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup(props) {
    const num = ref(1);
    return {
      num,
    };
  },
});
</script>
```

:::

### 尺寸

:::demo 提供了 lg、md、sm 三种尺寸的数字输入框，默认尺寸为 md。

```vue
<template>
  <div>
    <div class="space">Large</div>
    <d-input-number v-model="num1" :size="'lg'"></d-input-number>
    <div class="space">Middle</div>
    <d-input-number v-model="num2" :size="'md'"></d-input-number>
    <div class="space">Small</div>
    <d-input-number v-model="num3" :size="'sm'"></d-input-number>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup(props) {
    const num1 = ref(1);
    const num2 = ref(2);
    const num3 = ref(3);
    return {
      num1,
      num2,
      num3,
    };
  },
});
</script>
<style>
.space {
  padding: 5px 0;
  font-size: 16px;
}
</style>
```

:::

### InputNumber 参数

| 参数名      | 类型            | 默认值    | 说明                     | 跳转 Demo             |
| :---------- | :-------------- | :-------- | :----------------------- | :-------------------- |
| v-model     | `number`        | --        | 可选，文本框的值         | [基本用法](#基本用法) |
| step        | `number`        | 1         | 可选，步数               | [步数](#步数)         |
| placeholder | `string`        | --        | 可选，文本框 placeholder | [基本用法](#基本用法) |
| max         | `number`        | Infinity  | 可选，输入框的最大值 max | [数值范围](#数值范围) |
| min         | `number`        | -Infinity | 可选，输入框的最小值 min | [数值范围](#数值范围) |
| disabled    | `boolean`       | false     | 可选，文本框是否被禁用   | [禁用状态](#禁用状态) |
| precision   | `number`        | --        | 可选，数值精度           | [精度](#精度)         |
| size        | [ISize](#isize) | 'md'      | 可选，文本框尺寸         | [尺寸](#尺寸)         |

### InputNumber 事件

| 事件名 | 回调参数                                                                | 说明                    |
| :----- | :---------------------------------------------------------------------- | :---------------------- |
| change | `Function(currentVal: number \| undefined, oldVal:number \| undefined)` | 绑定值被改变时触发      |
| blur   | `Function(event: Event)`                                                | 在 Input 失去焦点时触发 |
| focus  | `Function(event: Event)`                                                | 在 Input 获得焦点时触发 |
| input  | `Function(currentValue: number \| undefined)`                           | 在 Input 获得输入时触发 |

### InputNumber 方法

| 方法名 | 类型         | 说明                |
| :----- | :----------- | :------------------ |
| focus  | `() => void` | 使 Input 获得焦点   |
| blur   | `() => void` | 使 Input 失去焦点   |
| select | `() => void` | 选中 Input 中的内容 |

### InputNumber 类型定义

#### ISize

```ts
type ISize = 'lg' | 'md' | 'sm';
```
