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
      <div>{{ slotProps.index }}: {{ slotProps.option.label }}</div>
    </template>
    <template>
      <div>No matches</div>
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

| 参数名                | 类型                                   | 默认值   | 说明                                                     | 跳转 Demo                                                           |
| :-------------------- | :------------------------------------- | :------- | :------------------------------------------------------- | :------------------------------------------------------------------ |
| model-value / v-model | `string \| number`                     | ''       | Optional. check item binding value                       | [Basic usage](#Basic-usage)                                         |
| options               | [Options](#options)                    | []       | Optional. data list                                      | [Basic usage](#Basic-usage)                                         |
| allow-clear           | `boolean`                              | false    | Optional. whether the option can be cleared              | [Basic usage](#Basic-usage)                                         |
| size                  | `string`                               | 'md'     | Optional. input box size, three options 'lg', 'md', 'sm' | [Size](#Size)                                                       |
| placeholder           | `string`                               | 'Select' | Optional. the default prompt text for the input box      | [Basic usage](#Basic-usage)                                         |
| width                 | `number`                               | --       | Optional. input box width                                | [Basic usage](#Basic-usage)                                         |
| max-height            | `number`                               | --       | Optional. maximum height of drop-down box                | [Basic usage](#Basic-usage)                                         |
| disabled              | `boolean`                              | false    | Optional. whether to disable the selector itself         | [Disable selector ](#Disable-selector)                              |
| disabled-key          | `string`                               | ''       | Optional. set the Key value for the Disable option       | [Disabled option](#Disabled-option)                                 |
| enable-lazy-load      | `boolean`                              | false    | Optional. whether to allow lazy loading                  | [Remote search](#Remote-search)                                     |
| filter-method         | ` (inputValue:string)=>Array<Options>` | --       | Optional. custom filtering method                        | [Customized data matching method](#Customized-data-matching-method) |
| remote-method         | `(inputValue:string)=>Array<Options>`  | --       | Optional, custom remote search method                    | [Remote search](#Remote-search)                                     |

### EditableSelect methods

| 事件名         | 回调参数                        | 说明                                                               | 跳转 Demo                       |
| :------------- | :------------------------------ | :----------------------------------------------------------------- | :------------------------------ |
| load-more      | ` (inputvalue:string)=>void`    | Optional. lazy load trigger event                                  | [Remote search](#Remote-search) |
| focus          | ` (e: FocusEvent)=>void`        | Optional. triggered when the input gets focus                      |                                 |
| blur           | ` (e: FocusEvent)->void`        | Optional. triggered when the input loses focus                     |                                 |
| change         | ` (value:string\|number)=>void` | Optional. triggered when the selected value changes                |
| visible-change | `(visible:boolean)=>void`       | Optional. triggered when the drop-down box is visible or invisible |

### EditableSelect slots

| 插槽名       | 说明                                                                          | 跳转 Demo                                            |
| :----------- | :---------------------------------------------------------------------------- | :--------------------------------------------------- |
| item         | Optional. drop-down menu entry template                                       | [ Custom template display](#Custom-template-display) |
| noResultItem | Optional. drop-down menu entry search followed by no results for the template | [ Custom template display](#Custom-template-display) |

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
