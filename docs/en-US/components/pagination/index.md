# Pagination

Pagination。

### When to use

When loading/rendering all the data will take a lot of time, you can switch the page number to browse the data。


### Basic usage

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


### Minimalist mode
Minimalist mode is suitable for some pages with a lot of information, which can simplify the complexity of the page。
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

<style>
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

### Multiple configurations
Support setting input jump, display jump button; setting pageSize and other functions。
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

### Special cases
The display of the pager in a special scene。
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
    <d-button bsStyle="primary" circled="true" size="sm" @click="setTotal(0)" :width="200">total = 0</d-button>
    <d-button bsStyle="common" circled="true" size="sm" @click="setTotal(5)" :width="200">total = 5</d-button>
    <d-button bsStyle="common" circled="true" size="sm" @click="setTotal(15)" :width="200">total = 15</d-button>
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
    <d-button bsStyle="primary" circled="true" size="sm" @click="setLiteTotal(0)" :width="200">total = 0</d-button>
    <d-button bsStyle="common" circled="true" size="sm" @click="setLiteTotal(20)" :width="200">total = 20</d-button>
    <d-button bsStyle="common" circled="true" size="sm" @click="setLiteTotal(30000)" :width="200">total = 30000</d-button>
    <d-button bsStyle="common" circled="true" size="sm" @click="setLiteTotal(100000)" :width="200">total = 100000</d-button>
    <d-button bsStyle="common" circled="true" size="sm" @click="setIndex(2)" :width="200">index = 2</d-button>
    <d-button bsStyle="common" circled="true" size="sm" @click="setIndex(3)" :width="200">index = 3</d-button>
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

| parameter         | type         | default            | description                                                | jump Demo             |
| ----------------- | ------------------------------------------------------------ | -------------------------- | ------------------------------------------------------------ | --------------------- |
| pageSize          | `number`                                                       | 10                         | Optional, display the maximum number of entries per page                                   | [Basic-usage](#Basic-usage) |
| total             | `number`                                                       | 0                          | Optional, total number of entries displayed                                         | [Basic-usage](#Basic-usage) |
| pageSizeOptions   | `number[] `                                                    | 10                         | Optional, the data source of the drop-down box for the maximum number of entries per page for pagination, there are four options by default 5, 10, 20, 50 | [Multiple-configurations](#Multiple-configurations) |
| pageSizeDirection | `Array<`[`AppendToBodyDirection`](#appendtobodydirection) `\|` [`ConnectedPosition`](#connectedposition)`>` | ['centerDown', 'centerUp'] | Optional, set the display direction of the drop-down box of each page entry                     | [Multiple-configurations](#Multiple-configurations) |
| pageIndex         | `number`                                                       | 1                          | Optional, initialize page number                                             | [Basic-usage](#Basic-usage) |
| maxItems          | `number`                                                       | 10                         | Optional, display a few buttons at most for pagination                                   | [Basic-usage](#Basic-usage) |
| preLink           | `string`                                                       | --                         | Optional, the previous page button displays the icon, the default setting is the left arrow icon                | [Basic-usage](#Basic-usage) |
| nextLink          | `string`                                                       | --                         | Optional, the next page button displays the icon, the default setting is the right arrow icon               | [Basic-usage](#Basic-usage) |
| size              | `number`                                                       | ''                         | 可Selection, paging component size, there are three options lg,``,sm, respectively representing large, medium and small   | [Basic-usage](#Basic-usage) |
| canJumpPage       | `boolean`                                                      | false                      | Optional, whether to display the page input jump                                   | [Basic-usage](#Basic-usage) |
| canChangePageSize | `boolean`                                                      | false                      |Optional, whether to display the drop-down box for selecting the maximum number of entries per page for changing the pagination       | [Basic-usage](#Basic-usage) |
| canViewTotal      | `boolean`                                                      | false                      | Optional, whether to display total entries                                        | [Basic-usage](#Basic-usage) |
| totalItemText     | `string`                                                       | 'All entries'                 | Optional, total entry text                                             | [Minimalist-mode](#Minimalist-mode) |
| goToText          | `string`                                                       | 'jump to'                     | Optional, total entry text                                             | [Basic-usage](#Basic-usage) |
| showJumpButton    | `boolean`                                                      | false                      | Optional, whether to show the jump button                                       | [Multiple-configurations](#Multiple-configurations) |
| showTruePageIndex | `boolean`                                                      | false                      | Optional, the switch to display the current page number when the page number exceeds the paging range               | [Multiple-configurations](#Multiple-configurations) |
| lite              | `boolean`                                                      | false                      | Optional, whether to switch to Minimalist-mode                                     | [Minimalist-mode](#Minimalist-mode) |
| showPageSelector  | `boolean`                                                      | true                       | Optional, whether to show page number drop-down under `Minimalist-mode`                           | [Minimalist-mode](#Minimalist-mode) |
| haveConfigMenu    | `boolean`                                                      | false                      | Optional, whether to display the configuration under `Minimalist-mode`                               | [Minimalist-mode](#Minimalist-mode) |
| autoFixPageIndex  | `boolean`                                                      | true                       | Optional, whether to automatically correct the page number when changing the pageSize. If the `pageIndex` is handled in the `pageSizeChange` event, it is recommended to set it to `false` | [Minimalist-mode](#Minimalist-mode) |
| autoHide          | `boolean`                                                      | false                      | Optional, whether to hide automatically, autoHide is true and the minimum value of pageSizeOptions> total does not show pagination | [Minimalist-mode](#Minimalist-mode) |

d-pagination Event

| parameter            | type                 | default                                                       | jump Demo             |
| --------------- | -------------------- | ---------------------------------------------------------- | --------------------- |
| pageIndexChange | `EventEmitter<number>` | Optional, callback of page number change, return current page number value                        | [Multiple-configurations](#Multiple-configurations) |
| pageSizeChange  | `EventEmitter<number>` | Optional, callback when the maximum number of items per page is changed, return the current number of items displayed on each page | [Multiple-configurations](#Multiple-configurations) |

**Tnterface & TypeDefine**

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

