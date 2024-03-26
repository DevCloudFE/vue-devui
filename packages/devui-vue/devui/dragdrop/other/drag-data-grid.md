# DataGrid 表格

展示行列数据。

### 列宽拖拽

:::demo 列数据配置`resizable`为`true`，使该列可拖拽，拖拽后，会通过最后一列做宽度补偿。**虚拟滚动暂时不支持列宽拖拽**。

```vue
<template>
  <d-data-grid :data="tableData" :columns="columnData"></d-data-grid>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const columnData = ref([
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'gender', header: 'Gender', minWidth: 200, maxWidth: 400, resizable: true },
      { field: 'date', header: 'Date of birth', minWidth: 150 },
    ]);
    const tableData = ref([
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
      },
    ]);

    return { tableData, columnData };
  },
});
</script>
```

:::
