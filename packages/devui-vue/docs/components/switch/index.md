# Switch 开关

开/关切换组件。

#### 何时使用

当两种状态需要来回切换控制时，比如启用/禁用。

### size

:::demo size 可选：`sm | md | lg`，默认为`md`

```vue
<template>
  <d-switch v-model:checked="checkedSmall" size="sm"></d-switch>
  <d-switch v-model:checked="uncheckedMiddle"></d-switch>
  <d-switch v-model:checked="checkedLarge" size="lg"></d-switch>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const checkedSmall = ref(true);
    const uncheckedMiddle = ref(false);
    const checkedLarge = ref(true);
    return {
      checkedSmall,
      uncheckedMiddle,
      checkedLarge,
    };
  },
});
</script>
```

:::

### disabled

:::demo 可选，是否禁用开关，默认为 false

```vue
<template>
  <d-switch v-model:checked="checkedDisabled" :disabled="true"></d-switch>
  <d-switch v-model:checked="checkedDisabled1" :disabled="true"></d-switch>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const checkedDisabled = ref(true);
    const checkedDisabled1 = ref(false);
    return {
      checkedDisabled,
      checkedDisabled1,
    };
  },
});
</script>
```

:::

### 自定义样式

:::demo 可选，可设置文字说明/图标

```vue
<template>
  <d-switch v-model:checked="checkedColor" color="#FECC55"></d-switch>
  <d-switch v-model:checked="checkedContent">
    <template #checkedContent>开</template>
    <template #uncheckedContent>关</template>
  </d-switch>
  <d-switch color="#50D4AB" v-model:checked="checkedIcon">
    <template #checkedContent>
      <i class="icon-right"></i>
    </template>
    <template #uncheckedContent>
      <i class="icon-error"></i>
    </template>
  </d-switch>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const checkedColor = ref(true);
    const checkedContent = ref(false);
    const checkedIcon = ref(true);
    return {
      checkedColor,
      checkedContent,
      checkedIcon,
    };
  },
});
</script>
```

:::

### Switch 参数

| 参数             | 类型                    | 默认  | 说明                         | 跳转 Demo                 |
| :--------------- | :---------------------- | :---- | :--------------------------- | :------------------------ |
| size             | `sm \| md \| lg`        | `md`  | 可选，开关尺寸大小           | [size](#size)             |
| color            | `string`                | --    | 可选，开关打开时的自定义颜色 | [自定义样式](#自定义样式) |
| checked          | `boolean`               | false | 可选，开关是否打开，默认关闭 | [基本用法](#size)         |
| disabled         | `boolean`               | false | 可选，是否禁用开关           | [基本用法](#size)         |
| checkedContent   | `string \| HTMLElement` | ''    | 可选，开关打开时说明         | [自定义样式](#自定义样式) |
| uncheckedContent | `string \| HTMLElement` | ''    | 可选，开关关闭时说明         | [自定义样式](#自定义样式) |

### Switch 事件

| 事件   | 类型                    | 说明                                  |
| :----- | :---------------------- | :------------------------------------ |
| change | `EventEmitter<boolean>` | 可选,开关打开返回 true,关闭返回 false |
