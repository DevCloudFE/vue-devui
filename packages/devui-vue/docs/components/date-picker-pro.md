# DatePickerPro 日期选择器

输入或选择日期的组件。

#### 何时使用

当用户需要输入一个日期时；需要点击标准输入框，弹出日期面板进行选择时。

### 基本用法

:::demo

```vue
<template>
  <div class="picker-pro-format-demo mr30">
    <div class="mb10">Small</div>
    <d-date-picker-pro v-model="datePickerProValue" class="mb20 wh250" size="sm" />
  </div>
  <div class="picker-pro-format-demo mr30">
    <div class="mb10">Middle</div>
    <d-date-picker-pro v-model="datePickerProValue2" class="mb20 wh250" />
  </div>
  <div class="picker-pro-format-demo mr30">
    <div class="mb10">Large</div>
    <d-date-picker-pro v-model="datePickerProValue3" class="mb20 wh250" size="lg" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const datePickerProValue = ref<string>('');
    const datePickerProValue2 = ref<string>('');
    const datePickerProValue3 = ref<string>('');

    return {
      datePickerProValue,
      datePickerProValue2,
      datePickerProValue3,
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

### 自定义日历面板区域

:::demo

```vue
<template>
  <div class="mb10">right area</div>
  <d-date-picker-pro v-model="datePickerProValue1" class="mb20 wh250" :showTime="true">
    <template #rightArea>
      <slot name="rightArea">
        <ul class="date-picker-right-panel">
          <li>
            <d-button
              variant="text"
              color="primary"
              @click="
                () => {
                  setDate(-30);
                }
              "
            >
              一个月前
            </d-button>
            <span>{{ getDateString(-30) }}</span>
          </li>
          <li>
            <d-button
              variant="text"
              color="primary"
              @click="
                () => {
                  setDate(-14);
                }
              "
            >
              两周前
            </d-button>
            <span>{{ getDateString(-14) }}</span>
          </li>
          <li>
            <d-button
              variant="text"
              color="primary"
              @click="
                () => {
                  setDate(-7);
                }
              "
            >
              一周前
            </d-button>
            <span>{{ getDateString(-7) }}</span>
          </li>
          <li>
            <d-button
              variant="text"
              color="primary"
              @click="
                () => {
                  setDate(0);
                }
              "
            >
              今天
            </d-button>
            <span>{{ getDateString(0) }}</span>
          </li>
        </ul>
      </slot>
    </template>
  </d-date-picker-pro>
  <div class="mb10">footer</div>
  <d-date-picker-pro v-model="datePickerProValue2" class="mb20 wh250" :showTime="true">
    <template #footer>
      <slot name="footer">
        <div class="date-picker-footer">
          <d-button variant="solid" color="secondary" @click="setToday"> 今天 </d-button>
          <d-button variant="solid" color="secondary" @click="clearDate"> 清除时间 </d-button>
        </div>
      </slot>
    </template>
  </d-date-picker-pro>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const datePickerProValue1 = ref<string | Date>('');
    const datePickerProValue2 = ref<string | Date>('');
    const setDate = (days: number) => {
      datePickerProValue1.value = new Date(new Date().getTime() + days * 24 * 3600 * 1000);
    };
    const getDateString = (days: number) => {
      const date = new Date(new Date().getTime() + days * 24 * 3600 * 1000);
      return `${date.getMonth() + 1}月${date.getDate()}日`;
    };
    const setToday = () => {
      datePickerProValue2.value = new Date(new Date().getTime());
    };
    const clearDate = () => {
      datePickerProValue2.value = '';
    };

    return {
      datePickerProValue1,
      datePickerProValue2,
      setDate,
      getDateString,
      setToday,
      clearDate,
    };
  },
});
</script>
<style>
.date-picker-right-panel {
  padding: 0;
  li {
    list-style-type: none;
    button {
      width: 66px;
    }
    span {
      margin-left: 8px;
    }
  }
}
.date-picker-footer {
  display: flex;
  justify-content: end;
  button {
    margin-left: 10px;
  }
}
</style>
```

:::

### 日期格式

通过`format`指定输入框显示的日期格式, 详见 [Format](#format)

例如：`YYYY-MM-DD`

:::demo

```vue
<template>
  <div class="picker-pro-format-demo mr30">
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

