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

### API

### d-breadcrumb 参数

|  参数  |                  类型                  | 默认 | 说明                                               | 跳转 Demo                 |
| :----: | :------------------------------------: | :--: | :------------------------------------------------- | ------------------------- |
| source | [`Array<SourceConfig>`](#sourceconfig) |  []  | 可选，面包屑根据配置的 source 按照默认渲染方式显示 | [传入source](#传入source) |

### 接口 & 类型定义

SourceConfig
```ts
export interface SourceConfig {
  title: string; // 显示的名称
  link?: string; // 跳转的路径
  target?: string // 规定在何处打开链接文档
  noNavigation?: boolean; // 链接是否不可跳转，一般用于当前所处位置不可跳转的配置
}
```