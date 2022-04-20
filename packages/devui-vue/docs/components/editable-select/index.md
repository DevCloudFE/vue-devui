# EditableSelect 可输入下拉选择框

同时支持输入和下拉选择的输入框。

#### 何时使用

当需要同时支持用户输入数据和选择已有数据的时候使用，加入输入联想功能，方便用户搜索已有数据。

### 基本用法

通过 source 设置数据源。
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

### 设置禁用

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

### 自定义数据匹配方法

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

### 自定义模板展示

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

### 懒加载

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

### 参数

| 参数名              | 类型                                                | 默认     | 说明                                                                                                                             | 跳转 Demo              |
| :------------------- | :--------------------------------------------------- | :-------- | :-------------------------------------------------------------------------------------------------------------------------------- | :---------------------- |
| options             | `Array`                                             | []       | 可选，数据列表                                                                                                                   | [基本用法](#基本用法)  |
| placeholder         | `string`                                            | 'Search' | 可选，下拉框的默认提示文字                                                                                                       | [基本用法](#基本用法)  |
| max-height          | `number`                                            | --       | 可选，下拉框最大高度                                                                                                             | [基本用法](#基本用法)  |
| width               | `number`                                            | --       | 可选，输入框宽度                                                                                                                 | [基本用法](#基本用法)` |
| disabled            | `boolean`                                           | false    | 可选，值为 true 禁用                                                                                                             | [设置禁用](#设置禁用)  |
| option-disabled-key | `string`                                            | ''       | 可选，设置禁用选项的 Key 值                                                                                                      | [设置禁用](#设置禁用)  |
| loading             | `boolean`                                           | false    | 可选，控制 loading 状态                                                                                                          | [懒加载](#懒加载)      |
| filter-option       | `boolean` \| <br>`(inputvalue, options) => boolean` | true     | 可选，当其为一个函数时，<br>会接收 inputvalue option 两个参数，<br>当 option 符合筛选条件时，<br>应返回 true，反之则返回 false。 |

### 事件

| 事件名    | 类型                        | 说明                                          | 跳转 Demo                                 |
| :--------- | :--------------------------- | :--------------------------------------------- | :----------------------------------------- |
| load-more | `(inputvalue:string)=>void` | 可选, 懒加载触发事件，配合 filter-option 使用 | [懒加载](#懒加载)                         |
| search    | `(inputvalue:string)=>void` | 可选,文本框值变化时回调                       | [自定义数据匹配方法](#自定义数据匹配方法) |

### 插槽

| 插槽名               | 说明                                    | 跳转 Demo                         |
| :-------------------- | :--------------------------------------- | :--------------------------------- |
| itemTemplate         | 可选，下拉菜单条目的模板                | [自定义模板展示](#自定义模板展示) |
| noResultItemTemplate | 可选，下拉菜单条目搜索后,没有结果的模板 | [自定义模板展示](#自定义模板展示) |
