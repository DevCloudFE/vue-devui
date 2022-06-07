# DatePickerPro 日期选择器

输入或选择日期的组件。

#### 何时使用

当用户需要输入一个日期时；需要点击标准输入框，弹出日期面板进行选择时。

### 基本用法

:::demo

```vue
<template>
  <d-datepicker-pro v-model="pickerProValue" class="mb20 wh250" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const pickerProValue = ref<string>('');

    return {
      pickerProValue,
    };
  },
});
</script>

<style>
.mb20 {
  margin-bottom: 20px;
}

.wh250 {
  width: 250px;
}
</style>
```

:::
