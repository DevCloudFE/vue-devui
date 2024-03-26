# DataGrid 表格

展示行列数据。

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
