# Transfer 穿梭框

双栏穿梭选择框。

### 何时使用

需要在多个可选项中进行多选时。穿梭选择框可用只管的方式在两栏中移动数据，完成选择行为。其中左边一栏为 source，右边一栏为 target。最终返回两栏的数据，提供给开发者使用。

### 基本用法
穿梭框基本用法。
:::demo

```vue
<template>
  <d-transfer
    v-model="options.modelValues"
    :titles="options.titles"
    :sourceOption="options.source"
    :targetOption="options.target"
    :isSearch="options.isSearch"
  >
  </d-transfer>
</template>
<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const originSource = [
        {
          key: '北京',
          value: '北京',
          disabled: false,
        },
        {
          key: '上海',
          value: '上海',
          disabled: true,
        },
        {
          key: '广州',
          value: '广州',
          disabled: false,
        },
        {
          key: '深圳',
          value: '深圳',
          disabled: false,
        },
        {
          key: '成都',
          value: '成都',
          disabled: false,
        },
        {
          key: '武汉',
          value: '武汉',
          disabled: false,
        },
        {
          key: "西安",
          value: "西安",
          disabled: false,
        },
        {
          key: '福建',
          value: '福建',
          disabled: false,
        },
        
      ]
    const originTarget = [
        {
          key: '南充',
          value: '南充',
          disabled: false,
        },
        {
          key: '广元',
          value: '广元',
          disabled: false,
        },
        {
          key: '绵阳',
          value: '绵阳',
          disabled: false,
        },
        {
          key: '大连',
          value: '大连',
          disabled: false,
        },
        {
          key: '重庆',
          value: '重庆',
          disabled: false,
        },
      ]

    const options = reactive({
      titles: ['sourceHeader', 'targetHeader'],
      source: originSource,
      target: originTarget,
      originSource,
      originTarget,
      isSearch: true,
      modelValues: ['深圳', '成都', '绵阳']
    })

    return {
      options
    }
  }
})
</script>
```

:::


### 拖拽排序

可以对穿梭框源和目标框的数据进行排序。

:::demo

```vue
<template>
  <d-transfer
    v-model="options.modelValues"
    :titles="options.titles"
    :sourceOption="options.source"
    :targetOption="options.target"
    :isSearch="options.isSearch"
    :isSourceDroppable="options.isSourceDroppable"
    :isTargetDroppable="options.isTargetDroppable"
  >
  </d-transfer>
</template>
<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const originSource = [
        {
          key: '北京',
          value: '北京',
          disabled: false,
        },
        {
          key: '上海',
          value: '上海',
          disabled: true,
        },
        {
          key: '广州',
          value: '广州',
          disabled: false,
        },
        {
          key: '深圳',
          value: '深圳',
          disabled: false,
        },
        {
          key: '成都',
          value: '成都',
          disabled: false,
        },
        {
          key: '武汉',
          value: '武汉',
          disabled: false,
        },
        {
          key: "西安",
          value: "西安",
          disabled: false,
        },
        {
          key: '福建',
          value: '福建',
          disabled: false,
        },
        
      ]
    const originTarget = [
        {
          key: '南充',
          value: '南充',
          disabled: false,
        },
        {
          key: '广元',
          value: '广元',
          disabled: false,
        },
        {
          key: '绵阳',
          value: '绵阳',
          disabled: false,
        },
        {
          key: '大连',
          value: '大连',
          disabled: false,
        },
        {
          key: '重庆',
          value: '重庆',
          disabled: false,
        },
      ]

    const options = reactive({
      titles: ['sourceHeader', 'targetHeader'],
      source: originSource,
      target: originTarget,
      originSource,
      originTarget,
      isSearch: false,
      modelValues: ['深圳', '成都', '绵阳'],
      isSourceDroppable: true,
      isTargetDroppable: true
    })

    return {
      options
    }
  }
})
</script>
```

::: 

### 自定义穿梭框
可以对穿梭框内容的显示进行自定义。
:::demo

