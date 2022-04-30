# Slider 滑动输入条

#### 何时使用

当用户需要在数值区间内进行选择时使用。

### 基本用法

:::demo

```vue
<template>
  <div class="slider-wrapper" style="padding:20px">
    <d-slider :min="minValue" :max="maxValue" v-model="inputValue"></d-slider>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const inputValue = ref(12);
    const minValue = ref(0);
    const maxValue = ref(20);
    return {
      inputValue,
      maxValue,
      minValue,
    };
  },
});
</script>
```

:::

### 可设置 Step 的滑动组件

:::demo

```vue
<template>
  <div class="slider-wrapper" style="padding:20px">
    <d-slider :min="minValue" :max="maxValue" v-model="inputValue" :step="step"></d-slider>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const inputValue = ref(8);
    const minValue = ref(0);
    const maxValue = ref(20);
    const step = ref(4);
    return {
      inputValue,
      maxValue,
      minValue,
      step,
    };
  },
});
</script>
```

:::

### 带有输入框的滑动组件

:::demo

```vue
<template>
  <div class="slider-wrapper" style="padding:20px">
    <d-slider :min="minValue" :max="maxValue" v-model="inputValue" showInput></d-slider>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const inputValue = ref(10);
    const minValue = ref(0);
    const maxValue = ref(20);
    return {
      inputValue,
      maxValue,
      minValue,
    };
  },
});
</script>
```

:::

### 自定义颜色 color

:::demo

```vue
<template>
  <div class="slider-wrapper" style="padding:20px">
    <d-slider v-model="inputValue" color="#e67e22"></d-slider>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const inputValue = ref(20);
    return {
      inputValue,
    };
  },
});
</script>
```

:::

### 禁止输入态

:::demo

```vue
<template>
  <div class="slider-wrapper" style="padding:20px">
    <d-slider :min="minValue" :max="maxValue" disabled v-model="disabledValue"></d-slider>
    <br style="margin-bottom: 20px" />
    <d-slider :min="minValue" :max="maxValue" showInput disabled v-model="disabledValue"></d-slider>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const disabledValue = ref(5);
    const maxValue = ref(50);
    const minValue = ref(2);
    return {
      disabledValue,
      maxValue,
      minValue,
    };
  },
});
</script>
```

:::

### 定制 Popover 的显示内容

通过 tipsRenderer 参数传入定制 Popover 内的显示内容。
:::demo

```vue
<template>
  <div>
    <div class="slider-wrapper" style="padding:20px">
      <d-slider :min="minValue" :max="maxValue" v-model="inputValue" tipsRenderer="apples"></d-slider>
      <br style="margin-bottom: 20px" />
      <d-slider :min="minValue" :max="maxValue" v-model="inputValue" tipsRenderer="null"></d-slider>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const inputValue = ref(5);
    const maxValue = ref(50);
    const minValue = ref(2);
    return {
      inputValue,
      maxValue,
      minValue,
    };
  },
});
</script>
```

:::

### Slider 参数

| 参数         | 类型    | 默认  | 说明                                                                | 跳转                                              |
| :----------- | :------ | :---- | :------------------------------------------------------------------ | :------------------------------------------------ |
| max          | number  | 100   | 可选，滑动输入条的最大值                                            | [基本用法](#基本用法)                             |
| min          | number  | 0     | 可选，滑动输入条的最小值                                            | [基本用法](#基本用法)                             |
| step         | number  | 1     | 可选，滑动输入条的步长，取值必须大于等于 1，且必须可被(max-min)整除 | [可设置 Step 的滑动组件](#可设置step的滑动组件)   |
| color        | string  | ''    | 可选，自定义滑块的颜色显示                                          | [自定义颜色 color](#自定义颜色color)              |
| disabled     | boolean | false | 可选，值为 true 时禁止用户输入                                      | [禁止输入态](#禁止输入态)                         |
| showInput    | boolean | false | 可选，值为 true 显示输入框                                          | [带有输入框的滑动组件](#带有输入框的滑动组件)     |
| tipsRenderer | string  |       | 可选，渲染 Popover 内容的函数，传入'null'时不显示 Popover           | [定制 popover 的显示内容](#定制popover的显示内容) |
