# TreeSelect 树形选择框

一种从列表中选择嵌套结构数据的组件。

### 基本用法

:::demo

```vue
<template>
  <d-tree-select v-model="value" :treeData="data" placeholder='树形选择框'></d-tree-select>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('')
    const data = ref([{
      label: '一级 1',
      children: [{
        label: '二级 1-1',
        children: [{
          label: '三级 1-1-1',
        }]
      }]
    }, {
      label: '一级 2',
      children: [{
        label: '二级 2-1',
        children: [{
          label: '三级 2-1-1',
        }]
      }, {
        label: '二级 2-2',
        children: [{
          label: '三级 2-2-1',
        }]
      }]
    }, {
      label: '一级 3',
      children: [{
        label: '二级 3-1',
        children: [{
          label: '三级 3-1-1',
        }]
      }, {
        label: '二级 3-2',
        children: [{
          label: '三级 3-2-1',
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

### 禁用

:::demo

```vue
<template>
  <d-tree-select v-model="value" :treeData="data" :disabled="true"></d-tree-select>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('')
    const data = ref([{
      label: '一级 1',
      children: [{
        label: '二级 1-1',
        children: [{
          label: '三级 1-1-1',
        }]
      }]
    }, {
      label: '一级 2',
      children: [{
        label: '二级 2-1',
        children: [{
          label: '三级 2-1-1',
        }]
      }, {
        label: '二级 2-2',
        children: [{
          label: '三级 2-2-1',
        }]
      }]
    }, {
      label: '一级 3',
      children: [{
        label: '二级 3-1',
        children: [{
          label: '三级 3-1-1',
        }]
      }, {
        label: '二级 3-2',
        children: [{
          label: '三级 3-2-1',
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

### 可清空

:::demo

```vue
<template>
  <d-tree-select v-model="value" :treeData="data" :allowClear="true"></d-tree-select>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('')
    const data = ref([{
      label: '一级 1',
      children: [{
        label: '二级 1-1',
        children: [{
          label: '三级 1-1-1',
        }]
      }]
    }, {
      label: '一级 2',
      children: [{
        label: '二级 2-1',
        children: [{
          label: '三级 2-1-1',
        }]
      }, {
        label: '二级 2-2',
        children: [{
          label: '三级 2-2-1',
        }]
      }]
    }, {
      label: '一级 3',
      children: [{
        label: '二级 3-1',
        children: [{
          label: '三级 3-1-1',
        }]
      }, {
        label: '二级 3-2',
        children: [{
          label: '三级 3-2-1',
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

### 多选

:::demo

```vue
<template>
  <d-tree-select v-model="value" :treeData="data" :multiple='true'></d-tree-select>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('')
    const data = ref([{
      label: '一级 1',
      children: [{
        label: '二级 1-1',
        children: [{
          label: '三级 1-1-1',
        }]
      }]
    }, {
      label: '一级 2',
      children: [{
        label: '二级 2-1',
        children: [{
          label: '三级 2-1-1',
        }]
      }, {
        label: '二级 2-2',
        children: [{
          label: '三级 2-2-1',
        }]
      }]
    }, {
      label: '一级 3',
      children: [{
        label: '二级 3-1',
        children: [{
          label: '三级 3-1-1',
        }]
      }, {
        label: '二级 3-2',
        children: [{
          label: '三级 3-2-1',
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

### 仅叶子节点可选

:::demo

```vue
<template>
  <d-tree-select v-model="value" :treeData="data" :leafOnly='true'></d-tree-select>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('')
    const data = ref([{
      label: '一级 1',
      children: [{
        label: '二级 1-1',
        children: [{
          label: '三级 1-1-1',
        }]
      }]
    }, {
      label: '一级 2',
      children: [{
        label: '二级 2-1',
        children: [{
          label: '三级 2-1-1',
        }]
      }, {
        label: '二级 2-2',
        children: [{
          label: '三级 2-2-1',
        }]
      }]
    }, {
      label: '一级 3',
      children: [{
        label: '二级 3-1',
        children: [{
          label: '三级 3-1-1',
        }]
      }, {
        label: '二级 3-2',
        children: [{
          label: '三级 3-2-1',
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

### API

d-select-tree 参数

| 参数         | 类型    | 默认  | 说明                                                                | 跳转                                 |
| ------------ | ------- | ----- | ------------------------------------------------------------------- | ------------------------------------ |
|   treeData   |  TreeData |         | 必选，树形选择框的内容                                             | [基本用法](#基本用法)                |
| placeholder  |  string   | '请选择'| 可选，修改输入框的默认显示内容                                       | [基本用法](#基本用法)                |
|   disabled   |  boolean  |  false  | 可选，值为 true 时禁止用户使用                                      | [禁用](#禁用)                       |
|  allowClear  |  boolean  |  false  | 可选，值为 true 时可以清空输入框内容                                | [可清空](#可清空)                   |
|   multiple   |  boolean  |  false  | 可选，值为 true 时可选择多个项                                      | [多选](#多选)                       |
|   leafOnly   |  boolean  |  false  | 可选，值为 true 时仅可选择叶子节点                                  | [仅叶子节点可选](#仅叶子节点可选)     |


### 接口 & 类型定义


```ts
interface TreeItem {
  id: number | string
  label: string
  parent?: TreeItem
  children?: Array<TreeItem>
  level?: number
  loading?: boolean
  opened?: boolean
  checked?: boolean
  halfchecked?: boolean
  disabled?: boolean
  
  [prop: string]: any
}

type TreeData = Array<TreeItem>
```