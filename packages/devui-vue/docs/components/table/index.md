# Table 表格

展示行列数据。

#### 何时使用

1. 当有大量结构化的数据需要展现时；
2. 当需要对数据进行排序、过滤、自定义操作等复杂行为时。

### 基本用法

:::demo 简单表格，`d-table`组件上的`data`属性传入要展示的数据，`d-column`组件上通过`field`传入对应列内容的字段名，`header`传入对应列的标题。

```vue
<template>
  <d-table :data="baseTableData" :trackBy="(item) => item.firstName">
    <d-column field="firstName" header="First Name"></d-column>
    <d-column field="lastName" header="Last Name"></d-column>
    <d-column field="gender" header="Gender"></d-column>
    <d-column field="date" header="Date of birth"></d-column>
  </d-table>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const baseTableData = ref([
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

    return { baseTableData };
  },
});
</script>
```

:::

### 表格样式

:::demo `table-layout`参数设置表格的布局方式，目前支持`fixed`和`auto`两种类型；`striped`参数设置是否显示斑马纹；`header-bg`参数设置是否显示表头背景色；`size`参数设置表格大小；`border-type`设置表格边框样式。

```vue
<template>
  <div class="table-btn-groups">
    <div class="table-btn">
      自动表格布局：
      <d-switch v-model:checked="tableLayout" />
    </div>
    <div class="table-btn">
      斑马纹：
      <d-switch v-model:checked="striped" />
    </div>
    <div class="table-btn">
      表头背景色：
      <d-switch v-model:checked="headerBg" />
    </div>
    <div class="table-btn">
      表格大小：
      <d-radio-group direction="row" v-model="size">
        <d-radio v-for="item in sizeList" :key="item.label" :value="item.value">
          {{ item.label }}
        </d-radio>
      </d-radio-group>
    </div>
    <div class="table-btn">
      表格边框：
      <d-radio-group direction="row" v-model="borderType">
        <d-radio v-for="item in borderTypeList" :key="item.label" :value="item.value">
          {{ item.label }}
        </d-radio>
      </d-radio-group>
    </div>
    <div class="table-btn">
      表头显隐：
      <d-switch v-model:checked="showHeader" />
    </div>
  </div>
  <d-table
    :table-layout="tableLayout ? 'auto' : 'fixed'"
    :striped="striped"
    :header-bg="headerBg"
    :data="stripedTableData"
    :size="size"
    :border-type="borderType"
    :show-header="showHeader"
    :trackBy="trackBy"
  >
    <d-column field="firstName" header="First Name"></d-column>
    <d-column field="lastName" header="Last Name"></d-column>
    <d-column field="gender" header="Gender"></d-column>
    <d-column field="date" header="Date of birth"></d-column>
  </d-table>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const tableLayout = ref(false);
    const striped = ref(false);
    const headerBg = ref(false);
    const size = ref('sm');
    const borderType = ref('');
    const showHeader = ref(true);
    const sizeList = [
      {
        label: 'Normal',
        value: 'sm',
      },
      {
        label: 'Middle',
        value: 'md',
      },
      {
        label: 'large',
        value: 'lg',
      },
    ];
    const borderTypeList = [
      {
        label: 'Normal',
        value: '',
      },
      {
        label: 'Bordered',
        value: 'bordered',
      },
      {
        label: 'Borderless',
        value: 'borderless',
      },
    ];
    const stripedTableData = ref([
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

    return {
      stripedTableData,
      striped,
      headerBg,
      size,
      sizeList,
      borderType,
      showHeader,
      borderTypeList,
      tableLayout,
      trackBy(item) {
        return `${item.firstName}${item.lastName}`
      }
    };
  },
});
</script>

<style lang="scss">
.table-btn-groups {
  display: flex;
  flex-wrap: wrap;
}
.table-btn {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 1rem;
}
</style>
```

:::

### 表格交互

