# TimeAxis 时间轴

时间轴展示组件。

### 何时使用

当需要向用户展示时间进度和每个时间点的事件状态时。

### 基本用法

通过 direction 配置时间线排列方向，默认值为`vertical`。
:::demo

```vue

<template>
  <div>
    <d-radio-group css-style="row" v-model="choose">
      <d-radio v-for="item in list" :key="item" :value="item">
        {{ item }}
      </d-radio>
    </d-radio-group>
    <d-time-axis :direction="choose" :data="data"/>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'

export default defineComponent({
  setup() {
    const list = ref(['horizontal', 'vertical'])
    const choose = ref('horizontal')
    const data = ref([
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
    return {data, list, choose}
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
|   data        |            `object[]`             |     `[]`        | 列表数据（具体见[data参数](#data参数)） |    [基本用法](#基本用法)       | 


#### data参数

| 参数 | 类型 | 默认 | 说明 | 跳转 Demo                   |
| ---- | ----   | ---- | ---- | ----  |
|  time|`string`|   --   |   可选，时间   |   [基本用法](#基本用法)  | 
| text |`string` |  --    |   可选，文本内容   |   [基本用法](#基本用法)  | 
|   dotColor   |  `string`    |   --   |   可选，自定义时间圈颜色   |   [基本用法](#基本用法)  | 
