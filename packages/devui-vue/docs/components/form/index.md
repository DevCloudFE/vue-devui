# Form 表单

具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。

#### 何时使用

需要进行数据收集、数据校验、数据提交功能时。

### 基础用法

:::demo 默认提供水平布局，`data`参数用于设置表单数据。

```vue
<template>
  <d-form :data="formModel">
    <d-form-item field="name" label="Name" help-tips="This is the plan name." extra-info="Enter a short name that meets reading habits.">
      <d-input v-model="formModel.name" />
    </d-form-item>
    <d-form-item field="description" label="Description">
      <d-textarea v-model="formModel.description" />
    </d-form-item>
    <d-form-item field="select" label="Select">
      <d-select v-model="formModel.select" :options="selectOptions" />
    </d-form-item>
    <d-form-item field="radio" label="Radio">
      <d-radio-group direction="row" v-model="formModel.radio">
        <d-radio value="0">Manual execution</d-radio>
        <d-radio value="1">Daily execution</d-radio>
        <d-radio value="2">Weekly execution</d-radio>
      </d-radio-group>
    </d-form-item>
    <d-form-item field="switch" label="Switch">
      <d-switch v-model="formModel.switch"></d-switch>
    </d-form-item>
    <d-form-item field="executionDay" label="Execution day">
      <d-checkbox-group v-model="formModel.executionDay" label="Execution day" direction="row">
        <d-checkbox label="Mon" value="Mon" />
        <d-checkbox label="Tue" value="Tue" />
        <d-checkbox label="Wed" value="Wed" />
        <d-checkbox label="Thur" value="Thur" />
        <d-checkbox label="Fri" value="Fri" />
        <d-checkbox label="Sat" value="Sat" />
        <d-checkbox label="Sun" value="Sun" />
      </d-checkbox-group>
    </d-form-item>
    <d-form-operation class="form-demo-form-operation">
      <d-button variant="solid">提交</d-button>
      <d-button>取消</d-button>
    </d-form-operation>
  </d-form>
</template>

<script>
import { defineComponent, reactive, ref, nextTick } from 'vue';

export default defineComponent({
  setup() {
    let formModel = reactive({
      name: '',
      description: '',
      select: 'Options2',
      radio: '0',
      switch: true,
      executionDay: [],
    });
    const selectOptions = reactive(['Options1', 'Options2', 'Options3']);
    return {
      formModel,
      selectOptions,
    };
  },
});
</script>

<style>
.form-demo-form-operation > * {
  margin-right: 8px;
}
</style>
```

:::

### 表单样式

:::demo 水平排列模式下，`label-size`可以设置`label`的宽度，提供`sm`、`md`、`lg`三种大小，分别对应`80px`、`100px`、`150px`，默认为`md`；`label-align`可以设置`label`的对齐方式，可选值为`start`、`center`、`end`，默认为`start`。

```vue
<template>
  <div class="form-btn-groups">
    <div class="form-btn">
      大小：
      <d-radio-group direction="row" v-model="size">
        <d-radio v-for="item in sizeList" :key="item.label" :value="item.value">
          {{ item.label }}
        </d-radio>
      </d-radio-group>
    </div>
    <div class="form-btn">
      对齐方式：
      <d-radio-group direction="row" v-model="align">
        <d-radio v-for="item in alignList" :key="item.label" :value="item.value">
          {{ item.label }}
        </d-radio>
      </d-radio-group>
    </div>
  </div>
  <d-form :data="formModel" :label-size="size" :label-align="align">
    <d-form-item field="name" label="Name">
      <d-input v-model="formModel.name" />
    </d-form-item>
    <d-form-item field="description" label="Description">
      <d-textarea v-model="formModel.description" />
    </d-form-item>
    <d-form-item field="executionDay" label="Execution day">
      <d-checkbox-group v-model="formModel.executionDay" label="Execution day" direction="row">
        <d-checkbox label="Mon" value="Mon" />
        <d-checkbox label="Tue" value="Tue" />
        <d-checkbox label="Wed" value="Wed" />
        <d-checkbox label="Thur" value="Thur" />
        <d-checkbox label="Fri" value="Fri" />
        <d-checkbox label="Sat" value="Sat" />
        <d-checkbox label="Sun" value="Sun" />
      </d-checkbox-group>
    </d-form-item>
    <d-form-operation class="form-demo-form-operation">
      <d-button variant="solid">提交</d-button>
      <d-button>取消</d-button>
    </d-form-operation>
  </d-form>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const formModel = reactive({
      name: '',
      description: '',
      executionDay: [],
    });
    const size = ref('md');
    const align = ref('start');
    const sizeList = [
      {
        label: 'Small',
        value: 'sm',
      },
      {
        label: 'Middle',
        value: 'md',
      },
      {
        label: 'Large',
        value: 'lg',
      },
    ];
    const alignList = [
      {
        label: 'Start',
        value: 'start',
      },
      {
        label: 'Center',
        value: 'center',
      },
      {
        label: 'End',
        value: 'end',
      },
    ];

    return {
      formModel,
      size,
      sizeList,
      align,
      alignList,
    };
  },
});
</script>

<style>
.form-btn-groups {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
.form-btn {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 1rem;
}
</style>
```

