# DataGrid 表格

展示行列数据。

## 用法

### 基本用法

`data`参数传入要展示的数据，`columns`参数传入列数据；列数据中的`field`参数为对应列内容的字段名，`header`参数为对应列的标题。

:::demo

```vue
<template>
  <d-data-grid :data="tableData" :columns="columnData" fix-header style="max-height: 300px"></d-data-grid>
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

### 表格样式

`striped`参数设置是否显示斑马纹；`header-bg`参数设置是否显示表头背景色；`border-type`参数设置边框类型；`shadow-type`参数设置阴影类型；`show-header`参数设置是否显示表头；列配置中的`align`参数设置对齐方式。

:::demo

```vue
<template>
  <div class="data-grid-btn-groups">
    <div class="data-grid-btn">
      斑马纹：
      <d-switch v-model="striped" />
    </div>
    <div class="data-grid-btn">
      表头背景色：
      <d-switch v-model="headerBg" />
    </div>
    <div class="data-grid-btn">
      表头显隐：
      <d-switch v-model="showHeader" />
    </div>
    <div class="data-grid-btn">
      表格边框：
      <d-tabs v-model="borderType" type="options" :show-content="false">
        <d-tab v-for="item in borderTypeList" :key="item.label" :id="item.value" :title="item.label"></d-tab>
      </d-tabs>
    </div>
    <div class="data-grid-btn">
      表格阴影：
      <d-tabs v-model="shadowType" type="options" :show-content="false">
        <d-tab v-for="item in shadowTypeList" :key="item.label" :id="item.value" :title="item.label"></d-tab>
      </d-tabs>
    </div>
    <div class="data-grid-btn">
      表格行高：
      <d-tabs v-model="size" type="options" :show-content="false">
        <d-tab v-for="item in sizeList" :key="item.label" :id="item.value" :title="item.label"></d-tab>
      </d-tabs>
    </div>
  </div>
  <d-data-grid
    :data="tableData"
    :columns="columnData"
    :striped="striped"
    :header-bg="headerBg"
    :border-type="borderType"
    :shadow-type="shadowType"
    :show-header="showHeader"
    :size="size"
  ></d-data-grid>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const striped = ref(false);
    const headerBg = ref(false);
    const showHeader = ref(true);
    const borderType = ref('');
    const shadowType = ref('');
    const size = ref('sm');
    const borderTypeList = [
      { label: 'Normal', value: '' },
      { label: 'Bordered', value: 'bordered' },
      { label: 'Borderless', value: 'borderless' },
    ];
    const shadowTypeList = [
      { label: '默认', value: '' },
      { label: '阴影', value: 'shadowed' },
    ];
    const sizeList = [
      { label: 'Mini', value: 'mini' },
      { label: 'Small', value: 'xs' },
      { label: 'Normal', value: 'sm' },
      { label: 'Middle', value: 'md' },
      { label: 'large', value: 'lg' },
    ];
    const columnData = ref([
      { field: 'firstName', header: 'First Name', width: 250 },
      { field: 'lastName', header: 'Last Name', width: 250, align: 'center' },
      { field: 'gender', header: 'Gender', width: 250, align: 'center' },
      { field: 'date', header: 'Date of birth', width: 250, align: 'right' },
    ]);
    const tableData = ref([
      { firstName: 'Mark', lastName: 'Otto', date: '1990/01/11', gender: 'Male' },
      { firstName: 'Jacob', lastName: 'Thornton', gender: 'Female', date: '1990/01/12' },
      { firstName: 'Danni', lastName: 'Chen', gender: 'Male', date: '1990/01/13' },
      { firstName: 'green', lastName: 'gerong', gender: 'Male', date: '1990/01/14' },
    ]);

    return { tableData, columnData, striped, headerBg, borderType, borderTypeList, shadowType, shadowTypeList, size, sizeList, showHeader };
  },
});
</script>