:::demo 通过添加一个`d-column`并且设置`type`属性为`checkable`即可实现表格的多选功能。`getCheckedRows`方法可以获取已选择的列表。通过`cell-click`事件监听单元格点击，事件回调参数包含行索引、列索引、行数据、列数据。在列上配置`resizeable`属性，可实现该列拖动改变宽度，`min-width`和`max-width`设置可拖动范围，事件`resize-start`、`resizing`、`resize-end`分别在拖动开始时、进行中、结束后触发。

```vue
<template>
  <div>
    <d-button @click="handleClick" class="mr-m mb-m">Get CheckedRows</d-button>
    <d-button @click="insertRow" class="mr-m mb-m">Insert Row</d-button>
    <d-button @click="deleteRow" class="mr-m mb-m">Delete Row</d-button>
    <d-table
      ref="tableRef"
      :data="data"
      row-key="firstName"
      @cell-click="onCellClick"
      @check-change="checkChange"
      @check-all-change="checkAllChange"
      :trackBy="(item) => item.id"
    >
      <d-column type="checkable" width="40" :checkable="checkable" reserve-check></d-column>
      <d-column field="firstName" header="First Name" width="200"></d-column>
      <d-column
        field="lastName"
        header="Last Name"
        width="200"
        resizeable
        min-width="150"
        max-width="250"
        @resize-start="onResizeStart"
        @resizing="onResizing"
        @resize-end="onResizeEnd"
      ></d-column>
      <d-column field="gender" header="Gender"></d-column>
      <d-column field="date" header="Date of birth"></d-column>
    </d-table>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const tableRef = ref();
    const data = ref([
      {
        id: '0',
        firstName: 'po',
        lastName: 'Lang',
        gender: 'Male',
        date: '1990/01/15',
      },
      {
        id: '1',
        firstName: 'john',
        lastName: 'Li',
        gender: 'Female',
        date: '1990/01/16',
      },
      {
        id: '2',
        firstName: 'peng',
        lastName: 'Li',
        gender: 'Male',
        date: '1990/01/17',
      },
      {
        id: '3',
        firstName: 'Dale',
        lastName: 'Yu',
        gender: 'Female',
        date: '1990/01/18',
      },
    ]);
    const handleClick = () => {
      console.log(tableRef.value.store.getCheckedRows());
    };
    const onCellClick = (params) => {
      console.log(params);
    };

    const checkChange = (checked, row) => {
      console.log('checked row:', checked, row);
    };

    const checkAllChange = (checked) => {
      console.log('checked:', checked);
    };

    const checkable = (row, rowIndex) => {
      return row.lastName === 'Li' || false;
    };

    const insertRow = () => {
      data.value.push({
        id: `${data.value.length}`,
        firstName: 'Jeff',
        lastName: 'You',
        gender: 'Male',
        date: '1989/05/19',
      });
    };

    const deleteRow = () => {
      data.value.splice(0, 1);
    };

    const onResizeStart = (e) => {
      console.log('resize start', e);
    };

    const onResizing = (e) => {
      console.log('resizing', e);
    };

    const onResizeEnd = (e) => {
      console.log('resize end', e);
    };

    return {
      tableRef,
      data,
      handleClick,
      onCellClick,
      checkChange,
      checkAllChange,
      checkable,
      insertRow,
      deleteRow,
      onResizeStart,
      onResizing,
      onResizeEnd,
    };
  },
});
</script>
```

:::

### 索引列

:::demo 通过添加一个`d-column`并且设置`type`参数为`index`即可给表格添加索引。索引列的表头默认展示`#`，可通过`header`参数传入指定内容。

