# EditableSelect

You can enter or select a value from the drop-down list box.

#### When To Use

When users need to input data and select existing data at the same time, add input association function, convenient for users to search for existing data.

### Basic usage

The value of the v-model is the value of the currently selected value attribute.
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

### Size

Available in three sizes: sm, md, and lg. The default value is md.
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

### Disable selector

Disable the entire selector component

If the disabled property is set, the entire selector is unavailable.
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

### Disabled option

The disabled-key value is used to define the Key value of the disabled option.
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

### Clear option

The selector can be cleared to its initial state

Setting the allow-clear property clears the selector.
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

### Customized data matching method

You can customize the filtering method for local search, only local search works.

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

### Custom template display

You can customize how individual options are rendered and display templates when no matching data is available.
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

### Remote search

Search for data on the server by entering keywords

To enable remote search, pass in a 'remote-method'. 'remote-method' is a 'Function' that is called when the input value changes with the current input value.
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
              value: i,
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

### EditableSelect Parameter

| 参数名                | 类型                                   | 默认值   | 说明                                         | 跳转 Demo                                                           |
| :-------------------- | :------------------------------------- | :------- | :------------------------------------------- | :------------------------------------------------------------------ |
| model-value / v-model | `string \| number`                     | ''       | 可选，选中项绑定值                           | [Basic usage](#Basic-usage)                                         |
| options               | [Options](#options)                    | []       | 可选，数据列表                               | [Basic usage](#Basic-usage)                                         |
| allow-clear           | `boolean`                              | false    | 可选，是否可以清空选项                       | [Basic usage](#Basic-usage)                                         |
| size                  | `string`                               | 'md'     | 可选，输入框尺寸，有三种选择'lg'，'md'，'sm' | [Size](#Size)                                                       |
| placeholder           | `string`                               | 'Select' | 可选，输入框的默认提示文字                   | [Basic usage](#Basic-usage)                                         |
| width                 | `number`                               | --       | 可选，输入框宽度                             | [Basic usage](#Basic-usage)                                         |
| max-height            | `number`                               | --       | 可选，下拉框最大高度                         | [Basic usage](#Basic-usage)                                         |
| disabled              | `boolean`                              | false    | 可选，是否禁用选择器本身                     | [Disable selector ](#Disable-selector)                              |
| disabled-key          | `string`                               | ''       | 可选，设置禁用选项的 Key 值                  | [Disabled option](#Disabled-option)                                 |
| enable-lazy-load      | `boolean`                              | false    | 可选，是否允许懒加载                         | [Remote search](#Remote-search)                                     |
| filter-method         | ` (inputValue:string)=>Array<Options>` | --       | 可选，自定义筛选方法                         | [Customized data matching method](#Customized-data-matching-method) |
| remote-method         | `(inputValue:string)=>Array<Options>`  | --       | 可选，自定义远程搜索方法                     | [Remote search](#Remote-search)                                     |

### EditableSelect methods

| 事件名         | 回调参数                        | 说明                          | 跳转 Demo                       |
| :------------- | :------------------------------ | :---------------------------- | :------------------------------ |
| load-more      | ` (inputvalue:string)=>void`    | 可选，懒加载触发事件          | [Remote search](#Remote-search) |
| focus          | ` (e: FocusEvent)=>void`        | 可选，当 input 获得焦点时触发 |                                 |
| blur           | ` (e: FocusEvent)->void`        | 可选，当 input 失去焦点时触发 |                                 |
| change         | ` (value:string\|number)=>void` | 可选，选中值发生变化时触发    |
| visible-change | `(visible:boolean)=>void`       | 可选，下拉框显隐时触发        |

### EditableSelect slots

| 插槽名       | 说明                                     | 跳转 Demo                                            |
| :----------- | :--------------------------------------- | :--------------------------------------------------- |
| item         | 可选，下拉菜单条目的模板                 | [ Custom template display](#Custom-template-display) |
| noResultItem | 可选，下拉菜单条目搜索后，没有结果的模板 | [ Custom template display](#Custom-template-display) |

### EditableSelect type definition

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
