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


