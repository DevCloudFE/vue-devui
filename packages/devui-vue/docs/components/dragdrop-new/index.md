# DragDrop 2.0 拖拽

#### 何时使用

拖拽组件

### 基本用法

从一个 container 拖动到另外一个 container，并支持排序。

:::demo

```vue
<script>
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
    const data = reactive({
      list1: [{ name: 'Visual Studio Code' }, { name: 'WebStorm' }, { name: 'Sublime' }, { name: 'Atom (disabled)', disabled: true }],
      list2: [],
      list3: [],
    });

    function onDrop(e, targetArray) {
      let index = e.dropIndex;
      const fromIndex = e.dragFromIndex;
      const item = e.dragData.item;
      if (-1 !== index) {
        /* 修正同一个container排序，往下拖动index多了1个位置*/
        if (-1 !== fromIndex && index > fromIndex) {
          index--;
        }
        targetArray.splice(index, 0, fromIndex === -1 ? item : targetArray.splice(fromIndex, 1)[0]);
      } else {
        targetArray.push(item);
      }
      if (fromIndex === -1) {
        removeItem(item, e.dragData.parent);
      }
    }

    function removeItem(item, list) {
      const index = list
        .map(function (e) {
          return e.name;
        })
        .indexOf(item.name);
      list.splice(index, 1);
    }

    function log(...v) {
      console.log(...v);
    }

    return { log, removeItem, onDrop, data };
  },
});
</script>

<template>
  <div class="demo1">
    <div class="row">
      <div class="col-sm-3">
        <div class="card">
          <div class="card-header">Draggable Item</div>
          <div class="card-block">
            <ul class="list-group">
              <li
                v-dDraggable="{
                  dragScope: 'default-css',
                  dragData: { item: item, parent: data.list1 },
                  disabled: item.disabled,
                  '@dragStartEvent': log,
                  '@dragEndEvent': log,
                  '@dragEndEvent': log,
                }"
                v-for="item in data.list1"
                :class="['list-group-item over-flow-ellipsis', { disabled: item.disabled }]"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div
          class="card card-outline-primary mb-3"
          v-dDroppable="{
            dropScope: 'default-css',
            '@dropEvent': function (e) {
              onDrop(e, data.list2);
            },
            '@dragEnterEvent': log,
            '@dragOverEvent': log,
            '@dragLeaveEvent': log,
          }"
        >
          <div class="card-header">Drop Area With Sortable Function</div>
          <div class="card-block">
            <ul class="list-group d-drop-el" v-dSortable>
              <li
                v-dDraggable="{
                  dragScope: 'default-css',
                  dragData: { item: item, parent: data.list2 },
                  disabled: item.disabled,
                }"
                v-for="item in data.list2"
                :class="['list-group-item over-flow-ellipsis', { disabled: item.disabled }]"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div
          class="card card-outline-primary mb-3"
          v-dDroppable="{
            dropScope: 'default-css',
            '@dropEvent': function (e) {
              onDrop(e, data.list3);
            },
            '@dragEnterEvent': log,
            '@dragOverEvent': log,
            '@dragLeaveEvent': log,
          }"
        >
          <div class="card-header">Drop Area Without Sortable Function</div>
          <div class="card-block">
            <ul class="list-group drop-el">
              <li
                v-dDraggable="{
                  dragScope: 'default-css',
                  dragData: { item: item, parent: data.list3 },
                  disabled: item.disabled,
                }"
                v-for="item in data.list3"
                :class="['list-group-item over-flow-ellipsis', { disabled: item.disabled }]"
              >
                <div>
                  {{ item.name }}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.demo1 {
  .row {
    overflow: hidden;
  }

  .col-sm-3 {
    float: left;
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    min-width: 220px;
    width: 220px;
  }

  .list-group .list-group-item {
    padding: 0 16px;
    border-radius: 4px;
  }

  .drag-border {
    border: var(--devui-brand) dashed 1px;
  }

  .drag-handle {
    cursor: move;

    /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
  }

  .drag-handle:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }

  .drag-hint-border {
    border: var(--devui-success) dashed 2px;
  }

  .drag-over-border {
    border: var(--devui-warning) dashed 2px;
  }

  .card {
    border: 1px solid var(--devui-dividing-line);
  }

  .card .card-header {
    font-size: var(--devui-font-size);
    padding: 10px;
  }

  .list-group {
    margin-bottom: 20px;
    padding: 10px;
  }

  .list-group > li {
    height: 30px;
    border: 1px solid var(--devui-brand);
    color: var(--devui-text);
    margin-bottom: 5px;
    line-height: 1.5;
    background-color: var(--devui-base-bg);
    display: flex;
    align-items: center;
  }

  li.list-group-item.disabled {
    border-color: var(--devui-line);
    color: var(--devui-disabled-text);
    background-color: var(--devui-disabled-bg);
  }
}
</style>
```

:::

### 多层树状拖拽

排序允许拖拽到元素上，支持层级嵌套。

:::demo

```vue
<script>
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'demo-item',
  props: {
    parentItem: Object,
  },
  setup() {
    const data = reactive({
      list1: [{ name: 'Visual Studio Code' }, { name: 'Sublime' }, { name: 'Atom' }],
      list2: [{ name: 'WebStorm', children: [{ name: 'notepad++' }] }],
    });

    function onDrop(e, list) {
      const target = list;
      const item = e.dragData.item;
      const parent = e.dragData.parentList;
      const indexOfParent = e.dragData.index;
      const dropIndex = e.dropIndex;
      const fromIndex = e.dragFromIndex;
      const dropOnItem = e.dropOnItem;

      // 同表排序的情况下index会有变化, 跨表不会有变化
      let index = dropIndex;
      if (target === parent && dropIndex > fromIndex) {
        index--;
      }
      // 源数组移除
      parent.splice(indexOfParent, 1);
      // 插入
      if (dropOnItem) {
        target[index].children = target[index].children || [];
        target[index].children.push(item);
        return;
      }
      if (index < 0) {
        target.push(item);
        return;
      }
      target.splice(index, 0, item);
    }

    return { onDrop, data };
  },
});
</script>
<template>
  <div class="demo2" v-if="!parentItem">
    <div class="row">
      <div class="col-sm-3">
        <div class="card">
          <div class="card-header">Draggable Items</div>
          <div class="card-block">
            <ul class="list-group">
              <li
                v-for="(item, i) in data.list1"
                v-dDraggable="{
                  dragScope: 'drop-area',
                  dragData: { item: item, parentList: data.list1, index: i },
                }"
                class="list-group-item"
              >
                <div class="name">{{ item.name }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div
          class="card card-outline-primary mb-3"
          v-dDroppable="{
            dropScope: 'drop-area',
            allowDropOnItem: true,
            nestingTargetRect: { height: 30 },
            dragOverItemClass: 'drag-over-item',
            '@dropEvent': (e) => {
              onDrop(e, data.list2);
            },
          }"
        >
          <div class="card-header">Tree Sortable Area</div>
          <div class="card-block">
            <ul class="list-group d-drop-el" v-dSortable>
              <li
                v-for="(item, i) of data.list2"
                v-dDraggable="{
                  dragScope: 'drop-area',
                  dragHandleClass: 'drag-handle',
                  dragData: { item: item, parentList: data.list2, index: i },
                }"
              >
                <div class="name">
                  {{ item.name }}
                </div>
                <demo-item v-if="item.children && item.children.length > 0" :parentItem="item"></demo-item>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ul
    class="list-group list-group-child"
    v-if="parentItem"
    v-dSortable
    v-dDroppable="{
      dropScope: 'drop-area',
      allowDropOnItem: true,
      nestingTargetRect: { height: 30 },
      dragOverItemClass: 'drag-over-item',
      '@dropEvent': (e) => onDrop(e, parentItem.children),
    }"
  >
    <li
      v-for="(item, i) of parentItem.children"
      v-dDraggable="{
        dragHandleClass: 'drag-handle',
        dragScope: 'drop-area',
        dragData: { item: item, parentList: parentItem.children, index: i },
      }"
    >
      <div class="name">
        {{ item.name }}
      </div>
      <demo-item v-if="item.children && item.children.length > 0" :parentItem="item"></demo-item>
    </li>
  </ul>
</template>
<style lang="scss">
.demo2 {
  .row {
    overflow: hidden;
  }

  ul {
    list-style: none;
    margin: 0;
  }

  .col-sm-3 {
    float: left;
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    min-width: 220px;
    width: 220px;
  }

  .list-group .list-group-item {
    padding: 0 16px;
  }

  .drag-border {
    border: var(--devui-brand) dashed 1px;
  }

  .drag-handle {
    cursor: move;

    /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
  }

  .drag-handle:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }

  .drag-hint-border {
    border: var(--devui-success) dashed 2px;
  }

  .drag-over-border {
    border: var(--devui-warning) dashed 2px;
  }

  .card {
    border: 1px solid var(--devui-dividing-line);
  }

  .card .card-header {
    font-size: var(--devui-font-size-card-title);
    padding: 10px;
  }

  .list-group {
    padding: 5px;
    margin-bottom: 20px;
  }

  .list-group.list-group-child {
    padding: 5px 0 5px 5px;
    margin-left: 15px;
    margin-bottom: 5px;
  }

  .list-group > li {
    padding: 0;
    margin-bottom: 5px;
  }

  .list-group-child > li > .name {
    background-color: var(--devui-base-bg);
  }

  .list-group > li > .name {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 10px;
    height: 30px;
    border: 1px solid var(--devui-brand);
    color: var(--devui-text);
    line-height: 1.5;
    background-color: var(--devui-base-bg);
    display: flex;
    align-items: center;
    border-radius: 4px;
  }

  .list-group > li.drag-over-item > .name {
    background-color: var(--devui-list-item-active-bg);
    color: var(--devui-list-item-active-text);
  }
}
</style>
```

:::

### 拖拽实体元素跟随

允许拖拽时候非半透明元素跟随。也可以使用 appendToBody：当拖拽离开后源位置的父对象会被销毁的话，需要把克隆体附着到 body 上防止被销毁。 默认会通过复制样式保证克隆到 body 的实体的样式是正确的，但部分深度依赖 DOM 节点位置的样式和属性可能会失败，需要手动调整部分样式。

:::demo

