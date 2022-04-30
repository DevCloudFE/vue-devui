# Progress

Progress bar.

### When To Use
1. When the operation takes a long time.
2. When an operation takes a long time to interrupt the current interface or background operation.
3. To display the percentage of completed operations or the number of completed steps/total steps.

### Basic Usage
Basic progress and text configuration.

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
.devui-code-box-demo{
    border-bottom: 1px dashed #dfe1e6;
    padding: 16px 0;
    .progress-container {
        margin-bottom: 20px;
    }
}
</style>
```
:::

### Set Text Position

Five location options are provided

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
      <d-button @click="minus">minus 10%</d-button> <d-button @click="add">add 10%</d-button>
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

### Circle Usage
Basic progress and text configuration.

::: demo
```vue
<template>
    <section class="devui-code-box-demo">
        <div class="progress-container-circle">
            <d-progress :isCircle="true" :percentage="80" :showContent="false"> </d-progress>
        </div>
        <div class="progress-container-circle">
            <d-progress :isCircle="true" :percentage="80" barBgColor="#50D4AB" :strokeWidth="8">
            </d-progress>
        </div>
        <div class="progress-container-circle">
            <d-progress :isCircle="true" :percentage="80" barBgColor="#50D4AB">
                <span class="icon-position">
                    <d-icon
                        name="right"
                        color="#3dcca6"
                    />
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

### Custom Color

If you think the built-in colors don't work.

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

### API
#### d-progress parameter
| Parameter | Type | Default | Description | Jump to Demo |
| :---: | :---: | :---: | :---: | :---: |
| percentage | `number` | 0 | Optional. The maximum value of the progress bar is 100. | [Basic Usage](#basic-usage) |
| percentageText |  `string` | -- | Optional. Text description of the current value of the progress bar, for example, '30%'\|'4/5' | [Basic Usage](#basic-usage) |
| height |  `string` | 20px | Optional. The default value is 20px. | [Basic Usage](#basic-usage) |
| percentageTextPlacement  | `'insideLeft'\|'inside'\|`<br/> `'insideRight'\|'outside'\|`<br/>`'insideBg'`  | inside   | Optional. Set the text description position of the progress bar                    | [Set Text Position](#set-text-position) |
| isCircle |  `boolean` | false | Optional. Whether the progress bar is displayed in a circle. | [Circle Usage](#circle-usage) |
| strokeWidth |  `number` | 6 | Optional. Sets the width of the progress bar. The unit is the percentage of the progress bar to the width of the canvas. | [Circle Usage](#circle-usage) |
| showContent |  `boolean` | true | Optional. Sets whether to display content in the circle progress bar. | [Circle Usage](#circle-usage) |
| barBgColor |  `string` | #5170ff | Optional. Color of the progress bar. The default value is sky blue. | [Basic Usage](#basic-usage) |
| percentage-text-color          | `string`  | ''    | Optional. Set the text description color of the progress bar                     | [Custom Color](#custom-color) |
