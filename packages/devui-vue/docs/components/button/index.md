# Button 按钮

按钮用于开始一个即时操作。

### 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

### 按钮类型

:::demo 通过`variant`设置按钮类型，目前支持`solid`、`outline`、`text`三种类型，默认为`outline`类型。

```vue
<template>
  <div class="button-size-demo">
    <d-button variant="solid">Solid Button</d-button>
    <d-button>Outline Button</d-button>
    <d-button variant="text">Text Button</d-button>
  </div>
</template>

<style>
.button-size-demo > button {
  margin-right: 8px;
}
</style>
```

:::

### 主题色

:::demo 通过`color`设置按钮主题，目前支持`secondary`、`primary`、`danger`三种类型，默认为`secondary`类型。

```vue
<template>
  <div class="button-size-demo">
    <d-button variant="solid" color="primary">Primary</d-button>
    <d-button color="primary">Primary</d-button>
    <d-button variant="text" color="primary">Primary</d-button>
  </div>
  <br />
  <div class="button-size-demo">
    <d-button variant="solid" color="danger">Danger</d-button>
    <d-button color="danger">Danger</d-button>
    <d-button variant="text" color="danger">Danger</d-button>
  </div>
</template>
```

:::

### 按钮大小

:::demo 通过`size`设置按钮大小，支持`xs`、`sm`、`md`、`lg`四种类型，默认为`md`。

```vue
<template>
  <div class="button-size-demo">
    <d-button size="xs">Mini</d-button>
    <d-button size="sm">Small</d-button>
    <d-button>Middle</d-button>
    <d-button size="lg">Large</d-button>
  </div>
</template>
```

:::

### 禁用按钮

:::demo 通过`disabled`参数设置按钮禁用状态。

```vue
<template>
  <div class="button-size-demo">
    <d-button variant="solid">Solid Button</d-button>
    <d-button>Outline Button</d-button>
    <d-button variant="text">Text Button</d-button>
  </div>
  <br />
  <div class="button-size-demo">
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
  <d-button variant="solid" color="primary" :loading="showLoading" @click="handleClick">Click Me</d-button>
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

### 图标

:::demo

```vue
<template>
  <div class="button-size-demo">
    <d-button icon="add" variant="solid" color="primary">New</d-button>
    <d-button icon="filter">Filter</d-button>
  </div>
  <br />
  <div class="button-size-demo">
    <d-button icon="add" variant="solid" color="primary" disabled>New(disabled)</d-button>
    <d-button icon="filter" disabled>Filter(disabled)</d-button>
  </div>
  <br />
  <div class="button-size-demo">
    <d-button icon="connect" variant="text">Link</d-button>
    <d-button icon="run" variant="text">Run</d-button>
  </div>
  <br />
  <div class="button-size-demo">
    <d-button icon="connect" variant="text" disabled>Link(disabled)</d-button>
    <d-button icon="run" variant="text" disabled>Run(disabled)</d-button>
  </div>
  <br />
  <div class="button-size-demo">
    <d-button icon="add" variant="text" title="add"></d-button>
    <d-button icon="delete" variant="text" title="delete"></d-button>
  </div>
  <br />
  <div class="button-size-demo">
    <d-button icon="add" variant="text" disabled title="add"></d-button>
    <d-button icon="delete" variant="text" disabled title="delete"></d-button>
  </div>
  <br />
  <div class="button-size-demo">
    <d-button size="xs">
      Click me
      <span class="icon-chevron-down"></span>
    </d-button>
  </div>
  <br />
  <div class="button-size-demo">
    <d-button variant="text">
      Click me
      <span class="icon-chevron-down"></span>
    </d-button>
  </div>
</template>
<style>
.icon-chevron-down {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  top: -0.1em;
}
</style>
```

:::

### d-button 参数

| 参数     | 类型             | 默认        | 说明                  | 跳转 Demo                 |
| -------- | ---------------- | ----------- | --------------------- | ------------------------- |
| variant  | `IButtonVariant` | 'outline'   | 可选，按钮的形态      | [按钮类型](#按钮类型)     |
| color    | `IButtonColor`   | 'secondary' | 可选，按钮主题        | [主题色](#主题色)         |
| size     | `IButtonSize`    | 'md'        | 可选，按钮大小        | [按钮大小](#按钮大小)     |
| icon     | `string`         | --          | 可选，自定义按钮图标  | [图标](#图标)             |
| disabled | `boolean`        | false       | 可选，是否禁用 button | [禁用按钮](#禁用按钮)     |
| loading  | `boolean`        | false       | 可选，设置加载中状态  | [加载中状态](#加载中状态) |

### IButtonVariant 类型

```typescript
type IButtonVariant = 'solid' | 'outline' | 'text';
```

### IButtonSize 类型

```typescript
type IButtonSize = 'lg' | 'md' | 'sm' | 'xs';
```

### IButtonColor 类型

```typescript
type IButtonColor = 'secondary' | 'primary' | 'danger';
```