```vue
<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const data = reactive({
      list1: [{ name: 'Visual Studio Code' }, { name: 'WebStorm' }, { name: 'Sublime' }, { name: 'Atom' }],
      list2: [],
    });

    const appendToBody = ref(false);

    function onDrop(e) {
      let index = e.dropIndex;
      const fromIndex = e.dragFromIndex;
      if (-1 !== index) {
        /* 修正同一个container排序，往下拖动index多了1个位置*/
        if (-1 !== fromIndex && index > fromIndex) {
          index--;
        }
        data.list2.splice(index, 0, fromIndex === -1 ? e.dragData : data.list2.splice(fromIndex, 1)[0]);
      } else {
        data.list2.push(e.dragData);
      }
      if (fromIndex === -1) {
        removeItem(e.dragData, data.list1);
      }
    }

    function removeItem(item, list) {
      const index = list
        .map(function (e) {
          return e.name;
        })
        .indexOf(item.name);
      list.splice(index, 1);
    }
    return { onDrop, data, appendToBody };
  },
});
</script>
<template>
  <div class="demo3">
    <div class="row">
      <div class="col-sm-3">
        <div class="card">
          <div class="card-header">Draggable Items</div>
          <div class="card-block">
            <ul class="list-group">
              <li
                v-dDraggable="{
                  enableDragFollow: true,
                  dragFollowOptions: { appendToBody: appendToBody },
                  dragOverClass: 'box-shadow',
                  dragScope: 'default-css',
                  dragData: item,
                }"
                v-for="item in data.list1"
                class="list-group-item over-flow-ellipsis"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div
          class="card card-outline-primary mb-3"
          v-dDroppable="{
            dropScope: 'default-css',
            '@dropEvent': ($event) => onDrop($event),
          }"
        >
          <div class="card-header">Drop Area with Sortable</div>
          <div class="card-block">
            <ul class="list-group d-drop-el" v-dSortable>
              <li
                v-dDraggable="{
                  enableDragFollow: true,
                  dragFollowOptions: { appendToBody: appendToBody },
                  dragOverClass: 'box-shadow',
                  dragScope: 'default-css',
                  dragHandleClass: 'drag-handle',
                  dragData: item,
                }"
                v-for="item in data.list2"
                class="list-group-item over-flow-ellipsis"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="option">
      <div class="option-toggle">
        <d-switch v-model="appendToBody"></d-switch>
        <span style="margin-left: 8px">appendToBody</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.demo3 {
  .row {
    overflow: hidden;
  }

  .col-sm-3 {
    float: left;
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    min-width: 220px;
    width: 220px;
  }

  .list-group .list-group-item {
    padding: 0 16px;
    border-radius: 4px;
  }

  .box-shadow {
    box-shadow: var(--devui-shadow-length-hover) var(--devui-hover-shadow);
    border-right: 10px red solid;
    border-bottom: 12px red solid;
  }

  .drag-border {
    border: var(--devui-brand) dashed 1px;
  }

  .drag-handle {
    cursor: move;

    /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
  }

  .drag-handle:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }

  .drag-hint-border {
    border: var(--devui-success) dashed 2px;
  }

  .drag-over-border {
    border: var(--devui-warning) dashed 2px;
  }

  .card {
    border: 1px solid var(--devui-dividing-line);
  }

  .card .card-header {
    font-size: var(--devui-font-size-card-title);
    padding: 10px;
  }

  .list-group {
    padding: 10px;
  }

  .list-group > li {
    height: 30px;
    border: 1px solid var(--devui-brand);
    color: var(--devui-text);
    margin-bottom: 5px;
    line-height: 1.5;
    background-color: var(--devui-base-bg);
    display: flex;
    align-items: center;
  }

  .option {
    line-height: 1.5;
    vertical-align: middle;
    margin-top: 20px;

    .option-toggle {
      margin-bottom: 8px;
    }
  }

  .option > d-toggle {
    display: inline-block;
    transform: translateY(3px);
  }
}
</style>
```

:::

### 越边交换

设置 switchWhileCrossEdge 允许越过边缘的时候交换。注意：不可与 dropOnItem 一起用，dropOnItem 为 true 的时候无效。

:::demo

```vue
<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const data = reactive({
      list: [{ name: 'Visual Studio Code' }, { name: 'WebStorm' }, { name: 'Sublime' }, { name: 'Atom' }],
    });

    function onDrop(e) {
      let index = e.dropIndex;
      const fromIndex = e.dragFromIndex;
      if (-1 !== index) {
        /* 修正同一个container排序，往下拖动index多了1个位置*/
        if (-1 !== fromIndex && index > fromIndex) {
          index--;
        }
        data.list.splice(index, 0, fromIndex === -1 ? e.dragData : data.list.splice(fromIndex, 1)[0]);
      } else {
        data.list.push(e.dragData);
      }
    }
    return { onDrop, data };
  },
});
</script>
<template>
  <div class="demo4">
    <div class="row">
      <div class="col-sm-3">
        <div
          class="card card-outline-primary mb-3"
          v-dDroppable="{
            switchWhileCrossEdge: true,
            dropScope: 'default-switch',
            '@dropEvent': onDrop,
          }"
        >
          <div class="card-header">Drag Drop Sort Area</div>
          <div class="card-block">
            <ul class="list-group drop-el" v-dSortable>
              <li
                v-dDraggable="{
                  dragScope: 'default-switch',
                  dragHandleClass: 'drag-handle',
                  dragData: item,
                }"
                v-for="item in data.list"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.demo4 {
  .row {
    overflow: hidden;
  }

  .col-sm-3 {
    float: left;
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    min-width: 220px;
    width: 220px;
  }

  .list-group .list-group-item {
    padding: 0 16px;
    border-radius: 4px;
  }

  .drag-border {
    border: var(--devui-brand) dashed 1px;
  }

  .drag-handle {
    cursor: move;

    /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
  }

  .drag-handle:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }

  .drag-hint-border {
    border: var(--devui-success) dashed 2px;
  }

  .drag-over-border {
    border: var(--devui-warning) dashed 2px;
  }

  .card {
    border: 1px solid var(--devui-dividing-line);
  }

  .card .card-header {
    font-size: var(--devui-font-size-card-title);
    padding: 10px;
  }

  .list-group {
    padding: 10px;
  }

  .list-group > li {
    height: 30px;
    border: 1px solid var(--devui-brand);
    color: var(--devui-text);
    margin-bottom: 5px;
    line-height: 1.5;
    background-color: var(--devui-base-bg);
    display: flex;
    align-items: center;
  }
}
</style>
```

:::

### 外部放置位置：就近，前面，后面

使用 defaultDropPostion 配置排序器之外的区域拖拽元素放下的时候默认加到列表的前面或者后面，默认为就近('closest')。

:::demo

```vue
<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const data = reactive({
      list1: [{ name: 'Visual Studio Code' }],
      list2: [{ name: 'WebStorm' }],
      list3: [{ name: 'Sublime' }],
      list4: [{ name: 'Atom' }],
    });

    function onDrop(e, targetArray) {
      let index = e.dropIndex;
      const fromIndex = e.dragFromIndex;
      const parentArray = e.dragData.parent;
      const item = e.dragData.item;
      if (-1 !== index) {
        if (-1 !== fromIndex && index > fromIndex) {
          index--;
        }
        targetArray.splice(index, 0, fromIndex === -1 ? item : targetArray.splice(fromIndex, 1)[0]);
      } else {
        targetArray.push(item);
      }
      if (fromIndex === -1) {
        removeItem(item, parentArray);
      }
    }

    function removeItem(item, list) {
      const index = list
        .map(function (e) {
          return e.name;
        })
        .indexOf(item.name);
      list.splice(index, 1);
    }
    return { onDrop, data };
  },
});
</script>
<template>
  <div class="demo5">
    <div class="row">
      <div class="col-sm-3">
        <div class="card">
          <div class="card-header">Items</div>
          <div class="card-block">
            <ul class="list-group">
              <li
                v-dDraggable="{
                  dragScope: 'default-position',
                  dragHandleClass: 'drag-handle',
                  dragData: { item: item, parent: data.list1 },
                }"
                v-for="item in data.list1"
                class="list-group-item over-flow-ellipsis"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div
          class="card card-outline-primary mb-3"
          v-dDroppable="{
            switchWhileCrossEdge: true,
            dropScope: 'default-position',
            defaultDropPosition: 'before',
            '@dropEvent': (e) => onDrop(e, data.list2),
          }"
        >
          <div class="card-header">Drop here to add to the top</div>
          <div class="card-block">
            <ul class="list-group drop-el" v-dSortable>
              <li
                v-dDraggable="{
                  dragScope: 'default-position',
                  dragHandleClass: 'drag-handle',
                  dragData: { item: item, parent: data.list2 },
                }"
                v-for="item in data.list2"
                class="list-group-item over-flow-ellipsis"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div
          class="card card-outline-primary mb-3"
          v-dDroppable="{
            switchWhileCrossEdge: true,
            dropScope: 'default-position',
            defaultDropPosition: 'after',
            '@dropEvent': (e) => onDrop(e, data.list3),
          }"
        >
          <div class="card-header">Drop here to add to the bottom</div>
          <div class="card-block">
            <ul class="list-group drop-el" v-dSortable>
              <li
                v-dDraggable="{
                  dragScope: 'default-position',
                  dragHandleClass: 'drag-handle',
                  dragData: { item: item, parent: data.list3 },
                }"
                v-for="item in data.list3"
                class="list-group-item over-flow-ellipsis"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div
          class="card card-outline-primary mb-3"
          v-dDroppable="{
            switchWhileCrossEdge: true,
            dropScope: 'default-position',
            defaultDropPosition: 'closest',
            '@dropEvent': (e) => onDrop(e, data.list4),
          }"
        >
          <div class="card-header">Drop here to add to the nearest place (top)</div>
          <div class="card-block">
            <ul class="list-group drop-el" v-dSortable>
              <li
                v-dDraggable="{
                  dragScope: 'default-position',
                  dragHandleClass: 'drag-handle',
                  dragData: { item: item, parent: data.list4 },
                }"
                v-for="item in data.list4"
                class="list-group-item over-flow-ellipsis"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div class="card-footer">Drop here to add to the nearest place (bottom)</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.demo5 {
  .row {
    overflow: hidden;
  }

  .col-sm-3 {
    float: left;
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    min-width: 220px;
    width: 220px;
  }

  .list-group .list-group-item {
    padding: 0 16px;
    border-radius: 4px;
  }

  .drag-border {
    border: var(--devui-brand) dashed 1px;
  }

  .drag-handle {
    cursor: move;

    /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
  }

  .drag-handle:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }

  .drag-hint-border {
    border: var(--devui-success) dashed 2px;
  }

  .drag-over-border {
    border: var(--devui-warning) dashed 2px;
  }

  .card {
    border: 1px solid var(--devui-dividing-line);
  }

  .card .card-header {
    font-size: var(--devui-font-size-card-title);
    padding: 10px;
  }

  .list-group {
    padding: 10px;
  }

  .list-group > li {
    height: 30px;
    border: 1px solid var(--devui-brand);
    color: var(--devui-text);
    margin-bottom: 5px;
    line-height: 1.5;
    background-color: var(--devui-base-bg);
    display: flex;
    align-items: center;
  }
}
</style>
```

