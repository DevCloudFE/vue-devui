# DataGrid 表格

展示行列数据。

### 固定表头

:::demo `fix-header`参数设置为`true`即可固定表头。

```vue
<template>
  <d-data-grid :data="tableData" :columns="columnData" fix-header style="height:220px"></d-data-grid>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const columnData = ref([
      { field: 'firstName', header: 'First Name', width: 250 },
      { field: 'lastName', header: 'Last Name', width: 250 },
      { field: 'gender', header: 'Gender', width: 250 },
      { field: 'date', header: 'Date of birth', width: 250 },
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

### 固定列

:::demo 通过列数据的`fixed`参数可将该列固定，参数值为`left`和`right`，可分别固定在左侧和右侧。

```vue
<template>
  <d-data-grid :data="tableData" :columns="columnData" fix-header style="max-height:220px"></d-data-grid>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const columnData = ref([
      { field: 'firstName', header: 'First Name', width: 150, fixed: 'left' },
      { field: 'lastName', header: 'Last Name', width: 150, fixed: 'left' },
      { field: 'gender', header: 'Gender', width: 200 },
      { field: 'date', header: 'Date of birth', width: 200 },
      { field: 'firstName', header: 'First Name', width: 200 },
      { field: 'lastName', header: 'Last Name', width: 200 },
      { field: 'gender', header: 'Gender', width: 200 },
      { field: 'date', header: 'Date of birth', width: 200, fixed: 'right' },
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
