# CheckBox 复选框

多选框。

#### 何时使用

1. 在一组选项中进行多项选择；
2. 单独使用可以表示在两个状态之间切换，可以和提交操作结合。

### 基本用法

:::demo

```vue
<template>
  <div class="checkbox-basic-demo">
    <d-checkbox label="Checked" :isShowTitle="false" v-model="checked" />
    <d-checkbox label="Not checked" :isShowTitle="false" v-model="unchecked" />
    <d-checkbox label="Custom title" :isShowTitle="true" title="my title" v-model="unchecked2" />
    <d-checkbox label="No Animation" :isShowTitle="false" v-model="checked2" :showAnimation="false" />
    <d-checkbox label="Disabled" :isShowTitle="false" v-model="checked" :disabled="true" />
    <d-checkbox label="Disabled" :isShowTitle="false" v-model="unchecked" :disabled="true" />
    <d-checkbox label="Half-checked" :isShowTitle="false" :half-checked="halfCheck" v-model="allCheck" @change="onHalfCheckboxChange" />
    <d-checkbox
      label="Half-checked"
      :isShowTitle="false"
      :half-checked="halfCheck"
      v-model="allCheck"
      @change="onHalfCheckboxChange"
      :disabled="true"
    />
    <d-checkbox label="Custom color" :isShowTitle="false" v-model="customCheck" color="RGB(255, 193, 7)" />
    <d-checkbox
      label="Half-checked"
      :isShowTitle="false"
      :half-checked="halfCheck2"
      v-model="allCheck2"
      @change="onHalfCheckboxChange2"
      color="RGB(255, 193, 7)"
    />
    <d-checkbox :isShowTitle="false" v-model="unchecked3">
      <div class="inline-row" style="display: inline-flex">
        <d-select v-model="value1" :options="[1, 2, 3, 4]" size="sm" @click="handleChange"></d-select>
        <span>Custom label template</span>
      </div>
    </d-checkbox>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const checked = ref(true);
    const checked2 = ref(true);
    const unchecked = ref(false);
    const unchecked2 = ref(false);
    const unchecked3 = ref(false);
    const halfCheck = ref(true);
    const halfCheck2 = ref(true);
    const allCheck = ref(false);
    const allCheck2 = ref(false);
    const customCheck = ref(true);
    const value1 = ref(null);

    const onHalfCheckboxChange = (value) => {
      halfCheck.value = !allCheck.value;
      console.log('halfCheckbox checked:', value);
    };
    const onHalfCheckboxChange2 = (value) => {
      halfCheck2.value = !allCheck2.value;
      console.log('halfCheckbox checked:', value);
    };
    const handleChange = ($event) => {
      $event.preventDefault();
      $event.stopPropagation();
    };
    return {
      checked,
      checked2,
      unchecked,
      unchecked2,
      unchecked3,
      halfCheck,
      halfCheck2,
      allCheck,
      allCheck2,
      onHalfCheckboxChange,
      customCheck,
      onHalfCheckboxChange2,
      handleChange,
      value1,
    };
  },
});
</script>
<style>
.checkbox-basic-demo .devui-checkbox {
  margin-bottom: 10px;
}
.checkbox-basic-demo .inline-row .devui-select {
  width: 150px;
  margin-right: 10px;
}
</style>
```

:::

### 使用 CheckBoxGroup

:::demo

