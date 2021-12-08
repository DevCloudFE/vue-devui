# Alert

Display warnings to users.

### When To Use

When the page needs to send a warning message to users.

### Basic Usage

There are 4 types of Alert: success, danger, warning, info.

:::demo

```vue
<template>
  <div class="alert-demo-1">
    <d-alert type="success" :closeable="false">success</d-alert>
    <d-alert type="danger" :closeable="false">danger</d-alert>
    <d-alert type="warning" :closeable="false">warning</d-alert>
    <d-alert type="info" :closeable="false">info</d-alert>
    <d-alert type="simple" :closeable="false">simple</d-alert>
  </div>
</template>
<style>
.alert-demo-1 .devui-alert {
  margin-bottom: 20px;
}
</style>
```

:::

### Closable Prompt

The close button is displayed. Click to close the prompt.

:::demo

```vue
<template>
  <div class="alert-demo-2">
    <d-alert type="success" @close="handleClose">success</d-alert>
    <d-alert type="danger" @close="handleClose">danger</d-alert>
    <d-alert type="warning" @close="handleClose">warning</d-alert>
    <d-alert type="info" @close="handleClose">info</d-alert>
    <d-alert type="simple" @close="handleClose">simple</d-alert>
  </div>
</template>
<script>
export default {
  setup() {
    const handleClose = ($event) => {
      console.log($event)
    }
    return {
      handleClose
    }
  }
}
</script>
<style>
.alert-demo-2 .devui-alert {
  margin-bottom: 20px;
}
</style>
```

:::

### Without Icon

Without Icon.

:::demo

```vue
<template>
  <div class="alert-demo-3">
    <d-alert type="success" :showIcon="false">success</d-alert>
    <d-alert type="danger" :showIcon="false">danger</d-alert>
    <d-alert type="warning" :showIcon="false">warning</d-alert>
    <d-alert type="info" :showIcon="false">info</d-alert>
    <d-alert type="simple" :showIcon="false">simple</d-alert>
  </div>
</template>
<style>
.alert-demo-3 .devui-alert {
  margin-bottom: 20px;
}
</style>
```

:::

### API

### d-alert Attributes

| Attribute   | Type                      | Default | Description                                        | Jump to Demo                    |
| ----------- | ------------------------- | ------- | -------------------------------------------------- | ------------------------------- |
| type        | [`AlertType`](#AlertType) | 'info'  | Required. Specify the style of the warning prompt  | [Basic Usage](#basic-usage)     |
| cssClass    | `string`                  | --      | Optional. Customize className                      |
| closeable   | `boolean`                 | true    | Optional. The close button is displayed by default | [Basic Usage](#closable-prompt) |
| dismissTime | `number`                  | --      | Optional. Toggle off the delay time of Alert(`ms`) |
| showIcon    | `boolean`                 | true    | Optional. Whether to use the default type icon     | [Without Icon](#without-icon)   |

### d-alert Events

| Event Name | Type                           | Description                                | Jump to Demo                        |
| ---------- | ------------------------------ | ------------------------------------------ | ----------------------------------- |
| close      | `(event?: MouseEvent) => void` | Optional, triggers when click close button | [Closable Prompt](#closable-prompt) |

### Interface & Types

**AlertType**

The default value is 'info', which specifies the type of alert warning.

```ts
export type AlertType = 'success' | 'danger' | 'warning' | 'info' | 'simple'
```
