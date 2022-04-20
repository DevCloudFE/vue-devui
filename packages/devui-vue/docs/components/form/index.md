# Form 表单

具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。

#### 何时使用

需要进行数据收集、数据校验、数据提交功能时。

### 基础用法

:::demo 默认提供水平布局，`data`参数用于设置表单数据。

```vue
<template>
  <d-form :data="formModel">
    <d-form-item field="name">
      <d-form-label help-tips="This is the plan name.">Name</d-form-label>
      <d-form-control extra-info="Enter a short name that meets reading habits.">
        <d-input v-model="formModel.name" />
      </d-form-control>
    </d-form-item>
    <d-form-item field="description">
      <d-form-label>Description</d-form-label>
      <d-form-control>
        <d-textarea v-model:value="formModel.description" />
      </d-form-control>
    </d-form-item>
    <d-form-item field="select">
      <d-form-label>Select</d-form-label>
      <d-form-control>
        <d-select v-model="formModel.select" :options="selectOptions" />
      </d-form-control>
    </d-form-item>
    <d-form-item field="tags">
      <d-form-label>Tags</d-form-label>
      <d-form-control>
        <d-tag-input
          v-model:tags="formModel.tags"
          v-model:suggestionList="tagLists"
          display-property="name"
          placeholder="Tags"
          no-data="暂无数据"
        ></d-tag-input>
      </d-form-control>
    </d-form-item>
    <d-form-item field="radio">
      <d-form-label>Radio</d-form-label>
      <d-form-control>
        <d-radio-group direction="row" v-model="formModel.radio">
          <d-radio value="0">Manual execution</d-radio>
          <d-radio value="1">Daily execution</d-radio>
          <d-radio value="2">Weekly execution</d-radio>
        </d-radio-group>
      </d-form-control>
    </d-form-item>
    <d-form-item field="switch">
      <d-form-label>Switch</d-form-label>
      <d-form-control>
        <d-switch v-model:checked="formModel.switch"></d-switch>
      </d-form-control>
    </d-form-item>
    <d-form-item field="executionDay">
      <d-form-label>Execution day</d-form-label>
      <d-form-control>
        <d-checkbox-group v-model="formModel.executionDay" label="Execution day" direction="row">
          <d-checkbox label="Mon" value="Mon" />
          <d-checkbox label="Tue" value="Tue" />
          <d-checkbox label="Wed" value="Wed" />
          <d-checkbox label="Thur" value="Thur" />
          <d-checkbox label="Fri" value="Fri" />
          <d-checkbox label="Sat" value="Sat" />
          <d-checkbox label="Sun" value="Sun" />
        </d-checkbox-group>
      </d-form-control>
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
      tags: [{ name: 'Options1' }],
      radio: '0',
      switch: true,
      executionDay: [],
    });
    const selectOptions = reactive(['Options1', 'Options2', 'Options3']);
    const tagLists = [{ name: 'Options1' }, { name: 'Options2' }, { name: 'Options3' }];
    return {
      formModel,
      selectOptions,
      tagLists,
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
    <d-form-item field="name">
      <d-form-label>Name</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.name" />
      </d-form-control>
    </d-form-item>
    <d-form-item field="description">
      <d-form-label>Description</d-form-label>
      <d-form-control>
        <d-textarea v-model:value="formModel.description" />
      </d-form-control>
    </d-form-item>
    <d-form-item field="executionDay">
      <d-form-label>Execution day</d-form-label>
      <d-form-control>
        <d-checkbox-group v-model="formModel.executionDay" label="Execution day" direction="row">
          <d-checkbox label="Mon" value="Mon" />
          <d-checkbox label="Tue" value="Tue" />
          <d-checkbox label="Wed" value="Wed" />
          <d-checkbox label="Thur" value="Thur" />
          <d-checkbox label="Fri" value="Fri" />
          <d-checkbox label="Sat" value="Sat" />
          <d-checkbox label="Sun" value="Sun" />
        </d-checkbox-group>
      </d-form-control>
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
    let formModel = reactive({
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
    <d-form-item field="name">
      <d-form-label>Name</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.name" />
      </d-form-control>
    </d-form-item>
    <d-form-item field="description">
      <d-form-label>Description</d-form-label>
      <d-form-control>
        <d-textarea v-model:value="formModel.description" />
      </d-form-control>
    </d-form-item>
    <d-form-item field="select">
      <d-form-label>Select</d-form-label>
      <d-form-control>
        <d-select v-model="formModel.select" :options="selectOptions" />
      </d-form-control>
    </d-form-item>
    <d-form-item field="tags">
      <d-form-label>Tags</d-form-label>
      <d-form-control>
        <d-tag-input
          v-model:tags="formModel.tags"
          v-model:suggestionList="tagLists"
          display-property="name"
          placeholder="Tags"
          no-data="暂无数据"
        ></d-tag-input>
      </d-form-control>
    </d-form-item>
    <d-form-item field="radio">
      <d-form-label>Radio</d-form-label>
      <d-form-control>
        <d-radio-group direction="row" v-model="formModel.radio">
          <d-radio value="0">Manual execution</d-radio>
          <d-radio value="1">Daily execution</d-radio>
          <d-radio value="2">Weekly execution</d-radio>
        </d-radio-group>
      </d-form-control>
    </d-form-item>
    <d-form-item field="switch">
      <d-form-label>Switch</d-form-label>
      <d-form-control>
        <d-switch v-model:checked="formModel.switch"></d-switch>
      </d-form-control>
    </d-form-item>
    <d-form-item field="executionDay">
      <d-form-label>Execution day</d-form-label>
      <d-form-control>
        <d-checkbox-group v-model="formModel.executionDay" label="Execution day" direction="row">
          <d-checkbox label="Mon" value="Mon" />
          <d-checkbox label="Tue" value="Tue" />
          <d-checkbox label="Wed" value="Wed" />
          <d-checkbox label="Thur" value="Thur" />
          <d-checkbox label="Fri" value="Fri" />
          <d-checkbox label="Sat" value="Sat" />
          <d-checkbox label="Sun" value="Sun" />
        </d-checkbox-group>
      </d-form-control>
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
      tags: [{ name: 'Options1' }],
      radio: '0',
      switch: true,
      executionDay: [],
    });
    const selectOptions = reactive(['Options1', 'Options2', 'Options3']);
    const tagLists = [{ name: 'Options1' }, { name: 'Options2' }, { name: 'Options3' }];

    return {
      formModel,
      selectOptions,
      tagLists,
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
        <d-form-item field="name">
          <d-form-label help-tips="This is the plan name.">Name</d-form-label>
          <d-form-control>
            <d-input v-model="formModel.name" />
          </d-form-control>
        </d-form-item>
      </d-col>
      <d-col :span="7">
        <d-form-item field="select">
          <d-form-label>Select</d-form-label>
          <d-form-control>
            <d-select v-model="formModel.select" :options="selectOptions" />
          </d-form-control>
        </d-form-item>
      </d-col>
      <d-col :span="7">
        <d-form-item field="multiSelect">
          <d-form-label>Multiple Select</d-form-label>
          <d-form-control>
            <d-select v-model="formModel.multiSelect" :options="selectOptions" multiple />
          </d-form-control>
        </d-form-item>
      </d-col>
    </d-row>
    <d-row :gutter="16">
      <d-col :span="7">
        <d-form-item field="executionDay">
          <d-form-label>Execution day</d-form-label>
          <d-form-control>
            <d-checkbox-group v-model="formModel.executionDay" label="Execution day">
              <d-checkbox label="Mon" value="Mon" />
              <d-checkbox label="Tue" value="Tue" />
              <d-checkbox label="Wed" value="Wed" />
              <d-checkbox label="Thur" value="Thur" />
              <d-checkbox label="Fri" value="Fri" />
              <d-checkbox label="Sat" value="Sat" />
              <d-checkbox label="Sun" value="Sun" />
            </d-checkbox-group>
          </d-form-control>
        </d-form-item>
      </d-col>
      <d-col :span="7">
        <d-form-item field="radio">
          <d-form-label>Radio</d-form-label>
          <d-form-control>
            <d-radio-group direction="row" v-model="formModel.radio">
              <d-radio value="0">Manual execution</d-radio>
              <d-radio value="1">Daily execution</d-radio>
              <d-radio value="2">Weekly execution</d-radio>
            </d-radio-group>
          </d-form-control>
        </d-form-item>
      </d-col>
      <d-col :span="7">
        <d-form-item field="switch">
          <d-form-label>Switch</d-form-label>
          <d-form-control>
            <d-switch v-model:checked="formModel.switch"></d-switch>
          </d-form-control>
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

### 表单校验

:::demo

```vue
<template>
  <d-form ref="formRef" layout="vertical" :data="formData" :rules="rules">
    <d-form-item field="username" :rules="[{ required: true, message: '用户名不能为空', trigger: 'change' }]">
      <d-form-label>用户名</d-form-label>
      <d-form-control extra-info="some extra info">
        <d-input v-model="formData.username" />
      </d-form-control>
    </d-form-item>
    <d-form-item field="age">
      <d-form-label>年龄</d-form-label>
      <d-form-control>
        <d-input v-model="formData.age" />
      </d-form-control>
    </d-form-item>
    <d-form-operation>
      <d-button @click="onClick">提交</d-button>
    </d-form-operation>
  </d-form>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const formRef = ref(null);
    const formData = reactive({
      username: '',
      age: '',
    });
    const checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (value < 18>) {
          return callback(new Error('年龄不能小于18'));
        }
      }, 1000);
    };
    const rules = {
      username: [
        { min: 3, max: 6, message: '用户名需不小于3个字符，不大于6个字符', trigger: 'change' },
      ],
      age: [{ validator: checkAge }],
    };

    const onClick = () => {
      formRef.value.validate((isValid) => {
        console.log(isValid);
      });
    };

    return { formRef, formData, rules, onClick };
  },
});
</script>
```

:::

### Form 参数

| 参数名      | 类型                      | 默认值       | 说明                                                               | 跳转 demo             |
| :---------- | :------------------------ | :----------- | :----------------------------------------------------------------- | :-------------------- |
| data        | `object`                  | {}           | 必选，表单数据                                                     | [基础用法](#基础用法) |
| layout      | [Layout](#layout)         | 'horizontal' | 可选，设置表单的排列方式                                           | [垂直排列](#垂直排列) |
| label-size  | [LabelSize](#labelsize)   | 'md'         | 可选，设置 label 的宽度，默认为 100px，sm 对应 80px，lg 对应 150px | [表单样式](#表单样式) |
| label-align | [LabelAlign](#labelalign) | 'start'      | 可选，设置水平布局方式下，label 对齐方式                           | [表单样式](#表单样式) |
| rules       | [FormRules](#formrules)   | --           | 可选，设置表单的校验规则                                           | [表单校验](#表单校验) |

### Form 方法

| 方法名   | 类型                                           | 说明         | 跳转 Demo             |
| :------- | :--------------------------------------------- | :----------- | :-------------------- |
| validate | `(callback?: FormValidateCallback) => Promise` | 表单校验函数 | [表单校验](#表单校验) |

### Form 插槽

| 插槽名  | 说明             |
| :------ | :--------------- |
| default | 包裹整个表单内容 |

### FormItem 参数

| 参数名   | 类型                                            | 默认值 | 说明                                                 | 跳转 demo             |
| :------- | :---------------------------------------------- | :----- | :--------------------------------------------------- | :-------------------- |
| field    | `string`                                        | ''     | 可选，指定验证表单需验证的字段，验证表单时必选该属性 | [基础用法](#基础用法) |
| required | `boolean`                                       | false  | 可选，表单选项是否必填                               |                       |
| rules    | [FormRuleItem \| FormRuleItem[]](#formruleitem) | --     | 可选，表单项的校验规则                               | [表单校验](#表单校验) |

### FormItem 插槽

| 插槽名  | 说明           |
| :------ | :------------- |
| default | 包裹单个表单项 |

### FormLabel 参数

| 参数名    | 类型     | 默认值 | 说明                                                       | 跳转 demo             |
| :-------- | :------- | :----- | :--------------------------------------------------------- | :-------------------- |
| help-tips | `string` | ''     | 可选，表单项帮助指引提示内容，空字符串表示不设置提示内容。 | [基础用法](#基础用法) |

### FormLabel 插槽

| 插槽名  | 说明                     |
| :------ | :----------------------- |
| default | 包裹单个表单项的字段说明 |

### FormControl 参数

| 参数名          | 类型                              | 默认值 | 说明                                       | 跳转 demo             |
| :-------------- | :-------------------------------- | :----- | :----------------------------------------- | :-------------------- |
| extra-info      | `string`                          | ''     | 可选，附件信息，一般用于补充表单选项的说明 | [基础用法](#基础用法) |
| feedback-status | [FeedbackStatus](#feedbackstatus) | --     | 可选，手动指定当前 control 状态反馈        |                       |

### FormControl 插槽

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

### FormControl 类型定义

#### FeedbackStatus

```ts
type FeedbackStatus = 'success' | 'error' | 'pending';
```
