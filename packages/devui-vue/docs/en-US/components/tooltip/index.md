# Tooltip

Text notification.

### When To Use
When users move the cursor to a text, they can see what should do next.

### Basic Usage

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

### Delay Trigger

This event is triggered only when the mouse pointer is moved in for more than [mouseEnterDelay] milliseconds. The default value is 150 ms to prevent flashing caused by unintentional strokes. The toolTip component is hidden only after [mouseLeaveDelay] milliseconds after the cursor is moved out. The default value is 100 milliseconds.

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

### API

Tooltip parameter

|      Parameter       |              Type              |                Default                | Description                                              | Jump to Demo             | Global Config |
| :-------------: | :----------------------------: | :--------------------------------: | :------------------------------------------------ | --------------------- | ---------- |
|     content     |      `string\|DOMString`       |                 --                 | Required. Tooltip display content                            | [Basic Usage](#basic-usage) |            |
|    position     | `PositionType\|PositionType[]` | ['top', 'right', 'bottom', 'left'] | Optional. Tooltip display position                            | [Basic Usage](#basic-usage) |            |
|  showAnimation  |           `boolean`            |                true                | Optional. Whether to display the drawing animation                            |                       | ✔          |
| mouseEnterDelay |            `number`            |                150                 | Optional. Delay for displaying Tooltip after the mouse is enter. The unit is ms | [Delay Trigger](#delay-trigger) |
| mouseLeaveDelay |            `number`            |                100                 | Optional. Delay for hiding Tooltip after the mouse is leave, The unit is ms | [Delay Trigger](#delay-trigger) |
