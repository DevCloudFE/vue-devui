# Form 表单

表单用于收集数据

### 何时使用

需要进行数据收集、数据校验、数据提交功能时。

### 基础用法

> done

基本用法当中，Label是在数据框的上面。

<section>
  <d-form ref="dForm1" :form-data="formModel" labelSize="lg" labelAlign="end" layout="vertical" style="margin-top: 20px" @submit="onConfirm">
    <d-form-item prop="name">
      <d-form-label :required="true" >Name</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.name" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="description">
      <d-form-label>Description</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.description" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="select">
      <d-form-label :required="true">Select</d-form-label>
      <d-form-control>
        <d-select v-model="formModel.select" :options="baseSelectOptions" placeholder="这是默认选择框"></d-select>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="multipleOptions">
      <d-form-label>Multiple options</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.multipleOptions" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="tags">
      <d-form-label>Tags</d-form-label>
      <d-form-control>
        <d-tag-input
          v-model:tags="formModel.tags"
          v-model:suggestionList="suggestionList"
          display-property="name"
          placeholder="请输入名字"
          no-data="暂无数据"
        ></d-tag-input>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="radio">
      <d-form-label>Radio</d-form-label>
      <d-form-control>
        <d-radio v-model="formModel.radio" value="0">
          男
        </d-radio>
        <d-radio v-model="formModel.radio" value="1">
          女
        </d-radio>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="switch">
      <d-form-label>Switch</d-form-label>
      <d-form-control>
        <d-switch v-model:checked="formModel.switch"></d-switch>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="executionDay">
      <d-form-label>Execution day</d-form-label>
      <d-form-control>
        <d-checkbox label="Checked" :isShowTitle="false" v-model:checked="formModel.executionDay"> </d-checkbox>
      </d-form-control>
    </d-form-item>
    <d-form-operation style="display: flex;">
      <d-button type="submit">确定</d-button>
      <d-button style="margin-left: 20px" @click="resetDForm1">重置</d-button>
    </d-form-operation>
  </d-form>
</section>

```html
<section>
  <d-form ref="dForm" :form-data="formModel" labelSize="lg" labelAlign="end" layout="vertical" style="margin-top: 20px" @submit="onConfirm">
    <d-form-item prop="name">
      <d-form-label :required="true" >Name</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.name" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="description">
      <d-form-label>Description</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.description" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="select">
      <d-form-label :required="true">Select</d-form-label>
      <d-form-control>
        <d-select v-model="formModel.select" :options="baseSelectOptions" placeholder="这是默认选择框"></d-select>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="multipleOptions">
      <d-form-label>Multiple options</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.multipleOptions" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="tags">
      <d-form-label>Tags</d-form-label>
      <d-form-control>
        <d-tag-input
          v-model:tags="formModel.tags"
          v-model:suggestionList="suggestionList"
          display-property="name"
          placeholder="请输入名字"
          no-data="暂无数据"
        ></d-tag-input>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="radio">
      <d-form-label>Radio</d-form-label>
      <d-form-control>
        <d-radio v-model="formModel.radio" value="0">
          男
        </d-radio>
        <d-radio v-model="formModel.radio" value="1">
          女
        </d-radio>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="switch">
      <d-form-label>Switch</d-form-label>
      <d-form-control>
        <d-switch v-model:checked="formModel.switch"></d-switch>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="executionDay">
      <d-form-label>Execution day</d-form-label>
      <d-form-control>
        <d-checkbox label="Checked" :isShowTitle="false" v-model:checked="formModel.executionDay"> </d-checkbox>
      </d-form-control>
    </d-form-item>
    <d-form-operation style="display: flex;">
      <d-button type="submit">确定</d-button>
      <d-button style="margin-left: 20px" @click="resetDForm">重置</d-button>
    </d-form-operation>
  </d-form>
</section>
```

