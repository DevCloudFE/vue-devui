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
    <d-radio-group direction="row" v-model="choose">
      <d-radio v-for="item in list" :key="item" :value="item">
        {{ item }}
      </d-radio>
    </d-radio-group>
    <d-time-axis :direction="choose" center>
      <d-time-axis-item
          center
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
    const list = ref(['vertical', 'horizontal'])
    const choose = ref('vertical')
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
```

:::

### 自定义样式

:::demo

```vue
<template>
  <d-time-axis direction="horizontal" center>
    <d-time-axis-item
        v-for="(item,index) in timeAxisList"
        :key="index"
        :dot-color="item.dotColor"
        :line-style="item.lineStyle"
        :line-color="item.lineColor"
    >
      <template #time>
        <div>{{item.time}}</div>
      </template>
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
        dot: 'cancel-forbidden'
      },
      {
        text: 'Check',
        time: '2021-10-2',
        dotColor: 'var(--devui-success)',
        lineStyle: "dashed",
        lineColor: 'var(--devui-success)',
        dot: 'classroom-approve'
      },
      {
        text: 'Debug',
        time: '2021-10-3',
        dotColor: 'var(--devui-info)',
        lineStyle: "dotted",
        lineColor: 'var(--devui-info)',
        dot: 'add-bug'
      },
      {
        text: 'Build',
        time: '2021-10-4',
        dotColor: 'var(--devui-warning)',
        lineStyle: "none",
        lineColor: 'var(--devui-warning)',
        dot: 'build-with-tool'
      },
      {
        text: 'Display',
        time: '2021-10-5',
        dotColor: 'var(--devui-danger)',
        dot: 'go-chart'
      }
    ])
    return {timeAxisList}
  }
})
</script>
```

:::

### 自定义内容

可以使用 mode 为 `alternative` 设置内容交替展示
:::demo
```vue
<template>
  <d-time-axis direction="horizontal" mode="alternative">
    <d-time-axis-item
        v-for="(item,index) in timeAxisList"
        :key="index"
        :dot-color="item.dotColor"
        line-style="dashed"
    >

      <template #default="data">
        <div style="position: relative">
          <div
              v-if="data.position === 'bottom'"
              style="margin-bottom: 4px; position: relative; left: 4px; width: 2px; height: 40px; background-color: #dfe1e6"
          ></div>
          <div
              :style="{'border-left': '4px solid', 'box-shadow': '0 2px 4px 0 rgba(0, 0, 0, 0.1)', padding: '12px 8px',borderColor:item.dotColor,backgroundColor:item.backgroundColor}"
          >
            <div style="padding-bottom: 8px; font-size: 14px; font-weight: bold">{{ item.title }}</div>
            <div style="padding-bottom: 8px">发布日期：{{ item.date }}</div>
            <div style="padding-bottom: 8px">版本状态：
              <d-tag :color="item.dotColor">{{item.status}}</d-tag>
            </div>
          </div>
          <div
              v-if="data.position === 'top'"
              style="margin-top: 4px; position: relative; left: 4px; width: 2px; height: 40px; background-color: #dfe1e6"
          ></div>
        </div>
      </template>
      <template #extra v-if="index===0">
        <div
            style="text-align: center; width: 36px; height: 36px; border-radius: 18px; border: 2px solid #dfe1e6; background: white"
        >
          <span style="line-height: 32px">2020</span>
        </div>
      </template>
    </d-time-axis-item>
  </d-time-axis>
</template>

<script>
import {defineComponent, ref} from 'vue'

export default defineComponent({
  setup() {
    const timeAxisList = ref([
      {
        text: 'hello',
        dotColor: 'var(--devui-success)',
        extraElement: {},
        title: '第四季度交付版本1.0', date: '2019/11/01', 
        status: '已发布'
      },
      {
        text: 'world',
        dotColor: 'var(--devui-danger)',
        title: '第一季度交付版本2.0', date: '2020/03/01',
        backgroundColor: 'rgba(255, 230, 230, 0.2)', 
        status: '未开始'
      },
      {
        text: 'nihao',
        dotColor: 'var(--devui-warning)',
        title: '第二季度交付版本1.0', date: '2020/05/01', 
        status: '进行中'
      },
      {
        text: 'DevUI',
        dotColor: 'var(--devui-danger)',
        title: '第三季度交付版本1.0', date: '2020/09/01', 
        status: '未开始'
      },
      {
        text: 'Awesome',
        dotColor: 'var(--devui-success)',
        title: '第三季度交付版本1.0', date: '2020/11/01', 
        status: '已发布'
      },
    ])
    return {timeAxisList}
  }
})
</script>
```

:::

### 自定义内容位置

:::demo

```vue
<template>
  <h5><p>当 direction 为 horizontal 时 position 默认 bottom</p></h5>
  <d-time-axis direction="horizontal" center>
    <d-time-axis-item position="top" dot-color="chocolate">Download</d-time-axis-item>
    <d-time-axis-item dot-color="var(--devui-success)">Check</d-time-axis-item>
    <d-time-axis-item position="top" dot-color="var(--devui-danger)">Build</d-time-axis-item>
    <d-time-axis-item dot-color="var(--devui-warning)">Depoy</d-time-axis-item>
    <d-time-axis-item position="top" dot-color="var(--devui-waiting)">End</d-time-axis-item>
  </d-time-axis>
  <h5><p>当 direction 为 vertical 时 position 默认 right</p></h5>
  <d-time-axis direction="vertical">
    <d-time-axis-item position="left" dot-color="chocolate">Download</d-time-axis-item>
    <d-time-axis-item position="right" dot-color="var(--devui-success)">Check</d-time-axis-item>
    <d-time-axis-item position="left" dot-color="var(--devui-danger)">Build</d-time-axis-item>
    <d-time-axis-item position="right" dot-color="var(--devui-warning)">Depoy</d-time-axis-item>
    <d-time-axis-item position="left" dot-color="var(--devui-waiting)">End</d-time-axis-item>
  </d-time-axis>
