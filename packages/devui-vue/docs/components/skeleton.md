# Skeleton 骨架屏

用于在内容加载过程中展示一组占位图形。

#### 何时使用

在需要等待加载内容的位置设置一个骨架屏，某些场景下比 Loading 的视觉效果更好。

### 基本用法

:::demo 默认排版：一个标题+三个段落，标题宽度为`40%`，中间两个段落宽度为`100%`，最后一个段落宽度为`60%`。

```vue
<template>
  <d-skeleton></d-skeleton>
</template>
```

:::

### 自定义排版

:::demo 当默认排版不满足需求时，可自定义排版结构，通过`class`和`style`可自定义宽高等样式。

```vue
<template>
  <d-button @click="loading = !loading">显示/隐藏</d-button>
  <br />
  <br />
  <d-skeleton :loading="loading">
    <div>
      <d-avatar name="MyAvatar" :width="36" :height="36"></d-avatar>
      <p style="width: 150px;">内容比较短的一段文字</p>
      <d-button variant="solid">一个按钮</d-button>
    </div>
    <template #placeholder>
      <d-skeleton-item variant="circle" style="width: 36px; height: 36px;"></d-skeleton-item>
      <d-skeleton-item style="width: 150px; height: 24px; margin: 1rem 0;"></d-skeleton-item>
      <d-skeleton-item round style="width: 90px; height: 32px;"></d-skeleton-item>
    </template>
  </d-skeleton>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const loading = ref(true);

    return { loading };
  },
});
</script>
```

:::

### 细粒度模式

:::demo `d-skeleton-item`组件提供两种抽象类型：`circle`、`square`，一种具象类型：`image`。针对`circle`和`image`两种类型提供`size`参数，内置了三种大小。`d-skeleton`组件提供`round`和`show-animation`参数分别设置圆角和动画。

```vue
<template>
  <div class="demo-skeleton-wrapper">
    <div>
      大小：
      <d-radio-group direction="row" v-model="size">
        <d-radio v-for="item in sizeList" :key="item.label" :value="item.value">
          {{ item.label }}
        </d-radio>
      </d-radio-group>
    </div>
    <div>
      圆角：
      <d-switch v-model="round" />
    </div>
    <div>
      动画：
      <d-switch v-model="animate" />
    </div>
  </div>
  <d-skeleton :round="round" :show-animation="animate">
    <template #placeholder>
      <d-skeleton-item></d-skeleton-item>
      <br />
      <d-skeleton-item variant="circle" :size="size"></d-skeleton-item>
      <br />
      <d-skeleton-item variant="image" :size="size"></d-skeleton-item>
    </template>
  </d-skeleton>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const size = ref('md');
    const round = ref(false);
    const animate = ref(true);
    const sizeList = [
      {
        label: 'Small',
        value: 'sm',
      },
      {
        label: 'Middle',
        value: 'md',
      },
      {
        label: 'Large',
        value: 'lg',
      },
    ];

    return { size, round, animate, sizeList };
  },
});
</script>

<style>
.demo-skeleton-wrapper {
  display: flex;
  margin-bottom: 1rem;
}
.demo-skeleton-wrapper > div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 1.2rem;
  margin-bottom: 12px;
}
</style>
```

:::

### Skeleton 参数

| 参数名         | 类型      | 默认    | 说明                                                | 跳转 Demo                 |
| :------------- | :-------- | :------ | :-------------------------------------------------- | :------------------------ |
| loading        | `boolean` | `true`  | 是否显示骨架屏，传 `false` 时会展示加载完成后的内容 | [自定义排版](#自定义排版) |
| show-animation | `boolean` | `true`  | 是否开启动画                                        | [细粒度模式](#细粒度模式) |
| round          | `boolean` | `false` | 是否显示圆角风格                                    | [细粒度模式](#细粒度模式) |
| rows           | `number`  | `3`     | 默认排版，可配置段落显示行数                        |                           |

### Skeleton 插槽

| 插槽名      | 说明                 |
| :---------- | :------------------- |
| default     | 加载完成后显示的内容 |
| placeholder | 自定义骨架屏结构     |

### SkeletonItem 参数

| 参数    | 类型                  | 默认     | 说明                                    | 跳转 Demo                 |
| :------ | :-------------------- | :------- | :-------------------------------------- | :------------------------ |
| variant | [IVariant](#ivariant) | `square` | 骨架屏形态                              | [细粒度模式](#细粒度模式) |
| size    | [ISize](#isize)       | `md`     | 针对`image`和`circle`形态，内置三种大小 | [细粒度模式](#细粒度模式) |

### SkeletonItem 类型定义

#### IVariant

```ts
type IVariant = 'image' | 'circle' | 'square';
```

#### ISize

```ts
type ISize = 'lg' | 'md' | 'sm';
```