```ts
<script lang="ts">
import { defineComponent, ref, reactive, toRef, toRefs, onMounted } from 'vue';
import DFormLabel from '../../../devui/form/src/form-label/form-label';
import DFormItem from '../../../devui/form/src/form-item/form-item';
import DFormControl from '../../../devui/form/src/form-control/form-control';
import DFormOperation from '../../../devui/form/src/form-operation/form-operation';

export default defineComponent({
  // name: 'DFormDemo',
  components: {DFormLabel, DFormItem, DFormControl, DFormOperation},
  props: {
  },
  setup(props, ctx) {


    let formModel = reactive({
      name: 'AlanLee',
      description: '',
      select: '',
      multipleOptions: '',
      tags: [{name: 'Option1'}],
      radio: 0,
      radio2: 1,
      switch: false,
      executionDay: true,
    });

    const dForm = ref(null);
    onMounted(() => {

    });

    const onInputChange = (e: any) => {

    }

    const onUpdateValue = (e: any) => {
      formModel.name = e;
    }

    const onConfirm = () => {
      console.log('form md onConfirm', formModel);
    }


    const resetDForm = () => {
      dForm1.value.resetFormFields();
    }

    const baseSelectOptions = reactive([
      'Option1','Option2','Option3'
    ])

    const suggestionList = reactive([
      {name: 'Option1'},
      {name: 'Option2'},
      {name: 'Option3'},
    ]);

    return {
      formModel,
      onInputChange,
      onConfirm,
      onUpdateValue,
      resetDForm,
      dForm,
      baseSelectOptions,
      suggestionList,
    }
  }
})
</script>
```

### 横向排列

> done

Label左右布局方式。

<section>
<d-form ref="dForm2" :form-data="formModel2" labelSize="lg" labelAlign="start" layout="horizontal" style="margin-top: 20px">
  <d-form-item>
    <d-form-label :required="true" hasHelp helpTips="?">用户名</d-form-label>
    <d-form-control extraInfo="Enter a short name that meets reading habits, up to 30 characters, cannot be a system field, and cannot be the same as an existing field.">
      <d-input v-model:value="formModel2.username" />
    </d-form-control>
  </d-form-item>
  <d-form-item>
    <d-form-label :required="true">密码</d-form-label>
    <d-form-control style="width: 100%;">
      <d-input v-model:value="formModel2.password" />
    </d-form-control>
  </d-form-item>
  <d-form-operation>
    <d-button @click="onConfirm2">确定</d-button>
  </d-form-operation>
</d-form>
</section>


```html
<section>
<d-form ref="dForm2" :form-data="formModel2" labelSize="lg" labelAlign="start" layout="horizontal" style="margin-top: 20px">
  <d-form-item>
    <d-form-label :required="true" hasHelp helpTips="?">用户名</d-form-label>
    <d-form-control>
      <d-input v-model:value="formModel2.username" />
    </d-form-control>
  </d-form-item>
  <d-form-item>
    <d-form-label :required="true">密码</d-form-label>
    <d-form-control>
      <d-input v-model:value="formModel2.password" />
    </d-form-control>
  </d-form-item>
  <d-form-operation>
    <d-button @click="onConfirm2">确定</d-button>
  </d-form-operation>
</d-form>
</section>
```

### 弹框表单

> todo

弹框表单，弹框建议是400px，550px，700px，900px，建议宽高比是16: 9、3: 2。

<section>
<d-form style="margin-top: 20px">

</d-form>
</section>


```html
<section>
<d-form></d-form>
</section>
```

### 多列表单

> todo

多列表单。

<section>
<d-form style="margin-top: 20px" layout="columns">
  <div class="grid">
    <div class="u-1-3" v-for="item in 10" :key="item">
      <d-form-item prop="name">
        <d-form-label :required="true" >Name</d-form-label>
        <d-form-control class="form-control-width">
          <d-input v-model:value="formModel.name" />
        </d-form-control>
      </d-form-item>
    </div>
  </div>
</d-form>
</section>


```html
<section>
<d-form style="margin-top: 20px" layout="columns">
  <div class="grid">
    <div class="u-1-3" v-for="item in 10" :key="item">
      <d-form-item prop="name">
        <d-form-label :required="true" >Name</d-form-label>
        <d-form-control class="form-control-width">
          <d-input v-model:value="formModel.name" />
        </d-form-control>
      </d-form-item>
    </div>
  </div>
</d-form>
</section>
```

### 模板驱动表单验证

> todo

模板中绑定ngModel、ngGroupModel、ngForm的元素，可使用dValidateRules配置校验规则。

