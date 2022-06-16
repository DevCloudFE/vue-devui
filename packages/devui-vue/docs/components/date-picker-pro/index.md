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

### 显示时间

:::demo

```vue
<template>
  <d-date-picker-pro v-model="datePickerProValue1" class="mb20 wh250" :showTime="true" format="YYYY/MM/DD HH:mm:ss" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const datePickerProValue1 = ref<string>('');

    return {
      datePickerProValue1,
    };
  },
});
</script>
```

:::

### 日期格式

通过`format`指定绑定值的格式。 为 Dayjs 支持的 format 参数

:::demo

```vue
<template>
  <div class="picker-pro-format-demo  mr30">
    <div class="mb10">日期格式： YYYY-MM-DD</div>
    <d-date-picker-pro v-model="pickerProFormatValue" class="mb20 wh250" format="YYYY-MM-DD" />
  </div>
  <div class="picker-pro-format-demo">
    <div class="mb10">日期格式： YYYY-MM-DD HH:mm:ss</div>
    <d-date-picker-pro v-model="pickerProFormatValue1" class="mb20 wh250" :showTime="true" format="YYYY-MM-DD HH:mm:ss" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const pickerProFormatValue = ref<string>('');
    const pickerProFormatValue1 = ref<string>('');

    return {
      pickerProFormatValue,
      pickerProFormatValue1,
    };
  },
});
</script>
<style>
.picker-pro-format-demo {
  display: inline-block;
}
.mr30 {
  margin-right: 20px;
}
.mb10 {
  margin-bottom: 10px;
}
</style>
```

:::

### 范围选择器

:::demo

```vue
<template>
  <div class="mb10">basic range picker</div>
  <d-range-date-picker-pro v-model="rangeDatePickerProValue" class="mb20" />
  <div class="mb10">time range picker</div>
  <d-range-date-picker-pro v-model="rangeDatePickerProValue1" class="mb20" :showTime="true" format="YYYY/MM/DD HH:mm:ss" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const rangeDatePickerProValue = ref<string[]>(['', '']);
    const rangeDatePickerProValue1 = ref<string[]>(['', '']);

    return {
      rangeDatePickerProValue,
      rangeDatePickerProValue1,
    };
  },
});
</script>
```

:::

### DatePickerPro 参数

| 参数名      | 类型                        | 默认                                  | 说明                                                     | 跳转 Demo             |
| :---------- | :-------------------------- | :------------------------------------ | :------------------------------------------------------- | :-------------------- |
| v-model     | [IDatePicker](#idatepicker) | ''                                    | 必选，选中项绑定的值                                     | [基本用法](#基本用法) |
| format      | `string`                    | 'YYYY/MM/DD' \| 'YYYY/MM/DD HH:mm:ss' | 可选，绑定值的日期格式，根据是否 showTime 区别不同默认值 | [日期格式](#日期格式) |
| placeholder | `string`                    | '请选择日期'                          | 可选，输入框的 placeholder                               | [基本用法](#基本用法) |
| showTime    | `boolean`                   | false                                 | 可选，是否显示时分秒                                     | [显示时间](#显示时间) |

### DatePickerPro 事件

| 事件名       | 类型                      | 说明                             | 跳转 Demo |
| :----------- | :------------------------ | :------------------------------- | :-------- |
| toggleChange | `(bool: boolean) => void` | 可选，选择器打开关闭 toggle 事件 |           |
| confirmEvent | `(date: Date) => void`    | 可选，用户确定选定的值时触发     |           |

### DatePickerPro 类型定义

#### IDatePicker

```ts
type IDatePicker = Date | number | string;
```

### RangeDatePickerPro 参数

| 参数名      | 类型                                  | 默认                                  | 说明                                                     | 跳转 Demo                 |
| :---------- | :------------------------------------ | :------------------------------------ | :------------------------------------------------------- | :------------------------ |
| v-model     | [IRangeDatePicker](#irangedatepicker) | ''                                    | 必选，选中项绑定的值                                     | [范围选择器](#范围选择器) |
| format      | `string`                              | 'YYYY/MM/DD' \| 'YYYY/MM/DD HH:mm:ss' | 可选，绑定值的日期格式，根据是否 showTime 区别不同默认值 | [日期格式](#日期格式)     |
| placeholder | `Array`                               | ['请选择日期', '请选择日期']          | 可选，输入框的 placeholder                               | [范围选择器](#范围选择器) |
| showTime    | `boolean`                             | false                                 | 可选，是否显示时分秒                                     | [范围选择器](#范围选择器) |

### RangeDatePickerPro 事件

| 事件名       | 类型                      | 说明                               | 跳转 Demo |
| :----------- | :------------------------ | :--------------------------------- | :-------- |
| toggleChange | `(bool: boolean) => void` | 可选，选择器打开关闭 toggle 事件   |           |
| confirmEvent | `(date: Date[]) => void`  | 可选，用户确定选定的时间范围时触发 |           |

### RangeDatePickerPro 类型定义

#### IRangeDatePicker

```ts
type IDatePicker = (Date | number | string)[];
```
