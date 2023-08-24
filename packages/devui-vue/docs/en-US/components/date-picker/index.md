# DatePicker 日期选择器

输入或选择日期的组件。

#### 何时使用

当用户需要输入一个日期时；需要点击标准输入框，弹出日期面板进行选择时。

### 基本用法

:::demo

```vue

<template>
  <div class="mb-2">选中的日期： {{eventValue}}</div>
  <d-datepicker :selected-date-change="handleEventValue" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const eventValue = ref<string>('')
    const handleEventValue = (val: string) => {
      eventValue.value = val;
    }

    return {
      eventValue,
      handleEventValue,
    };
  }
});
</script>

<style>
.mb20 {
  margin-bottom: 20px;
}

.wh200 {
  width: 200px;
}
</style>
```

:::

### 自动关闭日期面板

:::demo

```vue

<template>
  <div class="mb-2">开启 auto-close</div>
  <d-datepicker auto-close class="mb-1" />
  <d-datepicker :auto-close="true" />

  <div class="mb-2 mt-3">关闭 auto-close</div>
  <d-datepicker class="mb-1" />
  <d-datepicker :auto-close="false" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
  }
});
</script>

<style>
.mb20 {
  margin-bottom: 20px;
}
</style>
```

:::

### 日期范围选择器

:::demo

```vue

<template>
  <div class="mb-2">开启 range</div>
  <d-datepicker range class="mb-1" />
  <d-datepicker :range="true" />

  <div class="mb-2 mt-3">关闭 range</div>
  <d-datepicker class="mb-1" />
  <d-datepicker :range="false" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
  }
});
</script>

<style>
.mb20 {
  margin-bottom: 20px;
}
</style>
```

:::

### 日期格式化

::: demo

```vue

<template>
  <d-datepicker format="yyyy-MM-dd hh:mm:ss" class="mb-1" />
  <d-datepicker format="yy-MM-dd" range />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
  }
});
</script>

<style>
.mb20 {
  margin-bottom: 20px;
}
</style>
```

:::

### 日期起止时间分隔符

::: demo

```vue

<template>
  <d-input v-model="splitterText" :max-length="1" class="mb-1 wh200"></d-input>
  <d-datepicker range :range-spliter="splitterText" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const splitterText = ref('至')

    return {
      splitterText
    }
  }
});
</script>

<style>
.mb20 {
  margin-bottom: 20px;
}

.wh200 {
  width: 200px;
}
</style>
```

:::

### DatePicker 参数

|     参数     |         类型         |   默认   | 说明                                            | 跳转 Demo                     |
| :---------- | :------------------ | :------ | :---------------------------------------------- | ----------------------------- |
| auto-close | `boolean` | false | 可选，选择日期后，是否自动关闭日期面板 | [自动关闭日期面板](#自动关闭日期面板)        |
| range | `boolean` | false | 可选，是否开启日期区间选择 | [日期范围选择器](#日期范围选择器)        |
| format | `string` | y/MM/dd | 可选，[日期值格式](#日期格式化字符) | [日期格式化](#日期格式化)        |
| range-spliter | `string` | - | 可选，在区间选择模式下，分隔起止时间的字符。 | [日期起止时间分隔符](#日期起止时间分隔符) |
| selected-date-change | `Function` | - | 可选，子项切换的时候会发出新激活的子项的数据 | [基本用法](#基本用法) |

### 日期格式化字符

|字符|说明|规则|
|----|----|----|
|y, yy, yyyy|year|使用`yy`时，只显示后2位年份，其他情况显示4位年份。比如`yy/MM/dd -> 21/01/02`， `y/MM/dd -> 2021/01/02`|
|M,MM|month|使用`MM`时，一位数数字左侧自动补`0`。比如`y/MM/dd -> 2021/01/02`，`y/M/d -> 2021/1/2`|
|d,dd|date|规则同`M`|
|h,hh|hour|规则同`M`；使用24小时表示。|
|m,mm|minute|规则同`M`|
|s,ss|second|规则同`M`|