:::

### 垂直排列

:::demo 设置`layout`参数为`vertical`可启用垂直布局，即`label`在输入控件的上方。

```vue
<template>
  <d-form layout="vertical" :data="formModel">
    <d-form-item field="name" label="Name">
      <d-input v-model="formModel.name" />
    </d-form-item>
    <d-form-item field="description" label="Description">
      <d-textarea v-model="formModel.description" />
    </d-form-item>
    <d-form-item field="select" label="Select">
      <d-select v-model="formModel.select" :options="selectOptions" />
    </d-form-item>
    <d-form-item field="radio" label="Radio">
      <d-radio-group direction="row" v-model="formModel.radio">
        <d-radio value="0">Manual execution</d-radio>
        <d-radio value="1">Daily execution</d-radio>
        <d-radio value="2">Weekly execution</d-radio>
      </d-radio-group>
    </d-form-item>
    <d-form-item field="switch" label="Switch">
      <d-switch v-model="formModel.switch"></d-switch>
    </d-form-item>
    <d-form-item field="executionDay" label="Execution day">
      <d-checkbox-group v-model="formModel.executionDay" label="Execution day" direction="row">
        <d-checkbox label="Mon" value="Mon" />
        <d-checkbox label="Tue" value="Tue" />
        <d-checkbox label="Wed" value="Wed" />
        <d-checkbox label="Thur" value="Thur" />
        <d-checkbox label="Fri" value="Fri" />
        <d-checkbox label="Sat" value="Sat" />
        <d-checkbox label="Sun" value="Sun" />
      </d-checkbox-group>
    </d-form-item>
    <d-form-operation class="form-demo-form-operation">
      <d-button variant="solid">提交</d-button>
      <d-button>取消</d-button>
    </d-form-operation>
  </d-form>
</template>

<script>
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
    let formModel = reactive({
      name: '',
      description: '',
      select: 'Options2',
      radio: '0',
      switch: true,
      executionDay: [],
    });
    const selectOptions = reactive(['Options1', 'Options2', 'Options3']);

    return {
      formModel,
      selectOptions,
    };
  },
});
</script>
```

:::

### 多列表单

:::demo 搭配`Grid`栅格布局方案，即可方便的实现多列表单布局效果。

