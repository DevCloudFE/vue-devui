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
      <d-form-label required hasHelp>Name</d-form-label>
      <d-form-control extraInfo="这行是说明文字，可以不用理，你尽管填你的姓名。">
        <d-input v-model:value="formModel.name" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="age">
      <d-form-label>Age</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.age" />
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
        <d-input v-model:value="formModel.name" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="age">
      <d-form-label>Age</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.age" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="city">
      <d-form-label>City</d-form-label>
      <d-form-control>
        <d-select v-model:value="formModel.city" :options="selectOptions" />
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

> todo

弹框表单，弹框建议是400px，550px，700px，900px，建议宽高比是16: 9、3: 2。


:::demo

```vue
<template>
  <d-form ref="dFormModal" :formData="formModel" layout="horizontal" labelSize="lg" @submit="onSubmitForm">
    <d-form-item prop="name">
      <d-form-label required>Name</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.name" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="age">
      <d-form-label>Age</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.age" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="city">
      <d-form-label>City</d-form-label>
      <d-form-control>
        <d-select v-model:value="formModel.city" :options="selectOptions" />
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
      dForm.value.resetFormFields();
    }
    const onSubmitForm = () => {
      console.log('onSubmitForm formModel', formModel)
    }
    return {
      dFormModal,
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


### 多列表单

> done

多列表单。


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

> todo

模板中绑定ngModel、ngGroupModel、ngForm的元素，可使用dValidateRules配置校验规则。


:::demo

```vue
<template>
  <d-form ref="dFormTemplateValidate" :formData="formModel" labelSize="lg">
    <d-form-item prop="name">
      <d-form-label required>Name</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.name" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="age">
      <d-form-label>Age</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.age" />
      </d-form-control>
    </d-form-item>
  </d-form>

</template>

