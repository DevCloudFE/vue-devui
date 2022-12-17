# EditableSelect 可输入下拉选择框

同时支持输入和下拉选择的输入框。

#### 何时使用

当需要同时支持用户输入数据和选择已有数据的时候使用，加入输入联想功能，方便用户搜索已有数据。

### 基本用法

v-model 的值为当前被选中的 value 属性值。
:::demo

```vue
<template>
  <d-editable-select v-model="value" :options="options" :width="450"></d-editable-select>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('');
    const options = reactive([
      {
        label: 'label0',
        value: 'label0',
      },
      {
        label: 'label1',
        value: 'label1',
      },
      {
        label: 'label2',
        value: 'label2',
      },
    ]);

    return {
      value,
      options,
    };
  },
});
</script>
```

:::

### 尺寸

支持 sm、md、lg 三种尺寸，默认为 md。
:::demo

```vue
<template>
  <h5>small</h5>

  <d-editable-select v-model="value" :options="options" :width="450" size="sm"></d-editable-select>

  <h4>middle</h4>

  <d-editable-select v-model="value" :options="options" :width="450"></d-editable-select>

  <h3>large</h3>

  <d-editable-select v-model="value" :options="options" :width="450" size="lg"></d-editable-select>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('');

    const options = reactive([
      {
        label: 'label0',
        value: 'label0',
      },
      {
        label: 'label1',
        value: 'label1',
      },
      {
        label: 'label2',
        value: 'label2',
      },
    ]);

    return {
      value,
      options,
    };
  },
});
</script>
```

:::

### 禁用选择器本身

禁用整个选择器组件

设置 disabled 属性，则整个选择器不可用。
:::demo

```vue
<template>
  <d-row type="flex">
    <d-col :flex="4">
      <d-editable-select v-model="value" :disabled="isDisabled" :width="450" :options="options"></d-editable-select>
    </d-col>
    <d-col :flex="2">
      <d-button id="primaryBtn" @click="toggle" style="margin-left:10px">
        {{ isDisabled ? 'Enable EditableSelect' : 'Disable EditableSelect' }}
      </d-button>
    </d-col>
  </d-row>
</template>
<script>
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('');

    const options = reactive([
      {
        label: 'label0',
        value: 'label0',
      },
      {
        label: 'label1',
        value: 'label1',
      },
      {
        label: 'label2',
        value: 'label2',
      },
    ]);

    const isDisabled = ref(false);

    const toggle = () => {
      isDisabled.value = !isDisabled.value;
    };
    return {
      value,
      options,
      isDisabled,
      toggle,
    };
  },
});
</script>
```

:::

### 有禁用选项

设置 disabled-key 值来自定义禁用选项的 Key 值。

:::demo

```vue
<template>
  <d-editable-select v-model="value" :width="450" :options="options" disabled-key="disabled"></d-editable-select>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('');

    const options = reactive([
      {
        label: 'label0',
        value: 'label0',
        disabled: true,
      },
      {
        label: 'label1',
        value: 'label1',
      },
      {
        label: 'label2',
        value: 'label2',
      },
    ]);

    return {
      value,
      options,
    };
  },
});
</script>
```

:::

### 可清空选项

可将选择器清空为初始状态

设置 allow-clear 属性，则可将选择器清空。
:::demo

```vue
<template>
  <d-editable-select v-model="value" :width="450" :options="options" allow-clear></d-editable-select>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('');

    const options = reactive([
      {
        label: 'label0',
        value: 'label0',
      },
      {
        label: 'label1',
        value: 'label1',
      },
      {
        label: 'label2',
        value: 'label2',
      },
    ]);

    return {
      value,
      options,
    };
  },
});
</script>
```

:::

### 自定义筛选方法

你可以自定义本地搜索的筛选方法，仅本地搜索有效。
:::demo

```vue
<template>
  <d-editable-select v-model="value" :width="450" :options="options" :filter-method="filterMethod"></d-editable-select>
</template>
<script>
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('');

    const filterMethod = (query) => {
      if (query) {
        options.value = options.value.filter((item) => {
          return item.label.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
      } else {
        options.value = [];
      }
    };

    let options = ref([
      {
        label: 'label0',
        value: 'label0',
      },
      {
        label: 'label1',
        value: 'label1',
      },
      {
        label: 'label2',
        value: 'label2',
      },
    ]);

    return {
      value,
      options,
      filterMethod,
    };
  },
});
</script>
```

:::

### 自定义模板展示

你可以自定义单个选项怎么被渲染,及没有匹配数据时的展示模板。

:::demo

```vue
<template>
  <d-editable-select v-model="value" :width="450" :options="options">
    <template #item="slotProps">
      <div>第{{ slotProps.index }}项: {{ slotProps.option.label }}</div>
    </template>
    <template>
      <div>没有匹配项</div>
    </template>
  </d-editable-select>
</template>
<script>
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('');
    const options = reactive([
      {
        label: 'label0',
        value: 'label0',
      },
      {
        label: 'label1',
        value: 'label1',
      },
      {
        label: 'label2',
        value: 'label2',
      },
    ]);

    return {
      value,
      options,
    };
  },
});
</script>
```

