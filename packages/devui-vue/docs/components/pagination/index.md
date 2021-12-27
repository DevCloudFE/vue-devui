# Pagination 分页

分页器。

### 何时使用

当加载/渲染所有数据将花费很多时间时，可以切换页码浏览数据。


### 基本用法

:::demo

```vue
<template>
  <h5 style="padding: 20px 0 10px;">size = 'sm'</h5>
  <d-pagination
    size="sm"
    :total="pager.total"
    v-model:pageSize="pager.pageSize"
    v-model:pageIndex="pager.pageIndex"
    :canViewTotal="true"
    :canChangePageSize="true"
    :canJumpPage="true"
    :maxItems="5"
  />

  <h5 style="padding: 20px 0 10px;">size = 'md'</h5>
  <d-pagination
    :total="pager.total"
    v-model:pageSize="pager.pageSize"
    v-model:pageIndex="pager.pageIndex"
    :canViewTotal="true"
    :canChangePageSize="true"
    :canJumpPage="true"
    :maxItems="5"
  />

  <h5 style="padding: 20px 0 10px;">size = 'lg'</h5>
  <d-pagination
    size="lg"
    :total="pager.total"
    v-model:pageSize="pager.pageSize"
    v-model:pageIndex="pager.pageIndex"
    :canViewTotal="true"
    :canChangePageSize="true"
    :canJumpPage="true"
    :maxItems="5"
  />

  <h5 style="padding: 20px 0 10px;">Custom Style</h5>
  <d-pagination
    :total="pager.total"
    v-model:pageSize="pager.pageSize"
    v-model:pageIndex="pager.pageIndex"
    :canViewTotal="true"
    :canChangePageSize="true"
    :canJumpPage="true"
    goToText="Jump to"
    :preLink="preLink"
    :nextLink="nextLink"
  />
</template>
<script>
import { defineComponent, shallowReactive, h } from 'vue'

export default defineComponent({
  setup() {
    const pager = shallowReactive({
      total: 306,
      pageIndex: 5,
      pageSize: 10,
      pageSizeOptions: [10, 20, 30, 40, 50]
    })

    const preLink = '<span class="icon-arrow-left"></span>';
    const nextLink = '<span class="icon-arrow-right"></span>';

    return {
      pager,
      preLink,
      nextLink
    }
  }
})
</script>
```
:::


### 极简模式
极简模式适用于一些有大量信息的页面，可以简化页面的复杂度。
:::demo 


```vue
<template>
  <h5 style="padding: 20px 0 10px;">Simple Mode</h5>
  <d-pagination
    :total="pager.total"
    v-model:pageSize="pager.pageSize"
    totalItemText="Total"
    v-model:pageIndex="pager.pageIndex"
    :canViewTotal="true"
    :canChangePageSize="true"
    :lite="true"
  />

  <h5 style="padding: 20px 0 10px;">Super Simple Mode</h5>
  <d-pagination
    size="sm"
    :total="pager.total"
    v-model:pageSize="pager.pageSize"
    :showPageSelector="false"
    v-model:pageIndex="pager.pageIndex"
    :canChangePageSize="true"
    :lite="true"
  />

  <h5 style="padding: 20px 0 10px;">haveConfigMenu = "true"</h5>
  <d-pagination
    size="sm"
    :total="pager.total"
    v-model:pageSize="pager.pageSize"
    :showPageSelector="false"
    v-model:pageIndex="pager.pageIndex"
    :canChangePageSize="true"
    :lite="true"
    :haveConfigMenu="true"
  >
    <div class="pagination-config-item">
      <div class="config-item-title">show field</div>
      <div class="config-item-words">setting</div>
    </div>
    <div class="pagination-config-item">
      <div class="config-item-title">display method</div>
      <div style="padding-left: 8px; margin-top: 4px">
        <i class="icon-list-view"></i>
        <i class="icon-veIcon-briefcase"></i>
      </div>
    </div>
  </d-pagination>
</template>
<script>
import { defineComponent, shallowReactive } from 'vue'

export default defineComponent({
  setup() {
    const pager = shallowReactive({
      total: 306,
      pageIndex: 5,
      pageSize: 10,
      pageSizeOptions: [10, 20, 30, 40, 50]
    })

    return {
      pager
    }
  }
})
</script>

<style lang="scss">
@import '@devui/styles-var/devui-var.scss';

/* 配置中的每一项，自定义项建议应用此样式或在此基础上修改 */
.pagination-config-item {
  padding-bottom: 8px;
  padding-top: 4px;
  border-bottom: 1px solid $devui-line;
}

/* 配置中每一项的标题样式，自定义项建议应用此样式或在此基础上修改 */
.config-item-title {
  color: $devui-line;
  padding-left: 8px;
  font-size: $devui-font-size;
  line-height: 1.5;
}

.config-item-words {
  color: $devui-text;
  padding-left: 8px;
  font-size: $devui-font-size;
  margin-top: 4px;
}

.config-item-words:hover {
  background-color: $devui-area;
  cursor: pointer;
}
</style>
```
:::

