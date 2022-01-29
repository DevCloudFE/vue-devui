# Form 表单

具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。

### 何时使用

需要进行数据收集、数据校验、数据提交功能时。



### 基础用法

基本用法当中，Label是在数据框的上面。


:::demo

```vue
<template>
  <d-form ref="dFormBasic" :formData="formModel" layout="vertical" @submit="onSubmitForm">
    <d-form-item prop="name">
      <d-form-label required hasHelp helpTips="可以输入中文名字或者英文名字">姓名</d-form-label>
      <d-form-control extraInfo="请输入您的名字">
        <d-input v-model="formModel.name" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="age">
      <d-form-label>年龄</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.age" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="city">
      <d-form-label>城市</d-form-label>
      <d-form-control>
        <d-select v-model="formModel.city" :options="selectOptions" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="loveFruits">
      <d-form-label>喜欢的水果</d-form-label>
      <d-form-control>
        <d-tag-input
          v-model:tags="formModel.loveFruits"
          v-model:suggestionList="formModel.suggestionList"
          display-property="name"
          placeholder="请输入喜欢的水果"
          no-data="暂无数据"
        ></d-tag-input>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="sex">
      <d-form-label>性别</d-form-label>
      <d-form-control>
        <d-radio v-model="formModel.sex" value="0">男</d-radio>
        <d-radio v-model="formModel.sex" value="1">女</d-radio>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="workOn">
      <d-form-label>下班了吗</d-form-label>
      <d-form-control>
        <d-switch v-model:checked="formModel.workOn"></d-switch>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="interestedDomain">
      <d-form-label>兴趣领域</d-form-label>
      <d-form-control>
        <d-checkbox-group v-model="formModel.interestedDomain" label="兴趣领域">
          <d-checkbox label="前端" value="frontend" />
          <d-checkbox label="后端" value="backend" />
          <d-checkbox label="移动端" value="mobileend" />
          <d-checkbox label="人工智能" value="ai" />
          <d-checkbox label="算法" value="algorithm" />
        </d-checkbox-group>
      </d-form-control>
    </d-form-item>
    <d-form-operation class="form-demo-form-operation">
      <d-button type="submit" class="form-demo-btn">提交</d-button>
      <d-button bsStyle="common" @click="resetForm">重置</d-button>
    </d-form-operation>
  </d-form>

</template>

<script>
import {defineComponent, reactive, ref, nextTick} from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const dFormBasic = ref(null);
    let formModel = reactive({
      name: 'AlanLee',
      age: '24',
      city: '深圳',
      loveFruits: [{name: '苹果'}],
      suggestionList: [{name: '苹果'}, {name: '西瓜'}, {name: '桃子'}],
      sex: '0',
      workOn: true,
      interestedDomain: ['frontend'],
    });
    const selectOptions = reactive([
      '北京', '上海', '广州', '深圳'
    ]);
    const resetForm = () => {
      console.log('formData reset before', dFormBasic.value.formData);
      dFormBasic.value.resetFormFields();
      console.log('formData reset after', dFormBasic.value.formData);
    }
    const onSubmitForm = () => {
      console.log('onSubmitForm formModel', formModel)
    }
    return {
      dFormBasic,
      formModel,
      selectOptions,
      resetForm,
      onSubmitForm
    }
  }
})
</script>


<style>
.form-demo-form-operation {
  display: flex;
  align-items: center;
}
.form-demo-btn {
  margin-right: 10px;
}

</style>

```

:::


### 横向排列

Label左右布局方式。


:::demo

```vue
<template>
  <d-form class="form-demo-horizontal" ref="dFormHorizontal" :formData="formModel" layout="horizontal" labelSize="lg" @submit="onSubmitForm">
    <d-form-item prop="name">
      <d-form-label required>姓名</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.name" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="age">
      <d-form-label>年龄</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.age" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="city">
      <d-form-label>城市</d-form-label>
      <d-form-control>
        <d-select v-model="formModel.city" :options="selectOptions" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="loveFruits">
      <d-form-label>喜欢的水果</d-form-label>
      <d-form-control>
        <d-tag-input
          v-model:tags="formModel.loveFruits"
          v-model:suggestionList="formModel.suggestionList"
          display-property="name"
          placeholder="请输入喜欢的水果"
          no-data="暂无数据"
        ></d-tag-input>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="sex">
      <d-form-label>性别</d-form-label>
      <d-form-control>
        <d-radio-group v-model="formModel.sex" direction="row">
          <d-radio value="0">男</d-radio>
          <d-radio value="1">女</d-radio>
        </d-radio-group>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="workOn">
      <d-form-label>下班了吗</d-form-label>
      <d-form-control>
        <d-switch v-model:checked="formModel.workOn"></d-switch>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="interestedDomain">
      <d-form-label>兴趣领域</d-form-label>
      <d-form-control>
        <d-checkbox-group v-model="formModel.interestedDomain" label="兴趣领域">
          <d-checkbox label="前端" value="frontend" />
          <d-checkbox label="后端" value="backend" />
          <d-checkbox label="移动端" value="mobileend" />
          <d-checkbox label="人工智能" value="ai" />
          <d-checkbox label="算法" value="algorithm" />
        </d-checkbox-group>
      </d-form-control>
    </d-form-item>
    <d-form-operation class="form-demo-form-operation">
      <d-button type="submit" class="form-demo-form-demo-demo-btn">提交</d-button>
      <d-button bsStyle="common" @click="resetForm">重置</d-button>
    </d-form-operation>
  </d-form>

</template>

<script>
import {defineComponent, reactive, ref} from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const dFormHorizontal = ref(null);
    let formModel = reactive({
      name: 'AlanLee',
      age: '24',
      city: '深圳',
      loveFruits: [{name: '苹果'}],
      suggestionList: [{name: '苹果'}, {name: '西瓜'}, {name: '桃子'}],
      sex: '0',
      workOn: true,
      interestedDomain: ['frontend'],
    });
    const selectOptions = reactive([
      '北京', '上海', '广州', '深圳'
    ]);
    const resetForm = () => {
      console.log('dFormHorizontal', dFormHorizontal.value);
      dFormHorizontal.value.resetFormFields();
    }
    const onSubmitForm = () => {
      console.log('onSubmitForm formModel', formModel)
    }
    return {
      dFormHorizontal,
      formModel,
      selectOptions,
      resetForm,
      onSubmitForm
    }
  }
})
</script>


<style>
.form-demo-horizontal {
  width: 600px;
}
.form-demo-form-operation {
  display: flex;
  align-items: center;
}
.form-demo-form-demo-demo-btn {
  margin-right: 10px;
}
</style>

```

