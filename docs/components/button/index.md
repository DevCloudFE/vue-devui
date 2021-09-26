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
  <d-button btnStyle="common" style="margin-right: 8px">Common</d-button>
  <d-button btnStyle="common" :disabled="true">Disabled</d-button>
</template>
```
:::

### 左按钮与右按钮

:::demo
```vue
<template>
  <d-button btnStyle="primary" bsPosition="left">Left</d-button>
  <d-button btnStyle="common" bsPosition="right">Right</d-button>
</template>
```
:::


### 警示按钮
用于标识系统中的关键操作，例如购买场景。
:::demo
```vue
<template>
  <d-button btnStyle="danger" type="submit">Buy</d-button>
</template>
```
:::

### 文字按钮
用于标识系统中的关键操作，例如购买场景。
:::demo
```vue
<template>
  <d-button btnStyle="text" style="margin-right: 20px">Text</d-button>
  <d-button btnStyle="text-dark" style="margin-right: 20px">Text dark</d-button>
  <d-button btnStyle="text" :disabled="true">Disabled</d-button>
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
  <d-button btnStyle="primary" :bordered="true" :autofocus="true" style="margin-right: 8px"> Confirm </d-button>
  <d-button btnStyle="common"> Cancel </d-button>
</template>
```
:::

### 图标

:::demo
```vue
<template>
  <div class="btn-group">
    <d-button icon="add" btnStyle="primary"> New </d-button>
    <d-button icon="filter" btnStyle="common"> Filter </d-button>
  </div>
  <div class="btn-group">
    <d-button icon="add" btnStyle="primary" :disabled="true"> New(disabled) </d-button>
    <d-button icon="filter" btnStyle="common" :disabled="true"> Filter(disabled) </d-button>
  </div>
  <div class="btn-group">
    <d-button icon="connect" btnStyle="text-dark" style="margin-right: 4px"> Link </d-button>
    <d-button icon="run" btnStyle="text-dark"> Run </d-button>
  </div>
  <div class="btn-group">
    <d-button icon="connect" btnStyle="text-dark" style="margin-right: 4px" :disabled="true"> Link(disabled) </d-button>
    <d-button icon="run" btnStyle="text-dark" :disabled="true"> Run(disabled) </d-button>
  </div>
  <div class="btn-group">
    <d-button icon="add" btnStyle="text-dark" title="add"></d-button>
    <d-button icon="delete" btnStyle="text-dark" title="delete"></d-button>
  </div>
  <div class="btn-group">
    <d-button icon="add" btnStyle="text-dark" :disabled="true" title="add"></d-button>
    <d-button icon="delete" btnStyle="text-dark" :disabled="true" title="delete"></d-button>
  </div>
  <div class="btn-group">
    <d-button btnStyle="common" class="rightIcon" bsSize="xs">
      Click me
      <span class="icon-chevron-down"></span>
    </d-button>
  </div>
  <div class="btn-group">
    <d-button btnStyle="text-dark" class="rightIcon">
      Click me
      <span class="icon-chevron-down"></span>
    </d-button>
  </div>
</template>
<style>
.btn-group {
  margin-bottom: 20px;
}

.btn-group .devui-btn-host {
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

### API
d-button 参数
|   参数    |                             类型                             |   默认    | 说明                             |
| :-------: | :----------------------------------------------------------: | :-------: | :------------------------------- |
|   type    |              `'button' \| 'submit' \| 'reset'`               | 'button'  | 可选，按钮类型                   |
| btnStyle  | `'common' \| 'primary' \| 'text' \| 'text-dark' \| 'danger'` | 'primary' | 可选，按钮风格                   |
| position  |               `'left' \| 'right' \| 'default'`               | 'default' | 可选，按钮位置                   |
|   size    |                `'lg' \| 'md' \| 'sm' \| 'xs'`                |   'md'    | 可选，按钮大小                   |
| bordered  |                          `boolean`                           |   false   | 可选，是否有边框                 |
|   icon    |                           `string`                           |    --     | 可选，点击背景触发的事件         |
|   width   |                           `string`                           |    --     | 可选，弹出框宽度(e.g '300px')    |
| disabled  |                          `boolean`                           |   false   | 可选，是否禁用button             |
| autofocus |                          `boolean`                           |   false   | 可选，按钮加载时是否自动获得焦点 |

d-button 事件
|  参数   |             类型              | 默认  | 说明           |
| :-----: | :---------------------------: | :---: | :------------- |
| onClick | `(event: MouseEvent) => void` |  --   | 可选，点击事件 |

