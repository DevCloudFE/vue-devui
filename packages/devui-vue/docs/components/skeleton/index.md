# Skeleton 骨架屏

用于在内容加载过程中展示一组占位图形。

#### 何时使用

在需要等待加载内容的位置设置一个骨架屏，某些场景下比 Loading 的视觉效果更好。

### 基本用法

最基本的占位效果。

:::demo

```vue
<template>
  <d-skeleton :row="3" />
</template>
```

:::

### 复杂组合

:::demo

```vue
<template>
  <div class="skeleton-btn-groups">
    <div class="skeleton-btn">
      展示骨架屏：
      <d-switch v-model:checked="loading" />
    </div>
    <div class="skeleton-btn">
      动画：
      <d-switch v-model:checked="animate" />
    </div>
    <div class="skeleton-btn">
      显示头像：
      <d-switch v-model:checked="avatar" />
    </div>
    <div class="skeleton-btn">
      显示标题：
      <d-switch v-model:checked="title" />
    </div>
    <div class="skeleton-btn">
      显示段落：
      <d-switch v-model:checked="paragraph" />
    </div>
    <div class="skeleton-btn">
      头像圆角：
      <d-switch v-model:checked="roundAvatar" />
    </div>
    <div class="skeleton-btn">
      段落和标题圆角：
      <d-switch v-model:checked="round" />
    </div>
  </div>
  <d-skeleton
    :row="3"
    :animate="animate"
    :avatar="avatar"
    :avatar-shape="roundAvatar ? '' : 'square'"
    :title="title"
    :paragraph="paragraph"
    :loading="loading"
    :round="round"
  >
    <div>
      <div>row one</div>
      <div>row two</div>
      <div>row three</div>
      <div>row four</div>
    </div>
  </d-skeleton>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const loading = ref(true);
    const animate = ref(true);
    const avatar = ref(true);
    const title = ref(true);
    const paragraph = ref(true);
    const roundAvatar = ref(true);
    const round = ref(false);

    return {
      loading,
      animate,
      avatar,
      title,
      paragraph,
      roundAvatar,
      round,
    };
  },
});
</script>
<style>
.skeleton-btn-groups {
  display: flex;
  margin-bottom: 1rem;
}
.skeleton-btn {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
```

:::

### 细粒度模式

提供细粒度的骨架屏元素，给予开发者更灵活的定制能力。
:::demo

```vue
<template>
  <d-skeleton-item :shape="'avatar'" style="margin-left:55px;width:80px;height:80px;" />
    <d-skeleton-item :shape="'image'" />   <d-skeleton-item :shape="'title'" />  
  <d-skeleton-item :shape="'paragraph'" :row="3" :row-width="['75%', '50%']" />   <d-skeleton-item :shape="'button'" />
</template>
```

:::

### Skeleton 参数

| 参数名    | 类型      | 默认    | 说明                                          |
| :-------- | :-------- | :------ | :-------------------------------------------- |
| loading   | `boolean` | `true`  | 是否显示骨架屏，传 `false` 时会展示子组件内容 |
| animate   | `boolean` | `true`  | 是否开启动画                                  |
| avatar    | `boolean` | `false` | 是否显示头像占位图                            |
| title     | `boolean` | `true`  | 是否显示标题占位图                            |
| paragraph | `boolean` | `true`  | 是否显示段落占位图                            |
| round     | `boolean` | `false` | 是否将标题和段落显示为圆角风格                |

### Skeleton Avatar 参数

| 参数         | 类型               | 默认    | 说明                             |
| :----------- | :----------------- | :------ | :------------------------------- |
| avatar-size  | `number \| string` | `40px`  | 头像占位图大小                   |
| avatar-shape | `string`           | `round` | 头像占位图形状，可选值为`square` |

### Skeleton Title 参数

| 参数        | 类型               | 默认  | 说明                 |
| :---------- | :----------------- | :---- | :------------------- |
| title-width | `number \| string` | `40%` | 设置标题占位图的宽度 |

### Skeleton Paragraph 参数

| 参数      | 类型                                       | 默认       | 说明                                       |
| :-------- | :----------------------------------------- | :--------- | :----------------------------------------- |
| row       | `number`                                   | `0`        | 段落占位图行数                             |
| row-width | `number \| string \| (number \| string)[]` | `["100%"]` | 段落占位图宽度，可传数组来设置每一行的宽度 |

### SkeletonItem 参数

细粒度模式

| 参数名  | 类型      | 默认   | 说明                                                    |
| :------ | :-------- | :----- | :------------------------------------------------------ |
| shape   | `string`  | -      | 可选值为`avatar`,`image`,`title`,`paragraph`,`button`。 |
| animate | `boolean` | `true` | 是否开启动画                                            |

### SkeletonItem Avatar 参数

| 参数名       | 类型     | 默认    | 说明                             |
| :----------- | :------- | :------ | :------------------------------- |
| avatar-shape | `string` | `round` | 头像占位图形状，可选值为`square` |
