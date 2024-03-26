# DataGrid 表格

展示行列数据。

### 自定义行样式

:::demo 通过`row-class`参数自定义行样式，可传入字符串，来自定义每一行的样式；也可传入函数，来自定义某一行或某几行的样式，函数参数为行数据和行索引。

```vue
<template>
  <d-data-grid :data="tableData" :columns="columnData" :row-class="rowClass"></d-data-grid>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const columnData = ref([
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'date', header: 'Date of birth' },
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
    const rowClass = (rowData, rowIndex) => {
      return rowIndex === 1 ? 'custom-row' : '';
    };

    return { tableData, columnData, rowClass };
  },
});
</script>

<style>
.custom-row {
  background-color: var(--devui-list-item-selected-bg, #e9edfa);
}
</style>
```

:::

### 自定义单元格样式

:::demo 通过`cell-class`参数自定义行样式，可传入字符串，来自定义每一行的样式；也可传入函数，来自定义某一行或某几行的样式，函数参数为行数据、行索引、列数据、列索引。

```vue
<template>
  <d-data-grid :data="tableData" :columns="columnData" :cell-class="cellClass"></d-data-grid>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const columnData = ref([
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'date', header: 'Date of birth' },
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
    const cellClass = (rowData, rowIndex, columnData, columnIndex) => {
      return rowData[columnData.field] === 'Male' ? 'custom-cell' : '';
    };

    return { tableData, columnData, cellClass };
  },
});
</script>

<style>
.custom-cell {
  background-color: var(--devui-list-item-selected-bg, #e9edfa);
}
</style>
```

:::

### 自定义列宽

:::demo 通过`width`参数配置列宽，参数类型为`string | number | undefined`，`number`类型为固定宽度；`string`类型可配置为像素或者百分比，当为百分比时，基于表格所在容器总宽计算该列实际宽度；当为`undefined`即不配置列宽参数时，会与其他不配置列宽的列平分剩余宽度（即容器总宽减去已知列宽）。<br />通过`minWidth`参数配置最小列宽，参数类型同`width`，当该列未配置`width`参数时，若给该列分配的宽度小于`minWidth`，则按照`minWidth`设置列宽，未配置`minWidth`参数时，为保证该列能够显示，会默认设置`80px`宽度。<br />通过`maxWidth`参数配置最大列宽，参数类型同`width`，当该列未配置`width`参数时，若给该列分配的宽度大于`maxWidth`，则按照`maxWidth`设置列宽。

```vue
<template>
  <d-data-grid :data="tableData" :columns="columnData"></d-data-grid>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const columnData = ref([
      { field: 'firstName', header: 'First Name', width: 300 },
      { field: 'lastName', header: 'Last Name', width: '20%' },
      { field: 'gender', header: 'Gender', maxWidth: 150 },
      { field: 'date', header: 'Date of birth', minWidth: '300px' },
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
