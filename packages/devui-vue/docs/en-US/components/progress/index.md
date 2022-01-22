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

### API
#### d-progress parameter
| Parameter | Type | Default | Description | Jump to Demo |
| :---: | :---: | :---: | :---: | :---: |
| percentage | `number` | 0 | Optional. The maximum value of the progress bar is 100. | [Basic Usage](#basic-usage) |
| percentageText |  `string` | -- | Optional. Text description of the current value of the progress bar, for example, '30%'\|'4/5' | [Basic Usage](#basic-usage) |
| barBgColor |  `string` | #5170ff | Optional. Color of the progress bar. The default value is sky blue. | [Basic Usage](#basic-usage) |
| height |  `string` | 20px | Optional. The default value is 20px. | [Basic Usage](#basic-usage) |
| isCircle |  `boolean` | false | Optional. Whether the progress bar is displayed in a circle. | [Circle Usage](#circle-usage) |
| strokeWidth |  `number` | 6 | Optional. Sets the width of the progress bar. The unit is the percentage of the progress bar to the width of the canvas. | [Circle Usage](#circle-usage) |
| showContent |  `boolean` | true | Optional. Sets whether to display content in the circle progress bar. | [Circle Usage](#circle-usage) |
