# StepsGuide 操作指引

引导用户了解业务使用逻辑组件。

#### 何时使用

业务推出新特性，或复杂的业务逻辑需要指引用户时使用。

### 基本用法

设定一组操作指引信息顺序显示。
:::demo

```vue
<template>
  <d-button class="step-1 ml-s" @click="handleClick(0)">Step 1</d-button>
  <d-button class="step-2 ml-s" @click="handleClick(1)">Step 2</d-button>
  <d-button class="step-3 ml-s" @click="handleClick(2)">Step 3</d-button>
  <d-steps-guide
    ref="stepRef"
    :steps="steps"
    v-model:step-index="stepIndex"
    :step-change="handleStepChange"
    @guide-close="handleGuideClose"
  ></d-steps-guide>
</template>
<script>
import { defineComponent, reactive, ref, onMounted } from 'vue';
export default defineComponent({
  setup() {
    const baseSteps = [
        { title: '基础用法1', content: '业务推出新特性，或复杂的业务逻辑需要指引用户时使用。', trigger: '.step-1' },
        { title: '基础用法2', content: '业务推出新特性，或复杂的业务逻辑需要指引用户时使用。', trigger: '.step-2' },
        { title: '基础用法3', content: '业务推出新特性，或复杂的业务逻辑需要指引用户时使用。', trigger: '.step-3' },
      ],
      positionSteps = [
        { title: '弹出位置 top-left', content: 'Steps Guide', trigger: '.top-left', position: 'top-left' },
        { title: '弹出位置 top', content: 'Steps Guide', trigger: '.top', position: 'top' },
        { title: '弹出位置 top-right', content: 'Steps Guide', trigger: '.top-right', position: 'top-right' },
        { title: '弹出位置 right', content: 'Steps Guide', trigger: '.right', position: 'right' },
        { title: '弹出位置 bottom-right', content: 'Steps Guide', trigger: '.bottom-right', position: 'bottom-right' },
        { title: '弹出位置 bottom', content: 'Steps Guide', trigger: '.bottom', position: 'bottom' },
        { title: '弹出位置 bottom-left', content: 'Steps Guide', trigger: '.bottom-left', position: 'bottom-left' },
        { title: '弹出位置 left', content: 'Steps Guide', trigger: '.left', position: 'left' },
      ],
      customSteps = [
        {
          title: '自定义用法',
          content: '自定义操作指引信息弹出的位置和元素。',
          trigger: '.custom-1',
          position: {
            leftFix: 0,
            topFix: 0,
            type: 'top',
          },
        },
        {
          title: '自定义用法',
          content: '自定义操作指引信息弹出的位置和元素。',
          trigger: '.custom-2',
          target: '.nav-links',
          position: 'bottom',
        },
      ];
    let steps = ref(baseSteps);
    const stepIndex = ref(0),
      stepRef = ref(null);
    const handleClick = (index) => {
      steps.value = baseSteps;
      stepRef.value.setCurrentIndex(index);
    };
    const handleStepChange = (index, prevIndex) => {
      /* code */
      return true;
    };
    const handleGuideClose = (index) => {
      const stepsLength = steps.value.length;
      if (index === stepsLength - 1 && stepsLength !== 2) {
        steps.value = stepsLength === 3 ? positionSteps : customSteps;
        stepRef.value.setCurrentIndex(0);
      }
    };
    return {
      stepRef,
      steps,
      stepIndex,
      handleClick,
      handleStepChange,
      handleGuideClose,
    };
  },
});
</script>
```

:::

### 弹出位置

总共支持 8 个弹出位置。
:::demo