```vue
<template>
  <d-form layout="vertical" :data="formModel">
    <d-row :gutter="16">
      <d-col :span="7">
        <d-form-item field="name" label="Name" help-tips="This is the plan name.">
          <d-input v-model="formModel.name" />
        </d-form-item>
      </d-col>
      <d-col :span="7">
        <d-form-item field="select" label="Select">
          <d-select v-model="formModel.select" :options="selectOptions" />
        </d-form-item>
      </d-col>
      <d-col :span="7">
        <d-form-item field="multiSelect" label="Multiple Select">
          <d-select v-model="formModel.multiSelect" :options="selectOptions" multiple />
        </d-form-item>
      </d-col>
    </d-row>
    <d-row :gutter="16">
      <d-col :span="7">
        <d-form-item field="executionDay" label="Execution day">
          <d-checkbox-group v-model="formModel.executionDay" label="Execution day">
            <d-checkbox label="Mon" value="Mon" />
            <d-checkbox label="Tue" value="Tue" />
            <d-checkbox label="Wed" value="Wed" />
            <d-checkbox label="Thur" value="Thur" />
            <d-checkbox label="Fri" value="Fri" />
            <d-checkbox label="Sat" value="Sat" />
            <d-checkbox label="Sun" value="Sun" />
          </d-checkbox-group>
        </d-form-item>
      </d-col>
      <d-col :span="7">
        <d-form-item field="radio" label="Radio">
          <d-radio-group direction="row" v-model="formModel.radio">
            <d-radio value="0">Manual execution</d-radio>
            <d-radio value="1">Daily execution</d-radio>
            <d-radio value="2">Weekly execution</d-radio>
          </d-radio-group>
        </d-form-item>
      </d-col>
      <d-col :span="7">
        <d-form-item field="switch" label="Switch">
          <d-switch v-model="formModel.switch"></d-switch>
        </d-form-item>
      </d-col>
    </d-row>
    <d-form-operation class="form-demo-form-operation">
      <d-button variant="solid">提交</d-button>
      <d-button>取消</d-button>
    </d-form-operation>
  </d-form>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const formModel = reactive({
      name: '',
      select: 'Options2',
      multiSelect: ref([]),
      executionDay: [],
      radio: '0',
      switch: true,
    });
    const selectOptions = reactive(['Options1', 'Options2', 'Options3']);

    return { formModel, selectOptions };
  },
});
</script>
```

:::

### 尺寸控制

:::demo 通过`size`属性可控制所有控件的尺寸。

```vue
<template>
  <div class="form-demo-set-form-size">
    尺寸：
    <d-radio-group direction="row" v-model="formSize">
      <d-radio :value="item.value" v-for="item in sizeTypeList" :key="item.value">
        {{ item.label }}
      </d-radio>
    </d-radio-group>
  </div>

  <d-form :data="formModel" :size="formSize">
    <d-form-item field="name" label="Name">
      <d-input v-model="formModel.name" placeholder="请输入" />
    </d-form-item>
    
    <d-form-item field="search" label="Search">
      <d-search v-model="formModel.search" placeholder="请输入"></d-search>
    </d-form-item>
    
    <d-form-item field="inputNumber" label="InputNumber">
      <d-input-number v-model="formModel.inputNumber" placeholder="请输入"></d-input-number>
    </d-form-item>

    <d-form-item field="description" label="Description">
      <d-textarea v-model="formModel.description" />
    </d-form-item>
    
    <d-form-item field="select" label="Select">
      <d-select v-model="formModel.select" :options="selectOptions" />
    </d-form-item>
    
    <d-form-item field="autoComplete" label="AutoComplete">
      <d-auto-complete :source="source" v-model="formModel.autoComplete"></d-auto-complete>
    </d-form-item>
    
    <d-form-item field="radio" label="Radio">
      <d-radio-group direction="row" v-model="formModel.radio">
        <d-radio value="0">Manual execution</d-radio>
        <d-radio value="1">Daily execution</d-radio>
        <d-radio value="2">Weekly execution</d-radio>
      </d-radio-group>
    </d-form-item>
    
    <d-form-item field="switch" label="Switch">
      <d-switch v-model="formModel.switch"></d-switch>
    </d-form-item>
    
    <d-form-item field="executionDay" label="Execution day">
      <d-checkbox-group v-model="formModel.executionDay" label="Execution day" direction="row">
        <d-checkbox label="Mon" value="Mon" />
        <d-checkbox label="Tue" value="Tue" />
        <d-checkbox label="Wed" value="Wed" />
        <d-checkbox label="Thur" value="Thur" />
        <d-checkbox label="Fri" value="Fri" />
        <d-checkbox label="Sat" value="Sat" />
        <d-checkbox label="Sun" value="Sun" />
      </d-checkbox-group>
    </d-form-item>
    
    <d-form-item field="datePickerPro" label="Date Picker Pro">
      <d-date-picker-pro v-model="formModel.datePickerPro"></d-date-picker-pro>
    </d-form-item>

    <d-form-item field="timeSelect" label="Time Select">
      <d-time-select v-model="formModel.timeSelect" />
    </d-form-item>

    <d-form-item field="timePicker" label="Time Picker">
      <d-time-picker v-model="formModel.timePicker" placeholder="请选择时间" />
    </d-form-item>

    <d-form-operation class="form-demo-form-operation">
      <d-button variant="solid">提交</d-button>
      <d-button>取消</d-button>
    </d-form-operation>
  </d-form>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const sizeTypeList = [
      {
        label: 'Small',
        value: 'sm',
      },
      {
        label: 'Middle',
        value: 'md',
      },
      {
        label: 'Large',
        value: 'lg',
      },
    ];
    const formSize = ref('md');

    let formModel = reactive({
      name: '',
      search: '',
      inputNumber: 1,
      description: '',
      select: '',
      autoComplete: '',
      radio: '0',
      switch: true,
      executionDay: [],
      datePickerPro: '',
      timeSelect: '',
      timePicker: ''
    });
    
    const selectOptions = reactive(['Options1', 'Options2', 'Options3']);
    const source = ref(['C#', 'C', 'C++']);

    return {
      sizeTypeList,
      formSize,
      formModel,
      source,
      selectOptions,
    };
  },
});
</script>

<style>
.form-demo-set-form-size {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.form-demo-form-operation > * {
  margin-right: 8px;
}
</style>
```

