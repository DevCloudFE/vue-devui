# Tree 树

一种表现嵌套结构的组件。

### 何时使用

文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

### 基本用法

:::demo 本例主要展示嵌套树形结构的呈现、连接线、节点展开收起、点击选择等功能。

```vue
<template>
  <d-new-tree :data="data"></d-new-tree>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const data = ref([
      {
        label: 'Parent node 1',
        children: [
          {
            label: 'Parent node 1-1',
            children: [
              {
                label: 'Leaf node 1-1-1',
              }
            ]
          },
          {
            label: 'Leaf node 1-2',
          }
        ]
      },
      {
        label: 'Leaf node 2',
      }
    ]);

    return {
      data
    }
  }
})
</script>
```

:::

### 可勾选

:::demo 当节点下只有一个子节点时，合并该节点。

```vue
<template>
  <d-new-tree :data="data" check></d-new-tree>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {

    const data = ref([
      {
        label: 'Parent node 1',
        children: [
          {
            label: 'Parent node 1-1',
            children: [
              {
                label: 'Leaf node 1-1-1',
              }
            ]
          },
          {
            label: 'Leaf node 1-2',
          }
        ]
      },
      {
        label: 'Leaf node 2',
      }
    ]);
    
    return {
      data
    }
  }
})
</script>
```
:::

### 自定义图标

:::demo 自定义操作按钮图标、节点图标。

```vue
<template>
  <div style="width: 100%">
    <div class="tree-title">
      <h4>Node</h4>
      <h4>Status</h4>
    </div>
    <d-tree :data="data">
      <template #default="{ node }">
        <span class="my-icon-next"></span>
        <span :class="[node?.data?.type && 'my-icon', node?.data?.type]" ></span>
        <span class="op-title">{{ node.label }}</span>
        <span class="op-status"></span>
        <span class="op-icons icon icon-add"></span>
        <span class="op-icons icon icon-edit"></span>
        <span class="op-icons icon icon-close"></span>
        <span class="op-right">{{ node.status }}</span>
      </template>
    </d-tree>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {

    const data = ref([
      {
        label: "parent node 1",
        data: { type: "mix" },
        open: true,
        status: "status1",
        children: [
          {
            label: "leaf node 1-112121212",
            data: { type: "mix" },
            open: false,
            status: "status1",
            children: [
              {
                label: "leaf node 1-1-1",
                data: { type: "ppt" },
                status: "status2",
              },
              {
                label: "leaf node 1-1-2",
                data: { type: "xls" },
                status: "status2",
              },
            ],
          },
          {
            label: "leaf node 1-2",
            data: { type: "mix" },
            open: false,
            status: "status1",
            children: [
              {
                label: "leaf node 1-2-1",
                data: { type: "ppt" },
                status: "status2",
              },
              {
                label: "leaf node 1-2-2",
                data: { type: "doc" },
                status: "status2",
              },
            ],
          },
        ],
      },
      {
        label: "parent node 2",
        data: { type: "ppt" },
        open: false,
        status: "status1",
        children: [
          {
            label: "leaf node 2-1",
            data: { type: "ppt" },
            status: "status1",
          },
          {
            label: "leaf node 2-2",
            data: { type: "ppt" },
            status: "status1",
          },
        ],
      },
      {
        label: "parent node 3",
        data: { type: "xls" },
        open: false,
        status: "status1",
        children: [
          {
            label: "leaf node 3-1",
            data: { type: "xls" },
            status: "status1",
          },
          {
            label: "leaf node 3-2",
            data: { type: "xls" },
            status: "status1",
          },
        ],
      },
    ]);
    
    return {
      data
    }
  }
})
</script>
<style>

.my-icon::before {
  width: 16px;
  height: 16px;
  font-style: italic;
  font-size: 12px;
  line-height: 14px;
  display: inline-block;
  text-align: center;
  color: #fff;
  border-radius: 2px;
}

.my-icon.doc::before {
  content: 'W';
  background-color: #295396;
  border: 1px #224488 solid;
}

.my-icon.pdf::before {
  content: 'A';
  background-color: #da0a0a;
  border: 1px #dd0000 solid;
}

.my-icon.xls::before {
  content: 'X';
  background-color: #207044;
  border: 1px #18683c solid;
}

.my-icon.ppt::before {
  content: 'P';
  background-color: #d14424;
  border: 1px #dd4422 solid;
}

.my-icon.mix::before {
  content: '?';
  font-style: normal;
  background-color: #aaaaaa;
  border: 1px #999999 solid;
}
.my-icon-next {
  margin-left: 8px;
}

.op-title {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}

.op-icons {
  display: inline-block;
  margin-left: 8px;
  cursor: pointer;
  color: #575d6c;
  font-size: 16px;
}

.op-status {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #50d4ab;
}

.op-right {
  position: absolute;
  right: 25px;
}

.status-position {
  position: absolute;
  right: 8px;
}

.tree-title {
  display: flex;
  justify-content: space-between;
  padding-left: 24px;
  padding-right: 16px;
}

.op-icons:focus {
  outline: none;
}

.devui-tree-node__edit {
  margin: 0 8px;
}


</style>
```
:::

