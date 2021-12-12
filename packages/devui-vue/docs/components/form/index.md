# Form 表单

表单用于收集数据

### 何时使用

需要进行数据收集、数据校验、数据提交功能时。



### 基础用法

> done

基本用法当中，Label是在数据框的上面。


:::demo

```vue
<template>
  <d-form ref="dFormBasic" :formData="formModel" layout="vertical" @submit="onSubmitForm">
    <d-form-item prop="name">
      <d-form-label required hasHelp helpTips="名字可以随意填">Name</d-form-label>
      <d-form-control extraInfo="这行是说明文字，可以不用理，你尽管填你的姓名。">
        <d-input v-model="formModel.name" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="age">
      <d-form-label>Age</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.age" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="city">
      <d-form-label>City</d-form-label>
      <d-form-control>
        <d-select v-model="formModel.city" :options="selectOptions" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="loveFruits">
      <d-form-label>Love Fruits</d-form-label>
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
      <d-form-label>Sex</d-form-label>
      <d-form-control>
        <d-radio v-model="formModel.sex" value="0">男</d-radio>
        <d-radio v-model="formModel.sex" value="1">女</d-radio>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="goOffWork">
      <d-form-label>Go off work, I nerver to be a Juan King!</d-form-label>
      <d-form-control>
        <d-switch v-model:checked="formModel.goOffWork"></d-switch>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="ladySupport">
      <d-form-label>Which lady you would like to support?</d-form-label>
      <d-form-control>
        <d-checkbox-group v-model="formModel.ladySupport" label="1818黄金眼">
          <d-checkbox label="郑女士" value="ladyZheng" />
          <d-checkbox label="小毛" value="ladyMao" />
          <d-checkbox label="小刘" value="ladyLiu" />
          <d-checkbox label="小蒋" value="ladyJiang" />
          <d-checkbox label="小滕" value="ladyTeng" />
        </d-checkbox-group>
      </d-form-control>
    </d-form-item>
    <d-form-operation class="demo-form-operation">
      <d-button type="submit" class="demo-btn">提交</d-button>
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
      loveFruits: [{name: 'apple'}],
      suggestionList: [{name: 'apple'}, {name: 'watermalon'}, {name: 'peach'}],
      sex: '0',
      goOffWork: true,
      ladySupport: ['ladyZheng'],
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
.demo-form-operation {
  display: flex;
  align-items: center;
}
.demo-btn {
  margin-right: 10px;
}

</style>

```

:::


### 横向排列

> done

Label左右布局方式。


:::demo