```vue
<template>
  <div>
    <d-table :data="data" :trackBy="(item) => item.firstName">
      <d-column type="index" width="40"></d-column>
      <d-column field="firstName" header="First Name"></d-column>
      <d-column field="lastName" header="Last Name"></d-column>
      <d-column field="gender" header="Gender"></d-column>
      <d-column field="date" header="Date of birth"></d-column>
    </d-table>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const data = ref([
      {
        firstName: 'po',
        lastName: 'Lang',
        gender: 'Male',
        date: '1990/01/15',
      },
      {
        firstName: 'john',
        lastName: 'Li',
        gender: 'Female',
        date: '1990/01/16',
      },
      {
        firstName: 'peng',
        lastName: 'Li',
        gender: 'Male',
        date: '1990/01/17',
      },
      {
        firstName: 'Dale',
        lastName: 'Yu',
        gender: 'Female',
        date: '1990/01/18',
      },
    ]);

    return { data };
  },
});
</script>
```

:::

### 自定义列

:::demo 通过`d-column`子组件提供的`default`插槽可以实现自定义列，插槽提供`row`和`rowIndex`两个参数，分别代表行数据和行索引值。

```vue
<template>
  <d-table :data="dataSource" :trackBy="(item) => item.firstName">
    <d-column type="index" width="80">
      <template #default="scope">
        {{ `No.${scope.rowIndex + 1}` }}
      </template>
    </d-column>
    <d-column field="firstName" header="First Name"></d-column>
    <d-column field="lastName" header="Last Name"></d-column>
    <d-column field="gender" header="Gender"></d-column>
    <d-column field="date" header="Date of birth"></d-column>
    <d-column header="Operation" align="right">
      <template #default="scope">
        <d-button @click="handleClick(scope.row)">编辑</d-button>
      </template>
    </d-column>
  </d-table>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const dataSource = ref([
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
    const handleClick = (row) => {
      console.log(row);
    };

    return { dataSource, handleClick };
  },
});
</script>
```

:::

### 自定义表头

:::demo 通过`d-column`子组件提供的`header`插槽可以实现自定义表头。

```vue
<template>
  <d-table :data="dataSource" :trackBy="(item) => item.firstName">
    <d-column field="firstName">
      <template #header>
        <div>
          <span style="margin-right:4px;font-size:var(--devui-font-size,12px)">First Name</span>
          <d-popover content="some tips text" trigger="hover" :position="['top']">
            <d-icon name="info-o"></d-icon>
          </d-popover>
        </div>
      </template>
    </d-column>
    <d-column field="lastName" header="Last Name"></d-column>
    <d-column field="gender" header="Gender"></d-column>
    <d-column field="date" header="Date of birth"></d-column>
  </d-table>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const dataSource = ref([
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

    return { dataSource };
  },
});
</script>
```

:::

### 空数据模板

:::demo 当传入的数据为空时，默认展示空数据模板。

```vue
<template>
  <div>
    <d-button @click="handleClick">更新数据</d-button>
    <d-table :data="emptyData" :show-loading="showLoading" :trackBy="(item) => item.firstName">
      <d-column field="firstName" header="First Name"></d-column>
      <d-column field="lastName" header="Last Name"></d-column>
      <d-column field="gender" header="Gender"></d-column>
      <d-column field="date" header="Date of birth"></d-column>
      <template #empty>
        <div style="text-align: center;">No Data</div>
      </template>
    </d-table>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const emptyData = ref([]);
    const showLoading = ref(false);
    const handleClick = () => {
      showLoading.value = true;
      setTimeout(() => {
        showLoading.value = false;
        emptyData.value = [
          {
            firstName: 'po',
            lastName: 'Lang',
            gender: 'Male',
            date: '1990/01/15',
          },
          {
            firstName: 'john',
            lastName: 'Li',
            gender: 'Female',
            date: '1990/01/16',
          },
          {
            firstName: 'peng',
            lastName: 'Li',
            gender: 'Male',
            date: '1990/01/17',
          },
          {
            firstName: 'Dale',
            lastName: 'Yu',
            gender: 'Female',
            date: '1990/01/18',
          },
        ];
      }, 1000);
    };

    return { emptyData, showLoading, handleClick };
  },
});
</script>
```

:::

