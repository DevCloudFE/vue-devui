# Tag 标签

标签展示组件。

#### 何时使用

用户需要展示多个标签时。

### 基本用法

:::demo 由`type`属性来选择 tag 的类型，也可以通过`color`属性来自定义主题色

```vue
<template>
  <div class="tag-demo-wrapper">
    <d-tag>标签一</d-tag>
    <d-tag type="primary">标签二</d-tag>
    <d-tag type="success">标签三</d-tag>
    <d-tag type="warning">标签四</d-tag>
    <d-tag type="danger">标签五</d-tag>
  </div>
  <div class="tag-demo-wrapper">
    <d-tag color="blue-w98">blue-w98</d-tag>
    <d-tag color="aqua-w98">aqua-w98</d-tag>
    <d-tag color="aqua-w98">aqua-w98</d-tag>
    <d-tag color="olivine-w98">olivine-w98</d-tag>
    <d-tag color="green-w98">green-w98</d-tag>
    <d-tag color="yellow-w98">yellow-w98</d-tag>
    <d-tag color="orange-w98">orange-w98</d-tag>
    <d-tag color="red-w98">red-w98</d-tag>
    <d-tag color="pink-w98">pink-w98</d-tag>
    <d-tag color="purple-w98">purple-w98</d-tag>
    <d-tag color="#aa2116">#aa2116</d-tag>
    <d-tag color="#007d65">#007d65</d-tag>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style>
.tag-demo-wrapper > * {
  margin: 4px;
}
</style>
```

:::

### 自定义

:::demo 使用默认插槽可自由定制你的 tag

```vue
<template>
  <div class="tag-demo-wrapper">
    <d-tag><d-icon name="bug" size="12px" /> bug </d-tag>
    <d-tag type="primary"><d-icon name="bug" size="12px" /> bug </d-tag>
    <d-tag color="#b05bc1"><d-icon name="bug" size="12px" /> bug </d-tag>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const isChecked = ref(true);
    const tagClick = () => {
      isChecked.value = !isChecked.value;
    };
    return { isChecked, tagClick };
  },
});
</script>
```

:::

### 可被选中

:::demo 由`checked`属性来设置 tag 选中的状态，可通过点击来改变`checked`的值

```vue
<template>
  <div class="tag-demo-wrapper">
    <d-tag type="primary" :checked="isChecked" @click="tagClick">不要点我呀</d-tag>
    <d-tag color="#39afcc" :checked="isChecked" @click="tagClick">不要点我呀</d-tag>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const isChecked = ref(true);
    const tagClick = () => {
      isChecked.value = !isChecked.value;
    };
    return { isChecked, tagClick };
  },
});
</script>
```

:::

### 可移除的

:::demo 由`deletable`属性来设置标签是否可删除

```vue
<template>
  <div class="tag-demo-wrapper">
    <d-tag v-for="item in tagList" deletable :key="item" @tag-delete="() => handleClose(item)">{{ item }}</d-tag>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const tagList = ref(['tag1', 'tag2', 'tag3']);
    const handleClose = (item: string) => {
      tagList.value.splice(tagList.value.indexOf(item), 1);
    };
    return {
      tagList,
      handleClose,
    };
  },
});
</script>
```

:::

### 不同尺寸

:::demo Tag 默认的是 md 尺寸，有 lg、md、sm 三种尺寸可选

```vue
<template>
  <div class="tag-demo-wrapper">
    <d-tag type="primary" size="lg">Large</d-tag>
    <d-tag type="success" size="md">Middle</d-tag>
    <d-tag type="warning" size="sm">Small</d-tag>
  </div>
  <div class="tag-demo-wrapper">
    <d-tag type="primary" deletable size="lg">Large</d-tag>
    <d-tag type="primary" deletable size="md">Middle</d-tag>
    <d-tag type="primary" deletable size="sm">Small</d-tag>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>
```

:::

### Tag 参数

| 参数          | 类型                  | 默认值   | 说明                                        | 跳转至 Demo           |
| :------------ | :-------------------- |:------| :------------------------------------------ | :-------------------- |
| type          | [TagType](#tagtype)   | ''    | 可选，标签的类型，指定类型后则 color 不生效 | [基本用法](#基本用法) |
| color         | `string`              | ''    | 可选，标签的主题色                          | [基本用法](#基本用法) |
| title-content | `string`              | ''    | 可选，设置鼠标悬浮时 title 的显示内容       | [基本用法](#基本用法) |
| checked       | `boolean`             | false | 可选，标签选中的初始状态                    | [可被选中](#可被选中) |
| deletable     | `boolean`             | false | 可选，设置标签是否可删除                    | [可移除的](#可移除的) |
| size          | [SizeType](#sizetype) | 'md'  | 可选，标签尺寸                              | [不同尺寸](#不同尺寸) |

### Tag 事件

| 事件名         | 说明                                                        |
| :------------- | :---------------------------------------------------------- |
| click          | 点击 tag 的时候触发的事件                                   |
| tag-delete     | 删除 tag 的时候触发的事件                                   |
| checked-change | tag 的 check 状态改变时触发的事件，通过参数获取标签最新状态 |

### Tag 类型

#### TagType

```ts
type TagType = 'primary' | 'success' | 'warning' | 'danger';
```

#### SizeType

```ts
type SizeType = 'lg' | 'md' | 'sm';
```
