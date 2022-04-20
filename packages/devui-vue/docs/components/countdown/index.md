# Countdown 倒计时

倒计时

#### 何时使用

当倒计时时使用


### 基本用法
默认：时分秒:
:::demo 

```vue
<template>
  <div>
  <d-countdown :value="deadline" @onChange="changeTime" @onFinish="finishTime"/>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const deadline = ref(Date.now() + 100 *1000);
    const changeTime = (n) => {
    }
    const finishTime = () => {
    }
    return {
      msg: 'Countdown 倒计时 组件文档示例',
      deadline,
      changeTime,
      finishTime
    }
  }
})
</script>

<style>

</style>
```
:::


### 时间格式
时分秒毫秒:
:::demo 

```vue
<template>
  <div>
  <d-countdown :value="deadline" format='HH:mm:ss:SSS' @onChange="changeTime" @onFinish="finishTime"/>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const deadline = ref(Date.now() + 2 * 60 * 60 *1000);
    const changeTime = (n) => {
    }
    const finishTime = () => {
    }
    return {
      msg: 'Countdown 倒计时 组件文档示例',
      deadline,
      changeTime,
      finishTime
    }
  }
})
</script>

<style>

</style>
```
:::



年月日时分秒:
:::demo 

```vue
<template>
  <div>
  <d-countdown :value="deadline" format="YYYY 年 MM 月 DD 天 HH 时 mm 分 ss 秒" @onChange="changeTime" @onFinish="finishTime"/>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const deadline = ref(new Date().getTime() + 369 * 24 * 60 * 60 *1000 + 5000);

    const changeTime = (n) => {
    }
    const finishTime = () => {
    }
    return {
      deadline,
      msg: 'Countdown 倒计时 组件文档示例',
      changeTime,
      finishTime
    }
  }
})
</script>

<style>

</style>
```
:::



注：当format某一项时间没有的情况下，会将没有的那一项值累积到下一项。 
例如：当没有M(月)的时候，会将月的值*30累加到日，根据format格式化的值会从通过时间onchange的legalTime值返回，如下：
:::demo 

```vue
<template>
  <div>
  <d-countdown :value="deadline" format='YYYY年DD天 HH时mm分ss秒' @onChange="changeTime" @onFinish="finishTime"/>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const deadline = ref(new Date().getTime() + 700 * 24 * 60 * 60 *1000 + 5000);
    const changeTime = (n) => {
    }
    const finishTime = () => {
    }
    return {
      msg: 'Countdown 倒计时 组件文档示例',
      deadline,
      changeTime,
      finishTime
    }
  }
})
</script>

<style>

</style>
```
:::



### 前缀和后缀
:::demo 

```vue
<template>
  <div>
  <d-countdown :value="Date.now() + 50000" format="HH时mm分ss秒" prefix="还有 " suffix=" 结束！" @onChange="changeTime" @onFinish="finishTime"/>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const changeTime = (n) => {
    }
    const finishTime = () => {
    }
    return {
      msg: 'Countdown 倒计时 组件文档示例',
      changeTime,
      finishTime
    }
  }
})
</script>

<style>

</style>
```
:::



### 设置style
设置倒计时文字样式:
:::demo 

```vue
<template>
  <div>
  <d-countdown :value="deadline" :valueStyle="styles" @onChange="changeTime" @onFinish="finishTime"/>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const deadline = ref(new Date().getTime() + 10 * 24 * 60 * 60 *1000);
    const styles = {color: '#5e7ce0'}
    const changeTime = (n) => {
    }
    const finishTime = () => {
    }
    return {
      msg: 'Countdown 倒计时 组件文档示例',
      deadline,
      styles,
      changeTime,
      finishTime
    }
  }
})
</script>

<style>

</style>
```
:::


### 自定义内容
:::demo 

```vue
<template>
  <div>
    <d-countdown :format="format" :value="deadline" @onChange="changeTime" @onFinish="finishTime">
      <div class="countdown-main">
        距离活动结束还有
        <span class="time-num">{{ leftTime.H }}</span>
        时
        <span class="time-num">{{ leftTime.m }}</span>
        分
        <span class="time-num">{{ leftTime.s }}</span>
        秒
      </div>
    </d-countdown>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  setup() {
    const format = ref("HH:mm:ss");
    const deadline = ref(new Date().getTime() + 10 * 24 * 60 * 60 *1000 + 5000);
    const leftTime = reactive({'H':0,'m':0,'s':0})
    const changeTime = ({legalTime}) => {
      
      for (const k of legalTime.keys()) {
        if (k in leftTime) {
          leftTime[k] = legalTime.get(k);
        }
      }
    }
    const finishTime = () => {
    }
    return {
      msg: 'Countdown 倒计时 组件文档示例',
      deadline,
      leftTime,
      changeTime,
      finishTime,
      format
    }
  }
})
</script>

<style lang="scss">
.countdown-main .time-num{
    font-weight: 400;
    display: inline-block;
    border: 1px solid #f4f4f4;
    padding: 0 4px;
    border-radius: 4px;
    min-width: 48px;
    text-align: center;
    background-color: #f4f4f4;
    font-size: 18px;
  }
</style>
```
:::

### Countdown 参数

| 参数 | 类型 | 默认 | 说明 | 跳转demo |
| :---- | :---- | :---- | :---- | :---- |
|   format   |   string   |     HH:mm:ss      |   格式化倒计时展示，参考moment   |   [时间格式](#时间格式) |
|   value   |   number   |   -   |   数值内容	   |   [基本用法](#基本用法) |
|   prefix   |   string   |   -   |   设置数值的前缀	   |   [前缀和后缀](#前缀和后缀) |
|   suffix   |   string   |   -   |   设置数值的后缀		   |   [前缀和后缀](#前缀和后缀) |
|   value-style   |   CSSProperties   |   -   |   设置数值的样式		   |   [设置style](#设置style) |


### Countdown 事件

| 事件 | 类型 | 说明 |
| :---- | :---- | :---- |
|   on-change   |   ({leftTime,formatTime,legalTime}) => void   |   倒计时时间变化时触发。<br>leftTime:倒计时剩余得时间戳；<br>formatTime：年月日时分秒毫秒格式倒计时；<br>legalTime：根据format格式化后的值。	   |
|   on-finish   |   () => void   |   倒计时完成时触发	   |

### Countdown 插槽

| 插槽名    | 说明              |
| :------- | :----------------- |
| default | 自定义内容        |
