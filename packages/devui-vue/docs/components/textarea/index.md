# Textarea 多行文本框

文本输入区域。

#### 何时使用

需要手动输入文字，并且文字内容较多时使用。

### 基本用法

:::demo

```vue
<template>
  <h4 style="margin: 10px 0">Default</h4>

  <d-textarea v-model="valueDefault" autofocus id="textArea"></d-textarea>

  <h4 style="margin: 10px 0">Disabled</h4>

  <d-textarea placeholder="我是被禁用状态" disabled></d-textarea>

  <h4 style="margin: 10px 0">Error</h4>

  <d-textarea v-model="valueError" placeholder="我是出错状态" error></d-textarea>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const valueDefault = ref('我是默认值');
    const valueError = ref('');
    return {
      valueDefault,
      valueError,
    };
  },
});
</script>
```

:::

### 文本框高度控制

:::demo

```vue
<template>
  <d-textarea v-model="valueHeight" :rows="5" placeholder="文本域高度可通过 rows 属性控制"></d-textarea>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const valueHeight = ref('');
    return {
      valueHeight,
    };
  },
});
</script>
```

:::

### 自适应文本框

设置文字输入类型的 `autosize` 属性使得根据内容自动调整的高度。 你可以给 `autosize` 提供一个包含有最大和最小高度的对象，让输入框自动调整。

:::demo

```vue
<template>
  <d-textarea v-model="valueAutoSize1" autosize placeholder="请输入"></d-textarea>
  <div style="margin: 20px 0" />
  <d-textarea v-model="valueAutoSize2" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入" resize="both"></d-textarea>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const valueAutoSize1 = ref('');
    const valueAutoSize2 = ref('');
    return {
      valueAutoSize1,
      valueAutoSize2,
    };
  },
});
</script>
```

:::

### 调整大小

:::demo

```vue
<template>
  <h4 style="margin: 10px 0">vertical</h4>
  <d-textarea placeholder="我可以缩放" resize="vertical"></d-textarea>

  <h4 style="margin: 10px 0">horizontal</h4>

  <d-textarea resize="horizontal" placeholder="请输入"></d-textarea>

  <h4 style="margin: 10px 0">both</h4>

  <d-textarea resize="both" placeholder="请输入"></d-textarea>

  <h4 style="margin: 10px 0">none</h4>

  <d-textarea resize="none" placeholder="请输入"></d-textarea>

  <h4 style="margin: 10px 0">inherit</h4>

  <d-textarea resize="inherit" placeholder="请输入"></d-textarea>
</template>
```

:::

### 显示字数

:::demo

```vue
<template>
  <h4 style="margin: 10px 0">默认</h4>
  <d-textarea v-model="valueCount1" show-count placeholder="请输入"></d-textarea>
  <h4 style="margin: 10px 0">显示最大字数</h4>
  <d-textarea v-model="valueCount2" show-count maxlength="20" placeholder="请输入"></d-textarea>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const valueCount1 = ref('');
    const valueCount2 = ref('');
    return {
      valueCount1,
      valueCount2,
    };
  },
});
</script>
```

:::

### 事件响应

:::demo

```vue
<template>
  <d-textarea
    v-model="value1"
    show-count
    :max-length="20"
    placeholder="打开控制台输入文字看看"
    @update:modelValue="onUpdate"
    @change="onChange"
    @focus="onFocus"
    @keydown="onKeydown"
  ></d-textarea>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const onUpdate = (value) => {
      console.log('【d-textarea update value】：', value);
    };
    const onChange = (value) => {
      console.log('【d-textarea change value】：', value);
    };
    const onFocus = (e) => {
      console.log('【d-textarea onFocus】:', e);
    };
    const onKeydown = (e) => {
      console.log('【d-textarea onKeydown:', e);
    };
    const value1 = ref('');
    return {
      onUpdate,
      onChange,
      onFocus,
      onKeydown,
      value1,
    };
  },
};
</script>
```

:::

### Textarea 参数

| 参数名      | 类型               | 默认值 | 说明                                                                          | 跳转 Demo                         |
| :---------- | :----------------- | :----- | :---------------------------------------------------------------------------- | :-------------------------------- |
| v-model     | `string`           | -      | 可选，文本框绑定值                                                            | [基本用法](#基本用法)             |
| placeholder | `string`           | -      | 可选，文本框 placeholder                                                      | [基本用法](#基本用法)             |
| disabled    | `boolean`          | false  | 可选，文本框是否被禁用                                                        | [基本用法](#基本用法)             |
| autofocus   | `boolean`          | false  | 可选，文本框是否自动获得焦点                                                  | [基本用法](#基本用法)             |
| error       | `boolean`          | false  | 可选，文本框是否出现输入错误                                                  | [基本用法](#基本用法)             |
| resize      | [Resize](#resize)  | 'none' | 可选，文本框是否可调整大小                                                    | [调整大小](#调整大小)             |
| show-count  | `boolean`          | false  | 可选，文本框是否是否展示字数                                                  | [显示字数](#显示字数)             |
| rows        | `number / string`  | 2      | 可选，文本框高度控制                                                          | [文本框高度控制](#文本框高度控制) |
| autosize    | `boolean / object` | false  | textarea 高度是否自适应。可以接受一个对象，比如: `{ minRows: 2, maxRows: 6 }` | [自适应文本框](#自适应文本框)     |

### Textarea 事件

| 事件名  | 回调参数                  | 说明                           | 跳转 Demo             |
| :------ | :------------------------ | :----------------------------- | :-------------------- |
| update  | `Function(value: string)` | 文本框内容变化（实时触发）     | [事件响应](#事件响应) |
| focus   | `Function(event: Event)`  | 文本框获得焦点                 | [事件响应](#事件响应) |
| blur    | `Function(event: Event)`  | 文本框失去焦点                 | [事件响应](#事件响应) |
| change  | `Function(value: string)` | 文本框内容变化（失去焦点触发） | [事件响应](#事件响应) |
| keydown | `Function(event: Event)`  | 文本框按下键盘                 | [事件响应](#事件响应) |

### Textarea 类型定义

#### Resize

```ts
type Resize = 'none' | 'vertical' | 'horizontal' | 'both' | 'inherit';
```
