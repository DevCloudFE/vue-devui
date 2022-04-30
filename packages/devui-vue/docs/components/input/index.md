# Input 输入框

文本输入框。

#### 何时使用

需要手动输入文字使用。

### 基本用法

:::demo `v-model`对输入值做双向绑定，`placeholder`、`autofocus`等原生 input 支持的属性会被自动继承。

```vue
<template>
  <div class="devui-input-demo">
    <h4>Default</h4>

    <d-input v-model="value1" placeholder="请输入" autofocus></d-input>

    <h4>Disabled</h4>

    <d-input v-model="value2" placeholder="请输入" disabled></d-input>

    <h4>Error</h4>

    <d-input v-model="value3" placeholder="请输入" error></d-input>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      value1: ref(''),
      value2: ref(''),
      value3: ref(''),
    };
  },
});
</script>
```

:::

### 尺寸

:::demo 支持`sm`、`md`、`lg`三种尺寸，默认为`md`。

```vue
<template>
  <div>
    <h4>Small</h4>

    <d-input v-model="value1" size="sm" placeholder="请输入"></d-input>

    <h4>Middle</h4>

    <d-input v-model="value2" placeholder="请输入"></d-input>

    <h4>Large</h4>

    <d-input v-model="value3" size="lg" placeholder="请输入"></d-input>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      value1: ref(''),
      value2: ref(''),
      value3: ref(''),
    };
  },
});
</script>
```

:::

### Input 参数

| 参数名   | 类型                    | 默认值 | 说明                                             | 跳转 Demo             |
| :------- | :---------------------- | :----- | :----------------------------------------------- | :-------------------- |
| v-model  | `string`                | ''     | 绑定值                                           | [基本用法](#基本用法) |
| disabled | `boolean`               | false  | 可选，文本框是否被禁用                           | [基本用法](#基本用法) |
| error    | `boolean`               | false  | 可选，文本框是否出现输入错误                     | [基本用法](#基本用法) |
| size     | [InputSize](#inputsize) | 'md'   | 可选，文本框尺寸，有三种选择`'lg'`,`'md'`,`'sm'` | [尺寸](#尺寸)         |

### Input 事件

| 事件名  | 回调参数                     | 说明                           |
| :------ | :--------------------------- | :----------------------------- |
| focus   | `Function(e: FocusEvent)`    | 获取焦点时触发                 |
| blur    | `Function(e: FocusEvent)`    | 失去焦点时触发                 |
| input   | `Function(e: Event)`         | 输入值改变时触发               |
| change  | `Function(e: Event)`         | 输入框失去焦点或按下回车时触发 |
| keydown | `Function(e: KeyboardEvent)` | 按下按键时触发                 |

### Input 类型定义

#### InputSize

```ts
type InputSize = 'sm' | 'md' | 'lg';
```
