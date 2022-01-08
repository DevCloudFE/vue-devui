# Tooltip 提示

文字提示组件。

### 何时使用

用户鼠标移动到文字上，需要进一步的提示时使用。

### 基本用法

:::demo

```vue
<template>
  <div class="tooltip-buttons">
    <d-tooltip position="left" content="I am a HTML Element!">
      <d-button variant="common">left</d-button>
    </d-tooltip>
    <d-tooltip position="top" content="I am a HTML Element!">
      <d-button variant="common">top</d-button>
    </d-tooltip>
    <d-tooltip position="bottom" content="I am a HTML Element!">
      <d-button variant="common">bottom</d-button>
    </d-tooltip>
    <d-tooltip position="right" content="I am a HTML Element!">
      <d-button variant="common">right</d-button>
    </d-tooltip>
    <d-tooltip content="No Animation" :showAnimation="false">
      <d-button variant="common">No Animation</d-button>
    </d-tooltip>
  </div>
</template>
<style>
.tooltip-buttons {
  display: flex;
}
.tooltip-buttons .devui-tooltip {
  margin-right: 10px;
}
</style>
```

:::

### 延时触发

鼠标移入的时长超过 [mouseEnterDelay] 毫秒之后才会触发，以防止用户无意划过导致的闪现，默认值是 150 毫秒；鼠标移出之后，再经过[mouseLeaveDelay]毫秒后，toolTip 组件才会隐藏，默认值是 100 毫秒。

:::demo

```vue
<template>
  <d-tooltip
    position="top"
    content="Mouse enter 500ms later."
    mouseEnterDelay="500"
  >
    <d-button>MouseEnter delay 500ms</d-button>
  </d-tooltip>
  <br />
  <d-tooltip
    position="top"
    content="Mouse leave 1000ms later."
    mouseLeaveDelay="1000"
  >
    <d-button variant="common">MouseEnter delay 1000ms</d-button>
  </d-tooltip>
</template>
```

:::

### Tooltip Api

|      参数       |              类型              |                默认                | 说明                                              | 跳转 Demo             | 全局配置项 |
| :-------------: | :----------------------------: | :--------------------------------: | :------------------------------------------------ | --------------------- | ---------- |
|     content     |      `string\|DOMString`       |                 --                 | 必选，tooltip 显示内容                            | [基本用法](#基本用法) |            |
|    position     | `PositionType\|PositionType[]` | ['top', 'right', 'bottom', 'left'] | 可选，tooltip 显示位置                            | [基本用法](#基本用法) |            |
|  showAnimation  |           `boolean`            |                true                | 可选，是否显示划出动画                            |                       | ✔          |
| mouseEnterDelay |            `number`            |                150                 | 可选，鼠标移入后延时多少才显示 Tooltip，单位是 ms | [延时触发](#延时触发) |
| mouseLeaveDelay |            `number`            |                100                 | 可选，鼠标移出后延时多少才隐藏 Tooltip，单位是 ms | [延时触发](#延时触发) |