<style>
.data-grid-btn-groups {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 8px;
}
.data-grid-btn {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 16px;
}
</style>
```

:::

### 动态数据

`loading` 由业务自行添加。

:::demo

```vue
<template>
  <d-button @click="loadData">加载数据</d-button>
  <d-data-grid :data="tableData" :columns="columnData" v-loading="showLoading" style="height:220px">
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
      { field: 'firstName', header: 'First Name', width: 250 },
      { field: 'lastName', header: 'Last Name', width: 250 },
      { field: 'gender', header: 'Gender', width: 250 },
      { field: 'date', header: 'Date of birth', width: 250 },
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

### 动态列

:::demo

```vue
<template>
  <d-button @click="addColumn" style="margin-right:8px">增加列</d-button>
  <d-data-grid :data="tableData" :columns="columnData" style="height:220px"></d-data-grid>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const columnData = ref([]);
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

    const addColumn = () => {
      columnData.value.push({ field: 'firstName', header: 'First Name', width: 250 });
    };

    onMounted(() => {
      columnData.value = [
        { field: 'firstName', header: 'First Name', width: 250 },
        { field: 'lastName', header: 'Last Name', width: 250 },
        { field: 'gender', header: 'Gender', width: 250 },
        { field: 'date', header: 'Date of birth', width: 250 },
      ];
    });

    return { tableData, columnData, addColumn };
  },
});
</script>
```

:::

### 懒加载

`lazy`参数设置为`true`，即可启用懒加载，在`load-more`事件回调中可动态添加数据。

:::demo

```vue
<template>
  <d-data-grid
    :data="tableData"
    :columns="columnData"
    v-loading="showLoading"
    lazy
    style="height:300px"
    @load-more="onLoadMore"
  ></d-data-grid>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const showLoading = ref(false);
    const total = 100;
    const columnData = ref([
      { field: 'firstName', header: 'First Name', width: 250 },
      { field: 'lastName', header: 'Last Name', width: 250 },
      { field: 'gender', header: 'Gender', width: 250 },
      { field: 'date', header: 'Date of birth', width: 250 },
    ]);
    const tableData = ref([
      {
        firstName: 'diy0',
        lastName: 'Otto',
        date: '1990/01/11',
        gender: 'Male',
      },
      {
        firstName: 'diy1',
        lastName: 'Otto',
        date: '1990/01/11',
        gender: 'Male',
      },
      {
        firstName: 'diy2',
        lastName: 'Thornton',
        gender: 'Female',
        date: '1990/01/12',
      },
      {
        firstName: 'diy3',
        lastName: 'Chen',
        gender: 'Male',
        date: '1990/01/13',
      },
      {
        firstName: 'diy4',
        lastName: 'gerong',
        gender: 'Male',
        date: '1990/01/14',
      },
      {
        firstName: 'diy5',
        lastName: 'lang',
        gender: 'Male',
        date: '1990/01/14',
      },
      {
        firstName: 'diy6',
        lastName: 'li',
        gender: 'Male',
        date: '1990/01/14',
      },
      {
        firstName: 'diy7',
        lastName: 'li',
        gender: 'Female',
        date: '1990/01/14',
      },
      {
        firstName: 'diy8',
        lastName: 'Yu',
        gender: 'Female',
        date: '1990/01/14',
      },
      {
        firstName: 'diy9',
        lastName: 'Yu',
        gender: 'Female',
        date: '1990/01/14',
      },
    ]);

    const onLoadMore = () => {
      if (tableData.value.length >= total || showLoading.value) {
        return;
      }
      showLoading.value = true;

      setTimeout(() => {
        const size = tableData.value.length;
        showLoading.value = false;
        for (let i = 0; i < 10; i++) {
          tableData.value.push({
            firstName: 'diy' + (i + size),
            lastName: 'more data',
            gender: 'Female',
            date: '2022/07/20',
          });
        }
      }, 300);
    };

    return { showLoading, tableData, columnData, onLoadMore };
  },
});
</script>
```

:::

