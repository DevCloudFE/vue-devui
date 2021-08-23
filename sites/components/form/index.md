# Form 表单

表单用于收集数据

### 何时使用

需要进行数据收集、数据校验、数据提交功能时。

### 基础用法

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

```html
<section>
  <d-form :form-data="formModel" labelSize="lg" labelAlign="end" layout="vertical">
    <d-form-item>
      <d-form-label :required="true" >用户名</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.username" />
      </d-form-control>
    </d-form-item>
    <d-form-item>
      <d-form-label :required="true">密码</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.password" />
      </d-form-control>
    </d-form-item>
    <d-form-operation>
      <d-button @click="onConfirm">确定</d-button>
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
<d-form></d-form>
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
      username: 'AlanLee',
      password: ''
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
      
    }
  }
})
</script>