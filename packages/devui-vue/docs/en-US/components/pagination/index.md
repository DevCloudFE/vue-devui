# Pagination 分页

分页器。

#### 何时使用

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
    :can-view-total="true"
    :can-change-page-size="true"
    :can-jump-page="true"
    :max-items="5"
  />

  <h5 style="padding: 20px 0 10px;">size = 'md'</h5>
  <d-pagination
    :total="pager.total"
    v-model:pageSize="pager.pageSize"
    v-model:pageIndex="pager.pageIndex"
    :can-view-total="true"
    :can-change-page-size="true"
    :can-jump-page="true"
    :max-items="5"
  />

  <h5 style="padding: 20px 0 10px;">size = 'lg'</h5>
  <d-pagination
    size="lg"
    :total="pager.total"
    v-model:pageSize="pager.pageSize"
    v-model:pageIndex="pager.pageIndex"
    :can-view-total="true"
    :can-change-page-size="true"
    :can-jump-page="true"
    :max-items="5"
  />

  <h5 style="padding: 20px 0 10px;">Custom Style</h5>
  <d-pagination
    :total="pager.total"
    v-model:pageSize="pager.pageSize"
    v-model:pageIndex="pager.pageIndex"
    :can-view-total="true"
    :can-change-page-size="true"
    :can-jump-page="true"
    go-to-text="Jump to"
    :pre-link="preLink"
    :next-link="nextLink"
  />
</template>
<script>
import { defineComponent, shallowReactive, h } from 'vue';

export default defineComponent({
  setup() {
    const pager = shallowReactive({
      total: 306,
      pageIndex: 5,
      pageSize: 10,
      pageSizeOptions: [10, 20, 30, 40, 50],
    });

    const preLink = '<span class="icon-arrow-left"></span>';
    const nextLink = '<span class="icon-arrow-right"></span>';

    return {
      pager,
      preLink,
      nextLink,
    };
  },
});
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
    total-item-text="Total"
    v-model:pageIndex="pager.pageIndex"
    :can-view-total="true"
    :can-change-page-size="true"
    :lite="true"
  />

  <h5 style="padding: 20px 0 10px;">Super Simple Mode</h5>
  <d-pagination
    size="sm"
    :total="pager.total"
    v-model:pageSize="pager.pageSize"
    :show-page-selector="false"
    v-model:pageIndex="pager.pageIndex"
    :can-change-page-size="true"
    :lite="true"
  />

  <h5 style="padding: 20px 0 10px;">have-config-menu = "true"</h5>
  <d-pagination
    size="sm"
    :total="pager.total"
    v-model:pageSize="pager.pageSize"
    :show-page-selector="false"
    v-model:pageIndex="pager.pageIndex"
    :can-change-page-size="true"
    :lite="true"
    :have-config-menu="true"
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
import { defineComponent, shallowReactive } from 'vue';

export default defineComponent({
  setup() {
    const pager = shallowReactive({
      total: 306,
      pageIndex: 5,
      pageSize: 10,
      pageSizeOptions: [10, 20, 30, 40, 50],
    });

    return {
      pager,
    };
  },
});
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

支持设置输入跳转、显示跳转按钮；设置 pageSize 等功能。
:::demo

```vue
<template>
  <div style="padding: 20px 0 10px;"></div>
  <d-pagination
    size="sm"
    :total="pager.total"
    v-model:pageSize="pager.pageSize"
    v-model:pageIndex="pager.pageIndex"
    :max-items="10"
    :can-view-total="true"
    :can-jump-page="true"
    :can-change-page-size="true"
    @page-index-change="pageIndexChange"
    @page-size-change="pageSizeChange"
  />

  <div style="padding: 20px 0 10px;"></div>
  <d-pagination
    size="sm"
    :total="pager.total"
    v-model:pageSize="pager.pageSize"
    v-model:pageIndex="pager.pageIndex"
    :max-items="10"
    :can-view-total="true"
    :can-jump-page="true"
    :show-jump-button="true"
    @page-index-change="pageIndexChange"
    @page-size-change="pageSizeChange"
  />

  <div style="padding: 20px 0 10px;"></div>
  <d-pagination
    size="sm"
    :total="pager.total"
    v-model:pageSize="pager.pageSize"
    v-model:pageIndex="pager.pageIndex"
    :max-items="10"
    :can-view-total="true"
    :can-change-page-size="true"
    :can-jump-page="true"
    :auto-fix-page-index="false"
    :auto-hide="false"
    @page-index-change="pageIndexChangeWithoutFix"
    @page-size-change="pageSizeChangeWithoutFix"
    :page-size-options="pager.pageSizeOptions"
    :page-size-direction="['centerUp']"
  />
</template>
<script>
import { defineComponent, shallowReactive } from 'vue';

export default defineComponent({
  setup() {
    const pager = shallowReactive({
      total: 306,
      pageIndex: 5,
      pageSize: 10,
      pageSizeOptions: [10, 20, 30, 40, 50],
    });

    const pageSizeChange = (val) => {
      pager.pageIndex = 1;
      console.log(val, 'pageSizeChange');
    };
    const pageIndexChange = (val) => {
      console.log(val, 'pageIndexChange');
    };

    const pageIndexChangeWithoutFix = (pageIndex) => {
      console.log(pageIndex, 'pageIndexChangeWithoutFix');
    };
    const pageSizeChangeWithoutFix = (pageSize) => {
      pager.pageIndex = 1;
      console.log(pageSize, 'pageSizeChangeWithoutFix');
    };

    return {
      pager,
      pageSizeChange,
      pageIndexChange,
      pageIndexChangeWithoutFix,
      pageSizeChangeWithoutFix,
    };
  },
});
</script>
```