:::


### 弹框表单

> todo <br>
> 待替换为Modal组件

弹框表单，弹框建议是400px，550px，700px，900px，建议宽高比是16: 9、3: 2。


:::demo

```vue
<template>
  <d-button @click="openModal">打开弹窗</d-button>
  <div class="form-demo-modal" v-show="showModal" @click="closeModal">
    <div class="form-demo-modal-content">
      <d-form ref="dFormModal" :formData="formModel" layout="horizontal" labelSize="lg" @submit="onSubmitForm">
        <d-form-item prop="name">
          <d-form-label required>姓名</d-form-label>
          <d-form-control>
            <d-input v-model="formModel.name" />
          </d-form-control>
        </d-form-item>
        <d-form-item prop="age">
          <d-form-label>年龄</d-form-label>
          <d-form-control>
            <d-input v-model="formModel.age" />
          </d-form-control>
        </d-form-item>
        <d-form-item prop="city">
          <d-form-label>城市</d-form-label>
          <d-form-control>
            <d-select v-model="formModel.city" :options="selectOptions" />
          </d-form-control>
        </d-form-item>
        <d-form-item prop="loveFruits">
          <d-form-label>喜欢的水果</d-form-label>
          <d-form-control>
            <d-tag-input
              v-model:tags="formModel.loveFruits"
              v-model:suggestionList="formModel.suggestionList"
              display-property="name"
              placeholder="请输入喜欢的水果"
              no-data="暂无数据"
            ></d-tag-input>
          </d-form-control>
        </d-form-item>
        <d-form-item prop="sex">
          <d-form-label>性别</d-form-label>
          <d-form-control>
            <d-radio-group direction="row" v-model="formModel.sex">
              <d-radio value="0">男</d-radio>
              <d-radio value="1">女</d-radio>
            </d-radio-group>
          </d-form-control>
        </d-form-item>
        <d-form-item prop="workOn">
          <d-form-label>下班了吗</d-form-label>
          <d-form-control>
            <d-switch v-model:checked="formModel.workOn"></d-switch>
          </d-form-control>
        </d-form-item>
        <d-form-item prop="interestedDomain">
          <d-form-label>兴趣领域</d-form-label>
          <d-form-control>
            <d-checkbox-group v-model="formModel.interestedDomain" label="兴趣领域">
              <d-checkbox label="前端" value="frontend" />
              <d-checkbox label="后端" value="backend" />
              <d-checkbox label="移动端" value="mobileend" />
              <d-checkbox label="人工智能" value="ai" />
              <d-checkbox label="算法" value="algorithm" />
            </d-checkbox-group>
          </d-form-control>
        </d-form-item>
        <d-form-operation class="form-demo-form-operation">
          <d-button type="submit" class="form-demo-form-demo-demo-btn">提交</d-button>
          <d-button bsStyle="common" @click="resetForm">重置</d-button>
        </d-form-operation>
      </d-form>
    </div>
  </div>

</template>

<script>
import {defineComponent, reactive, ref} from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const dFormModal = ref(null);
    let formModel = reactive({
      name: 'AlanLee',
      age: '24',
      city: '深圳',
      loveFruits: [{name: '苹果'}],
      suggestionList: [{name: '苹果'}, {name: '西瓜'}, {name: '桃子'}],
      sex: '0',
      workOn: true,
      interestedDomain: ['frontend'],
    });
    const selectOptions = reactive([
      '北京', '上海', '广州', '深圳'
    ]);
    const resetForm = () => {
      console.log('dFormModal', dFormModal.value);
      dFormModal.value.resetFormFields();
    }
    const onSubmitForm = () => {
      console.log('onSubmitForm formModel', formModel)
    }
    const showModal = ref(false);
    const openModal = () => {
      showModal.value = true;
    }
    const closeModal = () => {
      showModal.value = false;
    }
    return {
      dFormModal,
      formModel,
      selectOptions,
      resetForm,
      onSubmitForm,
      showModal,
      openModal,
      closeModal
    }
  }
})
</script>


<style>
.form-demo-form-operation {
  display: flex;
  align-items: center;
}
.form-demo-form-demo-demo-btn {
  margin-right: 10px;
}

.form-demo-modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-demo-modal-content {
  background-color: #fff;
  width: 40vw;
  padding: 20px;
}
</style>

```

:::


### 多列表单

多列表单。layout的属性为`columns`，同时搭配columnsClass属性，值为"u-[row]-[col]"，例如`u-1-3`为1行3列。


:::demo

