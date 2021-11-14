# TreeSelect 树形选择框

一种从列表中选择嵌套结构数据的组件。

### 基本用法

:::demo

```vue
<template>
  <d-tree-select v-model="value" :treeData="data"></d-tree-select>
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