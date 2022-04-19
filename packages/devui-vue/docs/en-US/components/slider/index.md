# Slider

### When To Use

Used when you need to select a value from a specific range.

### Basic Usage

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

### Limit Step

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

### Bidirectional Binding

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

### Custom Color

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

### Input forbidden state

When disabled is set to true, user input is not allowed.

:::demo

```vue
<template>
  <div class="slider-wrapper" style="padding:20px">
    <d-slider :min="minValue" :max="maxValue" disabled v-model="disabledValue"></d-slider>
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

### Customized popover content displayed

Use the tipsRenderer parameter to transfer the function to customize the content displayed in the popover.
:::demo

```vue
<template>
  <div>
    <div class="slider-wrapper" style="padding:20px">
      <d-slider  :min="minValue" :max="maxValue" v-model="inputValue" tipsRenderer="apples"></d-slider>
      <br style="margin-bottom: 20px" />
      <d-slider :min="minValue" :max="maxValue"  v-model="inputValue" tipsRenderer="null" ></d-slider>
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

### API

d-slider parameter

| Parameter    | Type    | Default |Description                                                                                                                               | Jump to Demo                                                                  |
|--------------|---------|---------|-------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| min          | number  | 0       | Optional. Minimum value of the sliding input bar                                                                                          | [Basic Usage](#basic-usage)                                                   |
| max          | number  | 100     | Optional. Maximum value of the sliding input bar                                                                                          | [Basic Usage](#basic-usage)                                                   |
| step         | number  | 1       | Optional. Step of the sliding input bar. The value must be greater than or equal to 0 and must be divisible by (max-min)                  | [Limit Step ](#limit-step)                                                    |
| color     | string | ''   | Optional. Custom slider color display                                                                        | [Custom Color](#custom-color) 
| disabled     | boolean | false   | Optional. When the value is true, users are not allowed to enter                                                                          | [Input forbidden state](#input-forbidden-state)                               |
| showInput    | boolean | false   | Optional,When the value is false,the input is not displayed                                                                               | [Bidirectional Binding](#bidirectional-binding)                               |
| tipsRenderer | string  |         | Optional. This parameter indicates the function for rendering popover content. If "null" is transferred, popover content is not displayed | [Customized popover content displayed](#customized-popover-content-displayed) |