```vue
<template>
  <d-form class="form-demo-column" ref="dFormColumn" layout="columns" columnsClass="u-1-3" :formData="formModel" @submit="onSubmitForm">
    <d-form-item prop="name" v-for="(item) in 6" :key="item" class="column-item">
      <d-form-label required hasHelp>姓名</d-form-label>
      <d-form-control>
        <d-input />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="loveFruits" class="column-item">
      <d-form-label>喜欢的水果</d-form-label>
      <d-form-control>
        <d-tag-input
          v-model:tags="formModel.loveFruits"
          v-model:suggestionList="formModel.suggestionList"
          display-property="name"
          placeholder="请输入喜欢的水果"
          no-data="暂无数据"
        ></d-tag-input>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="sex" class="column-item">
      <d-form-label>性别</d-form-label>
      <d-form-control>
        <d-radio-group v-model="formModel.sex">
          <d-radio value="0">男</d-radio>
          <d-radio value="1">女</d-radio>
        </d-radio-group>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="goOffWork" class="column-item">
      <d-form-label>下班了吗</d-form-label>
      <d-form-control>
        <d-switch v-model:checked="formModel.workOn"></d-switch>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="interestedDomain" class="column-item">
      <d-form-label>兴趣领域</d-form-label>
      <d-form-control>
        <d-checkbox-group v-model="formModel.interestedDomain" label="兴趣领域">
              <d-checkbox label="前端" value="frontend" />
              <d-checkbox label="后端" value="backend" />
              <d-checkbox label="移动端" value="mobileend" />
              <d-checkbox label="人工智能" value="ai" />
              <d-checkbox label="算法" value="algorithm" />
        </d-checkbox-group>
      </d-form-control>
    </d-form-item>

    <d-form-operation class="form-demo-form-operation">
      <d-button type="submit" class="form-demo-form-demo-demo-btn">提交</d-button>
      <d-button bsStyle="common" @click="resetForm">重置</d-button>
    </d-form-operation>
  </d-form>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const dFormColumn = ref(null);
    let formModel = reactive({
      name: 'AlanLee',
      age: '24',
      city: '深圳',
      loveFruits: [{name: '苹果'}],
      suggestionList: [{name: '苹果'}, {name: '西瓜'}, {name: '桃子'}],
      sex: '0',
      workOn: true,
      interestedDomain: ['frontend'],
    });
    const selectOptions = reactive([
      '北京', '上海', '广州', '深圳'
    ]);
    const resetForm = () => {
      console.log('dFormColumn', dFormColumn.value);
      dFormColumn.value.resetFormFields();
    }
    const onSubmitForm = () => {
      console.log('onSubmitForm formModel', formModel)
    }
    return {
      dFormColumn,
      formModel,
      selectOptions,
      resetForm,
      onSubmitForm
    }
  }
})
</script>

<style>
.form-demo-column .devui-form-control {
  width: 200px;
}
.form-demo-form-operation {
  display: flex;
  align-items: center;
}
.form-demo-form-demo-demo-btn {
  margin-right: 10px;
}
</style>

```

:::


### 模板驱动表单验证

在`d-form`、`d-input`等表单类组件上使用`v-d-validate-rules`指令，配置校验规则。


#### 验证单个元素，使用内置校验器，配置error message

当前DevUI支持的内置校验器有：`required`、`minlength`、`maxlength`、`min`、`max`、`requiredTrue`、`email`、`pattern`、`whitespace`。

- 若需限制用户输入不能全为空格，可使用`whitespace`内置校验器

- 若需限制用户输入长度，将最大限制设置为实际校验值`+1`是一个好的办法。

- 除`pattern`外，其他内置校验器我们也提供了内置的错误提示信息，在你未自定义提示消息时，我们将使用默认的提示信息。

- message配置支持string与object两种形式（支持国际化词条配置，如`'zh-cn'`，默认将取`'default'`）。

:::demo

```vue
<template>
<div class="form-demo-built-in-validators">
<!---->
  <div class="title">字符长度</div>
  <d-input v-model="formModel.username" v-d-validate:formModel="{
    prop: 'username',
    rules: {
      maxlength: 3,
    }
  }" />


  <div class="title">最大值</div>
  <d-input v-model="formModel.maxVal" v-d-validate:formModel="{
    prop: 'maxVal',
    rules: {
      message: '不能大于120',
      max: 120,
    }
  }" />

  <div class="title">最小值</div>
  <d-input v-model="formModel.minVal" v-d-validate:formModel="{
    prop: 'minVal',
    rules: {
      min: 12,
    }
  }" />

  <div class="title">必填项</div>
  <d-input v-model="formModel.requiredVal" v-d-validate:formModel="{
    prop: 'requiredVal',
    rules: {
      required: true,
    }
  }" />

  <div class="title">必须为True</div>
  <d-checkbox label="上班" v-model="formModel.requiredTrueVal" v-d-validate:formModel="{
    prop: 'requiredTrueVal',
    rules: {
      requiredTrue: true,
    }
  }" />

  <div class="title">邮箱校验</div>
  <d-input v-model="formModel.emailVal" v-d-validate:formModel="{
    prop: 'emailVal',
    rules: {
      email: true,
    }
  }" />

  <div class="title">正则校验</div>
  <d-input v-model="formModel.regExpVal" v-d-validate:formModel="{
    prop: 'regExpVal',
    rules: {
      pattern: /^[a-z]+$/,
      message: '只能包含字母',
    }
  }" />


  <div class="title">空白符校验</div>
  <d-input v-model="formModel.whitespaceVal" v-d-validate:formModel="{
    prop: 'whitespaceVal',
    rules: {
      whitespace: true,
      message: '输入不能全为空格',
    }
  }" />

  <div class="title">多条件组合校验</div>
  <d-input v-model="formModel.multiVal" v-d-validate:formModel="{
    prop: 'multiVal',
    rules: {
      minlength: 6,
      maxlength: 12,
      message: '只能输入6-12个字符',
    }
  }" />

  <div class="title">多条件校验</div>
  <d-input v-model="formModel.multiArrVal" v-d-validate:formModel="{
    prop: 'multiArrVal',
    rules: [
      {
        min: 6,
        message: '输入不能小于6个字符',
      },
      {
        max: 12,
        message: '输入不能大于12个字符',
      }
    ]
  }" />
  <!---->

</div>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';


export default defineComponent({
  setup(props, ctx) {
    let formModel = reactive({
      username: 'AlanLee',
      maxVal: 1201,
      minVal: 123,
      requiredVal: '',
      requiredTrueVal: false,
      emailVal: '1445654576@qq.com',
      regExpVal: 'abc',
      whitespaceVal: ' ab c ',
      multiVal: 'abc',
      multiArrVal: 'abc',
    });

    return {
      formModel,
    }
  }
})
</script>


<style>
.form-demo-built-in-validators .title{
  margin-top: 20px;
  margin-bottom: 10px;
}

</style>

```

