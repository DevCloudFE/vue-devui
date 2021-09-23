# Table 表格

### 基本用法

:::demo

```vue
<template>
  <d-table :data="data"></d-table>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const data = ref([
      {
        id: 1,
        firstName: 'Mark',
        lastName: 'Otto',
        gender: 'Male',
        description: 'handsome man'
      },
      {
        id: 2,
        firstName: 'Jacob',
        lastName: 'Thornton',
        gender: 'Female',
        description: 'interesting man'
      },
      {
        id: 3,
        firstName: 'Danni',
        lastName: 'Chen',
        gender: 'Female',
        description: 'pretty man',
      },
    ])

    return {
      data
    }
  },
})
</script>
```

:::

### API

|    参数     |   类型   |   默认    | 说明                     | 跳转 Demo                         |
| :---------: | :------: | :-------: | :----------------------- | --------------------------------- |
|    data     | `TableProps` |    '[]'     | 必选，数据源  |              |