```vue
<template>
  <d-form ref="dFormHorizontal" :formData="formModel" layout="horizontal" labelSize="lg" @submit="onSubmitForm">
    <d-form-item prop="name">
      <d-form-label required>Name</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.name" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="age">
      <d-form-label>Age</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.age" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="city">
      <d-form-label>City</d-form-label>
      <d-form-control>
        <d-select v-model="formModel.city" :options="selectOptions" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="loveFruits">
      <d-form-label>Love Fruits</d-form-label>
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
      <d-form-label>Sex</d-form-label>
      <d-form-control>
        <d-radio v-model="formModel.sex" value="0">男</d-radio>
        <d-radio v-model="formModel.sex" value="1">女</d-radio>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="goOffWork">
      <d-form-label>Go off work</d-form-label>
      <d-form-control>
        <d-switch v-model:checked="formModel.goOffWork"></d-switch>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="ladySupport">
      <d-form-label>Support lady</d-form-label>
      <d-form-control>
        <d-checkbox-group v-model="formModel.ladySupport" label="1818黄金眼">
          <d-checkbox label="郑女士" value="ladyZheng" />
          <d-checkbox label="小毛" value="ladyMao" />
          <d-checkbox label="小刘" value="ladyLiu" />
          <d-checkbox label="小蒋" value="ladyJiang" />
          <d-checkbox label="小滕" value="ladyTeng" />
        </d-checkbox-group>
      </d-form-control>
    </d-form-item>
    <d-form-operation class="demo-form-operation">
      <d-button type="submit" class="demo-btn">提交</d-button>
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
      city: '',
      loveFruits: [{name: 'apple'}],
      suggestionList: [{name: 'apple'}, {name: 'watermalon'}, {name: 'peach'}],
      sex: '0',
      goOffWork: true,
      ladySupport: ['ladyZheng'],
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
.demo-form-operation {
  display: flex;
  align-items: center;
}
.demo-btn {
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
  <d-button @click="openModal">Open Modal</d-button>
  <div class="my-modal" v-show="showModal" @click="closeModal">
    <d-form ref="dFormModal" :formData="formModel" layout="horizontal" labelSize="lg" @submit="onSubmitForm" class="my-form" @click.stop="() => {}">
      <d-form-item prop="name">
        <d-form-label required>Name</d-form-label>
        <d-form-control>
          <d-input v-model="formModel.name" />
        </d-form-control>
      </d-form-item>
      <d-form-item prop="age">
        <d-form-label>Age</d-form-label>
        <d-form-control>
          <d-input v-model="formModel.age" />
        </d-form-control>
      </d-form-item>
      <d-form-item prop="city">
        <d-form-label>City</d-form-label>
        <d-form-control>
          <d-select v-model="formModel.city" :options="selectOptions" />
        </d-form-control>
      </d-form-item>
      <d-form-item prop="loveFruits">
        <d-form-label>Love Fruits</d-form-label>
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
        <d-form-label>Sex</d-form-label>
        <d-form-control>
          <d-radio v-model="formModel.sex" value="0">男</d-radio>
          <d-radio v-model="formModel.sex" value="1">女</d-radio>
        </d-form-control>
      </d-form-item>
      <d-form-item prop="goOffWork">
        <d-form-label>Go off work</d-form-label>
        <d-form-control>
          <d-switch v-model:checked="formModel.goOffWork"></d-switch>
        </d-form-control>
      </d-form-item>
      <d-form-item prop="ladySupport">
        <d-form-label>Support lady</d-form-label>
        <d-form-control>
          <d-checkbox-group v-model="formModel.ladySupport" label="1818黄金眼">
            <d-checkbox label="郑女士" value="ladyZheng" />
            <d-checkbox label="小毛" value="ladyMao" />
            <d-checkbox label="小刘" value="ladyLiu" />
            <d-checkbox label="小蒋" value="ladyJiang" />
            <d-checkbox label="小滕" value="ladyTeng" />
          </d-checkbox-group>
        </d-form-control>
      </d-form-item>
      <d-form-operation class="demo-form-operation">
        <d-button type="submit" class="demo-btn">提交</d-button>
        <d-button bsStyle="common" @click="resetForm">重置</d-button>
      </d-form-operation>
    </d-form>
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
      city: '',
      loveFruits: [{name: 'apple'}],
      suggestionList: [{name: 'apple'}, {name: 'watermalon'}, {name: 'peach'}],
      sex: '0',
      goOffWork: true,
      ladySupport: ['ladyZheng'],
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
.demo-form-operation {
  display: flex;
  align-items: center;
}
.demo-btn {
  margin-right: 10px;
}

.my-modal {
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

.my-form {
  background-color: #fff;
  width: 60vw;
  padding: 20px;
}
</style>

```

:::


### 多列表单

> done

多列表单。layout的属性为`columns`，同时搭配columnsClass属性，值为"u-[row]-[col]"，例如`u-1-3`为1行3列。


:::demo

```vue
<template>
  <d-form ref="dFormColumn" layout="columns" columnsClass="u-1-3" :formData="formModel" @submit="onSubmitForm">
    <d-form-item prop="name" v-for="(item) in 6" :key="item" class="column-item">
      <d-form-label required hasHelp>Name</d-form-label>
      <d-form-control>
        <d-input />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="loveFruits" class="column-item">
      <d-form-label>Love Fruits</d-form-label>
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
      <d-form-label>Sex</d-form-label>
      <d-form-control>
        <d-radio v-model="formModel.sex" value="0">男</d-radio>
        <d-radio v-model="formModel.sex" value="1">女</d-radio>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="goOffWork" class="column-item">
      <d-form-label>Go off work</d-form-label>
      <d-form-control>
        <d-switch v-model:checked="formModel.goOffWork"></d-switch>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="ladySupport" class="column-item">
      <d-form-label>Support lady</d-form-label>
      <d-form-control>
        <d-checkbox-group v-model="formModel.ladySupport" label="1818黄金眼">
          <d-checkbox label="郑女士" value="ladyZheng" />
          <d-checkbox label="小毛" value="ladyMao" />
          <d-checkbox label="小刘" value="ladyLiu" />
          <d-checkbox label="小蒋" value="ladyJiang" />
          <d-checkbox label="小滕" value="ladyTeng" />
        </d-checkbox-group>
      </d-form-control>
    </d-form-item>

    <d-form-operation class="demo-form-operation">
      <d-button type="submit" class="demo-btn">提交</d-button>
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
      city: '',
      loveFruits: [{name: 'apple'}],
      suggestionList: [{name: 'apple'}, {name: 'watermalon'}, {name: 'peach'}],
      sex: '0',
      goOffWork: true,
      ladySupport: ['ladyZheng'],
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
.demo-form-operation {
  display: flex;
  align-items: center;
}
.demo-btn {
  margin-right: 10px;
}
</style>

```

