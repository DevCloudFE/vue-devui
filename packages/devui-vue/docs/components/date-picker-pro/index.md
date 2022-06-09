# DatePickerPro 日期选择器

输入或选择日期的组件。

#### 何时使用

当用户需要输入一个日期时；需要点击标准输入框，弹出日期面板进行选择时。

### 基本用法

:::demo

```vue
<template>
  <d-date-picker-pro v-model="datePickerProValue" class="mb20 wh250" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const datePickerProValue = ref<string>('');

    return {
      datePickerProValue,
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

### DatePickerPro 参数

| 参数名      | 类型     | 默认         | 说明                       | 跳转 Demo                 |
| :---------- | :------- | :----------- | :------------------------- | :------------------------ |
| v-model     | `date`   | ''           | 必选，选中项绑定的值       | [基本用法](#基本用法)     |
| format      | `string` | 'YYYY-MM-DD' | 可选，显示在输入框中的格式 | [基本用法](#基本用法)     |
| placeholder | `string` | '请选择日期' | 可选，输入框的 placeholder | [基本用法](#可关闭的提示) |

### DatePickerPro 事件

| 事件名        | 类型                      | 说明                             | 跳转 Demo |
| :------------ | :------------------------ | :------------------------------- | :-------- |
| toggle-change | `(bool: boolean) => void` | 可选，选择器打开关闭 toggle 事件 |           |
| confirm-event | `(date: Date) => void`    | 可选，用户确定选定的值时触发     |           |
