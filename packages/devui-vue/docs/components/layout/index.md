# Layout 布局

页面的布局方式。

#### 何时使用

当用户需要直接使用一些既有布局时。

### 基本用法

::: demo

```vue
<template>
  <d-layout>
    <d-header class="dheader">Header</d-header>
    <d-content class="dcontent">Content</d-content>
    <d-footer class="dfooter">Footer</d-footer>
  </d-layout>
</template>

<style>
    .dheader, .dfooter {
        background: #333854;
        color: #fff;
        text-align: center;
        line-height: 40px;
    }
    .dcontent {
        height: 200px;
        line-height: 200px;
        text-align: center;
    }
</style>
```

:::

:::demo

```vue
<template>
  <d-layout>
    <d-header class="dheader">Header</d-header>
    <d-layout>
      <d-aside class="daside">Aside</d-aside>
      <d-content class="main-content">Content</d-content>
    </d-layout>
    <d-footer class="dfooter">Footer</d-footer>
  </d-layout>
</template>

<style>
    .dheader, .dfooter {
        background: #333854;
        color: #fff;
        text-align: center;
        line-height: 40px;
    }
    .daside {
        background: #f8f8f8;
        width: 100px;
        min-height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
```

::: 

:::demo

```vue
<template>
  <d-layout>
    <d-header class="dheader">Header</d-header>
    <d-layout>
      <d-content class="main-content">Content</d-content>
      <d-aside class="daside">Aside</d-aside>
    </d-layout>
    <d-footer class="dfooter">Footer</d-footer>
  </d-layout>
</template>

<style>
    .dheader, .dfooter {
        background: #333854;
        color: #fff;
        text-align: center;
        line-height: 40px;
    }
</style>
```

::: 

:::demo

```vue
<template>
  <d-layout>
    <d-aside class="daside">Aside</d-aside>
    <d-layout>
      <d-header class="dheader">Header</d-header>
      <d-content class="main-content">Content</d-content>
      <d-footer class="dfooter">Footer</d-footer>
    </d-layout>
  </d-layout>
</template>

<style>
    .daside {
        background: #f8f8f8;
        width: 100px;
        min-height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .dheader, .dfooter {
        background: #333854;
        color: #fff;
        text-align: center;
        line-height: 40px;
        min-height: 40px;
    }
    .main-content {
        line-height: 200px;
        text-align: center;
    }
</style>
```

::: 

### 应用场景1

常用上中下布局。

:::demo

```vue
<template>
    <d-layout>
        <d-header class="dheader-1">
            <div class="logo">
                <span class="logo-devui">
                    <img src="https://devui.design/components/assets/logo.svg" width="26" height="26" />
                </span>
                <span class="text">DevUI</span>
            </div>
        </d-header>
        <d-content class="dcontent-1">
            <d-breadcrumb class="dbreadcrumb">
                <d-breadcrumb-item>
                    <span>DevUI</span>
                </d-breadcrumb-item>
                <d-breadcrumb-item>
                    <span>面包屑</span>
                </d-breadcrumb-item>
            </d-breadcrumb>
            <div class="inner-content"></div>
        </d-content>
        <d-footer class="dfooter-1">footer</d-footer>
    </d-layout>
</template>

<style>
    .dheader-1 {
        text-align: left;
        position: relative;
        height: 40px;
        background-color: #333854;
        color: #fff;
    }
    .dheader-1 .logo {
        position: absolute;
        left: 0;
        margin-left: 40px;
        height: 40px;
        width: 120px;
        color: #fff;
        font-size: 16px;
        line-height: 40px;
    }
    .dheader-1 .logo .logo-devui {
        margin-top: 8px;
    }

    .dheader-1 .logo .logo-devui,
    .dheader-1 .logo .text {
        display: inline-block;
        vertical-align: top;
    }
    .dcontent-1 {
        padding: 0 40px;
        height: 300px;
        background-color: #f3f6f8;
    }
    .dcontent-1 .dbreadcrumb {
        margin: 8px 0;
    }
    .dcontent-1 .inner-content {
        background-color: #fff;
        height: 100%;
    }
    .dfooter-1 {
        background: #333854;
        color: #fff;
        text-align: center;
        line-height: 40px;
        min-height: 40px;
    }
</style>

```

