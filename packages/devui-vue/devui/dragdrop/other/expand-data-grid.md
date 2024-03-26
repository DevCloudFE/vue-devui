# DataGrid 表格

展示行列数据。

### 树表格

行数据中包含`children`字段，则默认展示为树表格；若想在展开某一行时异步加载数据，可将展开行的`isLeaf`设置为`false`，当展开该行时会触发`expand-load-more`事件，事件抛出当前展开行的数据和回调函数，加载完成后执行回调函数将数据回填进表格中；`toggleRowExpansion`可切换某一行的展开状态，第一个参数为行数据，第二个参数可选，可设置展开状态。

:::demo

```vue
<template>
  <d-button @click="toggleRowExpansion">改变第1条数据展开状态</d-button>
  <d-data-grid
    ref="dataGridRef"
    :data="tableData"
    :columns="columnData"
    row-key="firstName"
    style="height:300px"
    @expand-load-more="onExpandLoadMore"
  ></d-data-grid>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const dataGridRef = ref();
    const columnData = ref([
      { field: 'firstName', header: 'First Name', width: 250 },
      { field: 'lastName', header: 'Last Name', width: 250 },
      { field: 'gender', header: 'Gender', width: 250 },
      { field: 'date', header: 'Date of birth', width: 250 },
    ]);
    const tableData = ref([
      {
        firstName: 'Mark1',
        lastName: 'Otto',
        date: '1990/01/11',
        gender: 'Male1',
        children: [
          {
            firstName: 'Mark2',
            lastName: 'Otto',
            date: '1990/01/11',
            gender: 'Male',
            children: [
              {
                firstName: 'Mark21',
                lastName: 'Otto',
                date: '1990/01/11',
                gender: 'Male',
              },
              {
                firstName: 'Mark22',
                lastName: 'Otto',
                date: '1990/01/11',
                gender: 'Male',
              },
            ],
          },
          {
            firstName: 'Mark3',
            lastName: 'Otto',
            date: '1990/01/11',
            gender: 'Male',
          },
        ],
      },
      {
        firstName: 'Jacob - dynamic load',
        lastName: 'Thornton',
        gender: 'Female',
        date: '1990/01/12',
        isLeaf: false,
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
      },
    ]);
    const toggleRowExpansion = () => {
      dataGridRef.value.toggleRowExpansion(tableData.value[0]);
    };

    const onExpandLoadMore = (node, callback) => {
      setTimeout(() => {
        callback({
          node,
          rowItems: [
            {
              firstName: 'Jacob2',
              lastName: 'Otto',
              date: '1990/01/11',
              gender: 'Male',
            },
            {
              firstName: 'Jacob3',
              lastName: 'Otto',
              date: '1990/01/11',
              gender: 'Male',
              children: [
                {
                  firstName: 'Jacob31',
                  lastName: 'Otto',
                  date: '1990/01/11',
                  gender: 'Male',
                },
                {
                  firstName: 'Jacob32',
                  lastName: 'Otto',
                  date: '1990/01/11',
                  gender: 'Male',
                },
              ],
            },
          ],
        });
      }, 1000);
    };

    return { dataGridRef, tableData, columnData, toggleRowExpansion, onExpandLoadMore };
  },
});
</script>
```

:::
