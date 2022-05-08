# Carousel 走马灯

一组轮播的区域。

#### 何时使用

1. 用于展示图片或者卡片。

### 基本用法

:::demo

```vue
<template>
  <d-carousel height="200px">
    <d-carousel-item class="d-carousel-item" v-for="item in items" :key="item">{{ item }}</d-carousel-item>
  </d-carousel>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const items = ref<string[]>(['page 1', 'page 2', 'page 3', 'page 4']);
    return {
      items,
    };
  },
});
</script>
<style>
.d-carousel-item {
  text-align: center;
  line-height: 200px;
  background: var(--devui-global-bg, #f3f6f8);
}
</style>
```

:::

### 指示器&切换箭头

arrowTrigger 设为 always 可以使箭头永久显示，dotTrigger 设为 hover 可以使 hover 到点上就切换。

:::demo

```vue
<template>
  <d-carousel height="200px" arrowTrigger="always" dotTrigger="hover">
    <d-carousel-item class="d-carousel-item" v-for="item in items" :key="item">{{ item }}</d-carousel-item>
  </d-carousel>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const items = ref<string[]>(['page 1', 'page 2', 'page 3', 'page 4']);
    return {
      items,
    };
  },
});
</script>
<style>
.d-carousel-item {
  text-align: center;
  line-height: 200px;
  background: var(--devui-global-bg, #f3f6f8);
}
</style>
```

:::

### 自动轮播

:::demo

```vue
<template>
  <d-carousel height="200px" autoplay :autoplaySpeed="3000">
    <d-carousel-item class="d-carousel-item" v-for="item in items" :key="item">{{ item }}</d-carousel-item>
  </d-carousel>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const items = ref<string[]>(['page 1', 'page 2', 'page 3', 'page 4']);
    return {
      items,
    };
  },
});
</script>
<style>
.d-carousel-item {
  text-align: center;
  line-height: 200px;
  background: var(--devui-global-bg, #f3f6f8);
}
</style>
```

:::

### 自定义操作

:::demo

```vue
<template>
  <d-carousel ref="carousel" height="200px" arrowTrigger="never">
    <d-carousel-item class="d-carousel-item" v-for="item in items" :key="item">{{ item }}</d-carousel-item>
  </d-carousel>
  <div class="carousel-demo-operate">
    <d-button @click="onPrev">上一张</d-button>
    <d-button @click="onNext">下一张</d-button>
    <d-button @click="onGoFirst">第一张</d-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const items = ref<string[]>(['page 1', 'page 2', 'page 3', 'page 4']);
    const carousel = ref();
    const onPrev = () => {
      carousel.value?.prev?.();
    };
    const onNext = () => {
      carousel.value?.next?.();
    };
    const onGoFirst = () => {
      carousel.value?.goto?.(0);
    };
    return {
      items,
      carousel,
      onPrev,
      onNext,
      onGoFirst,
    };
  },
});
</script>
<style>
.carousel-demo-operate {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.carousel-demo-operate .devui-btn-host {
  margin-right: 20px;
}
</style>
```

:::

### API

#### 参数

|     参数      |             类型             |  默认值  | 描述                                                               | 跳转 Demo                           |
| :-----------: | :--------------------------: | :------: | :----------------------------------------------------------------- | ----------------------------------- |
| arrowTrigger  | `'hover'\|'never'\|'always'` | 'hover'  | 可选，指定切换箭头显示方式                                         | [指示器&切换箭头](#指示器-切换箭头) |
|   autoplay    |          `boolean`           |  false   | 可选，是否自动轮播                                                 | [自动轮播](#自动轮播)               |
| autoplaySpeed |           `number`           |   3000   | 可选，配合`autoplay`使用，自动轮播速度，单位 ms                    | [自动轮播](#自动轮播)               |
|    height     |           `string`           |  '100%'  | 可选，轮播容器高度                                                 | [基本用法](#基本用法)               |
|   showDots    |          `boolean`           |   true   | 可选，是否显示面板指示器                                           | [自动轮播](#自动轮播)               |
|  dotPosition  |      `'top'\|'bottom'`       | 'bottom' | 可选，面板指示器位置                                               | [指示器&切换箭头](#指示器-切换箭头) |
|  dotTrigger   |      `'click'\|'hover'`      | 'click'  | 可选，指示器触发轮播方式                                           | [指示器&切换箭头](#指示器-切换箭头) |
|  activeIndex  |           `number`           |    0     | 可选，初始化激活卡片索引，从 0 开始，支持`[(activeIndex)]`双向绑定 | [基本用法](#基本用法)               |

#### 事件

|       事件        |          类型          |                   描述                    | 跳转 Demo             |
| :---------------: | :--------------------: | :---------------------------------------: | --------------------- |
| activeIndexChange | `EventEmitter<number>` | 卡片切换时，返回当前卡片的索引，从 0 开始 | [基本用法](#基本用法) |

#### 方法

|    方法     | 描述                                | 跳转 Demo                 |
| :---------: | :---------------------------------- | :------------------------ |
|   prev()    | 切换到上一张卡片                    | [自定义操作](#自定义操作) |
|   next()    | 切换到下一张卡片                    | [自定义操作](#自定义操作) |
| goTo(index) | 切换到指定索引的卡片，索引从 0 开始 | [自定义操作](#自定义操作) |