### 多种配置
支持设置输入跳转、显示跳转按钮；设置pageSize等功能。
:::demo 

```vue
<template>
  <div style="padding: 20px 0 10px;"></div>
  <d-pagination
    size="sm"
    :total="pager.total"
    v-model:pageSize="pager.pageSize"
    v-model:pageIndex="pager.pageIndex"
    :maxItems="10"
    :canViewTotal="true"
    :canJumpPage="true"
    :canChangePageSize="true"
    @pageIndexChange="pageIndexChange"
    @pageSizeChange="pageSizeChange"
  />

  <div style="padding: 20px 0 10px;"></div>
  <d-pagination
    size="sm"
    :total="pager.total"
    v-model:pageSize="pager.pageSize"
    v-model:pageIndex="pager.pageIndex"
    :maxItems="10"
    :canViewTotal="true"
    :canJumpPage="true"
    :showJumpButton="true"
    @pageIndexChange="pageIndexChange"
    @pageSizeChange="pageSizeChange"
  />

  <div style="padding: 20px 0 10px;"></div>
  <d-pagination
    size="sm"
    :total="pager.total"
    v-model:pageSize="pager.pageSize"
    v-model:pageIndex="pager.pageIndex"
    :maxItems="10"
    :canViewTotal="true"
    :canChangePageSize="true"
    :canJumpPage="true"
    :autoFixPageIndex="false"
    :autoHide="false"
    @pageIndexChange="pageIndexChangeWithoutFix"
    @pageSizeChange="pageSizeChangeWithoutFix"
    :pageSizeOptions="pager.pageSizeOptions"
    :pageSizeDirection="['centerUp']"
  />
</template>
<script>
import { defineComponent, shallowReactive } from 'vue'

export default defineComponent({
  setup() {
    const pager = shallowReactive({
      total: 306,
      pageIndex: 5,
      pageSize: 10,
      pageSizeOptions: [10, 20, 30, 40, 50]
    })

    const pageSizeChange = (val) => {
      pager.pageIndex = 1;
      console.log(val, 'pageSizeChange')
    }
    const pageIndexChange = (val) => {
      console.log(val, 'pageIndexChange')
    }
    
    const pageIndexChangeWithoutFix = (pageIndex) => {
      console.log(pageIndex, 'pageIndexChangeWithoutFix');
    }
    const pageSizeChangeWithoutFix = (pageSize) => {
      pager.pageIndex = 1;
      console.log(pageSize, 'pageSizeChangeWithoutFix');
    }

    return {
      pager,
      pageSizeChange,
      pageIndexChange,
      pageIndexChangeWithoutFix,
      pageSizeChangeWithoutFix
    }
  }
})
</script>
```
:::

### 特殊情况
特殊场景下分页器的显示。
:::demo 