```vue
<template>
  <div class="flex mb-s justify-center">
    <d-button class="top-left ml-s" width="120px" @click="handleClick(0)">Top-left</d-button>
    <d-button class="top ml-s" width="120px" @click="handleClick(1)">Top</d-button>
    <d-button class="top-right ml-s" width="120px" @click="handleClick(2)">Top-right</d-button>
  </div>
  <div class="flex mb-s justify-around">
    <d-button class="left ml-s" width="120px" @click="handleClick(7)">Left</d-button>
    <d-button class="right ml-s" width="120px" @click="handleClick(3)">Right</d-button>
  </div>
  <div class="flex mb-s justify-center">
    <d-button class="bottom-left ml-s" width="120px" @click="handleClick(6)">Bottom-left</d-button>
    <d-button class="bottom ml-s" width="120px" @click="handleClick(5)">Bottom</d-button>
    <d-button class="bottom-right ml-s" width="120px" @click="handleClick(4)">Bottom-right</d-button>
  </div>
  <d-steps-guide :steps="steps" v-model:step-index="stepIndex" ref="stepsRef"></d-steps-guide>
</template>
<script>
import { defineComponent, reactive, ref, onMounted } from 'vue';
export default defineComponent({
  setup() {
    const steps = reactive([
      { title: '弹出位置 top-left', content: 'Steps Guide', trigger: '.top-left', position: 'top-left' },
      { title: '弹出位置 top', content: 'Steps Guide', trigger: '.top', position: 'top' },
      { title: '弹出位置 top-right', content: 'Steps Guide', trigger: '.top-right', position: 'top-right' },
      { title: '弹出位置 right', content: 'Steps Guide', trigger: '.right', position: 'right' },
      { title: '弹出位置 bottom-right', content: 'Steps Guide', trigger: '.bottom-right', position: 'bottom-right' },
      { title: '弹出位置 bottom', content: 'Steps Guide', trigger: '.bottom', position: 'bottom' },
      { title: '弹出位置 bottom-left', content: 'Steps Guide', trigger: '.bottom-left', position: 'bottom-left' },
      { title: '弹出位置 left', content: 'Steps Guide', trigger: '.left', position: 'left' },
    ]);

    const stepsRef = ref(null),
      stepIndex = ref(-1);
    const handleClick = (index) => {
      stepsRef.value.setCurrentIndex(index);
    };

    return {
      steps,
      stepIndex,
      handleClick,
      stepsRef,
    };
  },
});
</script>
```

:::

### 自定义

自定义操作指引信息弹出的位置和元素。
:::demo

```vue
<template>
  <d-button class="ml-s">Custom Position</d-button>
  <d-button class="ml-s">Custom Target</d-button>
  <d-steps-guide ref="stepsRef" :steps="customSteps" :show-dots="false" :show-close="false"></d-steps-guide>
</template>
<script>
import { defineComponent, reactive, ref, onMounted } from 'vue';
export default defineComponent({
  setup() {
    const customSteps = reactive([
      {
        title: '自定义用法',
        content: '自定义操作指引信息弹出的位置和元素。',
        trigger: '.custom-1',
        position: {
          leftFix: 0,
          topFix: 0,
          type: 'top',
        },
      },
      {
        title: '自定义用法',
        content: '自定义操作指引信息弹出的位置和元素。',
        trigger: '.custom-2',
        target: '.nav-links',
        position: 'bottom',
      },
    ]);
    const stepsRef = ref(null);
    onMounted(() => {
      stepsRef.value.closeGuide('custom');
    });
    return {
      customSteps,
      stepsRef,
    };
  },
});
</script>
```

:::

### StepsGuide 参数

| 参数                    | 类型     | 默认 | 说明                                                            | 跳转                  |
| :---------------------- | :------- | :--- | :-------------------------------------------------------------- | :-------------------- |
| steps                   | array    | []   | 必选，操作指引步骤数组                                          | [基本用法](#基本用法) |
| step-index              | number   |      | 可选，表示当前指引的索引，为 -1 时表示指引为关闭状态            | [基本用法](#基本用法) |
| z-index                 | number   | 1100 | 可选，用于调整指引信息的显示层级                                |
| show-close              | boolean  | true | 可选，是否显示关闭按钮                                          | [自定义](#基本用法)   |
| show-dots               | boolean  | true | 可选，是否显示表示导航指引顺序的圆点                            | [自定义](#基本用法)   |
| scroll-to-target-switch | boolean  | true | 可选，是否自动滚动页面至指引信息显示的位置 dom                  |                       |
| step-change             | Function |      | 可选，在切换步骤时前置执行，返回 boolean 值决定是否显示当前步骤 |
