# steps-guide 操作指引

引导用户了解业务使用逻辑组件。

### 何时使用

业务推出新特性，或复杂的业务逻辑需要指引用户时使用。

### 基本用法
设定一组操作指引信息顺序显示。
<d-button bsStyle="common" class="step-1">Step 1</d-button>
<br />
<d-button bsStyle="common" class="step-2">Step 2</d-button>
<br />
<d-button bsStyle="common" class="step-3">Step 3</d-button>
<br />
<d-steps-guide :steps="steps"></d-steps-guide>
### 弹出位置
总共支持 8 个弹出位置。
<br />

### 自定义
自定义操作指引信息弹出的位置和元素。

<br />

```html
<template>
</template>
<script lang="ts">
</script>
```


<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
export default defineComponent({
  setup() {
    const steps = reactive([
        { title: '基础用法1', content: '业务推出新特性，或复杂的业务逻辑需要指引用户时使用。', selector: '.step-1' },
        { title: '基础用法2', content: '业务推出新特性，或复杂的业务逻辑需要指引用户时使用。', selector: '.step-2' },
        { title: '基础用法3', content: '业务推出新特性，或复杂的业务逻辑需要指引用户时使用。', selector: '.step-3' }
    ]);
    return {
      steps,
    }
  }
})
</script>

### API

d-steps-guide 参数

| 参数    | 类型  | 默认 | 说明                                              | 跳转 |
| --------- | ------- | ----- | ------------------------------------------------------------------- | ---- |
|   steps   | array   |  []   | 必选，操作指引步骤数组                       |[基本用法](#基本用法)      |

