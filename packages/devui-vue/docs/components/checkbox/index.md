# CheckBox 复选框

多选框。

### 何时使用

1. 在一组选项中进行多项选择；
2. 单独使用可以表示在两个状态之间切换，可以和提交操作结合。

### 基本用法

:::demo

```vue
<template>
  <div class="checkbox-basic-demo">
    <d-checkbox label="Checked" :isShowTitle="false" v-model="checked" />
    <d-checkbox label="Not checked" :isShowTitle="false" v-model="unchecked" />
    <d-checkbox
      label="Custom title"
      :isShowTitle="true"
      title="my title"
      v-model="unchecked2"
    />
    <d-checkbox
      label="No Animation"
      :isShowTitle="false"
      v-model="checked2"
      :showAnimation="false"
    />
    <d-checkbox
      label="Disabled"
      :isShowTitle="false"
      v-model="checked"
      :disabled="true"
    />
    <d-checkbox
      label="Disabled"
      :isShowTitle="false"
      v-model="unchecked"
      :disabled="true"
    />
    <d-checkbox
      label="Half-checked"
      :isShowTitle="false"
      :halfchecked="halfCheck"
      v-model="allCheck"
      @change="onHalfCheckboxChange"
    />
    <d-checkbox
      label="Half-checked"
      :isShowTitle="false"
      :halfchecked="halfCheck"
      v-model="allCheck"
      @change="onHalfCheckboxChange"
      :disabled="true"
    />
    <d-checkbox
      label="Custom color"
      :isShowTitle="false"
      v-model="customCheck"
      color="RGB(255, 193, 7)"
    />
    <d-checkbox
      label="Half-checked"
      :isShowTitle="false"
      :halfchecked="halfCheck2"
      v-model="allCheck2"
      @change="onHalfCheckboxChange2"
      color="RGB(255, 193, 7)"
    />
    <d-checkbox :isShowTitle="false" v-model="unchecked3">
      <div class="inline-row" style="display: inline-flex">
        <d-select
          v-model="value1"
          :options="[1, 2, 3, 4]"
          size="sm"
          @click="handleChange"
        ></d-select>
        <span>Custom label template</span>
      </div>
    </d-checkbox>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const checked = ref(true)
    const checked2 = ref(true)
    const unchecked = ref(false)
    const unchecked2 = ref(false)
    const unchecked3 = ref(false)
    const halfCheck = ref(true)
    const halfCheck2 = ref(true)
    const allCheck = ref(false)
    const allCheck2 = ref(false)
    const customCheck = ref(true)
    const value1 = ref(null)

    const onHalfCheckboxChange = (value) => {
      halfCheck.value = !allCheck.value
      console.log('halfCheckbox checked:', value)
    }
    const onHalfCheckboxChange2 = (value) => {
      halfCheck2.value = !allCheck2.value
      console.log('halfCheckbox checked:', value)
    }
    const handleChange = ($event) => {
      $event.preventDefault()
      $event.stopPropagation()
    }
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
    }
  },
})
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
    <d-checkbox-group
      v-model="values1"
      :options="options1"
      direction="row"
    ></d-checkbox-group>

    <h4 class="title">Input String Array</h4>
    <d-checkbox-group
      v-model="values2"
      :options="options2"
      :isShowTitle="false"
      direction="row"
    ></d-checkbox-group>

    <h4 class="title">Disabled Group</h4>
    <d-checkbox-group
      v-model="values2"
      :options="options2"
      :isShowTitle="false"
      direction="row"
      :disabled="true"
    ></d-checkbox-group>

    <h4 class="title">Custom Selected Color</h4>
    <d-checkbox-group
      v-model="values3"
      :options="options3"
      :isShowTitle="false"
      direction="row"
      color="RGB(255, 193, 7)"
    ></d-checkbox-group>

    <h4 class="title">Set showAnimation false</h4>
    <d-checkbox-group
      v-model="values4"
      :options="options3"
      :isShowTitle="false"
      direction="row"
      :showAnimation="false"
    ></d-checkbox-group>

    <h4 class="title">Multi-line Checkbox</h4>
    <d-checkbox-group
      v-model="values5"
      :options="options5"
      :isShowTitle="false"
      direction="row"
      :itemWidth="94"
    ></d-checkbox-group>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const options1 = ref([
      { name: 'data1', disabled: 'true', value: 1, id: 1 },
      { name: 'data2', value: 2, id: 2 },
      { name: 'data3', value: 3, id: 3 },
    ])
    const values1 = ref([{ name: 'data2', value: 2, id: 2 }])
    const options2 = ref([
      'data1',
      'data2',
      'data3',
      'data4',
      'data5',
      'data6',
      'data7',
    ])
    const values2 = ref(['data1', 'data2'])
    const options3 = ref([
      'data1',
      'data2',
      'data3',
      'data4',
      'data5',
      'data6',
      'data7',
    ])
    const values3 = ref(['data1', 'data2'])
    const values4 = ref(['data2', 'data3'])
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
    ])
    const values5 = ref(['data2', 'data3'])
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
    }
  },
})
</script>
<style>
.checkbox-group-demo .title {
  margin: 20px 0;
}
</style>
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
      v-model="checked1"
      @change="onCheckbox1Change"
      :beforeChange="beforeChange"
    />
  </div>
  <div>
    <d-checkbox
      label="Conditional Judgment Callback Interception Selected"
      :isShowTitle="false"
      v-model="checked2"
      @change="onCheckbox1Change"
      :beforeChange="beforeChange"
    />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const checked1 = ref(true)
    const checked2 = ref(false)

    const onCheckbox1Change = (value) => {
      console.log('checkbox1 checked:', value)
    }

    const beforeChange = (isChecked, label) => {
      return label === 'Conditional Callback Allowed'
    }
    return {
      checked1,
      checked2,
      onCheckbox1Change,
      beforeChange,
    }
  },
})
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
      v-model="values"
      :options="options"
      :isShowTitle="false"
      direction="row"
      @change="onCheckbox1Change"
      :beforeChange="beforeChange"
    />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const options = ref([
      'data1',
      'data2',
      'intercept',
      'intercept2',
      'data5',
      'data6',
      'data7',
    ])
    const values = ref(['data2', 'intercept'])
    const onCheckbox1Change = (value) => {
      console.log('checkbox1 checked:', value)
    }

    const beforeChange = (isChecked, label) => {
      return !label.includes('intercept')
    }

    return {
      options,
      values,
      onCheckbox1Change,
      beforeChange,
    }
  },
})
</script>
```

:::