:::

### 拖拽滚动容器增强

搭配使用 dDropScrollEnhanced 指令允许拖拽到边缘的时候加速滚动条向两边滚动。

:::demo

```vue
<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const lists = reactive([
      {
        name: 'IDE',
        list: [{ name: 'Visual Studio Code' }, { name: 'WebStorm' }, { name: 'Sublime Text' }, { name: 'Atom' }, { name: 'Notepad++' }],
      },
      {
        name: 'Browser',
        list: [
          { name: 'Chrome' },
          { name: 'Firefox' },
          { name: 'Opera' },
          { name: 'Edge' },
          { name: 'Internet Explorer' },
          { name: 'Safari' },
        ],
      },
      {
        name: 'OS',
        list: [{ name: 'Linux' }, { name: 'Windows' }, { name: 'Mac OS' }, { name: 'DOS' }, { name: 'Chrome OS' }],
      },
      {
        name: 'Mobile OS',
        list: [{ name: 'Android' }, { name: 'IOS' }, { name: 'BlackBerry' }, { name: 'Symbian' }],
      },
      {
        name: 'Website',
        list: [],
      },
      {
        name: 'Search Engine',
        list: [],
      },
      {
        name: 'Technology Stack',
        list: [],
      },
      {
        name: 'Language',
        list: [],
      },
      {
        name: 'Whatever',
        list: [],
      },
    ]);

    const showDropScrollArea = ref(false);

    function onDrop(e, targetArray) {
      let index = e.dropIndex;
      const fromIndex = e.dragFromIndex;
      const parentArray = e.dragData.parent;
      const item = e.dragData.item;
      if (-1 !== index) {
        if (-1 !== fromIndex && index > fromIndex) {
          index--;
        }
        targetArray.splice(index, 0, fromIndex === -1 ? item : targetArray.splice(fromIndex, 1)[0]);
      } else {
        targetArray.push(item);
      }
      if (fromIndex === -1) {
        removeItem(item, parentArray);
      }
    }

    function removeItem(item, list) {
      const index = list
        .map(function (e) {
          return e.name;
        })
        .indexOf(item.name);
      list.splice(index, 1);
    }
    return { onDrop, lists, showDropScrollArea };
  },
});
</script>
<template>
  <div class="demo6">
    <div :class="{ 'show-drop-area': showDropScrollArea }">
      <div
        class="drop-row devui-scrollbar"
        v-dDropScrollEnhanced="{
          direction: 'h',
          dropScrollScope: ['multiple-group', 'drag-follow'],
        }"
      >
        <div class="drop-col" v-for="group in lists">
          <div
            class="card card-outline-primary mb-3"
            v-dDroppable="{
              dropScope: 'multiple-group',
              '@dropEvent': (e) => onDrop(e, group.list),
            }"
          >
            <div class="card-header">{{ group.name }}</div>
            <div class="card-block">
              <ul
                class="list-group drop-el devui-scrollbar"
                v-dSortable
                v-dDropScrollEnhanced="{
                  direction: 'v',
                  responseEdgeWidth: '20px',
                  dropScrollScope: 'multiple-group',
                }"
              >
                <li
                  v-dDraggable="{
                    dragScope: 'multiple-group',
                    dragHandleClass: 'drag-handle',
                    dragData: { item: item, parent: group.list },
                  }"
                  v-for="item in group.list"
                  class="list-group-item over-flow-ellipsis"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="option-toggle">
        <d-switch v-model="showDropScrollArea"></d-switch>
        <span>Show drop scroll response area</span>
      </div>
      <template v-if="showDropScrollArea">
        <div>
          <span class="color-example active" style="display: inline-block; width: 25px; height: 14px; margin-right: 4px"></span>
          Active area, dragging over it to trigger scroll and show more.
        </div>
        <div>
          <span class="color-example inactive" style="display: inline-block; width: 25px; height: 14px; margin-right: 4px"></span>
          Inactive area, dragging over it will be able to drop to element under the cover.
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.demo6 {
  .row {
    overflow: hidden;
  }

  .col-sm-3 {
    float: left;
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    min-width: 220px;
    width: 220px;
  }

  .list-group .list-group-item {
    padding: 0 16px;
    border-radius: 4px;
  }

  .drop-row {
    white-space: nowrap;
    overflow-x: auto;
    margin-bottom: 10px;
  }

  .drop-col {
    margin-left: 10px;
    display: inline-block;
    vertical-align: top;
    width: 180px;
    padding-bottom: 10px;

    &:last-of-type {
      margin-right: 10px;
    }
  }

  .show-drop-area .dropover-scroll-area,
  .color-example {
    opacity: 0.1;
  }

  .show-drop-area .dropover-scroll-area.active,
  .color-example.active {
    background: red;
  }

  .show-drop-area .dropover-scroll-area.inactive,
  .color-example.inactive {
    background: blue;
  }

  .drag-border {
    border: var(--devui-brand) dashed 1px;
  }

  .drag-handle {
    cursor: move;

    /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
  }

  .drag-handle:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }

  .drag-hint-border {
    border: var(--devui-success) dashed 2px;
  }

  .drag-over-border {
    border: var(--devui-warning) dashed 2px;
  }

  .card {
    border: 1px solid var(--devui-dividing-line);
  }

  .card .card-header {
    font-size: var(--devui-font-size-card-title);
    padding: 10px;
  }

  .list-group {
    padding: 10px;
    max-height: 100px;
    overflow-y: auto;
  }

  .list-group > li {
    height: 30px;
    border: 1px solid var(--devui-brand);
    color: var(--devui-text);
    margin-bottom: 5px;
    line-height: 1.5;
    background-color: var(--devui-base-bg);
    display: flex;
    align-items: center;
  }

  .option-toggle {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    span {
      margin-left: 4px;
    }
  }
}
</style>
```

:::

### 源占位符

使用 originPlaceholder 显示源位置的占位符，示例为消失动画。

:::demo

```vue
<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const data = reactive({
      list1: [{ name: 'Visual Studio Code' }, { name: 'WebStorm' }, { name: 'Sublime Text' }, { name: 'Atom' }, { name: 'Notepad++' }],
      list2: [
        { name: 'Chrome' },
        { name: 'Firefox' },
        { name: 'Opera' },
        { name: 'Edge' },
        { name: 'Internet Explorer' },
        { name: 'Safari' },
      ],
      list3: [{ name: 'Linux' }, { name: 'Windows' }, { name: 'Mac OS' }, { name: 'DOS' }, { name: 'Chrome OS' }],
    });

    const showDropScrollArea = ref(false);

    function onDrop(e, targetArray) {
      let index = e.dropIndex;
      const fromIndex = e.dragFromIndex;
      const parentArray = e.dragData.parent;
      const item = e.dragData.item;
      if (-1 !== index) {
        if (-1 !== fromIndex && index > fromIndex) {
          index--;
        }
        targetArray.splice(index, 0, fromIndex === -1 ? item : targetArray.splice(fromIndex, 1)[0]);
      } else {
        targetArray.push(item);
      }
      if (fromIndex === -1) {
        removeItem(item, parentArray);
      }
    }

    function removeItem(item, list) {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }
    return { onDrop, data, showDropScrollArea };
  },
});
</script>
<template>
  <div class="demo7">
    <div class="row">
      <div class="col-sm-3">
        <div
          class="card"
          v-dDroppable="{
            dropScope: 'default-css',
            '@dropEvent': (e) => {
              onDrop(e, data.list1);
            },
          }"
        >
          <div class="card-header">Drag from here，origin placeholder disappear <strong>directly</strong> after dropped</div>
          <div class="card-block">
            <ul class="list-group drop-el" v-dSortable>
              <li
                v-dDraggable="{
                  dragScope: 'default-css',
                  dragData: { item: item, parent: data.list1 },
                  originPlaceholder: {
                    text: 'custom text and style',
                    style: { backgroundColor: '#ffe6e6', textAlign: 'center' },
                  },
                }"
                v-for="item in data.list1"
                class="list-group-item over-flow-ellipsis"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div
          class="card card-outline-primary mb-3"
          v-dDroppable="{
            dropScope: 'default-css',
            placeholderStyle: {},
            '@dropEvent': (e) => {
              onDrop(e, data.list2);
            },
          }"
        >
          <div class="card-header">Drag from here，origin placeholder <strong>delay to</strong> disappear after dropped</div>
          <div class="card-block">
            <ul class="list-group drop-el" v-dSortable>
              <li
                v-dDraggable="{
                  dragScope: 'default-css',
                  dragHandleClass: 'drag-handle',
                  dragData: { item: item, parent: data.list2 },
                  originPlaceholder: {
                    removeDelay: 100,
                  },
                }"
                v-for="item in data.list2"
                class="list-group-item over-flow-ellipsis"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div
          class="card card-outline-primary mb-3"
          v-dDroppable="{
            dropScope: 'default-css',
            placeholderStyle: {},
            '@dropEvent': (e) => {
              onDrop(e, data.list3);
            },
          }"
        >
          <div class="card-header">
            Drag from here，origin placeholder <strong>delay to</strong> disappear after dropped <strong>with animation</strong>
          </div>
          <div class="card-block">
            <ul class="list-group drop-el list-3" v-dSortable>
              <li
                v-dDraggable="{
                  dragScope: 'default-css',
                  dragHandleClass: 'drag-handle',
                  dragData: { item: item, parent: data.list3 },
                  originPlaceholder: {
                    removeDelay: 300,
                  },
                }"
                v-for="item in data.list3"
                class="list-group-item over-flow-ellipsis"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.demo7 {
  .row {
    overflow: hidden;
  }

  .col-sm-3 {
    float: left;
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    min-width: 220px;
    width: 220px;
  }

  .list-group .list-group-item {
    padding: 0 16px;
    border-radius: 4px;
  }

  .drag-border {
    border: var(--devui-brand) dashed 1px;
  }

  .drag-handle {
    cursor: move;

    /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
  }

  .drag-handle:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }

  .drag-hint-border {
    border: var(--devui-success) dashed 2px;
  }

  .drag-over-border {
    border: var(--devui-warning) dashed 2px;
  }

  .card {
    border: 1px solid var(--devui-dividing-line);
  }

  .card .card-header {
    font-size: var(--devui-font-size-card-title);
    padding: 10px;
  }

  .list-group {
    padding: 10px;
  }

  .list-group > li {
    height: 30px;
    border: 1px solid var(--devui-brand);
    color: var(--devui-text);
    margin-bottom: 5px;
    line-height: 1.5;
    background-color: var(--devui-base-bg);
    display: flex;
    align-items: center;
  }

  .drag-placeholder {
    border: 1px dashed var(--devui-brand);
    margin: 10px 0;
  }

  .drag-origin-placeholder {
    border: 1px dashed var(--devui-line);
    margin: 10px 0;
  }

  .drop-el li:first-child + .drag-origin-placeholder,
  .drag-origin-placeholder:first-child {
    margin-top: 0;
  }

  .drag-origin-placeholder.hit-origin-placeholder {
    border-color: var(--devui-brand);
  }

  .list-3 .drag-origin-placeholder.delay-deletion {
    animation: origin-placeholder-shrink-to-none 0.2s cubic-bezier(0.86, 0, 0.07, 1) 1 0.05s both;
  }

  @keyframes origin-placeholder-shrink-to-none {
    to {
      height: 0;
    }
  }
}
</style>
```