```vue
<template>
  <div class="checkbox-group-demo">
    <h4 class="title">Input Object Array</h4>
    <d-checkbox-group v-model="values1" :options="options1" direction="row"></d-checkbox-group>

    <h4 class="title">Input String Array</h4>
    <d-checkbox-group v-model="values2" :options="options2" :isShowTitle="false" direction="row"></d-checkbox-group>

    <h4 class="title">Disabled Group</h4>
    <d-checkbox-group v-model="values2" :options="options2" :isShowTitle="false" direction="row" :disabled="true"></d-checkbox-group>

    <h4 class="title">Custom Selected Color</h4>
    <d-checkbox-group
      v-model="values3"
      :options="options3"
      :isShowTitle="false"
      direction="row"
      color="RGB(255, 193, 7)"
    ></d-checkbox-group>

    <h4 class="title">Set showAnimation false</h4>
    <d-checkbox-group v-model="values4" :options="options3" :isShowTitle="false" direction="row" :showAnimation="false"></d-checkbox-group>

    <h4 class="title">Multi-line Checkbox</h4>
    <d-checkbox-group v-model="values5" :options="options5" :isShowTitle="false" direction="row" :itemWidth="94"></d-checkbox-group>

    <h4 class="title">可选项目数量的限制</h4>
    <d-checkbox-group
      v-model="values6"
      :options="options5"
      :isShowTitle="false"
      direction="row"
      :itemWidth="94"
      :max="3"
    ></d-checkbox-group>
    <h4 class="title">插槽方式</h4>
    <d-checkbox-group v-model="values7" :isShowTitle="false" direction="row" :itemWidth="94" :max="3">
      <d-checkbox v-for="item in options1" :key="item.value" :label="item.name" :value="item.value"></d-checkbox>
    </d-checkbox-group>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const options1 = ref([
      { name: 'data1', disabled: true, value: '1', id: 1 },
      { name: 'data2', value: '2', id: 2 },
      { name: 'data3', value: '3', id: 3 },
    ]);
    const values1 = ref([{ name: 'data2', value: '2', id: 2 }]);
    const options2 = ref(['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7']);
    const values2 = ref(['data1', 'data2']);
    const options3 = ref(['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7']);
    const values3 = ref(['data1', 'data2']);
    const values4 = ref(['data2', 'data3']);
    const options5 = ref([
      'data00000000000000001',
      'data2',
      'data3',
      'data4',
      'data5',
      'data6',
      'data7',
      'data8',
      'data9',
      'data10',
      'data11',
      'data12',
      'data13',
      'data14',
      'data15',
    ]);
    const values5 = ref(['data2', 'data3']);
    const values6 = ref(['data2', 'data3']);
    const values7 = ref(['2', '3']);
    return {
      options1,
      values1,
      options2,
      values2,
      options3,
      values3,
      values4,
      options5,
      values5,
      values6,
      values7,
    };
  },
});
</script>
<style>
.checkbox-group-demo .title {
  margin: 20px 0;
}
</style>
```

:::

### 尺寸和边框

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 10px">
      <d-checkbox-group v-model="borderSizeValues1" :options="borderSizeOptions1" direction="row" size="lg" border></d-checkbox-group>
    </div>
    <div style="margin-bottom: 10px">
      <d-checkbox-group v-model="borderSizeValues2" :options="borderSizeOptions1" direction="row" size="md" border></d-checkbox-group>
    </div>
    <div style="margin-bottom: 10px">
      <d-checkbox-group v-model="borderSizeValues3" :options="borderSizeOptions1" direction="row" size="sm" border></d-checkbox-group>
    </div>
    <div style="margin-bottom: 10px">
      <d-checkbox-group v-model="borderSizeValues4" :options="borderSizeOptions1" direction="row" size="xs" border></d-checkbox-group>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const borderSizeOptions1 = ref([
      { name: '选项1', disabled: true, value: '1', id: 1 },
      { name: '选项2', value: '2', id: 2 },
    ]);
    const borderSizeValues1 = ref([{ name: '选项2', value: '2', id: 2 }]);
    const borderSizeValues2 = ref([{ name: '选项2', value: '2', id: 2 }]);
    const borderSizeValues3 = ref([{ name: '选项2', value: '2', id: 2 }]);
    const borderSizeValues4 = ref([{ name: '选项2', value: '2', id: 2 }]);
    return {
      borderSizeValues1,
      borderSizeValues2,
      borderSizeValues3,
      borderSizeValues4,
      borderSizeOptions1,
    };
  },
});
</script>
```

:::

### 按钮形态

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 10px">
      <d-checkbox-group v-model="buttonValues1" size="lg" is-show-title color="rgb(255, 193, 7)" text-color="#ca3d3d">
        <d-checkbox-button
          v-for="item in buttonOptions1"
          :label="item.label"
          :value="item.value"
          :key="item.value"
          :title="item.title"
        ></d-checkbox-button
      ></d-checkbox-group>
      <d-checkbox-group v-model="buttonValues1" style="margin-top: 10px;">
        <d-checkbox-button v-for="item in buttonOptions1" :label="item.label" :value="item.value" :key="item.value"></d-checkbox-button
      ></d-checkbox-group>
      <d-checkbox-group v-model="buttonValues1" size="sm" style="margin-top: 10px;">
        <d-checkbox-button
          v-for="item in buttonOptions1"
          :label="item.label"
          :value="item.value"
          :key="item.value"
          :disabled="item.disabled"
        ></d-checkbox-button
      ></d-checkbox-group>
      <d-checkbox-group v-model="buttonValues1" size="xs" disabled style="margin-top: 10px;">
        <d-checkbox-button v-for="item in buttonOptions1" :label="item.label" :value="item.value" :key="item.value"></d-checkbox-button
      ></d-checkbox-group>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const buttonOptions1 = ref([
      { label: '选项1', disabled: true, value: 2, id: 1, title: '自定义title1' },
      { label: '选项2', value: 3, id: 2, title: '自定义title2' },
      { label: '选项3', value: 4, id: 3, title: '自定义title3' },
    ]);
    const buttonValues1 = ref([2]);
    return {
      buttonValues1,
      buttonOptions1,
    };
  },
});
</script>
```