:::

#### 验证单个元素，自定义校验器

自定义校验器，可传入`validators`字段配置校验规则，你可以简单返回`true | false `来标识当前校验是否通过，来标识当前是否错误并返回错误消息，适用于动态错误提示。如果是异步校验器，可传入`asyncValidators`字段配置校验规则。

:::demo

```vue
<template>
<div class="form-demo-custom-validator">
<!---->
  <div class="title">计算：1 + 1 = ？</div>
  <d-input v-model="formModel.sum" v-d-validate:formModel="{
    prop: 'sum',
    validators: [
      {message: '不对喔！', validator: customValidator},
      {message: '答对啦！', validator: customValidator2}
    ]
  }" />
<!---->
  <div class="title">计算：1 + 2 = ？（async）</div>
  <d-input v-model="formModel.asyncSum" v-d-validate:formModel="{
    prop: 'asyncSum',
    asyncValidators: [
      {message: '不对喔！（async）', asyncValidator: customAsyncValidator},
      {message: '答对啦！（async）', asyncValidator: customAsyncValidator2}
    ]
  }" />
</div>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';

export default defineComponent({
  setup(props, ctx) {
    let formModel = reactive({
      sum: '',
      asyncSum: '',
    });

    const customValidator = (rule, value) => {
      return value == "2"; // value值等于2的时候，校验规则通过，不提示本规则中自定义的message（“不对喔！”）
    }
    const customValidator2 = (rule, value) => {
      return value != "2"; // value值不等于2的时候，校验规则通过，不提示本规则中自定义的message（“答对啦！”）
    }

    const customAsyncValidator =  (rule, value) => {
      return value == "3"; // value值等于3的时候，校验规则通过，不提示本规则中自定义的message（“不对喔！（async）”）
    }
    const customAsyncValidator2 =  (rule, value) => {
      return value != "3"; // value值不等于3的时候，校验规则通过，不提示本规则中自定义的message（“答对啦！（async）”）
    }
    return {
      formModel,
      customValidator,
      customValidator2,
      customAsyncValidator,
      customAsyncValidator2,
    }
  }
})
</script>


<style>
.form-demo-custom-validator .title{
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>

```

:::


#### 验证单个元素，配置错误更新策略errorStrategy、校验时机updateOn

- 设置`errorStrategy`属性初始化时是否进行校验
  - 默认配置为`dirty`，校验不通过进行错误提示
  - 若需要在初始化时将错误抛出，可配置为`pristine`

- 设置`updateOn`，指定校验的时机
  - 校验器`updateOn`基于你绑定的模型的`updateOn`设置， 你可以通过`options`来指定， 默认为`change`
  - 可选值还有`blur` 、`input`、`submit`
  - 设置为`submit`，则当元素所在表单进行提交时将触发校验

:::demo

```vue
<template>
<div class="form-demo-error-strategy">
  <div class="title">计算：1 + 1 = ？</div>
  <div class="desc">updateOn为change，当输入完成时，输入框的值发生改变。此时触发验证规则</div>
  <d-input v-model="formModel.sum" v-d-validate:formModel="{
    prop: 'sum',
    updateOn: 'change',
    validators: [
      {message: '不对喔！', validator: customValidator},
      {message: '答对啦！', validator: customValidator2}
    ]
  }" />

  <div class="title">计算：1 + 1 = ？</div>
  <div class="desc">updateOn为input，当输入完成时，输入框的值发生改变。此时触发验证规则</div>
  <d-input v-model="formModel.asyncSum" v-d-validate:formModel="{
    prop: 'asyncSum',
    updateOn: 'input',
    validators: [
      {message: '不对喔！', validator: customValidator},
      {message: '答对啦！', validator: customValidator2}
    ]
  }" />

  <div class="title">计算：1 + 1 = ？</div>
  <div class="desc">errorStrategy为pristine，初始化时触发验证规则</div>
  <d-input v-model="formModel.errorSum" v-d-validate:formModel="{
    prop: 'errorSum',
    errorStrategy: 'pristine',
    updateOn: 'input',
    validators: [
      {message: '不对喔！', validator: customValidator3},
    ]
  }" />

</div>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const dFormTemplateValidate3 = ref(null);
    let formModel = reactive({
      sum: '',
      asyncSum: '',
      errorSum: '3',
    });

    const customValidator = (rule, value) => {
      return value == "2"; // value值等于2的时候，校验规则通过，不提示本规则中自定义的message（“不对喔！”）
    }
    const customValidator2 = (rule, value) => {
      return value != "2"; // value值不等于2的时候，校验规则通过，不提示本规则中自定义的message（“答对啦！”）
    }

    const customAsyncValidator = (rule, value) => {
      return value == "3"; // value值等于3的时候，校验规则通过，不提示本规则中自定义的message（“不对喔！（async）”）
    }
    const customAsyncValidator2 = (rule, value) => {
      let reg = /^[\d]+(\s+[\d]+)*$/;
      return reg.test(value); 
    }

    const customValidator3 = (rule, value) => {
      return value == "2"; // value值等于2的时候，校验规则通过，不提示本规则中自定义的message
    }
    return {
      dFormTemplateValidate3,
      formModel,
      customValidator,
      customValidator2,
      customAsyncValidator,
      customAsyncValidator2,
      customValidator3,
    }
  }
})
</script>


<style>
.form-demo-error-strategy .title{
  margin-top: 20px;
  margin-bottom: 10px;
}
.form-demo-error-strategy .desc{
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
}
</style>

```

:::


#### 验证单个元素，自定义管理消息提示

配置`messageShowType`可选择消息自动提示的方式，默认为`popover`。

