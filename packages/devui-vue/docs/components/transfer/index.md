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
    v-model:source-default-checked="sourceDefaultChecked"
    v-model:target-default-checked="targetDefaultChecked"
    :titles="titles"
    :sourceOption="source"
    :targetOption="target"
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
        name: '杭州',
        disabled: true,
      },
      {
        value: "7",
        name: "重庆",
        disabled: false,
      },
      {
        value: '8',
        name: '西安',
        disabled: false,
      },
      {
        value: '9',
        name: '苏州',
        disabled: false,
      },
      {
        value: '10',
        name: '武汉',
        disabled: false,
      }
    ]
    const originTarget = [
      {
        value: '11',
        name: '南京',
        disabled: false,
      },
      {
        value: '12',
        name: '长沙',
        disabled: false,
      },
      {
        value: '13',
        name: '东莞',
        disabled: false,
      },
      {
        value: '14',
        name: '佛山',
        disabled: false,
      },
      {
        value: '15',
        name: '宁波',
        disabled: true,
      },
      {
        value: '16',
        name: '青岛',
        disabled: false,
      },
      {
        value: '17',
        name: '沈阳',
        disabled: false,
      }
    ]

    return {
      titles: ['sourceHeader', 'targetHeader'],
      source: originSource,
      target: originTarget,
      sourceDefaultChecked: ['2', '5', '28'],
      targetDefaultChecked: ['12', '23']
    }
  }
})
</script>
```

:::

### 搜索穿梭框
在数据很多的情况下，可以对数据进行搜索和过滤。
:::demo

```vue
<template>
  <d-transfer
    v-model:source-default-checked="sourceDefaultChecked"
    v-model:target-default-checked="targetDefaultChecked"
    :titles="titles"
    :sourceOption="source"
    :targetOption="target"
    :isSearch="isSearch"
    :searching="searchingHandle"
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
        name: '杭州',
        disabled: true,
      },
      {
        value: "7",
        name: "重庆",
        disabled: false,
      },
      {
        value: '8',
        name: '西安',
        disabled: false,
      },
      {
        value: '9',
        name: '苏州',
        disabled: false,
      },
      {
        value: '10',
        name: '武汉',
        disabled: false,
      }
    ]
    const originTarget = [
      {
        value: '11',
        name: '南京',
        disabled: false,
      },
      {
        value: '12',
        name: '长沙',
        disabled: false,
      },
      {
        value: '13',
        name: '东莞',
        disabled: false,
      },
      {
        value: '14',
        name: '佛山',
        disabled: false,
      },
      {
        value: '15',
        name: '宁波',
        disabled: true,
      },
      {
        value: '16',
        name: '青岛',
        disabled: false,
      },
      {
        value: '17',
        name: '沈阳',
        disabled: false,
      }
    ]

    return {
      titles: ['sourceHeader', 'targetHeader'],
      source: originSource,
      target: originTarget,
      sourceDefaultChecked: ['2', '5', '28'],
      targetDefaultChecked: ['12', '23'],
      isSearch: true,
      searchingHandle: (direction, data, keyword) => {
        console.log(direction, data, keyword)
      }
    }
  }
})
</script>
```

:::

### 自定义排序穿梭框
可以对穿梭框源和目标框的数据进行自定义排序。
:::demo

```vue
<template>
  <d-transfer
    v-model:source-default-checked="sourceDefaultChecked"
    v-model:target-default-checked="targetDefaultChecked"
    :titles="titles"
    :sourceOption="source"
    :targetOption="target"
    :sourceSortMethods="sourceSortMethodsHandle"
    :targetSortMethods="targetSortMethodsHandle"
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
        name: '杭州',
        disabled: true,
      },
      {
        value: "7",
        name: "重庆",
        disabled: false,
      },
      {
        value: '8',
        name: '西安',
        disabled: false,
      },
      {
        value: '9',
        name: '苏州',
        disabled: false,
      },
      {
        value: '10',
        name: '武汉',
        disabled: false,
      }
    ]
    const originTarget = [
      {
        value: '11',
        name: '南京',
        disabled: false,
      },
      {
        value: '12',
        name: '长沙',
        disabled: false,
      },
      {
        value: '13',
        name: '东莞',
        disabled: false,
      },
      {
        value: '14',
        name: '佛山',
        disabled: false,
      },
      {
        value: '15',
        name: '宁波',
        disabled: true,
      },
      {
        value: '16',
        name: '青岛',
        disabled: false,
      },
      {
        value: '17',
        name: '沈阳',
        disabled: false,
      }
    ]

    return {
      titles: ['sourceHeader', 'targetHeader'],
      source: originSource,
      target: originTarget,
      sourceDefaultChecked: ['2', '5', '28'],
      targetDefaultChecked: ['12', '23'],
      sourceSortMethodsHandle: function(data) {
        return data.sort(() => 0.5 - Math.random())
      },
      targetSortMethodsHandle: function(data) {
        return data.reverse()
      }
    }
  }
})
</script>
```

:::

:::

### 拖拽排序穿梭框
可以对穿梭框源和目标框的数据进行拖拽排序。
:::demo

```vue
<template>
  <d-transfer
    v-model:source-default-checked="sourceDefaultChecked"
    v-model:target-default-checked="targetDefaultChecked"
    :titles="titles"
    :sourceOption="source"
    :targetOption="target"
    :isSourceDrag="sourceDrag"
    :isTargetDrag="sourceDrag"
    :dragstart="dragstartHandle"
    :drop="dropHandle"
    :dragend="dragendHandle"
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
        name: '杭州',
        disabled: true,
      },
      {
        value: "7",
        name: "重庆",
        disabled: false,
      },
      {
        value: '8',
        name: '西安',
        disabled: false,
      },
      {
        value: '9',
        name: '苏州',
        disabled: false,
      },
      {
        value: '10',
        name: '武汉',
        disabled: false,
      }
    ]
    const originTarget = [
      {
        value: '11',
        name: '南京',
        disabled: false,
      },
      {
        value: '12',
        name: '长沙',
        disabled: false,
      },
      {
        value: '13',
        name: '东莞',
        disabled: false,
      },
      {
        value: '14',
        name: '佛山',
        disabled: false,
      },
      {
        value: '15',
        name: '宁波',
        disabled: true,
      },
      {
        value: '16',
        name: '青岛',
        disabled: false,
      },
      {
        value: '17',
        name: '沈阳',
        disabled: false,
      }
    ]

    return {
      titles: ['sourceHeader', 'targetHeader'],
      source: originSource,
      target: originTarget,
      sourceDefaultChecked: ['2', '5', '28'],
      targetDefaultChecked: ['12', '23'],
      sourceDrag: true,
      dragstartHandle: (event, item) => {
        console.log(item, 'dragstartHandle')
      },
      dropHandle: (event, item) => {
        console.log(item, 'dropHandle')
      },
      dragendHandle: (event, item) => {
        console.log(item, 'dragendHandle')
      },
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
  <d-transfer class="custom-transfer">
    <template #sourceHeader>
      <div class="custom-transfer__header">
        <d-checkbox 
          class="custom-transfer__body__list__checkout" 
          v-model="options.sourceAllChecked"
          :label="options.sourceAllLabel"
          @change="sourceAllCheckedHandle"
        />
      </div>
    </template>
    <template #sourceBody>
      <div class="custom-transfer__body">
        <d-checkbox-group 
          class="custom-transfer__body__list" 
          :options="options.sourceData" 
          v-model="options.sourceDefaultChecked"
          v-if="options.sourceData.length"
        />
        <div class="custom-transfer__body__empty" v-if="!options.sourceData.length" >没有数据</div>
      </div>
    </template>
    <template #operate>
      <div class="custom-operate__wrap">
        <d-button :disabled="!options.sourceDefaultChecked.length" @click="moveTargetHandle">Right</d-button>
        <d-button :disabled="!options.targetDefaultChecked.length" @click="moveSourceHandle">Left</d-button>
      </div>
    </template>
    <template #targetHeader>
      <div class="custom-transfer__header">
        <d-checkbox 
          class="custom-transfer__body__list__checkout" 
          v-model="options.targetAllChecked"
          :label="options.targetAllLabel"
          @change="targetAllCheckedHandle"
        />
      </div>
    </template>
    <template #targetBody>
      <div class="custom-transfer__body">
        <d-checkbox-group 
          class="custom-transfer__body__list"
          :options="options.targetData" 
          v-model="options.targetDefaultChecked"
          v-if="options.targetData.length"
        />
        <div class="custom-transfer__body__empty" v-if="!options.targetData.length" >没有数据</div>
      </div>
    </template>
  </d-transfer>
</template>
<script>
import { defineComponent, reactive, watch, ref } from 'vue'

export default defineComponent({
  setup() {
    const options = reactive({
      sourceData: [
        {
          value: '1',
          name: 'content1',
          disabled: false,
        },
        {
          value: '2',
          name: 'content2',
          disabled: false,
        },
        {
          value: '3',
          name: 'content3',
          disabled: false,
        },
        {
          value: '4',
          name: 'content4',
          disabled: false,
        },
        {
          value: '5',
          name: 'content5',
          disabled: false,
        },
        {
          value: '6',
          name: 'content6',
          disabled: false,
        },
        {
          value: "7",
          name: "content7",
          disabled: false,
        },
        {
          value: '8',
          name: 'content8',
          disabled: false,
        }
      ],
      targetData: [
        {
          value: '9',
          name: 'content9',
          disabled: false,
        },
        {
          value: '10',
          name: 'content10',
          disabled: false,
        },
        {
          value: '11',
          name: 'content11',
          disabled: false,
        },
        {
          value: '12',
          name: 'content12',
          disabled: false,
        },
        {
          value: '13',
          name: 'content13',
          disabled: false,
        },
        {
          value: '14',
          name: 'content14',
          disabled: false,
        },
        {
          value: '15',
          name: 'content15',
          disabled: false,
        },
        {
          value: '16',
          name: 'content16',
          disabled: false,
        }
      ],
      sourceDefaultChecked: ['2', '5', '8'],
      targetDefaultChecked: ['12'],
      sourceAllChecked: false,
      targetAllChecked: false,
      sourceAllLabel: 'customSourceHeader',
      targetAllLabel: 'customTargetHeader'
    })


    const sourceAllCheckedHandle = (value) => {
      options.sourceDefaultChecked = value ? options.sourceData.map(item => item.value) : []
    }
    const targetAllCheckedHandle = (value) => {
      options.targetDefaultChecked = value ? options.targetData.map(item => item.value) : []
    }
    const moveTargetHandle = () => {
      const moveTargetData = []
      options.sourceData = options.sourceData.filter(item => {
        if(options.sourceDefaultChecked.includes(item.value)) {
          moveTargetData.push(item)
          return false
        }
        return true
      })
      options.targetData = options.targetData.concat(moveTargetData)
      options.sourceDefaultChecked = []
    }
    const moveSourceHandle = () => {
      const moveSourceData = []
      options.targetData = options.targetData.filter(item => {
        if(options.targetDefaultChecked.includes(item.value)) {
          moveSourceData.push(item)
          return false
        }
        return true
      })
      options.sourceData = options.sourceData.concat(moveSourceData)
      options.targetDefaultChecked = []
    }


    watch(
      () => options.sourceDefaultChecked,
      (nVal, oVal) => {
        options.sourceAllChecked = options.sourceData.length && nVal.length === options.sourceData.length
      },
      {
        deep: true
      }
    )

    watch(
      () => options.targetDefaultChecked,
      (nVal, oVal) => {
        options.targetAllChecked = options.targetData.length && nVal.length === options.targetData.length
      },
      {
        deep: true
      }
    )

    return {
      options,
      sourceAllCheckedHandle,
      targetAllCheckedHandle,
      moveTargetHandle,
      moveSourceHandle
    }
  }
})
</script>
<style>
.custom-transfer__header {
  border-bottom: 1px solid #dfe1e6;
}
.custom-transfer__body__list__checkout {
  height: 40px;
  line-height: 40px;
}
.custom-transfer__body {
  height: 320px;
  overflow-y: auto;
}
.custom-transfer__header, .custom-transfer__body {
  padding: 0 10px;
}
.custom-operate__wrap {
  display: flex;
  flex-direction: column;
}
.custom-operate__wrap button:last-child{
  margin-top: 8px;
}
.custom-transfer__body__empty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
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