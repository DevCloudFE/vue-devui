# Steps 步骤条

引导用户按步骤完成任务。

#### 何时使用

当需要按特定的步骤完成任务时使用。

### 基本用法

:::demo

```vue
<template>
  <d-steps v-model="activeStep">
    <d-step title="基本信息"></d-step>
    <d-step title="选择代码源"></d-step>
    <d-step title="选择构建模板"></d-step>
  </d-steps>
  <d-button @click="nextStep" class="demo-steps-basic-next-step">下一步</d-button>
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

### Steps 参数

| 参数名  | 类型     | 默认值 | 说明           | 跳转 Demo             |
| :------ | :------- | :----- | :------------- | :-------------------- |
| v-model | `number` | 0      | 当前激活的步骤 | [基本用法](#基本用法) |

### Step 参数

| 参数名 | 类型     | 默认值 | 说明             | 跳转 Demo             |
| :----- | :------- | :----- | :--------------- | :-------------------- |
| title  | `string` | --     | 必选，步骤的标题 | [基本用法](#基本用法) |
