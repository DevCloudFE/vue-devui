# Tag 标签

Tags.

### When To Use

When multiple tags need to be displayed

### Basic

:::demo Defines the label style by using the `type` attribute or `color` attribute.

```vue
<template>
  <div>
    <d-tag>tag1</d-tag>
    <d-tag type="primary">tag2</d-tag>
    <d-tag type="success">tag3</d-tag>
    <d-tag type="warning">tag4</d-tag>
    <d-tag type="danger">tag5</d-tag>
  </div>
  <div>
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

<style></style>
```

:::

### Custom

:::demo Use the default slot to customize your tag.

```vue
<template>
  <div>
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

<style></style>
```

:::

### Can be selected

:::demo The `checked` attribute is used to set the checked status of the tag, and the `checked` value can be changed by clicking.

```vue
<template>
  <div>
    <d-tag type="primary" :checked="isChecked" @click="tagClick">don't click me</d-tag>
    <d-tag color="#39afcc" :checked="isChecked" @click="tagClick">don't click me</d-tag>
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

<style></style>
```

:::

### Deletable

:::demo The `deletable` attribute is used to set whether the tag can be deleted

```vue
<template>
  <div>
    <d-tag deletable @tag-delete="handleClose">tag1</d-tag>
    <d-tag type="primary" deletable @tag-delete="handleClose">tag2</d-tag>
    <d-tag color="#39afcc" deletable @tag-delete="handleClose">tag3</d-tag>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const handleClose = () => {
      console.log('handleClose');
    };
    return {
      handleClose,
    };
  },
});
</script>

<style></style>
```

:::

### API

#### Props

|     参数     |   类型    |  默认值   |                                         说明                                         |              可选值              |             跳转至 Demo             |
| :----------: | :-------: | :-------: | :----------------------------------------------------------------------------------: | :------------------------------: | :---------------------------------: |
|     type     | `string`  | 'defalut' | Optional. Type of the a tag, color does not take effect after the type is specified. | `success\|info\|warning\|danger` |           [Basic](#basic)           |
|    color     | `string`  |    ''     |                         Optional. Theme color of the a tag.                          |                -                 |           [Basic](#basic)           |
| title-content | `string`  |    ''     |            Optional. Sets the title displayed when the cursor is hovered.            |                -                 |           [Basic](#basic)           |
|   checked    | `boolean` |   false   |                     Optional. Initial status of a tag. selected.                     |          `true\|false`           | [Can be selected](#can-be-selected) |
|  deletable   | `boolean` |   false   |                  Optional. Specifies whether a tag can be deleted.                   |          `true\|false`           |       [Deletable](#deletable)       |

#### Event

| 名称           | 说明                                                      |
| :------------- | --------------------------------------------------------- |
| click          | Event triggered when a tag is clicked.                    |
| tag-delete     | Event triggered when a tag is deleted.                    |
| checked-change | Event triggered when the check status of the tag changes. |
