# steps-guide 操作指引

引导用户了解业务使用逻辑组件。

### 何时使用

业务推出新特性，或复杂的业务逻辑需要指引用户时使用。

### 基本用法
设定一组操作指引信息顺序显示。
:::demo  
```vue
<template>
  <d-button btnStyle="common" class="step-1">Step 1</d-button>
  <d-button btnStyle="common" class="step-2">Step 2</d-button>
  <d-button btnStyle="common" class="step-3">Step 3</d-button>
  <d-steps-guide :steps="steps"></d-steps-guide>
</template>
<script>
  import { defineComponent, reactive } from 'vue'
  export default defineComponent({
    setup() {
      const steps = reactive([
          { title: '基础用法1', content: '业务推出新特性，或复杂的业务逻辑需要指引用户时使用。', trigger: '.step-1' },
          { title: '基础用法2', content: '业务推出新特性，或复杂的业务逻辑需要指引用户时使用。', trigger: '.step-2' },
          { title: '基础用法3', content: '业务推出新特性，或复杂的业务逻辑需要指引用户时使用。', trigger: '.step-3' }
      ]);
      return {
        steps
      }
    }
  })
</script>
<style>
  .devui-btn-host {
    margin-left: 10px;
  }
</style>
```
:::

### 弹出位置
总共支持 8 个弹出位置。
:::demo 
```vue
<template>
  <div class="top-group">
    <d-button btnStyle="common" class="top-left" width="120px">Top-left</d-button>
    <d-button btnStyle="common" class="top" width="120px">Top</d-button>
    <d-button btnStyle="common" class="top-right" width="120px">Top-right</d-button>
  </div>
  <div class="middle-group">
    <d-button btnStyle="common" class="left" width="120px">Left</d-button>
    <d-button btnStyle="common" class="right" width="120px">Right</d-button>
  </div>
  <div class="bottom-group">
    <d-button btnStyle="common" class="bottom-left" width="120px">Bottom-left</d-button>
    <d-button btnStyle="common" class="bottom" width="120px">Bottom</d-button>
    <d-button btnStyle="common" class="bottom-right" width="120px">Bottom-right</d-button>
  </div>
  <d-steps-guide :steps="stepsPosition"></d-steps-guide>
</template>
<script>
  import { defineComponent, reactive } from 'vue'
  export default defineComponent({
    setup() {
      const stepsPosition = reactive([
          { title: '弹出位置 top-left',
            content: 'Steps Guide', 
            trigger: '.top-left', 
            position: 'top-left' 
          },
          { title: '弹出位置 top', 
            content: 'Steps Guide', 
            trigger: '.top', 
            position: 'top' 
          },
          { title: '弹出位置 top-right', 
            content: 'Steps Guide',
            trigger: '.top-right', 
            position: 'top-right'
          },
          { title: '弹出位置 left', 
            content: 'Steps Guide', 
            trigger: '.left', 
            position: 'left' 
          },
          { title: '弹出位置 right',
            content: 'Steps Guide', 
            trigger: '.right', 
            position: 'right' 
          },
          { title: '弹出位置 bottom-left', 
            content: 'Steps Guide', 
            trigger: '.bottom-left', 
            position: 'bottom-left' 
          },
          { title: '弹出位置 bottom', 
            content: 'Steps Guide', 
            trigger: '.bottom', 
            position: 'bottom' 
          },
          { title: '弹出位置 bottom-right', 
            content: 'Steps Guide', 
            trigger: '.bottom-right', 
            position: 'bottom-right' 
          },
      ]);
    
      return {
        stepsPosition
      }
    }
  })
</script>
<style>
  .top-group, .middle-group, .bottom-group {
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
  }
  .middle-group {
     justify-content: space-between;
  }
</style>
```
:::

### 自定义
自定义操作指引信息弹出的位置和元素。
:::demo  
```vue
<template>
  <d-button btnStyle="common" class="bottom">Custom Position</d-button>
  <d-steps-guide :steps="customSteps"></d-steps-guide>
</template>
<script>
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
    const customSteps = reactive([
        { title: '自定义用法',
          content: '自定义操作指引信息弹出的位置和元素。',
          trigger: '.custom-1', 
          position: {
            left: 0,
            top: 0,
            type: 'top-left'
          } },
        { 
          title: '自定义用法', 
          content: '自定义操作指引信息弹出的位置和元素。',
          trigger: '.custom-2',
          target: '.nav-links', 
          position: 'bottom'
        },
    ]);
    return {
      customSteps
    }
  }
})
</script>
```
:::

### API

d-steps-guide 参数

| 参数  | 类型  | 默认 | 说明                   | 跳转                  |
| ----- | ----- | ---- | ---------------------- | --------------------- |
| steps | array | Step[]   | 必选，操作指引步骤数组 | [基本用法](#基本用法) |

