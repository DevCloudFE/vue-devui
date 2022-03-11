# Tree 树

一种表现嵌套结构的组件。

### 何时使用

文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

:::demo

```vue
<template>
  <d-tree :data="data"></d-tree>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const data = ref([
      {
        label: 'parent node 1 - expanded',
        open: true,
        disabled: true,
        level: 1,
        children: [
          {
            label: 'parent node 11 - folded',
            level: 2,
            children: [
              {
                label: 'leaf node 111',
                level: 3,
              },
              {
                label: 'leaf node 112',
                level: 3,
              },
              {
                label: 'leaf node 113',
                level: 3,
              },
              {
                label: 'leaf node 114',
                level: 3,
              }
            ]
          },
          {
            label: 'parent node 12 - folded',
            disableToggle: true,
            level: 2,
            children: [
              {
                label: 'leaf node 121',
                level: 3,
              },
              {
                label: 'leaf node 122',
                level: 3,
              },
              {
                label: 'leaf node 123',
                level: 3,
              },
              {
                label: 'leaf node 124',
                level: 3,
              }
            ]
          },
          {
            id: 'dynamic 12',
            label: 'parent node 13 - without children - dynamic loading',
            isParent: true,
            level: 2,
          }
        ]
      },
      {
        label: 'parent node 2 - folded',
        level: 1,
        children: [
          {
            label: 'parent node 21 - expanded',
            open: true,
            level: 2,
            children: [
              {
                label: 'leaf node 211',
                level: 3,
              },
              {
                label: 'leaf node 212',
                level: 3,
              },
              {
                label: 'leaf node 213',
                level: 3,
              },
              {
                label: 'leaf node 214',
                level: 3,
              }
            ]
          },
          {
            label: 'parent node 22 - folded',
            level: 2,
            children: [
              {
                label: 'leaf node 221',
                level: 3,
              },
              {
                label: 'leaf node 222',
                level: 3,
              },
              {
                label: 'leaf node 223',
                level: 3,
              },
              {
                label: 'leaf node 224',
                level: 3,
              }
            ]
          },
          {
            label: 'parent node 23 - folded',
            level: 2,
            children: [
              {
                label: 'leaf node 231',
                level: 3,
              },
              {
                label: 'leaf node 232',
                level: 3,
              },
              {
                label: 'leaf node 233',
                level: 3,
              },
              {
                label: 'leaf node 234',
                level: 3,
              }
            ]
          }
        ]
      },
      {
        id: 'dynamicNode',
        label: 'parent node 3 - without children - dynamic loading',
        isParent: true,
        level: 1,
        data: {
          id: 'newChildNode',
          name: 'new child node'
        }
      }
    ])

    return {
      data
    }
  }
})
</script>
```

:::

### 合并节点

:::demo 当节点下只有一个子节点时，合并该节点。

```vue
<template>
  <d-tree :data="data"></d-tree>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {

    const data = ref([
      {
        label: 'parent node 1',
        level: 1,
        children: [
          {
            label: 'parent node 11',
            open: true,
            level: 2,
            children: [
              {
                label: 'parent node 111',
                level: 3,
                children: [
                  {
                    label: 'parent node 1111',
                    level: 4,
                    children: [
                      {
                        label: 'leaf node 11111',
                        level: 5,
                      }
                    ]
                  }
                ]
              }
            ]
          },
        ]
      },
      {
        label: 'parent node 2',
        level: 1,
        children: [
          {
            label: 'parent node 21',
            level: 2,
            open: true,
            children: [
              {
                label: 'leaf node 211',
                level: 3,
              },
              {
                label: 'leaf node 212',
                level: 3,
              },
              {
                label: 'leaf node 213',
                level: 3,
              },
              {
                label: 'leaf node 214',
                level: 3,
              },
              {
                label: 'leaf node 215',
                level: 3,
              },
            ]
          },
        ]
      },
      {
        label: 'parent node 3',
        level: 1,
        children: [
          {
            label: 'leaf node 31',
            level: 2,
            children: [
              {
                label: 'leaf node 311',
                level: 3,
                children: [
                  {
                    label: 'leaf node 3111',
                    level: 4,
                  }
                ]
              }
            ]
          },
          {
            label: 'leaf node 32',
            level: 2,
          },
          {
            label: 'leaf node 33',
            level: 2,
          }
        ]
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