:::



### 模板驱动表单验证

> doing

在`d-form`、`d-input`等表单类组件上使用`v-d-validate-rules`指令，配置校验规则。


#### 验证单个元素，使用内置校验器，配置error message

> done
>
> 待支持国际化词条配置

当前DevUI支持的内置校验器有：`required`、`minlength`、`maxlength`、`min`、`max`、`requiredTrue`、`email`、`pattern`、`whitespace`。<br>

- 若需限制用户输入不能全为空格，可使用`whitespace`内置校验器<br>
- 若需限制用户输入长度，将最大限制设置为实际校验值`+1`是一个好的办法。<br>
- 除`pattern`外，其他内置校验器我们也提供了内置的错误提示信息，在你未自定义提示消息时，我们将使用默认的提示信息。<br>
- message配置支持string与object两种形式（支持国际化词条配置，如`'zh-cn'`，默认将取`'default'`）。

:::demo

```vue
<template>
  <d-form ref="dFormTemplateValidate1" :formData="formModel" labelSize="lg" >
    <d-form-item prop="name">
      <d-form-label required>Name</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.name" v-d-validate-rules="[
          {
            maxlength: 8,
          },
          {
            pattern: /^[a-zA-Z\d]+(\s+[a-zA-Z\d]+)*$/, 
            message: {
              'zh-cn': '只能包含数字与大小写字符', 
              'en-us': 'The value cannot contain characters except uppercase and lowercase letters.', 
              default: '只能包含数字与大小写字符'
            }
          }
        ]" />
      </d-form-control>
    </d-form-item>
  </d-form>

</template>

<script>
import {defineComponent, reactive, ref} from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const dFormTemplateValidate1 = ref(null);
    let formModel = reactive({
      name: 'AlanLee',
    });

    return {
      dFormTemplateValidate1,
      formModel,
    }
  }
})
</script>


<style>
.demo-form-operation {
  display: flex;
  align-items: center;
}
.demo-btn {
  margin-right: 10px;
}
</style>

```

:::

#### 验证单个元素，自定义校验器

> done

自定义校验器，可传入`validators`字段配置校验规则，你可以简单返回`true | false `来标识当前校验是否通过，来标识当前是否错误并返回错误消息，适用于动态错误提示。如果是异步校验器，可传入`asyncValidators`字段配置校验规则。

:::demo

```vue
<template>
  <d-form ref="dFormTemplateValidate2" :formData="formModel" labelSize="lg" >
    <d-form-item prop="sum">
      <d-form-label>计算：1 + 1 = ？</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.sum" v-d-validate-rules="{
          validators: [
            {message: '不对喔！', validator: customValidator},
            {message: '答对啦！', validator: customValidator2}
          ]
        }" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="asyncSum">
      <d-form-label>计算：1 + 2 = ？（async）</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.asyncSum" v-d-validate-rules="{
          asyncValidators: [
            {message: '不对喔！（async）', asyncValidator: customAsyncValidator},
            {message: '答对啦！（async）', asyncValidator: customAsyncValidator2}
          ]
        }" />
      </d-form-control>
    </d-form-item>
  </d-form>

</template>

<script>
import {defineComponent, reactive, ref} from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const dFormTemplateValidate2 = ref(null);
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

    const customAsyncValidator = (rule, value) => {
      return value == "3"; // value值等于3的时候，校验规则通过，不提示本规则中自定义的message（“不对喔！（async）”）
    }
    const customAsyncValidator2 = (rule, value) => {
      return value != "3"; // value值不等于3的时候，校验规则通过，不提示本规则中自定义的message（“答对啦！（async）”）
    }
    return {
      dFormTemplateValidate2,
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
.demo-form-operation {
  display: flex;
  align-items: center;
}
.demo-btn {
  margin-right: 10px;
}
</style>

```

