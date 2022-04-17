# EditableSelect

You can enter or select a value from the drop-down list box.

#### When To Use

You can use it easily when you want to search existed data.

### Basic usage

Set source to a data source.
:::demo

```vue
<template>
  <d-editable-select v-model="value" :options="options" filter-option :width="450"></d-editable-select>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('');
    const options = reactive([
      {
        label: 'label0',
        value: 0,
      },
      {
        label: 'label1',
        value: 1,
      },
      {
        label: 'label2',
        value: 2,
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

### Set disable options

Disable specified data or disable it as a whole
:::demo

```vue
<template>
  <d-editable-select v-model="value" disabled filter-option :width="450" :options="options"></d-editable-select>
  <br />
  <d-editable-select v-model="value1" filter-option :width="450" :options="options1" option-disabled-key="disabled"></d-editable-select>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';
export default defineComponent({
  setup() {
    const value = ref('');
    const value1 = ref('');
    const options = reactive(['label0', 'label1', 'label2']);
    const options1 = reactive([
      {
        label: 'label0',
        value: 0,
      },
      {
        label: 'label1',
        value: 1,
        disabled: true,
      },
      {
        label: 'label2',
        value: 2,
        disabled: false,
      },
    ]);
    return {
      value,
      value1,
      options,
      options1,
    };
  },
});
</script>
```

:::

### Customized data matching method

Use filter-optio to customize the data matching method.

:::demo

```vue
<template>
  <d-editable-select v-model="value" :width="450" :options="options" :filter-option="filterOption"></d-editable-select>
</template>
<script>
import { defineComponent, ref, reactive } from 'vue';
export default defineComponent({
  setup() {
    const value = ref('');
    const options = reactive([
      {
        label: 'label0',
        value: 0,
      },
      {
        label: 'label1',
        value: 1,
        disabled: true,
      },
      {
        label: 'label2',
        value: 2,
        disabled: false,
      },
    ]);
    const filterOption = (inputValue: string, option: any) => option.label.indexOf(inputValue) > -1;
    return {
      value,
      options,
      filterOption,
    };
  },
});
</script>
```

:::

### Custom template display

:::demo

```vue
<template>
  <d-editable-select v-model="value" :width="450" filter-option :options="options">
    <template #item="slotProps">
      <div>第{{ slotProps.value }}项: {{ slotProps.label }}</div>
    </template>
    <template #noResultItem>
      <div>
        {{ `没有匹配项` }}
      </div>
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
        value: 0,
      },
      {
        label: 'label1',
        value: 1,
        disabled: true,
      },
      {
        label: 'label2',
        value: 2,
        disabled: false,
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

### Enable lazy load

:::demo

```vue
<template>
  <d-editable-select
    v-model="value"
    :options="options"
    :filter-option="false"
    :max-height="300"
    :width="450"
    :loading="loading"
    @load-more="loadeMore"
    @search="handleSearch"
  ></d-editable-select>
</template>

<script>
import { defineComponent, reactive, ref, getCurrentInstance } from 'vue';

export default defineComponent({
  setup(props, ctx) {
    let count = 0;
    const options = ref([]);
    const value = ref('');
    const loading = ref(false);
    let timer = null;
    const fetch = () => {
      return new Promise((resolve) => {
        const data = [];
        loading.value = true;
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        timer = setTimeout(() => {
          for (let i = 1; i <= 15; i++) {
            data.push({
              label: `label${i + count}`,
              value: i,
            });
          }
          count += 15;
          loading.value = false;
          resolve(data);
        }, 2000);
      });
    };
    const handleSearch = async (val) => {
      if (val !== '') {
        const data = await fetch();
        options.value = data;
      }
    };
    const loadeMore = async () => {
      const data = await fetch();
      console.log('data: ', data);
      options.value = [...options.value, ...data];
    };
    return {
      options,
      value,
      loading,
      handleSearch,
      loadeMore,
    };
  },
});
</script>
```

:::

### d-editable-select

d-editable-select Attributes

| Attribute           | Type                                      | Default  | Description                                                                                                                                                                   | Jump to Demo                                |
| ------------------- | ----------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| options             | `Array`                                   | []       | Optional. Data list                                                                                                                                                           | [Basic usage](#basic-usage)                 |
| placeholder         | `string`                                  | `Search` | Optional. This field is displayed when no item is selected.                                                                                                                   | [Basic usage](#basic-usage)                 |
| max-height          | `number`                                  | --       | Optional. Maximum height of the drop-down list box                                                                                                                            | [Basic usage](#basic-usage)                 |
| width               | `number`                                  | --       | Optional. Controls the width of the drop-down list box.                                                                                                                       | [Basic usage](#basic-usage)                 |
| disabled            | `boolean`                                 | false    | Optional. The value true indicates that the drop-down list box is disabled.                                                                                                   | [Basic usage](#basic-usage)                 |
| option-disabled-key | `string`                                  | --       | Optional. Sets the key value of the disabled option.                                                                                                                          | [Set disable options](#set-disable-options) |
| loading             | `boolean`                                 | false    | Optional, controls the loading state                                                                                                                                          | [Enable-lazy-load](#enable-lazy-load)       |
| filter-option       | `boolean\| (inputvalue,options)=>boolean` | true     | Optional, when it is a function, it will receive two parameters of inputvalue option, when option meets the filter conditions, it should return true, otherwise return false. |

d-editable-select Events

| Event Name | Type                        | Description                                                                            | Jump to Demo                                                        |
| ---------- | --------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| load-more  | `(inputvalue:string)=>void` | Optional. lazy loading trigger event. This event is used together with `filter-option' | [Enable-lazy-load](#enable-lazy-load)                               |
| search     | `(inputvalue:string)=>void` | Optional. callback when the textbox value changes                                      | [Customized-data-matching-method](#customized-data-matching-method) |

d-editable-select Slots
| Name|Description |Jump to Demo|
| ---- | -- | ------- |
| item | Optional, Dropdown list item template | [Custom template display](#custom-template-display) |
| noResultItem| Optional. Template for which no result is found after the drop-down list item is searched. | [Custom template display](#custom-template-display) |
