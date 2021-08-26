# Search 搜索框

### 基本用法

:::demo 使用`sm`，`''`，`lg`来定义`Search`基本类型

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

:::demo 使用`left`，`right`来定义`Search`搜索图标位置， 默认`right`

```vue
<template>
  <div>
    <d-search iconPosition="left" style="width: 200px"></d-search>
  </div>
</template>
```
:::

### 无边框

:::demo 使用`noBorder`来定义`Search`无边框

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
:::demo 使用`v-model`双向绑定

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