- 设置为`popover`错误信息将在元素聚焦时以`popover`形式呈现。

- 设置为`text`错误信息将自动以文本方式显示在元素下方(需要与表单控件容器配合使用)。

- 设置为`none`错误信息将不会自动呈现到视图， 可在模板中获取`message`或通过监听`messageChange`事件获取错误`message`， 或在模板中直接通过引用获取。

- 在 `options`中配置  `popPosition`可在消息提示方式为`popover`时，自定义`popover`内容弹出方向， 默认为`['right', 'bottom']`。更多取值参考popover组件。

:::demo

```vue
<template>
<div class="form-demo-custom-message">
  <div class="title">计算：1 + 1 = ？</div>
  <div class="desc">messageShowType为none，不显示提示文字</div>
  <d-input v-model="formModel.sum" v-d-validate:formModel="{
    prop: 'sum',
    messageShowType: 'none',
    messageChange: onMessageChange,
    updateOn: 'input',
    validators: [
      {message: '不对喔！', validator: customValidator}
    ]
  }" />

  <div class="title">计算：1 + 1 = ？</div>
  <div class="desc">messageShowType为text，显示提示文字</div>
  <div>
    <d-input v-model="formModel.sum2" v-d-validate:formModel="{
      prop: 'sum2',
      messageShowType: 'text',
      updateOn: 'input',
      validators: [
        {message: '不对喔！', validator: customValidator2}
      ]
    }" />
  </div>

  <div class="title">计算：1 + 2 = ？</div>
  <div class="desc">messageShowType为popover，使用popover进行提示</div>
  <d-input v-model="formModel.asyncSum" v-d-validate:formModel="{
    prop: 'asyncSum',
    messageShowType: 'popover',
    updateOn: 'input',
    popPosition: 'bottom',
    asyncValidators: [
      {message: '不对喔！（async）', asyncValidator: customAsyncValidator}
    ]
  }" />

</div>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const dFormTemplateValidate4 = ref(null);
    let formModel = reactive({
      sum: '',
      sum2: '',
      asyncSum: '',
    });

    const customValidator = (rule, value) => {
      return value == "2"; // value值等于2的时候，校验规则通过，不提示本规则中自定义的message（“不对喔！”）
    }

    const customValidator2 = (rule, value) => {
      return value == "2"; // value值等于2的时候，校验规则通过，不提示本规则中自定义的message（“不对喔！”）
    }

    const customAsyncValidator = (rule, value) => {
      return value == "3"; // value值等于3的时候，校验规则通过，不提示本规则中自定义的message（“不对喔！（async）”）
    }

    const onMessageChange = (msg, {errors, fields}) => {
      console.log('onMessageChange', msg, {errors, fields});
    }

    return {
      dFormTemplateValidate4,
      formModel,
      customValidator,
      customValidator2,
      customAsyncValidator,
      onMessageChange,
    }
  }
})
</script>

<style>
.form-demo-custom-message {
  padding-bottom: 40px;
  width: 60%;
}
.form-demo-custom-message .title{
  margin-top: 20px;
  margin-bottom: 10px;
}
.form-demo-custom-message .desc{
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
}
</style>

```

:::



#### 验证单个元素，自定义asyncDebounceTime


对于异步校验器，提供默认300ms debounce time。在options中设置`asyncDebounceTime`显示设置（单位ms）。


:::demo

```vue
<template>
<div class="form-demo-async-debounce-time">
  <div class="title">计算：1 + 2 = ？（async）</div>
  <div class="desc">asyncDebounceTime为500</div>
  <d-input v-model="formModel.asyncSum" v-d-validate:formModel="{
    prop: 'asyncSum',
    updateOn: 'input',
    asyncDebounceTime: 500,
    asyncValidators: [
      {message: '不对喔！（async）', asyncValidator: customAsyncValidator}
    ]
  }" />
</div>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const dFormTemplateValidate5 = ref(null);
    let formModel = reactive({
      asyncSum: '',
    });

    const customAsyncValidator = (rule, value) => {
      return value == "3"; // value值等于3的时候，校验规则通过，不提示本规则中自定义的message（“不对喔！（async）”）
    }
    return {
      dFormTemplateValidate5,
      formModel,
      customAsyncValidator,
    }
  }
})
</script>


<style>
.form-demo-async-debounce-time .title{
  margin-top: 20px;
  margin-bottom: 10px;
}
.form-demo-async-debounce-time .desc{
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
}
</style>

```

:::



#### Form验证与提交

点击提交按钮时进行验证，需指定name属性，并同时绑定d-form标签的submit事件才能生效。

:::demo

```vue
<template>
  <d-form name="userInfoForm" ref="dFormTemplateValidate6" :formData="formModel" labelSize="lg" @submit="onSubmit">
    <d-form-item prop="name">
      <d-form-label>姓名</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.name" v-d-validate:formModel="{
          prop: 'name',
          updateOn: 'input',
          rules: {minlength: 2, message: '不能小于2个字符'},
        }" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="age">
      <d-form-label>年龄</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.age" v-d-validate:formModel="{
          prop: 'age',
          updateOn: 'input',
          rules: {min: 1, message: '年龄需大于0'},
        }" />
      </d-form-control>
    </d-form-item>
    <d-form-operation class="form-demo-form-operation">
      <d-button type="submit" class="form-demo-form-demo-demo-btn">提交</d-button>
      <d-button bsStyle="common" @click="resetForm">重置</d-button>
    </d-form-operation>
  </d-form>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const dFormTemplateValidate6 = ref(null);
    let formModel = reactive({
      name: 'A',
      age: '0',
    });

    const resetForm = () => {
      dFormTemplateValidate6.value.resetFormFields();
    }

    const onSubmit = (e) => {
      console.log('@submit')
    }

    return {
      dFormTemplateValidate6,
      formModel,
      onSubmit,
      resetForm,
    }
  }
})
</script>


<style>
.form-demo-form-operation {
  display: flex;
  align-items: center;
}
.form-demo-form-demo-demo-btn {
  margin-right: 10px;
}
</style>

```

