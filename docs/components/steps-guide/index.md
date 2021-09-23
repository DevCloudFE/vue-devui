# steps-guide 操作指引

引导用户了解业务使用逻辑组件。

### 何时使用

业务推出新特性，或复杂的业务逻辑需要指引用户时使用。

### 基本用法
设定一组操作指引信息顺序显示。
<d-steps-guide title="基础用法" content="业务推出新特性，或复杂的业务逻辑需要指引用户时使用。">
    <d-button bsStyle="common">Step 1</d-button>
</d-steps-guide>
<br />

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
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const step = ref(4);
  
    return {
      step
    }
  }
})
</script>

### API

d-slider 参数

| 参数    | 类型  | 默认 | 说明                                                              | 跳转 |
| --------- | ------- | ----- | ------------------------------------------------------------------- | ---- |
|   steps   | array   |  []   | 可选，滑动输入条的最大值                                |[基本用法](#基本用法)      |