:::

### 远程搜索

通过输入关键字在服务器上来搜索数据

为了启用远程搜索，需要传入一个 `remote-method`。 `remote-method` 为一个 `Function`，它会在输入值发生变化时调用，参数为当前输入值。
:::demo

```vue
<template>
  <d-editable-select
    remote
    enable-lazy-load
    v-model="value"
    :max-height="300"
    :width="450"
    :options="options"
    :loading="loading"
    :remote-method="remoteMethod"
    @load-more="loadMore"
  >
  </d-editable-select>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('');
    const search = ref('');
    const options = ref([]);
    const loading = ref(false);
    let index = 0;

    let timer = null;
    const fetch = () => {
      loading.value = true;
      return new Promise((resolve) => {
        const data = [];
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        timer = setTimeout(() => {
          for (let i = 0; i < 15; i++) {
            data.push({
              label: `label${i + index}`,
              value: i + index,
            });
          }
          loading.value = false;
          resolve(data);
        }, 2000);
      });
    };

    const remoteMethod = async (query: string) => {
      search.value = query;
      let list = await fetch();
      if (query) {
        options.value = list.filter((item) => {
          return item.label.toLowerCase().includes(query.toLowerCase());
        });
      } else {
        options.value = [];
      }
    };

    const loadMore = async () => {
      index += 15;
      let list = await fetch();
      options.value = options.value.concat(
        list.filter((item) => {
          return item.label.toLowerCase().includes(search.value.toLowerCase());
        })
      );
    };

    return {
      value,
      options,
      loading,
      loadMore,
      remoteMethod,
    };
  },
});
</script>
```

:::

### EditableSelect 参数

| 参数名                | 类型                                   | 默认值   | 说明                                         | 跳转 Demo                          |
| :-------------------- | :------------------------------------- | :------- | :------------------------------------------- | :--------------------------------- |
| model-value / v-model | `string \| number`                     | ''       | 可选，选中项绑定值                           | [基本用法](#基本用法)              |
| options               | [Options](#options)                    | []       | 可选，数据列表                               | [基本用法](#基本用法)              |
| allow-clear           | `boolean`                              | false    | 可选，是否可以清空选项                       | [基本用法](#基本用法)              |
| size                  | `string`                               | 'md'     | 可选，输入框尺寸，有三种选择'lg'，'md'，'sm' | [尺寸](#尺寸)                      |
| placeholder           | `string`                               | 'Select' | 可选，输入框的默认提示文字                   | [基本用法](#基本用法)              |
| width                 | `number`                               | --       | 可选，输入框宽度                             | [基本用法](#基本用法)              |
| max-height            | `number`                               | --       | 可选，下拉框最大高度                         | [基本用法](#基本用法)              |
| disabled              | `boolean`                              | false    | 可选，是否禁用选择器本身                     | [禁用选择器本身 ](#禁用选择器本身) |
| disabled-key          | `string`                               | ''       | 可选，设置禁用选项的 Key 值                  | [禁用选项](#有用选项)              |
| enable-lazy-load      | `boolean`                              | false    | 可选，是否允许懒加载                         | [远程搜索](#远程搜索)              |
| filter-method         | ` (inputValue:string)=>Array<Options>` | --       | 可选，自定义筛选方法                         | [自定义匹配方法](#自定义筛选方法)  |
| remote-method         | `(inputValue:string)=>Array<Options>`  | --       | 可选，自定义远程搜索方法                     | [远程搜索](#远程搜索)              |

### EditableSelect 事件

| 事件名         | 回调参数                        | 说明                          | 跳转 Demo             |
| :------------- | :------------------------------ | :---------------------------- | :-------------------- |
| load-more      | ` (inputvalue:string)=>void`    | 可选，懒加载触发事件          | [远程搜索](#远程搜索) |
| focus          | ` (e: FocusEvent)=>void`        | 可选，当 input 获得焦点时触发 |                       |
| blur           | ` (e: FocusEvent)->void`        | 可选，当 input 失去焦点时触发 |                       |
| change         | ` (value:string\|number)=>void` | 可选，选中值发生变化时触发    |
| visible-change | `(visible:boolean)=>void`       | 可选，下拉框显隐时触发        |

### EditableSelect 插槽

| 插槽名       | 说明                                     | 跳转 Demo                         |
| :----------- | :--------------------------------------- | :-------------------------------- |
| item         | 可选，下拉菜单条目的模板                 | [自定义模板展示](#自定义模板展示) |
| noResultItem | 可选，下拉菜单条目搜索后，没有结果的模板 | [自定义模板展示](#自定义模板展示) |

### EditableSelect 类型定义

#### Options

```ts
export type Option = {
  label: string;
  value: string | number;
  disabled?: boolean;
  [key: string]: unknown;
};

export type Options = Array<Option>;
```
