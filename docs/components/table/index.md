# Table 表格

展示行列数据。

### 何时使用

1. 当有大量结构化的数据需要展现时；
2. 当需要对数据进行排序、过滤、自定义操作等复杂行为时。

### 基本用法

:::demo 简单表格，`d-table`组件上的`data`属性传入要展示的数据，`d-table-column`组件上通过`field`传入对应列内容的字段名，`header`传入对应列的标题。

```vue
<template>
  <d-table :data="baseTableData">
    <d-column field="firstName" header="First Name"></d-column>
    <d-column field="lastName" header="Last Name"></d-column>
    <d-column field="gender" header="Gender"></d-column>
    <d-column field="date" header="Date of birth"></d-column>
  </d-table>
</template>

<script>
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup() {
      const baseTableData = ref([
        {
          firstName: 'Mark',
          lastName: 'Otto',
          date: '1990/01/11',
          gender: 'Male',
        },
        {
          firstName: 'Jacob',
          lastName: 'Thornton',
          gender: 'Female',
          date: '1990/01/12',
        },
        {
          firstName: 'Danni',
          lastName: 'Chen',
          gender: 'Male',
          date: '1990/01/13',
        },
        {
          firstName: 'green',
          lastName: 'gerong',
          gender: 'Male',
          date: '1990/01/14',
        }
      ])

      return { baseTableData }
    }
  })

</script>
```

:::

### 表格样式

:::demo

```vue
<template>
<div class="table-btn-groups">
      <div class="table-btn">
          自动表格布局：
         <d-switch v-model:checked="tableLayout" />
      </div>
      <div class="table-btn">
          斑马纹：
         <d-switch v-model:checked="striped" />
      </div>
      <div class="table-btn">
          表头背景色：
         <d-switch v-model:checked="headerBg" />
      </div>
  </div>
  <d-table :table-layout="tableLayout?'auto':'fixed'" :striped="striped" :header-bg="headerBg" :data="stripedTableData">
    <d-column field="firstName" header="First Name"></d-column>
    <d-column field="lastName" header="Last Name"></d-column>
    <d-column field="gender" header="Gender"></d-column>
    <d-column field="date" header="Date of birth"></d-column>
  </d-table>
</template>

<script>

  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup() {
      const tableLayout = ref(false)
      const striped = ref(false)
      const headerBg = ref(false)
      const stripedTableData = ref([
        {
          firstName: 'Mark',
          lastName: 'Otto',
          date: '1990/01/11',
          gender: 'Male',
        },
        {
          firstName: 'Jacob',
          lastName: 'Thornton',
          gender: 'Female',
          date: '1990/01/12',
        },
        {
          firstName: 'Danni',
          lastName: 'Chen',
          gender: 'Male',
          date: '1990/01/13',
        },
        {
          firstName: 'green',
          lastName: 'gerong',
          gender: 'Male',
          date: '1990/01/14',
        }
      ])

      return { 
        stripedTableData,
        striped,
        headerBg,
        tableLayout 
      }
    }
  })
</script>

<style lang="scss">
.table-btn-groups{
  display: flex;
  margin-bottom: 1rem;
}
.table-btn{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
```

:::

### 空数据模板

:::demo 当传入的数据为空时，默认展示空数据模板。

```vue
<template>
  <div>
    <d-button type="primary" @click="handleClick">更新数据</d-button>
    <d-table :data="emptyData">
      <d-column field="firstName" header="First Name"></d-column>
      <d-column field="lastName" header="Last Name"></d-column>
      <d-column field="gender" header="Gender"></d-column>
      <d-column field="date" header="Date of birth"></d-column>
    </d-table>
  </div>
</template>

<script>

  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup() {
      const emptyData = ref([])
      const handleClick = () => {
        emptyData.value = [
          {
            firstName: 'po',
            lastName: 'Lang',
            gender: 'Male',
            date: '1990/01/15',
          },
          {
            firstName: 'john',
            lastName: 'Li',
            gender: 'Female',
            date: '1990/01/16',
          },
          {
            firstName: 'peng',
            lastName: 'Li',
            gender: 'Male',
            date: '1990/01/17',
          },
          {
            firstName: 'Dale',
            lastName: 'Yu',
            gender: 'Female',
            date: '1990/01/18',
          }
        ]
      }

      return { emptyData, handleClick }
    }
  })
</script>
```

:::


### d-table Props

| 参数         | 类型                | 默认值    | 说明                     |
| ------------ | ------------------- | --------- | ------------------------ |
| data         | `Array`             | `[]`      | 显示的数据               |
| striped      | `Boolean`           | `false`   | 是否显示斑马纹间隔       |
| header-bg    | `Boolean`           | `false`   | 可选，表头是否显示背景色 |
| table-layout | `'fixed' \| 'auto'` | `'fixed'` | 可选，表格布局           |

### d-column Props

| 参数      | 类型               | 默认值 | 说明                       |
| --------- | ------------------ | ------ | -------------------------- |
| header    | `String`           | `-`    | 对应列的标题               |
| field     | `String`           | `-`    | 对应列内容的字段名         |
| width     | `String \| Number` | `-`    | 对应列的宽度，单位`px`     |
| min-width | `String \| Number` | `-`    | 对应列的最小宽度，单位`px` |