### 年月选择器

通过`type`指定选择器类型

:::demo

```vue
<template>
  <div class="picker-pro-format-demo mr30">
    <div class="mb10">year picker</div>
    <d-date-picker-pro v-model="pickerProFormatValue" class="mb20 wh250" type="year" />
    <div class="mb10">month picker</div>
    <d-date-picker-pro v-model="pickerProFormatValue1" class="mb20 wh250" type="month" />
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
  <div class="mb10">year range picker</div>
  <d-range-date-picker-pro v-model="rangeDatePickerProValue2" class="mb20 wh250" type="year" />
  <div class="mb10">month range picker</div>
  <d-range-date-picker-pro v-model="rangeDatePickerProValue3" class="mb20 wh250" type="month" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const rangeDatePickerProValue = ref<string[]>(['', '']);
    const rangeDatePickerProValue1 = ref<string[]>(['', '']);
    const rangeDatePickerProValue2 = ref<string[]>(['', '']);
    const rangeDatePickerProValue3 = ref<string[]>(['', '']);

    return {
      rangeDatePickerProValue,
      rangeDatePickerProValue1,
      rangeDatePickerProValue2,
      rangeDatePickerProValue3,
    };
  },
});
</script>
```

:::

### 自定义日期范围面板区域

:::demo

```vue
<template>
  <div class="mb10">right area</div>
  <d-range-date-picker-pro v-model="datePickerProValue1" class="mb20 wh250" :showTime="true">
    <template #rightArea>
      <slot name="rightArea">
        <ul class="date-picker-right-panel">
          <li>
            <d-button
              variant="text"
              color="primary"
              @click="
                () => {
                  setDate(-30);
                }
              "
            >
              一个月前
            </d-button>
          </li>
          <li>
            <d-button
              variant="text"
              color="primary"
              @click="
                () => {
                  setDate(-14);
                }
              "
            >
              一周前
            </d-button>
          </li>
          <li>
            <d-button
              variant="text"
              color="primary"
              @click="
                () => {
                  selectThisWeek();
                }
              "
            >
              当前周
            </d-button>
          </li>
        </ul>
      </slot>
    </template>
  </d-range-date-picker-pro>
  <div class="mb10">footer</div>
  <d-range-date-picker-pro ref="footerCustom" v-model="datePickerProValue2" class="mb20 wh250" :showTime="true">
    <template #footer>
      <slot name="footer">
        <div class="date-picker-footer">
          <d-button variant="solid" color="secondary" @click="clearStartDate"> 清除开始时间 </d-button>
          <d-button variant="solid" color="secondary" @click="clearEndDate"> 清除结束时间 </d-button>
        </div>
      </slot>
    </template>
  </d-range-date-picker-pro>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const datePickerProValue1 = ref<string | Date[]>(['', '']);
    const datePickerProValue2 = ref<string | Date[]>(['', '']);
    const setDate = (days: number) => {
      datePickerProValue1.value = [new Date(new Date().getTime() + days * 24 * 3600 * 1000), new Date()];
    };
    const selectThisWeek = () => {
      const tody = new Date();
      const start = new Date(new Date().setDate(tody.getDate() - tody.getDay()));
      const end = new Date(new Date().setDate(start.getDate() + 6));
      datePickerProValue1.value = [start, end];
    };

    const footerCustom = ref();

    const clearStartDate = () => {
      const [start, end] = datePickerProValue2.value;
      datePickerProValue2.value = ['', end];
      footerCustom?.value.focusChange('start');
    };
    const clearEndDate = () => {
      const [start, end] = datePickerProValue2.value;
      datePickerProValue2.value = [start, ''];
      footerCustom?.value.focusChange('end');
    };

    return {
      datePickerProValue1,
      datePickerProValue2,
      setDate,
      selectThisWeek,
      footerCustom,
      clearStartDate,
      clearEndDate,
    };
  },
});
</script>
```

:::

### 禁用选择器

:::demo

