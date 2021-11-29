# Input 输入框

文本输入框。

### 何时使用

需要手动输入文字使用。

### 基本用法

:::demo

```vue
<template>
  <h4 style="margin: 10px 0">Default</h4>

  <d-input placeholder="Please Enter" autoFocus id="textInput" class="dinput"></d-input>

  <h4 style="margin: 10px 0">Disabled</h4>

  <d-input placeholder="Please Enter" :disabled="true" class="dinput"></d-input>

  <h4 style="margin: 10px 0">Error</h4>

  <d-input placeholder="Please Enter" :error="true" class="dinput"></d-input>
</template>
<style>
.dinput {
  width: 200px;
}
</style>
```

:::

### 尺寸

:::demo

```vue
<template>
  <h4 style="margin: 10px 0">Small</h4>

  <d-input size="sm" class="dinput" placeholder="Please Enter"></d-input>

  <h4 style="margin: 10px 0">Middle</h4>

  <d-input class="dinput" placeholder="Please Enter"></d-input>

  <h4 style="margin: 10px 0">Large</h4>

  <d-input size="lg" placeholder="Please Enter" class="dinput"></d-input>
</template>
```

:::

### 密码框

:::demo

```vue
<template>
  <d-input v-model="searchText" class="dinput" placeholder="Please Enter" showPassword></d-input>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const searchText = ref('')
    return {
      searchText
    }
  }
})
</script>
```

:::

### API

|         参数          |       类型       |          默认           |                      说明                      |       跳转 Demo       |
| :-------------------: | :--------------: | :---------------------: | :--------------------------------------------: | :-------------------: |
|          id           |     `string`     |           --            |                可选，文本框 id                 | [基本用法](#基本用法) |
| modelValue \/ v-model |     `string`     |           ''            |                     绑定值                     |   [密码框](#密码框)   |
|      placeholder      |     `string`     |           --            |            可选，文本框 placeholder            | [基本用法](#基本用法) |
|       maxLength       |     `number`     | Number.MAX_SAFE_INTEGER |           可选，输入框的 max-length            |                       |
|       disabled        |    `boolean`     |          false          |             可选，文本框是否被禁用             | [基本用法](#基本用法) |
|         error         |    `boolean`     |          false          |          可选，文本框是否出现输入错误          | [基本用法](#基本用法) |
|         size          | `'sm'\|''\|'lg'` |           ''            | 可选，文本框尺寸，有三种选择`'lg'`,`''`,`'sm'` |     [尺寸](#尺寸)     |
|       cssClass        |     `string`     |           ''            |          可选，支持传入类名到输入框上          |                       |
|     showPassword      |    `boolean`     |          false          |                可选，密码输入框                |   [密码框](#密码框)   |
|       autoFocus       |    `boolean`     |          false          |            可选，输入框是否自动对焦            | [基本用法](#基本用法) |
