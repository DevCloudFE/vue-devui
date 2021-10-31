# Progress

progress bar。

### When to use
1. When the operation takes a long time, show the user the progress of the operation。
2. When the operation needs to interrupt the existing interface or background operation, it takes a long time。
3. When it is necessary to display the percentage of an operation completed or the completed steps/total steps。

### Basic usage
Basic progress and text configuration。

<section class="devui-code-box-demo">
    <div class="progress-container">
        <d-progress :percentage="80" percentageText="80%"></d-progress>
    </div>
    <div class="progress-container">
        <d-progress :percentage="30" percentageText="30%" barbgcolor="#50D4AB" height="30px"></d-progress>
    </div>
</section>


```html
<div class="progress-container">
    <d-progress :percentage="80" percentageText="80%"></d-progress>
</div>
<div class="progress-container">
    <d-progress :percentage="30" percentageText="30%" barbgcolor="#50D4AB" height="30px"></d-progress>
</div>
```

```css
.progress-container {
  margin-bottom: 20px;
}
```

### Ring usage
Basic progress and text configuration。

<section class="devui-code-box-demo">
    <div class="progress-container-circle">
        <d-progress :isCircle="true" :percentage="80" :showContent="false"> </d-progress>
    </div>
    <div class="progress-container-circle">
        <d-progress :isCircle="true" :percentage="80" barbgcolor="#50D4AB" :strokeWidth="8">
        </d-progress>
    </div>
    <div class="progress-container-circle">
        <d-progress :isCircle="true" :percentage="80" barbgcolor="#50D4AB">
            <d-icon
                name="right"
                color="#3dcca6"
                class="icon-position"
            />
        </d-progress>
    </div>
</section>


```html
<div class="progress-container">
    <d-progress :isCircle="true" :percentage="80" :showContent="false"></d-progress>
</div>
<div class="progress-container">
    <d-progress :isCircle="true" :percentage="80" barbgcolor="#50D4AB" :strokeWidth="8"></d-progress>
</div>
<div class="progress-container">
    <d-progress :isCircle="true" :percentage="80" barbgcolor="#50D4AB">
        <d-icon name="right" color="#3dcca6" class="icon-position" />
    </d-progress>
</div>
```

```css
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
```

### API
#### d-progress parameter
| parameter | type | default | description | jump Demo |
| :---: | :---: | :---: | :---: | :---: |
| percentage | `number` | 0 | Optional, the maximum value of the progress bar is 100 | [基本用法](#基本用法) |
| percentageText |  `string` | -- | Optional, the text description of the current value of the progress bar, such as: '30%' \| '4/5' | [基本用法](#基本用法) |
| barBgColor |  `string` | #5170ff | Optional, the color of the progress bar is displayed, the default is sky blue | [基本用法](#基本用法) |
| height |  `string` | 20px | Optional, the height of the progress bar, the default value is 20px | [基本用法](#基本用法) |
| isCircle |  `boolean` | false | Optional, show whether the progress bar is a circle | [圆环用法](#圆环用法) |
| strokeWidth |  `number` | 6 | Optional, set the width of the circular progress bar, the unit is the percentage of the width of the progress bar and the canvas | [圆环用法](#圆环用法) |
| showContent |  `boolean` | true | Optional, set whether to display content in the circle-shaped progress bar | [圆环用法](#圆环用法) |


<style lang="scss">
.devui-code-box-demo{
    border-bottom: 1px dashed #dfe1e6;
    padding: 16px 0;
    .progress-container {
        margin-bottom: 20px;
    }
    .progress-container-circle {
        height: 130px;
        width: 130px;
        font-size: 20px;
        display: inline-block;
        margin-right: 10px;
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
    }
}
</style>