:::


#### 验证单个元素，配置错误更新策略errorStrategy、校验时机updateOn

> done

设置`errorStrategy`属性初始化时是否进行校验， 默认配置为`dirty`，校验不通过进行错误提示；若需要在初始化时将错误抛出，可配置为`pristine`。

设置`updateOn`，指定校验的时机。 校验器`updateOn`基于你绑定的模型的`updateOn`设置， 你可以通过`options`来指定， 默认为`change`，可选值还有`blur` 、`input`、`submit`、 设置为`submit`，则当元素所在表单进行提交时将触发校验。（待实现submit）

:::demo

```vue
<template>
  <d-form ref="dFormTemplateValidate3" :formData="formModel" labelSize="lg" >
    <d-form-item prop="sum">
      <d-form-label>计算：1 + 1 = ？</d-form-label>
      <d-form-control extraInfo="updateOn为change，当输入完成时，输入框的值发生改变。此时触发验证规则">
        <d-input v-model="formModel.sum" v-d-validate-rules="{
          rules: {
            validators: [
              {message: '不对喔！', validator: customValidator},
              {message: '答对啦！', validator: customValidator2}
            ]
          },
          options: {
            updateOn: 'change'
          }
        }" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="asyncSum">
      <d-form-label>计算：1 + 2 = ？（async）</d-form-label>
      <d-form-control extraInfo="updateOn为input，当正在输入时，输入框的值发生改变。此时触发验证规则">
        <d-input v-model="formModel.asyncSum" v-d-validate-rules="{
          rules: {
            asyncValidators: [
              {message: '不对喔！（async）', asyncValidator: customAsyncValidator},
              {message: '只能输入数字！', asyncValidator: customAsyncValidator2}
            ]
          },
          options: {
            updateOn: 'input'
          }
        }" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="errorSum">
      <d-form-label>计算：1 + 1 = ？</d-form-label>
      <d-form-control extraInfo="errorStrategy为pristine，初始化时触发验证规则">
        <d-input v-model="formModel.errorSum" v-d-validate-rules="{
          errorStrategy: 'pristine',
          rules: {
            validators: [
              {message: '不对喔！', validator: customValidator3},
            ]
          },
          options: {
            updateOn: 'input'
          }
        }" />
      </d-form-control>
    </d-form-item>
  </d-form>

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
.demo-form-operation {
  display: flex;
  align-items: center;
}
.demo-btn {
  margin-right: 10px;
}
</style>

```

:::


#### 验证单个元素，自定义管理消息提示

> done

配置`messageShowType`可选择消息自动提示的方式，默认为`popover`。

- 设置为`popover`错误信息将在元素聚焦时以`popover`形式呈现。
- 设置为`text`错误信息将自动以文本方式显示在元素下方(需要与表单控件容器配合使用)。 
- 设置为`none`错误信息将不会自动呈现到视图， 可在模板中获取`message`或通过监听`messageChange`事件获取错误`message`， 或在模板中直接通过引用获取。
- 在 `options`中配置  `popPosition`可在消息提示方式为`popover`时，自定义`popover`内容弹出方向， 默认为`['right', 'bottom']`。更多取值参考popover组件。

:::demo