```vue
<template>
  <h5 style="padding: 20px 0 10px;">
  When the value of <code>pageIndex</code> exceeds the maximum page number, enable <code>showTruePageIndex</code> to display the value of  <code>pageIndex</code>
  </h5>
  <d-pagination
    size="sm"
    :total="pager1.total"
    v-model:pageSize="pager1.pageSize"
    v-model:pageIndex="pager1.pageIndex"
    :maxItems="5"
    :canViewTotal="true"
    :canChangePageSize="true"
    :canJumpPage="true"
    :showTruePageIndex="true"
  />

  <h5 style="padding: 20px 0 10px;">
  When the value of <code>pageIndex</code> exceeds the maximum page number, the <code>showTruePageIndex</code> function is disabled and only the maximum page number is displayed.
  </h5>
  <d-pagination
    size="sm"
    :total="pager2.total"
    v-model:pageSize="pager2.pageSize"
    v-model:pageIndex="pager2.pageIndex"
    :canViewTotal="true"
    :canChangePageSize="true"
    :canJumpPage="true"
    :maxItems="5"
    :showTruePageIndex="false"
  />

  <h5 style="padding: 20px 0 10px;">Default Mode</h5>
  <d-pagination
    size="sm"
    :total="defaultPager.total"
    v-model:pageSize="defaultPager.pageSize"
    v-model:pageIndex="defaultPager.pageIndex"
    :canViewTotal="true"
    :canChangePageSize="true"
    :canJumpPage="true"
    :maxItems="5"
  />
  <div style="display: flex; margin-top: 10px;">
    <d-button bsStyle="primary" circled="true" size="sm" @click="setTotal(0)" width="200">total = 0</d-button>
    <d-button bsStyle="common" circled="true" size="sm" @click="setTotal(5)" width="200">total = 5</d-button>
    <d-button bsStyle="common" circled="true" size="sm" @click="setTotal(15)" width="200">total = 15</d-button>
  </div>

  <h5 style="padding: 20px 0 10px;">Simple Mode</h5>
  <d-pagination
    :total="litePager.total"
    v-model:pageSize="litePager.pageSize"
    totalItemText="total"
    v-model:pageIndex="litePager.pageIndex"
    :canViewTotal="true"
    :canChangePageSize="true"
    :lite="true"
  />
  <div style="display: flex; margin-top: 10px;">
    <d-button bsStyle="primary" circled="true" size="sm" @click="setLiteTotal(0)" width="200">total = 0</d-button>
    <d-button bsStyle="common" circled="true" size="sm" @click="setLiteTotal(20)" width="200">total = 20</d-button>
    <d-button bsStyle="common" circled="true" size="sm" @click="setLiteTotal(30000)" width="200">total = 30000</d-button>
    <d-button bsStyle="common" circled="true" size="sm" @click="setLiteTotal(100000)" width="200">total = 100000</d-button>
    <d-button bsStyle="common" circled="true" size="sm" @click="setIndex(2)" width="200">index = 2</d-button>
    <d-button bsStyle="common" circled="true" size="sm" @click="setIndex(3)" width="200">index = 3</d-button>
  </div>
</template>
<script>
import { defineComponent, shallowReactive } from 'vue'

export default defineComponent({
  setup() {

    const pager1 = shallowReactive({
      total: 10,
      pageIndex: 3,
      pageSize: 10
    })
    const pager2 = shallowReactive({
      total: 10,
      pageIndex: 3,
      pageSize: 10
    })

    const defaultPager = shallowReactive({
      total: 0,
      pageIndex: 1,
      pageSize: 10
    })
    const setTotal = (val) => {
      defaultPager.total = val
    }

    const litePager = shallowReactive({
      total: 0,
      pageIndex: 1,
      pageSize: 10
    })

    const setLiteTotal = (val) => {
      litePager.total = val
    }
    const setIndex = (val) => {
      litePager.pageIndex = val
    }

    return {
      pager1,
      pager2,
      defaultPager,
      setTotal,
      litePager,
      setLiteTotal,
      setIndex
    }
  }
})
</script>
```
:::

### 参数

d-pagination 参数

