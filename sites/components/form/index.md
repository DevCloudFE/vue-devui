# Form 表单

表单用于收集数据

### 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

### 基础用法

<section>
  <d-form :form-data="formModel" labelSize="lg" labelAlign="end" layout="vertical" style="margin-top: 20px" @submit="onConfirm">
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
      <d-button>确定</d-button>
    </d-form-operation>
  </d-form>
</section>

<script lang="ts">
import { defineComponent, ref, reactive, toRef, toRefs } from 'vue';
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
      username: 'haha'
    });

    console.log('form formModel', formModel);

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
      console.log('form md onConfirm', toRefs(formModel));
    }

    return {
      formModel,
      onInputChange,
      onConfirm,
      onUpdateValue
    }

    // return () => {
    //   return <div>
    //     <Form value={{text: '66666666666'}}>
    //       {{
    //         header: () => <div>Form Header</div>,
    //         content: () => <div>
    //           <FormItem>
    //             <FormLabel requierd>用户名</FormLabel>
    //             <FromControl>
    //               <TextInput onUpdate:value={e => {
    //                   console.log('onUpdate', e);
    //                   formModel.username = e;
    //                 }} value={formModel.username} onChange={onInputChange} />
    //             </FromControl>
    //           </FormItem>
    //           <div>{formModel.username}</div>
    //         </div>,
    //         footer: () => <div>
    //           <FromOperation>
    //             <Button>确定</Button>
    //           </FromOperation>
    //         </div>,
    //       }}
    //     </Form>
    //   </div>
    // }
  }
})
</script>

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
<d-form :form-data="formModel" labelSize="lg" labelAlign="start" layout="horizontal">
  <d-form-item>
    <d-form-label :required="true" hasHelp helpTips="登录的帐号">用户名</d-form-label>
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


```html
<d-form></d-form>
```

