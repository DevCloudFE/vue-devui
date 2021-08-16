# Pagination 分页

分页器。

### 何时使用

当加载/渲染所有数据将花费很多时间时，可以切换页码浏览数据。


### 基本用法

**size = 'sm'**

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


**size = 'md'**

<d-pagination
  :total="pager.total"
  v-model:pageSize="pager.pageSize"
  v-model:pageIndex="pager.pageIndex"
  :canViewTotal="true"
  :canChangePageSize="true"
  :canJumpPage="true"
  :maxItems="5"
/>


**size = 'lg'**

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


**Custom Style**

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

```html
```


### 极简模式
极简模式适用于一些有大量信息的页面，可以简化页面的复杂度。

**Simple Mode**

<d-pagination
  :total="pager.total"
  v-model:pageSize="pager.pageSize"
  totalItemText="Total"
  v-model:pageIndex="pager.pageIndex"
  :canViewTotal="true"
  :canChangePageSize="true"
  :lite="true"
/>


**Super Simple Mode**

<d-pagination
  size="sm"
  :total="pager.total"
  v-model:pageSize="pager.pageSize"
  :showPageSelector="false"
  v-model:pageIndex="pager.pageIndex"
  :canChangePageSize="true"
  :lite="true"
/>


**[haveConfigMenu] = "true"**

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


### 多种配置
支持设置输入跳转、显示跳转按钮；设置pageSize等功能。

<div style="height: 20px"></div>

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

<div style="height: 20px"></div>

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

<div style="height: 20px"></div>

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


### 特殊情况
特殊场景下分页器的显示。

<h5 style="margin-bottom: 20px;">
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


<h5 style="margin: 20px 0;">
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


<h5 style="margin: 20px 0;">Default Mode</h5>


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

<h5 style="margin: 20px 0;">Simple Mode</h5>

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

<script lang="tsx">
import { defineComponent, shallowReactive } from 'vue'

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

    const pageSizeChange = (val: number) => {
      pager.pageIndex = 1;
      console.log(val, 'pageSizeChange')
    }
    const pageIndexChange = (val: number) => {
      console.log(val, 'pageIndexChange')
    }
    
    const pageIndexChangeWithoutFix = (pageIndex: number) => {
      console.log(pageIndex, 'pageIndexChangeWithoutFix');
    }
    const pageSizeChangeWithoutFix = (pageSize: number) => {
      pager.pageIndex = 1;
      console.log(pageSize, 'pageSizeChangeWithoutFix');
    }

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
    const setTotal = (val: number) => {
      defaultPager.total = val
    }

    const litePager = shallowReactive({
      total: 0,
      pageIndex: 1,
      pageSize: 10
    })

    const setLiteTotal = (val: number) => {
      litePager.total = val
    }
    const setIndex = (val: number) => {
      litePager.pageIndex = val
    }

    return {
      pager,
      preLink,
      nextLink,
      pageSizeChange,
      pageIndexChange,
      pageIndexChangeWithoutFix,
      pageSizeChangeWithoutFix,
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