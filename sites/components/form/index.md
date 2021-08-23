# Form 表单

表单用于收集数据

### 何时使用

需要进行数据收集、数据校验、数据提交功能时。

### 基础用法

<section>
  <d-form ref="dForm1" :form-data="formModel" labelSize="lg" labelAlign="end" layout="vertical" style="margin-top: 20px" @submit="onConfirm">
    <d-form-item  cname="name" prop="name">
      <d-form-label :required="true" >Name</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.name" />
      </d-form-control>
    </d-form-item>
    <d-form-item cname="description" prop="description">
      <d-form-label>Description</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.description" />
      </d-form-control>
    </d-form-item>
    <d-form-item cname="select" prop="select">
      <d-form-label :required="true">Select</d-form-label>
      <d-form-control>
        <d-select v-model="formModel.select" :options="baseSelectOptions" placeholder="这是默认选择框"></d-select>
      </d-form-control>
    </d-form-item>
    <d-form-item cname="multipleOptions" prop="multipleOptions">
      <d-form-label>Multiple options</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.multipleOptions" />
      </d-form-control>
    </d-form-item>
    <d-form-item cname="tags" prop="tags">
      <d-form-label :required="true">Tags</d-form-label>
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
    <d-form-item cname="radio" prop="radio">
      <d-form-label>Radio</d-form-label>
      <d-form-control>
        <d-radio v-model="formModel.radio" :value="formModel.radio">
          男
        </d-radio>
        <d-radio v-model="formModel.radio" :value="formModel.radio">
          女
        </d-radio>
      </d-form-control>
    </d-form-item>
    <d-form-item cname="switch" prop="switch">
      <d-form-label>Switch</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.switch" />
      </d-form-control>
    </d-form-item>
    <d-form-item cname="executionDay" prop="executionDay">
      <d-form-label>Execution day</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.executionDay" />
      </d-form-control>
    </d-form-item>
    <d-form-operation style="display: flex;">
      <d-button @click="onConfirm">确定</d-button>
      <d-button @click="resetDFrom1" style="margin-left: 20px">重置</d-button>
    </d-form-operation>
  </d-form>
</section>

```html
<section>
  <d-form ref="dForm1" :form-data="formModel" labelSize="lg" labelAlign="end" layout="vertical" style="margin-top: 20px" @submit="onConfirm">
    <d-form-item  cname="username" prop="username">
      <d-form-label :required="true" >用户名</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.username" />
      </d-form-control>
    </d-form-item>
    <d-form-item dHasFeedback cname="password" prop="password">
      <d-form-label :required="true">密码</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.password" />
      </d-form-control>
    </d-form-item>
    <d-form-operation style="display: flex;">
      <d-button @click="onConfirm">确定</d-button>
      <d-button @click="resetDFrom1" style="margin-left: 20px">重置</d-button>
    </d-form-operation>
  </d-form>
</section>
```

### 横向排列

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
<d-form style="margin-top: 20px">

</d-form>
</section>


```html
<section>
<d-form></d-form>
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

> todo

模板中绑定formGroup、formControlName、formControl，使用dValidateRules配置校验规则。

<section>
<d-form style="margin-top: 20px">

</d-form>
</section>


```html
<section>
<d-form></d-form>
</section>
```

### 指定表单Feedback状态

> todo

你可通过对d-form-control设置feedbackStatus手动指定反馈状态。当前已支持状态：success、error、pending。

<section>
<d-form style="margin-top: 20px">

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


interface IFormModel {
  username: string,
  password: string,
}

export default defineComponent({
  // name: 'DFormDemo',
  components: {DFormLabel, DFormItem, DFormControl, DFormOperation},
  props: {
  },
  setup(props, ctx) {


    let formModel: IFormModel = reactive({
      name: 'AlanLee',
      description: '',
      select: '',
      multipleOptions: '',
      tags: [{name: 'Option1'}],
      radio: '',
      switch: '',
      executionDay: 'Option1',
    });

    let formModel2: IFormModel = reactive({
      username: 'haha2'
    });

    console.log('form formModel', formModel);

    const dForm1 = ref(null);
    const dForm2 = ref(null);


    onMounted(() => {
      console.log('dForm1', dForm1.value);
      console.log('dForm2', dForm2.value);

    });



    const onInputChange = (e: any) => {
      console.log('form onInputChange', e);
      // text.value = e;
      
    }

    const onUpdateValue = (e: any) => {
      console.log('form onUpdateValue', e);
      // formModel.username = e;
      
    }

    // const username = toRefs(formModel);

    const onConfirm = () => {
      console.log('form md onConfirm', formModel);
    }

    const onConfirm2 = () => {
      console.log('form md onConfirm2', toRefs(formModel2));
    }

    const resetDFrom1 = () => {
      dForm1.value.resetFormFields();
    }

    const baseSelectOptions = reactive([
      'Option1','Option2','Option3'
    ])

    const suggestionList = reactive([
      {name: 'Option1'},
      {name: 'Option2'},
      {name: 'Option3'},
    ])

    return {
      formModel,
      formModel2,
      onInputChange,
      onConfirm,
      onConfirm2,
      onUpdateValue,
      resetDFrom1,
      dForm1,
      dForm2,
      baseSelectOptions,
      suggestionList,
    }
  }
})
</script>