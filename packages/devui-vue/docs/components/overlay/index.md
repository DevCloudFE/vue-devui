# 遮罩层

遮罩层属于基础组件，用于构建独立于当前页面布局的组件。

#### 何时使用

当你需要全局弹窗，或者需要元素跟随功能，便可以使用该组件。

### 固定遮罩层

:::demo

```vue
<template>
  <d-button @click="handleClick">{{ title }}</d-button>
  <d-fixed-overlay v-model:visible="visible" background-class="justify-center items-center bg-gray-50" background-block>
    <div class="h-100 w-100 flex justify-center items-center" style="background: #5e7ce0; color: white;">hello world</div>
  </d-fixed-overlay>
</template>
<script>
import { defineComponent, ref, computed } from 'vue';
export default defineComponent({
  setup() {
    const origin = ref();
    const visible = ref(false);
    const handleClick = () => (visible.value = !visible.value);
    const title = computed(() => (visible.value ? '隐藏' : '显示固定遮罩层'));
    return {
      visible,
      handleClick,
      title,
    };
  },
});
</script>
```

:::

### 自适应位置

:::demo 跟随起点元素移动，并且在遇到边界时根据`position`参数指定的可选位置自动调整。

```vue
<template>
  <div>
    <div ref="origin" class="flex items-center justify-center h-100 w-100 text-white bg-gray">origin</div>
    <d-button @click="handleVisible" style="margin:20px;">{{ title }}</d-button>
    <d-flexible-overlay v-model="visible" :origin="origin" :position="position" show-arrow class="custom-overlay">
      hello world
    </d-flexible-overlay>
  </div>
</template>
<script>
import { defineComponent, ref, computed, reactive } from 'vue';

export default defineComponent({
  setup() {
    const origin = ref();
    const visible = ref(false);
    const position = ref(['top', 'right']);
    const title = computed(() => (visible.value ? '隐藏' : '显示'));
    const handleVisible = () => (visible.value = !visible.value);

    return {
      origin,
      visible,
      title,
      position,
      handleVisible,
    };
  },
});
</script>

<style>
.custom-overlay {
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
</style>
```

:::

<style>
.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.h-100 {
  height: 100px;
}

.w-100 {
  width: 100px;
}

.text-white {
  color: white;
}

.bg-gray {
  background: gray;
}

.h-500 {
  height: 500px;
}

.w-full {
  width: 100%;
}

.bg-gray-50 {
  background: #00000088;
}

.text-white-50 {
  color: #ffffff88;
}

.mt-20 {
  margin-top: 20px;
}
</style>

### d-fixed-overlay 参数

| 参数              | 类型                       | 默认  | 说明                                                                         |
| ----------------- | -------------------------- | ----- | ---------------------------------------------------------------------------- |
| visible           | `boolean`                  | false | 可选，遮罩层是否可见                                                         |
| onUpdate:visible  | `(value: boolean) => void` | --    | 可选，遮罩层取消可见事件                                                     |
| background-block  | `boolean`                  | false | 可选，如果为 true，背景不能滚动                                              |
| background-class  | `string`                   | --    | 可选，背景的样式类                                                           |
| background-style  | `StyleValue`               | --    | 可选，背景的样式                                                             |
| on-backdrop-click | `() => void`               | --    | 可选，点击背景触发的事件                                                     |
| backdrop-close    | `boolean`                  | false | 可选，如果为 true，点击背景将触发 `onUpdate:visible`，默认参数是 false       |
| has-backdrop      | `boolean`                  | true  | 可选，如果为 false，背景元素的 `point-event` 会设为 `none`，且不显示默认背景 |
| overlay-style     | `CSSProperties`            | --    | 可选，遮罩层的样式                                                           |

### d-flexible-overlay 参数

| 参数       | 类型                   | 默认       | 说明                                                   |
| ---------- | ---------------------- | ---------- | ------------------------------------------------------ |
| v-model    | `boolean`              | false      | 可选，控制是否显示                                     |
| origin     | `HTMLElement`          | --         | 必选，你必须指定起点元素才能让遮罩层与该元素连接在一起 |
| position   | `Placement[]`          | ['bottom'] | 可选，指定显示位置                                     |
| align      | `start \| end \| null` | null       | 可选，指定对对齐方式，默认居中对齐                     |
| offset     | `number`               | 8          | 可选，指定与起点元素的间距                             |
| show-arrow | `boolean`              | false      | 可选，是否显示箭头                                     |

### Placement 类型

```typescript
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
