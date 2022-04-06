# Table 表格

展示行列数据。

#### 何时使用

1. 当有大量结构化的数据需要展现时；
2. 当需要对数据进行排序、过滤、自定义操作等复杂行为时。

### 基本用法

:::demo 简单表格，`d-table`组件上的`data`属性传入要展示的数据，`d-column`组件上通过`field`传入对应列内容的字段名，`header`传入对应列的标题。

```vue
<template>
  <d-table :data="baseTableData">
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
  </div>
  <d-table
    :table-layout="tableLayout ? 'auto' : 'fixed'"
    :striped="striped"
    :header-bg="headerBg"
    :data="stripedTableData"
    :size="size"
    :border-type="borderType"
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
      borderTypeList,
      tableLayout,
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

### 表格多选

:::demo 通过添加一个`d-column`并且设置`type`属性为`checkable`即可实现表格的多选功能。`getCheckedRows`方法可以获取已选择的列表。

```vue
<template>
  <div>
    <d-button @click="handleClick">Get CheckedRows</d-button>
    <d-table ref="tableRef" :data="data">
      <d-column type="checkable"></d-column>
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
    const tableRef = ref();
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
    const handleClick = () => {
      console.log(tableRef.value.getCheckedRows());
    };

    return { tableRef, data, handleClick };
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
    <d-table :data="data">
      <d-column type="index"></d-column>
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
  <d-table :data="dataSource">
    <d-column type="index">
      <template #default="scope">
        {{ `No.${scope.rowIndex + 1}` }}
      </template>
    </d-column>
    <d-column field="firstName" header="First Name"></d-column>
    <d-column field="lastName" header="Last Name"></d-column>
    <d-column field="gender" header="Gender"></d-column>
    <d-column field="date" header="Date of birth"></d-column>
    <d-column header="Operation">
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
  <d-table :data="dataSource">
    <d-column field="firstName">
      <template #header>
        <div>
          <span style="margin-right:4px;">First Name</span>
          <d-popover content="some tips text" trigger="hover" :position="['top']">
            <template #reference>
              <d-icon name="info-o"></d-icon>
            </template>
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
    <d-table :data="emptyData" :show-loading="showLoading">
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
  <d-table :data="dataSource" table-height="200px" fix-header>
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
  <div>
    <d-button @click="handleClick">更新数据</d-button>
    <d-table :data="emptyData" table-layout="auto">
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
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  setup() {
    const emptyData = ref([]);
    const handleClick = () => {
      emptyData.value = [
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
      ];
    };
    const filterList = computed(() =>
      emptyData.value.map((item) => ({ name: `${item.firstName} ${item.lastName}`, value: item.firstName }))
    );

    return {
      emptyData,
      handleClick,
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
  <d-table :data="dataSource" :span-method="spanMethod" border-type="bordered">
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
  <d-table :data="dataSource" border-type="bordered" header-bg>
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

### d-table 参数

| 参数名                | 类型                | 默认值  | 说明                                                                       | 跳转 Demo                 |
| :-------------------- | :------------------ | :------ | :------------------------------------------------------------------------- | :------------------------ |
| data                  | `array`             | []      | 可选，显示的数据                                                           | [基本用法](#基本用法)     |
| striped               | `boolean`           | false   | 可选，是否显示斑马纹间隔                                                   | [表格样式](#表格样式)     |
| size                  | `TableSize`         | 'sm'    | 可选，表格大小，分别对应行高 40px,48px,56px                                | [表格样式](#表格样式)     |
| max-width             | `string`            | --      | 可选，表格最大宽度                                                         |
| max-height            | `boolean`           | --      | 可选，表格最大高度                                                         |
| table-width           | `string`            | --      | 可选，表格宽度                                                             |
| table-height          | `string`            | --      | 可选，表格高度                                                             |
| row-hovered-highlight | `boolean`           | true    | 可选，鼠标在该行上时，高亮该行                                             | [表格样式](#表格样式)     |
| fix-header            | `boolean`           | false   | 可选，固定头部                                                             | [固定表头](#固定表头)     |
| show-loading          | `boolean`           | false   | 可选，显示加载动画                                                         | [空数据模板](#空数据模板) |
| header-bg             | `boolean`           | false   | 可选，头部背景                                                             | [表格样式](#表格样式)     |
| table-layout          | `'fixed' \| 'auto'` | 'fixed' | 可选，表格布局，可选值为'auto'                                             | [表格样式](#表格样式)     |
| span-method           | `SpanMethod`        | --      | 可选，合并单元格的计算方法                                                 | [合并单元格](#合并单元格) |
| border-type           | `BorderType`        | ''      | 可选，表格边框类型，默认有行边框；`bordered`: 全边框；`borderless`: 无边框 | [表格样式](#表格样式)     |

### d-table 方法

| 方法名         | 类型       | 说明                 |
| :------------- | :--------- | :------------------- |
| getCheckedRows | `() => []` | 获取当前选中的行数据 |

### d-column 参数

| 参数名     | 类型               | 默认值                               | 说明                                        | 跳转 Demo             |
| :--------- | :----------------- | :----------------------------------- | :------------------------------------------ | :-------------------- |
| header     | `string`           | --                                   | 可选，对应列的标题                          | [基本用法](#基本用法) |
| field      | `string`           | --                                   | 可选，对应列内容的字段名                    | [基本用法](#基本用法) |
| type       | `ColumnType`       | ''                                   | 可选，列的类型，设置`checkable`会显示多选框 | [表格多选](#表格多选) |
| width      | `string \| number` | --                                   | 可选，对应列的宽度，单位`px`                |
| min-width  | `string \| number` | --                                   | 可选，对应列的最小宽度，单位`px`            |
| sortable   | `boolean`          | false                                | 可选，对行数据按照该列的顺序进行排序        |
| fixedLeft  | `string`           | --                                   | 可选，该列固定到左侧的距离，如：'100px'     | [固定列](#固定列)     |
| fixedRight | `string`           | --                                   | 可选，该列固定到右侧的距离，如：'100px'     | [固定列](#固定列)     |
| formatter  | `Formatter`        | --                                   | 可选，格式化列内容                          |
| compareFn  | `CompareFn`        | (field, a, b) => a[field] > b[field] | 可选，用于排序的比较函数                    |

### d-column 插槽

| 插槽名  | 说明                     |
| :------ | :----------------------- |
| default | 默认插槽，自定义列内容   |
| header  | 表头插槽，自定义表头内容 |

### 类型定义

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

#### ColumnType

```ts
type ColumnType = 'checkable' | '';
```

#### Formatter

```ts
type Formatter = (row: any, column: any, cellValue: any, rowIndex: number) => VNode;
```

#### CompareFn

```ts
type CompareFn<T = any> = (field: string, a: T, b: T) => boolean;
```
