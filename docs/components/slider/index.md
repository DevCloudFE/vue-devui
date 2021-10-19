# Slider 滑动输入条

滑动输入条。

### 何时使用

当用户需要在数值区间内进行选择时使用。

### 基本用法

:::demo

```vue
<d-slider :min="minValue" :max="maxValue"  v-model='inputValue'></d-slider>
<script>
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup() {
      const inputValue = ref(0);
      const minValue = ref(0);
      const maxValue = ref(100);

      return {
        inputValue,
        maxValue,
        minValue
      };
    },
  });
</script>
```

:::

### 带有输入框的滑动组件

:::demo

```vue
<d-slider :min="minValue" :max="maxValue" v-model='inputValue' showInput></d-slider>
<script>
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup() {
      const inputValue = ref(0);
      const minValue = ref(0);
      const maxValue = ref(100);

      return {
        inputValue,
        maxValue,
        minValue
      };
    },
  });
</script>
```

:::

### 可设置 Step 的滑动组件
:::demo

```vue
<d-slider :min="minValue" :max="maxValue" v-model="inputValue" showInput :step="step"></d-slider>
<script>
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup() {
      const inputValue = ref(0);
      const minValue = ref(0);
      const maxValue = ref(100);
      const step = ref(4);

      return {
        inputValue,
        maxValue,
        minValue,
        step
      };
    },
  });
</script>
```
:::

### 禁止输入态

:::demo

```vue
<d-slider :min="minValue" :max="maxValue" :disabled="true" v-model='disabledValue'></d-slider>
<script>
  import { defineComponent, ref } from 'vue'

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

### API

d-slider 参数

| 参数    | 类型  | 默认 | 说明                                                              | 跳转 |
| --------- | ------- | ----- | ------------------------------------------------------------------- | ---- |
| max       | number  | 100   | 可选，滑动输入条的最大值                                |[基本用法](#基本用法)      |
| min       | number  | 0     | 可选，滑动输入条的最小值                                |[基本用法](#基本用法)       |
| showInput | boolean | false | 可选，值为 true 显示输入框                                |[带有输入框的滑动组件](#带有输入框的滑动组件)        |
| step      | number  | 1     | 可选，滑动输入条的步长，取值必须大于等于1，且必须可被(max-min)整除 |[可设置 Step 的滑动组件](#可设置Step的滑动组件)       |
| disabled  | boolean | false | 可选，值为 true 时禁止用户输入                          |[禁止输入态](#禁止输入态)      |