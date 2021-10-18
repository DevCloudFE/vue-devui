# Slider 滑动输入条

滑动输入条

### 何时使用

当用户需要在数值区间内进行选择时使用

### 基本用法

<br />
<d-slider :min="minValue" :max="maxValue"  v-model='inputValue'></d-slider>
<br />

### 带有输入框的滑动组件

<br />
<d-slider :min="minValue" :max="maxValue" v-model='inputValue2' showInput></d-slider>
<br />

### 可设置 Step 的滑动组件
<br />
<d-slider :min="minValue" :max="maxValue" v-model='inputValue3' :step="step"></d-slider>

<br />

```html
<template>

<d-slider :min="minValue" :max="maxValue" v-model="inputValue"></d-slider>

<d-slider :min="minValue" :max="maxValue" v-model="inputValue2" showInput></d-slider>

<d-slider :min="minValue" :max="maxValue" v-model="inputValue3" :step="step"></d-slider>

</template>
<script lang="ts">
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    setup() {

      const inputValue = ref(12);
      const inputValue2 = ref(15);
      const inputValue3 = ref(5);
      const minValue = ref(2);
      const maxValue = ref(50);
      const step = ref(4);

      return {
        inputValue,
        inputValue2,
        inputValue3
        maxValue,
        minValue,
        step
      };
    },
  });
</script>
```

### 禁止输入态

<br />
<d-slider :min="minValue" :max="maxValue" :disabled="true" v-model='disabledValue'></d-slider>
<br />

```html
<template>
<d-slider :min="minValue" :max="maxValue" :disabled="true" v-model='disabledValue'></d-slider>
</template>
<script lang="ts">
  import { defineComponent, ref } from "vue";

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

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const disabledValue = ref(5);
    const inputValue = ref(12);
    const inputValue2 = ref(15);
    const inputValue3 = ref(5);
    const minValue = ref(2);
    const maxValue = ref(50);
    const step = ref(4);
  
    return {
      disabledValue,
      inputValue,
      inputValue2,
      inputValue3,
      maxValue,
      minValue,
      step
    }
  }
})
</script>

### API

d-slider 参数

| 参数    | 类型  | 默认 | 说明                                                              | 跳转 |
| --------- | ------- | ----- | ------------------------------------------------------------------- | ---- |
| max       | number  | 100   | 可选，滑动输入条的最大值                                |[基本用法](#基本用法)      |
| min       | number  | 0     | 可选，滑动输入条的最小值                                |[基本用法](#基本用法)       |
| step      | number  | 1     | 可选，滑动输入条的步长，取值必须大于等于1，且必须可被(max-min)整除 |[基本用法](#可设置Step的滑动组件)       |
| disabled  | boolean | false | 可选，值为 true 时禁止用户输入                          |[基本用法](#禁止输入态)      |
| showInput | boolean | false | 可选，值为 true 显示输入框                                |[基本用法](#带有输入框的滑动组件)        |