:::

### 拖拽预览

允许拖拽的时候展示自定义拖拽元素样式

:::demo

```vue
<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const data = reactive({
      list1: [{ name: 'Visual Studio Code' }, { name: 'WebStorm' }, { name: 'Sublime' }],
      list2: [{ name: 'Atom' }],
    });

    function onDrop(e) {
      let index = e.dropIndex;
      const fromIndex = e.dragFromIndex;
      if (-1 !== index) {
        /* 修正同一个container排序，往下拖动index多了1个位置*/
        if (-1 !== fromIndex && index > fromIndex) {
          index--;
        }
        data.list2.splice(index, 0, fromIndex === -1 ? e.dragData : data.list2.splice(fromIndex, 1)[0]);
      } else {
        data.list2.push(e.dragData);
      }
      if (fromIndex === -1) {
        removeItem(e.dragData, data.list1);
      }
    }

    function removeItem(item, list) {
      const index = list
        .map(function (e) {
          return e.name;
        })
        .indexOf(item.name);
      list.splice(index, 1);
    }

    const previewRef = ref();

    return { onDrop, data, previewRef };
  },
});
</script>
<template>
  <div class="demo9">
    <div class="row">
      <div class="col-sm-3">
        <div class="card">
          <div class="card-header">Draggable Items</div>
          <div class="card-block">
            <ul class="list-group">
              <d-drag-preview-template ref="previewRef" v-slot="previewContext">
                <div class="drag-preview-item">
                  <span class="index">{{ previewContext.data.index + 1 }}</span>
                  <span class="name">{{ previewContext.dragData.name }}</span>
                </div>
              </d-drag-preview-template>
              <li
                v-dDragPreview="{
                  dragPreview: previewRef,
                  dragPreviewData: { index: i },
                }"
                v-dDraggable="{
                  dragScope: 'drag-preview',
                  dragData: item,
                }"
                v-for="(item, i) in data.list1"
                class="list-group-item over-flow-ellipsis"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div
          class="card card-outline-primary mb-3"
          v-dDroppable="{
            dropScope: 'drag-preview',
            '@dropEvent': ($event) => onDrop($event),
          }"
        >
          <div class="card-header">Drop Area with Sortable</div>
          <div class="card-block">
            <ul class="list-group d-drop-el" v-dSortable>
              <li
                v-dDraggable="{
                  enableDragFollow: true,
                  dragFollowOptions: { appendToBody: true },
                  dragOverClass: 'box-shadow',
                  dragScope: 'drag-preview',
                  dragHandleClass: 'drag-handle',
                  dragData: item,
                }"
                v-for="(item, i) in data.list2"
                class="list-group-item-new over-flow-ellipsis"
              >
                <span class="index">{{ i + 1 }}</span>
                <span class="name">{{ item.name }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.demo9 {
  .row {
    overflow: hidden;
  }

  .col-sm-3 {
    float: left;
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    min-width: 220px;
    width: 220px;
  }

  .list-group .list-group-item {
    padding: 0 16px;
    border-radius: 4px;
  }

  .box-shadow {
    box-shadow: var(--devui-shadow-length-hover) var(--devui-hover-shadow);
    border-right: 10px red solid;
    border-bottom: 12px red solid;
  }

  .drag-border {
    border: var(--devui-brand) dashed 1px;
  }

  .drag-handle {
    cursor: move;

    /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
  }

  .drag-handle:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }

  .drag-hint-border {
    border: var(--devui-success) dashed 2px;
  }

  .drag-over-border {
    border: var(--devui-warning) dashed 2px;
  }

  .card {
    border: 1px solid var(--devui-dividing-line);
  }

  .card .card-header {
    font-size: var(--devui-font-size-card-title);
    padding: 10px;
  }

  .list-group {
    padding: 10px;
  }

  .list-group > li {
    height: 30px;
    border: 1px solid var(--devui-brand);
    color: var(--devui-text);
    margin-bottom: 5px;
    line-height: 1.5;
    background-color: var(--devui-base-bg);
    display: flex;
    align-items: center;
  }
}
// 使得拖拽起来的元素和目标元素的样式一样
.demo9 .list-group > li.list-group-item-new,
.drag-preview-item {
  position: relative;
  width: 160px;
  height: 50px;
  border: 1px solid var(--devui-brand);
  border-radius: 4px;
  background-color: var(--devui-base-bg);
  color: var(--devui-text);
  margin-bottom: 5px;
  line-height: 1.5;
  display: flex;
  align-items: center;
  .index {
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    color: var(--devui-light-text);
    background-color: var(--devui-brand);
    text-align: center;
  }
  .name {
    padding-left: 28px;
  }
}
</style>
```

:::

### 批量拖拽

使用 batchDrag 指令标记可以批量拖拽，请用 ctrl 按键和鼠标选中多个并进行拖拽。

:::demo

