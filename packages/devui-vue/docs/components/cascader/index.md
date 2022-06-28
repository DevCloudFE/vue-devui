# Cascader 级联菜单

下拉级联菜单。

#### 何时使用

1. 需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。
2. 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。

### 基本用法

:::demo

```vue
<template>
  <h4>hover mode</h4>
  <d-cascader :options="options" placeholder="请选择" style="width: 200px"></d-cascader>
  <h4>click mode</h4>
  <d-cascader :options="options2" v-model="value" showPath trigger="click" placeholder="请选择" style="width: 200px"></d-cascader>
  <h4>data empty</h4>
  <d-cascader :options="[]" trigger="click" placeholder="请选择" style="width: 200px"></d-cascader>
  <h4>disabled</h4>
  <d-cascader :options="[]" disabled trigger="click" placeholder="请选择" style="width: 200px"></d-cascader>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const options = reactive([
      {
        label: 'option1',
        value: 1,
        children: [
          {
            label: 'option1-1',
            value: 4,
            children: [
              {
                label: 'option1-1-1',
                value: 8,
                children: [],
              },
              {
                label: 'option1-1-2',
                value: 9,
                children: [
                  {
                    label: 'option1-1-2-1',
                    value: 81,
                  },
                ],
              },
            ],
          },
          {
            label: 'option1-2',
            value: 41,
          },
          {
            label: 'option1-3',
            value: 42,
          },
          {
            label: 'option1-4',
            value: 43,
          },
        ],
      },
      {
        label: 'option2',
        value: 2,
        children: [
          {
            label: 'option2-1',
            value: 5,
            children: [
              {
                label: 'option2-1-1',
                value: 51,
              },
              {
                label: 'option2-1-2',
                value: 61,
                disabled: true,
              },
            ],
          },
          {
            label: 'option2-2',
            value: 6,
            children: [
              {
                label: 'option2-2-1',
                value: 512,
              },
              {
                label: 'option2-2-2',
                value: 611,
              },
            ],
          },
          {
            label: 'option2-3',
            value: 712,
          },
        ],
      },
      {
        label: 'option3',
        value: 3,
        children: [],
        disabled: true,
      },
    ]);
    const options2 = reactive([
      {
        label: 'option1.1',
        value: 1,
        children: [
          {
            label: 'option1.1-1',
            value: 4,
            children: [
              {
                label: 'option1.1-1-1',
                value: 8,
                children: [],
              },
              {
                label: 'option1.1-1-2',
                value: 9,
                children: [
                  {
                    label: 'option1.1-1-2-1',
                    value: 81,
                  },
                ],
              },
            ],
          },
          {
            label: 'option1.1-2',
            value: 41,
          },
          {
            label: 'option1.1-3',
            value: 42,
          },
          {
            label: 'option1.1-4',
            value: 43,
          },
        ],
      },
      {
        label: 'option2.1',
        value: 2,
        children: [
          {
            label: 'option2.1-1',
            value: 5,
            children: [
              {
                label: 'option2.1-1-1',
                value: 51,
              },
              {
                label: 'option2.1-1-2',
                value: 61,
                disabled: true,
              },
            ],
          },
          {
            label: 'option2.1-2',
            value: 6,
            children: [
              {
                label: 'option2.1-2-1',
                value: 512,
              },
              {
                label: 'option2.1-2-2',
                value: 611,
              },
            ],
          },
          {
            label: 'option2.1-3',
            value: 712,
          },
        ],
      },
      {
        label: 'option3.1',
        value: 3,
        children: [],
        disabled: true,
      },
    ]);
    const value = ref([1, 4, 9, 81]);
    return {
      options,
      options2,
      value,
    };
  },
});
</script>
```

:::

### 可搜索

:::demo