### 可勾选树

:::demo 可以进行勾选的树。

```vue
<template>
  <d-tree :data="data" :checkable="true" ></d-tree>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const data = ref([
      {
        label: "parent node 1",
      },
      {
        label: "parent node 2",
        open: true,
        children: [
          {
            label: "leaf node 2-1",
            children: [
              {
                label: "leaf node 2-1-1",
              },
              {
                label: "leaf node 2-1-2",
              },
            ],
          },
          {
            label: "leaf node 2-2",
            open: true,
            children: [
              {
                label: "leaf node 2-2-1",
                disabled: true,
                isChecked: true,
              },
              {
                label: "leaf node 2-2-2",
                disableSelect: true,
              },
            ],
          },
        ],
      },
      {
        label: "parent node 3",
        disableToggle: true,
        children: [
          {
            label: "leaf node 3-1",
          },
          {
            label: "leaf node 3-2",
          },
        ],
      },
      {
        label: "parent node 4",
        children: [
          {
            label: "leaf node 4-1",
          },
          {
            label: "leaf node 4-2",
          },
        ],
      },
      {
        label: "parent node 5",
        children: [
          {
            label: "leaf node 5-1",
          },
          {
            label: "leaf node 5-2",
          },
        ],
      },
    ]);
    
    return {
      data,
    }
  }
})
</script>
```
:::

### 控制父子check关系

:::demo 通过 checkableRelation 控制check时父子节点的表现。

```vue
<template>
  <h6><p>checkableRelation = "both"</p></h6>
  <d-tree :data="data" :checkable="true" checkableRelation="both" ></d-tree>
  <h6><p>checkableRelation = "upward"</p></h6>
  <d-tree :data="data" :checkable="true" checkableRelation="upward" ></d-tree>
  <h6><p>checkableRelation = "downward"</p></h6>
  <d-tree :data="data" :checkable="true" checkableRelation="downward" ></d-tree>
  <h6><p>checkableRelation = "none"</p></h6>
  <d-tree :data="data" :checkable="true" checkableRelation="none" ></d-tree>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const data = ref([
      {
        label: 'parent node 1 - expanded',
        open: true,
        children: [
          {
            label: 'parent node 11 - folded',
            children: [
              {
                label: 'leaf node 111',
              },
              {
                label: 'leaf node 112',
              },
              {
                label: 'leaf node 113',
              },
              {
                label: 'leaf node 114',
              },
            ],
          },
          {
            label: 'parent node 12 - folded',
            children: [
              {
                label: 'leaf node 121',
              },
              {
                label: 'leaf node 122',
              },
              {
                label: 'leaf node 123',
              },
              {
                label: 'leaf node 124',
              },
            ],
          },
          {
            label: 'parent node 13 - without children',
            isparent: true,
          },
        ],
      },
      {
        label: 'parent node 2 - folded',
        children: [
          {
            label: 'parent node 21 - expanded',
            open: true,
            children: [
              {
                label: 'leaf node 211',
              },
              {
                label: 'leaf node 212',
              },
              {
                label: 'leaf node 213',
              },
              {
                label: 'leaf node 214',
              },
            ],
          },
          {
            label: 'parent node 22 - folded',
            children: [
              {
                label: 'leaf node 221',
              },
              {
                label: 'leaf node 222',
              },
              {
                label: 'leaf node 223',
              },
              {
                label: 'leaf node 224',
              },
            ],
          },
          {
            label: 'parent node 23 - folded',
            children: [
              {
                label: 'leaf node 231',
              },
              {
                label: 'leaf node 232',
              },
              {
                label: 'leaf node 233',
              },
              {
                label: 'leaf node 234',
              },
            ],
          },
        ],
      },
    ]);
    
    return {
      data,
    }
  }
})
</script>
```
:::