```vue
<script>
import { defineComponent, reactive, ref, inject, nextTick } from 'vue';

export default defineComponent({
  setup() {
    const data = reactive([
      {
        name: 'IDE',
        list: [
          { name: 'Visual Studio Code', isSelected: false },
          { name: 'WebStorm', isSelected: false },
          { name: 'Sublime Text', isSelected: false },
          { name: 'Atom', isSelected: false },
          { name: 'Notepad++', isSelected: false },
        ],
      },
      {
        name: 'Browser',
        list: [
          { name: 'Chrome', isSelected: false },
          { name: 'Firefox', isSelected: false },
          { name: 'Opera', isSelected: false },
          { name: 'Edge', isSelected: false },
          { name: 'Internet Explorer', isSelected: false },
          { name: 'Safari', isSelected: false },
        ],
      },
      {
        name: 'OS',
        list: [
          { name: 'Linux', isSelected: false },
          { name: 'Windows', isSelected: false },
          { name: 'Mac OS', isSelected: false },
          { name: 'DOS', isSelected: false },
          { name: 'Chrome OS', isSelected: false },
        ],
      },
      {
        name: 'Mobile OS',
        list: [
          { name: 'Android', isSelected: false },
          { name: 'IOS', isSelected: false },
          { name: 'BlackBerry', isSelected: false },
          { name: 'Symbian', isSelected: false },
        ],
      },
      {
        name: 'Whatever',
        list: [],
      },
    ]);

    const showOriginPlaceholder = ref(false);
    const switchWhileCrossEdge = ref(false);

    function onDrop(e, targetArray) {
      if (e.dropOnOrigin) {
        return;
      }
      if (e.batchDragData) {
        batchDrop(e, targetArray);
        return;
      }
      let index = e.dropIndex;
      const fromIndex = e.dragFromIndex;
      const parentArray = e.dragData.parent;
      const item = e.dragData.item;
      if (-1 !== index) {
        if (-1 !== fromIndex && index > fromIndex) {
          index--;
        }
        targetArray.splice(index, 0, fromIndex === -1 ? item : targetArray.splice(fromIndex, 1)[0]);
      } else {
        targetArray.push(item);
      }
      if (fromIndex === -1) {
        removeItem(item, parentArray);
      }
    }

    function batchDrop(e, targetArray) {
      let fromIndexLessThanDropIndexCount = 0;
      e.batchDragData
        .map((dragData) => {
          const index = targetArray.indexOf(dragData.item);
          if (index > -1 && index < e.dropIndex) {
            fromIndexLessThanDropIndexCount++;
          }
          return dragData;
        })
        .forEach((dragData) => {
          removeItem(dragData.item, dragData.parent);
        });
      targetArray.splice(e.dropIndex - fromIndexLessThanDropIndexCount, 0, ...e.batchDragData.map((batchItem) => batchItem.item));
      return;
    }

    function removeItem(item, list) {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }

    function batchSelect(item) {
      item.isSelected = !(item.isSelected || false);
    }

    function batchSelectCheck(event, item) {
      if (event.ctrlKey) {
        batchSelect(item);
      }
    }

    function cleanBatch() {
      data.forEach((list) =>
        list.list.forEach((item) => {
          item['isSelected'] = false;
        })
      );
    }

    return { onDrop, data, showOriginPlaceholder, switchWhileCrossEdge, batchSelect, batchSelectCheck, cleanBatch };
  },
});
</script>
<template>
  <div class="demo8">
    <div
      class="drop-row devui-scrollbar"
      v-dDropScrollEnhanced="{
        direction: 'h',
        dropScrollScope: ['multiple-group', 'drag-follow'],
      }"
    >
      <div class="drop-col" v-for="list in data">
        <div
          class="card card-outline-primary mb-3"
          v-dDroppable="{
            dropScope: 'multiple-group',
            switchWhileCrossEdge: switchWhileCrossEdge,
            '@dropEvent': (e) => onDrop(e, list.list),
          }"
        >
          <div class="card-header">{{ list.name }}</div>
          <div class="card-block">
            <ul
              class="list-group drop-el devui-scrollbar"
              v-dSortable
              v-dDropScrollEnhanced="{
                direction: 'v',
                responseEdgeWidth: '20px',
                dropScrollScope: 'multiple-group',
              }"
            >
              <li
                v-for="item in list.list"
                :key="item"
                class="list-group-item over-flow-ellipsis"
                v-dDraggable="{
                  dragIdentity: item, // 注意：由于使用了动态组合的dragData，批量拖拽需要使用dragIdentity标记唯一标识符， 否则每次刷新的dragData后会不一致，影响排序
                  dragScope: 'multiple-group',
                  dragHandleClass: 'drag-handle',
                  originPlaceholder: {
                    show: showOriginPlaceholder,
                    removeDelay: 300,
                  },
                  dragData: { item: item, parent: list.list },
                  enableDragFollow: true,
                }"
                @click="(e) => batchSelectCheck(e, item)"
                v-dDraggableBatchDrag="{
                  batchDragActive: item.isSelected,
                  '@batchDragActiveEvent': () => {
                    batchSelect(item);
                  },
                }"
                :class="{ selected: item.isSelected }"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <d-switch v-model="showOriginPlaceholder"></d-switch> show origin placeholder <d-switch v-model="switchWhileCrossEdge"></d-switch> cross
    edge switch
    <d-button variant="solid" @click="cleanBatch"> clean all selected </d-button>
  </div>
</template>
<style lang="scss">
.demo8 {
  .row {
    overflow: hidden;
  }

  .col-sm-3 {
    float: left;
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    min-width: 220px;
    width: 220px;
  }

  .list-group .list-group-item {
    padding: 0 16px;
    border-radius: 4px;
  }

  .drop-row {
    white-space: nowrap;
    overflow-x: auto;
    margin-bottom: 10px;
  }

  .drop-col {
    margin-left: 10px;
    display: inline-block;
    vertical-align: top;
    width: 180px;
    padding-bottom: 10px;
  }

  .drag-border {
    border: var(--devui-brand) dashed 1px;
  }

  .drag-handle {
    cursor: move;

    /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
  }

  .drag-handle:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }

  .drag-hint-border {
    border: var(--devui-success) dashed 2px;
  }

  .drag-over-border {
    border: var(--devui-warning) dashed 2px;
  }

  .card {
    border: 1px solid var(--devui-dividing-line);
  }

  .card .card-header {
    font-size: var(--devui-font-size-card-title);
    padding: 10px;
  }

  .list-group {
    padding: 10px;
    max-height: 300px;
    overflow-y: auto;
  }

  .list-group > li,
  .list-group > div > li {
    height: 30px;
    border: 1px solid var(--devui-brand);
    color: var(--devui-text);
    margin-bottom: 5px;
    line-height: 1.5;
    background-color: var(--devui-base-bg);
    display: flex;
    align-items: center;
  }

  .list-group > li.selected,
  .list-group > div > li.selected {
    height: 30px;
    border: 1px solid var(--devui-brand);
    color: var(--devui-brand);
    margin-bottom: 5px;
    line-height: 1.5;
    background-color: var(--devui-list-item-selected-bg);
    display: flex;
    align-items: center;
  }

  .drag-placeholder {
    border: 1px dashed var(--devui-brand);
    margin: 10px 0;
  }

  .show-origin .drag-origin-placeholder:not(.side-drag-origin-placeholder) {
    border: 1px dashed var(--devui-line);
  }

  .show-origin .drag-origin-placeholder {
    margin: 10px 0;
  }

  .show-origin .drag-origin-placeholder:first-child {
    margin-top: 0;
  }

  .show-origin .drag-origin-placeholder.hit-origin-placeholder {
    border-color: var(--devui-brand--);
  }

  .show-origin .drag-origin-placeholder.delay-deletion {
    animation: origin-placeholder-shrink-to-none 0.2s cubic-bezier(0.86, 0, 0.07, 1) 1 0.05s both;
  }

  @keyframes origin-placeholder-shrink-to-none {
    to {
      height: 0;
    }
  }
}
.show-origin .drop-el li:first-child + .drag-origin-placeholder {
  margin-top: 0;
}
</style>
```

:::

### 二维拖拽和组合拖拽预览

使用 dDragDropSyncBox 指令、dDragSync 指令、dDropSync 指令协同拖拽，实现二维拖拽；使用 dDragPreview 配置拖拽预览，使用 d-drag-preview-clone-dom-ref 完成拖拽节点预览的克隆。

:::demo

```vue
<script>
import { defineComponent, reactive, ref, inject, nextTick } from 'vue';

export default defineComponent({
  setup() {
    const data = reactive({
      lists: {
        listA1: [{ name: 'Visual Studio Code' }, { name: 'WebStorm' }, { name: 'Sublime Text' }, { name: 'Atom' }, { name: 'Notepad++' }],
        listA2: [
          { name: 'Chrome' },
          { name: 'Firefox' },
          { name: 'Opera' },
          { name: 'Edge' },
          { name: 'Internet Explorer' },
          { name: 'Safari' },
        ],
        listA3: [],
        listB1: [{ name: 'Linux' }, { name: 'Windows' }, { name: 'Mac OS' }, { name: 'DOS' }, { name: 'Chrome OS' }],
        listB2: [{ name: 'Android' }, { name: 'IOS' }, { name: 'BlackBerry' }, { name: 'Symbian' }],
        listB3: [],
        listC1: [],
        listC2: [],
        listC3: [],
      },
    });
    const meta = reactive({
      owners: [
        {
          id: 'not-assign',
          name: 'Not Assign',
          collapse: false,
        },
        {
          id: 'available',
          name: 'Available',
          collapse: false,
        },
        {
          id: 'not-available',
          name: 'Not Available',
          collapse: false,
        },
      ],
      listCol: [
        {
          id: 'group1',
          name: 'Group 1',
        },
        {
          id: 'group2',
          name: 'Group 2',
        },
        {
          id: 'group3',
          name: 'Group 3',
        },
      ],
      ownerListMap: {
        'not-assign': {
          group1: data.lists.listA1,
          group2: data.lists.listA2,
          group3: data.lists.listA3,
        },
        available: {
          group1: data.lists.listB1,
          group2: data.lists.listB2,
          group3: data.lists.listB3,
        },
        'not-available': {
          group1: data.lists.listC1,
          group2: data.lists.listC2,
          group3: data.lists.listC3,
        },
      },
    });

    function onDrop(e, targetArray) {
      if (e.dropOnOrigin) {
        return;
      }
      if (e.batchDragData) {
        batchDrop(e, targetArray);
        return;
      }
      let index = e.dropIndex;
      const fromIndex = e.dragFromIndex;
      const parentArray = e.dragData.parent;
      const item = e.dragData.item;
      if (-1 !== index) {
        if (-1 !== fromIndex && index > fromIndex) {
          index--;
        }
        targetArray.splice(index, 0, fromIndex === -1 ? item : targetArray.splice(fromIndex, 1)[0]);
      } else {
        targetArray.push(item);
      }
      if (fromIndex === -1) {
        removeItem(item, parentArray);
      }
    }

    function batchDrop(e, targetArray) {
      let fromIndexLessThanDropIndexCount = 0;
      e.batchDragData
        .map((dragData) => {
          const index = targetArray.indexOf(dragData.item);
          if (index > -1 && index < e.dropIndex) {
            fromIndexLessThanDropIndexCount++;
          }
          return dragData;
        })
        .forEach((dragData) => {
          removeItem(dragData.item, dragData.parent);
        });
      targetArray.splice(e.dropIndex - fromIndexLessThanDropIndexCount, 0, ...e.batchDragData.map((batchItem) => batchItem.item));
      return;
    }

    function removeItem(item, list) {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }

    function batchSelect(item) {
      item.isSelected = !(item.isSelected || false);
    }

    function batchSelectCheck(event, item) {
      if (event.ctrlKey) {
        batchSelect(item);
      }
    }

    function cleanBatch() {
      data.forEach((list) =>
        list.list.forEach((item) => {
          item['isSelected'] = false;
        })
      );
    }

    const colTemplate = ref();

    return { onDrop, data, meta, batchSelect, batchSelectCheck, cleanBatch, colTemplate };
  },
});
</script>
<template>
  <div class="demo10">
    <div
      class="board"
      v-dDragDropSyncBox
      v-dDropScrollEnhanced="{
        direction: 'v',
      }"
      v-dDropScrollEnhancedSide="{
        direction: 'v',
      }"
    >
      <div class="row row-group">
        <div class="row title-row occupied-width">
          <div class="col-group">
            <div class="col title-col">Status</div>
          </div>
          <div
            class="col-group"
            v-dDroppable="{
              dropScope: 'col',
              switchWhileCrossEdge: true,
              '@dropEvent': (e) => {
                onDrop(e, meta.listCol);
              },
            }"
            v-dSortable="{
              dSortable: 'h',
            }"
            v-dDropSortSync="{
              dropSortSync: 'col',
            }"
          >
            <div
              class="col"
              v-dDragPreview="{
                dragPreview: colTemplate,
              }"
              v-dDraggable="{
                dragScope: 'col',
                dragData: { item: col, parent: meta.listCol },
              }"
              v-dDragSync="{
                dragSync: 'col-' + col.id,
              }"
              v-for="col in meta.listCol"
            >
              {{ col.name }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="row row-group"
        v-dSortable
        v-dDroppable="{
          dropScope: 'row',
          switchWhileCrossEdge: true,
          '@dropEvent': (e) => onDrop(e, meta.owners),
        }"
      >
        <div
          class="row"
          v-dDraggable="{
            dragScope: 'row',
            dragHandle: '.title-col',
            enableDragFollow: true,
            dragData: { item: owner, parent: meta.owners },
          }"
          v-for="owner in meta.owners"
        >
          <div class="col-group">
            <div class="col title-col">{{ owner.name }}</div>
          </div>
          <div
            class="col-group"
            v-dDropSortSync="{
              dropSortSync: 'col',
            }"
          >
            <div
              class="col"
              v-dDragSync="{
                dragSync: 'col-' + col.id,
              }"
              v-for="col in meta.listCol"
            >
              <div
                class="card-container"
                v-dDroppable="{
                  dropScope: 'card-container',
                  switchWhileCrossEdge: true,
                  '@dropEvent': (e) => onDrop(e, meta.ownerListMap[owner.id][col.id]),
                }"
              >
                <ul class="list-group drop-el" v-dSortable>
                  <li
                    v-for="item of meta.ownerListMap[owner.id][col.id]"
                    class="list-group-item over-flow-ellipsis"
                    v-dDraggable="{
                      dragIdentity: item, // 批量脱欧拽必要
                      dragScope: 'card-container',
                      dragData: { item: item, parent: meta.ownerListMap[owner.id][col.id] },
                      enableDragFollow: true,
                    }"
                    @click="(e) => batchSelectCheck(e, item)"
                    v-dDraggableBatchDrag="{
                      batchDragActive: item.isSelected,
                      '@batchDragActiveEvent': () => {
                        batchSelect(item);
                      },
                    }"
                    :class="{ selected: item.isSelected }"
                  >
                    {{ item.name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <d-drag-preview-template ref="colTemplate" v-slot="{ draggedEl, dragSyncDOMElements }">
      <div class="board board-preview">
        <div class="row title-row">
          <d-drag-preview-clone-dom-ref :domRef="draggedEl"></d-drag-preview-clone-dom-ref>
        </div>
        <div class="row" v-for="dom in dragSyncDOMElements">
          <d-drag-preview-clone-dom-ref :domRef="dom"></d-drag-preview-clone-dom-ref>
        </div>
      </div>
    </d-drag-preview-template>
  </div>
</template>
<style lang="scss">
.board {
  width: 100%;
  max-height: 500px;
  overflow: auto;
  background-color: var(--devui-area);
  padding: 5px;

  .row {
    display: flex;
    margin: 10px 0;
    width: 100%;
    white-space: nowrap;

    .col {
      display: inline-flex;
      flex-shrink: 0; /* fix ie 11 auto shrink to default value 1 */
      vertical-align: top;
      align-items: stretch;
      min-height: 75px;
      width: 285px;
      margin: 0 5px;
      background-color: var(--devui-base-bg);
      box-shadow: var(--devui-shadow-length-base) var(--devui-shadow);
    }
  }
  &.board-preview {
    background-color: transparent;
    opacity: 0.95;
    overflow: visible;
    max-height: initial;
  }
}

.demo10 {
  .board {
    .row-group {
      display: block;
      width: 100%;
    }

    .col-group {
      white-space: nowrap;
      display: inline-flex;
      flex-shrink: 0; /* fix ie 11 auto shrink to default value 1 */
      vertical-align: top;
      align-items: stretch;

      .col:last-of-type {
        margin-right: 10px;
      }
    }
  }

  /* 配色 */
  .board {
    .row.title-row .col {
      font-weight: bold;
    }

    .col.title-col {
      font-weight: bold;
    }
  }

  /* 行折叠 */
  .board .row.row-collapse {
    max-height: 100px;

    .col {
      max-height: 100%;
      overflow: hidden;
    }
  }

  /* 列折叠 */
  .board .col.col-collapse {
    max-width: 100px;
    overflow: hidden;
  }

  /* 样式修正 */
  .board .col-group > .drag-placeholder {
    display: inline-block;
    vertical-align: top;
    align-items: stretch;
    margin: 0 5px;
  }

  .row.occupied-width {
    min-width: 100%;
  }

  /* 卡片容器 */
  .card-container {
    width: 100%;
    height: 100%;
  }

  .list-group .list-group-item {
    padding: 0 16px;
    border-radius: 4px;
  }

  .drag-handle {
    cursor: move;

    /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
  }

  .drag-handle:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }

  .list-group {
    padding: 10px;
  }

  .list-group > li,
  .list-group > div > li {
    height: 30px;
    border: 1px solid var(--devui-brand);
    color: var(--devui-text);
    margin-bottom: 5px;
    line-height: 1.5;
    background-color: var(--devui-base-bg);
    display: flex;
    align-items: center;
  }

  .list-group > li.selected,
  .list-group > div > li.selected {
    height: 30px;
    border: 1px solid var(--devui-brand);
    color: var(--devui-brand);
    margin-bottom: 5px;
    line-height: 1.5;
    background-color: var(--devui-list-item-selected-bg);
    display: flex;
    align-items: center;
  }

  .drag-placeholder {
    border: 1px dashed var(--devui-brand);
    margin: 10px 0;
  }

  .show-origin .drag-origin-placeholder:not(.side-drag-origin-placeholder) {
    border: 1px dashed var(--devui-line);
  }

  .show-origin .drag-origin-placeholder {
    margin: 10px 0;
  }

  .show-origin .drop-el li:first-child + .drag-origin-placeholder,
  .show-origin .drag-origin-placeholder:first-child {
    margin-top: 0;
  }

  .show-origin .drag-origin-placeholder.hit-origin-placeholder {
    border-color: var(--devui-brand);
  }

  .show-origin .drag-origin-placeholder.delay-deletion {
    animation: origin-placeholder-shrink-to-none 0.2s cubic-bezier(0.86, 0, 0.07, 1) 1 0.05s both;
  }

  @keyframes origin-placeholder-shrink-to-none {
    to {
      height: 0;
    }
  }
}
</style>
```