```vue
<template>
  <d-form ref="dFormTemplateValidate4" :formData="formModel" labelSize="lg" >
    <d-form-item prop="sum">
      <d-form-label>计算：1 + 1 = ？</d-form-label>
      <d-form-control extraInfo="messageShowType为none，不显示提示文字">
        <d-input v-model="formModel.sum" v-d-validate-rules="{
          messageShowType: 'none',
          rules: {
            validators: [
              {message: '不对喔！', validator: customValidator}
            ]
          },
          options: {
            updateOn: 'change'
          }
        }" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="asyncSum">
      <d-form-label>计算：1 + 2 = ？</d-form-label>
      <d-form-control extraInfo="messageShowType为popover，使用popover进行提示">
        <d-input v-model="formModel.asyncSum" v-d-validate-rules="{
          rules: {
            asyncValidators: [
              {message: '不对喔！（async）', asyncValidator: customAsyncValidator}
            ]
          },
          options: {
            updateOn: 'input',
            messageShowType: 'popover',
            popPosition: 'bottom'
          }
        }" />
      </d-form-control>
    </d-form-item>
  </d-form>

</template>

<script>
import {defineComponent, reactive, ref} from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const dFormTemplateValidate4 = ref(null);
    let formModel = reactive({
      sum: '',
      asyncSum: '',
    });

    const customValidator = (rule, value) => {
      return value == "2"; // value值等于2的时候，校验规则通过，不提示本规则中自定义的message（“不对喔！”）
    }

    const customAsyncValidator = (rule, value) => {
      return value == "3"; // value值等于3的时候，校验规则通过，不提示本规则中自定义的message（“不对喔！（async）”）
    }

    return {
      dFormTemplateValidate4,
      formModel,
      customValidator,
      customAsyncValidator,
    }
  }
})
</script>


<style>
.demo-form-operation {
  display: flex;
  align-items: center;
}
.demo-btn {
  margin-right: 10px;
}
</style>

```

:::



#### 验证单个元素，自定义asyncDebounceTime

> done


对于异步校验器，提供默认300ms debounce time。在options中设置`asyncDebounceTime`显示设置（单位ms）。


:::demo

```vue
<template>
  <d-form ref="dFormTemplateValidate5" :formData="formModel" labelSize="lg" >
    <d-form-item prop="asyncSum">
      <d-form-label>计算：1 + 2 = ？（async）</d-form-label>
      <d-form-control extraInfo="asyncDebounceTime为500">
        <d-input v-model="formModel.asyncSum" v-d-validate-rules="{
          rules: {
            asyncValidators: [
              {message: '不对喔！（async）', asyncValidator: customAsyncValidator}
            ]
          },
          options: {
            updateOn: 'input',
            asyncDebounceTime: 500
          }
        }" />
      </d-form-control>
    </d-form-item>
  </d-form>
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
.demo-form-operation {
  display: flex;
  align-items: center;
}
.demo-btn {
  margin-right: 10px;
}
</style>

```

:::



#### Form验证与提交

> done

点击提交按钮时进行验证，需指定name属性，并同时绑定d-form标签的submit事件才能生效。

:::demo

```vue
<template>
  <d-form name="userInfoForm" ref="dFormTemplateValidate6" :formData="formModel" labelSize="lg" @submit="onSubmit">
    <d-form-item prop="name">
      <d-form-label>Name</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.name" v-d-validate-rules="{
          rules: {minlength: 2, message: '不能小于2个字符'},
          options: {
            updateOn: 'input',
          }
        }" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="age">
      <d-form-label>Age</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.age" v-d-validate-rules="{
          rules: {min: 1, message: '年龄需大于0'},
          options: {
            updateOn: 'input',
          }
        }" />
      </d-form-control>
    </d-form-item>
    <d-form-operation class="demo-form-operation">
      <d-button type="submit" class="demo-btn">提交</d-button>
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
      name: '',
      age: '',
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
.demo-form-operation {
  display: flex;
  align-items: center;
}
.demo-btn {
  margin-right: 10px;
}
</style>

```

:::


#### Form验证与提交，用户注册场景

> doing

对于自动错误提示的方式，在form中， 建议在dForm层统一设置`messageShowType`，需同时设置ref属性才能生效。


:::demo

