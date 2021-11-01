# TimeAxis 时间轴

时间轴展示组件。

### 何时使用

当需要向用户展示时间进度和每个时间点的事件状态时。

### 基本用法

通过 `direction` 属性配置时间线排列方向，默认值为`vertical`。
:::demo

```vue

<template>
  <div>
    <d-radio-group css-style="row" v-model="choose">
      <d-radio v-for="item in list" :key="item" :value="item">
        {{ item }}
      </d-radio>
    </d-radio-group>
    <d-time-axis :direction="choose">
      <d-time-axis-item
          v-for="(item,index) in timeAxisList"
          :key="index"
          :time="item.time"
          :dot-color="item.dotColor"
      >
        {{item.text}}
      </d-time-axis-item>

    </d-time-axis>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'

export default defineComponent({
  setup() {
    const list = ref(['horizontal', 'vertical'])
    const choose = ref('horizontal')
    const timeAxisList = ref([
      {
        text: 'Download',
        time: '2021-10-1'
      },
      {
        text: 'Check',
        time: '2021-10-2',
        dotColor: 'var(--devui-success)'
      },
      {
        text: 'Build',
        time: '2021-10-3',
        dotColor: 'var(--devui-danger)'
      },
      {
        text: 'Depoy',
        time: '2021-10-4',
        dotColor: 'var(--devui-warning)'
      },
      {
        text: 'End',
        time: '2021-10-5',
        dotColor: 'var(--devui-waiting)'
      }
    ])
    return {timeAxisList, list, choose}
  }
})
</script>

<style>
</style>
```

:::

### 自定义样式

:::demo

```vue

<template>
  <d-time-axis direction="horizontal">
    <d-time-axis-item
        v-for="(item,index) in timeAxisList"
        :key="index"
        :time="item.time"
        :dot-color="item.dotColor"
        :line-style="item.lineStyle"
        :line-color="item.lineColor"
    >
     <template #dot v-if="item.dot">
       <d-icon :name="item.dot"></d-icon>
     </template>
      {{item.text}}
    </d-time-axis-item>
  </d-time-axis>
</template>

<script>
import {defineComponent, ref} from 'vue'

export default defineComponent({
  setup() {
    const timeAxisList = ref([
      {
        text: 'Start',
        time: '2021-10-1',
        lineStyle: "solid",
        dot: 'cancel-forbidden',
      },
      {
        text: 'Check',
        time: '2021-10-2',
        dotColor: 'var(--devui-success)',
        lineStyle: "dashed",
        lineColor: 'var(--devui-success)',
        dot: 'classroom-approve',
      },
      {
        text: 'Debug',
        time: '2021-10-3',
        dotColor: 'var(--devui-info)',
        lineStyle: "dotted",
        lineColor: 'var(--devui-info)',
        dot: 'add-bug',
      },
      {
        text: 'Build',
        time: '2021-10-4',
        dotColor: 'var(--devui-warning)',
        lineStyle: "none",
        lineColor: 'var(--devui-warning)',
      },
      {
        text: 'Display',
        time: '2021-10-5',
        dotColor: 'var(--devui-danger)',
        dot: 'go-chart',
      }
    ])
    return {timeAxisList}
  }
})
</script>

<style>
</style>
```

:::

### d-time-axis

| 参数           | 类型                            | 默认        | 说明         | 跳转 Demo                   |
| ------------  | ----                            | ----       | ----        | ---------                   | 
|   direction   |   `'vertical'\|'horizontal'`   | `vertical`  | 设置时间轴方向 |      [基本用法](#基本用法)     |  

### d-time-axis-item参数

| 参数 | 类型 | 默认 | 说明 | 跳转 Demo                   |
| ---- | ----   | ---- | ---- | ----  |
|  time|`string`|   --   |   可选，时间   |   [基本用法](#基本用法)  | 
| text |`string` |  --    |   可选，文本内容   |   [基本用法](#基本用法)  | 
|   dotColor   |  `string`    |   --   |   可选，自定义时间圈颜色   |   [基本用法](#基本用法)  | 
|  lineStyle| `'solid'\|'dashed'\|'dotted'\|'none'` |   `solid`   |   可选，设置线条样式   |  [自定义样式](#自定义样式) | 
| lineColor |`string`                                        |  --         |   可选，设置线条颜色   | [自定义样式](#自定义样式) | 

### 插槽

| 参数           | 描述        | 跳转 Demo                   |
| ------------  | ----           | ---------                   | 
|   dot   |    自定义时间轴点  |     [自定义样式](#自定义样式)    |  
