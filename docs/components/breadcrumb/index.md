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