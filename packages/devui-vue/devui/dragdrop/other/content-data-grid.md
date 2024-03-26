# DataGrid 表格

展示行列数据。

### 自定义单元格内容

:::demo 通过在列数据的`cellRender`参数来自定义单元格内容，函数参数依次为行数据、行索引、列数据、列索引。`cellRender`函数可返回由[h 函数](https://cn.vuejs.org/api/render-function.html#h)创建的虚拟 DOM 节点。

```vue
<template>
  <d-data-grid :data="tableData" :columns="columnData" style="height:220px"></d-data-grid>
</template>

<script>
import { defineComponent, ref, h } from 'vue';

export default defineComponent({
  setup() {
    const columnData = ref([
      { field: 'firstName', header: 'First Name', width: 200 },
      { field: 'lastName', header: 'Last Name', width: 200 },
      { field: 'gender', header: 'Gender', width: 200 },
      { field: 'date', header: 'Date of birth', width: 200 },
      {
        field: 'operate',
        header: 'Operation',
        width: 200,
        cellRender: (rowData, rowIndex, cellData, cellIndex) =>
          h('i', { class: 'icon icon-delete', onClick: () => onDelete(rowData, rowIndex, cellData, cellIndex) }),
      },
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
    const onDelete = (rowData, rowIndex, cellData, cellIndex) => {
      console.log('row data', rowData);
      console.log('row index', rowIndex);
      console.log('cell data', cellData);
      console.log('cell index', cellIndex);
    };

    return { tableData, columnData };
  },
});
</script>
```

:::

### 自定义表头

:::demo 通过在列数据的`headRender`参数来自定义表头，函数参数为当前列数据。`headRender`函数可返回由[h 函数](https://cn.vuejs.org/api/render-function.html#h)创建的虚拟 DOM 节点。

```vue
<template>
  <d-data-grid :data="tableData" :columns="columnData" style="height:220px"></d-data-grid>
</template>

<script>
import { defineComponent, ref, h } from 'vue';

export default defineComponent({
  setup() {
    const columnData = ref([
      { field: 'firstName', header: 'First Name', width: 250 },
      { field: 'lastName', header: 'Last Name', width: 250 },
      { field: 'gender', header: 'Gender', width: 250 },
      {
        field: 'date',
        header: 'Date of birth',
        width: 250,
        headRender: (rowData, rowIndex, cellData, cellIndex) => h('span', 'Birthday'),
      },
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

### 自定义提示内容

:::demo `showOverflowTooltip`参数可设置内容超出后，鼠标悬浮是否显示提示内容，可设置为`true`值来开启此功能，也可通过`TooltipConfig`类型的参数来对提示内容做一些配置。<br/>`showHeadOverflowTooltip`用来设置表头，作用及参数值与`showOverflowTooltip`一致。

```vue
<template>
  <d-data-grid :data="tableData" :columns="columnData" style="height:220px"></d-data-grid>
</template>

<script>
import { defineComponent, ref, h } from 'vue';

export default defineComponent({
  setup() {
    const columnData = ref([
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'date', header: 'Date of birth' },
      {
        field: 'info',
        header: 'Personal Information',
        width: 100,
        showOverflowTooltip: { position: ['bottom-end'] },
        showHeadOverflowTooltip: true,
      },
    ]);
    const tableData = ref([
      {
        firstName: 'Mark',
        lastName: 'Otto',
        date: '1990/01/11',
        gender: 'Male',
        info: '一段很长的个人介绍一段很长的个人介绍一段很长的个人介绍',
      },
      {
        firstName: 'Jacob',
        lastName: 'Thornton',
        gender: 'Female',
        date: '1990/01/12',
        info: '一段很长的个人介绍一段很长的个人介绍一段很长的个人介绍',
      },
      {
        firstName: 'Danni',
        lastName: 'Chen',
        gender: 'Male',
        date: '1990/01/13',
        info: '一段很长的个人介绍一段很长的个人介绍一段很长的个人介绍',
      },
      {
        firstName: 'green',
        lastName: 'gerong',
        gender: 'Male',
        date: '1990/01/14',
        info: '一段很长的个人介绍一段很长的个人介绍一段很长的个人介绍',
      },
    ]);

    return { tableData, columnData };
  },
});
</script>
```

:::

### 空数据模板

:::demo 通过`empty`插槽可自定义数据为空时显示的内容。

```vue
<template>
  <d-button @click="loadData">加载数据</d-button>
  <d-data-grid :data="tableData" :columns="columnData" v-dLoading="showLoading" style="height:220px">
    <template #empty>
      <div class="empty-content">暂无数据</div>
    </template>
  </d-data-grid>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const showLoading = ref(false);
    const tableData = ref([]);
    const columnData = ref([
      { field: 'firstName', header: 'First Name', width: 300 },
      { field: 'lastName', header: 'Last Name', width: 300 },
      { field: 'gender', header: 'Gender', width: 300 },
      { field: 'date', header: 'Date of birth', width: 300 },
    ]);
    const loadData = () => {
      showLoading.value = true;
      setTimeout(() => {
        showLoading.value = false;
        tableData.value = [
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
      }, 500);
    };

    return { tableData, showLoading, columnData, loadData };
  },
});
</script>

<style>
.empty-content {
  padding: 8px;
  text-align: center;
}
</style>
```

:::