```vue
<template>
  <d-form name="userInfoForm2" ref="dFormTemplateValidate7" :formData="formModel" labelSize="lg" @submit="onSubmit" v-d-validate-rules="{
          rules: {message: '表单验证未通过'},
        }" messageShowType="text">
    <d-form-item prop="name">
      <d-form-label>Name</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.name" v-d-validate-rules="{
          rules: {minlength: 2, message: '不能小于2个字符'},
          options: {
            updateOn: 'input',
          }
        }" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="age">
      <d-form-label>Age</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.age" v-d-validate-rules="{
          rules: {min: 1, message: '年龄需大于0'},
          options: {
            updateOn: 'input',
          }
        }" />
      </d-form-control>
    </d-form-item>
    <d-form-operation class="demo-form-operation">
      <d-button type="submit" class="demo-btn">提交</d-button>
      <d-button bsStyle="common" @click="resetForm">重置</d-button>
    </d-form-operation>
  </d-form>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const dFormTemplateValidate7 = ref(null);
    let formModel = reactive({
      name: '',
      age: '',
    });

    const resetForm = () => {
      dFormTemplateValidate7.value.resetFormFields();
    }

    const onSubmit = (e) => {
      console.log('@submit')
    }

    return {
      dFormTemplateValidate7,
      formModel,
      onSubmit,
      resetForm,
    }
  }
})
</script>


<style>
.demo-form-operation {
  display: flex;
  align-items: center;
}
.demo-btn {
  margin-right: 10px;
}
</style>

```

:::

### 响应式表单验证

> done

在`d-form`标签中指定校验规则rules，同时在`d-form-item`中指定`prop`的值为校验字段名。


:::demo

```vue
<template>
  <d-form ref="dFormReactiveValidate" :form-data="validateFormModel" :rules="rules">
    <d-form-item prop="name">
      <d-form-label :required="true" >Name</d-form-label>
      <d-form-control>
        <d-input v-model="validateFormModel.name" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="age">
      <d-form-label :required="true" >Age</d-form-label>
      <d-form-control>
        <d-input v-model="validateFormModel.age" />
      </d-form-control>
    </d-form-item>
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
    });
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
    });

    return {
      dFormReactiveValidate,
      rules,
      validateFormModel,
    }
  }
})
</script>


<style>
.demo-form-operation {
  display: flex;
  align-items: center;
}
.demo-btn {
  margin-right: 10px;
}
</style>

```

:::


### 指定表单Feedback状态

> done

你可通过对d-form-control设置feedbackStatus手动指定反馈状态。当前已支持状态：`success`、`error`、`pending`。


:::demo

```vue
<template>
  <d-form ref="dFormFeedback" :form-data="formModel">
    <d-form-item prop="name">
      <d-form-label :required="true" >Name</d-form-label>
      <d-form-control feedbackStatus="pending">
        <d-input v-model="formModel.name" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="nickname">
      <d-form-label :required="true" >Nickname</d-form-label>
      <d-form-control feedbackStatus="success">
        <d-input v-model="formModel.nickname" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="age">
      <d-form-label :required="true" >Age</d-form-label>
      <d-form-control feedbackStatus="error">
        <d-input v-model="formModel.age" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="sex">
      <d-form-label :required="true">Sex</d-form-label>
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
.demo-form-operation {
  display: flex;
  align-items: center;
}
.demo-btn {
  margin-right: 10px;
}
</style>

```

:::


可通过对具名插槽suffixTemplate在d-form-control中自定义反馈状态icon。


:::demo

```vue
<template>
  <d-form ref="dFormFeedback2" :form-data="formModel">
    <d-form-item prop="address">
      <d-form-label :required="true" >Address</d-form-label>
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

```

:::


### 表单协同验证

> done

在一些场景下，你的多个表单组件互相依赖，需共同校验（如注册场景中的密码输入与确认密码），通过自定义校验器实现校验规则（将密码输入与确认密码的值进行比较）。


:::demo

```vue
<template>
  <d-form name="togetherValidateForm" ref="dFormTogetherValidate" :form-data="formModel" labelSize="lg" @submit="onSubmit">
    <d-form-item prop="username">
      <d-form-label :required="true" >Username</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.username" v-d-validate-rules="formRules.userNameRule" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="password">
      <d-form-label :required="true" >Password</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.password" v-d-validate-rules="formRules.passwordRule" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="confirmPassword">
      <d-form-label :required="true" >Confirm Password</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.confirmPassword" v-d-validate-rules="formRules.confirmPasswordRule" />
      </d-form-control>
    </d-form-item>
    <d-form-operation class="demo-form-operation">
      <d-button type="submit" class="demo-btn">提交</d-button>
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
.demo-form-operation {
  display: flex;
  align-items: center;
}
.demo-btn {
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
  <d-form ref="dFormWithComponent" :form-data="formModel">
    <d-form-item prop="name">
      <d-form-label :required="true" >Name</d-form-label>
      <d-form-control>
        <d-input v-model="formModel.name" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="age">
      <d-form-label :required="true" >Age</d-form-label>
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
.demo-form-operation {
  display: flex;
  align-items: center;
}
.demo-btn {
  margin-right: 10px;
}
</style>

```
:::