| 参数              | 类型                                                         | 默认                       | 说明                                                         | 跳转 Demo             |
| ----------------- | ------------------------------------------------------------ | -------------------------- | ------------------------------------------------------------ | --------------------- |
| pageSize          | `number`                                                       | 10                         | 可选，每页显示最大条目数量                                   | [基本用法](#基本用法) |
| total             | `number`                                                       | 0                          | 可选，显示的总条目数                                         | [基本用法](#基本用法) |
| pageSizeOptions   | `number[] `                                                    | 10                         | 可选，分页每页最大条目数量的下拉框的数据源，默认有四种选择 5, 10, 20, 50 | [多种配置](#多种配置) |
| pageSizeDirection | `Array<`[`AppendToBodyDirection`](#appendtobodydirection) `\|` [`ConnectedPosition`](#connectedposition)`>` | ['centerDown', 'centerUp'] | 可选，设置分页每页条目的下拉框展示的方向                     | [多种配置](#多种配置) |
| pageIndex         | `number`                                                       | 1                          | 可选，初始化页码                                             | [基本用法](#基本用法) |
| maxItems          | `number`                                                       | 10                         | 可选，分页最多显示几个按钮                                   | [基本用法](#基本用法) |
| preLink           | `string`                                                       | --                         | 可选，上一页按钮显示图标,默认设置为左箭头图标                | [基本用法](#基本用法) |
| nextLink          | `string`                                                       | --                         | 可选， 下一页按钮显示图标,默认设置为右箭头图标               | [基本用法](#基本用法) |
| size              | `number`                                                       | ''                         | 可选，分页组件尺寸，有三种选择 lg,``,sm,分别代表大，中，小   | [基本用法](#基本用法) |
| canJumpPage       | `boolean`                                                      | false                      | 可选，是否显示分页输入跳转                                   | [基本用法](#基本用法) |
| canChangePageSize | `boolean`                                                      | false                      | 可选，是否显示用于选择更改分页每页最大条目数量的下拉框       | [基本用法](#基本用法) |
| canViewTotal      | `boolean`                                                      | false                      | 可选，是否显示总条目                                         | [基本用法](#基本用法) |
| totalItemText     | `string`                                                       | '所有条目'                 | 可选，总条目文本                                             | [极简模式](#极简模式) |
| goToText          | `string`                                                       | '跳至'                     | 可选，总条目文本                                             | [基本用法](#基本用法) |
| showJumpButton    | `boolean`                                                      | false                      | 可选，是否显示跳转按钮                                       | [多种配置](#多种配置) |
| showTruePageIndex | `boolean`                                                      | false                      | 可选，页码超出分页范围时候也显示当前页码的开关               | [多种配置](#多种配置) |
| lite              | `boolean`                                                      | false                      | 可选，是否切换为极简模式                                     | [极简模式](#极简模式) |
| showPageSelector  | `boolean`                                                      | true                       | 可选，`极简模式`下是否显示页码下拉                           | [极简模式](#极简模式) |
| haveConfigMenu    | `boolean`                                                      | false                      | 可选，`极简模式`下是否显示配置                               | [极简模式](#极简模式) |
| autoFixPageIndex  | `boolean`                                                      | true                       | 可选，改变 pageSize 时是否自动修正页码，若`pageSizeChange`事件中会对`pageIndex`做处理，建议设置为`false` | [极简模式](#极简模式) |
| autoHide          | `boolean`                                                      | false                      | 可选，是否自动隐藏, autoHide为 true 并且 pageSizeOptions最小值 > total 不展示分页 | [极简模式](#极简模式) |

d-pagination 事件

| 参数            | 类型                 | 说明                                                       | 跳转 Demo             |
| --------------- | -------------------- | ---------------------------------------------------------- | --------------------- |
| pageIndexChange | `EventEmitter<number>` | 可选，页码变化的回调,返回当前页码值                        | [多种配置](#多种配置) |
| pageSizeChange  | `EventEmitter<number>` | 可选，每页最大条目数量变更时的回调，返回当前每页显示条目数 | [多种配置](#多种配置) |

**接口 & 类型定义**

##### AppendToBodyDirection

```ts
export type AppendToBodyDirection = 'rightDown' | 'rightUp' | 'leftUp' | 'leftDown' | 'centerDown' | 'centerUp';
```

##### ConnectedPosition

```ts
export interface ConnectedPosition {
  originX: 'start' | 'center' | 'end';
  originY: 'top' | 'center' | 'bottom';

  overlayX: 'start' | 'center' | 'end';
  overlayY: 'top' | 'center' | 'bottom';

  weight?: number;
  offsetX?: number;
  offsetY?: number;
  panelClass?: string | string[];
}
```

