# Gantt 甘特图

甘特图。

#### 何时使用

当用户需要通过条状图来显示项目，进度和其他时间相关的系统进展的内在关系随着时间进展的情况时。

### 基本用法

- d-gantt-scale（时间轴）容器作为时间轴标线的定位父级元素，须设置 position 或者是 table、td、th、body 元素。

- d-gantt-scale（时间轴）容器和 d-gantt-bar（时间条）容器宽度须通过 GanttService 提供的方法根据起止时间计算后设置，初始化之后还须订阅 ganttScaleConfigChange 动态设置。

- 时间条 move、resize 事件会改变该时间条起止时间和时间轴的起止时间，订阅时间条 resize、move 事件和 ganttScaleConfigChange 来记录变化。

- 响应时间条 move、resize 事件调整最外层容器的滚动以获得更好的体验。

:::demo

```vue
<template>
  <d-fullscreen :zIndex="100" @fullscreenLaunch="fullscreenLaunch">
    <d-gantt :startDate="startDate" :endDate="endDate"></d-gantt>
  </d-fullscreen>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const curYear = new Date().getFullYear()

    const startDate = ref(new Date(curYear, 3, 1))
    const endDate = ref(new Date(curYear, 10, 1))
    const fullscreenLaunch = () => {}
    return {
      fullscreenLaunch,
      startDate,
      endDate,
    }
  },
})
</script>

<style></style>
```

:::

### d-gantt

d-gantt 参数

| 参数 | 类型 | 默认 | 说明 | 跳转 Demo | 全局配置项 |
| ---- | ---- | ---- | ---- | --------- | ---------- |
|      |      |      |      |           |            |
|      |      |      |      |           |            |
|      |      |      |      |           |            |

d-gantt 事件

| 事件 | 类型 | 说明 | 跳转 Demo |
| ---- | ---- | ---- | --------- |
|      |      |      |           |
|      |      |      |           |
|      |      |      |           |