<section>
<d-form style="margin-top: 20px">

</d-form>
</section>


```html
<section>
<d-form></d-form>
</section>
```

### 响应式表单验证

> done

模板中绑定formGroup、formControlName、formControl，使用dValidateRules配置校验规则。

<section>
<d-form :form-data="validateFormModel" style="margin-top: 20px" :rules="rules">
  <d-form-item prop="name">
    <d-form-label :required="true" >Name</d-form-label>
    <d-form-control>
      <d-input v-model:value="validateFormModel.name" />
    </d-form-control>
  </d-form-item>
  <d-form-item prop="nickname">
    <d-form-label :required="true" >Nickname</d-form-label>
    <d-form-control>
      <d-input v-model:value="validateFormModel.nickname" />
    </d-form-control>
  </d-form-item>
  <d-form-item prop="age">
    <d-form-label :required="true" >Age</d-form-label>
    <d-form-control>
      <d-input v-model:value="validateFormModel.age" />
    </d-form-control>
  </d-form-item>
</d-form>
</section>


```html
<section>
<d-form ref="dForm" :form-data="validateFormModel" style="margin-top: 20px" :rules="rules">
  <d-form-item prop="name">
    <d-form-label :required="true" >Name</d-form-label>
    <d-form-control>
      <d-input v-model:value="validateFormModel.name" />
    </d-form-control>
  </d-form-item>
  <d-form-item prop="nickname">
    <d-form-label :required="true" >Nickname</d-form-label>
    <d-form-control>
      <d-input v-model:value="validateFormModel.nickname" />
    </d-form-control>
  </d-form-item>
  <d-form-item prop="age">
    <d-form-label :required="true" >Age</d-form-label>
    <d-form-control>
      <d-input v-model:value="validateFormModel.age" />
    </d-form-control>
  </d-form-item>
</d-form>
</section>
```

```ts
<script lang="ts">
import { defineComponent, ref, reactive, toRef, toRefs, onMounted } from 'vue';
import DFormLabel from '../../../devui/form/src/form-label/form-label';
import DFormItem from '../../../devui/form/src/form-item/form-item';
import DFormControl from '../../../devui/form/src/form-control/form-control';
import DFormOperation from '../../../devui/form/src/form-operation/form-operation';

export default defineComponent({
  // name: 'DFormDemo',
  components: {DFormLabel, DFormItem, DFormControl, DFormOperation},
  props: {
  },
  setup(props, ctx) {
    const dForm = ref(null);

    let validateFormModel: IFormModel = reactive({
      name: 'AlanLee',
      nickname: 'AlanLee97',
      age: 24,
    });
    const rules = reactive({
      name: [{ required: true, message: '不能为空', trigger: 'blur'}],
      nickname: { required: true, message: '不能为空', trigger: 'blur'},
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
      dForm,
      rules,
      validateFormModel,
    }
  }
})
</script>
```

### 指定表单Feedback状态

> doing

你可通过对d-form-control设置feedbackStatus手动指定反馈状态。当前已支持状态：success、error、pending。

<section>
<d-form ref="dForm4" :form-data="formModel4" style="margin-top: 20px">
  <d-form-item prop="name">
    <d-form-label :required="true" >Name</d-form-label>
    <d-form-control feedbackStatus="pending">
      <d-input name="pendingInput" v-model:value="formModel4.name" />
    </d-form-control>
  </d-form-item>
  <d-form-item prop="nickname">
    <d-form-label :required="true" >Nickname</d-form-label>
    <d-form-control feedbackStatus="success">
      <d-input v-model:value="formModel4.nickname" />
    </d-form-control>
  </d-form-item>
  <d-form-item prop="age">
    <d-form-label :required="true" >Age</d-form-label>
    <d-form-control feedbackStatus="error">
      <d-input v-model:value="formModel4.age" />
    </d-form-control>
  </d-form-item>
  <d-form-item prop="sex">
    <d-form-label :required="true">Sex</d-form-label>
    <d-form-control feedbackStatus="error">
      <d-select v-model="formModel4.sex" :options="sexSelectOptions" placeholder="Select your sex"></d-select>
    </d-form-control>
  </d-form-item>
  <d-form-item prop="city">
    <d-form-label :required="true" >City</d-form-label>
    <d-form-control>
      <d-input v-model:value="formModel4.city" />
    </d-form-control>
  </d-form-item>
