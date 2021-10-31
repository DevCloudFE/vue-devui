# Dragdrop 拖拽

拖拽组件。

### 何时使用

当需要使用数个操作步骤，且步骤的顺序需要灵活调整时。

### 基本用法

:::demo 从一个container拖动到另外一个container。

```vue
<template>
  <div>
    <div id="draggable-item" class="draggable-item" v-d-draggable="{
      dragScope: 'default-css',
      dragData: { item: 'item', parent: 'list1' },
    }">拖拽区</div>
    <div class="droppable-item" v-d-droppable>放置区</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      msg: 'Dragdrop 拖拽 组件文档示例'
    }
  }
})
</script>

<style class="scss">
.draggable-item {
  padding: 0 16px;
  height: 30px;
  border: 1px solid #5e7ce0;
  border: 1px solid var(--devui-brand,#5e7ce0);
  color: #fff;
  color: var(--devui-light-text,#fff);
  margin-bottom: 5px;
  line-height: 1.5;
  background-color: #5e7ce0;
  background-color: var(--devui-brand,#5e7ce0);
  display: flex;
  align-items: center;
}
</style>
```

:::

### d-draggable 指令

d-draggable 参数

| 参数 | 类型 | 默认 | 说明 | 跳转 Demo | 全局配置项 |
| ---- | ---- | ---- | ---- | --------- | --------- |
|   dragData   |   any   |   --   |   可选，转递给 DropEvent事件的数据   |      [基本用法](#基本用法)     |           |
|   dragScope   |   string \| Array\<string\>   |   'default'   |   可选，限制 drop 的位置，必须匹配对应的 dropScope   |      [基本用法](#基本用法)     |           |

d-draggable 事件

| 事件 | 类型 | 说明 | 跳转 Demo |
| ---- | ---- | ---- | --------- |
|   dragStartEvent   |   EventEmitter\<DragEvent\>   |   开始拖动的 DragStart 事件   |      [基本用法](#基本用法)     |
|   dragEndEvent   |   EventEmitter\<DragEvent\>   |   拖动结束的 DragEnd 事件   |      [基本用法](#基本用法)     |
|   dropEndEvent   |   EventEmitter\<DragEvent\>   |   放置结束的 Drop 事件   |      [基本用法](#基本用法)     |

### d-droppable 指令

d-droppable 参数

| 参数 | 类型 | 默认 | 说明 | 跳转 Demo | 全局配置项 |
| ---- | ---- | ---- | ---- | --------- | --------- |
|   dropScope   |   string | Array\<string\>   |   'default'   |   可选，限制 drop 的区域，对应 dragScope   |     [基本用法](#基本用法)      |           |

d-droppable 事件

| 事件 | 类型 | 说明 | 跳转 Demo |
| ---- | ---- | ---- | --------- |
|   dragEnterEvent   |   EventEmitter\<DragEvent\>   |   drag 元素进入的 dragenter 事件   |     [基本用法](#基本用法)      |
|   dragOverEvent   |   EventEmitter\<DragEvent\>   |   drag 元素在 drop 区域上的 dragover 事件   |     [基本用法](#基本用法)      |
|   dragLeaveEvent   |   EventEmitter\<DragEvent\>   |   drag 元素离开的 dragleave 事件   |     [基本用法](#基本用法)      |
|   dropEvent   |   EventEmitter\<DropEvent\>   |   放置一个元素, 接收的事件，其中 nativeEvent 表示原生的 drop 事件，其他见定义注释   |      [基本用法](#基本用法)     |


