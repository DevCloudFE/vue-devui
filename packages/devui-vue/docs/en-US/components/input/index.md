# Input

Text input。

### When to use

You need to manually enter text to use。

### Basic usage

:::demo

```vue
<template>
  <h4 style="margin: 10px 0">Default</h4>

  <d-input placeholder="Please Enter" autoFocus id="textInput"  class="dinput"></d-input>

  <h4 style="margin: 10px 0">Disabled</h4>

  <d-input placeholder="Please Enter" :disabled="true"  class="dinput"></d-input>

  <h4 style="margin: 10px 0">Error</h4>

  <d-input placeholder="Please Enter" :error="true"  class="dinput"></d-input>
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
    <h4 style="margin: 10px 0">Small</h4>

    <d-input size="sm" class="dinput" placeholder="Please Enter" ></d-input>

    <h4 style="margin: 10px 0">Middle</h4>

    <d-input class="dinput" placeholder="Please Enter"></d-input>

    <h4 style="margin: 10px 0">Large</h4>

    <d-input size="lg"  placeholder="Please Enter" class="dinput"></d-input>
</template>
```

:::


### Password

:::demo

```vue
<template>
  <d-input v-model:value="searchText" class="dinput" placeholder="Please Enter" showPassword></d-input>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const searchText = ref('')
    return {
      searchText
    }
  },
})
</script>
```

:::

### API

|    parameter     |   type   |   default    | description                     | jump Demo                         |
| :---------: | :------: | :-------: | :-----------------------: | :---------------------------------: |
|    id     | `string` |    --     | Optional, text box id            | [Basic-usage](#Basic-usage)  |
|    placeholder     | `string` |  --   | Optional，textarea placeholder     | [Basic-usage](#Basic-usage) |
|    maxLength     | `number` |  Number.MAX_SAFE_INTEGER   | Optional, the max-length of the input box    |   |
|    disabled    | `boolean` | false | Optional，Whether the text box is disabled           | [Basic-usage](#Basic-usage)  |
| error | `boolean` |  false   | Optional，Whether there is an input error in the text box | [Basic-usage](#Basic-usage) |
| size | `'sm'\|''\|'lg'` |  ''   | Optional，There are three options for the size of the text box`'lg'`,`''`,`'sm'` | [Size](#Size) |
| cssClass | `string` |  ''  | Optional，Support to pass in the class name to the input box |  |
| showPassword | `boolean` |  false  | Optional，password |  [Password](#Password)  |
|  autoFocus   | `boolean` | false | Optional，Whether the input box is auto-focused | [Basic-usage](#Basic-usage)  |