:::

### 表单校验

:::demo

```vue
<template>
  <d-form ref="formRef" layout="vertical" :data="formData" :rules="rules" :pop-position="['right']">
    <d-form-item
      field="username"
      :rules="[{ required: true, message: '用户名不能为空', trigger: 'blur' }]"
      :show-feedback="false"
      label="用户名"
    >
      <d-input v-model="formData.username" />
    </d-form-item>
    <d-form-item field="userInfo" label="用户信息">
      <d-textarea v-model="formData.userInfo"></d-textarea>
    </d-form-item>
    <d-form-item field="age" label="年龄">
      <d-input v-model="formData.age" />
    </d-form-item>
    <d-form-item field="select" label="Select">
      <d-select v-model="formData.select" :options="selectOptions" allow-clear />
    </d-form-item>
    <d-form-item field="autoComplete" label="AutoComplete">
      <d-auto-complete :source="source" v-model="formData.autoComplete"></d-auto-complete>
    </d-form-item>
    <d-form-item field="radio" label="Radio">
      <d-radio-group direction="row" v-model="formData.radio">
        <d-radio value="0">Manual execution</d-radio>
        <d-radio value="1">Daily execution</d-radio>
        <d-radio value="2">Weekly execution</d-radio>
      </d-radio-group>
    </d-form-item>
    <d-form-item field="executionDay" label="Execution day">
      <d-checkbox-group v-model="formData.executionDay" label="Execution day" direction="row">
        <d-checkbox label="Mon" value="Mon" />
        <d-checkbox label="Tue" value="Tue" />
        <d-checkbox label="Wed" value="Wed" />
        <d-checkbox label="Thur" value="Thur" />
        <d-checkbox label="Fri" value="Fri" />
        <d-checkbox label="Sat" value="Sat" />
        <d-checkbox label="Sun" value="Sun" />
      </d-checkbox-group>
    </d-form-item>
    <d-form-item field="datePickerPro" label="Date Picker Pro">
      <d-date-picker-pro v-model="formData.datePickerPro"></d-date-picker-pro>
    </d-form-item>
    <d-form-item field="rangeDatePickerPro" label="Range Date Picker Pro">
      <d-range-date-picker-pro v-model="formData.rangeDatePickerPro"></d-range-date-picker-pro>
    </d-form-item>
    <d-form-operation class="form-operation-wrap">
      <d-button variant="solid" @click="onClick">提交</d-button>
      <d-button @click="onClear">清除校验结果</d-button>
      <d-button @click="onReset">重置</d-button>
    </d-form-operation>
  </d-form>
</template>

<script>
import { defineComponent, reactive, ref, watch } from 'vue';

export default defineComponent({
  setup() {
    const formRef = ref(null);
    const formData = reactive({
      username: '',
      userInfo: '',
      age: '',
      select: 'Options2',
      autoComplete: '',
      executionDay: ['Tue'],
      radio: '',
      datePickerPro: '',
      rangeDatePickerPro: ['', ''],
    });
    const selectOptions = reactive(['Options1', 'Options2', 'Options3']);
    const source = ref(['C#', 'C', 'C++']);
    const checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (value < 18) {
          return callback(new Error('年龄不能小于18'));
        } else {
          callback();
        }
      }, 1000);
    };

    const checkRangeDatePickerPro = (rule, value, callback) => {
      if (!value || (!value[0] && !value[1])) {
        return callback(new Error('请选择日期范围'));
      } else if (!value[0]) {
        return callback(new Error('请选择开始日期'));
      } else if (!value[1]) {
        return callback(new Error('请选择结束日期'));
      } else {
        return callback();
      }
    };

    const rules = {
      username: [{ min: 3, max: 6, message: '用户名需不小于3个字符，不大于6个字符', trigger: 'change' }],
      userInfo: [{ required: true, message: '用户信息不能为空', trigger: 'blur' }],
      age: [{ validator: checkAge }],
      select: [{ required: true, message: '请选择', trigger: 'change' }],
      autoComplete: [{ required: true, message: '请选择', trigger: 'change' }],
      executionDay: [{ type: 'array', required: true, message: '请至少选择一个执行时间', trigger: 'change' }],
      radio: [{ required: true, message: '请选择', trigger: 'change' }],
      datePickerPro: [{ type: 'object', required: true, message: '请选择日期', trigger: 'change' }],
      rangeDatePickerPro: [
        { validator: checkRangeDatePickerPro },
        { type: 'array', required: true, message: '请选择日期范围', trigger: 'change' },
      ],
    };

    const onClick = () => {
      formRef.value.validate((isValid, invalidFields) => {
        console.log(isValid);
        console.log(invalidFields);
      });
    };

    const onClear = () => {
      formRef.value.clearValidate();
    };

    const onReset = () => {
      formRef.value.resetFields();
    };

    return { formRef, formData, selectOptions, source, rules, onClick, onClear, onReset };
  },
});
</script>

<style>
.form-operation-wrap > * {
  margin-right: 8px;
}
</style>
```