### 自定义行样式

通过`row-class`参数自定义行样式，可传入字符串，来自定义每一行的样式；也可传入函数，来自定义某一行或某几行的样式，函数参数为行数据和行索引。

:::demo

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
  background-color: var(--devui-list-item-selected-bg, #e9edfa) !important;
}
</style>
```

:::

### 自定义单元格样式

通过`cell-class`参数自定义行样式，可传入字符串，来自定义每一行的样式；也可传入函数，来自定义某一行或某几行的样式，函数参数为行数据、行索引、列数据、列索引。

:::demo

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

通过`width`参数配置列宽，参数类型为`string | number | undefined`，`number`类型为固定宽度；`string`类型可配置为像素或者百分比，当为百分比时，基于表格所在容器总宽计算该列实际宽度；当为`undefined`即不配置列宽参数时，会与其他不配置列宽的列平分剩余宽度（即容器总宽减去已知列宽）。

通过`minWidth`参数配置最小列宽，参数类型同`width`，当该列未配置`width`参数时，若给该列分配的宽度小于`minWidth`，则按照`minWidth`设置列宽，未配置`minWidth`参数时，为保证该列能够显示，会默认设置`80px`宽度。

通过`maxWidth`参数配置最大列宽，参数类型同`width`，当该列未配置`width`参数时，若给该列分配的宽度大于`maxWidth`，则按照`maxWidth`设置列宽。

:::demo

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

### 自定义单元格内容

通过在列数据的`cellRender`参数来自定义单元格内容，函数参数依次为行数据、行索引、列数据、列索引。`cellRender`函数可返回由[h 函数](https://cn.vuejs.org/api/render-function.html#h)创建的虚拟 DOM 节点。

:::demo

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

通过在列数据的`headRender`参数来自定义表头，函数参数为当前列数据。`headRender`函数可返回由[h 函数](https://cn.vuejs.org/api/render-function.html#h)创建的虚拟 DOM 节点。

:::demo

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

`showOverflowTooltip`参数可设置内容超出后，鼠标悬浮是否显示提示内容，可设置为`true`值来开启此功能，也可通过`TooltipConfig`类型的参数来对提示内容做一些配置。

`showHeadOverflowTooltip`用来设置表头，作用及参数值与`showOverflowTooltip`一致。

:::demo

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

通过`empty`插槽可自定义数据为空时显示的内容。

:::demo

```vue
<template>
  <d-button @click="loadData">加载数据</d-button>
  <d-data-grid :data="tableData" :columns="columnData" v-loading="showLoading" style="height:220px">
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

### 固定表头

`fix-header`参数设置为`true`即可固定表头。

:::demo

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

通过列数据的`fixed`参数可将该列固定，参数值为`left`和`right`，可分别固定在左侧和右侧。

:::demo

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

### 排序

列数据中的`sortable`参数设置为`true`可启用排序功能，`sortMethod`参数自定义排序方法，排序后触发`sort-change`事件，事件抛出产生排序的列字段以及当前排序方式。

:::demo

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

