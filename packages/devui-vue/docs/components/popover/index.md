# Popover 悬浮提示  
简单的文字提示气泡框。

### 何时使用
用来通知用户非关键性问题或提示某控件处于某特殊情况。

### 基本用法
当Popover弹出时，会基于`reference`插槽的内容进行定位。
:::demo
```vue
<template>
<div class="item" >
  <d-popover visible>
    <template #reference>
      <d-button bsStyle="common">default</d-button>
    </template>
  </d-popover>
  <d-popover  content="info!" popType="info" position="top" trigger="hover">
    <template #reference>
      <d-button  bsStyle="primary">info</d-button>
    </template>
  </d-popover>
  <d-popover  content="error!" popType="error" position="left" :zIndex="9999">
    <template #reference>
      <d-button  bsStyle="danger">error</d-button>
    </template>
  </d-popover>
    <d-popover  content="success!" popType="success" position="right">
    <template #reference>
      <d-button  bsStyle="success">success</d-button>
    </template>
  </d-popover>
  <d-popover  content="warning!" popType="warning" >
    <template #reference>
      <d-button  bsStyle="warning">warning</d-button>
    </template>
  </d-popover>
  <d-popover  content="no-animation!" :showAnimation="false" :popMaxWidth="100">
    <template #reference>
      <d-button  bsStyle="common">no-animation</d-button>
    </template>
  </d-popover>
</div>
</template>
<style>
.item > *{
  margin-right:10px;
}
</style>
```
:::

### 自定义内容  
自定义`reference`插槽的内容与弹出提示内容。

:::demo

```vue
<template>
<div class="item">
  <d-popover content="自定义内容" >
    <template #reference>
      <d-button bsStyle="primary"> click me!</d-button>
    </template>
  </d-popover>
  <d-popover  content="自定义内容" trigger="hover" :popoverStyle="{ backgroundColor: '#7693f5',color: '#fff'}">
    <template #reference>
      <d-button bsStyle="primary"> hover me!</d-button>
    </template>
  </d-popover>
</div>
</template>

<style>
.item > *{
  margin-right:10px;
}
</style>
```
:::


### 弹出位置
总共支持12个弹出位置。

:::demo

```vue
<template>
<div class="item">
  <d-popover  position="left" >
  <template #content>
      <div>left</div>
    </template>
  <template #reference>
    <d-button bsStyle="common">left</d-button>
  </template>
  </d-popover>
  <d-popover  position="left-top" >
    <template #content>
        <div >left-top</div>
        <div>left-top</div>
    </template>
    <template #reference>
      <d-button bsStyle="common">left-top</d-button>
    </template>
  </d-popover>
  <d-popover  position="left-bottom" >
    <template #content>
        <div>left-bottom</div>
        <div>left-bottom</div>
      </template>
    <template #reference>
      <d-button bsStyle="common">left-bottom</d-button>
    </template>
  </d-popover>
</div>

<div style="margin-top:10px;" class="item">
  <d-popover   position="top" >
    <template #content>
        <span >top</span>
      </template>
    <template #reference>
      <d-button bsStyle="common">top</d-button>
    </template>
  </d-popover>
  <d-popover  position="top-left" >
    <template #content>
        <span >top-left</span>
      </template>
    <template #reference>
      <d-button bsStyle="common">top-left</d-button>
    </template>
  </d-popover>
  <d-popover  position="top-right" >
    <template #content>
        <span >top-right</span>
      </template>
    <template #reference>
      <d-button bsStyle="common">top-right</d-button>
    </template>
  </d-popover>
</div>

<div style="margin-top:10px;" class="item">
  <d-popover   position="right" >
    <template #content>
        <div >right</div>
      </template>
    <template #reference>
      <d-button bsStyle="common">right</d-button>
    </template>
  </d-popover>
  <d-popover   position="right-top" >
    <template #content>
        <div >right-top</div>
        <div >right-top</div>
      </template>
    <template #reference>
      <d-button bsStyle="common">right-top</d-button>
    </template>
  </d-popover>
    <d-popover  position="right-bottom" >
    <template #content>
        <div >right-bottom</div>
        <div >right-bottom</div>
      </template>
    <template #reference>
      <d-button bsStyle="common">right-bottom</d-button>
    </template>
  </d-popover>
</div>

<div style="margin-top:10px;" class="item">
  <d-popover   position="bottom" >
    <template #content>
        <div >bottom</div>
      </template>
    <template #reference>
      <d-button bsStyle="common">bottom</d-button>
    </template>
  </d-popover>
    <d-popover  position="bottom-left" >
    <template #content>
        <div >bottom-left</div>
      </template>
    <template #reference>
      <d-button bsStyle="common">bottom-left</d-button>
    </template>
  </d-popover>
  <d-popover  position="bottom-right" >
    <template #content>
        <div >bottom-right</div>
      </template>
    <template #reference>
      <d-button bsStyle="common">bottom-right</d-button>
    </template>
  </d-popover>
</div>
</template>
<style>
.item > *{
  margin-right:10px;
}
</style>
```