:::

### Form 参数

| 参数名                  | 类型                        | 默认值             | 说明                                                               | 跳转 demo             |
| :---------------------- | :-------------------------- | :----------------- | :----------------------------------------------------------------- | :-------------------- |
| data                    | `object`                    | {}                 | 必选，表单数据                                                     | [基础用法](#基础用法) |
| layout                  | [Layout](#layout)           | 'horizontal'       | 可选，设置表单的排列方式                                           | [垂直排列](#垂直排列) |
| label-size              | [LabelSize](#labelsize)     | 'md'               | 可选，设置 label 的宽度，默认为 100px，sm 对应 80px，lg 对应 150px | [表单样式](#表单样式) |
| label-align             | [LabelAlign](#labelalign)   | 'start'            | 可选，设置水平布局方式下，label 对齐方式                           | [表单样式](#表单样式) |
| rules                   | [FormRules](#formrules)     | --                 | 可选，设置表单的校验规则                                           | [表单校验](#表单校验) |
| message-type            | [MessageType](#messagetype) | 'popover'          | 可选，设置校验信息的提示方式                                       |                       |
| pop-position            | [PopPosition](#popposition) | ['right','bottom'] | 可选，消息显示为 popover 时，popover 弹出方向                      |                       |
| validate-on-rule-change | `boolean`                   | false              | 可选，是否在 rules 改变后立即触发一次验证                          |                       |
| show-feedback           | `boolean`                   | false              | 可选，是否展示校验结果反馈图标                                     |                       |
| disabled                | `boolean`                   | false              | 可选，是否禁用该表单内的所有组件。                                 |                       |
| size                    | [FormSize](#formsize)       | --                 | 可选，用于控制该表单内组件的尺寸                                   |                       |

### Form 事件

| 事件名   | 回调参数                                                             | 说明               |
| :------- | :------------------------------------------------------------------- | :----------------- |
| validate | `Function(field: string, isValid: boolean, message: string) => void` | 表单项被校验后触发 |

### Form 方法

| 方法名         | 类型                                                             | 说明                                                      | 跳转 Demo             |
| :------------- | :--------------------------------------------------------------- | :-------------------------------------------------------- | :-------------------- |
| validate       | `(callback?: FormValidateCallback) => Promise`                   | 表单校验函数                                              | [表单校验](#表单校验) |
| validateFields | `(fields: string[], callback?: FormValidateCallback) => Promise` | 校验指定字段                                              |                       |
| resetFields    | `(fields: string[]) => void`                                     | 重置表单项的值，并移除校验结果                            |                       |
| clearValidate  | `(fields: string[]) => void`                                     | 清除校验结果，参数为需要清除的表单项`field`，默认清除全部 |                       |

### Form 插槽

| 插槽名  | 说明             |
| :------ | :--------------- |
| default | 包裹整个表单内容 |

### FormItem 参数

| 参数名          | 类型                                            | 默认值 | 说明                                                                       | 跳转 demo             |
| :-------------- | :---------------------------------------------- | :----- | :------------------------------------------------------------------------- | :-------------------- |
| field           | `string`                                        | ''     | 可选，指定验证表单需验证的字段，验证表单时必选该属性                       | [基础用法](#基础用法) |
| required        | `boolean`                                       | false  | 可选，表单选项是否必填                                                     |                       |
| rules           | [FormRuleItem \| FormRuleItem[]](#formruleitem) | --     | 可选，表单项的校验规则                                                     | [表单校验](#表单校验) |
| message-type    | [MessageType](#messagetype)                     | --     | 可选，用法同父组件`message-type`参数，优先级高于父组件，默认继承父组件的值 |                       |
| pop-position    | [PopPosition](#popposition)                     | --     | 可选，用法同父组件`pop-position`参数，优先级高于父组件，默认继承父组件的值 |                       |
| show-feedback   | `boolean`                                       | --     | 可选，是否展示校验结果反馈图标，优先级高于父组件，默认继承父组件的值       |                       |
| help-tips       | `string`                                        | ''     | 可选，表单项帮助指引提示内容，空字符串表示不设置提示内容。                 | [基础用法](#基础用法) |
| extra-info      | `string`                                        | ''     | 可选，附件信息，一般用于补充表单选项的说明                                 | [基础用法](#基础用法) |
| feedback-status | [FeedbackStatus](#feedbackstatus)               | --     | 可选，手动指定当前 control 状态反馈                                        |                       |

### FormItem 方法

| 方法名        | 类型         | 说明                           |
| :------------ | :----------- | :----------------------------- |
| resetField    | `() => void` | 重置表单项的值，并移除校验结果 |
| clearValidate | `() => void` | 清除校验结果                   |

### FormItem 插槽

| 插槽名  | 说明                     |
| :------ | :----------------------- |
| default | 包裹单个表单项的输入控件 |

### Form 类型定义

#### Layout

```ts
type Layout = 'horizontal' | 'vertical';
```

#### LabelSize

```ts
type LabelSize = 'sm' | 'md' | 'lg';
```

#### LabelAlign

```ts
type LabelAlign = 'start' | 'center' | 'end';
```

#### FormRules

```ts
type FormRules = Partial<Record<string, Array<FormRuleItem>>>;
```

#### MessageType

```ts
type MessageType = 'popover' | 'text' | 'none';
```

#### PopPosition

```ts
type PopPosition =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'right-start'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end';
```

#### FormSize

```ts
type FormSize = 'sm' | 'md' | 'lg';
```

#### FormValidateCallback

`ValidateFieldsError`类型参考[async-validator](https://github.com/yiminghe/async-validator)。

```ts
type FormValidateCallback = (isValid: boolean, invalidFields?: ValidateFieldsError) => void;
```

### FormItem 类型定义

#### FormRuleItem

`RuleItem`类型参考[async-validator](https://github.com/yiminghe/async-validator)。

```ts
interface FormRuleItem extends RuleItem {
  trigger?: Array<string>;
}
```

#### FeedbackStatus

```ts
type FeedbackStatus = 'success' | 'error' | 'pending';
```
