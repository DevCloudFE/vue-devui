# Input

Text input box.

### When To Use

When you want to manually enter text.

### Basic Usage

:::demo

```vue
<template>
  <div class="devui-input-demo">
    <h4>Default</h4>
  
    <d-input placeholder="Please Enter" autoFocus id="textInput" class="dinput"></d-input>
  
    <h4>Disabled</h4>
  
    <d-input placeholder="Please Enter" :disabled="true" class="dinput"></d-input>
  
    <h4>Error</h4>
  
    <d-input placeholder="Please Enter" :error="true" class="dinput"></d-input>
  </div>
</template>
<style>
.dinput {
  width: 200px;
}
</style>
```

:::

### Size

:::demo

```vue
<template>
  <div class="devui-input-demo">
    <h4>Small</h4>
  
    <d-input size="sm" class="dinput" placeholder="Please Enter"></d-input>
  
    <h4>Middle</h4>
  
    <d-input class="dinput" placeholder="Please Enter"></d-input>
  
    <h4>Large</h4>
  
    <d-input size="lg" placeholder="Please Enter" class="dinput"></d-input>
  </div>
</template>
```

:::

### Password Input

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

|      Parameter        |       Type      |      Default     |     Description   |   Jump to Demo |
| :-------------------: | :--------------: | :---------------------: | :--------------------------------------------: | :-------------------: |
|          id           |     `string`     |           --            |   Optional, input ID  | [Basic Usage](#basic-usage) |
| v-model |     `string`     |           ''            |  Optional, bound value  |[Password Input](#password-input)   |
|      placeholder      |     `string`     |           --            |  Optional, input placeholder    | [Basic Usage](#basic-usage) |
|       maxLength       |     `number`     | Number.MAX_SAFE_INTEGER |  Optional, the max-length of the input box |         |
|       disabled        |    `boolean`     |          false          |  Optional, whether the input box is disabled  | [Basic Usage](#basic-usage) |
|         error         |    `boolean`     |          false          |  Optional, indicating whether an input error occurs in the input box. | [Basic Usage](#basic-usage) |
|         size          | `'sm'\|''\|'lg'` |           ''            | Optional, size of the text box. The value can be 'lg','','sm' |     [Size](#size)     |
|       cssClass        |     `string`     |           ''            |  Optional, support to pass in the class name to the input box   |                       |
|     showPassword      |    `boolean`     |          false          |  Optional, password input box   |[Password Input](#password-input)   |
|       autoFocus       |    `boolean`     |          false          |  Optional, whether the input box is auto-focused   | [Basic Usage](#basic-usage) |

<style>
.devui-input-demo h4 {
  font-weight: 700;
  color: #575d6c;
  font-size: 12px;
  margin: 15px 0;
}
</style>