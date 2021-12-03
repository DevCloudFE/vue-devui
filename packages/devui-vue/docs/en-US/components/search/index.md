# Search

Search box.

### When To Use

When you need to search for required data in a dataset, you can enter the content (or part) of the required data to return the search results of all the matching content.

### Basic Usage

:::demo Use `sm`, `''`, `lg` to define the `Search` base type

```vue
<template>
  <div class="devui-search-demo">
    <h4>Small</h4>
    <d-search size="sm" autoFocus placeholder="please enter" style="width: 200px" :delay="1000"></d-search>
    <h4>Middle</h4>
    <d-search style="width: 200px" placeholder="please enter" isKeyupSearch @onSearch="onSearch1"></d-search>
    <h4>Large</h4>
    <d-search iconPosition="left" placeholder="please enter" size="lg" style="width: 200px" @onSearch="onSearch2"></d-search>
    <h4>Disabled</h4>
    <d-search disabled style="width: 200px" placeholder="please enter"></d-search>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const onSearch1 = (e) => {
      console.log(e)
    }
    const onSearch2 = (e) => {
      console.log(e)
    }
    return {
      onSearch1,
      onSearch2
    }
  }
})
</script>
```
:::

### Left Search Icon

:::demo Use `left`, `right` to define `Search` icon position, default `right`

```vue
<template>
  <div>
    <d-search iconPosition="left" placeholder="please enter" style="width: 200px"></d-search>
  </div>
</template>
```
:::

### No Border

:::demo Use `noBorder` to define `Search` without borders

```vue
<template>
  <div>
    <d-search iconPosition="left" placeholder="please enter" noBorder style="width: 200px"></d-search>
  </div>
</template>
```
:::

### VModel

:::demo Use `v-model` two-way binding

```vue

<template>
  <d-search cssClass="ipt" v-model="searchText" placeholder="please enter" :maxLength="5" style="width: 200px" @onSearch="search"></d-search>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const searchText = ref('Devui')
    const search = (e) => {
      console.log(`search callback: ${e}，value：${searchText.value}`)
    }
    return {
      searchText,
      search
    }
  },
})
</script>
```

:::

### API

|  Parameter  |   Type   |   Default    | Description        | Jump to Demo             | Global Config |
| :---------: | :------: | :-------: | :----------------------- | --------------------------------- | --------- |
|    size     | `'sm'\|''\|'lg'` |    ''     | Optional. Specifies the size of the search box. The options are lg, '', and sm. | [Basic Usage](#basic-usage)             ||
|    placeholder     | `string` |  --   | Optional. This parameter specifies the placeholder in the input box. | [Left Search Icon](#left-search-icon)             ||
|    maxLength     | `number` |  --   | Optional. Max-length of the text box. |  [VModel](#vmodel)  ||
|    delay     | `number` |  300   | Optional. Delay of debounceTime.  |  [Basic Usage](#basic-usage)  ||
|    disabled    | `boolean` | false | Optional. Indicating whether the text box is available. | [Basic Usage](#basic-usage)             ||
|    autoFocus    | `boolean` | false | Optional. Whether to enable autofocus for the text box. | [Basic Usage](#basic-usage)             ||
| isKeyupSearch | `boolean` |  false   | Optional. Indicates whether to support immediate searchFn after input. | [Basic Usage](#basic-usage) ||
| iconPosition | `string` |  'right'   | Optional. The options are'left' and'right'. | [Left Search Icon](#left-search-icon) ||
| noBorder | `boolean` |  false  | Optional. Specifies whether to display the border. | [No Border](#no-border) ||
| cssClass | `string` |  ''  | Optional. The class name can be transferred to the text box. | [VModel](#vmodel) ||

### d-search event

|    Event    |   Type  | Description            | Jump to Demo |
| :---------: | :------: | :--------------------: | :---------: |
| onSearch |	`string` | Callback function triggered by pressing Enter or clicking the search button to return the value entered in the text box. |	[Basic Usage](#basic-usage) |

<style>
.devui-search-demo h4 {
  font-weight: 700;
  color: #575d6c;
  font-size: 12px;
  margin: 15px 0;
}
</style>
