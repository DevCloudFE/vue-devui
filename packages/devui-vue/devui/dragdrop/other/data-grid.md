# DataGrid 表格

展示行列数据。

### 基本用法

:::demo `data`参数传入要展示的数据，`columns`参数传入列数据；列数据中的`field`参数为对应列内容的字段名，`header`参数为对应列的标题。

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

:::demo `striped`参数设置是否显示斑马纹；`header-bg`参数设置是否显示表头背景色；`border-type`参数设置边框类型；`shadow-type`参数设置阴影类型；`show-header`参数设置是否显示表头；列配置中的`align`参数设置对齐方式。

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
