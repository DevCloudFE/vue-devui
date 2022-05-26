# Radio 单选框

单选框。

#### 何时使用

用户要从一个数据集中选择单个选项，且能并排查看所有可选项，选项数量在 2~7 之间时，建议使用单选按钮。

### 相互独立的单选项

:::demo

```vue
<template>
  <d-radio v-for="item in list" v-model="choose" :key="item" :value="item" :style="{ marginBottom: '20px' }">
    The Radio value is: {{ item }}
  </d-radio>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const list = ref(['Item1', 'Item2', 'Item3']);
    let choose = ref('Item1');

    return {
      list,
      choose,
    };
  },
});
</script>
```

:::

### radio 根据条件终止切换操作

根据条件判断，第二项禁止跳转。

:::demo

```vue
<template>
  <d-radio
    v-for="item in list"
    v-model="choose"
    :key="item"
    :value="item"
    :beforeChange="beforeChange"
    :style="{ marginBottom: '20px' }"
    @change="valChange"
  >
    The Radio value is: {{ item }}
  </d-radio>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const list = ref(['Item1', 'Item2', 'Item3']);
    let choose = ref('Item1');

    return {
      list,
      choose,
      beforeChange(value) {
        return value !== 'Item2';
      },
      valChange(val) {
        console.log('current value', val);
      },
    };
  },
});
</script>
```

:::

### radio-group 根据条件终止切换操作

根据条件判断，第二个 radio-group 禁止跳转。

:::demo

```vue
<template>
  <d-radio-group direction="row" v-model="choose" :beforeChange="beforeChange">
    <d-radio v-for="item in list" :key="item" :value="item">
      {{ item }}
    </d-radio>
  </d-radio-group>
  <d-radio-group v-model="choose2" direction="row" disabled>
    <d-radio v-for="item in list2" :key="item" :value="item">
      {{ item }}
    </d-radio>
  </d-radio-group>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const list = ref(['Item1', 'Item2', 'Item3']);
    let choose = ref('Item1');

    const list2 = ['Spring', 'Summer', 'Autumn', 'Winter'];
    const choose2 = ref('Summer');

    return {
      list,
      choose,
      list2,
      choose2,
      beforeChange(value) {
        return value !== 'Item2';
      },
    };
  },
});
</script>
```

:::

### 禁用

:::demo

```vue
<template>
  <d-radio v-for="item in list" v-model="choose" :key="item" :value="item" :style="{ marginBottom: '20px' }" disabled>
    The Radio value is: {{ item }}
  </d-radio>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const list = ref(['Item1', 'Item2', 'Item3']);
    let choose = ref('Item1');

    return {
      list,
      choose,
    };
  },
});
</script>
```

:::

### 横向排列

:::demo

```vue
<template>
  <d-radio-group direction="row" v-model="choose">
    <d-radio v-for="item in list" :key="item" :value="item"> The Radio value is: {{ item }} </d-radio>
  </d-radio-group>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const list = ref(['Item1', 'Item2', 'Item3']);
    let choose = ref('Item1');

    return {
      list,
      choose,
    };
  },
});
</script>
```

:::

### 竖向排列

:::demo

```vue
<template>
  <d-radio-group :values="list" v-model="choose"></d-radio-group>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const list = ['Spring', 'Summer', 'Autumn', 'Winter'];
    const choose = ref('Summer');

    return {
      list,
      choose,
      valChange(val) {
        console.log('current value', val);
      },
    };
  },
});
</script>
```

:::

### 自定义单选项

数组源可为普通数组、对象数组等。

:::demo

```vue
<template>
  <d-radio-group direction="row" v-model="choose">
    <d-radio v-for="item in list" :key="item" :value="item"> The Radio value is: {{ item }} </d-radio>
  </d-radio-group>
  <d-radio-group direction="row" v-model="choose2">
    <d-radio v-for="item in list2" :key="item.name" :value="item.name"> The Radio value is: {{ item.name }} </d-radio>
  </d-radio-group>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const list = ref(['Item1', 'Item2', 'Item3']);
    let choose = ref('Item1');

    const list2 = [{ name: 'Item1' }, { name: 'Item2' }, { name: 'Item3' }];
    let choose2 = ref('Item3');

    return {
      list,
      choose,
      list2,
      choose2,
    };
  },
});
</script>
```

:::

### Radio 参数

| 参数          | 类型                         | 默认  | 说明                                                             | 跳转 Demo                               |
| :------------ | :--------------------------- | :---- | :--------------------------------------------------------------- | :-------------------------------------- |
| v-model       | `string \|number \| boolean` | --    | 绑定值                                                           | [互相独立的单选项](#相互独立的单选项)   |
| value         | `string \|number \| boolean` | --    | 必选，单选项值                                                   | [互相独立的单选项](#相互独立的单选项)   |
| name          | `string`                     | --    | 可选，单选项名称                                                 | [互相独立的单选项](#相互独立的单选项)   |
| disabled      | `boolean`                    | false | 可选，是否禁用该单选项                                           | [禁用](#禁用)                           |
| before-change | `Function / Promise`         | --    | 可选，radio 切换前的回调函数，<br>返回 false 可以阻止 radio 切换 | [回调切换](#radio-根据条件终止切换操作) |

### Radio 事件

| 参数   | 类型                   | 说明                             | 跳转 Demo                             |
| :----- | :--------------------- | :------------------------------- | :------------------------------------ |
| change | `EventEmitter<string>` | 单选项值改变时触发，返回选中的值 | [互相独立的单选项](#相互独立的单选项) |

### RadioGroup 参数

| 参数          | 类型                         | 默认     | 说明                                                                           | 跳转 Demo                                                             |
| :------------ | :--------------------------- | :------- | :----------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| v-model       | `string \|number \| boolean` | --       | 绑定值                                                                         | [竖向排列](#竖向排列)                                                 |
| name          | `string`                     | --       | 可选，单选框的名称                                                             | [竖向排列](#竖向排列)                                                 |
| values        | `array`                      | --       | 可选，单选数据组                                                               | [竖向排列](#竖向排列)                                                 |
| disabled      | `boolean`                    | false    | 可选，是否禁用该选项组                                                         | [radio-group 根据条件终止切换操作](#radio-group-根据条件终止切换操作) |
| direction     | `'row'` \| `'column'`        | 'column' | 可选，设置横向或纵向排列                                                       | [横向排列](#横向排列)                                                 |
| before-change | `Function` \| `Promise`      | --       | 可选，radio-group 切换前的回调函数，<br>返回 false 可以阻止 radio-group 的切换 | [回调切换](#radio-group-根据条件终止切换操作)                         |

### RadioGroup 事件

| 事件名 | 类型                   | 说明                             | 跳转 Demo             |
| :----- | :--------------------- | :------------------------------- | :-------------------- |
| change | `EventEmitter<string>` | 单选项值改变时触发，返回选中的值 | [竖向排列](#竖向排列) |
