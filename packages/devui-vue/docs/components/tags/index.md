# Tags 标签

标签展示组件。

## 何时使用

用户需要展示多个标签时。

## 基本用法

:::demo 由`type`属性来选择 tag 的类型，也可以通过`color`属性来自定义背景色

```vue
<template>
  <d-tags>标签一</d-tags>
  <d-tags type="primary">标签二</d-tags>
  <d-tags type="success">标签三</d-tags>
  <d-tags type="warning">标签四</d-tags>
  <d-tags type="danger">标签五</d-tags>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      msg: 'Tags 标签 组件文档示例'
    }
  }
})
</script>

<style></style>
```

:::

## API

### Props

| 参数  |   类型   | 默认值  |        说明        |              可选值              |    跳转至 Demo    |
| :---: | :------: | :-----: | :----------------: | :------------------------------: | :---------------: |
| type  | `string` | defalut |  可选，标签的类型  | `success\|info\|warning\|danger` | [示例](#基本用法) |
| color | `string` |   ''    | 可选，标签的主题色 |                                  |                   |

### Event

| 名称          | 说明                              |
| :------------ | --------------------------------- |
| tagDelete     | 删除 tag 的时候触发的事件         |
| checkedChange | tag 的 check 状态改变时触发的事件 |
