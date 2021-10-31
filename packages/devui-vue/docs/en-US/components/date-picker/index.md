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

# DatePicker

Date and time visual input。

## Attributes auto-close

|project|description|
|----|----|
|name|auto-close / autoClose|
|type|boolean|
|mustSelect|false|
|default|false|
|description|After selecting the date, whether to automatically close the date panel|

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

## Attributes range

|project|description|
|----|----|
|name|range|
|type|boolean|
|mustSelect|false|
|default|false|
|description|Whether to open interval selection|

```vue
<!-- 开启 -->
<d-datepicker range />
<d-datepicker :range="true" />

<!-- 关闭 -->
<d-datepicker />
<d-datepicker :range="false" />
```

<d-datepicker range />

## Attributes format

|project|type|
|----|----|
|name|format|
|type|string|
|mustSelect|false|
|default|y/MM/dd|
|description|Date value format|

<d-datepicker format="yyyy-MM-dd hh:mm:ss" />
<d-datepicker format="yy-MM-dd" range />

```vue
<d-datepicker format="yyyy-MM-dd hh:mm:ss" />
<d-datepicker format="yy-MM-dd" range />
```

**Date formatting characters**

|character|description|rule|
|----|----|----|
|y, yy, yyyy|year|When using `yy`, only the last 2 digits are displayed, otherwise 4 digits are displayed。for example:`yy/MM/dd -> 21/01/02`， `y/MM/dd -> 2021/01/02`|
|M,MM|month|When using `MM`, the left side of a one-digit number will automatically add `0`。for example: `y/MM/dd -> 2021/01/02`，`y/M/d -> 2021/1/2`|
|d,dd|date|rule reference`M`|
|h,hh|hour|rule reference`M`；Use 24-hour representation。|
|m,mm|minute|rule reference`M`|
|s,ss|second|rule reference`M`|

## Attributes range-spliter

|project|type|
|----|----|
|name|range-spliter / rangeSpliter|
|type|string|
|mustSelect|false|
|default|-|
|description|In interval selection mode, the character that separates the start and end time。|

```vue
<d-datepicker range range-spliter="至" />
```

<d-datepicker range range-spliter="至" />

## Event selectedDateChange

```vue
<input :value="eventValue" readonly>
<d-datepicker :selected-date-change="handleEventValue" />
```

<input :value="eventValue" readonly>
<d-datepicker :selected-date-change="handleEventValue" />