```vue
<template>
  <d-date-picker-pro v-model="datePickerProValue1" class="mb20 wh250 mr30" :disabled="true" />
  <d-range-date-picker-pro v-model="datePickerProValue2" class="mb20 wh250" :disabled="true" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const datePickerProValue1 = ref<string>('');
    const datePickerProValue2 = ref<string[]>(['', '']);

    return {
      datePickerProValue1,
      datePickerProValue2,
    };
  },
});
</script>
```

:::

### 设置日历面板可选时间范围

添加 `calendarRange` 属性设置选择器日历面板显示的时间范围。
添加 `limitDateRange` 属性设置选择器日历面板可选择的时间范围。

:::demo

```vue
<template>
  <d-date-picker-pro v-model="datePickerProValue1" class="mb20 wh250 mr30" :calendarRange="[2022, 2025]" :limitDateRange="limitDateRange" />
  <d-range-date-picker-pro
    v-model="datePickerProValue2"
    class="mb20 wh250"
    :calendarRange="[2022, 2025]"
    :limitDateRange="limitDateRange"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const datePickerProValue1 = ref<string>('');
    const datePickerProValue2 = ref<string[]>(['', '']);
    const limitDateRange = ref<Date[]>([new Date(2022, 1, 5), new Date(2023, 1, 5)]);

    return {
      datePickerProValue1,
      datePickerProValue2,
      limitDateRange,
    };
  },
});
</script>
```

:::

### DatePickerPro 参数