:::

### 应用场景2

常用上中下布局及侧边栏布局。

:::demo

```vue
<template>
    <d-layout class="dlayout-2">
        <d-header class="dheader-2">
            <div class="logo">
            <span class="logo-devui">
                <img src="https://devui.design/components/assets/logo.svg" width="26px" height="26px" />
            </span>
            <span class="text">DevUI</span>
            </div>
        </d-header>
        <d-layout>
            <d-aside class="daside-2">
                <d-accordion :data="menu" class="menu"></d-accordion>
            </d-aside>
            <d-content class="dcontent-2">
                <d-breadcrumb class="dbreadcrumb">
                    <d-breadcrumb-item>
                        <span>DevUI</span>
                    </d-breadcrumb-item>
                    <d-breadcrumb-item>
                        <span>面包屑</span>
                    </d-breadcrumb-item>
                </d-breadcrumb>
                <div class="inner-content"></div>
            </d-content>
        </d-layout>
        <d-footer class="dfooter-2">footer</d-footer>
    </d-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const menu = ref([
            {
                title: '内容一',
                open: true,
                children: [{ title: '子内容1' }, { title: '子内容2' }, { title: '子内容3' }],
            },
            {
                title: '内容二',
                children: [{ title: '子内容1' }, { title: '子内容2' }, { title: '子内容3' }],
            },
            {
                title: '内容三（默认展开）',
                open: true,
                children: [{ title: '子内容1(禁用)', disabled: true }, { title: '子内容2(默认激活)', active: true }, { title: '子内容3' }],
            },
        ])
        return {
            menu
        }
    }
})

</script>

<style>
    .dlayout-2 {
        background-color: #fff;
    }
    .dlayout-2 li {
        list-style: none;
    }

    .daside-2 {
        border-left: 1px solid transparent;
    }

    .dheader-2 {
        text-align: left;
        height: 40px;
        background-color: #333854;
        position: relative;
        
    }
    .dheader-2 .search {
        color: #fff;
        margin-right: 40px;
        position: absolute;
        right: 0;
    }

    .dheader-2 .logo {
        position: absolute;
        left: 0;
        margin-left: 20px;
        height: 40px;
        width: 120px;
        color: #fff;
        font-size: 16px;
        line-height: 40px;
    }
    .dheader-2 .logo .logo-devui {
        margin-top: 8px;
    }
    .dheader-2 .logo .logo-devui,
    .dheader-2 .logo .text {
        display: inline-block;
        vertical-align: top;
    }

    .dcontent-2 {
        padding: 0 40px;
        background-color: #f3f6f8;
    }
    .dcontent-2 .inner-content {
        background-color: #fff;
        padding: 16px;
        height: 100%;
    }
    .dcontent-2 .dbreadcrumb {
        margin-top: 8px;
    }
    .dfooter-2 {
        color: #fff;
        background-color: #333854;
        padding: 8px 24px;
    }
    
</style>

```

:::

### Layout

布局容器，可以与`d-header`, `d-content`, `d-footer`, `d-aside`组合实现布局； `d-layout`下可嵌套元素：`d-header`, `d-content`, `d-aside`, `d-layout`。

### Header

顶部布局，只能放在`d-layout`容器中，作为`d-layout`容器的顶部实现。 默认高度：40px。

### Footer

底部布局，只能放在`d-layout`容器中，作为`d-layout`容器的底部实现。

### Content

内容容器，只能放在`d-layout`容器中，作为`d-layout`容器`d-header`与`d-footer`之间的内容。

### Aside

侧边栏，只能放在`d-layout`容器中，作为`d-layout`容器的侧边栏部分。