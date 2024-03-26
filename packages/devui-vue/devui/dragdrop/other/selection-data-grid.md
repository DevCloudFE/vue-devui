# DataGrid 表格

展示行列数据。

### 可选择

:::demo 列数据中`type`参数设置为`checkable`可启用勾选功能；行数据中`checked`参数可设置默认勾选状态，`disableCheck`参数可设置禁用勾选；行勾选状态变更时触发`check-change`事件，事件参数为当前行的勾选状态和行数据；表头勾选状态变更时触发`check-all-change`事件，事件参数为当前勾选状态。

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

:::demo 在搭配树形表格使用时，通过`checkable-relation`参数可以控制父子联动方式，默认为`both`，即勾选状态改变会同时影响父和子；其他可选参数为`downward`、`upward`、`none`，具体表现参考 demo 。

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

:::demo `toggleRowChecked`方法切换行的勾选状态，第一个参数为行数据，第二个参数可选，可设置勾选状态；`toggleAllRowChecked`方法切换全选状态，参数可选，可设置勾选状态；`getCheckedRows`方法获取当前已勾选数据。

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