### Form Attributes

| 参数         | 说明                                                         | 类型   | 可选值                              | 默认值       |
| ------------ | ------------------------------------------------------------ | ------ | ----------------------------------- | ------------ |
| name         | 可选，设置表单name属性，进行表单提交验证时必选。             | string |                                     |              |
| formData     | 必选，表单数据                                               | object |                                     |              |
| layout       | 可选，设置表单的排列方式                                     | string | `horizontal`、`vertical`、`columns` | `horizontal` |
| labelSize    | 可选，设置 label 的占宽，未设置默认为 100px，'sm'对应 80px，'lg'对应 150px | string | `sm`、`lg`                          | --           |
| labelAlign   | 可选，设置水平布局方式下，label 对齐方式                     | string | `start`、`center`、`end`            | `start`      |
| columnsClass | 可选，设置多列表单样式                                       | string |                                     |              |
| rules        | 可选，设置表单校验规则                                       | object |                                     |              |



### Form Methods

| 方法名 | 说明               | 参数 |
| ------ | ------------------ | ---- |
| submit | 可选，提交表单事件 | --   |



### Form-Item Attributes

| 参数         | 说明                                                 | 类型    | 可选值          | 默认值  |
| ------------ | ---------------------------------------------------- | ------- | --------------- | ------- |
| prop         | 可选，指定验证表单需验证的字段，验证表单时必选该属性 |         |                 |         |
| dHasFeedback | 可选，设置当前 formControl 是否显示反馈图标          | boolean | `true`、`false` | `false` |



### Form-Lable Attributes

| 参数     | 说明                                                         | 类型    | 可选值          | 默认值  |
| -------- | ------------------------------------------------------------ | ------- | --------------- | ------- |
| required | 可选，表单选项是否必填                                       | boolean | `true`、`false` | `false` |
| hasHelp  | 可选，表单项是否需要帮助指引                                 | boolean | `true`、`false` | `false` |
| helpTips | 可选，表单项帮助指引提示内容，需配合 `hasHelp`使用，且`helpTips`的值不能为空字符串才会生效。 | string  |                 | --      |



### Form-Control Attributes

| 参数           | 说明                                                       | 类型    | 可选值          | 默认值  |
| -------------- | ---------------------------------------------------------- | ------- | --------------- | ------- |
| extraInfo      | 可选，附件信息，一般用于补充表单选项的说明                 | string  |                 | --      |
| feedbackStatus | 可选，手动指定当前 control 状态反馈                        | boolean | `true`、`false` | `false` |
| suffixTemplate | 可选，可传入图标模板作为输入框后缀（通过插槽传入icon组件） |         |                 | --      |



### Directives

#### v-d-validate-rules

| 参数    | 说明               | 类型   | 可选值                                     | 默认值 |
| ------- | ------------------ | ------ | ------------------------------------------ | ------ |
| rules   | 必选，表单校验规则 | object |                                            | --     |
| options | 可选，配置选项     | object | `errorStrategy`、`updateOn`、`popPosition` |        |

> 该指令仅在`d-form`标签或`d-input`等表单类组件上使用有效。



- rules格式如下

```js
{[validatorKey]: validatorValue, message: 'some tip messages.'}
```

当前DevUI支持的内置校验器validatorKey有：`required`、`minlength`、`maxlength`、`min`、`max`、`requiredTrue`、`email`、`pattern`、`whitespace`。<br>



<br>

- options支持以下字段
  - errorStrategy，错误更新策略：`dirty`（默认）、`prestine`
  - updateOn，校验时机，可选值有：`change`（默认）、 `blur`、 `input`
  - popPosition，自定义`popover`内容弹出方向。 默认为`['right', 'bottom']`，更多取值参考popover组件。



