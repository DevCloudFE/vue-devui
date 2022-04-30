# Select 下拉选择框

下拉选择框。

#### 何时使用

用户可以从多个选项中选择一项或几项；仅支持用户在下拉选项中选择和搜索系统提供的选项，不支持输入。

### 基本用法

:::demo 通过`size`：`sm`，`md(默认)`，`lg`来设置`Select`大小，通过`overview`：`underlined`设置只有下边框样式

```vue
<template>
  <div>
    Small
    <d-select v-model="value1" :options="options" size="sm"></d-select>

    Middle
    <d-select v-model="value2" :options="options"></d-select>

    Large
    <d-select v-model="value3" :options="options" size="lg"></d-select>

    Underlined
    <d-select v-model="value4" :options="options" size="lg" overview="underlined"></d-select>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const value1 = ref('');
    const value2 = ref('');
    const value3 = ref('');
    const value4 = ref('');
    const items = new Array(6).fill(0).map((item, i) => `Option ${i + 1}`);
    const options = reactive(items);

    return {
      value1,
      value2,
      value3,
      value4,
      options,
    };
  },
});
</script>
```

:::

### 多选

:::demo 通过`multiple`：`true`来开启多选

```vue
<template>
  <d-select v-model="value" :options="options" :multiple="true" />
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref([]);
    const items = new Array(6).fill(0).map((item, i) => `Option ${i + 1}`);
    const options = reactive(items);

    return {
      value,
      options,
    };
  },
});
</script>
```

:::

### 禁用

:::demo 通过`disabled`：`true`来禁用`Select`，通过`option-disabled-key`来设置单个选项禁用，比如设置`disabled`字段，则对象上 disabled 为`true`时不可选择

```vue
<template>
  <d-select v-model="value1" :options="options1" :disabled="true" />
  <br />
  <d-select v-model="value2" :options="options2" option-disabled-key="disabled" />
  <br />
  <d-select v-model="value3" :options="options3" :multiple="true" option-disabled-key="notAllow" />
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const value1 = ref('');
    const value2 = ref('');
    const value3 = ref([]);
    const items = new Array(6).fill(0).map((item, i) => `Option ${i + 1}`);
    const options1 = reactive(items);
    const options2 = reactive([
      {
        name: 'Option 1',
        value: 0,
      },
      {
        name: 'Option 2',
        value: 1,
      },
      {
        name: 'Option 3',
        value: 2,
        disabled: true,
      },
    ]);
    const options3 = reactive([
      {
        name: 'Option 1',
        value: 0,
      },
      {
        name: 'Option 2',
        value: 1,
        notAllow: true,
      },
      {
        name: 'Option 3',
        value: 2,
      },
    ]);

    return {
      value1,
      value2,
      value3,
      options1,
      options2,
      options3,
    };
  },
});
</script>
```

:::

### 可清空

:::demo 通过`allow-clear`：`true`来设置`Select`可清空

```vue
<template>
  <d-select v-model="value1" :options="options" :allow-clear="true" />
  <br />
  <d-select v-model="value2" :options="options" :multiple="true" :allow-clear="true" />
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const value1 = ref('');
    const value2 = ref([]);
    const items = new Array(6).fill(0).map((item, i) => `Option ${i + 1}`);
    const options = reactive(items);

    return {
      value1,
      value2,
      options,
    };
  },
});
</script>
```

:::

### Select 参数

| 参数名              | 类型      | 默认     | 说明                                                                                                                                                           | 跳转 Demo             |
| :------------------ | :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| options             | `array`   | []       | 可选, 和 searchFn 互斥，两者必须有且只有一个。                                                                                                                 | [基本用法](#基本用法) |
| multiple            | `boolean` | false    | 可选,是否支持多选                                                                                                                                              | [多选](#多选)         |
| readonly            | `boolean` | false    | 可选,是否可以输入                                                                                                                                              |                       |
| size                | `string`  | 'md'     | 可选,下拉选框尺寸,有三种选择'lg','md','sm'                                                                                                                     | [基本用法](#基本用法) |
| disabled            | `boolean` | false    | 可选,是否禁用下拉框                                                                                                                                            | [禁用](#禁用)         |
| placeholder         | `string`  | '请选择' | 可选,输入框的 placeholder                                                                                                                                      |                       |
| overview            | `string`  | 'border' | 可选,决定选择框样式显示,默认有边框'border','underlined'                                                                                                        | [基本用法](#基本用法) |
| option-disabled-key | `string`  | ''       | 可选,禁用单个选项;<br>当传入资源 options 类型为 Object,比如设置为'disabled',<br>则当对象的 disabled 属性为 true 时,该选项将禁用;<br>当设置为''时不禁用单个选项 | [禁用](#禁用)         |
| allow-clear         | `boolean` | false    | 可选, 配置是否允许清空选值，仅单选场景适用                                                                                                                     | [可清空](#可清空)     |

### Select 事件

| 事件名        | 类型     | 说明                                                               | 跳转 Demo |
| :------------ | :------- | :----------------------------------------------------------------- | :-------- |
| value-change  | `string` | 可选,输出函数,当选中某个选项后,将会调用此函数,参数为当前选择项的值 |           |
| toggle-change | `string` | 可选,输出函数,下拉打开关闭 toggle 事件                             |           |
