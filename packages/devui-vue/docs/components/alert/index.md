# Alert 警告

显示警告信息，需要用户关注的信息的组件。

#### 何时使用

当页面需要向用户发出警告信息时。

### 基本用法

共有四种样式：success、danger、warning、info。

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

### 可关闭的提示

显示关闭按钮，点击可关闭提示。

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
      console.log($event);
    };
    return {
      handleClose,
    };
  },
};
</script>
<style>
.alert-demo-2 .devui-alert {
  margin-bottom: 20px;
}
</style>
```

:::

### 不使用默认图标

不使用默认的类型图标。

:::demo

```vue
<template>
  <div class="alert-demo-3">
    <d-alert type="success" :show-icon="false">success</d-alert>
    <d-alert type="danger" :show-icon="false">danger</d-alert>
    <d-alert type="warning" :show-icon="false">warning</d-alert>
    <d-alert type="info" :show-icon="false">info</d-alert>
    <d-alert type="simple" :show-icon="false">simple</d-alert>
  </div>
</template>
<style>
.alert-demo-3 .devui-alert {
  margin-bottom: 20px;
}
</style>
```

:::

### Alert 参数

| 参数名       | 类型                    | 默认   | 说明                                    | 跳转 Demo                         |
| :----------- | :---------------------- | :----- | :-------------------------------------- | :-------------------------------- |
| type         | [AlertType](#alerttype) | 'info' | 必选，指定警告提示的样式                | [基本用法](#基本用法)             |
| css-class    | `string`                | --     | 可选，自定义 class 名                   |
| closeable    | `boolean`               | true   | 可选，默认显示关闭按钮                  | [基本用法](#可关闭的提示)         |
| dismiss-time | `number`                | --     | 可选，自动关闭 alert 的延迟时间（`ms`） |
| show-icon    | `boolean`               | true   | 可选，是否使用默认的类型图标            | [不使用默认图标](#不使用默认图标) |

### Alert 事件

| 事件名 | 类型                           | 说明                       | 跳转 Demo                     |
| :----- | :----------------------------- | :------------------------- | :---------------------------- |
| close  | `(event?: MouseEvent) => void` | 可选，关闭时触发的回调函数 | [可关闭的提示](#可关闭的提示) |

### Alert 类型定义

#### AlertType

默认值为'info'， 指定 alert 警告提示的类型

```ts
type AlertType = 'success' | 'danger' | 'warning' | 'info' | 'simple';
```