### 添加子节点，编辑、删除节点

:::demo 通过 checkableRelation 控制check时父子节点的表现。

```vue
<template>
  <d-tree :data="data" ></d-tree>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const data = ref([
      {
        label: 'parent node 1 - expanded',
        open: true,
        addable: 'true',
        editable: 'true',
        deletable: 'true',
        children: [
          {
            label: 'parent node 11 - folded',
            addable: 'true',
            editable: 'true',
            deletable: 'true',
            children: [
              {
                label: 'leaf node 111',
                editable: 'true',
                deletable: 'true',
              },
              {
                label: 'leaf node 112',
                editable: 'true',
                deletable: 'true',
              },
              {
                label: 'leaf node 113',
                editable: 'true',
                deletable: 'true',
              },
              {
                label: 'leaf node 114',
                editable: 'true',
                deletable: 'true',
              },
            ],
          },
          {
            label: 'parent node 12 - folded',
            addable: 'true',
            editable: 'true',
            deletable: 'true',
            children: [
              {
                label: 'leaf node 121',
                editable: 'true',
                deletable: 'true',
              },
              {
                label: 'leaf node 122',
                editable: 'true',
                deletable: 'true',
              },
              {
                label: 'leaf node 123',
                editable: 'true',
                deletable: 'true',
              },
              {
                label: 'leaf node 124',
                editable: 'true',
                deletable: 'true',
              },
            ],
          },
          {
            label: 'parent node 13 - without children',
            isparent: true,
            addable: 'true',
            editable: 'true',
            deletable: 'true',
          },
        ],
      },
      {
        label: 'parent node 2 - folded',
        addable: 'true',
        editable: 'true',
        deletable: 'true',
        children: [
          {
            label: 'parent node 21 - expanded',
            open: true,
            addable: 'true',
            editable: 'true',
            deletable: 'true',
            children: [
              {
                label: 'leaf node 211',
                editable: 'true',
                deletable: 'true',
              },
              {
                label: 'leaf node 212',
                editable: 'true',
                deletable: 'true',
              },
              {
                label: 'leaf node 213',
                editable: 'true',
                deletable: 'true',
              },
              {
                label: 'leaf node 214',
                editable: 'true',
                deletable: 'true',
              },
            ],
          },
          {
            label: 'parent node 22 - folded',
            addable: 'true',
            editable: 'true',
            deletable: 'true',
            children: [
              {
                label: 'leaf node 221',
                editable: 'true',
                deletable: 'true',
              },
              {
                label: 'leaf node 222',
                editable: 'true',
                deletable: 'true',
              },
              {
                label: 'leaf node 223',
                editable: 'true',
                deletable: 'true',
              },
              {
                label: 'leaf node 224',
                editable: 'true',
                deletable: 'true',
              },
            ],
          },
          {
            label: 'parent node 23 - folded',
            addable: 'true',
            editable: 'true',
            deletable: 'true',
            children: [
              {
                label: 'leaf node 231',
                editable: 'true',
                deletable: 'true',
              },
              {
                label: 'leaf node 232',
                editable: 'true',
                deletable: 'true',
              },
              {
                label: 'leaf node 233',
                editable: 'true',
                deletable: 'true',
              },
              {
                label: 'leaf node 234',
                editable: 'true',
                deletable: 'true',
              },
            ],
          },
        ],
      },
    ]);
    
    return {
      data,
    }
  }
})
</script>
```
:::


### 可拖拽树

:::demo 通过OperableTree的 draggable 属性配置节点的拖拽功能，并支持外部元素拖拽入树。

