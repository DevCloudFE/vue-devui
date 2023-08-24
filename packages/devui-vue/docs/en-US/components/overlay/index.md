# Overlay 遮罩层

遮罩层属于基础组件，用于构建独立于当前页面布局的组件。

#### 何时使用

当你需要全局弹窗，或者需要元素跟随功能，便可以使用该组件。

### 固定遮罩层

:::demo

```vue
<template>
  <d-button @click="visible = !visible">显示固定遮罩层</d-button>
  <d-fixed-overlay v-model="visible" class="demo-fixed-overlay-bg">
    <div class="demo-fixed-overlay-container">Hello DevUI!</div>
  </d-fixed-overlay>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);

    return { visible };
  },
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
  display: flex;
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
    <br />
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
  background: #e9edfa;
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

| 参数名                 | 类型      | 默认  | 说明                     | 跳转 Demo                 |
| :--------------------- | :-------- | :---- | :----------------------- | :------------------------ |
| v-model                | `boolean` | false | 可选，遮罩层是否可见     | [固定遮罩层](#固定遮罩层) |
| lock-scroll            | `boolean` | true  | 可选，是否锁定背景滚动   |                           |
| close-on-click-overlay | `boolean` | true  | 可选，是否点击遮罩层关闭 |                           |

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