```vue
<template>
  <d-cascader
    :options="options"
    v-model="value1"
    placeholder="请选择"
    trigger="click"
    :width="300"
    filterable
    :debounce="500"
    :before-filter="beforeFilter"
    @change="changeFun"
  ></d-cascader>
  <div>选择的value值：{{ value1 }}</div>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';
export default defineComponent({
  setup() {
    const options = reactive([
      {
        label: 'option1',
        value: 1,
        children: [
          {
            label: 'option1-1',
            value: 4,
            children: [
              {
                label: 'option1-1-1',
                value: 8,
                children: [],
              },
              {
                label: 'option1-1-2',
                value: 9,
                children: [
                  {
                    label: 'option1-1-2-1',
                    value: 81,
                  },
                ],
              },
            ],
          },
          {
            label: 'option1-2',
            value: 41,
          },
          {
            label: 'option1-3',
            value: 42,
          },
          {
            label: 'option1-4',
            value: 43,
          },
        ],
        icon: 'folder',
      },
      {
        label: 'option2',
        value: 2,
        children: [
          {
            label: 'option2-1',
            value: 5,
            children: [
              {
                label: 'option2-1-1',
                value: 51,
              },
              {
                label: 'option2-1-2',
                value: 61,
                disabled: true,
              },
            ],
          },
          {
            label: 'option2-2',
            value: 6,
            children: [
              {
                label: 'option2-2-1',
                value: 512,
              },
              {
                label: 'option2-2-2',
                value: 611,
              },
            ],
          },
          {
            label: 'option2-3',
            value: 712,
          },
        ],
        icon: 'folder',
      },
      {
        label: 'option3',
        value: 3,
        children: [],
        disabled: true,
        icon: 'folder',
      },
    ]);
    const value1 = ref([1, 4, 8]);
    const onToggleChange = (event) => {
      console.log(event);
    };
    const beforeFilter = (val) => {
      return new Promise((resolve, reject) => {
        resolve();
      });
    };
    const changeFun = (value) => {
      console.log(value);
    };
    return {
      options,
      value1,
      onToggleChange,
      beforeFilter,
      changeFun,
    };
  },
});
</script>
```

:::

### API

|     参数      |               类型                |  默认   | 说明                                                                                                 | 跳转 Demo             |
| :-----------: | :-------------------------------: | :-----: | :--------------------------------------------------------------------------------------------------- | --------------------- |
|    trigger    |        `'hover'\|'click'`         | 'hover' | 可选，指定展开次级菜单的方式                                                                         | [基本用法](#基本用法) |
|    options    | [`CascaderItem[]`](#CascaderItem) |   []    | 必选，级联器的菜单信息                                                                               | [基本用法](#基本用法) |
|  placeholder  |             `string`              |   ''    | 可选，没有选择时的输入框展示信息                                                                     | [基本用法](#基本用法) |
|   disabled    |             `boolean`             |  false  | 可选，级联器是否禁用                                                                                 | [基本用法](#基本用法) |
|     value     |     `number[] \| [number[]]`      |   []    | 可选，单选时为`number[]`，多选时为`[number[]]`，选中项的 value 值集合                                | [基本用法](#基本用法) |
|   multiple    |             `boolean`             |  false  | 可选，级联器是否开启多选模式，开启后为 checkbox 选择                                                 | [基本用法](#多选模式) |
|     width     |        `number \| string`         |   200   | 可选，单位 px，用于控制组件输入框宽度和下拉的宽度                                                    | [基本用法](#多选模式) |
| dropdownWidth |        `number \| string`         |   200   | 可选，单位 px，控制下拉列表的宽度，默认和组件输入框 width 相等                                       | [基本用法](#多选模式) |
|   clearable   |             `boolean`             |  true   | 可选，是否支持清空选项                                                                               | [基本用法](#基本用法) |
|  filterable   |             `boolean`             |  true   | 可选，是否可搜索选项                                                                                 | [可搜索](#可搜索)     |
|   debounce    |             `number`              |   300   | 可选，搜索关键词输入去抖延迟                                                                         | [可搜索](#可搜索)     |
| before-filter |         `function(value)`         |   --    | 可选,过滤函数调用前的钩子函数。该函数返回值时 false 或者被拒绝的 Promise，接下来的过滤逻辑将不会执行 | [可搜索](#可搜索)     |

### CheckboxGroup 事件

| 事件   | 说明                   | 跳转 Demo         |
| :----- | :--------------------- | :---------------- |
| change | 绑定值变化时触发的事件 | [可搜索](#可搜索) |

### 接口 & 类型定义

-

#### CascaderItem

```ts
interface CascaderItem {
  label: string;
  value: number | string;
  children?: CascaderItem[];
  disabled?: boolean;
  icon?: string;
}
```
