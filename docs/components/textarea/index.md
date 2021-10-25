# Textarea 多行文本框

文本输入区域。

### 何时使用

需要手动输入文字，并且文字内容较多时使用。

### 基本用法

:::demo

```vue
<template>
  <h4 style="margin: 10px 0">Default</h4>

  <d-textarea placeholder="Please Enter" autoFocus id="textArea"></d-textarea>

  <h4 style="margin: 10px 0">Disabled</h4>

  <d-textarea
    resize="vertical"
    placeholder="Please Enter"
    :disabled="true"
  ></d-textarea>

  <h4 style="margin: 10px 0">Error</h4>

  <d-textarea
    resize="vertical"
    placeholder="Please Enter1"
    :error="true"
    cssClass="dinput"
  ></d-textarea>
</template>
<style>
.dinput {
  width: 200px;
}
</style>
```

:::

### d-textarea

d-textarea 参数

| 参数 | 类型 | 默认 | 说明 | 跳转 Demo | 全局配置项 |
| ---- | ---- | ---- | ---- | --------- | ---------- |
|      |      |      |      |           |            |
|      |      |      |      |           |            |
|      |      |      |      |           |            |

d-textarea 事件

| 事件 | 类型 | 说明 | 跳转 Demo |
| ---- | ---- | ---- | --------- |
|      |      |      |           |
|      |      |      |           |
|      |      |      |           |
