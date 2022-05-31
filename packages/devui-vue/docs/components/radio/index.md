# Radio 单选框

单选框。

#### 何时使用

用户要从一个数据集中选择单个选项，且能并排查看所有可选项，选项数量在 2~7 之间时，建议使用单选按钮。

### 相互独立的单选项

:::demo

```vue
<template>
  <d-radio v-for="item in baseList" v-model="baseChoose" :key="item" :value="item" :style="{ marginBottom: '20px' }">
    The Radio value is: {{ item }}
  </d-radio>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const baseList = ref(['Item1', 'Item2', 'Item3']);
    let baseChoose = ref('Item1');

    return {
      baseList,
      baseChoose,
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
    v-for="item in filterList"
    v-model="filterChoose"
    :key="item"
    :value="item"
    :beforeChange="filterBeforeChange"
    :style="{ marginBottom: '20px' }"
    @change="filterValChange"
  >
    The Radio value is: {{ item }}
  </d-radio>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const filterList = ref(['Item1', 'Item2', 'Item3']);
    let filterChoose = ref('Item1');

    return {
      filterList,
      filterChoose,
      filterBeforeChange(value) {
        return value !== 'Item2';
      },
      filterValChange(val) {
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
  <d-radio-group direction="row" v-model="groupFilterChoose1" :beforeChange="groupFilterBeforeChange">
    <d-radio v-for="item in groupFilterList1" :key="item" :value="item">
      {{ item }}
    </d-radio>
  </d-radio-group>
  <d-radio-group v-model="groupFilterChoose2" direction="row" disabled>
    <d-radio v-for="item in groupFilterList2" :key="item" :value="item">
      {{ item }}
    </d-radio>
  </d-radio-group>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const groupFilterList1 = ref(['Item1', 'Item2', 'Item3']);
    let groupFilterChoose1 = ref('Item1');

    const groupFilterList2 = ['Spring', 'Summer', 'Autumn', 'Winter'];
    const groupFilterChoose2 = ref('Summer');

    return {
      groupFilterList1,
      groupFilterChoose1,
      groupFilterList2,
      groupFilterChoose2,
      groupFilterBeforeChange(value) {
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
  <d-radio v-for="item in disabledList" v-model="disabledChoose" :key="item" :value="item" :style="{ marginBottom: '20px' }" disabled>
    The Radio value is: {{ item }}
  </d-radio>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const disabledList = ref(['Item1', 'Item2', 'Item3']);
    let disabledChoose = ref('Item1');

    return {
      disabledList,
      disabledChoose,
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
  <d-radio-group direction="row" v-model="directionRowChoose">
    <d-radio v-for="item in directionRowList" :key="item" :value="item"> The Radio value is: {{ item }} </d-radio>
  </d-radio-group>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const directionRowList = ref(['Item1', 'Item2', 'Item3']);
    let directionRowChoose = ref('Item1');

    return {
      directionRowList,
      directionRowChoose,
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
  <d-radio-group :values="directionColumnList" v-model="directionColumnChoose"></d-radio-group>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const directionColumnList = ['Spring', 'Summer', 'Autumn', 'Winter'];
    const directionColumnChoose = ref('Summer');

    return {
      directionColumnList,
      directionColumnChoose,
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
  <d-radio-group direction="row" v-model="customChoose1">
    <d-radio v-for="item in customList1" :key="item" :value="item"> The Radio value is: {{ item }} </d-radio>
  </d-radio-group>
  <d-radio-group direction="row" v-model="customChoose2">
    <d-radio v-for="item in customList2" :key="item.name" :value="item.name"> The Radio value is: {{ item.name }} </d-radio>
  </d-radio-group>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const customList1 = ref(['Item1', 'Item2', 'Item3']);
    let customChoose1 = ref('Item1');

    const customList2 = [{ name: 'Item1' }, { name: 'Item2' }, { name: 'Item3' }];
    let customChoose2 = ref('Item3');

    return {
      customList1,
      customChoose1,
      customList2,
      customChoose2,
    };
  },
});
</script>
```

:::

### 尺寸和边框

:::demo