:::


#### Form验证与提交，用户注册场景

对于自动错误提示的方式，在form中， 建议在dForm层统一设置`messageShowType`，需同时设置ref属性才能生效。


:::demo

```vue
<template>
  <d-form class="form-demo-template-validate-7" name="userInfoForm2" ref="dFormTemplateValidate7" :formData="formModel" labelSize="lg" @submit="onSubmit" :rules="{
    message: '表单验证未通过'
  }" messageShowType="text">
    <d-form-item prop="name">
      <d-form-label>姓名</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.name" v-d-validate:formModel="{
          prop: 'name',
          updateOn: 'input',
          rules: {minlength: 2, message: '不能小于2个字符'}
        }" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="age">
      <d-form-label>年龄</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.age" v-d-validate:formModel="{
          prop: 'age',
          updateOn: 'input',
          rules: {min: 1, message: '年龄需大于0'},
        }" />
      </d-form-control>
    </d-form-item>
    <d-form-operation class="form-demo-form-operation">
      <d-button type="submit" class="form-demo-demo-btn">提交</d-button>
      <d-button bsStyle="common" @click="resetForm">重置</d-button>
    </d-form-operation>
  </d-form>
  <d-toast :value="validateFaliMsg" :life="2000"></d-toast>
</template>

<script>
import {defineComponent, reactive, ref, h} from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const dFormTemplateValidate7 = ref(null);
    const validateFaliMsg = ref([]);

    let formModel = reactive({
      name: 'A',
      age: '0',
    });

    const resetForm = () => {
      dFormTemplateValidate7.value.resetFormFields();
    }

    const onSubmit = (e, valid, res) => {
      console.log('@submit valid, res', valid, res);
        if(!valid) {
          validateFaliMsg.value = [
            {
              severity: 'error',
              summary: 'Error',
              content:
                'Check whether all validation items pass.',
            },
          ]
        }
    }

    return {
      dFormTemplateValidate7,
      formModel,
      onSubmit,
      resetForm,
      validateFaliMsg,
    }
  }
})
</script>


<style>
.form-demo-template-validate-7 {
  width: 400px;
}
.form-demo-form-operation {
  display: flex;
  align-items: center;
}
.form-demo-demo-btn {
  margin-right: 10px;
}
</style>

```

:::

### 响应式表单验证

在`d-form`标签中指定校验规则rules，同时在`d-form-item`中指定`prop`的值为校验字段名。


:::demo

```vue
<template>
  <d-form class="form-demo-reactive-validate" ref="dFormReactiveValidate" :form-data="validateFormModel" :rules="rules" @messageChange="onMessageChange" @submit="onSubmitForm">
    <d-form-item prop="name">
      <d-form-label required hasHelp helpTips="可以输入中文名字或者英文名字">姓名</d-form-label>
      <d-form-control extraInfo="请输入您的名字">
        <d-input v-model="validateFormModel.name" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="age">
      <d-form-label>年龄</d-form-label>
      <d-form-control>
        <d-input v-model="validateFormModel.age" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="city">
      <d-form-label>城市</d-form-label>
      <d-form-control>
        <d-select v-model="validateFormModel.city" :options="selectOptions" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="loveFruits">
      <d-form-label>喜欢的水果</d-form-label>
      <d-form-control>
        <d-tag-input
          v-model:tags="validateFormModel.loveFruits"
          v-model:suggestionList="validateFormModel.suggestionList"
          display-property="name"
          placeholder="请输入喜欢的水果"
          no-data="暂无数据"
        ></d-tag-input>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="sex">
      <d-form-label>性别</d-form-label>
      <d-form-control>
        <d-radio v-model="validateFormModel.sex" value="0">男</d-radio>
        <d-radio v-model="validateFormModel.sex" value="1">女</d-radio>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="workOn">
      <d-form-label>下班了吗</d-form-label>
      <d-form-control>
        <d-switch v-model:checked="validateFormModel.workOn"></d-switch>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="interestedDomain">
      <d-form-label>兴趣领域</d-form-label>
      <d-form-control>
        <d-checkbox-group v-model="validateFormModel.interestedDomain" label="兴趣领域">
          <d-checkbox label="前端" value="frontend" />
          <d-checkbox label="后端" value="backend" />
          <d-checkbox label="移动端" value="mobileend" />
          <d-checkbox label="人工智能" value="ai" />
          <d-checkbox label="算法" value="algorithm" />
        </d-checkbox-group>
      </d-form-control>
    </d-form-item>
    <d-form-operation class="form-demo-form-operation">
      <d-button type="submit" class="form-demo-btn">提交</d-button>
      <d-button bsStyle="common" @click="resetForm">重置</d-button>
    </d-form-operation>
  </d-form>

</template>

<script>
import {defineComponent, reactive, ref} from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const dFormReactiveValidate = ref(null);
    let validateFormModel = reactive({
      name: 'AlanLee',
      age: '24',
      city: '深圳',
      loveFruits: [{name: '苹果'}],
      suggestionList: [{name: '苹果'}, {name: '西瓜'}, {name: '桃子'}],
      sex: '0',
      workOn: true,
      interestedDomain: ['frontend'],
    });
    const selectOptions = reactive([
      '北京', '上海', '广州', '深圳'
    ]);
    const rules = reactive({
      name: [{ required: true, message: '不能为空', trigger: 'blur'}],
      age: [
        { 
          required: true, 
          message: '年龄不能小于0', 
          trigger: 'blur',
          validator: (rule, value) => value > 0
        },
        { 
          required: true, 
          message: '年龄不能大于120', 
          trigger: 'input',
          validator: (rule, value) => value < 120
        }
      ],
      loveFruits: [{
        message: '至少选择一种水果',
        trigger: 'change',
        validator: (rule, value) => value.length > 0,
      }],
      workOn: [{
        message: 'bug修完了吗？就下班了吗？你怎么敢的啊！',
        validator: (rule, value) => value === true,
        trigger: 'change',
      }],
      interestedDomain: [{
        message: '至少选择一个兴趣领域',
        trigger: 'change',
        validator: (rule, value) => value.length > 0,
      }],
    });

    const onMessageChange = (msgData) => {
      console.log('onMessageChange', msgData);
    }

    const resetForm = () => {
      dFormReactiveValidate.value.resetFormFields();
    }
    const onSubmitForm = () => {
      console.log('onSubmitForm formModel', validateFormModel)
    }

    return {
      dFormReactiveValidate,
      rules,
      validateFormModel,
      onMessageChange,
      selectOptions,
      resetForm,
      onSubmitForm,
    }
  }
})
</script>


<style>
.form-demo-reactive-validate {
  width: 600px;
}
.form-demo-form-operation {
  display: flex;
  align-items: center;
}
.form-demo-demo-btn {
  margin-right: 10px;
}
</style>

```

