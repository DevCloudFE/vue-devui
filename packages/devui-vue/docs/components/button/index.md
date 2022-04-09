# Button 按钮

按钮用于开始一个即时操作。

#### 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

### 形态

:::demo 通过`variant`设置按钮形态，目前支持`solid`、`outline`、`text`三种形态，默认为`outline`。

```vue
<template>
  <div class="demo-spacing">
    <d-button variant="solid">Solid Button</d-button>
    <d-button>Outline Button</d-button>
    <d-button variant="text">Text Button</d-button>
  </div>
</template>
```

:::

### 主题色

:::demo 通过`color`设置按钮的主题色，目前支持`primary`、`secondary`、`danger`三种主题色，默认为`secondary`。<br>注意：如果`variant`设置成`solid`，则默认使用`primary`主题色。

```vue
<template>
  <div class="demo-spacing">
    <d-button variant="solid" color="primary">Primary</d-button>
    <d-button color="primary">Primary</d-button>
    <d-button variant="text" color="primary">Primary</d-button>
  </div>

  <div class="demo-spacing">
    <d-button variant="solid" color="secondary">Secondary</d-button>
    <d-button color="secondary">Secondary</d-button>
    <d-button variant="text" color="secondary">Secondary</d-button>
  </div>

  <div class="demo-spacing">
    <d-button variant="solid" color="danger">Danger</d-button>
    <d-button color="danger">Danger</d-button>
    <d-button variant="text" color="danger">Danger</d-button>
  </div>
</template>
```

:::

### 尺寸

:::demo 通过`size`设置按钮尺寸，支持`xs`、`sm`、`md`、`lg`四种类型的尺寸，默认为`md`。

```vue
<template>
  <div class="demo-spacing">
    <d-button size="xs">Mini</d-button>
    <d-button size="sm">Small</d-button>
    <d-button>Medium</d-button>
    <d-button size="lg">Large</d-button>
  </div>
</template>
```

:::

### 禁用状态

:::demo 通过`disabled`参数设置按钮禁用状态。

```vue
<template>
  <div class="demo-spacing">
    <d-button variant="solid">Solid Button</d-button>
    <d-button>Outline Button</d-button>
    <d-button variant="text">Text Button</d-button>
  </div>

  <div class="demo-spacing">
    <d-button variant="solid" disabled>Solid Button</d-button>
    <d-button disabled>Outline Button</d-button>
    <d-button variant="text" disabled>Text Button</d-button>
  </div>
</template>
```

:::

### 加载中状态

:::demo 通过`loading`参数设置按钮加载中状态。

```vue
<template>
  <d-button variant="solid" :loading="showLoading" @click="handleClick">Click Me</d-button>
</template>
<script>
import { ref, onBeforeUnmount } from 'vue';

export default {
  setup() {
    const showLoading = ref(false);

    const handleClick = () => {
      showLoading.value = true;

      setTimeout(() => {
        showLoading.value = false;
      }, 2000);
    };

    return { showLoading, handleClick };
  },
};
</script>
```

:::

### 图标按钮

:::demo

```vue
<template>
  <div class="demo-spacing">
    <d-button icon="add" variant="solid">New</d-button>
    <d-button icon="filter">Filter</d-button>
    <d-button icon="connect" variant="text">Link</d-button>
    <d-button icon="delete" variant="text" title="Delete"></d-button>
  </div>
</template>
```

:::

### Button 参数

| 参数名   | 类型                              | 默认        | 说明                  | 跳转 Demo                 |
| :------- | :-------------------------------- | :---------- | :-------------------- | :------------------------ |
| variant  | [IButtonVariant](#ibuttonvariant) | 'outline'   | 可选，按钮形态        | [形态](#形态)             |
| color    | [IButtonColor](#ibuttoncolor)     | 'secondary' | 可选，按钮主题        | [主题色](#主题色)         |
| size     | [IButtonSize](#ibuttonsize)       | 'md'        | 可选，按钮尺寸        | [尺寸](#尺寸)             |
| icon     | `string`                          | --          | 可选，自定义按钮图标  | [图标按钮](#图标按钮)     |
| disabled | `boolean`                         | false       | 可选，是否禁用 button | [禁用状态](#禁用状态)     |
| loading  | `boolean`                         | false       | 可选，设置加载中状态  | [加载中状态](#加载中状态) |

### 类型

#### IButtonVariant

```ts
type IButtonVariant = 'solid' | 'outline' | 'text';
```

#### IButtonSize

```ts
type IButtonSize = 'lg' | 'md' | 'sm' | 'xs';
```

#### IButtonColor

```ts
type IButtonColor = 'primary' | 'secondary' | 'danger';
```
