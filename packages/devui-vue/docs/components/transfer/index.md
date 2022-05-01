# Transfer 穿梭框

双栏穿梭选择框。

#### 何时使用

需要在多个可选项中进行多选时。穿梭选择框可用只管的方式在两栏中移动数据，完成选择行为。其中左边一栏为 source，右边一栏为 target。最终返回两栏的数据，提供给开发者使用。

### 基本用法
穿梭框基本用法。
:::demo

```vue
<template>
  <d-transfer
    v-model:source-default-checked="options.sourceDefaultChecked"
    v-model:target-default-checked="options.targetDefaultChecked"
    :titles="options.titles"
    :sourceOption="options.source"
    :targetOption="options.target"
    :isSearch="options.isSearch"
  >
  </d-transfer>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup() {
    const originSource = [
        {
          value: '1',
          name: '北京',
          disabled: false,
        },
        {
          value: '2',
          name: '上海',
          disabled: true,
        },
        {
          value: '3',
          name: '广州',
          disabled: false,
        },
        {
          value: '4',
          name: '深圳',
          disabled: false,
        },
        {
          value: '5',
          name: '成都',
          disabled: false,
        },
        {
          value: '6',
          name: '武汉',
          disabled: false,
        },
        {
          value: "7",
          name: "西安",
          disabled: false,
        },
        {
          value: '8',
          name: '福建',
          disabled: false,
        },
        
      ]
    const originTarget = [
        {
          value: '9',
          name: '南充',
          disabled: false,
        },
        {
          value: '10',
          name: '广元',
          disabled: false,
        },
        {
          value: '11',
          name: '绵阳',
          disabled: false,
        },
        {
          value: '12',
          name: '大连',
          disabled: false,
        },
        {
          value: '13',
          name: '重庆',
          disabled: false,
        },
      ]

    const options = {
      titles: ['sourceHeader', 'targetHeader'],
      source: originSource,
      target: originTarget,
      sourceDefaultChecked: ['2', '5', '28'],
      targetDefaultChecked: ['12', '23'],
    }
    return {
      options
    }
  }
})
</script>
```

:::


### API
d-transfer 参数

| **参数**           | **类型**                                                     | **默认**                  | **说明**                                                     | **跳转 Demo**                |
| ------------------ | ------------------------------------------------------------ | ------------------------- | ------------------------------------------------------------ | ---------------------------- |
| sourceOption   | `Array`   | []     | 可选参数，穿梭框源数据     |  [基本用法](#基本用法)   |
| targetOption   | `Array`   | []     | 可选参数，穿梭框目标数据   |  [基本用法](#基本用法)   |
| titles         | `Array`   | []     | 可选参数，穿梭框标题      |  [基本用法](#基本用法)   |
| height         | `Array`  | 320px  | 可选参数，穿梭框高度      |  [基本用法](#基本用法)   |
| isSearch       | `Array` | true   | 可选参数，是否可以搜索    |  [基本用法](#基本用法)   |
| disabled       | `Array` | false  | 可选参数 穿梭框禁止使用   |  [基本用法](#基本用法)   |  
| beforeTransfer | `(sourceOption, targetOption) => boolean \| Promise<boolean>` |-  | 可选参数 穿梭框禁止使用   |  [基本用法](#基本用法)   |  

d-transfer 事件
| **事件**           | **类型**                                                     | **说明**                                                     | **跳转 Demo**                |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------------------- |
| transferToSource   | `EventEmitter<{sourceOption, targetOption}>`   | 当点击右穿梭时，返回穿梭框源和目标数据；     |  [基本用法](#基本用法)   |
| transferToTarget   | `EventEmitter<{sourceOption, targetOption}>`   | 当点击左穿梭时，返回穿梭框源和目标数据；     |  [基本用法](#基本用法)   |
| searching   | `EventEmitter<{direction, keyword}>`   | 当搜索时触发，返回目标穿梭框和搜索文字，不设置此事件则会使用默认方法；     |  [基本用法](#基本用法)   |
| transferring   | `EventEmitter<TransferDirection>`   | 当穿梭时触发，返回目标穿梭框，不设置此事件则会使用默认方法；     |  [基本用法](#基本用法)   |
| afterTransfer   | `EventEmitter<TransferDirection>`   | 当穿梭完成后，返回目标穿梭框，不设置transferEvent才会触发；     |  [基本用法](#基本用法)   |
| onDragEnd   | `(direction: string, dragItem: TransferItem, dropItem: TransferItem) => void`   | 节点结束拖拽的回调；     |  [基本用法](#基本用法)   |


d-transfer.Item
| **属性**           | **类型**                                                     | **默认**                  | **说明**                                                     | **跳转 Demo**                |
| ------------------ | ------------------------------------------------------------ | ------------------------- | ------------------------------------------------------------ | ---------------------------- |
|  key   | `string  (required)`   |       -     | 选项的键值（唯一标识符）     |  [基本用法](#基本用法)   |
| value   | `string  (required)`   |       -     | 选项对应的值   |  [基本用法](#基本用法)   |
| disabled         | `boolean`   |       -     | 是否禁用此选项      |  [基本用法](#基本用法)   |