:::


### 指定表单Feedback状态

你可通过对d-form-control设置feedbackStatus手动指定反馈状态。当前已支持状态：`success`、`error`、`pending`。


:::demo

```vue
<template>
  <d-form class="form-demo-feedback" ref="dFormFeedback" :form-data="formModel">
    <d-form-item prop="name">
      <d-form-label :required="true" >姓名</d-form-label>
      <d-form-control feedbackStatus="pending">
        <d-input v-model="formModel.name" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="nickname">
      <d-form-label :required="true" >昵称</d-form-label>
      <d-form-control feedbackStatus="success">
        <d-input v-model="formModel.nickname" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="age">
      <d-form-label :required="true" >年龄</d-form-label>
      <d-form-control feedbackStatus="error">
        <d-input v-model="formModel.age" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="sex">
      <d-form-label :required="true">性别</d-form-label>
      <d-form-control feedbackStatus="error">
        <d-select v-model="formModel.sex" :options="sexSelectOptions" placeholder="Select your sex"></d-select>
      </d-form-control>
    </d-form-item>
  </d-form>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const dFormFeedback = ref(null);
    let formModel = reactive({
      name: 'AlanLee',
      nickname: 'AlanLee97',
      age: '24',
      sex: '男',
    });

    const sexSelectOptions = reactive([
      '男', '女'
    ])
    
    return {
      dFormFeedback,
      formModel,
      sexSelectOptions,
    }
  }
})
</script>


<style>
.form-demo-feedback {
  width: 400px;
}
.form-demo-form-operation {
  display: flex;
  align-items: center;
}
.form-demo-demo-btn {
  margin-right: 10px;
}
</style>

```

:::


可通过对具名插槽suffixTemplate在d-form-control中自定义反馈状态icon。


:::demo

```vue
<template>
  <d-form class="form-demo-feedback-2" ref="dFormFeedback2" :form-data="formModel">
    <d-form-item prop="address">
      <d-form-label :required="true" >地址</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.address" />
        <template v-slot:suffixTemplate>
          <d-icon name="right-o" color="rgb(61, 204, 166)" />
        </template>
      </d-form-control>
    </d-form-item>
  </d-form>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const dFormFeedback2 = ref(null);
    let formModel = reactive({
      address: '深圳南山区',
    });

    return {
      dFormFeedback2,
      formModel,
    }
  }
})
</script>

<style>
.form-demo-feedback-2 {
  width: 400px;
}
</style>
```

:::


### 表单协同验证

在一些场景下，你的多个表单组件互相依赖，需共同校验（如注册场景中的密码输入与确认密码），通过自定义校验器实现校验规则（将密码输入与确认密码的值进行比较）。


:::demo

```vue
<template>
  <d-form class="form-demo-together-validate" name="togetherValidateForm" ref="dFormTogetherValidate" :form-data="formModel" labelSize="lg" @submit="onSubmit">
    <d-form-item prop="username">
      <d-form-label :required="true" >用户名</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.username" v-d-validate-rules="formRules.userNameRule" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="password">
      <d-form-label :required="true" >密码</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.password" v-d-validate-rules="formRules.passwordRule" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="confirmPassword">
      <d-form-label :required="true" >确认密码</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.confirmPassword" v-d-validate-rules="formRules.confirmPasswordRule" />
      </d-form-control>
    </d-form-item>
    <d-form-operation class="form-demo-form-operation">
      <d-button type="submit" class="form-demo-demo-btn">提交</d-button>
      <d-button bsStyle="common" @click="resetForm">重置</d-button>
    </d-form-operation>
  </d-form>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const dFormTogetherValidate = ref(null);
    let formModel = reactive({
      username: '',
      password: '',
      confirmPassword: '',
    });

    const formRules = {
      userNameRule: {
        rules: {
          minlength: 6,
          message: '最小6个字符'
        }
      },
      passwordRule: {
        rules: {
          minlength: 6,
          message: '最小6个字符'
        }
      },
      confirmPasswordRule: {
        options: {
          updateOn: 'input',
        },
        rules: {
          minlength: 6,
          message: '最小6个字符',
          validators: [
            {
              message: '确认密码与密码不相符',
              validator: (rule, value) => {
                return value === formModel.password
              }
            }
          ]
        }
      }
    }

    const resetForm = () => {
      dFormTogetherValidate.value.resetFormFields();
    }

    const onSubmit = (e) => {
      console.log('@submit')
    }

    return {
      dFormTogetherValidate,
      formModel,
      formRules,
      resetForm,
      onSubmit,
    }
  }
})
</script>

<style>
.form-demo-together-validate {
  width: 400px;
}
.form-demo-form-operation {
  display: flex;
  align-items: center;
}
.form-demo-demo-btn {
  margin-right: 10px;
}
</style>

```

:::

### 跨组件验证

> todo




:::demo

