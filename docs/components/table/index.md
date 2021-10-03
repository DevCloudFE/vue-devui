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

### 斑马纹表格

:::demo 通过`d-table`组件上的`striped`属性，可设置带斑马纹的表格，更容易区分不同行的数据。

```vue
<template>
  <d-table striped :data="stripedTableData">
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

      return { stripedTableData }
    }
  })
</script>


<style lang="scss">
  @import '@devui/styles-var/devui-var.scss';
  .devui-tbody tr {
    &:nth-child(2n) {
      background-color: $devui-global-bg-normal;
    }
    &:hover {
      background-color: $devui-list-item-hover-bg;
    }
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

| 参数    | 类型      | 默认值  | 说明               |
| ------- | --------- | ------- | ------------------ |
| data    | `Array`   | `[]`     | 显示的数据         |
| striped | `Boolean` | `false` | 是否显示斑马纹间隔 |

### d-column Props

| 参数   | 类型               | 默认值 | 说明                   |
| ------ | ------------------ | ------ | ---------------------- |
| header | `String`           | `-`    | 对应列的标题           |
| field  | `String`           | `-`    | 对应列内容的字段名     |
| width  | `String \| Number` | `-`    | 对应列的宽度，单位`px` |
| min-width | `String \| Number` | `-` | 对应列的最小宽度，单位`px` |
