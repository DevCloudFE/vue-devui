# Transfer 穿梭框

双栏穿梭选择框。

#### 何时使用

需要在多个可选项中进行多选时。穿梭选择框可用只管的方式在两栏中移动数据，完成选择行为。其中左边一栏为 source，右边一栏为 target。最终返回右侧栏的数据，提供给开发者使用。

### 基本用法

穿梭框基本用法。
:::demo

```vue
<template>
  <d-transfer
    :source-default-checked="sourceDefaultChecked"
    :target-default-checked="targetDefaultChecked"
    v-model="selectValue"
    :titles="titles"
    :data="source"
  >
  </d-transfer>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const originSource = ref([
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
        value: '7',
        name: '重庆',
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
      },
    ]);
    const selectValue = ref(['1', '2']);

    return {
      selectValue,
      titles: ['sourceHeader', 'targetHeader'],
      source: originSource,
      sourceDefaultChecked: ['2', '5', '28'],
      targetDefaultChecked: ['12', '23'],
    };
  },
});
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
    :data="source"
    :isSearch="isSearch"
    :searching="searchingHandle"
  >
  </d-transfer>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';

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
        value: '7',
        name: '重庆',
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
      },
    ];

    return {
      titles: ['sourceHeader', 'targetHeader'],
      source: originSource,
      sourceDefaultChecked: ['2', '5', '28'],
      targetDefaultChecked: ['12', '23'],
      isSearch: true,
      searchingHandle: (direction, data, keyword) => {
        console.log(direction, data, keyword);
      },
    };
  },
});
</script>
```

:::

### 自定义排序穿梭框

可以对穿梭框源和目标框的数据进行自定义排序。
:::demo

```vue
<template>
  <d-transfer
    :source-default-checked="sourceDefaultChecked"
    :target-default-checked="targetDefaultChecked"
    :titles="titles"
    :data="source"
    :sourceSortMethods="sourceSortMethodsHandle"
    :targetSortMethods="targetSortMethodsHandle"
  >
  </d-transfer>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const source = ref([
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
        value: '7',
        name: '重庆',
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
      },
    ]);

    return {
      titles: ['sourceHeader', 'targetHeader'],
      source,
      sourceDefaultChecked: ['2', '5', '28'],
      targetDefaultChecked: ['12', '23'],
      sourceSortMethodsHandle: function (data) {
        return data.sort(() => 0.5 - Math.random());
      },
      targetSortMethodsHandle: function (data) {
        return data.reverse();
      },
    };
  },
});
</script>
```

:::

### 拖拽排序穿梭框

可以对穿梭框源和目标框的数据进行拖拽排序。
:::demo

```vue
<template>
  <d-transfer
    :source-default-checked="sourceDefaultChecked"
    :target-default-checked="targetDefaultChecked"
    :titles="titles"
    :data="source"
    v-model="value"
    :isSourceDrag="sourceDrag"
    :isTargetDrag="sourceDrag"
    :dragstart="dragstartHandle"
    :drop="dropHandle"
    :dragend="dragendHandle"
  >
  </d-transfer>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';

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
        value: '7',
        name: '重庆',
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
      },
    ];
    const value = ref([]);

    return {
      value,
      titles: ['sourceHeader', 'targetHeader'],
      source: originSource,
      sourceDefaultChecked: ['2', '5', '28'],
      targetDefaultChecked: ['12', '23'],
      sourceDrag: true,
      dragstartHandle: (event, item) => {
        console.log(item, 'dragstartHandle');
      },
      dropHandle: (event, item) => {
        console.log(item, 'dropHandle');
      },
      dragendHandle: (event, item) => {
        console.log(item, 'dragendHandle');
      },
    };
  },
});
</script>
```

:::

### 自定义穿梭框

可以对穿梭框内容的显示进行自定义。
:::demo

```vue
<template>
  <d-transfer
    :source-default-checked="sourceDefaultChecked"
    :target-default-checked="targetDefaultChecked"
    :titles="titles"
    :data="source"
    :sourceSortMethods="sourceSortMethodsHandle"
    :targetSortMethods="targetSortMethodsHandle"
  >
  </d-transfer>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const source = ref([
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
        value: '7',
        name: '重庆',
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
      },
    ]);

    return {
      titles: ['sourceHeader', 'targetHeader'],
      source,
      sourceDefaultChecked: ['2', '5', '28'],
      targetDefaultChecked: ['12', '23'],
      sourceSortMethodsHandle: function (data) {
        return data.sort(() => 0.5 - Math.random());
      },
      targetSortMethodsHandle: function (data) {
        return data.reverse();
      },
    };
  },
});
</script>
```

:::

### API

d-transfer 参数

| **参数**  | **类型**                             | **默认** | **说明**                                                               | **跳转 Demo**         |
| --------- | ------------------------------------ | -------- | ---------------------------------------------------------------------- | --------------------- |
| v-model   | `Array`                              | []       | 可选参数，选中项绑定值，对应右侧穿梭框选项                             | [基本用法](#基本用法) |
| data      | `Array[{key,name,disabled}] `        | []       | 可选参数，穿梭框源数据                                                 | [基本用法](#基本用法) |
| titles    | `Array`                              | []       | 可选参数，穿梭框标题                                                   | [基本用法](#基本用法) |
| height    | `Array`                              | 320px    | 可选参数，穿梭框高度                                                   | [基本用法](#基本用法) |
| isSearch  | `Array`                              | true     | 可选参数，是否可以搜索                                                 | [基本用法](#基本用法) |
| disabled  | `Array`                              | false    | 可选参数 穿梭框禁止使用                                                | [基本用法](#基本用法) |
| searching | `EventEmitter<{direction, keyword}>` | --       | 当搜索时触发，返回目标穿梭框和搜索文字，不设置此事件则会使用默认方法； | [基本用法](#基本用法) |

d-transfer 事件
| **事件** | **类型** | **说明** | **跳转 Demo** |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------------------- |
| change | `EventEmitter<{direction, keyword}>` | 当搜索时触发，返回目标穿梭框和搜索文字，不设置此事件则会使用默认方法； | [基本用法](#基本用法) |
| onDragEnd | `(direction: string, dragItem: TransferItem, dropItem: TransferItem) => void` | 节点结束拖拽的回调； | [基本用法](#基本用法) |