:::

### checkbox 根据条件终止切换状态

根据条件判断，label 为'条件判断回调禁止选中'的 checkbox 终止切换状态。
:::demo

```vue
<template>
  <div style="margin-bottom: 10px">
    <d-checkbox
      label="Conditional Callback Allowed"
      :isShowTitle="false"
      v-model="checkboxChecked1"
      @change="onCheckboxEndChange"
      :beforeChange="endBeforeChange"
    />
  </div>
  <div>
    <d-checkbox
      label="Conditional Judgment Callback Interception Selected"
      :isShowTitle="false"
      v-model="checkboxChecked2"
      @change="onCheckboxEndChange"
      :beforeChange="endBeforeChange"
    />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const checkboxChecked1 = ref(true);
    const checkboxChecked2 = ref(false);

    const onCheckboxEndChange = (value) => {
      console.log('checkbox1 checked:', value);
    };

    const endBeforeChange = (isChecked, label) => {
      return label === 'Conditional Callback Allowed';
    };
    return {
      checkboxChecked1,
      checkboxChecked2,
      onCheckboxEndChange,
      endBeforeChange,
    };
  },
});
</script>
```

:::

### checkbox-group 根据条件终止切换状态

选项包含'拦截'字段的 checkbox 无法切换状态。
:::demo

```vue
<template>
  <div>
    <d-checkbox-group
      v-model="interceptValues"
      :options="interceptOptions"
      :isShowTitle="false"
      direction="row"
      @change="onCheckboxInterceptChange"
      :beforeChange="interceptBeforeChange"
    />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const interceptOptions = ref(['data1', 'data2', 'intercept', 'intercept2', 'data5', 'data6', 'data7']);
    const interceptValues = ref(['data2', 'intercept']);
    const onCheckboxInterceptChange = (value) => {
      console.log('checkbox1 checked:', value);
    };

    const interceptBeforeChange = (isChecked, label) => {
      return !label.includes('intercept');
    };

    return {
      interceptOptions,
      interceptValues,
      onCheckboxInterceptChange,
      interceptBeforeChange,
    };
  },
});
</script>
```

:::

### Checkbox 参数

