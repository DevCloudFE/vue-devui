# Tree 树

一种呈现嵌套结构的组件。

#### 何时使用

文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树组件可以完整展现其中的层级关系，并具有展开/收起、选择等交互功能。

### 基本用法

:::demo 展示嵌套树形结构的呈现、连接线、展开/收起、点击选择等功能。

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
        label: 'Parent node 1',
        children: [
          {
            label: 'Parent node 1-1',
            children: [
              { label: 'Leaf node 1-1-1' }
            ]
          },
          { label: 'Leaf node 1-2' }
        ]
      },
      { label: 'Leaf node 2' }
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

:::demo 通过`check`开启勾选功能。

```vue
<template>
  <div class="flex flex-row" style="height: 28px;">
    <label class="flex items-center mr-xl"><span class="inline-block mr-xs">开启勾选</span><d-switch v-model:checked="openCheck"></d-switch></label>
    <d-radio-group v-if="openCheck" v-model="currentStrategy" direction="row">
      <d-radio v-for="strategy of checkStrategy" :key="strategy" :value="strategy">{{ strategy }}</d-radio>
    </d-radio-group>
  </div>
  <d-tree :data="data" :check="currentStrategy"></d-tree>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  setup() {
    const openCheck = ref(true);
    const checkStrategy = ref(['both', 'downward', 'upward', 'none']);
    const currentStrategy = ref('both');

    const data = ref([
      {
        label: 'Parent node 1',
        children: [
          {
            label: 'Parent node 1-1',
            children: [
              { label: 'Leaf node 1-1-1' },
              { label: 'Leaf node 1-1-2' }
            ]
          },
          { label: 'Leaf node 1-2' }
        ]
      },
      { label: 'Leaf node 2' }
    ]);

    watch(openCheck, (newVal) => {
      if (newVal === false) {
        currentStrategy.value = false;
      } else {
        currentStrategy.value = 'both';

        data.value = [
          {
            label: 'Parent node 1',
            children: [
              {
                label: 'Parent node 1-1',
                children: [
                  { label: 'Leaf node 1-1-1' },
                  { label: 'Leaf node 1-1-2' }
                ]
              },
              { label: 'Leaf node 1-2' }
            ]
          },
          { label: 'Leaf node 2' }
        ];
      }
    });
    
    return {
      data,
      openCheck,
      checkStrategy,
      currentStrategy,
    }
  }
})
</script>
```
:::

### 默认状态

:::demo 通过`expanded`/`selected`/`checked`分别设置默认展开/收起、点击选择、勾选状态。