| 参数名         | 类型              | 默认                                                     | 说明                                                     | 跳转 Demo                                             |
| :------------- | :---------------- | :------------------------------------------------------- | :------------------------------------------------------- | :---------------------------------------------------- |
| v-model        | `Date`            | ''                                                       | 必选，选中项绑定的值                                     | [基本用法](#基本用法)                                 |
| format         | [Format](#format) | 'YYYY/MM/DD' \| 'YYYY/MM/DD HH:mm:ss'                    | 可选，绑定值的日期格式，根据是否 showTime 区别不同默认值 | [日期格式](#日期格式)                                 |
| placeholder    | `string`          | '请选择日期'                                             | 可选，输入框的 placeholder                               | [基本用法](#基本用法)                                 |
| showTime       | `boolean`         | false                                                    | 可选，是否显示时分秒                                     | [显示时间](#显示时间)                                 |
| size           | `string`          | 'md'                                                     | 可选，输入框的尺寸                                       | [基本用法](#基本用法)                                 |
| disabled       | `boolean`         | false                                                    | 可选，是否禁用选择器                                     | [禁用选择器](#禁用选择器)                             |
| calendarRange  | `[number,number]` | [1970, 2099]                                             | 可选，设置日历面板显示时间范围                           | [设置日历面板可选时间范围](#设置日历面板可选时间范围) |
| limitDateRange | `[Date,Date]`     | [new Date(calendarRange[0]), new Date(calendarRange[1])] | 可选，设置日历面板可选时间范围                           | [设置日历面板可选时间范围](#设置日历面板可选时间范围) |
| type           | `string`          | 'date'                                                   | 可选，设置日期选择器类型(date/year/month)                | [年月选择器](#年月选择器)                             |

### DatePickerPro 事件

| 事件名       | 类型                      | 说明                             | 跳转 Demo |
| :----------- | :------------------------ | :------------------------------- | :-------- |
| toggleChange | `(bool: boolean) => void` | 可选，选择器打开关闭 toggle 事件 |           |
| confirmEvent | `(date: Date) => void`    | 可选，用户确定选定的值时触发     |           |
| focus        | `(e: MouseEvent) => void` | 可选，输入框获取焦点时触发       |           |
| blur         | `() => void`              | 可选，输入框失去焦点时触发       |           |

### DatePickerPro 插槽

| 名称      | 说明                                                     | 跳转 Demo                                 |
| :-------- | :------------------------------------------------------- | :---------------------------------------- |
| rightArea | 自定义 DatePickerPro 日历面板右侧内容， 如：日期快捷选项 | [自定义日历面板区域](#自定义日历面板区域) |
| footer    | 自定义 DatePickerPro 日历面板下侧内容                    | [自定义日历面板区域](#自定义日历面板区域) |

### DatePickerPro 类型定义

#### Format

```ts
type Format = string;
```

日期格式 `format` 支持的标识列表

| 标识 | 示例    | 描述            |
| :--- | :------ | :-------------- |
| YY   | 22      | 年，两位数      |
| YYYY | 2022    | 年，四位数      |
| M    | 1-12    | 月，从 1 开始   |
| MM   | 01-12   | 月，两位数字    |
| MMM  | Jan-Dec | 月，英文缩写    |
| D    | 1-31    | 日              |
| DD   | 01-31   | 日，两位数      |
| H    | 0-23    | 24 小时         |
| HH   | 00-23   | 24 小时，两位数 |
| h    | 1-12    | 12 小时         |
| hh   | 01-12   | 12 小时，两位数 |
| m    | 0-59    | 分钟            |
| mm   | 00-59   | 分钟，两位数    |
| s    | 0-59    | 秒              |
| ss   | 00-59   | 秒，两位数      |

### RangeDatePickerPro 参数

| 参数名         | 类型              | 默认                                                     | 说明                                                     | 跳转 Demo                                             |
| :------------- | :---------------- | :------------------------------------------------------- | :------------------------------------------------------- | :---------------------------------------------------- |
| v-model        | `[Date, Date]`    | ['','']                                                  | 必选，选中项绑定的值                                     | [范围选择器](#范围选择器)                             |
| format         | [Format](#format) | 'YYYY/MM/DD' \| 'YYYY/MM/DD HH:mm:ss'                    | 可选，绑定值的日期格式，根据是否 showTime 区别不同默认值 | [日期格式](#日期格式)                                 |
| placeholder    | `Array`           | ['请选择开始日期', '请选择结束日期']                     | 可选，输入框的 placeholder                               | [范围选择器](#范围选择器)                             |
| showTime       | `boolean`         | false                                                    | 可选，是否显示时分秒                                     | [范围选择器](#范围选择器)                             |
| separator      | `string`          | '-'                                                      | 可选，范围选择器的分割符                                 | [范围选择器](#范围选择器)                             |
| size           | `string`          | 'md'                                                     | 可选，输入框的尺寸                                       |                                                       |
| disabled       | `boolean`         | false                                                    | 可选，是否禁用选择器                                     | [禁用选择器](#禁用选择器)                             |
| calendarRange  | `[number,number]` | [1970,2099]                                              | 可选，设置日历面板显示时间范围                           | [设置日历面板可选时间范围](#设置日历面板可选时间范围) |
| limitDateRange | `[Date,Date]`     | [new Date(calendarRange[0]), new Date(calendarRange[1])] | 可选，设置日历面板可选时间范围                           | [设置日历面板可选时间范围](#设置日历面板可选时间范围) |
| type           | `string`          | 'date'                                                   | 可选，设置日期选择器类型(date/year/month)                | [范围选择器](#范围选择器)                             |

### RangeDatePickerPro 事件

| 事件名       | 类型                      | 说明                               | 跳转 Demo |
| :----------- | :------------------------ | :--------------------------------- | :-------- |
| toggleChange | `(bool: boolean) => void` | 可选，选择器打开关闭 toggle 事件   |           |
| confirmEvent | `(date: Date[]) => void`  | 可选，用户确定选定的时间范围时触发 |           |
| focus        | `(e: MouseEvent) => void` | 可选，输入框获取焦点时触发         |           |
| blur         | `() => void`              | 可选，输入框失去焦点时触发         |           |

### RangeDatePickerPro 插槽

| 名称      | 说明                                                              | 跳转 Demo                                         |
| :-------- | :---------------------------------------------------------------- | :------------------------------------------------ |
| rightArea | 自定义 RangeDatePickerPro 日历面板右侧内容， 如：日期范围快捷选项 | [自定义日期范围面板区域](#自定义日期范围面板区域) |
| footer    | 自定义 RangeDatePickerPro 日历面板下侧内容                        | [自定义日期范围面板区域](#自定义日期范围面板区域) |
