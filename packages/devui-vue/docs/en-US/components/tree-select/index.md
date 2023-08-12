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

### 自定义图标

:::demo

```vue
<template>
  <d-tree-select v-model="value" :treeData="data">
    <template #default="{ item }">
      <span class="tree-select-demo-icon" :class="[item?.data?.type]">{{item.label}}</span>
    </template>
  </d-tree-select>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('')
    const data = ref([{
      label: '一级 1',
      data: { type: "ppt" },
      children: [{
        label: '二级 1-1',
        data: { type: "doc" },
        children: [{
          label: '三级 1-1-1',
          data: { type: "ppt" },
        }]
      }]
    }, {
      label: '一级 2',
      data: { type: "doc" },
      children: [{
        label: '二级 2-1',
        data: { type: "ppt" },
        children: [{
          label: '三级 2-1-1',
          data: { type: "xls" },
        }]
      }, {
        label: '二级 2-2',
        data: { type: "pdf" },
        children: [{
          label: '三级 2-2-1',
          data: { type: "xls" },
        }]
      }]
    }, {
      label: '一级 3',
      data: { type: "pdf" },
      children: [{
        label: '二级 3-1',
        data: { type: "mix" },
        children: [{
          label: '三级 3-1-1',
          data: { type: "doc" },
        }]
      }, {
        label: '二级 3-2',
        data: { type: "doc" },
        children: [{
          label: '三级 3-2-1',
          data: { type: "xls" },
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
<style>

.tree-select-demo-icon::before {
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

.tree-select-demo-icon.doc::before {
  content: 'W';
  background-color: #295396;
  border: 1px #224488 solid;
}

.tree-select-demo-icon.pdf::before {
  content: 'A';
  background-color: #da0a0a;
  border: 1px #dd0000 solid;
}

.tree-select-demo-icon.xls::before {
  content: 'X';
  background-color: #207044;
  border: 1px #18683c solid;
}

.tree-select-demo-icon.ppt::before {
  content: 'P';
  background-color: #d14424;
  border: 1px #dd4422 solid;
}

.tree-select-demo-icon.mix::before {
  content: '?';
  font-style: normal;
  background-color: #aaaaaa;
  border: 1px #999999 solid;
}
.tree-select-demo-icon-next {
  margin-left: 8px;
}


</style>
```

:::

### 标签化

:::demo

```vue
<template>
  <d-tree-select v-model="value" :treeData="data" placeholder='树形选择框' enableLabelization='true'></d-tree-select>
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

:::demo

```vue
<template>
  <d-tree-select v-model="value" :treeData="data" :multiple='true' enableLabelization='true'></d-tree-select>
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

### TreeSelect 参数

| 参数         | 类型    | 默认  | 说明                                                                | 跳转                                 |
| ------------ | ------- | ----- | ------------------------------------------------------------------- | ------------------------------------ |
|   treeData   |  TreeData |         | 必选，树形选择框的内容                                             | [基本用法](#基本用法)                |
| placeholder  |  string   | '请选择'| 可选，修改输入框的默认显示内容                                       | [基本用法](#基本用法)                |
|   disabled   |  boolean  |  false  | 可选，值为 true 时禁止用户使用                                      | [禁用](#禁用)                       |
|  allowClear  |  boolean  |  false  | 可选，值为 true 时可以清空输入框内容                                | [可清空](#可清空)                   |
|   multiple   |  boolean  |  false  | 可选，值为 true 时可选择多个项                                      | [多选](#多选)                       |
|   leafOnly   |  boolean  |  false  | 可选，值为 true 时仅可选择叶子节点                                  | [仅叶子节点可选](#仅叶子节点可选)     |
|enableLabelization| boolean | false | 可选，值为 true 时仅可选择叶子节点                                  | [标签化](#标签化)     |

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