:::

### 特殊情况

特殊场景下分页器的显示。
:::demo

```vue
<template>
  <h5 style="padding: 20px 0 10px;">
    When the value of <code>pageIndex</code> exceeds the maximum page number, enable <code>show-true-page-index</code> to display the value
    of <code>pageIndex</code>
  </h5>
  <d-pagination
    size="sm"
    :total="pager1.total"
    v-model:pageSize="pager1.pageSize"
    v-model:pageIndex="pager1.pageIndex"
    :max-items="5"
    :can-view-total="true"
    :can-change-page-size="true"
    :can-jump-page="true"
    :show-true-page-index="true"
  />

  <h5 style="padding: 20px 0 10px;">
    When the value of <code>pageIndex</code> exceeds the maximum page number, the <code>show-true-page-index</code> function is disabled and
    only the maximum page number is displayed.
  </h5>
  <d-pagination
    size="sm"
    :total="pager2.total"
    v-model:pageSize="pager2.pageSize"
    v-model:pageIndex="pager2.pageIndex"
    :can-view-total="true"
    :can-change-page-size="true"
    :can-jump-page="true"
    :max-items="5"
    :show-true-page-index="false"
  />

  <h5 style="padding: 20px 0 10px;">Default Mode</h5>
  <d-pagination
    size="sm"
    :total="defaultPager.total"
    v-model:pageSize="defaultPager.pageSize"
    v-model:pageIndex="defaultPager.pageIndex"
    :can-view-total="true"
    :can-change-page-size="true"
    :can-jump-page="true"
    :max-items="5"
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
    total-item-text="total"
    v-model:pageIndex="litePager.pageIndex"
    :can-view-total="true"
    :can-change-page-size="true"
    :lite="true"
  />
  <div style="display: flex; margin-top: 10px;">
    <d-button size="sm" @click="setLiteTotal(0)" width="200">total = 0</d-button>
    <d-button size="sm" @click="setLiteTotal(20)" width="200">total = 20</d-button>
    <d-button size="sm" @click="setLiteTotal(30000)" width="200">total = 30000</d-button>
    <d-button size="sm" @click="setLiteTotal(100000)" width="200">total = 100000</d-button>
    <d-button size="sm" @click="setIndex(2)" width="200">index = 2</d-button>
    <d-button size="sm" @click="setIndex(3)" width="200">index = 3</d-button>
  </div>
</template>
<script>
import { defineComponent, shallowReactive } from 'vue';

export default defineComponent({
  setup() {
    const pager1 = shallowReactive({
      total: 10,
      pageIndex: 3,
      pageSize: 10,
    });
    const pager2 = shallowReactive({
      total: 10,
      pageIndex: 3,
      pageSize: 10,
    });

    const defaultPager = shallowReactive({
      total: 0,
      pageIndex: 1,
      pageSize: 10,
    });
    const setTotal = (val) => {
      defaultPager.total = val;
    };

    const litePager = shallowReactive({
      total: 0,
      pageIndex: 1,
      pageSize: 10,
    });

    const setLiteTotal = (val) => {
      litePager.total = val;
    };
    const setIndex = (val) => {
      litePager.pageIndex = val;
    };

    return {
      pager1,
      pager2,
      defaultPager,
      setTotal,
      litePager,
      setLiteTotal,
      setIndex,
    };
  },
});
</script>
```

:::

### Pagination 参数