:::

#### dDraggable 指令

##### dDraggable 参数

|               参数               |                                                       类型                                                       | 默认值        | 描述                                                                                                                                             | 跳转 Demo                             |
| :------------------------------: | :--------------------------------------------------------------------------------------------------------------: | :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------ |
|            `dragData`            |                                                      `any`                                                       | --            | 可选，传递给 `DropEvent` 事件的数据。                                                                                                            | [基本用法](#基本用法)                 |
|           `dragScope`            |                                            `string \| Array<string>`                                             | 'default'     | 可选，限制 drop 的位置，必须匹配对应的 `dropScope`。                                                                                             | [基本用法](#基本用法)                 |
|         `dragOverClass`          |                                                     `string`                                                     | --            | 可选，拖动时被拖动元素的 CSS 类。                                                                                                                | [拖拽实体元素跟随](#拖拽实体元素跟随) |
|           `dragHandle`           |                                                     `string`                                                     | --            | 可选，可拖动拖动内容的 CSS 选择器，只有匹配 CSS 选择器的元素才能响应拖动事件。示例：`'.title, .title > *'`, `'#header'`, `'.title *:not(input)'` |                                       |
|        `dragHandleClass`         |                                                     `string`                                                     | 'drag-handle' | 可选，会给可拖动内容的应用的 CSS 选择器命中的元素添加的 CSS 类名，第一个匹配 CSS 选择器的会被加上该 CSS 类。                                     | [基本用法](#基本用法)                 |
|            `disabled`            |                                                    `boolean`                                                     | false         | 可选，控制当前元素是否可拖动，false 为可以，true 为不可以。                                                                                      | [基本用法](#基本用法)                 |
|        `enableDragFollow`        |                                                    `boolean`                                                     | false         | 可选，是否启用实体元素跟随（可以添加更多特效，如阴影等）。                                                                                       | [拖拽实体元素跟随](#拖拽实体元素跟随) |
|       `dragFollowOptions`        |                                            `{appendToBody?: boolean}`                                            | --            | 可选，用于控制实体拖拽的一些配置。                                                                                                               | [拖拽实体元素跟随](#拖拽实体元素跟随) |
| `dragFollowOptions.appendToBody` |                                                    `boolean`                                                     | false         | 可选，用于控制实体拖拽的克隆元素插入的位置。默认 false 会插入到源元素父元素所有子的最后，设置为 true 会附着到。见说明 1                          | [拖拽实体元素跟随](#拖拽实体元素跟随) |
|       `originPlaceholder`        | `{show?: boolean; tag?: string; style?: {cssProperties: string]: string}; text?: string; removeDelay?: number;}` | --            | 可选，设置源占位符号，用于被拖拽元素原始位置占位。                                                                                               | [源占位符](#源占位符)                 |
|     `originPlaceholder.show`     |                                                    `boolean`                                                     | true          | 可选，是否显示，默认 originPlaceholder 有 Input 则显示，特殊情况可以关闭。                                                                       |
|     `originPlaceholder.tag`      |                                                     `string`                                                     | 'div'         | 可选，使用 tag 名，默认 originPlaceholder 使用 'div'，特殊情况可以置换。                                                                         |
|    `originPlaceholder.style`     |                                                     `Object`                                                     | --            | 可选，传 style 对象，key 为样式属性，value 为样式值。                                                                                            | [源占位符](#源占位符)                 |
|     `originPlaceholder.text`     |                                                     `string`                                                     | --            | 可选，placeholder 内的文字。                                                                                                                     | [源占位符](#源占位符)                 |
| `originPlaceholder.removeDelay`  |                                                     `number`                                                     | --            | 可选，用于希望源占位符在拖拽之后的延时里再删除，方便做动画，单位为 ms 毫秒。                                                                     | [源占位符](#源占位符)                 |

说明 1：dragFollowOptions 的 appendToBody 的使用场景：当拖拽离开后源位置的父对象会被销毁的话，需要把克隆体附着到 body 上防止被销毁。默认会通过复制样式保证克隆到 body 的实体的样式是正确的，但部分深度依赖 DOM 节点位置的样式和属性可能会失败，需要手动调整部分样式。

##### dDraggable 事件

| 事件           | 类型                      | 描述                      | 跳转 Demo             |
| :------------- | :------------------------ | :------------------------ | :-------------------- |
| dragStartEvent | `EventEmitter<DragEvent>` | 开始拖动的 DragStart 事件 | [基本用法](#基本用法) |
| dragEndEvent   | `EventEmitter<DragEvent>` | 拖动结束的 DragEnd 事件   | [基本用法](#基本用法) |
| dropEndEvent   | `EventEmitter<DragEvent>` | 放置结束的 Drop 事件      | [基本用法](#基本用法) |

Drag DOM Events 详情: [DragEvent](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent)

#### dDraggableBatchDrag 附加指令

使用方法 dDraggableBatchDrag

##### dDraggableBatchDrag 属性

| 名字                                | 类型                      | 默认值             | 描述                                                                                           | 跳转 Demo             |
| :---------------------------------- | :------------------------ | :----------------- | :--------------------------------------------------------------------------------------------- | :-------------------- |
| batchDragGroup \| batchDrag         | `string`                  | 'default'          | 可选，批量拖拽分组组名，不同组名                                                               |
| batchDragActive                     | `boolean`                 | false              | 可选，是否把元素加入到批量拖拽组. 见说明 1。                                                   | [批量拖拽](#批量拖拽) |
| batchDragLastOneAutoActiveEventKeys | `Array<key in DragEvent>` | ['ctrlKey']        | 可选，通过过拖拽可以激活批量选中的拖拽事件判断。见说明 2。                                     |
| batchDragStyle                      | `Array<badge\|stack>`     | ['badge', 'stack'] | 可选，批量拖拽的效果，badge 代表右上角有统计数字，stack 代表有堆叠效果，数组里有该字符串则有效 | [批量拖拽](#批量拖拽) |

说明 1： `batchDragActive`为`true`的时候会把元素加入组里，加入顺序为变为 true 的顺序，先加入的在数组前面。第一个元素会确认批量的组名，如果后加入的组名和先加入的组名不一致，则后者无法加入。
说明 2： `batchDragLastOneAutoActiveEventKeys`的默认值为['ctrlKey'], 即可以通过按住 ctrl 键拖动最后一个元素， 该元素自动加入批量拖拽的组，判断条件是 dragStart 事件里的 ctrlKey 事件为 true。目前仅支持判断 true/false。该参数为数组，可以判断任意一个属性值为 true 则生效，可用于不同操作系统的按键申明。

##### dDraggableBatchDrag 事件

| 名字                 | 类型                                     | 描述                                               | 跳转 Demo             |
| :------------------- | :--------------------------------------- | :------------------------------------------------- | :-------------------- |
| batchDragActiveEvent | `EventEmitter<{el: Element, data: any}>` | 通过拖拽把元素加入了批量拖拽组，通知外部选中该元素 | [批量拖拽](#批量拖拽) |

#### dDroppable 指令

##### dDroppable 参数

| 参数                        | 类型                                           | 默认值                                      | 描述                                                                                                                                                   | 跳转 Demo                                       |
| :-------------------------- | :--------------------------------------------- | :------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------- |
| dropScope                   | `string \| Array<string>`                      | 'default'                                   | 可选，限制 drop 的区域，对应 dragScope                                                                                                                 | [基本用法](#基本用法)                           |
| dragOverClass               | `string`                                       | --                                          | 可选，dragover 时 drop 元素上应用的 css                                                                                                                |
| placeholderStyle            | `Object`                                       | {backgroundColor: '#6A98E3', opacity: '.4'} | 可选，允许 sort 时，用于占位显示                                                                                                                       | [源占位符](#源占位符)                           |
| placeholderText             | `string`                                       | ''                                          | 可选，允许 sort 时，用于占位显示内部的文字                                                                                                             |
| allowDropOnItem             | `boolean`                                      | false                                       | 可选，允许 sort 时，用于允许拖动到元素上，方便树形结构的拖动可以成为元素的子节点                                                                       | [多层树状拖拽](#多层树状拖拽)                   |
| dragOverItemClass           | `string`                                       | --                                          | 可选，`allowDropOnItem`为`true`时，才有效，用于允许拖动到元素上后，被命中的元素增加样式                                                                | [多层树状拖拽](#多层树状拖拽)                   |
| nestingTargetRect           | `{height?: number, width?: number}`            | --                                          | 可选，用于修正有内嵌列表后，父项高度被撑大，此处 height，width 为父项自己的高度（用于纵向拖动），宽度（用于横向拖动）                                  | [多层树状拖拽](#多层树状拖拽)                   |
| defaultDropPosition         | `'closest' \| 'before' \| 'after'`             | 'closest'                                   | 可选，设置拖拽到可放置区域但不在列表区域的放置位置，`'closest'` 为就近放下， `'before'`为加到列表头部， `'after'`为加到列表尾部                        | [外部放置位置](#外部放置位置：就近，前面，后面) |
| dropSortCountSelector       | `string`                                       | --                                          | 可选，带有 sortable 的容器的情况下排序，计数的内容的选择器名称，可以用于过滤掉不应该被计数的元素                                                       |
| dropSortVirtualScrollOption | `{totalLength?: number; startIndex?: number;}` | --                                          | 可选，用于虚拟滚动列表中返回正确的 dropIndex 需要接收 totalLength 为列表的真实总长度， startIndex 为当前排序区域显示的第一个 dom 的在列表内的 index 值 |
| switchWhileCrossEdge        | `boolean`                                      | false                                       | 可选，是否启用越过立即交换位置的算法, 不能与 allowDropOnItem 一起用，allowDropOnItem 为 true 时，此规则无效                                            |
| placeholderTag              | `string`                                       | 'div'                                       | 可选，占位显示的元素标签                                                                                                                               |

##### dDroppable 事件

| 事件           | 类型                                        | 描述                                                                            | 跳转 Demo             |
| :------------- | :------------------------------------------ | :------------------------------------------------------------------------------ | :-------------------- |
| dragEnterEvent | `EventEmitter<DragEvent>`                   | drag 元素进入的 dragenter 事件                                                  | [基本用法](#基本用法) |
| dragOverEvent  | `EventEmitter<DragEvent>`                   | drag 元素在 drop 区域上的 dragover 事件                                         | [基本用法](#基本用法) |
| dragLeaveEvent | `EventEmitter<DragEvent>`                   | drag 元素离开的 dragleave 事件                                                  | [基本用法](#基本用法) |
| dropEvent      | `EventEmitter<`[`DropEvent`](#dropevent)`>` | 放置一个元素, 接收的事件，其中 nativeEvent 表示原生的 drop 事件，其他见定义注释 | [基本用法](#基本用法) |

##### DropEvent

```typescript
type DropEvent = {
  nativeEvent: any; // 原生的drop事件
  dragData: any; // drag元素的dragData数据
  dropSubject: Subject<any>; //drop事件的Subject
  dropIndex?: number; // drop的位置在列表的index
  dragFromIndex?: number; // drag元素在原来的列表的index，注意使用虚拟滚动数据无效
  dropOnItem?: boolean; // 是否drop到了元素的上面，搭配allowDropOnItem使用
};
```

#### dSortable 指令

指定需要参与排序的 Dom 父容器（因为 drop 只是限定可拖拽区域，具体渲染由使用者控制）

##### dSortable 参数

| 名字           | 类型         | 默认值 | 描述                            | 跳转 Demo |
| :------------- | :----------- | :----- | :------------------------------ | :-------- |
| dSortDirection | `'v' \| 'h'` | 'v'    | 'v'垂直排序,'h'水平排序         |
| dSortableZMode | `boolean`    | false  | 是否是 z 模式折回排序，见说明 1 |

说明 1： z 自行排序最后是以大方向为准的，如果从左到右排遇到行末换行，需要使用的垂直排序+z 模式，因为最后数据是从上到下的只是局部的数据是从左到右。

##### dDropScrollEnhanced 参数

| 名字               | 类型                                                                                            | 默认值   | 描述                                                                                                                       | 跳转 Demo                             |
| :----------------- | :---------------------------------------------------------------------------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------- | :------------------------------------ |
| direction          | [`DropScrollDirection`](#dropscrolldirection)即`'v'\|'h'`                                       | 'v'      | 滚动方向，垂直滚动`'v'`, 水平滚动 `'h'`                                                                                    | [拖拽滚动容器增强](#拖拽滚动容器增强) |
| responseEdgeWidth  | `string \| ((total: number) => string)`                                                         | '100px'  | 响应自动滚动边缘宽度, 函数的情况传入的为列表容器同个方向相对宽度                                                           | [拖拽滚动容器增强](#拖拽滚动容器增强) |
| speedFn            | [`DropScrollSpeedFunction`](#dropscrolldirection)                                               | 内置函数 | 速率函数，见备注                                                                                                           |
| minSpeed           | `DropScrollSpeed`即`number`                                                                     | 50       | 响应最小速度 ，函数计算小于这个速度的时候，以最小速度为准                                                                  |
| maxSpeed           | `DropScrollSpeed`即`number`                                                                     | 1000     | 响应最大速度 ，函数计算大于这个速度的时候，以最大速度为准                                                                  |
| viewOffset         | {forward?: [`DropScrollAreaOffset`](#dropscrollareaoffset); backward?: `DropScrollAreaOffset`;} | --       | 设置拖拽区域的偏移，用于某些位置修正                                                                                       |
| dropScrollScope    | `string\| Array<string>`                                                                        | --       | 允许触发滚动 scope，不配置为默认接收所有 scope，配置情况下，draggable 的`dragScope`和`dropScrollScope`匹配得上才能触发滚动 | [拖拽滚动容器增强](#拖拽滚动容器增强) |
| backSpaceDroppable | `boolean`                                                                                       | true     | 是否允许在滚动面板上同时触发放置到滚动面板的下边的具体可以放置元素，默认为 true，设置为 false 则不能边滚动边放置           |

备注： speedFn 默认函数为`(x: number) => Math.ceil((1 - x) * 18) * 100`，传入数字`x`是 鼠标位置距离边缘的距离占全响应宽度的百分比，
最终速度将会是 speedFn(x)，但不会小于最小速度`minSpeed`或者大于最大速度`maxSpeed`。

相关类型定义：

###### DropScrollDirection

```typescript
export type DropScrollDirection = 'h' | 'v';
```

###### DropScrollSpeed

```typescript
export type DropScrollEdgeDistancePercent = number; // unit: 1
export type DropScrollSpeed = number; // Unit: px/s
export type DropScrollSpeedFunction = (x: DropScrollEdgeDistancePercent) => DropScrollSpeed;
```

###### DropScrollAreaOffset

```typescript
export type DropScrollAreaOffset = {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  widthOffset?: number;
  heightOffset?: number;
};

export enum DropScrollOrientation {
  forward, // Forward, right/bottom
  backward, // Backward, left/up
}
export type DropScrollTriggerEdge = 'left' | 'right' | 'top' | 'bottom';
```

`DropScrollAreaOffset` 仅重要和次要定位边有效， forward 代表后右或者往下滚动，backward 表示往左或者往上滚动

| direction           | `v` 上下滚动     | `h` 左右滚动   |
| :------------------ | :--------------- | :------------- |
| forward 往下或往右  | `left` ,`bottom` | `top` ,`right` |
| backward 往左或网上 | `left`,`top`     | `top`,`left`   |

##### dDropScrollEnhancedSide 附属指令

如果需要同时两个方向都有滚动条，则需要使用 dDropScrollEnhanced 的同时使用 dDropScrollEnhancedSide，参数列表同 dDropScrollEnhanced 指令，唯一不同是 direction，如果为`'v'`则 side 附属指令的实际方向为`'h'`。

| 名字               | 类型                                                                   | 默认值   | 描述                                                                                                                       |
| :----------------- | :--------------------------------------------------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------- |
| direction          | `DropScrollSpeed`即`'v'\|'h'`                                          | 'v'      | 滚动方向，垂直滚动`'v'`, 水平滚动 `'h'`                                                                                    |
| responseEdgeWidth  | `string \| ((total: number) => string)`                                | '100px'  | 响应自动滚动边缘宽度, 函数的情况传入的为列表容器同个方向相对宽度                                                           |
| speedFn            | `DropScrollSpeedFunction`                                              | 内置函数 | 速率函数，见备注                                                                                                           |
| minSpeed           | `DropScrollSpeed`即`number`                                            | 50       | 响应最小速度 ，函数计算小于这个速度的时候，以最小速度为准                                                                  |
| maxSpeed           | `DropScrollSpeed`即`number`                                            | 1000     | 响应最大速度 ，函数计算大于这个速度的时候，以最大速度为准                                                                  |
| viewOffset         | {forward?: `DropScrollAreaOffset`; backward?: `DropScrollAreaOffset`;} | --       | 设置拖拽区域的偏移，用于某些位置修正                                                                                       |
| dropScrollScope    | `string\| Array<string>`                                               | --       | 允许触发滚动 scope，不配置为默认接收所有 scope，配置情况下，draggable 的`dragScope`和`dropScrollScope`匹配得上才能触发滚动 |
| backSpaceDroppable | `boolean`                                                              | true     | 是否允许在滚动面板上同时触发放置到滚动面板的下边的具体可以放置元素，默认为 true，设置为 false 则不能边滚动边放置           |

#### 使用 `dDraggable` & `dDroppable` 指令

```html
<ul>
  <li v-dDraggable>Coffee</li>
  <li v-dDraggable>Tea</li>
  <li v-dDraggable>Milk</li>
</ul>
```

```html
<div v-dDroppable>
  <p>Drop items here</p>
</div>
```

#### CSS

`dDraggable` & `dDroppable` 指令都有`[dragOverClass]`作为输入.  
 提供 drag 和 drop 时的 hover 样式，注意是`字符串`

```html
<div
  v-dDroppable="{
  dragOverClass: 'drag-target-border'
}"
>
  <p>Drop items here</p>
</div>
```

#### 限制 Drop 区域

用[dragScope]和[dropScope]限制拖动区域，可以是字符串或数组，只有 drag 和 drop 的区域对应上才能放进去

```html
<ul>
  <li v-dDraggable="{dragScope:'drink'}">Coffee</li>
  <li v-dDraggable="{dragScope:'drink'}">Tea</li>
  <li v-dDraggable="{dragScope:'meal'}">Biryani</li>
  <li v-dDraggable="{dragScope:'meal'}">Kebab</li>
  ...
</ul>
```

```html
<div
  v-dDroppable="{
  dropScope: 'drink',
  dragOverClass: 'drag-target-border',
}"
>
  <p>只有 Drinks 可以放在这个container里</p>
</div>

<div
  v-dDroppable="{
  dropScope: ['drink', 'meal'],
  dragOverClass: 'drag-target-border'
}"
>
  <p>Meal 和 Drinks 可以放在这个container里</p>
</div>
```

#### 传递数据

`dDraggable`可以用`dragData`向`dDroppable`传递数据  
`dDroppable`用`@dropEvent`事件接收数据

```html
<ul class="list-group">
  <li v-dDraggable="{ dragData: item }" v-for="item in items" class="list-group-item">{{item.name}}</li>
</ul>

<div class="panel panel-default" v-dDroppable="{'@dropEvent': (e) => onItemDrop(e)}">
  <div class="panel-heading">Drop Items here</div>
  <div class="panel-body">
    <li v-for="item in droppedItems" class="list-group-item">{{item.name}}</li>
  </div>
</div>
```

```js
setup() {
  const items = [
    { name: 'Apple', type: 'fruit' },
    { name: 'Carrot', type: 'vegetable' },
    { name: 'Orange', type: 'fruit' },
  ];
  const droppedItems = [];

  onItemDrop(e) {
    // Get the dropped data here
    droppedItems.push(e.dragData);
  }
}
```

###### Drag Handle

Drag 句柄可以指定实际响应 draggable 事件的元素，而不是 draggable 本身  
这个参数必须是一个字符串，实际上是一个 css 选择器

```html
<li
  v-dDraggable="{
  dragHandle: '.drag-handle'
}"
>
  只有.drag-handle可以响应拖动事件来拖起li
  <div class="pull-right"><i class="drag-handle fa fa-bars fa-lg" aria-hidden="true"></i></div>
</li>
```

###### 异步 DropEnd，通知 Drag 元素

`dDraggable`有一个`dropEndEvent`事件，此事件非浏览器默认事件而是自定义事件，非组件自动触发触发方式是在`dDroppable`的`dropEvent`事件的参数中有一个 dropSubject，当需要触发 drag 元素上的 dropEndEvent 事件的时候调用 dropSubject.next(params) 一般是在接口返回之后 例如：

```html
<ul class="list-group">
  <li
    v-dDraggable="{
    dragData: item,
    '@dropEndEvent': e => dropEnd(e, i)
  }"
    v-for="(item, i) in items;"
  >
    {{item.name}}
  </li>
</ul>

<div class="panel panel-default" v-dDroppable="{'@dropEvent': e => onItemDrop(e)}">
  <div class="panel-heading">Drop Items here</div>
  <div class="panel-body">
    <li v-for="item in droppedItems" class="list-group-item">{{item.name}}</li>
  </div>
</div>
```

```js
setup() {
  onItemDrop(e) {
    ajax.onSuccess(() => {
      e.dropSubject.next(params); //此时才触发dragComponent的dropEnd 并且params对应onDropEnd的$event;
    });
  }
  onDropEnd(event, i) {}
}
```

#### 协同拖拽， 用于二维拖拽，跨纬度拖拽场景

##### 协同拖 dDragSync

用于 dDraggle 对象和同时会被拖走的对象。

###### dDragSync 参数

| 参数      | 类型     | 默认值 | 描述                                                             | 跳转 Demo                                         |
| :-------- | :------- | :----- | :--------------------------------------------------------------- | :------------------------------------------------ |
| dDragSync | `string` | ''     | 必选，拖同步的组名，为空或者空字符串的时候无效，不与其他内容同步 | [二维拖拽和组合拖拽预览](#二维拖拽和组合拖拽预览) |

##### 协同放 dDropSortSync

用于 dDroppable 对象和与 droppable 内 sortable 结构相同的 sortable 区域， 注意 dDroppable 对象里是与 dDroppable 对象同个对象上注册 dDropSortSync，其他不带 dDroppable 的与放置在排序区域。

###### dDropSortSync 参数

| 参数               | 类型        | 默认值 | 描述                                                             | 跳转 Demo                                         |
| :----------------- | :---------- | :----- | :--------------------------------------------------------------- | :------------------------------------------------ |
| dDropSortSync      | `string`    | ''     | 必选，放同步的组名，为空或者空字符串的时候无效，不与其他内容同步 | [二维拖拽和组合拖拽预览](#二维拖拽和组合拖拽预览) |
| dDropSyncDirection | `'v'\| 'h'` | 'v'    | 可选，与 dSortable 的方向正交                                    |

##### 协同监听盒子 dDragDropSyncBox

用于统计 dDragSync 和 dDropSortSync 的公共父祖先。
无参数，放置在公共统计区域则可。

#### 拖拽预览， 用于需要替换拖拽预览的场景

##### 拖拽预览 dDragPreview

需要和 dDraggable 搭配使用， 用于拖起的时候拖动对象的模板

###### dDragPreview 参数

| 参数                                | 类型                            | 默认值 | 描述                                                                               | 跳转 Demo                                         |
| :---------------------------------- | :------------------------------ | :----- | :--------------------------------------------------------------------------------- | :------------------------------------------------ |
| dDragPreview                        | `TemplateRef<any>`              | --     | 必选，预览的模板引用                                                               | [二维拖拽和组合拖拽预览](#二维拖拽和组合拖拽预览) |
| dragPreviewData                     | `any`                           | --     | 可选，自定义数据，将由模板变量获得                                                 |
| dragPreviewOptions                  | `{ skipBatchPreview : boolean}` | --     | 可选，预览选项                                                                     |
| dragPreviewOptions.skipBatchPreview | `boolean`                       | false  | 可选，预览选项, 是否跳过批量预览的样式处理。建议自行处理批量拖拽预览模板的可以跳过 |

###### dDragPreview 模板可用变量

|        变量         |         类型         |                                        变量含义说明                                         |
| :-----------------: | :------------------: | :-----------------------------------------------------------------------------------------: |
|        data         |        `any`         |                            从拖拽预览传入的 dragPreviewData 数据                            |
|      draggedEl      |    `HTMLElement`     |                                      被拖拽的 DOM 元素                                      |
|      dragData       |        `any`         |                               被拖拽元素携带的 dragData 数据                                |
|    batchDragData    |     `Array<any>`     | 被批量拖拽的对象的 dragData 数据的数组， 含被拖拽元素的 dragData， 并且 dragData 处于第一位 |
| dragSyncDOMElements | `Array<HTMLElement>` |                  被协同拖拽的 DOM 元素， 不包括 draggedEl 指向的 DOM 元素                   |

##### 拖拽预览辅助克隆节点 组件`<d-drag-preview-clone-dom-ref>`

可以从节点的引用中恢复 DOM 的克隆对象作为预览

| 参数      | 类型          | 默认值 | 描述                                       | 跳转 Demo                                         |
| :-------- | :------------ | :----- | :----------------------------------------- | :------------------------------------------------ |
| domRef    | `HTMLElement` | --     | 必选，否则无意义，克隆节点的 DOM 引用      | [二维拖拽和组合拖拽预览](#二维拖拽和组合拖拽预览) |
| copyStyle | `boolean`     | true   | 可选，是否克隆节点的时候对节点依次克隆样式 | [二维拖拽和组合拖拽预览](#二维拖拽和组合拖拽预览) |
