# Tag 标签

标签展示组件。

### 何时使用

用户需要展示多个标签时。

### 基本用法

:::demo 由`type`属性来选择 tag 的类型，也可以通过`color`属性来自定义主题色

```vue
<template>
  <div>
    <d-tag>标签一</d-tag>
    <d-tag type="primary">标签二</d-tag>
    <d-tag type="success">标签三</d-tag>
    <d-tag type="warning">标签四</d-tag>
    <d-tag type="danger">标签五</d-tag>
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
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      msg: 'Tag 标签 组件文档示例'
    }
  }
})
</script>

<style></style>
```

:::

### 可被选中

:::demo 由`checked`属性来设置 tag 选中的初始状态，可通过监听点击事件来改变`checked`的值

```vue
<template>
  <div>
    <d-tag type="primary" :checked="isChecked" @click="tagClick">标签二</d-tag>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const isChecked = ref(true)
    const tagClick = () => {
      isChecked.value = !isChecked.value
    }
    return { isChecked, tagClick }
  }
})
</script>

<style></style>
```

:::

### API

#### Props

|  参数   |   类型    |  默认值   |                    说明                     |              可选值              |    跳转至 Demo    |
| :-----: | :-------: | :-------: | :-----------------------------------------: | :------------------------------: | :---------------: |
|  type   | `string`  | 'defalut' | 可选，标签的类型，指定类型后则 color 不生效 | `success\|info\|warning\|danger` | [示例](#基本用法) |
|  color  | `string`  |    ''     |             可选，标签的主题色              |                                  |                   |
| checked | `boolean` |   false   |       可选，可选，标签选中的初始状态        |          `true\|false`           | [示例](#基本用法) |

#### Event

| 名称          | 说明                              |
| :------------ | --------------------------------- |
| click         | 点击tag 的时候触发的事件          |
| tagDelete     | 删除 tag 的时候触发的事件         |
| checkedChange | tag 的 check 状态改变时触发的事件 |
