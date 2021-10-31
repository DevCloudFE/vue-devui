# Cascader 级联菜单

下拉级联菜单。
<<<<<<< HEAD:docs/components/cascader/index.md
=======

### 何时使用

1. 需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。
2. 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。

>>>>>>> dev:packages/devui-vue/docs/components/cascader/index.md
### 基本用法

:::demo

```vue
<template>
  <h4>hover mode</h4>
  <d-cascader :options="options" placeholder="请选择" style="width: 200px"></d-cascader>
  <h4>click mode</h4>
  <d-cascader :options="options2" trigger="click" placeholder="请选择" style="width: 200px"></d-cascader>
  <h4>data empty</h4>
  <d-cascader :options="[]" trigger="click" placeholder="请选择" style="width: 200px"></d-cascader>
  <h4>disabled</h4>
  <d-cascader :options="[]" disabled trigger="click" placeholder="请选择" style="width: 200px"></d-cascader>
</template>
<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const options = reactive([
      {
        label: 'option1',
        value : 1,
        children: [
          {
            label: 'option1-1',
            value : 4,
            children: [
              {
                label: 'option1-1-1',
                value : 8,
                children: []
              },
              {
                label: 'option1-1-2',
                value : 9,
                children: [
                  {
                    label: 'option1-1-2-1',
                    value : 81,
                    isLeaf: true
                  }
                ],
              }
            ]
          },
          {
            label: 'option1-2',
            value : 41,
            isLeaf: true
          },
          {
            label: 'option1-3',
            value : 42,
            isLeaf: true
          },
          {
            label: 'option1-4',
            value : 43,
            isLeaf: true
          }
        ],
      },
      {
        label: 'option2',
        value : 2,
        children: [
          {
            label: 'option2-1',
            value : 5,
            children: [
              {
                label: 'option2-1-1',
                value : 51,
                isLeaf: true
              },
              {
                label: 'option2-1-2',
                value : 61,
                isLeaf: true,
                disabled: true
              }
            ]
          },
          {
            label: 'option2-2',
            value : 6,
            children: [
              {
                label: 'option2-2-1',
                value : 512,
                isLeaf: true
              },
              {
                label: 'option2-2-2',
                value : 611,
                isLeaf: true
              }
            ]
          },
          {
            label: 'option2-3',
            value : 712,
            isLeaf: true
          }
        ]
      },
      {
        label: 'option3',
        value : 3,
        children: [],
        isLeaf: true,
        disabled: true
      }
    ])
    const options2 = reactive([
      {
        label: 'option1.1',
        value : 1,
        children: [
          {
            label: 'option1.1-1',
            value : 4,
            children: [
              {
                label: 'option1.1-1-1',
                value : 8,
                children: []
              },
              {
                label: 'option1.1-1-2',
                value : 9,
                children: [
                  {
                    label: 'option1.1-1-2-1',
                    value : 81,
                    isLeaf: true
                  }
                ],
              }
            ]
          },
          {
            label: 'option1.1-2',
            value : 41,
            isLeaf: true
          },
          {
            label: 'option1.1-3',
            value : 42,
            isLeaf: true
          },
          {
            label: 'option1.1-4',
            value : 43,
            isLeaf: true
          }
        ],
      },
      {
        label: 'option2.1',
        value : 2,
        children: [
          {
            label: 'option2.1-1',
            value : 5,
            children: [
              {
                label: 'option2.1-1-1',
                value : 51,
                isLeaf: true
              },
              {
                label: 'option2.1-1-2',
                value : 61,
                isLeaf: true,
                disabled: true
              }
            ]
          },
          {
            label: 'option2.1-2',
            value : 6,
            children: [
              {
                label: 'option2.1-2-1',
                value : 512,
                isLeaf: true
              },
              {
                label: 'option2.1-2-2',
                value : 611,
                isLeaf: true
              }
            ]
          },
          {
            label: 'option2.1-3',
            value : 712,
            isLeaf: true
          }
        ]
      },
      {
        label: 'option3.1',
        value : 3,
        children: [],
        isLeaf: true,
        disabled: true
      }
    ])
    return {
      options,
      options2
    }
  },
})
</script>
```

:::

### 多选模式

:::demo

```vue
<template>
  <d-cascader
    :options="options"
    :value="value1"
    placeholder="请选择"
    style="width: 200px"
    trigger="click"
    :width="300"
    :dropdownWidth="200"
    :multiple="true"
    :allowClear="true"
    @toggleEvent="onToggleChange"
  ></d-cascader>
</template>
<script>
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
    const options = reactive([
      {
        label: 'option1',
        value : 1,
        children: [
          {
            label: 'option1-1',
            value : 4,
            children: [
              {
                label: 'option1-1-1',
                value : 8,
                children: []
              },
              {
                label: 'option1-1-2',
                value : 9,
                children: [
                  {
                    label: 'option1-1-2-1',
                    value : 81,
                    isLeaf: true
                  }
                ],
              }
            ]
          },
          {
            label: 'option1-2',
            value : 41,
            isLeaf: true
          },
          {
            label: 'option1-3',
            value : 42,
            isLeaf: true
          },
          {
            label: 'option1-4',
            value : 43,
            isLeaf: true
          }
        ],
        icon: 'folder'
      },
      {
        label: 'option2',
        value : 2,
        children: [
          {
            label: 'option2-1',
            value : 5,
            children: [
              {
                label: 'option2-1-1',
                value : 51,
                isLeaf: true
              },
              {
                label: 'option2-1-2',
                value : 61,
                isLeaf: true,
                disabled: true
              }
            ]
          },
          {
            label: 'option2-2',
            value : 6,
            children: [
              {
                label: 'option2-2-1',
                value : 512,
                isLeaf: true
              },
              {
                label: 'option2-2-2',
                value : 611,
                isLeaf: true
              }
            ]
          },
          {
            label: 'option2-3',
            value : 712,
            isLeaf: true
          }
        ],
        icon: 'folder'
      },
      {
        label: 'option3',
        value : 3,
        children: [],
        isLeaf: true,
        disabled: true,
        icon: 'folder'
      }
    ])
    const value1 = [[1, 4, 8], [1, 4, 9, 81], [1, 41]]
    const onToggleChange = (event) => {
      console.log(event)
    }
    return {
      options,
      value1,
      onToggleChange
    }
  }
})
</script>
```

:::

<style>
  h4 {
    font-weight: 700;
    color: #575d6c;
    font-size: 12px;
    margin: 15px 0;
  }
</style>

### API

|    参数     |   类型   |   默认    | 说明                     | 跳转 Demo                         |  全局配置项 |
| :--------: | :------: | :-------: | :---------------------- | --------------------------------- | --------- |
| trigger    | ` 'hover'\|'click' ` |	'hover' |	可选，指定展开次级菜单的方式 |  [基本用法](#基本用法) | |
| options    |	[`CascaderItem[]`](#CascaderItem) |	[] |	必选，级联器的菜单信息 |  [基本用法](#基本用法) | |
| placeholder    | `string` |	'' |	可选，没有选择时的输入框展示信息 |  [基本用法](#基本用法) | |
| disabled    | `boolean` |	false |		可选，级联器是否禁用 |  [基本用法](#基本用法) | |

### 接口 & 类型定义

-

#### CascaderItem
```ts
interface CascaderItem {
  label: string;
  value: number | string;
  isLeaf?: boolean;
  children?: CascaderItem[];
  disabled?: boolean;
  icon?: string;
  // 用户可以传入自定义属性，并在dropDownItemTemplate中使用
  [prop: string]: any;
}
```