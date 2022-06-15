# TimeSelect 组件

时间选择器。

#### 何时使用

提供几个固定的时间点供用户选择

### 基本用法

:::demo

```vue
<template>
  <div>
    <h4 class="my-10">basic</h4>
    <d-time-select v-model="time00" placeholder="请选择时间" />
    <h4 class="my-10">step</h4>
    <d-time-select v-model="time01" placeholder="请选择时间" step="00:10" />
    <h4 class="my-10">min-time、max-time</h4>
    <div style="margin-top: 10px;">
      <d-time-select v-model="time02" placeholder="请选择时间" min-time="02:20" max-time="18:30" />
    </div>
    <h4 class="my-10">min-time、max-time、start、end</h4>
    <div style="margin-top: 10px;">
      <d-time-select v-model="time03" placeholder="请选择时间" min-time="09:30" max-time="18:30" start="09:00" end="16:30" />
    </div>
    <h4 class="my-10">disabled</h4>
    <div style="margin-top: 10px;">
      <d-time-select v-model="time04" placeholder="请选择时间" disabled />
    </div>
    <h4 class="my-10">不可清除</h4>
    <div style="margin-top: 10px;">
      <d-time-select v-model="time04" placeholder="请选择时间" :clearable="false" />
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, nextTick } from 'vue';
export default defineComponent({
  setup(props, ctx) {
    let time00 = ref('');
    let time01 = ref('');
    let time02 = ref('03:30');
    let time03 = ref('09:30');
    let time04 = ref('09:30');
    return {
      time00,
      time01,
      time02,
      time03,
      time04,
    };
  },
});
</script>

<style>
.my-10 {
  margin: 10px 0px;
}
</style>
```

:::

### 事件

:::demo

```vue
<template>
  <div>
    <h4 class="my-10">selectedTimeChange</h4>
    <d-time-select v-model="timeData01" @change="selectedTimeChange" @focus="focusFun" @blur="blurFun" />
  </div>
</template>

<script>
import { ref, defineComponent, nextTick } from 'vue';

export default defineComponent({
  setup(props, ctx) {
    let timeData01 = ref('00:30');

    // 返回选中的时间
    const selectedTimeChange = (time) => {
      console.log(time);
    };
    const focusFun = (e) => {
      console.log(e);
    };
    const blurFun = (e) => {
      console.log(e);
    };

    return {
      selectedTimeChange,
      timeData01,
      focusFun,
      blurFun,
    };
  },
});
</script>
```

:::

### d-time-select

d-time-select 参数

| 参数        | 类型                        | 默认    | 说明             | 跳转 Demo             |
| ----------- | --------------------------- | ------- | ---------------- | --------------------- |
| v-model     | string                      | --      | 选中项绑定值     | [基本用法](#基本用法) |
| disabled    | boolean                     | false   | 禁用状态         | [基本用法](#基本用法) |
| size        | [ITimeSelect](#itimeselect) | md      | 输入框尺寸       | --                    |
| placeholder | string                      | --      | 占位内容         | [基本用法](#基本用法) |
| min-time    | string                      | '00:00' | 可选，最早时间点 | [基本用法](#基本用法) |
| max-time    | string                      | '24:00' | 可选，最晚时间点 | [基本用法](#基本用法) |
| start       | string                      | '00:00' | 可选，开始时间   | [基本用法](#基本用法) |
| end         | string                      | '24:00' | 可选，结束时间   | [基本用法](#基本用法) |
| step        | string                      | '00:30' | 可选，间隔时间   | [基本用法](#基本用法) |
| clearable   | boolean                     | true    | 可选，是否可清除 | [基本用法](#基本用法) |

d-time-select 事件

| 事件   | 说明                 | 跳转 Demo         |
| ------ | -------------------- | ----------------- |
| change | 可选，选定数据时触发 | [基本用法](#事件) |

### TimeSelect 类型定义

#### ITimeSelect

```ts
type ITimeSelect = 'lg' | 'md' | 'sm';
```
