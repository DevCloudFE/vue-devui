# Button 

Button is used to start an instant operation.

#### When To Use

It marks (or encapsulates a group of) operation commands, responds to user clicks, and triggers corresponding business logic.

### Basic Usage

:::demo Use `variant` to set button shape. Three types are supported: `solid`, `outline` and `text`, default  `outline`.

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

### Theme Color

:::demo Use `color` to set `Button` theme color. Three types of theme colors are supported: `primary`, `secondary`, and `danger`.<br>Note: If the `variant` is set to `solid`, the `primar` theme color will be used by default.

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

### Size

:::demo Use `size` to set `Button` size. Three types of sizes are supported: `sm`, `md`, and `lg`, default `md`.

```vue
<template>
  <div class="demo-spacing">
    <d-button size="sm">Small</d-button>
    <d-button>Medium</d-button>
    <d-button size="lg">Large</d-button>
  </div>
</template>
```

:::

### Disabled

:::demo Use the `disabled` parameter to set the status of the button to Disabled. 

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

### Loading

:::demo Use the `loading` parameter to set the status of the button to Loading. 

```vue
<template>
  <d-button variant="solid" :loading="showLoading" @click="handleClick">Click Me</d-button>
</template>
<script>
import { ref } from 'vue';

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

### Icon

:::demo

```vue
<template>
  <div class="demo-spacing">
    <d-button icon="add" variant="solid">New</d-button>
    <d-button icon="filter">Filter</d-button>
    <d-button icon="connect" variant="text">Link</d-button>
    <d-button icon="delete" variant="text" title="Delete"></d-button>
    <d-button shape="round" title="Add">Add</d-button>
    <d-button icon="delete" shape="circle" title="Delete" size="sm"></d-button>
    <d-button icon="delete" shape="circle" title="Delete"></d-button>
    <d-button variant="solid" icon="filter" shape="circle" title="Add" size="lg"></d-button>
  </div>
</template>
```

:::

### Button group

Buttons can be grouped. The size of the button group can be set by `size` and mixed with the dropdown menu.
:::demo

```vue
<template>
  <d-button-group>
    <d-button variant="solid">Button Name</d-button>
    <d-button icon="icon-select-arrow" variant="solid"></d-button>
  </d-button-group>
  
  <p>Size：sm</p>
  <d-button-group size="sm">
    <d-button color="primary" variant="solid">Shanghai</d-button>
    <d-button>Beijing</d-button>
    <d-button>Shenzhen</d-button>
  </d-button-group>

  <p>Size：default</p>
  <d-button-group>
    <d-button color="primary">Shanghai</d-button>
    <d-button>Beijing</d-button>
    <d-button>Shenzhen</d-button>
  </d-button-group>

  <p>Size：lg</p>
  <d-button-group size="lg">
    <d-button color="primary">Shanghai</d-button>
    <d-button>Beijing</d-button>
    <d-button>Shenzhen</d-button>
  </d-button-group>

  <p>Use with dropdown menu</p>
  <d-button-group>
    <d-dropdown style="width: 100px;" :position="position" align="start">
      <d-button>Click Me 1</d-button>
      <template #menu>
        <ul class="list-menu">
          <li class="menu-item">Item 1</li>
          <li class="menu-item">Item 2</li>
          <li class="menu-item">Item 3</li>
          <li class="menu-item">Item 4</li>
        </ul>
      </template>
    </d-dropdown>
    <d-button icon="add" variant="solid">Shanghai</d-button>
    <d-dropdown style="width: 100px;" :position="position" align="start">
      <d-button>Click Me 2</d-button>
      <template #menu>
        <ul class="list-menu">
          <li class="menu-item">Item 1</li>
          <li class="menu-item">Item 2</li>
          <li class="menu-item">Item 3</li>
          <li class="menu-item">Item 4</li>
        </ul>
      </template>
    </d-dropdown>
    <d-button icon="filter">Beijing</d-button>
    <d-dropdown style="width: 100px;" :position="position" align="start">
      <d-button>Click Me 3</d-button>
      <template #menu>
        <ul class="list-menu">
          <li class="menu-item">Item 1</li>
          <li class="menu-item">Item 2</li>
          <li class="menu-item">Item 3</li>
          <li class="menu-item">Item 4</li>
        </ul>
      </template>
    </d-dropdown>
  </d-button-group>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      position: ref(['bottom-start', 'top-start']),
    };
  },
});
</script>
```

:::

### Button Props

| Parameter   | Type                              | Default        | Description                      | Jump to Demo                 |
| :------- | :-------------------------------- | :---------- | :------------------------ | :------------------------ |
| variant  | [IButtonVariant](#ibuttonvariant) | 'outline'   | Optional. Button style.            | [Basic Usage](#basic-usage)             |
| color    | [IButtonColor](#ibuttoncolor)     | 'secondary' | Optional. Button theme.            | [theme color](#theme-color)         |
| size     | [IButtonSize](#ibuttonsize)       | 'md'        | Optional. Button size.            | [size](#size)             |
| icon     | `string`                          | --          | Optional. Customize icons in buttons.      | [icon](#icon)     |
| shape    | [IButtonShape](#ibuttonshape)     | --          | Optional. Button shape(round/rounded). | [shape](#icon)     |
| disabled | `boolean`                         | false       | Optional. Disable button.     | [disabled](#disabled)     |
| loading  | `boolean`                         | false       | Optional. Set status in loading.      | [loading](#loading) |

### Button TypeDefine

#### IButtonVariant

```ts
type IButtonVariant = 'solid' | 'outline' | 'text';
```

#### IButtonSize

```ts
type IButtonSize = 'lg' | 'md' | 'sm';
```

#### IButtonColor

```ts
type IButtonColor = 'primary' | 'secondary' | 'danger';
```

#### IButtonShape

```ts
type IButtonShape = 'circle' | 'round';
```

### ButtonGroup Props

| Parameter | Type                             | Default | Description             | Jump to Demo         |
| :----- | :------------------------------- | :--- | :--------------- | :---------------- |
| size   | [IButtonSize](#iButtonGroupSize) | 'md' | Optional. Button group size. | [button group](#button-group) |

### ButtonGroup TypeDefine

#### IButtonGroupSize

```ts
type IButtonGroupSize = 'lg' | 'md' | 'sm';
```
