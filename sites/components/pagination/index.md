# Pagination 分页

分页器。

### 何时使用

当加载/渲染所有数据将花费很多时间时，可以切换页码浏览数据。


### 基本用法

**size = 'sm'**
<d-pagination
  size="sm"
  :total="pager.total"
  :canViewTotal="true"
  :canChangePageSize="true"
  :canJumpPage="true"
  :maxItems="5"
  :pageSize="pager.pageSize"
  :pageIndex="pager.pageIndex"
/>

**size = 'md'**
<d-pagination
  :total="pager.total"
  :canViewTotal="true"
  :canChangePageSize="true"
  :canJumpPage="true"
  :maxItems="5"
  :pageSize="pager.pageSize"
  :pageIndex="pager.pageIndex"
/>

**size = 'lg'**
<d-pagination
  size="lg"
  :total="pager.total"
  :canViewTotal="true"
  :canChangePageSize="true"
  :canJumpPage="true"
  :maxItems="5"
  :pageSize="pager.pageSize"
  :pageIndex="pager.pageIndex"
/>

**Custom Style**
<d-pagination
  :total="pager.total"
  :pageSize="pager.pageSize"
  :pageIndex="pager.pageIndex"
  :canViewTotal="true"
  :canChangePageSize="true"
  :canJumpPage="true"
  :preLink="preLink"
  :nextLink="nextLink"
  goToText="Jump to"
/>

```html
<template>
  <h4>sm</h4>
  <d-pagination
    size="sm"
    :total="pager.total"
    :canViewTotal="true"
    :canChangePageSize="true"
    :canJumpPage="true"
    :maxItems="5"
    :pageSize="pager.pageSize"
    :pageIndex="pager.pageIndex"
  />

  <h4>md</h4>
  <d-pagination
    :total="pager.total"
    :canViewTotal="true"
    :canChangePageSize="true"
    :canJumpPage="true"
    :maxItems="5"
    :pageSize="pager.pageSize"
    :pageIndex="pager.pageIndex"
  />

  <h4>lg</h4>
  <d-pagination
    size="lg"
    :total="pager.total"
    :canViewTotal="true"
    :canChangePageSize="true"
    :canJumpPage="true"
    :maxItems="5"
    :pageSize="pager.pageSize"
    :pageIndex="pager.pageIndex"
  />

  <h4>Custom Style</h4>
  <d-pagination
    :total="pager.total"
    :pageSize="pager.pageSize"
    :pageIndex="pager.pageIndex"
    :canViewTotal="true"
    :canChangePageSize="true"
    :canJumpPage="true"
    :preLink="preLink"
    :nextLink="nextLink"
    goToText="Jump to"
  />
</template>

<script lang="tsx">
import { defineComponent, shallowReactive } from 'vue'

export default defineComponent({
  setup() {
    const pager = shallowReactive({
      total: 306,
      pageIndex: 5,
      pageSize: 10
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


### 极简模式
极简模式适用于一些有大量信息的页面，可以简化页面的复杂度。


### 多种配置
支持设置输入跳转、显示跳转按钮；设置pageSize等功能。



### 特殊情况
特殊场景下分页器的显示。


<script lang="tsx">
import { defineComponent, shallowReactive } from 'vue'

export default defineComponent({
  setup() {
    const pager = shallowReactive({
      total: 306,
      pageIndex: 5,
      pageSize: 10
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