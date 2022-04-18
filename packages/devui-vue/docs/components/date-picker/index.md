# DatePicker 日期选择器

输入或选择日期的组件。

#### 何时使用

当用户需要输入一个日期时；需要点击标准输入框，弹出日期面板进行选择时。

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {

    const eventValue = ref<string>('')
    const handleEventValue = (val: string) => {
        eventValue.value = val
    }

    return {
      eventValue,
      handleEventValue,
    }
  }
})
</script>

### 属性 auto-close

|项目|说明|
|----|----|
|名称|auto-close / autoClose|
|类型|boolean|
|必填|否|
|默认|false|
|说明|选择日期后，是否自动关闭日期面板|

```vue
<!-- 开启 -->
<d-datepicker auto-close />
<d-datepicker :auto-close="true" />

<!-- 关闭 -->
<d-datepicker />
<d-datepicker :auto-close="false" />
```

<d-datepicker auto-close />
<d-datepicker />

### 属性 range

|项目|说明|
|----|----|
|名称|range|
|类型|boolean|
|必填|否|
|默认|false|
|说明|是否开启区间选择|

```vue
<!-- 开启 -->
<d-datepicker range />
<d-datepicker :range="true" />

<!-- 关闭 -->
<d-datepicker />
<d-datepicker :range="false" />
```

<d-datepicker range />

### 属性 format

|项目|类型|
|----|----|
|名称|format|
|类型|string|
|必填|否|
|默认|y/MM/dd|
|说明|日期值格式|

<d-datepicker format="yyyy-MM-dd hh:mm:ss" />
<d-datepicker format="yy-MM-dd" range />

```vue
<d-datepicker format="yyyy-MM-dd hh:mm:ss" />
<d-datepicker format="yy-MM-dd" range />
```

**日期格式化字符**

|字符|说明|规则|
|----|----|----|
|y, yy, yyyy|year|使用`yy`时，只显示后2位年份，其他情况显示4位年份。比如`yy/MM/dd -> 21/01/02`， `y/MM/dd -> 2021/01/02`|
|M,MM|month|使用`MM`时，一位数数字左侧自动补`0`。比如`y/MM/dd -> 2021/01/02`，`y/M/d -> 2021/1/2`|
|d,dd|date|规则同`M`|
|h,hh|hour|规则同`M`；使用24小时表示。|
|m,mm|minute|规则同`M`|
|s,ss|second|规则同`M`|

### 属性 range-spliter

|项目|类型|
|----|----|
|名称|range-spliter / rangeSpliter|
|类型|string|
|必填|否|
|默认|-|
|说明|在区间选择模式下，分隔起止时间的字符。|

```vue
<d-datepicker range range-spliter="至" />
```

<d-datepicker range range-spliter="至" />

### 事件 selectedDateChange

```vue
<input :value="eventValue" readonly>
<d-datepicker :selected-date-change="handleEventValue" />
```

<input :value="eventValue" readonly>
<d-datepicker :selected-date-change="handleEventValue" />