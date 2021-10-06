# Breadcrumb

显示当前页面层级的组件。

**何时使用**

1. 用户需要了解当前出于什么层级时；
2. 用户需要快速返回之前的层级时；
3. 用户需要导航至与指定层级相同的任意页面时。

### 基础面包屑

:::demo
```vue
<template>
  <d-breadcrumb>
    <d-breadcrumb-item>
      <a href="/">DevUI</a>
    </d-breadcrumb-item>
    <d-breadcrumb-item>
      <span>Breadcrumb</span>
    </d-breadcrumb-item>
  </d-breadcrumb>
</template>
```
::: 

### 传入source

:::demo
```vue
<template>
  <d-breadcrumb :source="source"></d-breadcrumb>
</template>
<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: "DBreadcrumbDemoSourceConfig",
  setup() {
    const source = reactive([
      { title: 'DevUI', link: '/' },
      { title: 'Breadcrumb', link: 'components/breadcrumb/', noNavigation: true }
    ])  
    return {
      source,
    }
  },
})
</script>
```
:::

### 可下拉的面包屑【TODO】

<!-- :::demo
<template>
  <d-breadcrumb>
    <d-breadcrumb-item v-for='item in breadData' :showMenu='item.showMenu' :menuList='item.menuList' :isSearch='item.isSearch' @toggleEvent='toggleEvent'>
      <a :href='item.link'>{{ item.label }}</a>
    </d-breadcrumb-item>
  </d-breadcrumb>
</template>
<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'DBreadcrumbDemoMenu',
  setup() {
    const breadData = reactive([
      { label: 'DevUI', showMenu: false, link: '/' },
      {
        label: 'Breadcrumb', showMenu: true, isSearch: true,
        menuList: [
          { name: 'Anchor', link: '/components/anchor/demo' },
          { name: 'Button', link: '/components/button/demo' }
        ]
      }])  
    const toggleEvent = (event) => {
      console.log(event);
    }
    return {
      breadData,
    }
  },
})
</script>
```
::: -->

### 自定义分隔符的面包屑

:::demo
```vue
<template>
  <div>
    <d-breadcrumb separatorIcon=">">
      <d-breadcrumb-item>
        <a routerLink="/components/zh-cn/get-start">DevUI</a>
      </d-breadcrumb-item>
      <d-breadcrumb-item>
        <span>Breadcrumb</span>
      </d-breadcrumb-item>
    </d-breadcrumb>
  </div>
  <div>
    <d-breadcrumb>
      <template v-slot:separatorIcon>
         <span style="color: red">></span>
      </template>
      <d-breadcrumb-item>
        <a routerLink="/components/zh-cn/get-start">DevUI</a>
      </d-breadcrumb-item>
      <d-breadcrumb-item>
        <span>Breadcrumb</span>
      </d-breadcrumb-item>
    </d-breadcrumb>
  </div>
</template>
```
:::
### API

### d-breadcrumb 参数

|     参数      |                  类型                  |             默认              | 说明                                               | 跳转 Demo                 |
| :-----------: | :------------------------------------: | :---------------------------: | :------------------------------------------------- | ------------------------- |
| separatorIcon |               [`string`](#自定义分隔符的面包屑) | '/'                                                | 可选，自定义分隔符样式    | [自定义分隔符的面包屑](#自定义分隔符的面包屑)
|    source     | [`Array<SourceConfig>`](#SourceConfig) |              []               | 可选，面包屑根据配置的 source 按照默认渲染方式显示 | [传入source](#传入source) |

<!-- ### d-breadcrumb-item 参数

|   参数   |                类型                | 默认  |                          说明                           | 跳转 Demo                         | 全局配置项 |
| :------: | :--------------------------------: | :---: | :-----------------------------------------------------: | :-------------------------------- | ---------- |
| showMenu |             `boolean`              | false |        可选，是否需要显示下拉箭头及下拉列表内容         | [可下拉的面包屑](#可下拉的面包屑) |            |
| menuList | [`Array<MenuConfig>`](#menuconfig) |  --   |    可选，showMenu 为 true 时传入，下拉列表的显示内容    | [可下拉的面包屑](#可下拉的面包屑) |            |
| isSearch |             `boolean`              | false | 可选，showMenu 为 true 时传入，下拉列表是否需要搜索功能 | [可下拉的面包屑](#可下拉的面包屑) |            |
### d-breadcrumb-item 事件

|    事件     |          类型           |                          说明                           | 跳转 Demo                         |
| :---------: | :---------------------: | :-----------------------------------------------------: | --------------------------------- |
| toggleEvent | `EventEmitter<boolean>` | dropdown 菜单展开和收起的事件，返回值为当前菜单是否打开 | [可下拉的面包屑](#可下拉的面包屑) | -->
### 接口 & 类型定义

<!-- MenuConfig
```ts
export interface MenuConfig {
  name: string // 显示的名称
  link: string // 跳转的路径，可为绝对路径与相对路径，注意需要与路由的配置一致
  target?: string // 规定在何处打开链接文档
}
``` -->

### SourceConfig

```ts
export interface SourceConfig {
  title: string; // 显示的名称
  link?: string; // 跳转的路径
  target?: string // 规定在何处打开链接文档
  noNavigation?: boolean; // 链接是否不可跳转，一般用于当前所处位置不可跳转的配置
}
```