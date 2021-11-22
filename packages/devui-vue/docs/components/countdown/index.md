# Countdown 倒计时

倒计时

### 何时使用

当倒计时时使用


### 基本用法
默认：时分秒
:::demo 

```vue
<template>
  <div>
  <d-countdown :value="new Date().getTime() + 5000" @onChange="changeTime" @onFinish="finishTime"/>
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


年月日时分秒
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
      // console.log(n)
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

### d-countdown

d-countdown 参数

| 参数 | 类型 | 默认 | 说明 |
| ---- | ---- | ---- | ---- |
|   format   |   string   |     HH:mm:ss      |   格式化倒计时展示，参考moment   |
|   value   |   number   |   -   |   数值内容	   |
|   prefix   |   string   |   -   |   设置数值的前缀	   |
|   suffix   |   string   |   -   |   设置数值的后缀		   |
|   valueStyle   |   CSSProperties   |   -   |   设置数值的样式		   |

### d-countdown 事件

d-countdown 事件

| 事件 | 类型 | 说明 |
| ---- | ---- | ---- |
|   onChange   |   ({leftTime,timeInitialValue,dateValue}) => void   |   倒计时时间变化时触发。leftTime:倒计时剩余得时间戳；timeInitialValue：年月日时分秒毫秒格式倒计时；dateValue：根据format格式化后的值。	   |
|   onFinish   |   () => void   |   倒计时完成时触发	   |

