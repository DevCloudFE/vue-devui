# Popover 悬浮提示

简单的文字提示气泡框。

#### 何时使用

用来通知用户非关键性问题或提示某控件处于某特殊情况。

### 基本用法

:::demo 当 Popover 弹出时，会基于`default`插槽的内容进行定位。

```vue
<template>
  <div class="popover-demo-item">
    <d-popover content="default">
      <d-button>default</d-button>
    </d-popover>
    <d-popover content="info!" pop-type="info" :position="['top']">
      <d-button variant="solid">info</d-button>
    </d-popover>
    <d-popover content="error!" pop-type="error" :position="['left']" style="z-index: 9999">
      <d-button variant="solid" color="danger">error</d-button>
    </d-popover>
    <d-popover content="success!" pop-type="success" :position="['right']">
      <d-button>success</d-button>
    </d-popover>
    <d-popover content="warning!" pop-type="warning">
      <d-button>warning</d-button>
    </d-popover>
    <d-popover content="no-animation!" :show-animation="false" style="max-width: 100px">
      <d-button>no-animation</d-button>
    </d-popover>
    <d-popover content="disabled" disabled>
      <d-button>disabled</d-button>
    </d-popover>
  </div>
</template>
<style>
.popover-demo-item > * {
  display: inline-block;
  margin-right: 8px;
}
</style>
```

:::

### 自定义内容

:::demo 自定义`default`插槽的内容与弹出提示内容。

```vue
<template>
  <div class="popover-demo-item">
    <d-popover content="自定义内容">
      <d-button variant="solid">click me!</d-button>
    </d-popover>
    <d-popover content="自定义内容" trigger="hover" style="background-color: #7693f5; color: #fff">
      <d-button>hover me!</d-button>
    </d-popover>
  </div>
</template>
```

:::

### 弹出位置

:::demo 总共支持 12 个弹出位置。

```vue
<template>
  <div class="popover-demo-item-horizontal">
    <d-popover :position="['top-start']" align="start">
      <template #content>
        <div>
          <div>top-start</div>
          <div>top-start</div>
        </div>
      </template>
      <d-button style="width: 100px;">top-start</d-button>
    </d-popover>
    <d-popover :position="['top']">
      <template #content>
        <div>top</div>
      </template>
      <d-button style="width: 100px;">top</d-button>
    </d-popover>
    <d-popover :position="['top-end']" align="end">
      <template #content>
        <div>
          <div>top-end</div>
          <div>top-end</div>
        </div>
      </template>
      <d-button style="width: 100px;">top-end</d-button>
    </d-popover>
  </div>

  <div class="popover-demo-vertical-wrapper">
    <div class="popover-demo-item-vertical">
      <d-popover :position="['left-start']" align="start">
        <template #content>
          <div>
            <div>left-start</div>
            <div>left-start</div>
          </div>
        </template>
        <d-button style="width: 100px;">left-start</d-button>
      </d-popover>
      <d-popover :position="['left']">
        <template #content>
          <div>left</div>
        </template>
        <d-button style="width: 100px;">left</d-button>
      </d-popover>
      <d-popover :position="['left-end']" align="end">
        <template #content>
          <div>
            <div>left-end</div>
            <div>left-end</div>
          </div>
        </template>
        <d-button style="width: 100px;">left-end</d-button>
      </d-popover>
    </div>
    <div class="popover-demo-item-vertical">
      <d-popover :position="['right-start']" align="start">
        <template #content>
          <div>
            <div>right-start</div>
            <div>right-start</div>
          </div>
        </template>
        <d-button style="width: 100px;">right-start</d-button>
      </d-popover>
      <d-popover :position="['right']">
        <template #content>
          <div>right</div>
        </template>
        <d-button style="width: 100px;">right</d-button>
      </d-popover>
      <d-popover :position="['right-end']" align="end">
        <template #content>
          <div>
            <div>right-end</div>
            <div>right-end</div>
          </div>
        </template>
        <d-button style="width: 100px;">right-end</d-button>
      </d-popover>
    </div>
  </div>
  <div class="popover-demo-item-horizontal">
    <d-popover :position="['bottom-start']" align="start">
      <template #content>
        <div>
          <div>bottom-start</div>
          <div>bottom-start</div>
        </div>
      </template>
      <d-button style="width: 100px;">bottom-start</d-button>
    </d-popover>
    <d-popover :position="['bottom']">
      <template #content>
        <div>bottom</div>
      </template>
      <d-button style="width: 100px;">bottom</d-button>
    </d-popover>
    <d-popover :position="['bottom-end']" align="end">
      <template #content>
        <div>
          <div>bottom-end</div>
          <div>bottom-end</div>
        </div>
      </template>
      <d-button style="width: 100px;">bottom-end</d-button>
    </d-popover>
  </div>
</template>
<style>
.popover-demo-item-horizontal {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-bottom: 4px;
}
.popover-demo-item-horizontal > * {
  margin-right: 4px;
}
.popover-demo-vertical-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
}
.popover-demo-item-vertical {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
}
.popover-demo-item-vertical > * {
  margin-bottom: 4px;
}
</style>
```