### 固定表头

:::demo `fix-header`参数可以设置是否固定表头，使之不随内容滚动。

```vue
<template>
  <d-table :data="dataSource" table-height="200px" fix-header :trackBy="(item) => item.firstName">
    <d-column field="firstName" header="First Name"></d-column>
    <d-column field="lastName" header="Last Name"></d-column>
    <d-column field="gender" header="Gender"></d-column>
    <d-column field="date" header="Date of birth"></d-column>
  </d-table>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const dataSource = ref([
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
        firstName: 'po',
        lastName: 'lang',
        gender: 'Male',
        date: '1990/01/14',
      },
      {
        firstName: 'john',
        lastName: 'li',
        gender: 'Male',
        date: '1990/01/14',
      },
      {
        firstName: 'peng',
        lastName: 'li',
        gender: 'Female',
        date: '1990/01/14',
      },
      {
        firstName: 'Danni',
        lastName: 'Yu',
        gender: 'Female',
        date: '1990/01/14',
      },
    ]);

    return { dataSource };
  },
});
</script>
```

:::

### 固定列

:::demo 当表格列过多时，固定列有利于用户在左右滑动时，能够便捷的进行数据定位与对比，通过`fixed-left`和`fixed-right`来配置。

```vue
<template>
  <d-table :data="tableDataFixedColumn" table-layout="auto" :trackBy="(item) => item.firstName">
    <d-column field="idNo" header="ID Card Number" fixed-left="0px"></d-column>
    <d-column field="firstName" header="First Name"></d-column>
    <d-column field="lastName" header="Last Name"></d-column>
    <d-column field="gender" header="Gender"></d-column>
    <d-column field="date" header="Date of birth"></d-column>
    <d-column field="address" header="Address"></d-column>
    <d-column field="occupation" header="Occupation"></d-column>
    <d-column field="occupation" header="Occupation"></d-column>
    <d-column field="occupation" header="Occupation"></d-column>
    <d-column field="occupation" header="Occupation" fixed-right="0px"></d-column>
  </d-table>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  setup() {
    const tableDataFixedColumn = ref([
      {
        firstName: 'po',
        lastName: 'Lang',
        gender: 'Male',
        date: '1990/01/15',
        address: 'Shenzhen Guangdong',
        occupation: 'Worker',
        idNo: '2000**********9999',
      },
      {
        firstName: 'john',
        lastName: 'Li',
        gender: 'Female',
        date: '1990/01/16',
        address: 'Shenzhen Guangdong',
        occupation: 'Worker',
        idNo: '2000**********9999',
      },
      {
        firstName: 'peng',
        lastName: 'Li',
        gender: 'Male',
        date: '1990/01/17',
        address: 'Shenzhen Guangdong',
        occupation: 'Worker',
        idNo: '2000**********9999',
      },
      {
        firstName: 'Dale',
        lastName: 'Yu',
        gender: 'Female',
        date: '1990/01/18',
        address: 'Shenzhen Guangdong',
        occupation: 'Worker',
        idNo: '2000**********9999',
      },
    ]);

    const filterList = computed(() =>
      tableDataFixedColumn.value.map((item) => ({ name: `${item.firstName} ${item.lastName}`, value: item.firstName }))
    );

    return {
      tableDataFixedColumn,
      filterList,
    };
  },
});
</script>
```

:::

### 合并单元格

:::demo 通过`span-method`方法可以自定义合并单元格，方法参数是一个对象，对象包含属性如下：当前行`row`、当前列`column`、当前行索引`rowIndex`、当前列索引`columnIndex`。该方法可以返回包含两个元素的数组，第一个元素是`rowspan`，第二个元素是`colspan`；也可以返回一个对象，属性为`rowspan`和`colspan`。

