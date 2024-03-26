# DataGrid 表格

展示行列数据。

### 动态数据

:::demo loading 由业务自行添加。

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

:::demo `lazy`参数设置为`true`，即可启用懒加载，在`load-more`事件回调中可动态添加数据。

```vue
<template>
  <d-data-grid
    :data="tableData"
    :columns="columnData"
    v-dLoading="showLoading"
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