```vue
<template>
  <d-form class="form-demo-validate-with-component" ref="dFormWithComponent" :form-data="formModel">
    <d-form-item prop="name">
      <d-form-label :required="true" >姓名</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.name" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="age">
      <d-form-label :required="true" >年龄</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.age" />
      </d-form-control>
    </d-form-item>
  </d-form>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const dFormWithComponent = ref(null);
    let formModel = reactive({
      name: 'AlanLee',
      age: '24',
    });

    return {
      dFormWithComponent,
      formModel,
    }
  }
})
</script>

<style>
.form-demo-validate-with-component {
  width: 400px;
}
.form-demo-form-operation {
  display: flex;
  align-items: center;
}
.form-demo-demo-btn {
  margin-right: 10px;
}
</style>

```
:::



### API

d-form参数

| 参数         | 类型                                  | 默认值       | 说明                                                         | 跳转demo                          |
| ------------ | ------------------------------------- | ------------ | ------------------------------------------------------------ | --------------------------------- |
| name         | string                                |              | 可选，设置表单name属性，进行表单提交验证时必选。             | [基础用法](#基础用法)             |
| formData     | object                                |              | 必选，表单数据                                               | [基础用法](#基础用法)             |
| layout       | 'horizontal' \|'vertical' \|'columns' | 'horizontal' | 可选，设置表单的排列方式                                     | [基础用法](#基础用法)             |
| labelSize    | 'sm' \|'lg'                           |              | 可选，设置 label 的占宽，未设置默认为 100px，sm对应 80px，lg对应 150px | [基础用法](#基础用法)             |
| labelAlign   | 'start' \|'center' \|'end'            | 'start'      | 可选，设置水平布局方式下，label 对齐方式                     | [基础用法](#基础用法)             |
| columnsClass | string                                |              | 可选，设置多列表单样式                                       | [多列表单](#多列表单)             |
| rules        | object                                |              | 可选，设置表单校验规则                                       | [响应式表单验证](#响应式表单验证) |



d-form事件

| 事件名 | 类型       | 说明               | 跳转demo                          |
| ------ | ---------- | ------------------ | --------------------------------- |
| submit | () => void | 可选，提交表单事件 | [Form验证与提交](#Form验证与提交) |



d-form-item参数

| 参数         | 类型    | 默认值  | 说明                                                 | 跳转demo                                      |
| ------------ | ------- | ------- | ---------------------------------------------------- | --------------------------------------------- |
| prop         | string  |         | 可选，指定验证表单需验证的字段，验证表单时必选该属性 | [基础用法](#基础用法)                         |
| dHasFeedback | boolean | 'false' | 可选，设置当前 formControl 是否显示反馈图标          | [指定表单Feedback状态](#指定表单Feedback状态) |



d-form-label参数

| 参数     | 类型    | 默认值  | 说明                                                         | 跳转demo              |
| -------- | ------- | ------- | ------------------------------------------------------------ | --------------------- |
| required | boolean | 'false' | 可选，表单选项是否必填                                       | [基础用法](#基础用法) |
| hasHelp  | boolean | 'false' | 可选，表单项是否需要帮助指引                                 | [基础用法](#基础用法) |
| helpTips | string  |         | 可选，表单项帮助指引提示内容，需配合 `hasHelp`使用，且`helpTips`的值不能为空字符串才会生效。 | [基础用法](#基础用法) |



d-form-control参数

| 参数           | 类型    | 默认值  | 说明                                                       | 跳转demo                                      |
| -------------- | ------- | ------- | ---------------------------------------------------------- | --------------------------------------------- |
| extraInfo      | string  |         | 可选，附件信息，一般用于补充表单选项的说明                 | [基础用法](#基础用法)                         |
| feedbackStatus | boolean | 'false' | 可选，手动指定当前 control 状态反馈                        | [基础用法](#基础用法)                         |
| suffixTemplate | string  |         | 可选，可传入图标模板作为输入框后缀（通过插槽传入icon组件） | [指定表单Feedback状态](#指定表单Feedback状态) |



### Directives

v-d-validate-rules

| 参数    | 类型   | 默认值 | 说明                                                         | 跳转demo                              |
| ------- | ------ | ------ | ------------------------------------------------------------ | ------------------------------------- |
| rules   | object |        | 必选，表单校验规则，更多规则参考[async-validator](https://www.npmjs.com/package/async-validator) | [模板驱动表单验证](#模板驱动表单验证) |
| options |        |        | 可选，配置选项                                               | [模板驱动表单验证](#模板驱动表单验证) |

> 该指令仅在`d-form`标签或`d-input`等表单类组件上使用有效。



- rules格式如下

```js
{[validatorKey]: validatorValue, message: 'some tip messages.'}
```

当前DevUI支持的内置校验器validatorKey有：`required`、`minlength`、`maxlength`、`min`、`max`、`requiredTrue`、`email`、`pattern`、`whitespace`。更多规则参考[async-validator](https://www.npmjs.com/package/async-validator)。



<br>

- options支持以下字段
  - errorStrategy，错误更新策略：`dirty`（默认）、`prestine`
  
  - updateOn，校验时机，可选值有：`change`（默认）、 `blur`、 `input`
  
  - popPosition，自定义`popover`内容弹出方向。 默认为`['right', 'bottom']`，更多取值参考popover组件。



### 接口 & 类型定义

IForm

```typescript
export interface IForm {
  formData: any
  labelData: IFormLabel
  formMitt: Emitter<any>
  rules: any
  columnsClass: string
  messageShowType: string
} 
```



IFormLabel

```typescript
export interface IFormLabel {
  layout: string
  labelSize: string
  labelAlign: string
}
```



IFormItem

```typescript
export interface IFormItem {
  dHasFeedback: boolean
  prop: string
  formItemMitt: Emitter<any>
  resetField(): void
}
```



IFormControl

```typescript
export interface IFormControl {
  feedbackStatus: string
  extraInfo: string
  formItemMitt: Emitter<any>
  resetField(): void
}
```

