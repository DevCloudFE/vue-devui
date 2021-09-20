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
    const data = ref([{
      label: '一级 1', level: 1,
      children: [{
        label: '二级 1-1', level: 2,
        children: [{
          label: '三级 1-1-1', level: 3, isLeaf: true,
        }]
      }]
    }, {
      label: '一级 2', level: 1,
      children: [{
        label: '二级 2-1', level: 2,
        children: [{
          label: '三级 2-1-1', level: 3, isLeaf: true,
        }]
      }, {
        label: '二级 2-2', level: 2,
        children: [{
          label: '三级 2-2-1', level: 3, isLeaf: true,
        }]
      }]
    }, {
      label: '一级 3', level: 1,
      children: [{
        label: '二级 3-1', level: 2,
        children: [{
          label: '三级 3-1-1', level: 3, isLeaf: true,
        }]
      }, {
        label: '二级 3-2', level: 2,
        children: [{
          label: '三级 3-2-1', level: 3, isLeaf: true,
        }]
      }]
    }, {
      label: '一级 4', level: 1, isLeaf: true,
    }])

    return {
      data,
    }
  }
})
</script>
```

:::

### API

|    参数     |   类型   |   默认    | 说明                     | 跳转 Demo                         |
| :---------: | :------: | :-------: | :----------------------- | --------------------------------- |
|    data     | `TreeData` |    --     | 必选，数据源          |              |

### TreeData 数据结构

|    参数     |   类型   |   默认    | 说明                     | 跳转 Demo                         |
| :---------: | :------: | :-------: | :----------------------- | --------------------------------- |
|    label     | `String` |    --     | 必选，文本内容          |              |
|    children     | `TreeData` |    --     | 可选，子节点          |              |