```vue
<template>
  <d-transfer>
    <template #left-header>
      <div class="custom-transfer__header">Customize Header</div>
    </template>
    <template #left-body>
      <div class="custom-transfer__body">
        <div class="custom-transfer__body__list custom-transfer__body__header">
          <DCheckbox
            class="custom-transfer__body__list__checkout"
            v-model="leftOptions.allChecked"
            @change="changeAllSource(leftOptions)"
          ></DCheckbox>
          <div class="custom-transfer__body__list__part">Id</div>
          <div class="custom-transfer__body__list__part">Name</div>
          <div class="custom-transfer__body__list__part">Age</div>
        </div>
        <DCheckboxGroup v-model="leftOptions.checkedValues">
          <div class="custom-transfer__body__list" v-for="(item, idx) in leftOptions.filterData">
            <DCheckbox
                class="devui-transfer__panel__body__list__item"
                :value="item.value"
                :disabled="item.disabled"
                :key="idx">
            </DCheckbox>
            <div class="custom-transfer__body__list__part">{{item.key}}</div>
            <div class="custom-transfer__body__list__part">{{item.value}}</div>
            <div class="custom-transfer__body__list__part">{{item.age}}</div>
          </div>
        </DCheckboxGroup>
      </div>
    </template>
    <template #operation>
      <div class="custom-transfer__operation">
        <div class="custom-transfer__operation__group">
          <DButton :disabled="leftOptions.disabled" @Click="updateRightFilterData" >Left</DButton>
          <DButton style="margin-top: 12px;" :disabled="rightOptions.disabled" @click="updateLeftFilterData">Right</DButton>
        </div>
      </div>
    </template>
    <template #right-header>
      <div class="custom-transfer__header">Customize Header</div>
    </template>
    <template #right-body>
      <div class="custom-transfer__body">
        <div class="custom-transfer__body__list custom-transfer__body__header">
          <DCheckbox
            class="custom-transfer__body__list__checkout"
            v-model="rightOptions.allChecked"
            @change="changeAllSource(rightOptions)"
          ></DCheckbox>
          <div class="custom-transfer__body__list__part">Id</div>
          <div class="custom-transfer__body__list__part">Name</div>
          <div class="custom-transfer__body__list__part">Age</div>
        </div>
        <DCheckboxGroup v-model="rightOptions.checkedValues">
          <div class="custom-transfer__body__list" v-for="(item, idx) in rightOptions.filterData">
            <DCheckbox
                class="devui-transfer__panel__body__list__item"
                :value="item.value"
                :disabled="item.disabled"
                :key="idx">
            </DCheckbox>
            <div class="custom-transfer__body__list__part">{{item.key}}</div>
            <div class="custom-transfer__body__list__part">{{item.value}}</div>
            <div class="custom-transfer__body__list__part">{{item.age}}</div>
          </div>
        </DCheckboxGroup>
      </div>
    </template>
  </d-transfer>
</template>
<script>
import { defineComponent, reactive, watch } from 'vue'

export default defineComponent({
  setup() {
    const leftOptions = reactive({
      allChecked: false,
      filterData: [
        {
          key: '1',
          value: 'Mark',
          age: 11,
          disabled: false,
        },
        {
          key: '2',
          value: 'Jacob',
          age: 12,
          disabled: false,
        },
        {
          key: '3',
          value: 'Danni',
          age: 13,
          disabled: false,
        },
        {
          key: '4',
          value: 'green',
          age: 14,
          disabled: false,
        },
        {
          key: '5',
          value: 'po',
          age: 15,
          disabled: false,
        },
        {
          key: '6',
          value: 'Book',
          age: 16,
          disabled: false,
        }
      ],
      checkedValues: [],
      disabled: true,
    });

    const rightOptions = reactive({
      allChecked: false,
      filterData: [
        {
          key: '21',
          value: 'john',
          age: 17,
          disabled: false,
        },
        {
          key: '22',
          value: 'Joke',
          age: 28,
          disabled: false,
        },
        {
          key: '23',
          value: 'Echo',
          age: 18,
          disabled: false,
        },
      ],
      checkedValues: [],
      disabled: true,
    })

    watch(
      () => leftOptions.checkedValues, 
      (nVal) => {
        rightOptions.disabled = nVal.length !== 0 ? false : true
        leftOptions.allChecked = isEqual(nVal, leftOptions.filterData)
      },
      {
        deep: true
      }
    )

    watch(
      () => rightOptions.checkedValues,
      (nVal) => {
        leftOptions.disabled = nVal.length !== 0 ? false : true
        rightOptions.allChecked = isEqual(nVal, rightOptions.filterData)
      },
      {
        deep: true
      }
    )

    const isEqual = (source, target) => {
      return target.length !== 0 && source.length === target.length
    }

    const changeAllSource = (source) => {
      if(source.allChecked) {
        source.checkedValues = source.filterData.map(item => item.value)
      } else {
        source.checkedValues = []
      }
    }

    const updateRightFilterData = () => {
      rightOptions.filterData = rightOptions.filterData.filter(item => {
        let hasItem = rightOptions.checkedValues.includes(item.value)
        if(hasItem) {
          leftOptions.filterData.push(item)
        }
        return !hasItem
      })
      rightOptions.checkedValues = []
    }

    const updateLeftFilterData = () => {
      leftOptions.filterData = leftOptions.filterData.filter(item => {
        let hasItem = leftOptions.checkedValues.includes(item.value)
        if(hasItem) {
          rightOptions.filterData.push(item)
        }
        return !hasItem
      })
      leftOptions.checkedValues = []
    }

    return {
      leftOptions,
      rightOptions,
      changeAllSource,
      updateRightFilterData,
      updateLeftFilterData
    }
  }
})
</script>
<style>
.custom-transfer__header {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #dfe1e6;
}
.custom-transfer__body {
  height: calc(100% - 40px);
  overflow-y: auto;
}
.custom-transfer__body__list {
  display: flex;
  justify-content: space-between;
  height: 36px;
  line-height: 36px;
  border-bottom: 1px solid #dfe1e6;
  align-items: center;
}
.custom-transfer__body__list__part {
  width: 30%;
  text-align: center;
}
.custom-transfer__body__list__checkout, .custom-transfer__body__list__item {
  width: 10%;
}
.custom-transfer__header, .custom-transfer__body__list {
  padding: 0 10px;
}
.custom-transfer__operation {
  display: flex;
  width: 10%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.custom-transfer__operation__group , .custom-transfer__operation__group .devui-btn{
  width: 64px;
}
</style>
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