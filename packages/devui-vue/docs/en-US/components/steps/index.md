# Steps 步骤条

引导用户按步骤完成任务。

#### 何时使用

当需要按特定的步骤完成任务时使用。

### 基本用法

:::demo

```vue
<template>
  <d-steps v-model="activeStep" class="mb-2">
    <d-step title="基本信息"></d-step>
    <d-step title="选择代码源"></d-step>
    <d-step title="选择构建模板"></d-step>
  </d-steps>
  <d-button @click="nextStep">下一步</d-button>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const activeStep = ref(0);

    const nextStep = () => {
      if (activeStep.value > 2) {
        activeStep.value = 0;
      } else {
        activeStep.value++;
      }
    };

    return {
      activeStep,
      nextStep,
    };
  },
});
</script>

<style lang="scss">
.demo-steps-basic-next-step {
  margin-top: 24px;
}
</style>
```

:::

### 居中对齐

:::demo

```vue
<template>
  <d-steps v-model="activeStepAlignCenter" align-center>
    <d-step title="基本信息"></d-step>
    <d-step title="选择代码源"></d-step>
    <d-step title="选择构建模板"></d-step>
  </d-steps>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const activeStepAlignCenter = ref(1);

    return {
      activeStepAlignCenter,
    };
  },
});
</script>
```

:::

### 带描述的步骤条

:::demo

```vue
<template>
  <d-steps v-model="activeStepDescription">
    <d-step title="基本信息" description="填写名称、选择归属项目等基本信息"></d-step>
    <d-step title="选择代码源" description="选择代码仓库、分支等信息"></d-step>
    <d-step title="选择构建模板" description="根据项目类型选择合适的构建模板"></d-step>
  </d-steps>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const activeStepDescription = ref(1);

    return {
      activeStepDescription,
    };
  },
});
</script>
```

:::

### 自定义图标

:::demo

```vue
<template>
  <d-steps v-model="activeStepCustomIcon">
    <d-step title="基本信息" icon="classroom-post-answers-large"></d-step>
    <d-step title="选择代码源" icon="code"></d-step>
    <d-step title="选择构建模板" icon="icon-build-with-tool"></d-step>
  </d-steps>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const activeStepCustomIcon = ref(1);

    return {
      activeStepCustomIcon,
    };
  },
});
</script>
```

:::

### 竖向步骤条

:::demo

```vue
<template>
  <div style="height: 260px;">
    <d-steps v-model="activeStepDirection" direction="vertical">
      <d-step title="基本信息"></d-step>
      <d-step title="选择代码源"></d-step>
      <d-step title="选择构建模板" description="根据项目类型选择合适的构建模板"></d-step>
    </d-steps>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const activeStepDirection = ref(1);

    return {
      activeStepDirection,
    };
  },
});
</script>
```

:::

### 自定义状态

:::demo

```vue
<template>
  <d-steps v-model="activeStepStatus">
    <d-step title="基本信息"></d-step>
    <d-step title="选择代码源" status="error"></d-step>
    <d-step title="选择构建模板"></d-step>
  </d-steps>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const activeStepStatus = ref(1);

    return {
      activeStepStatus,
    };
  },
});
</script>
```

:::

### 简洁模式

:::demo

```vue
<template>
  <d-steps v-model="activeStepSimple" simple class="mb-2" >
    <d-step title="基本信息"></d-step>
    <d-step title="选择代码源"></d-step>
    <d-step title="选择构建模板"></d-step>
  </d-steps>
  <d-button @click="nextStepSimple">下一步</d-button>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const activeStepSimple = ref(1);

    const nextStepSimple = () => {
      if (activeStepSimple.value > 2) {
        activeStepSimple.value = 0;
      } else {
        activeStepSimple.value++;
      }
    };

    return {
      activeStepSimple,
      nextStepSimple,
    };
  },
});
</script>
```

:::

### Steps 参数

| 参数名       | 类型                                | 默认值       | 说明               | 跳转 Demo                 |
| :----------- | :---------------------------------- | :----------- | :----------------- | :------------------------ |
| v-model      | `number`                            | 0            | 当前激活的步骤     | [基本用法](#基本用法)     |
| space        | `number`                            | --           | 可选，step 的间距  |                           |
| align-center | `boolean`                           | false        | 可选，居中对齐     | [居中对齐](#居中对齐)     |
| direction    | [IStepsDirection](#istepsdirection) | 'horizontal' | 可选，步骤条方向   | [竖向步骤条](#竖向步骤条) |
| simple       | `boolean`                           | false        | 可选，是否简洁模式 | [简洁模式](#简洁模式)     |

### Step 参数

| 参数名      | 类型                        | 默认值 | 说明                   | 跳转 Demo                         |
| :---------- | :-------------------------- | :----- | :--------------------- | :-------------------------------- |
| title       | `string`                    | --     | 必选，步骤的标题       | [基本用法](#基本用法)             |
| description | `string`                    | --     | 可选，步骤的描述       | [带描述的步骤条](#带描述的步骤条) |
| icon        | `string`                    | --     | 可选，自定义步骤的图标 | [自定义图标](#自定义图标)         |
| status      | [IStepStatus](#istepstatus) | --     | 可选，步骤的状态       | [自定义状态](#自定义状态)         |

### Step 插槽

| 名称 | 说明       | 参数              | 跳转 Demo |
| :--- | :--------- | :---------------- | :-------- |
| icon | 步骤的图标 | `color`，图标颜色 | --        |

### Steps 类型定义

#### IStepsDirection

```ts
export type IStepsDirection = 'horizontal' | 'vertical';
```

#### IStepStatus

```ts
export type IStepStatus = 'wait' | 'process' | 'finish' | 'success' | 'error';
```
