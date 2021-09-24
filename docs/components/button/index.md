# Button 按钮

按钮用于开始一个即时操作。

### 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

### 主要按钮

:::demo

```vue
<template>
  <d-button id="primaryBtn" style="margin-right: 8px">Primary</d-button>
  <d-button :disabled="true">Disabled</d-button>
</template>
```
:::
### 次要按钮

:::demo

```vue
<template>
  <d-button bsStyle="common" style="margin-right: 8px">Common</d-button>
  <d-button bsStyle="common" :disabled="true">Disabled</d-button>
</template>
```
:::

### 左按钮与右按钮

:::demo
```vue
<template>
  <d-button bsStyle="primary" bsPosition="left">Left</d-button>
  <d-button bsStyle="common" bsPosition="right">Right</d-button>
</template>
```
:::


### 警示按钮
用于标识系统中的关键操作，例如购买场景。
:::demo
```vue
<template>
  <d-button bsStyle="danger" type="submit">Buy</d-button>
</template>
```
:::

### 文字按钮
用于标识系统中的关键操作，例如购买场景。
:::demo
```vue
<template>
  <d-button bsStyle="text" style="margin-right: 20px">Text</d-button>
  <d-button bsStyle="text-dark" style="margin-right: 20px">Text dark</d-button>
  <d-button bsStyle="text" :disabled="true">Disabled</d-button>
</template>
```
:::

### 加载中状态
（该功能正在开发中）
:::demo
```vue
<template>
  <d-button> click me! </d-button>
</template>
```
:::

### 自动获得焦点
通过autofocus设置按钮自动获得焦点。
:::demo
```vue
<template>
  <d-button bsStyle="primary" :bordered="true" :autofocus="true" style="margin-right: 8px"> Confirm </d-button>
  <d-button bsStyle="common"> Cancel </d-button>
</template>
```
:::

### 图标

:::demo
```vue
<template>
  <div class="btn-group">
    <d-button icon="add" bsStyle="primary"> New </d-button>
    <d-button icon="filter" bsStyle="common"> Filter </d-button>
  </div>
  <div class="btn-group">
    <d-button icon="add" bsStyle="primary" :disabled="true"> New(disabled) </d-button>
    <d-button icon="filter" bsStyle="common" :disabled="true"> Filter(disabled) </d-button>
  </div>
  <div class="btn-group">
    <d-button icon="connect" bsStyle="text-dark" style="margin-right: 4px"> Link </d-button>
    <d-button icon="run" bsStyle="text-dark"> Run </d-button>
  </div>
  <div class="btn-group">
    <d-button icon="connect" bsStyle="text-dark" style="margin-right: 4px" :disabled="true"> Link(disabled) </d-button>
    <d-button icon="run" bsStyle="text-dark" :disabled="true"> Run(disabled) </d-button>
  </div>
  <div class="btn-group">
    <d-button icon="add" bsStyle="text-dark" title="add"></d-button>
    <d-button icon="delete" bsStyle="text-dark" title="delete"></d-button>
  </div>
  <div class="btn-group">
    <d-button icon="add" bsStyle="text-dark" :disabled="true" title="add"></d-button>
    <d-button icon="delete" bsStyle="text-dark" :disabled="true" title="delete"></d-button>
  </div>
  <div class="btn-group">
    <d-button bsStyle="common" class="rightIcon" bsSize="xs">
      Click me
      <span class="icon-chevron-down"></span>
    </d-button>
  </div>
  <div class="btn-group">
    <d-button bsStyle="text-dark" class="rightIcon">
      Click me
      <span class="icon-chevron-down"></span>
    </d-button>
  </div>
</template>
<style>
.btn-group {
  margin-bottom: 20px;
}

.btn-group d-button {
  margin-right: 8px;
}

.icon-chevron-down {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  top: -0.1em;
}

</style>
```
:::

