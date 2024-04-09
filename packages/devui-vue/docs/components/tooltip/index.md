# Tooltip 提示

文字提示组件。

#### 何时使用

用户鼠标移动到文字上，需要进一步的提示时使用。

### 基本用法

:::demo 默认在触发元素的上方展示提示信息，可通过`position`更改展示位置；`content`可设置提示信息；`show-animation`控制是否开启动画;`disabled`提示组件是否可用;`enterable`鼠标是否可以进入 tooltip;。

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
    <d-tooltip content="disabled" disabled>
      <d-button>disabled</d-button>
    </d-tooltip>
    <d-tooltip content="鼠标不可进入tooltip" :enterable="false">
      <d-button>鼠标不可进入tooltip</d-button>
    </d-tooltip>
    <d-tooltip content="tooltip出现后自动隐藏" :hide-after="1000">
      <d-button>tooltip出现后自动隐藏</d-button>
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
  margin-right: 8px;
  margin-bottom: 12px;
}
</style>
```

:::

### 延时触发

:::demo 鼠标移入的时长超过 `mouse-enter-delay` 毫秒之后才会触发，以防止用户无意划过导致的闪现，默认值是 150 毫秒；鼠标移出之后，再经过`mouse-leave-delay`毫秒后，Tooltip 组件才会隐藏，默认值是 100 毫秒。

```vue
<template>
  <div class="demo-btn-group">
    <d-tooltip content="Mouse enter 500ms later. <br> Show me" :mouse-enter-delay="500">
      <d-button variant="solid">MouseEnter delay 500ms</d-button>
    </d-tooltip>
    <d-tooltip content="Mouse leave 1000ms later. <br> Hide me" :mouse-leave-delay="1000">
      <d-button>MouseLeave delay 1000ms</d-button>
    </d-tooltip>
  </div>
</template>
```

:::

### 使用 content 插槽

:::demo

```vue
<template>
  <div class="demo-btn-group">
    <d-tooltip>
      <d-button>Overflow Hidden</d-button>
      <template #content>
        <div class="tooltip-box">{{ message }}</div>
      </template>
    </d-tooltip>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      message: ref(
        '规范的组件化目的不是为了限制创造，而是为了创造者更确定、科学、高效。所有行为决策的价值归依为产品业务。产品业务永远比组件化本身更重要，业务第一。规范不是绝对、教条、冷漠、强制的，实际工作中总会有新增需求、存量优化空间、情感化设计需求超出一般通用规范。保持克制的同时，允许基于强烈业务需求的规范突破；之后如果有足够的理由迭代出组件，那么就进行组件化。'
      ),
    };
  },
});
</script>

<style>
.tooltip-box {
  max-height: 150px;
  max-width: 300px;
  overflow: auto;
  padding: 10px;
}
</style>
```

:::

### Tooltip 参数

| 参数名            | 类型                                               | 默认值 | 说明                                                                                                              | 跳转 Demo             |
| :---------------- | :------------------------------------------------- | :----- | :---------------------------------------------------------------------------------------------------------------- | :-------------------- |
| content           | `string`                                           | --     | 可选，Tooltip 显示内容                                                                                            | [基本用法](#基本用法) |
| position          | [BasePlacement \| BasePlacement[]](#baseplacement) | top    | 可选，Tooltip 显示位置                                                                                            | [基本用法](#基本用法) |
| align             | `start \| end \| null`                             | null   | 可选，对齐方式，默认居中对齐。                                                                                    |                       |
| show-animation    | `boolean`                                          | true   | 可选，是否显示动画                                                                                                | [基本用法](#基本用法) |
| mouse-enter-delay | `number`                                           | 150    | 可选，鼠标移入后延时多久才显示 Tooltip，单位是 ms                                                                 | [延时触发](#延时触发) |
| mouse-leave-delay | `number`                                           | 100    | 可选，鼠标移出后延时多久才隐藏 Tooltip，单位是 ms                                                                 | [延时触发](#延时触发) |
| disabled          | `boolean`                                          | false  | 可选，Tooltip 是否可用                                                                                            | [基本用法](#基本用法) |
| enterable         | `boolean`                                          | true   | 可选，鼠标是否可以进入到 tooltip 中                                                                               | [基本用法](#基本用法) |
| hide-after        | `number`                                           | 0      | 可选，tooltip 出现后自动隐藏延时，单位为 ms                                                                       | [基本用法](#基本用法) |
| overlay-class     | `string`                                           | ''     | 可选，自定义弹出层的样式                                                                                          |                       |
| teleport          | `string \| HTMLElement`                            | 'body' | 可选，挂载节点，等同于 Teleport 组件的[to 属性](https://cn.vuejs.org/api/built-in-components.html#teleport) |

### Tooltip 插槽

| 插槽名  | 说明                       |
| :------ | :------------------------- |
| default | 默认插槽，设置触发元素     |
| content | 内容插槽，自定义内容与样式 |

### Tooltip 类型定义

#### BasePlacement

```ts
type BasePlacement = 'top' | 'right' | 'bottom' | 'left';
```