</template>
```

:::

### 设置时间位置

:::demo

```vue
<template>
  <d-time-axis time-position="bottom">
    <d-time-axis-item time="2019" time-position="left">Download</d-time-axis-item>
    <d-time-axis-item time="11-2" type="success">Check</d-time-axis-item>
    <d-time-axis-item time="2020" type="warning" time-position="left">Build</d-time-axis-item>
    <d-time-axis-item time="11-4" type="error">Depoy</d-time-axis-item>
    <d-time-axis-item time="2021" type="primary" time-position="left">End</d-time-axis-item>
  </d-time-axis>
</template>
```

:::

### d-time-axis

| 参数           | 类型                            | 默认        | 说明         | 跳转 Demo                   |
| ------------  | ----                            | ----       | ----        | ---------                   | 
|   direction   |   `'vertical'\|'horizontal'`   | `vertical`  | 设置时间轴方向 |      [基本用法](#基本用法)     |  
|   center   |   `boolean`| `false`  | 当方向为`horizontal`时，是否将内容设置居中 |      [基本用法](#基本用法)     |  
|   mode   |   `'normal'\|'alternative'`   | `normal`  | 可选，`normal`模式下内容按默认方向排布， `alternative`模式下内容交替排布 |      [自定义内容](#自定义内容)     |  
|   time-position   |   `'left'\|'bottom'`   | `left`  | 可选，仅当`direction` 为 `vertical` 时定义时间参数位置(全局设置，当与`mode`属性冲突时以`mode`为准) |      [自定义内容](#自定义内容)     |  

### d-time-axis-item

| 参数 | 类型 | 默认 | 说明 | 跳转 Demo                   |
| ---- | ----   | ---- | ---- | ----  |
|  time|`string`|   --   |   可选，时间   |   [基本用法](#基本用法)  | 
| text |`string` |  --    |   可选，文本内容   |   [基本用法](#基本用法)  | 
|   dot-color   |  `string`    |   --   |   可选，自定义时间圈颜色   |   [基本用法](#基本用法)  | 
|  line-style| `'solid'\|'dashed'\|'dotted'\|'none'` |   `solid`   |   可选，设置线条样式（若没有设置，则默认时间轴最后一个元素为`none`）   |  [自定义样式](#自定义样式) | 
| line-color |`string`                                        |  --         |   可选，设置线条颜色   | [自定义样式](#自定义样式) | 
| position |`'top'\|'bottom'\|'left'\|'right'`    |  当`direction`为`vertical`时默认：`right`，当`direction`为`horizontal`时，默认：`bottom`   |   可选，设置内容存在的位置，若有time则time处在相反的位置   | [自定义内容位置](#自定义内容位置) | 
|   time-position   |   `'left'\|'bottom'`   | `left`  | 可选，仅当`direction` 为 `vertical` 时定义时间参数位置(全局设置，当与`position`属性冲突时以`position`为准) |      [设置时间位置](#设置时间位置)     |  
|   type   |   `'primary' \| 'success' \| 'warning' \| 'error'`   | `primary`  | 可选，时间点类型 |      [自定义内容](#自定义内容)     |  

### d-time-axis-item插槽

| 参数           | 描述        | 跳转 Demo                   |
| ------------  | ----           | ---------                   | 
|   default   |    自定义内容  |     [自定义内容](#自定义内容)    |  
|   dot   |    自定义时间轴点  |     [自定义样式](#自定义样式)    |  
|   time   |    自定义时间  |     [自定义样式](#自定义样式)    |  
|   extra   |   自定义两个时间点间附加元素  |     [自定义内容](#自定义内容)    |  