| 参数           | 类型                            | 默认  | 说明                                                                                      | 跳转 Demo                                 |
| :------------- | :------------------------------ | :---- | :---------------------------------------------------------------------------------------- | ----------------------------------------- |
| name           | `string`                        | --    | 可选，表单域名，input 原生 name 属性                                                      | [基本用法](#基本用法)                     |
| label          | `string`                        | --    | 可选，显示标签                                                                            | [基本用法](#基本用法)                     |
| value          | `string\|number`                | --    | 可选，选中状态的值（只有在 checkbox-group 或者绑定对象为 array 时有效）                   | [使用 CheckBoxGroup](#使用-checkboxgroup) |
| half-checked   | `boolean`                       | false | 可选，半选状态                                                                            | [基本用法](#基本用法)                     |
| is-show-title  | `boolean`                       | true  | 可选，是否显示 title 提示，<br>默认显示参数`label`的值                                    | [基本用法](#基本用法)                     |
| title          | `string`                        | --    | 可选，显示自定义 title 提示内容                                                           | [基本用法](#基本用法)                     |
| color          | `string`                        | --    | 可选，复选框颜色                                                                          | [基本用法](#基本用法)                     |
| show-animation | `boolean`                       | true  | 可选，控制是否显示动画                                                                    | [基本用法](#基本用法)                     |
| disabled       | `boolean`                       | false | 可选，是否禁用                                                                            | [基本用法](#基本用法)                     |
| before-change  | `Function\|Promise<boolean>`    | --    | 可选，checkbox 切换前的回调函数，<br>返回 boolean 类型，返回 false 可以阻止 checkbox 切换 | [基本用法](#基本用法)                     |
| size           | [ICheckboxSize](#icheckboxsize) | md    | 可选， checkbox 尺寸，只有在 border 属性存在时生效                                        | [尺寸](#尺寸和边框)                       |
| border         | `boolean`                       | false | 可选， 是否有边框                                                                         | [边框](#尺寸和边框)                       |

### Checkbox 事件

|  事件  |                   说明                   |       跳转 Demo       |
| :----: | :--------------------------------------: | :-------------------: |
| change | 复选框的值改变时发出的事件，值是当前状态 | [基本用法](#基本用法) |

### CheckboxGroup 参数

|      参数      |                类型                |   默认   | 说明                                                                   | 跳转 Demo                                 |
| :------------: | :--------------------------------: | :------: | :--------------------------------------------------------------------- | ----------------------------------------- |
|      name      |              `string`              |    --    | 可选，表单域名，input 原生 name 属性                                   | [使用 CheckBoxGroup](#使用-checkboxgroup) |
|   direction    |        `'row' \| 'column'`         | 'column' | 可选，显示方向                                                         | [使用 CheckBoxGroup](#使用-checkboxgroup) |
|   item-width   |              `number`              |    --    | 可选，表示每一项 checkbox 的宽度(px)                                   | [使用 CheckBoxGroup](#使用-checkboxgroup) |
|    options     |              `array`               |    []    | 可选，复选框选项数组                                                   | [使用 CheckBoxGroup](#使用-checkboxgroup) |
|  half-checked  |             `boolean`              |  false   | 可选，半选状态                                                         | [使用 CheckBoxGroup](#使用-checkboxgroup) |
| is-show-title  |             `boolean`              |   true   | 可选，是否显示 title 提示，<br>默认显示参数`label`的值                 | [使用 CheckBoxGroup](#使用-checkboxgroup) |
|     color      |              `string`              |    --    | 可选，复选框颜色                                                       | [使用 CheckBoxGroup](#使用-checkboxgroup) |
| show-animation |             `boolean`              |   true   | 可选，控制是否显示动画,按钮形态不可用                                  | [使用 CheckBoxGroup](#使用-checkboxgroup) |
|    disabled    |             `boolean`              |  false   | 可选，是否禁用                                                         | [使用 CheckBoxGroup](#使用-checkboxgroup) |
|      max       |              `number`              |    --    | 可选，可被勾选的 checkbox 的最大数量                                   | [使用 CheckBoxGroup](#使用-checkboxgroup) |
| before-change  | `Function`\|<br>`Promise<boolean>` |    --    | 可选，checkbox 切换前的回调函数，<br>返回 false 可以阻止 checkbox 切换 | [使用 CheckBoxGroup](#使用-checkboxgroup) |
|      size      |  [ICheckboxSize](#icheckboxsize)   |    md    | 可选， checkbox 尺寸，只有在 border 属性存在时生效                     | [尺寸](#尺寸和边框)                       |
|     border     |             `boolean`              |  false   | 可选， 是否有边框                                                      | [边框](#尺寸和边框)                       |
|   text-color   |              `string`              |    --    | 可选， 按钮被选中的字体样式，只存在于按钮形态中                        | [按钮形态](#按钮形态)                     |

### CheckboxGroup 事件

| 事件   | 说明                | 跳转 Demo                                          |
| :----- | :------------------ | :------------------------------------------------- |
| change | checkbox 值改变事件 | [使用 change 事件](#checkbox-根据条件终止切换状态) |

### CheckboxButton 参数

| 参数          | 类型                            | 默认  | 说明                                                                                      | 跳转 Demo             |
| :------------ | :------------------------------ | :---- | :---------------------------------------------------------------------------------------- | --------------------- |
| name          | `string`                        | --    | 可选，表单域名，input 原生 name 属性                                                      | [按钮形态](#按钮形态) |
| label         | `string`                        | --    | 可选，显示标签                                                                            | [按钮形态](#按钮形态) |
| value         | `string\|number`                | --    | 可选，选中状态的值（只有在 checkbox-group 或者绑定对象为 array 时有效）                   | [按钮形态](#按钮形态) |
| is-show-title | `boolean`                       | true  | 可选，是否显示 title 提示，<br>默认显示参数`label`的值                                    | [按钮形态](#按钮形态) |
| title         | `string`                        | --    | 可选，显示自定义 title 提示内容                                                           | [按钮形态](#按钮形态) |
| disabled      | `boolean`                       | false | 可选，是否禁用                                                                            | [按钮形态](#按钮形态) |
| before-change | `Function\|Promise<boolean>`    | --    | 可选，checkbox 切换前的回调函数，<br>返回 boolean 类型，返回 false 可以阻止 checkbox 切换 | [按钮形态](#按钮形态) |
| size          | [ICheckboxSize](#icheckboxsize) | md    | 可选， checkbox 尺寸                                                                      | [按钮形态](#按钮形态) |

### Checkbox 类型定义

#### ICheckboxSize

```ts
type ICheckboxSize = 'lg' | 'md' | 'sm' | 'xs';
```
