# EditableSelect 可输入下拉选择框

同时支持输入和下拉选择的输入框。

### 何时使用

当需要同时支持用户输入数据和选择已有数据的时候使用，加入输入联想功能，方便用户搜索已有数据。

### 基本用法

通过 source 设置数据源。
:::demo // todo 展开代码的内部描述

```vue
<template>
  <d-editable-select
    v-model="value"
    :options="options"
    filter-option
    appendToBody
    :width="450"
  ></d-editable-select>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('');
    const options = reactive([
      {
        label: 'label0',
        value: 0
      },
      {
        label: 'label1',
        value: 1
      },
      {
        label: 'label2',
        value: 2
      }
    ]);
    return {
      value,
      options
    };
  }
});
</script>
```

:::

### 设置禁用

:::demo

```vue
<template>
  <d-editable-select
    v-model="value"
    disabled
    filter-option
    appendToBody
    :width="450"
    :options="options"
  ></d-editable-select>
  <br />
  <d-editable-select
    v-model="value1"
    filter-option
    appendToBody
    :width="450"
    :options="options1"
    option-disabled-key="disabled"
  ></d-editable-select>
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
        value: 0
      },
      {
        label: 'label1',
        value: 1,
        disabled: true
      },
      {
        label: 'label2',
        value: 2,
        disabled: false
      }
    ]);
    return {
      value,
      value1,
      options,
      options1
    };
  }
});
</script>
```

:::

### 自定义数据匹配方法

:::demo

```vue
<template>
  <d-editable-select
    v-model="value"
    appendToBody
    :width="450"
    :options="options"
    :filter-option="filterOption"
  ></d-editable-select>
</template>
<script>
import { defineComponent, ref, reactive } from 'vue';
export default defineComponent({
  setup() {
    const value = ref('');
    const options = reactive([
      {
        label: 'label0',
        value: 0
      },
      {
        label: 'label1',
        value: 1,
        disabled: true
      },
      {
        label: 'label2',
        value: 2,
        disabled: false
      }
    ]);
    const filterOption = (inputValue: string, option: any) => option.label.indexOf(inputValue) > -1;
    return {
      value,
      options,
      filterOption
    };
  }
});
</script>
```

:::

### 自定义模板展示

:::demo

```vue
<template>
  <d-editable-select v-model="value" appendToBody :width="450" filter-option :options="options">
    <template #itemTemplate="slotProps">
      <div>第{{ slotProps.value }}项: {{ slotProps.label }}</div>
    </template>
    <template #noResultItemTemplate>
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
        value: 0
      },
      {
        label: 'label1',
        value: 1,
        disabled: true
      },
      {
        label: 'label2',
        value: 2,
        disabled: false
      }
    ]);
    return {
      value,
      options
    };
  }
});
</script>
```

:::

### 懒加载

:::demo

```vue
<template>
  <d-editable-select
    v-model="value"
    appendToBody
    :options="options"
    :filter-option="false"
    :max-height="300"
    :width="450"
    :loading="loading"
    :load-more="loadMore"
    @search="handleSearch"
  ></d-editable-select>
</template>

<script>
import { defineComponent, reactive, ref, getCurrentInstance } from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const value = ref('');
    const options = ref([]);
    const loading = ref(false);
    const size = 20;
    let index = 0;
    const handleSearch = (val: string) => {
      if (val !== '') {
        loading.value = true;
        setTimeout(() => {
          const data = fetch();
          options.value = filterMethod(data, val);
          loading.value = false;
        }, 3000);
      } else {
        options.value = [];
      }
    };
    const filterMethod = (options, val) => {
      return options.filter((option) => {
        return option.label.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    };
    const fetch = () => {
      const data = [];
      for (let i = 1; i <= size; i++) {
        data.push({
          label: `label${i + index}`,
          value: i
        });
      }
      index += size;
      return data;
    };
    const loadMore = (val: string) => {
      if (val !== '') {
        loading.value = true;
        setTimeout(() => {
          const data = fetch();
          options.value = [...options.value, ...filterMethod(data, val)];
          loading.value = false;
        }, 3000);
      } else {
        options.value = [];
      }
    };
    return {
      value,
      options,
      loading,
      handleSearch,
      loadMore
    };
  }
});
</script>
```

:::

### d-editable-select

d-editable-select 参数

| 参数         | 类型                                     | 默认     | 说明                                                                                                           | 跳转 Demo             |
| ------------ | ---------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------- | --------------------- |
| options      | `Array`                                  | []       | 可选数据列表                                                                                                   | [基本用法](#基本用法) |
| appendToBody | `boolean`                                | false    | 可选，下拉是否 appendToBody                                                                                    | [基本用法](#基本用法) |
| placeholder  | `string`                                 | `Search` | 下拉框的默认提示文字                                                                                           | [基本用法](#基本用法) |
| maxHeight    | number                                   |          |                                                                                                                |
| disabled     | `boolean`                                | false    | 可选，值为 true 禁用下拉框                                                                                     | [设置禁用](#设置禁用) |
| disabledKey  | `string`                                 | --       | 可选，设置禁用选项的 Key 值                                                                                    | [设置禁用](#设置禁用) |
| filterOption | `boolean\|(inputValue,options)=>boolean` | true     | 当其为一个函数时，会接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。 |

d-editable-select 事件

| 事件     | 类型                           | 说明                                     | 跳转 Demo                                 |
| -------- | ------------------------------ | ---------------------------------------- | ----------------------------------------- |
| loadMore | `(inputvalue:string)=>void `   | 懒加载触发事件，配合 enableLazyLoad 使用 | [懒加载](#懒加载)                         |
| search   | ` (inputvalue:string)=>bolean` | 文本框值变化时回调                       | [自定义数据匹配方法](#自定义数据匹配方法) |

d-editable-select 插槽
| 插槽名|说明 |跳转 Demo|
| ---- | -- | ------- |
| itemTemplate | 可选，下拉菜单条目的模板 | [自定义模板展示](#自定义模板展示) |
| noResultItemTemplate | 可选，下拉菜单条目搜索后没有结果的模板 | [自定义模板展示](#自定义模板展示) |
