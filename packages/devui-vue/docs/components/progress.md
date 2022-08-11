# Progress 进度条

进度条。

#### 何时使用

1. 当操作需要较长的时间时，向用户展示操作进度。
2. 当操作需要打断现有界面或后台运行，需要较长时间时。
3. 当需要显示一个操作完成的百分比或已完成的步骤/总步骤时。

### 基本用法

基本的进度和文字配置。

::: demo

```vue
<template>
  <section class="devui-code-box-demo">
    <div class="progress-container">
      <d-progress :percentage="80" percentageText="80%"></d-progress>
    </div>
    <div class="progress-container">
      <d-progress :percentage="30" percentageText="30%" barBgColor="#50D4AB" height="30px"></d-progress>
    </div>
  </section>
</template>
<style>
.progress-container {
  margin-bottom: 20px;
}
.devui-code-box-demo {
  border-bottom: 1px dashed #dfe1e6;
  padding: 16px 0;
  .progress-container {
    margin-bottom: 20px;
  }
}
</style>
```

:::

### 设置文字位置

提供了5种位置选择

::: demo

```vue
<template>
  <section class="devui-code-box-demo">
    <div class="progress-container">
      <d-progress percentage-text-placement="insideLeft" :percentage="percentage" :percentageText="`${percentage}%`"></d-progress>
    </div>
    <div class="progress-container">
      <d-progress :percentage="percentage" :percentageText="`${percentage}%`"></d-progress>
    </div>
    <div class="progress-container">
      <d-progress percentage-text-placement="insideRight" :percentage="percentage" :percentageText="`${percentage}%`"></d-progress>
    </div>
    <div class="progress-container">
      <d-progress percentage-text-placement="insideBg" :percentage="percentage" :percentageText="`${percentage}%`"></d-progress>
    </div>
    <div class="progress-container">
      <d-progress percentage-text-placement="outside" :percentage="percentage" :percentageText="`${percentage}%`"></d-progress>
    </div>
    <div class="progress-container">
      <d-button @click="minus">减 10%</d-button> <d-button @click="add">增 10%</d-button>
    </div>
  </section>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const percentageRef = ref(60)

    const add = () => {
      percentageRef.value += 10
      if (percentageRef.value > 100) {
        percentageRef.value = 0
      }
    }

    const minus = () => {
      percentageRef.value -= 10
      if (percentageRef.value < 0) {
        percentageRef.value = 100
      }
    }

    return {
      percentage: percentageRef,
      add,
      minus
    }
  }
})
</script>
<style>
.progress-container {
  margin-bottom: 20px;
}
.devui-code-box-demo {
  border-bottom: 1px dashed #dfe1e6;
  padding: 16px 0;
  .progress-container {
    margin-bottom: 20px;
  }
}
</style>
```

:::

### 圆环用法

基本的进度和文字配置。

::: demo

```vue
<template>
  <section class="devui-code-box-demo">
    <div class="progress-container-circle">
      <d-progress :isCircle="true" :percentage="80" :showContent="false"> </d-progress>
    </div>
    <div class="progress-container-circle">
      <d-progress :isCircle="true" :percentage="80" barBgColor="#50D4AB" :strokeWidth="8"> </d-progress>
    </div>
    <div class="progress-container-circle">
      <d-progress :isCircle="true" :percentage="80" barBgColor="#50D4AB">
        <span class="icon-position">
          <d-icon name="right" color="#3dcca6" />
        </span>
      </d-progress>
    </div>
  </section>
</template>
<style>
.progress-container-circle {
  height: 130px;
  width: 130px;
  font-size: 20px;
  display: inline-block;
  margin-right: 10px;
}
.icon-position {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  margin: 0;
  padding: 0;
  line-height: 1;
  white-space: normal;
  text-align: center;
  transform: translate(-50%, -50%);
  color: #50d4ab;
  font-size: 24px;
}
</style>
```

:::

### 自定义颜色

如果你觉得内置的颜色不行。

::: demo

```vue
<template>
  <section class="devui-code-box-demo">
  <div class="progress-container-circle">
      <d-progress :isCircle="true" :percentage="80" barBgColor="#e056fd" :showContent="false"> </d-progress>
    </div>
    <div class="progress-container-circle">
      <d-progress :isCircle="true" :percentage="80" barBgColor="#22a6b3" percentage-text-color="#22a6b3"> </d-progress>
    </div>
    <div class="progress-container">
      <d-progress :percentage="80" barBgColor="#badc58" percentage-text-color="#eb4d4b" percentageText="80%"></d-progress>
    </div>
    <div class="progress-container">
      <d-progress :percentage="80" barBgColor="orange" percentage-text-placement="outside" percentage-text-color="orange" percentageText="80%"></d-progress>
    </div>
  </section>
</template>
<style>
.progress-container-circle {
  height: 130px;
  width: 130px;
  font-size: 20px;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 20px;
}
.progress-container {
  margin-bottom: 20px;
}
.devui-code-box-demo {
  border-bottom: 1px dashed #dfe1e6;
  padding: 16px 0;
  .progress-container {
    margin-bottom: 20px;
  }
}
</style>
```

:::

### Progress 参数

| 参数名          | 类型      | 默认值  | 描述                                                     | 跳转 Demo             |
| :-------------- | :-------- | :------ | :------------------------------------------------------- | :-------------------- |
| percentage      | `number`  | 0       | 可选，进度条的值最大为 100                               | [基本用法](#基本用法) |
| percentage-text | `string`  | --      | 可选，进度条当前值的文字说明比如：'30%' \| '4/5'         | [基本用法](#基本用法) |
| height          | `string`  | 20px    | 可选，进度条的高度值，默认值为 20px                      | [基本用法](#基本用法) |
| percentage-text-placement  | `'insideLeft'\|'inside'\|`<br/> `'insideRight'\|'outside'\|`<br/>`'insideBg'`  | inside   | 可选，设置进度条的文字说明位置                    | [设置文字位置](#设置文字位置) |
| is-circle       | `boolean` | false   | 可选， 显示进度条是否为圈形                              | [圆环用法](#圆环用法) |
| stroke-width    | `number`  | 6       | 可选，设置圈形进度条宽度，单位是进度条与画布宽度的百分比 | [圆环用法](#圆环用法) |
| show-content    | `boolean` | true    | 可选，设置圈形进度条内是否展示内容                       | [圆环用法](#圆环用法) |
| bar-bg-color    | `string`  | #5170ff | 可选，进度条的颜色显示，默认为天蓝色                     | [自定义颜色](#自定义颜色) |
| percentage-text-color          | `string`  | ''    | 可选，设置进度条的文字说明颜色                     | [自定义颜色](#自定义颜色) |