:::

### 延时触发
仅需要在 trigger 为 hover 的时候，鼠标移入的时长超过 [mouseEnterDelay] 毫秒之后才会触发，以防止用户无意划过导致的闪现，默认值是150毫秒；鼠标移出之后，再经过[mouseLeaveDelay]毫秒后，Popover组件才会隐藏，默认值是100毫秒。

:::demo

```vue
<template>
<div class="item">
  <d-popover  position="bottom-right" trigger="hover" :mouseEnterDelay ="500">
    <template #content>
        <div > Mouse enter 500ms later. </div>
        show Me
      </template>
    <template #reference>
      <d-button bsStyle="primary">MouseEnter delay 500ms</d-button>
    </template>
  </d-popover>
  <d-popover  position="bottom-right" trigger="hover" :mouseLeaveDelay="2000">
    <template #content>
        <div> Mouse leave 2000ms later. </div>
      </template>
    <template #reference>
      <d-button bsStyle="common"> MouseLeave delay 2000ms</d-button>
    </template>
  </d-popover>
  </div>
</template>
<style>
.item > * {
  margin-right:10px;
}
</style>
```
:::

### DPopover API详情

#### Props

| 参数  | 类型 | 默认值 | 描述 | 跳转Demo |
| ---- | ---- | ---- | ---- | ---- |
| content | `string` | defalut |可选，弹出框的显示内容或 | [自定义内容](#自定义内容) |
| visible | `boolean` | false | 可选，弹框的初始化弹出状态 | [基本用法](#基本用法) |
| trigger | `string` | click | 可选，弹框触发方式 | [基本用法](#基本用法) |
| popType | `string`  | default | 可选，弹出框类型，样式不同 | [基本用法](#基本用法) |
| zIndex | `number` | 1060 | 可选，z-index值用于手动控制层高 | [基本用法](#基本用法) |
| positionType | `string` | bottom | 可选，控制弹框出现 的方向 | [弹出位置](#弹出位置) |
| showAnimation | `boolean` | true | 可选，是否显示动画 | [基本用法](#基本用法) |
| popMaxWidth | `number` | - | 可选，限制弹出框最大宽度（`px`） | [基本用法](#基本用法) |
| mouseEnterDelay | `number` | 150 | 可选，仅需要在 trigger 为 hover 的时候，设置鼠标移入后延时多少才显示 Popover，单位是 `ms` | [延时触发](#延时触发) |
| mouseLeaveDelay | `number` | 100     | 可选，仅需要在 trigger 为 hover 的时候，设置鼠标移出后延时多少才隐藏 popover，单位是 `ms` | [延时触发](#延时触发) |
| popoverStyle | `{[klass:string]:any;}` | - | 可选，在需要改变弹出层样式时设置，箭头会应用同样的背景色。样式，参见[Angular版本—Popover](https://devui.design/components/zh-cn/popover/api) | [自定义内容](#自定义内容) |



#### Slot

| 名称      | 说明                        |
| --------- | --------------------------- |
| content   | 自定义菜单内容              |
| reference | 触发 Popover 显示的元素内容 |