```vue
<template>
  <d-table :data="dataSource" :span-method="spanMethod" border-type="bordered" :trackBy="(item) => item.firstName">
    <d-column field="firstName" header="First Name"></d-column>
    <d-column field="lastName" header="Last Name"></d-column>
    <d-column field="gender" header="Gender"></d-column>
    <d-column field="date" header="Date of birth"></d-column>
  </d-table>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const dataSource = ref([
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
    const spanMethod = ({ row, column, rowIndex, columnIndex }) => {
      if (rowIndex === 0 && columnIndex === 0) {
        return { rowspan: 1, colspan: 2 };
      }
      if (rowIndex === 2 && columnIndex === 0) {
        return [2, 2];
      }
      if (rowIndex === 2 && columnIndex === 3) {
        return [2, 1];
      }
    };

    return { dataSource, spanMethod };
  },
});
</script>
```

:::

### 表头分组

:::demo `d-column`嵌套`d-column`即可实现表头分组。

```vue
<template>
  <d-table :data="dataSource" :trackBy="(item) => item.firstName">
    <d-column field="name" header="Name">
      <d-column field="firstName" header="First Name"></d-column>
      <d-column field="lastName" header="Last Name"></d-column>
    </d-column>
    <d-column field="gender" header="Gender"></d-column>
    <d-column field="date" header="Date of birth"></d-column>
  </d-table>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const dataSource = ref([
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

    return { dataSource };
  },
});
</script>
```

:::

### 列排序

:::demo `sortable`参数设置为`true`可以支持列排序；`sort-direction`设置初始化时的排序方式；`sort-method`用来定义每一列的排序方法；`sort-change`是排序的回调事件，返回该列的排序信息：`field`排序字段和`direction`排序方向。

```vue
<template>
  <d-table :data="dataSource" @sort-change="handleSortChange" :trackBy="(item) => item.firstName">
    <d-column field="firstName" header="First Name"></d-column>
    <d-column field="lastName" header="Last Name" sortable :sort-method="sortNameMethod"></d-column>
    <d-column field="gender" header="Gender"></d-column>
    <d-column field="date" header="Date of birth" sortable sort-direction="ASC" :sort-method="sortDateMethod"></d-column>
  </d-table>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const dataSource = ref([
      {
        firstName: 'Jacob',
        lastName: 'Thornton',
        gender: 'Female',
        date: '1990/01/12',
      },
      {
        firstName: 'Mark',
        lastName: 'Otto',
        date: '1990/01/11',
        gender: 'Male',
      },
      {
        firstName: 'Danni',
        lastName: 'Chen',
        gender: 'Female',
        date: '1990/01/13',
      },
      {
        firstName: 'Green',
        lastName: 'Gerong',
        gender: 'Male',
        date: '1990/01/14',
      },
    ]);
    const handleSortChange = ({ field, direction }) => {
      console.log('field', field);
      console.log('direction', direction);
    };
    const sortDateMethod = (a, b) => {
      return a.date > b.date;
    };
    const sortNameMethod = (a, b) => {
      return a.lastName > b.lastName;
    };

    return { dataSource, handleSortChange, sortDateMethod, sortNameMethod };
  },
});
</script>
```

:::

### 列筛选

:::demo `filterable`参数设置为`true`可以支持列筛选；`filter-multiple`设置筛选列表是否可多选，默认为`true`；`filter-list`用来定义筛选列表；`filter-change`是筛选的回调事件，返回该列选中的数据：单选时返回选中项，多选时返回选中项数组。