</d-form>
</section>


```html
<section>
<d-form></d-form>
</section>
```

### 表单协同验证

> todo

在一些场景下，你的多个表单组件互相依赖，需共同校验（如注册场景中的密码输入与确认密码），此时你需要用协同验证指令dValidateSyncKey来为需要系统校验的组件指定相同的keydValidateSyncKey指令支持模板驱动表单与响应式表单，以下示例以模板驱动表单为例：password与confirmPassword设置相同的dValidateSyncKey值，在其中一个组件值变更时，另一个组件也将进行校验。

<section>
<d-form style="margin-top: 20px">

</d-form>
</section>


```html
<section>
<d-form></d-form>
</section>
```

### 跨组件验证

> todo

当前Angular Form默认暂不支持跨组件共享表单校验状态，对于响应式表单，你可使用统一管理model，向下透传的方式进行组件组织。
针对模板驱动表单，你可使用在子组件声明时进行容器注入的方式，将你需要的ngModelGroup或NgForm容器进行注入，以供模板中表单元素自动获取父容器。

<section>
<d-form style="margin-top: 20px">

</d-form>
</section>


```html
<section>
<d-form></d-form>
</section>
```

<script lang="ts">
import { defineComponent, ref, reactive, toRef, toRefs, onMounted } from 'vue';
import DFormLabel from '../../../devui/form/src/form-label/form-label';
import DFormItem from '../../../devui/form/src/form-item/form-item';
import DFormControl from '../../../devui/form/src/form-control/form-control';
import DFormOperation from '../../../devui/form/src/form-operation/form-operation';

export default defineComponent({
  // name: 'DFormDemo',
  components: {DFormLabel, DFormItem, DFormControl, DFormOperation},
  props: {
  },
  setup(props, ctx) {
    const dForm1 = ref(null);
    const dForm2 = ref(null);
    const dForm4 = ref(null);

    let formModel = reactive({
      name: 'AlanLee',
      description: '',
      select: '',
      multipleOptions: '',
      tags: [{name: 'Option1'}],
      radio: 0,
      radio2: 1,
      switch: false,
      executionDay: true,
    });

    let formModel2 = reactive({
      username: 'haha2'
    });

    let validateFormModel = reactive({
      name: 'AlanLee',
      nickname: 'AlanLee97',
      age: 24,
    });

    let formModel4 = reactive({
      name: 'AlanLee',
      nickname: 'AlanLee97',
      age: 24,
      sex: '',
      city: '深圳',
    });


    onMounted(() => {

    });



    const onInputChange = (e: any) => {
      console.log('form onInputChange', e);
      
    }

    const onUpdateValue = (e: any) => {
      console.log('form onUpdateValue', e);
      // formModel.username = e;
      
    }

    const onConfirm = () => {
      console.log('form md onConfirm', formModel);
    }

    const onConfirm2 = () => {
      console.log('form md onConfirm2', toRefs(formModel2));
    }

    const resetDForm1 = () => {
      dForm1.value.resetFormFields();
    }

    const baseSelectOptions = reactive([
      'Option1','Option2','Option3'
    ])

    const sexSelectOptions = reactive([
      '男', '女'
    ])

    const suggestionList = reactive([
      {name: 'Option1'},
      {name: 'Option2'},
      {name: 'Option3'},
    ]);

    const rules = reactive({
      name: [{ required: true, message: '不能为空', trigger: 'blur'}],
      nickname: { required: true, message: '不能为空', trigger: 'blur'},
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

    })

    return {
      formModel,
      formModel2,
      formModel4,
      onInputChange,
      onConfirm,
      onConfirm2,
      onUpdateValue,
      resetDForm1,
      dForm1,
      dForm2,
      dForm4,
      baseSelectOptions,
      sexSelectOptions,
      suggestionList,
      rules,
      validateFormModel,
    }
  }
})
</script>

<style lang="scss">

.grid {
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  .u-1-3 {
    width: 33.3%
  }

  .form-control-width {
    width: 160px;
  }
}

</style>