:::

### 延时触发

:::demo 仅需要在 trigger 为 hover 的时候，鼠标移入的时长超过 `mouse-enter-delay` 毫秒之后才会触发，以防止用户无意划过导致的闪现，默认值是 150 毫秒；鼠标移出之后，再经过`mouse-leave-delay`毫秒后，Popover 组件才会隐藏，默认值是 100 毫秒。

```vue
<template>
  <div class="popover-demo-item">
    <d-popover :position="['bottom']" trigger="hover" :mouse-enter-delay="500">
      <template #content>
        <div>Mouse enter 500ms later.</div>
        show Me
      </template>
      <d-button variant="solid">MouseEnter delay 500ms</d-button>
    </d-popover>
    <d-popover :position="['bottom']" trigger="hover" :mouse-leave-delay="2000">
      <template #content>
        <div>Mouse leave 2000ms later.</div>
      </template>
      <d-button>MouseLeave delay 2000ms</d-button>
    </d-popover>
  </div>
</template>
```

:::

### 手动触发

:::demo `trigger`参数设置为`manually`，可通过`is-open`参数设置是否弹出.

```vue
<template>
  <d-popover :is-open="isOpen" trigger="manually" content="manually control">
    <d-button @click="onClick">Click Me</d-button>
  </d-popover>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const isOpen = ref(false);
    const onClick = () => (isOpen.value = !isOpen.value);

    return { isOpen, onClick };
  },
});
</script>
```

:::

### 事件

:::demo 当 Popover 弹出、隐藏时，可以触发自定义事件。

```vue
<template>
  <div class="popover-demo-item">
    <d-popover content="content" @show="showFun()" @hide="hideFun()">
      <d-button>content</d-button>
    </d-popover>
  </div>
</template>
<style>
.popover-demo-item > * {
  display: inline-block;
  margin-right: 8px;
}
</style>
<script setup lang="ts">
import { ref, onMounted } from 'vue';

function showFun() {
  this.$notificationService.open({
    content: '显示后触发',
  });
}
function hideFun() {
  this.$notificationService.open({
    content: '隐藏后触发',
  });
}
</script>
```

:::

### Popover 参数

| 参数名            | 类型                                        | 默认值     | 描述                                                                                          | 跳转 Demo                 |
| :---------------- | :------------------------------------------ | :--------- | :-------------------------------------------------------------------------------------------- | :------------------------ |
| content           | `string`                                    | -          | 可选，弹出框的显示内容                                                                        | [基本用法](#基本用法)     |
| is-open           | `boolean`                                   | false      | 可选，手动控制弹出状态                                                                        | [手动触发](#手动触发)     |
| trigger           | [TriggerType](#triggertype)                 | click      | 可选，弹框触发方式                                                                            | [自定义内容](#自定义内容) |
| pop-type          | [PopType](#poptype)                         | default    | 可选，弹出框类型，样式不同                                                                    | [基本用法](#基本用法)     |
| position          | [Placement[]](#placement)                   | ['bottom'] | 可选，控制弹框出现的方向                                                                      | [弹出位置](#弹出位置)     |
| align             | `start \| end \| null`                      | null       | 可选，对齐方式，默认居中对齐。若指定`start`对齐，当`start`位置放不下时，会自动调整为`end`对齐 | [弹出位置](#弹出位置)     |
| offset            | `number` \| [OffsetOptions](#offsetoptions) | 8          | 可选，指定相对触发元素的偏移距离                                                              |                           |
| show-animation    | `boolean`                                   | true       | 可选，是否显示动画                                                                            | [基本用法](#基本用法)     |
| mouse-enter-delay | `number`                                    | 150        | 可选，仅在 trigger 为 hover 的时候，设置鼠标移入后延时多久才显示 Popover，单位是 `ms`         | [延时触发](#延时触发)     |
| mouse-leave-delay | `number`                                    | 100        | 可选，仅在 trigger 为 hover 的时候，设置鼠标移出后延时多久才隐藏 popover，单位是 `ms`         | [延时触发](#延时触发)     |
| disabled          | `boolean`                                   | false      | 可选，Popover 是否可用                                                                        | [基本用法](#基本用法)     |

### Popover 插槽

| 名称名  | 说明                        |
| :------ | :-------------------------- |
| default | 触发 Popover 显示的元素内容 |
| content | 自定义弹出内容              |

### Popover 事件

| 名称名 | 类型 | 说明                   |
| :----- | :--- | :--------------------- |
| show   | -    | Popover 显示后触发事件 |
| hide   | -    | Popover 隐藏后触发事件 |

### Popover 类型定义

#### TriggerType

```ts
type TriggerType = 'click' | 'hover' | 'manually';
```

#### PopType

```ts
type PopType = 'success' | 'error' | 'warning' | 'info' | 'default';
```

#### Placement

```ts
type Placement =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'right-start'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end';
```

#### OffsetOptions

```ts
type OffsetOptions = { mainAxis?: number; crossAxis?: number };
```