<script>
import {defineComponent, reactive, ref} from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const dFormTemplateValidate = ref(null);
    let formModel = reactive({
      name: 'AlanLee',
      age: '24',
    });

    return {
      dFormTemplateValidate,
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


### 响应式表单验证

> done

模板中绑定formGroup、formControlName、formControl，使用dValidateRules配置校验规则。


:::demo

```vue
<template>
  <d-form ref="dFormReactiveValidate" :form-data="validateFormModel" :rules="rules">
    <d-form-item prop="name">
      <d-form-label :required="true" >Name</d-form-label>
      <d-form-control>
        <d-input v-model:value="validateFormModel.name" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="age">
      <d-form-label :required="true" >Age</d-form-label>
      <d-form-control>
        <d-input v-model:value="validateFormModel.age" />
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

你可通过对d-form-control设置feedbackStatus手动指定反馈状态。当前已支持状态：success、error、pending。


:::demo

```vue
<template>
  <d-form ref="dFormFeedback" :form-data="formModel">
    <d-form-item prop="name">
      <d-form-label :required="true" >Name</d-form-label>
      <d-form-control feedbackStatus="pending">
        <d-input v-model:value="formModel.name" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="nickname">
      <d-form-label :required="true" >Nickname</d-form-label>
      <d-form-control feedbackStatus="success">
        <d-input v-model:value="formModel.nickname" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="age">
      <d-form-label :required="true" >Age</d-form-label>
      <d-form-control feedbackStatus="error">
        <d-input v-model:value="formModel.age" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="sex">
      <d-form-label :required="true">Sex</d-form-label>
      <d-form-control feedbackStatus="error">
        <d-select v-model="formModel.sex" :options="sexSelectOptions" placeholder="Select your sex"></d-select>
      </d-form-control>
    </d-form-item>
    <d-form-item prop="city">
      <d-form-label :required="true" >City</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.city" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="address">
      <d-form-label :required="true" >Address</d-form-label>
      <d-form-control suffixTemplate="">
        <d-input v-model:value="formModel.address" />
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
    const dFormFeedback = ref(null);
    let formModel = reactive({
      name: 'AlanLee',
      nickname: 'AlanLee97',
      age: '24',
      sex: '男',
      city: '深圳',
      address: '深圳南山区',
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


### 表单协同验证

> todo

在一些场景下，你的多个表单组件互相依赖，需共同校验（如注册场景中的密码输入与确认密码），此时你需要用协同验证指令dValidateSyncKey来为需要系统校验的组件指定相同的keydValidateSyncKey指令支持模板驱动表单与响应式表单，以下示例以模板驱动表单为例：password与confirmPassword设置相同的dValidateSyncKey值，在其中一个组件值变更时，另一个组件也将进行校验。


:::demo

```vue
<template>
  <d-form ref="dFormTogetherValidate" :form-data="formModel">
    <d-form-item prop="name">
      <d-form-label :required="true" >Name</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.name" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="age">
      <d-form-label :required="true" >Age</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.age" />
      </d-form-control>
    </d-form-item>
  </d-form>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const dFormTogetherValidate = ref(null);
    let formModel = reactive({
      name: 'AlanLee',
      age: '24',
    });

    return {
      dFormTogetherValidate,
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

### 跨组件验证

> todo

当前Angular Form默认暂不支持跨组件共享表单校验状态，对于响应式表单，你可使用统一管理model，向下透传的方式进行组件组织。
针对模板驱动表单，你可使用在子组件声明时进行容器注入的方式，将你需要的ngModelGroup或NgForm容器进行注入，以供模板中表单元素自动获取父容器。


:::demo

```vue
<template>
  <d-form ref="dFormWithComponent" :form-data="formModel">
    <d-form-item prop="name">
      <d-form-label :required="true" >Name</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.name" />
      </d-form-control>
    </d-form-item>
    <d-form-item prop="age">
      <d-form-label :required="true" >Age</d-form-label>
      <d-form-control>
        <d-input v-model:value="formModel.age" />
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

| 参数       | 说明                                                         | 类型   | 可选值                              | 默认值       |
| ---------- | ------------------------------------------------------------ | ------ | ----------------------------------- | ------------ |
| layout     | 可选，设置表单的排列方式                                     | string | `horizontal`、`vertical`、`columns` | `horizontal` |
| labelSize  | 可选，设置 label 的占宽，未设置默认为 100px，'sm'对应 80px，'lg'对应 150px | string | `sm`、`lg`                          | --           |
| labelAlign | 可选，设置水平布局方式下，label 对齐方式                     | string | `start`、`center`、`end`            | `start`      |



### Form Methods

| 方法名 | 说明                                                | 参数 |
| ------ | --------------------------------------------------- | ---- |
| submit | 可选，使用 dFormSubmit 绑定元素触发提交时，响应事件 | --   |



### Form-Item Attributes

| 参数         | 说明                                        | 类型    | 可选值          | 默认值  |
| ------------ | ------------------------------------------- | ------- | --------------- | ------- |
| dHasFeedback | 可选，设置当前 formControl 是否显示反馈图标 | boolean | `true`、`false` | `false` |



### Form-Lable Attributes

| 参数     | 说明                                               | 类型    | 可选值          | 默认值  |
| -------- | -------------------------------------------------- | ------- | --------------- | ------- |
| required | 可选，表单选项是否必填                             | boolean | `true`、`false` | `false` |
| hasHelp  | 可选，表单项是否需要帮助指引                       | boolean | `true`、`false` | `false` |
| helpTips | 可选，表单项帮助指引提示内容，需配合 `hasHelp`使用 | string  |                 | --      |



### Form-Control Attributes

| 参数           | 说明                                                       | 类型    | 可选值          | 默认值  |
| -------------- | ---------------------------------------------------------- | ------- | --------------- | ------- |
| extraInfo      | 可选，附件信息，一般用于补充表单选项的说明                 | string  |                 | --      |
| feedbackStatus | 可选，手动指定当前 control 状态反馈                        | boolean | `true`、`false` | `false` |
| suffixTemplate | 可选，可传入图标模板作为输入框后缀（通过插槽传入icon组件） |         |                 | --      |