```vue
<template>
  <h6><p>Default</p></h6>
  <d-tree :data="data" :draggable="true" :dropType="{ dropInner: true }"></d-tree>
  <h6><p>Sortable</p></h6>
  <d-tree :data="data" :draggable="true" :dropType="{ dropPrev: true, dropNext: true, dropInner: true }"></d-tree>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const data = ref([
      {
        label: 'parent node 1'
      },
      {
        label: 'parent node 2',
        open: true,
        children: [
          {
            label: 'leaf node 2-1',
            open: true,
            children: [
              {
                label: 'leaf node 2-1-1'
              },
              {
                label: 'leaf node 2-1-2'
              }
            ]
          },
          {
            label: 'leaf node 2-2',
            children: [
              {
                label: 'leaf node 2-2-1'
              },
              {
                label: 'leaf node 2-2-2'
              }
            ]
          }
        ]
      },
      {
        label: 'parent node 3',
        open: true,
        children: [
          {
            label: 'leaf node 3-1'
          },
          {
            label: 'leaf node 3-2'
          }
        ]
      },
      {
        label: 'parent node 4',
        open: true,
        children: [
          {
            label: 'leaf node 4-1'
          },
          {
            label: 'leaf node 4-2'
          }
        ]
      },
      {
        label: 'parent node 5',
        open: true,
        children: [
          {
            label: 'leaf node 5-1'
          },
          {
            label: 'leaf node 5-2'
          }
        ]
      }
    ]);
    
    return {
      data,
    }
  }
})
</script>
```
:::

### useTree

:::demo

```vue
<template>
  <d-new-tree :data="data">
    <template #content="{nodeData}">
      <svg t="1649231851892" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2194" width="16" height="16"><path d="M946.5 505L560.1 118.8l-25.9-25.9c-12.3-12.2-32.1-12.2-44.4 0L77.5 505c-12.3 12.3-18.9 28.6-18.8 46 0.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8 12.1-12.1 18.7-28.2 18.7-45.3 0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204z m217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" p-id="2195"></path></svg>
      {{nodeData.label}}
    </template>
    <template #icon="{nodeData, toggleNode}">
      <span v-if="nodeData.isLeaf" class="devui-tree-node__indent"></span>
      <span v-else @click="(event) => {
          event.stopPropagation();
          toggleNode(nodeData);
        }"
      >
        <svg v-if="!nodeData.expanded" t="1649233280637" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4033" width="12" height="12"><path d="M204.58705 951.162088 204.58705 72.836889 819.41295 511.998977Z" p-id="4034" fill="#c0c4cc"></path></svg>
        <svg v-else t="1649232304515" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3732" width="12" height="12"><path d="M511.999488 819.413462 72.8374 204.586538 951.1626 204.586538Z" p-id="3733" fill="#c0c4cc"></path></svg>
      </span>
    </template>
  </d-new-tree>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const data = ref([
      {
        label: 'Parent node 1',
        id: 'node-1',
        children: [
          {
            label: 'Parent node 1-1',
            id: 'node-1-1',
            disableCheck: true,
            disableSelect: true,
            disableToggle: true,
            children: [
              {
                label: 'Leaf node 1-1-1',
                id: 'node-1-1-1',
              }
            ]
          },
          {
            label: 'Leaf node 1-2',
            id: 'node-1-2',
            children: [
              {
                label: 'Leaf node  1-2-1',
                id: 'node-1-2-1',
              },
              {
                label: 'Parent node 1-2-2',
                id: 'node-1-2-2',
                children: [
                  {
                    label: 'Leaf node 1-2-2-1',
                    id: 'node-1-2-2-1'
                  }
                ]
              },
              {
                label: 'Parent node 1-2-3',
                id: 'node-1-2-3',
              }
            ]
          },
          {
            label: 'Lead node 1-3',
            id: 'node-1-3',
          },
        ],
      },
      {
        label: 'Leaf node 2',
        id: 'node-2',
      },
      {
        label: 'Leaf node 3',
        id: 'node-3',
      }
    ]);

    return {
      data,
    }
  }
})
</script>
```

:::
