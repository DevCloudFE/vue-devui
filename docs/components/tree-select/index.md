# TreeSelect 树形选择框

一种从列表中选择嵌套结构数据的组件。

### 基本用法

:::demo

```vue
<template>
  <d-tree-select v-model="value" :treeData="data" placeholder></d-tree-select>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('')
    const data = ref([{
      label: '一级 1',
      level: 1,
      children: [{
        label: '二级 1-1',
        level: 2,
        children: [{
          label: '三级 1-1-1',
          level: 3,
        }]
      }]
    }, {
      label: '一级 2',
      level: 1,
      children: [{
        label: '二级 2-1',
        level: 2,
        children: [{
          label: '三级 2-1-1',
          level: 3,
        }]
      }, {
        label: '二级 2-2',
        level: 2,
        children: [{
          label: '三级 2-2-1',
          level: 3,
        }]
      }]
    }, {
      label: '一级 3',
      level: 1,
      children: [{
        label: '二级 3-1',
        level: 2,
        children: [{
          label: '三级 3-1-1',
          level: 3,
        }]
      }, {
        label: '二级 3-2',
        level: 2,
        children: [{
          label: '三级 3-2-1',
          level: 3,
        }]
      }]
    }])

    return {
      data,
      value
    }
  }
})
</script>
```

:::