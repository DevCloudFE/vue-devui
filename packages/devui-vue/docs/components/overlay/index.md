# Overlay 遮罩层

遮罩层属于基础组件，用于构建独立于当前页面布局的组件。

#### 何时使用

当你需要全局弹窗，或者需要元素跟随功能，便可以使用该组件。

### 固定遮罩层

:::demo

```vue
<template>
  <d-button @click="visible = !visible">显示固定遮罩层</d-button>
  <d-fixed-overlay v-model:visible="visible" background-class="demo-fixed-overlay-bg" background-block>
    <div class="demo-fixed-overlay-container">Hello DevUI!</div>
  </d-fixed-overlay>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);

    return { visible };
  }
});
</script>
<style>
  .demo-fixed-overlay-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10vw;
    height: 10vh;
    background: #fff;
    color: #000;
  }

  .demo-fixed-overlay-bg {
    align-items: center;
    justify-content: center;
  }
</style>
```

:::

### 弹性遮罩层

:::demo 跟随起点元素移动，并且在遇到边界时根据`position`参数指定的可选位置自动调整。

```vue
<template>
  <div>
    <div ref="origin" class="demo-flexible-overlay-origin">origin</div>
    <br>
    <d-button @click="visible = !visible">{{ title }}</d-button>
    <d-flexible-overlay v-model="visible" :origin="origin" :position="position" show-arrow class="custom-overlay">
      Hello DevUI!
    </d-flexible-overlay>
  </div>
</template>
<script>
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  setup() {
    const origin = ref();
    const visible = ref(false);
    const position = ref(['top', 'right']);
    const title = computed(() => (visible.value ? '隐藏' : '显示'));

    return {
      origin,
      visible,
      title,
      position,
    };
  },
});
</script>

<style>
.demo-flexible-overlay-origin {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background: #E9EDFA;
  color: #252b3a;
}

.custom-overlay {
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
</style>
```

:::

### FixedOverlay 参数

| 参数名            | 类型                       | 默认  | 说明                                                                             |
| :---------------- | :------------------------- | :---- | :------------------------------------------------------------------------------- |
| visible           | `boolean`                  | false | 可选，遮罩层是否可见                                                             |
| onUpdate:visible  | `(value: boolean) => void` | --    | 可选，遮罩层取消可见事件                                                         |
| background-block  | `boolean`                  | false | 可选，如果为 true，背景不能滚动                                                  |
| background-class  | `string`                   | --    | 可选，背景的样式类                                                               |
| background-style  | `CSSProperties`            | --    | 可选，背景的样式                                                                 |
| on-backdrop-click | `() => void`               | --    | 可选，点击背景触发的事件                                                         |
| backdrop-close    | `boolean`                  | false | 可选，如果为 true，点击背景将触发 `onUpdate:visible`，<br>默认参数是 false       |
| has-backdrop      | `boolean`                  | true  | 可选，如果为 false，背景元素的 `point-event` 会设为 `none`，<br>且不显示默认背景 |
| overlay-style     | `CSSProperties`            | --    | 可选，遮罩层的样式                                                               |

### FlexibleOverlay 参数

| 参数名     | 类型                      | 默认       | 说明                                                   |
| :--------- | :------------------------ | :--------- | :----------------------------------------------------- |
| v-model    | `boolean`                 | false      | 可选，控制是否显示                                     |
| origin     | `HTMLElement`             | --         | 必选，你必须指定起点元素才能让遮罩层与该元素连接在一起 |
| position   | [Placement[]](#placement) | ['bottom'] | 可选，指定显示位置                                     |
| align      | `start \| end \| center`  | center     | 可选，指定对对齐方式，默认居中对齐                     |
| offset     | `number`                  | 8          | 可选，指定与起点元素的间距                             |
| show-arrow | `boolean`                 | false      | 可选，是否显示箭头                                     |

### 类型定义

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
