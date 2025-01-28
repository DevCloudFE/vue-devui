# InputNumber 数字输入框

数字输入框组件。

:::tip 何时使用
当需要获取标准数值时。
:::

## 用法

### 基本用法

只需要在 d-input-number 元素中使用 `v-model` 绑定变量即可，变量的初始值即为默认值。

:::demo

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

`disabled` 属性设置为 `true` 即可禁用整个组件。

:::demo

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

如果你需要控制数值在某一范围内，可以设置 `min` 属性和 `max` 属性。当给组件设置的初始值大于 `max` 属性值时会自动被重置为 `max`属性值，小于 `min` 属性值时会自动被重置为 `min`属性值。

:::demo

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

设置 `step` 属性可以控制步长。

:::demo

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

`precision`属性可以控制数值精度。

:::demo

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

提供了 lg、md、sm 三种尺寸的数字输入框，默认尺寸为 md。

:::demo

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
  setup() {
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

### 正则限制

允许传入正则或正则字符串限制输入，输入时会优先匹配传入的正则，不输入则不限制。

:::demo

```vue
<template>
  <div>
    <div class="space">reg</div>
    <d-input-number v-model="num1" :reg="reg"></d-input-number>

    <div class="space">regStr</div>
    <d-input-number v-model="num2" :reg="regStr"></d-input-number>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const reg = /^(-|\+)?\d*$/;
    const regStr = '^(-|\\+)*\\d*$';
    const num1 = ref(1);
    const num2 = ref(2);
    return {
      num1,
      num2,
      reg,
      regStr,
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

### 允许空值

当 `allowEmpty` 为 `true` 的时候允许输入框的值为空，空值返回为 `null`，传入数据不为 `number` 类型且上一次输入没有值的时候都会返回 null。

:::demo

```vue
<template>
  <div>
    <d-input-number v-model="num" :allowEmpty="true" @change="onChange"></d-input-number>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup(props) {
    const num = ref(undefined);
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

### InputNumber 参数

| 参数名          | 类型               | 默认值    | 说明                                 | 跳转 Demo             |
| :-------------- | :----------------- | :-------- | :----------------------------------- | :-------------------- |
| v-model         | `number`           | --        | 可选，文本框的值                     | [基本用法](#基本用法) |
| step            | `number`           | 1         | 可选，步数                           | [步数](#步数)         |
| placeholder     | `string`           | --        | 可选，文本框 placeholder             | [基本用法](#基本用法) |
| max             | `number`           | Infinity  | 可选，输入框的最大值 max             | [数值范围](#数值范围) |
| min             | `number`           | -Infinity | 可选，输入框的最小值 min             | [数值范围](#数值范围) |
| disabled        | `boolean`          | false     | 可选，文本框是否被禁用               | [禁用状态](#禁用状态) |
| precision       | `number`           | --        | 可选，数值精度                       | [精度](#精度)         |
| size            | [ISize](#isize)    | 'md'      | 可选，文本框尺寸                     | [尺寸](#尺寸)         |
| reg             | `RegExp \| string` | --        | 可选，用于限制输入的正则或正则字符串 | [正则限制](#正则限制) |
| allowEmpty      | `boolean \| false` | --        | 可选，是否允许值为空 允许空值        | [允许空值](#允许空值) |
| show-glow-style | `boolean`          | true      | 可选，是否展示悬浮发光效果           |                       |

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