```vue
<template>
  <d-table :data="dataSource" :trackBy="(item) => item.firstName">
    <d-column field="firstName" header="First Name"></d-column>
    <d-column field="lastName" header="Last Name" filterable :filter-list="filterList" @filter-change="handleFilterChange"></d-column>
    <d-column
      field="gender"
      header="Gender"
      filterable
      :filter-multiple="false"
      :filter-list="singleFilterList"
      @filter-change="handleSingleChange"
    ></d-column>
    <d-column field="date" header="Date of birth"></d-column>
  </d-table>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const originSource = ref([
      {
        firstName: 'Jacob',
        lastName: 'Thornton',
        gender: 'Female',
        date: '1990/01/12',
      },
      {
        firstName: 'Mark',
        lastName: 'Otto',
        date: '1990/01/11',
        gender: 'Male',
      },
      {
        firstName: 'Danni',
        lastName: 'Chen',
        gender: 'Female',
        date: '1990/01/13',
      },
      {
        firstName: 'Green',
        lastName: 'Gerong',
        gender: 'Male',
        date: '1990/01/14',
      },
    ]);
    const dataSource = ref([...originSource.value]);
    const filterList = dataSource.value.map((item) => {
      return { name: item.lastName, value: item.lastName };
    });
    const singleFilterList = [
      {
        name: 'Clear',
        value: 'Clear',
      },
      {
        name: 'Female',
        value: 'Female',
      },
      {
        name: 'Male',
        value: 'Male',
      },
    ];
    const handleFilterChange = (val) => {
      const filterList = val.map((item) => item.value);
      dataSource.value = originSource.value.filter((item) => filterList.includes(item.lastName));
    };
    const handleSingleChange = (val) => {
      if (val.value === 'Clear') {
        dataSource.value = originSource.value;
        return;
      }
      dataSource.value = originSource.value.filter((item) => item.gender === val.value);
    };

    return { dataSource, filterList, singleFilterList, handleFilterChange, handleSingleChange };
  },
});
</script>
```

:::

### 展开行

:::demo

```vue
<template>
  <d-table ref="tableRef" :data="dataSource" :trackBy="(item) => item?.firstName" @expand-change="expandChange">
    <d-column type="expand">
      <template #default="rowData">
        <div>First Name: {{rowData.row.firstName}}</div>
        <div>Last Name: {{rowData.row.lastName}}</div>
        <div>Gender: {{rowData.row.gender}}</div>
        <div>Date of birth: {{rowData.row.date}}</div>
      </template>
    </d-column>
    <d-column field="firstName" header="First Name"></d-column>
    <d-column field="lastName" header="Last Name"></d-column>
    <d-column field="gender" header="Gender"></d-column>
    <d-column field="date" header="Date of birth"></d-column>
  </d-table>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const tableRef = ref();

    const dataSource = ref([
      {
        firstName: 'Jacob',
        lastName: 'Thornton',
        gender: 'Female',
        date: '1990/01/12',
      },
      {
        firstName: 'Mark',
        lastName: 'Otto',
        date: '1990/01/11',
        gender: 'Male',
      },
      {
        firstName: 'Danni',
        lastName: 'Chen',
        gender: 'Female',
        date: '1990/01/13',
      },
      {
        firstName: 'Green',
        lastName: 'Gerong',
        gender: 'Male',
        date: '1990/01/14',
      },
    ]);

    onMounted(() => {
      tableRef.value.store.expandRow(dataSource.value[0]);
    });

    const expandChange = (currentRow, expandedRows) => {
      console.log('currentRow, expandedRows', currentRow, expandedRows);
    }

    return { dataSource, expandChange, tableRef };
  },
});
</script>
```

:::

### Table 参数

