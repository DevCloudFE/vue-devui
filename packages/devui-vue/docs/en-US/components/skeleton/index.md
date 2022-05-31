# Skeleton

It is used to display a set of placeholder graphics during content loading.

### When to Use

Set a skeleton in the position where content needs to be loaded, which has better visual effect than Loading in some scenarios.

### Basic Usage

Basic placeholder effect.

:::demo

```vue
<template>
  <d-skeleton :row="3" />
</template>
```

:::

### Complex Combination

:::demo

```vue
<template>
  <div class="skeleton-btn-groups">
    <div class="skeleton-btn">
      Skeleton：
      <d-switch v-model="loading" />
    </div>
    <div class="skeleton-btn">
      Animation：
      <d-switch v-model="animate" />
    </div>
    <div class="skeleton-btn">
      Avatar：
      <d-switch v-model="avatar" />
    </div>
    <div class="skeleton-btn">
      Title：
      <d-switch v-model="title" />
    </div>
    <div class="skeleton-btn">
      Paragraph：
      <d-switch v-model="paragraph" />
    </div>
    <div class="skeleton-btn">
      Round Avatar：
      <d-switch v-model="roundAvatar" />
    </div>
    <div class="skeleton-btn">
      Round Corners：
      <d-switch v-model="round" />
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

### Fine-grit Mode

Provide fine-grained skeleton elements to give developers more flexibility for customization.
:::demo

```vue
<template>
  <d-skeleton-item :shape="'avatar'" style="margin-left:55px;width:80px;height:80px;" />
    <d-skeleton-item :shape="'image'" />   <d-skeleton-item :shape="'title'" />  
  <d-skeleton-item :shape="'paragraph'" :row="3" :row-width="['75%', '50%']" />   <d-skeleton-item :shape="'button'" />
</template>
```

:::

### d-skeleton Props

| Parameter |   Type    | Default | Description                                                                                     |
| :-------: | :-------: | :-----: | :---------------------------------------------------------------------------------------------- |
|  loading  | `boolean` | `true`  | Choose whether to display skeleton.Subcomponent content will be shown when Loading is `false` . |
|  animate  | `boolean` | `true`  | Choose whether to enable animation.                                                             |
|  avatar   | `boolean` | `false` | Choose whether to display the avatar placeholder picture.                                       |
|   title   | `boolean` | `true`  | Choose whether to display a title placeholder picture.                                          |
| paragraph | `boolean` | `true`  | Choose whether to display a paragraph placeholder picture.                                      |
|   round   | `boolean` | `false` | Choose whether to display headings and paragraphs in round corners.                             |

### d-skeleton\_\_avatar Props

|  Parameter   |        Type        | Default | Description                                                             |
| :----------: | :----------------: | :-----: | :---------------------------------------------------------------------- |
| avatar-size  | `number \| string` | `40px`  | Size of avatar placeholder picture.                                     |
| avatar-shape |      `string`      | `round` | The shape of head placeholder picture with the optional value `square`. |

### d-skeleton\_\_title Props

|  Parameter  |        Type        | Default | Description                             |
| :---------: | :----------------: | :-----: | :-------------------------------------- |
| title-width | `number \| string` |  `40%`  | Width of the title placeholder picture. |

### d-skeleton\_\_paragraph Props

| Parameter |                    Type                    |  Default   | Description                                                                                      |
| :-------: | :----------------------------------------: | :--------: | :----------------------------------------------------------------------------------------------- |
|    row    |                  `number`                  |    `0`     | The number of paragraph placeholder picture lines.                                               |
| row-width | `number \| string \| (number \| string)[]` | `["100%"]` | Paragraph placeholder picture widths that can be passed to arrays to set the width of each line. |

### d-skeleton-item Props

Fine-grit Mode
| Parameter | Type | Default | Description |
| :-----: | :-------: | :----: | :------------------------------------------------------ |
| shape | `string` | - | The optional values are `avatar`,`image`,`title`,`paragraph`,`button`. |
| animate | `boolean` | `true` | Choose whether to enable animation. |

> The Paragraph API is the same as the default mode.

### d-skeleton-item\_\_avatar Props

|  Parameter   |   Type   | Default | Description                                                        |
| :----------: | :------: | :-----: | :----------------------------------------------------------------- |
| avatar-shape | `string` | `round` | The shape of placeholder picture with the optional value `square`. |
