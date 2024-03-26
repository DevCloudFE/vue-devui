# DataGrid 表格

展示行列数据。

### 排序

:::demo 列数据中的`sortable`参数设置为`true`可启用排序功能，`sortMethod`参数自定义排序方法，排序后触发`sort-change`事件，事件抛出产生排序的列字段以及当前排序方式。

```vue
<template>
  <d-data-grid :data="tableData" :columns="columnData" style="height:220px" @sortChange="onSortChange"></d-data-grid>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const columnData = ref([
      { field: 'firstName', header: 'First Name', width: 250 },
      { field: 'lastName', header: 'Last Name', width: 250 },
      { field: 'gender', header: 'Gender', width: 250 },
      { field: 'date', header: 'Date of birth', width: 250, sortable: true, sortMethod: (a, b) => a.date > b.date },
    ]);
    const tableData = ref([
      {
        firstName: 'Mark',
        lastName: 'Otto',
        date: '1990/01/12',
        gender: 'Male',
      },
      {
        firstName: 'Jacob',
        lastName: 'Thornton',
        gender: 'Female',
        date: '1990/01/13',
      },
      {
        firstName: 'Danni',
        lastName: 'Chen',
        gender: 'Male',
        date: '1990/01/11',
      },
      {
        firstName: 'green',
        lastName: 'gerong',
        gender: 'Male',
        date: '1990/01/14',
      },
    ]);
    const onSortChange = (res) => {
      console.log('列排序字段', res.field);
      console.log('排序方式', res.direction);
    };

    return { tableData, columnData, onSortChange };
  },
});
</script>
```

:::

### 过滤

:::demo 列数据中的`filterable`参数设置为`true`可启用过滤功能，内置过滤器默认为多选，通过`filterMultiple: false`可设置单选过滤器；`filterList`参数设置过滤器列表；`filterChange`参数为过滤条件变更后的回调；`filterMenu`参数可以自定义过滤器，函数可返回由[h 函数](https://cn.vuejs.org/api/render-function.html#h)创建的虚拟 DOM 节点。。

```vue
<template>
  <d-data-grid :data="tableData" :columns="columnData" style="height:220px"></d-data-grid>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const originData = [
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
    ];
    const columnData = ref([
      { field: 'firstName', header: 'First Name', width: 250 },
      {
        field: 'lastName',
        header: 'Last Name',
        width: 250,
        filterable: true,
        filterList: [
          { name: 'Otto', value: 'Otto' },
          { name: 'Thornton', value: 'Thornton' },
          { name: 'Chen', value: 'Chen' },
          { name: 'gerong', value: 'gerong' },
        ],
        filterChange: (selected) => {
          console.log('multiple filter change', selected);
          const filterList = selected.map((item) => item.value);
          tableData.value = originData.filter((item) => filterList.includes(item.lastName));
        },
      },
      {
        field: 'gender',
        header: 'Gender',
        width: 250,
        filterable: true,
        filterMultiple: false,
        filterList: [
          { name: 'Clear', value: 'Clear' },
          { name: 'Female', value: 'Female' },
          { name: 'Male', value: 'Male' },
        ],
        filterChange: (selected) => {
          console.log('single filter change', selected);
          if (selected.value === 'Clear') {
            tableData.value = originData;
            return;
          }
          tableData.value = originData.filter((item) => item.gender === selected.value);
        },
      },
      { field: 'date', header: 'Date of birth', width: 250 },
    ]);
    const tableData = ref([...originData]);

    return { tableData, columnData };
  },
});
</script>
```

:::