| 参数名                | 类型                      | 默认值    | 说明                                                                       | 跳转 Demo                 |
| :-------------------- | :------------------------ | :-------- | :------------------------------------------------------------------------- | :------------------------ |
| data                  | `array`                   | []        | 可选，显示的数据                                                           | [基本用法](#基本用法)     |
| trackBy | `Function(item): string` | -- | 必选，用于获取该行数据的特定标记 | |
| striped               | `boolean`                 | false     | 可选，是否显示斑马纹间隔                                                   | [表格样式](#表格样式)     |
| size                  | [TableSize](#tablesize)   | 'sm'      | 可选，表格大小，分别对应行高 40px,48px,56px                                | [表格样式](#表格样式)     |
| max-width             | `string`                  | --        | 可选，表格最大宽度                                                         |
| max-height            | `boolean`                 | --        | 可选，表格最大高度                                                         |
| table-width           | `string`                  | --        | 可选，表格宽度                                                             |
| table-height          | `string`                  | --        | 可选，表格高度                                                             |
| row-hovered-highlight | `boolean`                 | true      | 可选，鼠标在该行上时，高亮该行                                             | [表格样式](#表格样式)     |
| fix-header            | `boolean`                 | false     | 可选，固定头部                                                             | [固定表头](#固定表头)     |
| show-loading          | `boolean`                 | false     | 可选，显示加载动画                                                         | [空数据模板](#空数据模板) |
| header-bg             | `boolean`                 | false     | 可选，头部背景                                                             | [表格样式](#表格样式)     |
| table-layout          | `'fixed' \| 'auto'`       | 'fixed'   | 可选，表格布局，可选值为'auto'                                             | [表格样式](#表格样式)     |
| span-method           | [SpanMethod](#spanmethod) | --        | 可选，合并单元格的计算方法                                                 | [合并单元格](#合并单元格) |
| border-type           | [BorderType](#bordertype) | ''        | 可选，表格边框类型，默认有行边框；`bordered`: 全边框；`borderless`: 无边框 | [表格样式](#表格样式)     |
| empty                 | `string`                  | 'No Data' | 可选，配置未传递表格数据时需要显示的空数据文本                             | [空数据模板](#空数据模板) |
| show-header           | `boolean`                 | true      | 可选，配置是否显示表头                                                     | [表格样式](#表格样式)     |
| row-key               | `string`                  | --        | 可选，行数据的 Key，用来优化 Table 渲染                                    |                           |

### Table 事件

| 事件名           | 回调参数                                                     | 说明                             | 跳转 Demo             |
| :--------------- | :----------------------------------------------------------- | :------------------------------- | :-------------------- |
| sort-change      | `Function(obj: { field: string; direction: SortDirection })` | 排序回调事件，返回该列排序信息   | [列排序](#列排序)     |
| cell-click       | `Function(obj: CellClickArg)`                                | 单元格点击事件，返回单元格信息   | [表格交互](#表格交互) |
| check-change     | `Function(checked: boolean, row)`                            | 勾选表格行回调事件，返回该行信息 | [表格交互](#表格交互) |
| check-all-change | `Function(checked: boolean)`                                 | 全选表格行回调事件，返回勾选状态 | [表格交互](#表格交互) |

### Table 方法

| 方法名         | 类型       | 说明                 |
| :------------- | :--------- | :------------------- |
| getCheckedRows | `() => []` | 获取当前选中的行数据 |

### Table 插槽

| 插槽名 | 说明                                     | 参数 |
| :----- | :--------------------------------------- | :--- |
| empty  | 配置未传递表格数据时需要显示的空数据模板 |      |

### Column 参数

| 参数名                | 类型                               | 默认值 | 说明                                        | 跳转 Demo             |
| :-------------------- | :--------------------------------- | :----- | :------------------------------------------ | :-------------------- |
| header                | `string`                           | --     | 可选，对应列的标题                          | [基本用法](#基本用法) |
| field                 | `string`                           | --     | 可选，对应列内容的字段名                    | [基本用法](#基本用法) |
| type                  | [ColumnType](#columntype)          | ''     | 可选，列的类型，设置`checkable`会显示多选框 | [表格交互](#表格交互) |
| width                 | `string \| number`                 | --     | 可选，对应列的宽度，单位`px`                |
| min-width             | `string \| number`                 | --     | 可选，拖动调整宽度时的最小宽度，单位`px`    |
| max-width             | `string \| number`                 | --     | 可选，拖动调整宽度时的最大宽度，单位`px`    |
| fixedLeft             | `string`                           | --     | 可选，该列固定到左侧的距离，如：'100px'     | [固定列](#固定列)     |
| fixedRight            | `string`                           | --     | 可选，该列固定到右侧的距离，如：'100px'     | [固定列](#固定列)     |
| formatter             | [Formatter](#formatter)            | --     | 可选，格式化列内容                          |
| sortable              | `boolean`                          | false  | 可选，对行数据按照该列的顺序进行排序        | [列排序](#列排序)     |
| sort-direction        | [SortDirection](#sortdirection)    | ''     | 可选，设置该列的排序状态                    | [列排序](#列排序)     |
| sort-method           | [SortMethod](#sortmethod)          | --     | 可选，用于排序的比较函数                    | [列排序](#列排序)     |
| filterable            | `boolean`                          | false  | 可选，是否对该列启用筛选功能                | [列筛选](#列筛选)     |
| filter-multiple       | `boolean`                          | true   | 可选，是否启用多选的方式来筛选              | [列筛选](#列筛选)     |
| filter-list           | [FilterConfig[]](#filterconfig)    | []     | 可选，筛选列表                              | [列筛选](#列筛选)     |
| align                 | [ColumnAlign](#columnalign)        | 'left' | 可选，配置水平对齐方式                      | [自定义列](#自定义列) |
| checkable             | `Function(row, rowIndex): boolean` | --     | 可选，配置行勾选状态                        | [表格交互](#表格交互) |
| show-overflow-tooltip | `boolean`                          | false  | 可选，内容过长被隐藏时是否显示 tooltip      |                       |
| resizeable            | `boolean`                          | false  | 可选，该列宽度是否可调整                    |                       |
| reserve-check         | `boolean`                          | false  | 可选，是否保留勾选状态                      | [表格交互](#表格交互) |

### Column 事件

| 事件名        | 回调参数                                              | 说明                                       | 跳转 Demo             |
| :------------ | :---------------------------------------------------- | :----------------------------------------- | :-------------------- |
| filter-change | `Function(val: FilterConfig \| FilterConfig[])`       | 筛选回调事件，返回选中的筛选项或筛选项数组 | [列筛选](#列筛选)     |
| resize-start  | `Function()`                                          | 该列宽度调整开始时的事件                   | [表格交互](#表格交互) |
| resizing      | `Function(val: {width: number})`                      | 该列宽度调整进行中的事件                   | [表格交互](#表格交互) |
| resize-end    | `Function(val: {width: number; beforeWidth: number})` | 该列宽度调整结束时的事件                   | [表格交互](#表格交互) |

### Column 插槽

| 插槽名  | 说明                     | 参数                |
| :------ | :----------------------- | :------------------ |
| default | 默认插槽，自定义列内容   | `{ row, rowIndex }` |
| header  | 表头插槽，自定义表头内容 |                     |

### Table 类型定义

<br>

#### TableSize

```typescript
type TableSize = 'sm' | 'md' | 'lg';
```

#### SpanMethod

```typescript
type SpanMethod = (data: {
  row: any;
  column: any;
  rowIndex: number;
  columnIndex: number;
}) => number[] | { rowspan: number; colspan: number };
```

#### BorderType

```typescript
type BorderType = '' | 'bordered' | 'borderless';
```

#### CellClickArg

```ts
interface CellClickArg {
  columnIndex: number;
  rowIndex: number;
  column: Column;
  row: DefaultRow;
}
```

### Column 类型定义

<br>

#### ColumnType

```ts
type ColumnType = 'checkable' | 'index' | '';
```

#### Formatter

```ts
type Formatter = (row: any, column: any, cellValue: any, rowIndex: number) => VNode;
```

#### SortDirection

```ts
type SortDirection = 'ASC' | 'DESC' | '';
```

#### SortMethod

```ts
type SortMethod<T = any> = (a: T, b: T) => boolean;
```

#### FilterConfig

```ts
interface FilterConfig {
  name: string;
  value: any;
  checked?: boolean;
}
```

#### ColumnAlign

```ts
type ColumnAlign = 'left' | 'center' | 'right';
```
