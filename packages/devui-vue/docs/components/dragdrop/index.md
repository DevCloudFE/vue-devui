# Dragdrop 拖拽

拖拽组件。

#### 何时使用

当需要进行元素拖拽、元素拖拽排序等场景。

### Sortable 基本用法

容器内拖拽排序。

:::demo

```vue
<template>
  <div
    class="card-container"
    v-d-sortable="{
      list: list,
      drop: onDrop,
    }"
  >
    <div class="card-item" v-for="item in list" :key="item.id">
      <h2 class="card-title">{{ item.title }}</h2>
      <span class="card-description">{{ item.des }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const list = ref([
      { id: '1', title: 'Project1', des: 'Project Description' },
      { id: '2', title: 'Project2', des: 'Project Description' },
      { id: '3', title: 'Project3', des: 'Project Description' },
      { id: '4', title: 'Project4', des: 'Project Description' },
      { id: '5', title: 'Project5', des: 'Project Description' },
      { id: '6', title: 'Project6', des: 'Project Description' },
      { id: '7', title: 'Project7', des: 'Project Description' },
      { id: '8', title: 'Project8', des: 'Project Description' },
    ]);

    const onDrop = (event) => {
      console.log(event);
    };

    return {
      list,
      onDrop,
      msg: 'DragDrop 拖拽 组件文档示例',
    };
  },
});
</script>

<style>
div.card-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.card-item {
  width: 200px;
  height: 100px;
  margin: 4px;
  padding: 12px 20px;
  background-color: var(--devui-global-bg, #f3f6f8);
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: grab;
}

.card-item h2 {
  margin: 0;
  padding: 0;
  line-height: 1.5;
  border: none;
}

.card-item .card-description {
  margin-top: 8px;
}

.card-item.devui-drag-item {
  border: 1px solid var(--devui-primary, #5e7ce0);
}
</style>
```

:::

### Sortable 指定可拖拽区域

容器内拖拽排序指定拖拽元素。

:::demo

```vue
<template>
  <div
    class="list-container"
    v-d-sortable="{
      list: list,
      handle: '.drag-handle',
      drop: onDrop,
      dragClass: 'my-list-drag-item',
    }"
  >
    <div class="list-item" v-for="item in list" :key="item.id">
      <i class="icon icon-drag drag-handle"></i>
      <d-input v-model="item.value" :placeholder="item.placeholder"></d-input>
    </div>
  </div>
  <d-button variant="solid" class="submit-btn" @click="onSubmit">Submit</d-button>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const list = ref([
      { id: '1', placeholder: 'Project1', value: '' },
      { id: '2', placeholder: 'Project2', value: '' },
      { id: '3', placeholder: 'Project3', value: '' },
      { id: '4', placeholder: 'Project4', value: '' },
      { id: '5', placeholder: 'Project5', value: '' },
      { id: '6', placeholder: 'Project6', value: '' },
    ]);

    const onDrop = (event) => {
      console.log(event);
    };

    const onSubmit = () => {
      console.log(list.value);
    };

    return {
      list,
      onDrop,
      onSubmit,
      msg: 'Dragdrop 拖拽 组件文档示例',
    };
  },
});
</script>

<style>
.list-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.list-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  margin: 4px 0;
  padding: 4px 8px;
  background-color: var(--devui-global-bg, #f3f6f8);
  border: 1px solid transparent;
  border-radius: 4px;
}

.list-item .drag-handle {
  cursor: grab;
}

.list-item > i {
  margin-right: 4px;
}

.list-item.my-list-drag-item {
  border: 1px solid var(--devui-primary, #5e7ce0);
}

.submit-btn {
  margin-top: 8px;
}
</style>
```

:::

### Sortable 参数

| 参数      | 类型   | 默认              | 说明                                                   | 跳转 Demo                                           |
| --------- | ------ | ----------------- | ------------------------------------------------------ | --------------------------------------------------- |
| list      | any    | --                | 可选，排序绑定的数据（拖拽排序后将自动变更）           | [Sortable-基本用法](#sortable-基本用法)             |
| handle    | string | --                | 可选，限制可拖拽的元素，注意这里为为 css 选择器 string | [Sortable-指定可拖拽区域](#sortable-指定可拖拽区域) |
| dragClass | string | 'devui-drag-item' | 可选，拖拽中元素附加的 class                           | [Sortable-指定可拖拽区域](#sortable-指定可拖拽区域) |

### Sortable 事件

| 事件      | 类型                      | 说明                                                                            | 跳转 Demo                               |
| --------- | ------------------------- | ------------------------------------------------------------------------------- | --------------------------------------- |
| dragStart | EventEmitter\<DragEvent\> | 开始拖动的 DragStart 事件                                                       | [Sortable-基本用法](#sortable-基本用法) |
| dragEnd   | EventEmitter\<DragEvent\> | 拖动结束的 DragEnd 事件                                                         | [Sortable-基本用法](#sortable-基本用法) |
| dragEnter | EventEmitter\<DragEvent\> | drag 元素进入的 dragenter 事件                                                  | [Sortable-基本用法](#sortable-基本用法) |
| dragOver  | EventEmitter\<DragEvent\> | drag 元素在 drop 区域上的 dragover 事件                                         | [Sortable-基本用法](#sortable-基本用法) |
| dragLeave | EventEmitter\<DragEvent\> | drag 元素离开的 dragleave 事件                                                  | [Sortable-基本用法](#sortable-基本用法) |
| drop      | EventEmitter\<DropEvent\> | 放置一个元素, 接收的事件，其中 nativeEvent 表示原生的 drop 事件，其他见定义注释 | [Sortable-基本用法](#sortable-基本用法) |

### Sortable 类型定义

#### DropEvent

```ts
type DropEvent = {
  event: DragEvent; // 原生drag事件
  list: any; // 当前绑定的list（与传入list为同一对象）
  fromIndex: number; // 拖拽开始的元素index
  targetIndex: number; // drop到的元素的index
};
```
