# Input 输入框

文本输入框。

#### 何时使用

需要手动输入文字使用。

### 基本用法

:::demo `v-model`对输入值做双向绑定，`placeholder`、`autofocus`等原生 input 支持的属性会被自动继承。

```vue
<template>
  <div class="devui-input-demo">
    <h4>Default</h4>

    <d-input v-model="value1" placeholder="请输入" autofocus></d-input>

    <h4>Disabled</h4>

    <d-input v-model="value2" placeholder="请输入" disabled></d-input>

    <h4>Error</h4>

    <d-input v-model="value3" placeholder="请输入" error></d-input>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      value1: ref(''),
      value2: ref(''),
      value3: ref(''),
    };
  },
});
</script>
```

:::

### 尺寸

:::demo 支持`sm`、`md`、`lg`三种尺寸，默认为`md`。

```vue
<template>
  <div>
    <h4>Small</h4>

    <d-input v-model="value1" size="sm" placeholder="请输入"></d-input>

    <h4>Middle</h4>

    <d-input v-model="value2" placeholder="请输入"></d-input>

    <h4>Large</h4>

    <d-input v-model="value3" size="lg" placeholder="请输入"></d-input>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      value1: ref(''),
      value2: ref(''),
      value3: ref(''),
    };
  },
});
</script>
```

:::

### 带图标的输入框

要在输入框中添加图标，你可以简单地使用 prefix 和 suffix 属性。 另外， 也可以使用 prefix 和 suffix 插槽。

:::demo

```vue
<template>
  <div>
    <d-row :gutter="10">
      <d-col :span="3">使用属性</d-col>
      <d-col :span="9">
        <d-input v-model="input1" placeholder="请输入" suffix="close" />
      </d-col>
      <d-col :span="9">
        <d-input v-model="input2" placeholder="请输入" prefix="search"/>
      </d-col :span="9">
    </d-row>
    <d-row style="margin-top: 20px" :gutter="10">
      <d-col :span="3">使用插槽</d-col>
      <d-col :span="9">
        <d-input v-model="input3" placeholder="请输入">
          <template #suffix>
            <d-icon name="close"></d-icon>
          </template>
        </d-input>
      </d-col>
      <d-col :span="9">
        <d-input v-model="input4" placeholder="请输入">
          <template #prefix>
            <d-icon name="search"></d-icon>
          </template>
        </d-input>
      </d-col>
    </d-row>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const input1 = ref('');
    const input2 = ref('');
    const input3 = ref('');
    const input4 = ref('');
    return {
      input1,
      input2,
      input3,
      input4,
    };
  },
});

</script>
```

:::

### 复合型输入框

可以在输入框前后添加一个元素，通常是标签或按钮。

:::demo

```vue
<template>
  <div>
    <d-input v-model="value1" placeholder="请输入">
      <template #prepend>https://</template>
    </d-input>

    <d-input class="devui-input-demo__mt" v-model="value2" placeholder="请输入">
      <template #prepend>
        <d-select v-model="value5" :options="options"></d-select>
      </template>
      <template #append>
        <d-icon name="search" />
      </template>
    </d-input>

    <d-input class="devui-input-demo__mt" v-model="value3" placeholder="请输入">
      <template #append>.com</template>
    </d-input>

    <d-input class="devui-input-demo__mt" v-model="value4" placeholder="请输入">
      <template #append>
        <d-button icon="search"></d-button>
      </template>
    </d-input>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  setup() {
    const items = ['http://', 'https://'];
    const options = reactive(items);
    return {
      value1: ref(''),
      value2: ref(''),
      value3: ref(''),
      value4: ref(''),
      value5: ref(''),
      options,
    };
  },
});
</script>
```

:::

### 输入框方法

:::demo

```vue
<template>
  <div class="devui-input-demo">
    <d-input ref="demoInput" v-model="value1" placeholder="请输入"></d-input>
    <d-button style="margin-top: 20px" @click="select" color="primary">选中input中的文字</d-button>
    <d-button style="margin-left: 10px" @click="focus" color="primary">使input获取焦点</d-button>
    <d-button style="margin-left: 10px" @click="blur" color="primary">使input失去焦点</d-button>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const demoInput = ref(null);
    const select = () => {
      demoInput.value.select();
    };
    const focus = () => {
      demoInput.value.focus();
    };
    const blur = () => {
      demoInput.value.blur();
    };
    return {
      demoInput,
      value1: ref('测试文本'),
      select,
      focus,
      blur,
    };
  },
});
</script>
```

:::

### Input 参数

| 参数名         | 类型                    | 默认值 | 说明                                             | 跳转 Demo                         |
| :------------- | :---------------------- | :----- | :----------------------------------------------- | :-------------------------------- |
| v-model        | `string`                | ''     | 绑定值                                           | [基本用法](#基本用法)             |
| disabled       | `boolean`               | false  | 可选，文本框是否被禁用                           | [基本用法](#基本用法)             |
| error          | `boolean`               | false  | 可选，文本框是否出现输入错误                     | [基本用法](#基本用法)             |
| size           | [InputSize](#inputsize) | 'md'   | 可选，文本框尺寸，有三种选择`'lg'`,`'md'`,`'sm'` | [尺寸](#尺寸)                     |
| validate-event | `boolean`               | true   | 可选，输入时是否触发表单的校验                   |                                   |
| prefix         | `string`                | -      | 可选，自定义前缀图标                             | [带图标的输入框](#带图标的输入框) |
| suffix         | `string`                | -      | 可选，自定义后缀图标                             | [带图标的输入框](#带图标的输入框) |

### Input 插槽

| 名称    | 说明           | 跳转 Demo                         |
| :------ | :------------- | :-------------------------------- |
| prefix  | 输入框头部内容 | [带图标的输入框](#带图标的输入框) |
| suffix  | 输入框尾部内容 | [带图标的输入框](#带图标的输入框) |
| prepend | 输入框前置内容 | [复合型输入框](#复合型输入框)     |
| append  | 输入框后置内容 | [复合型输入框](#复合型输入框)     |

### Input 事件

| 事件名  | 回调参数                     | 说明                           |
| :------ | :--------------------------- | :----------------------------- |
| focus   | `Function(e: FocusEvent)`    | 获取焦点时触发                 |
| blur    | `Function(e: FocusEvent)`    | 失去焦点时触发                 |
| input   | `Function(e: Event)`         | 输入值改变时触发               |
| change  | `Function(e: Event)`         | 输入框失去焦点或按下回车时触发 |
| keydown | `Function(e: KeyboardEvent)` | 按下按键时触发                 |

### Input 方法

| 方法   | 说明                | 参数 |
| :----- | :------------------ | ---- |
| focus  | 使 input 获取焦点   | -    |
| blur   | 使 input 失去焦点   | -    |
| select | 选中 input 中的文字 | -    |

### Input 类型定义

#### InputSize

```ts
type InputSize = 'sm' | 'md' | 'lg';
```

<style>
  .devui-input-demo__mt {
    margin-top: 20px
  }
</style>