```vue
<template>
  <d-tree :data="data" check></d-tree>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const data = ref([
      {
        label: 'Parent node 1',
        expanded: true,
        children: [
          {
            label: 'Parent node 1-1',
            children: [
              { label: 'Leaf node 1-1-1' }
            ]
          },
          {
            label: 'Leaf node 1-2',
            checked: true
          }
        ]
      },
      {
        label: 'Leaf node 2',
        selected: true
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

### 禁用状态

:::demo 通过`disableToggle`/`disableSelect`/`disableCheck`分别禁用展开/收起、点击选择、勾选状态。

```vue
<template>
  <d-tree :data="data" check></d-tree>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const data = ref([
      {
        label: 'Parent node 1',
        expanded: true,
        children: [
          {
            label: 'Parent node 1-1',
            disableToggle: true,
            disableSelect: true,
            disableCheck: true,
            children: [
              { label: 'Leaf node 1-1-1' }
            ]
          },
          {
            label: 'Leaf node 1-2',
            disableCheck: true
          }
        ]
      },
      {
        label: 'Leaf node 2',
        disableSelect: true
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

### 自定义图标

:::demo 通过`content`插槽可以自定义节点内容，比如在节点内容前面增加一个图标；通过`icon`插槽可以自定义展开/收起的图标。

```vue
<template>
  <d-tree :data="data">
    <template #content="{nodeData}">
      <svg style="margin-right: 8px" viewBox="0 0 16 16" width="16" height="16"><path :d="`${
        nodeData.isLeaf
        ? 'M13,6 L9,6 L9,5 L9,2 L3,2 L3,14 L13,14 L13,6 Z M12.5857864,5 L10,2.41421356 L10,5 L12.5857864,5 Z M2,1 L10,1 L14,5 L14,15 L2,15 L2,1 Z'
        : nodeData.expanded
          ? 'M16,6 L14,14 L2,14 L0,6 L16,6 Z M14.7192236,7 L1.28077641,7 L2.78077641,13 L13.2192236,13 L14.7192236,7 Z M6,1 L8,3 L15,3 L15,5 L14,5 L14,4 L7.58578644,4 L5.58578644,2 L2,2 L2,5 L1,5 L1,1 L6,1 Z'
          : 'M14,6 L14,5 L7.58578644,5 L5.58578644,3 L2,3 L2,6 L14,6 Z M14,7 L2,7 L2,13 L14,13 L14,7 Z M1,2 L6,2 L8,4 L15,4 L15,14 L1,14 L1,2 Z'
      }`" stroke-width="1" fill="#8a8e99"></path></svg>
      {{nodeData.label}}
    </template>
    <template #icon="{nodeData, toggleNode}">
      <span v-if="nodeData.isLeaf" class="devui-tree-node__indent"></span>
      <span v-else @click="(event) => {
          event.stopPropagation();
          toggleNode(nodeData);
        }"
      >
        <svg :style="{ transform: nodeData.expanded ? 'rotate(90deg)': '', marginLeft: '-2.5px', marginRight: '14.5px', cursor: 'pointer' }" viewBox="0 0 1024 1024" width="12" height="12"><path d="M204.58705 951.162088 204.58705 72.836889 819.41295 511.998977Z" fill="#8a8e99"></path></svg>
      </span>
    </template>
  </d-tree>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const data = ref([
      {
        label: 'Parent node 1',
        children: [
          {
            label: 'Parent node 1-1',
            children: [
              { label: 'Leaf node 1-1-1' }
            ]
          },
          { label: 'Leaf node 1-2' }
        ]
      },
      { label: 'Leaf node 2' }
    ]);

    return {
      data,
    }
  }
})
</script>
```

:::

### 节点合并

:::demo

```vue
<template>
  <d-tree :data="data" ref="treeRef"></d-tree>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const treeRef = ref(null);
    const data = ref([
      {
        label: 'Parent node 1',
        children: [
          {
            label: 'Parent node 1-1',
            children: [
              {
                label: 'Parent node 1-1-1',
                children: [
                  {
                    label: 'Parent node 1-1-1-1'
                  }
                ]
              }
            ]
          },
        ]
      },
      {
        label: 'Parent node 2',
        children: [
          {
            label: 'Parent node 2-1',
            children: [
              {
                label: 'Leaf node 2-1-1'
              },
              {
                label: 'Leaf node 2-1-2'
              },
            ]
          },
        ]
      },
      {
        label: 'Parent node 3',
        children: [
          {
            label: 'Leaf node 3-1',
            children: [
              {
                label: 'Leaf node 3-1-1',
                children: [
                  {
                    label: 'Leaf node 3-1-1-1'
                  }
                ]
              }
            ]
          },
          {
            label: 'Leaf node 3-2'
          }
        ]
      }
    ]);

    onMounted(() => {
      treeRef.value.treeFactory.mergeTreeNodes();
    });

    return {
      data,
      treeRef,
    }
  }
})
</script>
```

:::

### Tree 参数

| 参数名 | 类型                        | 默认值 | 说明                   | 跳转 Demo             |
| :----- | :-------------------------- | :----- | :--------------------- | :-------------------- |
| data   | [ITreeNode\[\]](#itreenode) | []     | 可选，树形结构数据     | [基本用法](#基本用法) |
| check  | [ICheck](#icheck)           | false  | 可选，是否启用勾选功能 | [可勾选](#可勾选)     |

### Tree 插槽

| 插槽名  | 说明                |
| :------ | :------------------ |
| default | 自定义节点          |
| content | 自定义节点内容      |
| icon    | 自定义展开/收起按钮 |

### TreeNode 参数

| 参数名 | 类型                    | 默认值 | 说明                   |
| :----- | :---------------------- | :----- | :--------------------- |
| data   | [ITreeNode](#itreenode) | []     | 可选，节点数据         |
| check  | [ICheck](#icheck)       | false  | 可选，是否启用勾选功能 |

### Tree 类型定义

#### ITreeNode

```ts
interface ITreeNode {
  label: string;
  id?: string;
  children?: ITreeNode[];

  selected?: boolean;
  checked?: boolean;
  expanded?: boolean;

  disableSelect?: boolean;
  disableCheck?: boolean;
  disableToggle?: boolean;
}
```

#### ICheck

```ts
type ICheck = boolean | 'upward' | 'downward' | 'both' | 'none';
```