```vue
<template>
  <d-radio-group
    :values="sizeBorderList"
    v-model="sizeBorderChoose1"
    size="lg"
    border
    direction="row"
    style="margin-bottom: 10px;"
  ></d-radio-group>
  <d-radio-group
    :values="sizeBorderList"
    v-model="sizeBorderChoose2"
    size="md"
    border
    direction="row"
    style="margin-bottom: 10px;"
  ></d-radio-group>
  <d-radio-group
    :values="sizeBorderList"
    v-model="sizeBorderChoose3"
    size="sm"
    border
    disabled
    direction="row"
    style="margin-bottom: 10px;"
  ></d-radio-group>
  <d-radio-group v-model="sizeBorderChoose4" size="xs" border direction="row" style="margin-bottom: 10px;">
    <d-radio v-for="item in sizeBorderList" :key="item" :value="item">{{ item }} </d-radio>
  </d-radio-group>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const sizeBorderList = ['Spring', 'Summer'];
    const sizeBorderChoose1 = ref('Spring');
    const sizeBorderChoose2 = ref('Spring');
    const sizeBorderChoose3 = ref('Spring');
    const sizeBorderChoose4 = ref('Spring');

    return {
      sizeBorderList,
      sizeBorderChoose1,
      sizeBorderChoose2,
      sizeBorderChoose3,
      sizeBorderChoose4,
    };
  },
});
</script>
```

:::

### 按钮形态

数组源可为普通数组、对象数组等。

:::demo

```vue
<template>
  <d-radio-group direction="row" v-model="buttonChoose1" size="lg" style="margin-bottom: 10px;" fill="rgb(255,193,7)" text-color="#ca3d3d">
    <d-radio-button v-for="item in buttonList1" :key="item" :value="item"> {{ item }} </d-radio-button>
  </d-radio-group>
  <d-radio-group direction="row" v-model="buttonChoose2" size="md" style="margin-bottom: 10px;">
    <d-radio-button v-for="item in buttonList2" :key="item.name" :value="item.name">{{ item.name }} </d-radio-button>
  </d-radio-group>
  <d-radio-group direction="row" v-model="buttonChoose3" size="sm" style="margin-bottom: 10px;">
    <d-radio-button v-for="item in buttonList3" :key="item.name" :value="item.name" :disabled="item.disabled"
      >{{ item.name }}
    </d-radio-button>
  </d-radio-group>
  <d-radio-group direction="row" v-model="buttonChoose4" size="xs" style="margin-bottom: 10px;" disabled>
    <d-radio-button v-for="item in buttonList2" :key="item.name" :value="item.name">{{ item.name }} </d-radio-button>
  </d-radio-group>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const buttonList1 = ref(['radio1', 'radio2', 'radio3']);
    let buttonChoose1 = ref('radio1');

    const buttonList2 = [{ name: 'radio1' }, { name: 'radio2' }, { name: 'radio3' }];
    let buttonChoose2 = ref('radio1');
    const buttonList3 = [{ name: 'radio1', disabled: true }, { name: 'radio2' }, { name: 'radio3' }];
    let buttonChoose3 = ref('radio1');
    let buttonChoose4 = ref('radio1');

    return {
      buttonList1,
      buttonChoose1,
      buttonList2,
      buttonChoose2,
      buttonList3,
      buttonChoose3,
      buttonChoose4,
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
| border        | `boolean`                    | false | 可选， 是否有边框                                                | [边框](#尺寸和边框)                     |
| size          | [IRadioSize](#iradiosize)    | md    | 可选， radio 尺寸，只有在 border 属性存在时生效                  | [尺寸](#尺寸和边框)                     |

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
| border        | `boolean`                    | false    | 可选， 是否有边框                                                              | [边框](#尺寸和边框)                                                   |
| size          | [IRadioSize](#iradiosize)    | md       | 可选， radio 尺寸，只有在 border 属性存在时生效                                | [尺寸](#尺寸和边框)                                                   |
| fill          | `string`                     | --       | 可选，按钮形式的 Radio 激活时的填充色和边框色                                  | [按钮形态](#按钮形态)                                                 |
| text-color    | `string`                     | --       | 可选， 按钮被选中的字体样式，只存在于按钮形态中                                | [按钮形态](#按钮形态)                                                 |

### RadioGroup 事件

| 事件名 | 类型                   | 说明                             | 跳转 Demo             |
| :----- | :--------------------- | :------------------------------- | :-------------------- |
| change | `EventEmitter<string>` | 单选项值改变时触发，返回选中的值 | [竖向排列](#竖向排列) |

### RadioButton 参数

| 参数     | 类型                         | 默认  | 说明                   | 跳转 Demo             |
| :------- | :--------------------------- | :---- | :--------------------- | :-------------------- |
| value    | `string \|number \| boolean` | --    | 必选，单选项值         | [按钮形态](#按钮形态) |
| name     | `string`                     | --    | 可选，单选项名称       | [按钮形态](#按钮形态) |
| disabled | `boolean`                    | false | 可选，是否禁用该单选项 | [按钮形态](#按钮形态) |

### Radio 类型定义

#### IRadioSize

```ts
type IRadioSize = 'lg' | 'md' | 'sm' | 'xs';
```