| 参数                 | 类型                                                                                                  | 默认                                                           | 说明                                                                                                               | 跳转 Demo             |
| :------------------- | :---------------------------------------------------------------------------------------------------- | :------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------- | :-------------------- |
| page-size            | `number`                                                                                              | 10                                                             | 可选，每页显示最大条目数量                                                                                         | [基本用法](#基本用法) |
| total                | `number`                                                                                              | 0                                                              | 可选，显示的总条目数                                                                                               | [基本用法](#基本用法) |
| page-size-options    | `number[] `                                                                                           | 10                                                             | 可选，分页每页最大条目数量的下拉框的数据源，<br>默认有四种选择 5, 10, 20, 50                                       | [多种配置](#多种配置) |
| page-size-direction  | [AppendToBodyDirection](#appendtobodydirection)\[\]<br>\| [ConnectedPosition](#connectedposition)\[\] | [<br>&nbsp;&nbsp;'centerDown', <br>&nbsp;&nbsp;'centerUp'<br>] | 可选，设置分页每页条目的下拉框展示的方向                                                                           | [多种配置](#多种配置) |
| page-index           | `number`                                                                                              | 1                                                              | 可选，初始化页码                                                                                                   | [基本用法](#基本用法) |
| max-items            | `number`                                                                                              | 10                                                             | 可选，分页最多显示几个按钮                                                                                         | [基本用法](#基本用法) |
| pre-link             | `string`                                                                                              | --                                                             | 可选，上一页按钮显示图标，<br>默认设置为左箭头图标                                                                 | [基本用法](#基本用法) |
| next-link            | `string`                                                                                              | --                                                             | 可选， 下一页按钮显示图标，<br>默认设置为右箭头图标                                                                | [基本用法](#基本用法) |
| size                 | `'lg' \| 'md' \| 'sm'`                                                                                | ''                                                             | 可选，分页组件尺寸                                                                                                 | [基本用法](#基本用法) |
| can-jump-page        | `boolean`                                                                                             | false                                                          | 可选，是否显示分页输入跳转                                                                                         | [基本用法](#基本用法) |
| can-change-page-size | `boolean`                                                                                             | false                                                          | 可选，是否显示每页最大条目数量的下拉框                                                                             | [基本用法](#基本用法) |
| can-view-total       | `boolean`                                                                                             | false                                                          | 可选，是否显示总条目                                                                                               | [基本用法](#基本用法) |
| total-item-text      | `string`                                                                                              | '所有条目'                                                     | 可选，总条目文本                                                                                                   | [极简模式](#极简模式) |
| go-to-text           | `string`                                                                                              | '跳至'                                                         | 可选，总条目文本                                                                                                   | [基本用法](#基本用法) |
| show-jump-button     | `boolean`                                                                                             | false                                                          | 可选，是否显示跳转按钮                                                                                             | [多种配置](#多种配置) |
| show-true-page-index | `boolean`                                                                                             | false                                                          | 可选，页码超出分页范围时候也显示当前页码的开关                                                                     | [多种配置](#多种配置) |
| lite                 | `boolean`                                                                                             | false                                                          | 可选，是否切换为极简模式                                                                                           | [极简模式](#极简模式) |
| show-page-selector   | `boolean`                                                                                             | true                                                           | 可选，`极简模式`下是否显示页码下拉                                                                                 | [极简模式](#极简模式) |
| have-config-menu     | `boolean`                                                                                             | false                                                          | 可选，`极简模式`下是否显示配置                                                                                     | [极简模式](#极简模式) |
| auto-fix-page-index  | `boolean`                                                                                             | true                                                           | 可选，改变 pageSize 时是否自动修正页码，<br>若`pageSizeChange`事件中会对<br>`pageIndex`做处理，则推荐设置为`false` | [极简模式](#极简模式) |
| auto-hide            | `boolean`                                                                                             | false                                                          | 可选，是否自动隐藏，<br>当 auto-hide 为 true，<br>并且 pageSizeOptions 最小值大于 total，<br>则不展示分页          | [极简模式](#极简模式) |

### Pagination 事件

| 事件名            | 类型                   | 说明                                                       | 跳转 Demo             |
| :---------------- | :--------------------- | :--------------------------------------------------------- | :-------------------- |
| page-index-change | `(pageIndex: number) => void` | 可选，页码变化的回调,返回当前页码值                        | [多种配置](#多种配置) |
| page-size-change  | `(pageSize: number) => void` | 可选，每页最大条目数量变更时的回调，返回当前每页显示条目数 | [多种配置](#多种配置) |

### Pagination 类型定义

#### AppendToBodyDirection

```ts
type AppendToBodyDirection = 'rightDown' | 'rightUp' | 'leftUp' | 'leftDown' | 'centerDown' | 'centerUp';
```

#### ConnectedPosition

```ts
interface ConnectedPosition {
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