列数据中的`filterable`参数设置为`true`可启用过滤功能，内置过滤器默认为多选，通过`filterMultiple: false`可设置单选过滤器；`filterList`参数设置过滤器列表；`filterChange`参数为过滤条件变更后的回调；`filterMenu`参数可以自定义过滤器，函数可返回由[h 函数](https://cn.vuejs.org/api/render-function.html#h)创建的虚拟 DOM 节点。

:::demo

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

### 列宽拖拽

列数据配置`resizable`为`true`，使该列可拖拽，拖拽后，会通过最后一列做宽度补偿。**虚拟滚动暂时不支持列宽拖拽**。

:::demo

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

### 可选择

列数据中`type`参数设置为`checkable`可启用勾选功能；行数据中`checked`参数可设置默认勾选状态，`disableCheck`参数可设置禁用勾选；行勾选状态变更时触发`check-change`事件，事件参数为当前行的勾选状态和行数据；表头勾选状态变更时触发`check-all-change`事件，事件参数为当前勾选状态。

:::demo

```vue
<template>
  <d-data-grid
    :data="tableData"
    :columns="columnData"
    style="height:220px"
    @checkChange="onCheckChange"
    @checkAllChange="onCheckAllChange"
  ></d-data-grid>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const columnData = ref([
      { type: 'checkable', width: 200 },
      { field: 'firstName', header: 'First Name', width: 200 },
      { field: 'lastName', header: 'Last Name', width: 200 },
      { field: 'gender', header: 'Gender', width: 200 },
      { field: 'date', header: 'Date of birth', width: 200 },
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
        checked: true,
      },
      {
        firstName: 'Danni',
        lastName: 'Chen',
        gender: 'Male',
        date: '1990/01/13',
        checked: true,
      },
      {
        firstName: 'green',
        lastName: 'gerong',
        gender: 'Male',
        date: '1990/01/14',
        disableCheck: true,
      },
    ]);

    const onCheckChange = (checkStatus, rowData) => {
      console.log('row check change', checkStatus, rowData);
    };

    const onCheckAllChange = (checkStatus) => {
      console.log('check all change', checkStatus);
    };

    return { tableData, columnData, onCheckChange, onCheckAllChange };
  },
});
</script>
```

:::

### 父子联动

在搭配树形表格使用时，通过`checkable-relation`参数可以控制父子联动方式，默认为`both`，即勾选状态改变会同时影响父和子；其他可选参数为`downward`、`upward`、`none`，具体表现参考 demo。

:::demo

```vue
<template>
  <d-radio-group v-model="currentStrategy" direction="row">
    <d-radio v-for="strategy of checkStrategy" :key="strategy" :value="strategy">{{ strategy }}</d-radio>
  </d-radio-group>
  <d-data-grid :data="tableData" :columns="columnData" :checkable-relation="currentStrategy"></d-data-grid>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const currentStrategy = ref('both');
    const checkStrategy = ref(['both', 'downward', 'upward', 'none']);
    const columnData = ref([
      { type: 'checkable', width: 50 },
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'date', header: 'Date of birth' },
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
        firstName: 'Jacob',
        lastName: 'Thornton',
        gender: 'Female',
        date: '1990/01/12',
        children: [
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

    return { currentStrategy, checkStrategy, tableData, columnData };
  },
});
</script>
```

:::

### 操作方法

`toggleRowChecked`方法切换行的勾选状态，第一个参数为行数据，第二个参数可选，可设置勾选状态；`toggleAllRowChecked`方法切换全选状态，参数可选，可设置勾选状态；`getCheckedRows`方法获取当前已勾选数据。

:::demo

```vue
<template>
  <d-button @click="toggleRowChecked" style="margin-right:8px">改变第2条数据选中状态</d-button>
  <d-button @click="toggleAllChecked" style="margin-right:8px">改变全选状态</d-button>
  <d-button @click="getCheckedRows">获取当前已选择数据</d-button>
  <d-data-grid
    ref="dataGridRef"
    :data="tableData"
    :columns="columnData"
    row-key="firstName"
    style="height:220px"
    @checkChange="onCheckChange"
    @checkAllChange="onCheckAllChange"
  ></d-data-grid>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const dataGridRef = ref();
    const columnData = ref([
      { type: 'checkable', width: 200 },
      { field: 'firstName', header: 'First Name', width: 200 },
      { field: 'lastName', header: 'Last Name', width: 200 },
      { field: 'gender', header: 'Gender', width: 200 },
      { field: 'date', header: 'Date of birth', width: 200 },
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

    const toggleRowChecked = () => {
      dataGridRef.value.toggleRowChecked(tableData.value[1]);
    };

    const toggleAllChecked = () => {
      dataGridRef.value.toggleAllRowChecked();
    };

    const getCheckedRows = () => {
      console.log('已选择数据', dataGridRef.value.getCheckedRows());
    };

    const onCheckChange = (checkStatus, rowData) => {
      console.log('row check change', checkStatus, rowData);
    };

    const onCheckAllChange = (checkStatus) => {
      console.log('check all change', checkStatus);
    };

    return { dataGridRef, tableData, columnData, toggleRowChecked, toggleAllChecked, getCheckedRows, onCheckChange, onCheckAllChange };
  },
});
</script>
```

:::

### 大数据

:::demo

```vue
<template>
  <d-data-grid :data="tableData" :columns="columnData" virtual-scroll style="height:500px"></d-data-grid>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const rowCount = 20000;
    const columnCount = 400;
    const columnFieldArr = ['firstName', 'lastName', 'gender', 'date'];
    const columnData = ref([]);
    const tableData = ref([]);

    onMounted(() => {
      for (let i = 0; i < columnCount; i++) {
        const item = {
          field: columnFieldArr[i % 4],
          header: columnFieldArr[i % 4] + i,
          width: 150,
        };
        columnData.value.push(item);
      }

      for (let i = 0; i < rowCount; i++) {
        const rowItem = {
          firstName: 'Mark' + i,
          lastName: 'Otto' + i,
          date: '1990/01/11',
          gender: 'Male',
        };
        tableData.value.push(rowItem);
      }
    });

    return { tableData, columnData };
  },
});
</script>
```

:::

### DataGrid 参数

| 参数名                | 类型                                    | 默认值 | 说明                                                                  |
| :-------------------- | :-------------------------------------- | :----- | :-------------------------------------------------------------------- |
| data                  | [RowData[]](#rowdata)                   | []     | 表格数据                                                              |
| columns               | [ColumnConfig[]](#columnconfig)         | []     | 列配置数据                                                            |
| indent                | `number`                                | 16     | 树形表格缩进量，单位`px`                                              |
| striped               | `boolean`                               | false  | 是否显示斑马纹                                                        |
| fix-header            | `boolean`                               | false  | 是否固定表头                                                          |
| row-hovered-highlight | `boolean`                               | true   | 鼠标悬浮是否高亮行                                                    |
| header-bg             | `boolean`                               | false  | 是否显示表头背景色                                                    |
| show-header           | `boolean`                               | true   | 是否显示表头                                                          |
| lazy                  | `boolean`                               | false  | 是否懒加载                                                            |
| virtual-scroll        | `boolean`                               | false  | 是否启用虚拟滚动                                                      |
| reserve-check         | `boolean`                               | false  | 是否保留勾选状态                                                      |
| resizable             | `boolean`                               | --     | 可选，是否所有列支持拖拽调整列宽，列的 resizable 参数优先级高于此参数 |
| row-class             | [RowClass](#rowclass)                   | ''     | 自定义行样式，可设置为函数，不同行设置不同样式                        |
| row-key               | [RowKey](#rowkey)                       | --     | 勾选行、树表格等场景为必填，需要根据此字段定义的唯一 key 查找数据     |
| cell-class            | [CellClass](#cellclass)                 | ''     | 自定义单元格样式，可设置为函数，不同单元格设置不同样式                |
| border-type           | [BorderType](#bordertype)               | ''     | 边框类型                                                              |
| shadow-type           | [ShadowType](#shadowtype)               | ''     | 阴影类型                                                              |
| size                  | [Size](#size)                           | 'sm'   | 表格大小，反应在行高的不同上                                          |
| checkable-relation    | [CheckableRelation](#checkablerelation) | 'both' | 行勾选和树形表格组合使用时，用来定义父子联动关系                      |

### DataGrid 事件

| 事件名           | 回调参数                                                                     | 说明                                                           |
| :--------------- | :--------------------------------------------------------------------------- | :------------------------------------------------------------- |
| row-click        | `Function(e: RowClickArg)`                                                   | 行点击时触发的事件                                             |
| cell-click       | `Function(e: CellClickArg)`                                                  | 单元格点击时触发的事件                                         |
| check-change     | `Function(status: boolean, rowData: RowData)`                                | 行勾选状态变化时触发的事件，参数为当前勾选状态和行数据         |
| check-all-change | `Function(status: boolean)`                                                  | 表头勾选状态变化时触发的事件，参数为当前勾选状态               |
| expand-change    | `Function(status: boolean, rowData: RowData)`                                | 树表格，行展开状态变化时触发的事件，参数为当前展开状态和行数据 |
| sort-change      | `Function(e: SortChangeArg)`                                                 | 排序变化时触发的事件                                           |
| load-more        | `Function()`                                                                 | 懒加载触发的事件                                               |
| expand-load-more | `Function(node: RowData, callback: (result: IExpandLoadMoreResult) => void)` | 树表格展开时触发的懒加载事件                                   |

### DataGrid 方法

| 方法名                | 类型                                                             | 说明                                                 |
| :-------------------- | :--------------------------------------------------------------- | :--------------------------------------------------- |
| sort                  | `(key: ColumnConfig['field'], direction: SortDirection) => void` | 对某列按指定方式进行排序                             |
| toggleRowChecked      | `(node:  RowData, status?: boolean) => void`                     | 切换指定行勾选状态，可通过`status`参数指定勾选状态   |
| toggleAllRowChecked   | `(status?: boolean) => void`                                     | 切换表头勾选状态，可通过`status`参数指定勾选状态     |
| getCheckedRows        | `() => RowData[]`                                                | 获取已勾选的行数据                                   |
| toggleRowExpansion    | `(node: RowData, status?: boolean) => void`                      | 切换指定行的展开状态，可通过`status`参数指定展开状态 |
| toggleAllRowExpansion | `(status?: boolean) => void`                                     | 切换所有行的展开状态，可通过`status`参数指定展开状态 |
| refreshRowsData       | `() => void`                                                     | 根据当前传入的`data`，重新计算需要显示的行数据       |

### 类型定义

#### RowData

```ts
interface RowData {
  checked?: boolean; // 是否勾选
  disableCheck?: boolean; // 是否禁用勾选
  children?: RowData[]; // 当存在此字段时，默认展示树表格
  isLeaf?: boolean; // 是否为叶子节点，当树表格中需要异步加载子节点时，需要将此参数设置为false
  [k: string]: any; // 业务其他数据
}
```

#### ColumnConfig

```ts
interface ColumnConfig {
  header: string; // 列的头部展示内容
  field: string; // 列字段，用于从 RowData 取数据展示在单元格
  width?: number | string; // 列宽度；可设置百分比，会根据容器总宽度计算单元格实际所占宽度，未设置时，会自动分配宽度，分配规则参考【自定义样式-自定义列宽】示例；启用虚拟滚动此字段必填
  minWidth?: number | string; // 最小列宽，可设置百分比，会根据容器总宽度计算实际最小列宽
  maxWidth?: number | string; // 最大列宽，可设置百分比，会根据容器总宽度计算实际最大列宽
  type?: ColumnType; // 列类型，复选框、索引等
  resizable?: boolean; // 是否支持拖拽调整列宽
  sortable?: boolean; // 是否启用排序
  showSortIcon?: boolean; // 是否显示排序未激活图标，默认不显示
  sortMethod?: SortMethod; // 自定义排序方法
  filterable?: boolean; // 是否启用过滤
  showFilterIcon?: boolean; // 是否显示筛选未激活图标，默认不显示
  filterMultiple?: boolean; // 组件内置多选和单选两种过滤器，默认为多选，配置为 false 可使用单选过滤器
  filterList?: FilterListItem[]; // 过滤器列表
  filterChange?: (val: FilterListItem | FilterListItem[]) => void; // 过滤内容变更时触发
  filterMenu?: (scope: { toggleFilterMenu: (status?: boolean) => void; setFilterStatus: (status: boolean) => void }) => VNode; // 自定义过滤器；toggleFilterMenu: 展开收起筛选菜单；setFilterStatus: 设置表头是否高亮
  fixed?: FixedDirection; // 固定列的方向，固定在左侧 or 右侧
  align?: ColumnAlign; // 列内容对齐方式
  showOverflowTooltip?: boolean | TooltipConfig; // 单元格内容超长是否通过 Tooltip 显示全量内容，可对 Tooltip 进行配置，支持的配置项参考 TooltipConfig
  showHeadOverflowTooltip?: boolean | TooltipConfig; // 表头内容超长是否通过 Tooltip 显示全量内容，可对 Tooltip 进行配置，支持的配置项参考 TooltipConfig
  headRender?: (columnConfig: ColumnConfig) => VNode; // 自定义表头
  cellRender?: (rowData: RowData, rowIndex: number, cellData: string, cellIndex: number) => VNode; // 自定义单元格
}
```

#### ColumnType

列类型

```ts
type ColumnType = 'checkable' | 'index' | '';
```

#### FilterListItem

过滤器列表项

```ts
interface FilterListItem {
  name: string; // 显示的内容
  value: any; // 对应的值
}
```

#### FixedDirection

固定列的方向

```ts
type FixedDirection = 'left' | 'right';
```

#### ColumnAlign

列内容对齐方式

```ts
type ColumnAlign = 'left' | 'center' | 'right';
```

#### TooltipConfig

超长显示 Tooltip 的配置项

```ts
interface TooltipConfig {
  content?: string; // 提示内容，默认为单元格内容
  position?: Placement[]; // 展开方向，默认展开顺序为上右下左
  mouseEnterDelay?: number; // 鼠标悬浮后延时多久提示，默认150ms
  enterable?: boolean; // 鼠标是否可移入提示框，默认 true
}
```

#### RowClass

自定义行样式的类名，配置为函数，可不同行设置不同样式

```ts
type RowClass = string | ((row: RowData, rowIndex: number) => string);
```

#### RowKey

勾选行、树表格等场景需要通过方法操作时根据此字段定义的唯一 key 查找数据

```ts
type RowKey = string | ((row: RowData) => string);
```

#### CellClass

自定义单元格样式，可设置为函数，不同单元格设置不同样式

```ts
type CellClass = string | ((row: RowData, rowIndex: number, column: ColumnConfig, columnIndex: number) => string);
```

#### BorderType

```ts
type BorderType = '' | 'bordered' | 'borderless';
```

#### ShadowType

```ts
type ShadowType = '' | 'shadowed';
```

#### Size

```ts
type Size = 'mini' | 'xs' | 'sm' | 'md' | 'lg';
```

#### CheckableRelation

```ts
type CheckableRelation = 'upward' | 'downward' | 'both' | 'none';
```

#### RowClickArg

行点击事件的回调参数

```ts
interface RowClickArg {
  row: RowData; // 行数据
  renderRowIndex: number; // 当前行在已渲染列表中的索引
  flattenRowIndex: number; // 当前行在所有数据中的索引，大数据时和 renderRowIndex 不一致
}
```

#### CellClickArg

单元格点击事件的回调参数

```ts
interface CellClickArg {
  row: RowData; // 行数据
  renderRowIndex: number; // 当前行在已渲染列表中的索引
  flattenRowIndex: number; // 当前行在所有数据中的索引，大数据时和 renderRowIndex 不一致
  column: ColumnConfig; // 列配置数据
  columnIndex: number; // 列在所有数据中的索引
}
```

#### SortDirection

排序方式

```ts
type SortDirection = 'asc' | 'desc' | '';
```

#### SortChangeArg

排序事件回调参数

```ts
interface SortChangeArg {
  field: ColumnConfig['field']; // 列字段
  direction: SortDirection; // 当前排序方式
}
```

#### IExpandLoadMoreResult

```ts
interface IExpandLoadMoreResult {
  node: RowData;
  rowItems: RowData[];
}
```
