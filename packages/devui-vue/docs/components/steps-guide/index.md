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
  <d-steps-guide :steps="steps" ref="stepsRef"></d-steps-guide>
</template>
<script>
  import { defineComponent, reactive, ref, onMounted } from 'vue'
  export default defineComponent({
    setup() {
      const steps = reactive([
          { title: '基础用法1', content: '业务推出新特性，或复杂的业务逻辑需要指引用户时使用。', trigger: '.step-1' },
          { title: '基础用法2', content: '业务推出新特性，或复杂的业务逻辑需要指引用户时使用。', trigger: '.step-2' },
          { title: '基础用法3', content: '业务推出新特性，或复杂的业务逻辑需要指引用户时使用。', trigger: '.step-3' }
      ]);
      const stepsRef = ref(null)

      return {
        steps,
        stepsRef
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
    <d-button btnStyle="common" class="top-left" width="120px" @click="handleClick(0)">Top-left</d-button>
    <d-button btnStyle="common" class="top" width="120px" @click="handleClick(1)">Top</d-button>
    <d-button btnStyle="common" class="top-right" width="120px" @click="handleClick(2)">Top-right</d-button>
  </div>
  <div class="middle-group">
    <d-button btnStyle="common" class="left" width="120px" @click="handleClick(7)">Left</d-button>
    <d-button btnStyle="common" class="right" width="120px" @click="handleClick(3)">Right</d-button>
  </div>
  <div class="bottom-group">
    <d-button btnStyle="common" class="bottom-left" width="120px" @click="handleClick(6)">Bottom-left</d-button>
    <d-button btnStyle="common" class="bottom" width="120px" @click="handleClick(5)">Bottom</d-button>
    <d-button btnStyle="common" class="bottom-right" width="120px" @click="handleClick(4)">Bottom-right</d-button>
  </div>
  <d-steps-guide :steps="stepsPosition" ref="stepsPositionRef"></d-steps-guide>
</template>
<script>
  import { defineComponent, reactive, ref } from 'vue'
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
          { title: '弹出位置 right',
            content: 'Steps Guide', 
            trigger: '.right', 
            position: 'right' 
          },
          { title: '弹出位置 bottom-right', 
            content: 'Steps Guide', 
            trigger: '.bottom-right', 
            position: 'bottom-right' 
          },
          { title: '弹出位置 bottom', 
            content: 'Steps Guide', 
            trigger: '.bottom', 
            position: 'bottom' 
          },
          { title: '弹出位置 bottom-left', 
            content: 'Steps Guide', 
            trigger: '.bottom-left', 
            position: 'bottom-left' 
          },
          { title: '弹出位置 left', 
            content: 'Steps Guide', 
            trigger: '.left', 
            position: 'left' 
          }
      ]);

      const stepsPositionRef = ref(null)
    
      const handleClick = (index) => {
        stepsPositionRef.value.setCurrentIndex(index)
      }
      return {
        stepsPosition,
        handleClick,
        stepsPositionRef
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
  <d-steps-guide :steps="customSteps" :showDots="false" :showClose="false"></d-steps-guide>
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
| showClose | boolean | true   | 可选，是否显示关闭按钮 | [自定义](#基本用法) |
| showDots | boolean | true   | 可选，是否显示表示导航指引顺序的圆点 | [自定义](#基本用法) |