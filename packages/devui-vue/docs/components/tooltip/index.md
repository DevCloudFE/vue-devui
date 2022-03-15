# Tooltip 提示

文字提示组件。

#### 何时使用

用户鼠标移动到文字上，需要进一步的提示时使用。

### 基本用法

:::demo

```vue
<template>
  <div class="demo-btn-group">
    <d-tooltip position="left" content="I am a HTML Element!">
      <d-button>left</d-button>
    </d-tooltip>
    <d-tooltip content="I am a HTML Element!">
      <d-button>top</d-button>
    </d-tooltip>
    <d-tooltip position="bottom" :content="message">
      <d-button>bottom</d-button>
    </d-tooltip>
    <d-tooltip position="right" :content="message">
      <d-button>right</d-button>
    </d-tooltip>
    <d-tooltip content="No Animation" :show-animation="false">
      <d-button>No Animation</d-button>
    </d-tooltip>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      message: ref('Upload a file in sh,js,ts,java,css,html,xml.aql,rb,py,php,c,cpp,txt format.'),
    };
  },
});
</script>

<style>
.demo-btn-group > * {
  margin-right: 4px;
}
</style>
```

:::

### 延时触发

鼠标移入的时长超过 `mouse-enter-delay` 毫秒之后才会触发，以防止用户无意划过导致的闪现，默认值是 150 毫秒；鼠标移出之后，再经过`mouse-leave-delay`毫秒后，toolTip 组件才会隐藏，默认值是 100 毫秒。

:::demo

```vue
<template>
  <div class="demo-btn-group">
    <d-tooltip content="Mouse enter 500ms later. <br> Show me" :mouse-enter-delay="500">
      <d-button variant="solid">MouseEnter delay 500ms</d-button>
    </d-tooltip>
    <d-tooltip content="Mouse leave 1000ms later. <br> Hide me" :mouse-leave-delay="1000">
      <d-button>MouseEnter delay 1000ms</d-button>
    </d-tooltip>
  </div>
</template>
```

:::

### d-tooltip 参数

| 参数              | 类型                               | 默认 | 说明                                              | 跳转 Demo             |
| ----------------- | ---------------------------------- | ---- | ------------------------------------------------- | --------------------- |
| content           | `string`                           | --   | 可选，Tooltip 显示内容                            | [基本用法](#基本用法) |
| position          | `BasePlacement \| BasePlacement[]` | top  | 可选，Tooltip 显示位置                            | [基本用法](#基本用法) |
| show-animation    | `boolean`                          | true | 可选，是否显示动画                                | [基本用法](#基本用法) |
| mouse-enter-delay | `number`                           | 150  | 可选，鼠标移入后延时多久才显示 Tooltip，单位是 ms | [延时触发](#延时触发) |
| mouse-leave-delay | `number`                           | 100  | 可选，鼠标移出后延时多久才隐藏 Tooltip，单位是 ms | [延时触发](#延时触发) |

### d-tooltip 插槽

| 名称    | 说明                   |
| ------- | ---------------------- |
| default | 默认插槽，设置触发元素 |

### BasePlacement 类型

```typescript
type BasePlacement = 'top' | 'right' | 'bottom' | 'left';
```
