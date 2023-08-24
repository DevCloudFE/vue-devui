# TimeSelect 组件

时间选择器。

#### 何时使用

提供几个固定的时间点供用户选择

### 基本用法

:::demo

```vue
<template>
  <div>
    <div class="mb-0">basic</div>
    <d-time-select class="mb-2" v-model="time00" />

    <div class="mb-0">step</div>
    <d-time-select class="mb-2" v-model="time01" step="00:10" />

    <div class="mb-0">disabled</div>
    <d-time-select class="mb-2" v-model="time02" disabled />
    
    <div class="mb-0">不可清除</div>
    <d-time-select class="mb-2" v-model="time03" :clearable="false" />
  </div>
</template>

<script>
import { ref, defineComponent, nextTick } from 'vue';
export default defineComponent({
  setup(props, ctx) {
    let time00 = ref('');
    let time01 = ref('');
    let time02 = ref('09:30');
    let time03 = ref('09:30');
    return {
      time00,
      time01,
      time02,
      time03,
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

### 尺寸

:::demo

```vue
<template>
  <div>
    <div class="mb-0">lg</div>
    <d-time-select class="mb-2" v-model="time05" size="lg" placeholder="间隔为1小时" step="01:00" />
    
    <div class="mb-0">md</div>
    <d-time-select class="mb-2" v-model="time05" size="md" placeholder="间隔为30分钟" step="00:30" />
    
    <div class="mb-0">sm</div>
    <d-time-select class="mb-2" v-model="time05" size="sm" placeholder="间隔为1分钟" step="00:01" />
  </div>
</template>

<script>
import { ref, defineComponent, nextTick } from 'vue';
export default defineComponent({
  setup(props, ctx) {
    let time00 = ref('');
    let time01 = ref('');
    let time02 = ref('');
    return {
      time00,
      time01,
      time02,
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

### 时间段

:::demo

```vue
<template>
  <div>
    <div class="mb-0">min-time、max-time</div>
    <d-time-select class="mb-2" v-model="time01" min-time="02:20" max-time="18:30" placeholder="控制时间的可选范围" />

    <div class="mb-0">start、end</div>
    <d-time-select class="mb-2" v-model="time02" start="09:00" end="18:30" placeholder="控制时间的显示范围" />

    <div class="mb-0">min-time、max-time、start、end</div>
    <d-time-select class="mb-2" v-model="time03" min-time="09:30" max-time="18:30" start="09:00" end="16:30" />

    <div class="mb-0">固定时间范围</div>
    <div>
      <d-row :gutter="5">
        <d-col>
          <d-time-select v-model="startTime" />
        </d-col>
        <d-col>
          <d-time-select v-model="endTime" :min-time="startTime" />
        </d-col>
      </d-row>
  </div>
  </div>
</template>

<script>
import { ref, defineComponent, nextTick } from 'vue';
export default defineComponent({
  setup(props, ctx) {
    let time01 = ref('');
    let time02 = ref('');
    let time03 = ref('09:30');
    let startTime = ref('');
    let endTime = ref('');
    return {
      time01,
      time02,
      time03,
      startTime,
      endTime,
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
    <div class="mb-0">selectedTimeChange</div>
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

### TimeSelect 参数

| 参数        | 类型                        | 默认         | 说明                                      | 跳转 Demo             |
| ----------- | --------------------------- | ------------ | ----------------------------------------- | --------------------- |
| v-model     | string                      | --           | 选中项绑定值                              | [基本用法](#基本用法) |
| disabled    | boolean                     | false        | 禁用状态                                  | [基本用法](#基本用法) |
| size        | [ITimeSelect](#itimeselect) | md           | 输入框尺寸                                | [尺寸](#尺寸)         |
| placeholder | string                      | '请选择时间' | 占位内容                                  | [占位内容](#尺寸)     |
| min-time    | string                      | '00:00'      | 可选，最早时间点，早于该值的时间段将被禁用 | [时间段](#时间段)     |
| max-time    | string                      | '24:00'      | 可选，最晚时间点，晚于该值的时间段将被禁用 | [时间段](#时间段)     |
| start       | string                      | '00:00'      | 可选，开始时间                            | [时间段](#时间段)     |
| end         | string                      | '24:00'      | 可选，结束时间                            | [时间段](#时间段)     |
| step        | string                      | '00:30'      | 可选，间隔时间                            | [基本用法](#基本用法) |
| clearable   | boolean                     | true         | 可选，是否可清除                          | [基本用法](#基本用法) |

### TimeSelect 事件

| 事件   | 说明                 | 跳转 Demo         |
| ------ | -------------------- | ----------------- |
| change | 可选，选定数据时触发 | [基本用法](#事件) |

### TimeSelect 类型定义

#### ITimeSelect

```ts
type ITimeSelect = 'lg' | 'md' | 'sm';
```
