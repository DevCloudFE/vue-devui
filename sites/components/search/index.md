# Search 搜索框

### 基本用法

:::demo

```vue
<template>
  <div>
    Small
    <d-search size="sm" style="width: 200px"></d-search>
    Middle
    <d-search style="width: 200px"></d-search>
    Large
    <d-search iconPosition="left" size="lg" style="width: 200px"></d-search>
    Disabled
    <d-search disabled style="width: 200px"></d-search>
  </div>
</template>
```
:::

### 搜索图标左置

:::demo

```vue
<template>
  <div>
    <d-search iconPosition="left" style="width: 200px"></d-search>
  </div>
</template>
```
:::

### 无边框

:::demo

```vue
<template>
  <div>
    <d-search iconPosition="left" noBorder style="width: 200px"></d-search>
  </div>
</template>
```
:::

### 双向绑定

<!-- <p>
  <d-search v-model="searchText" style="width: 200px"></d-search>
</p>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const searchText = ref('')
    return {
      searchText,
    }
  },
})
</script> -->
:::demo

```vue

<template>
  <d-search v-model="searchText" style="width: 200px"></d-search>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const searchText = ref('Devui')
    return {
      searchText
    }
  },
})
</script>
```

:::
