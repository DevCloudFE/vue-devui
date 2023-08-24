# Switch 开关

开/关切换组件。

#### 何时使用

当两种状态需要来回切换控制时，比如启用/禁用。

### 尺寸

:::demo 可选，`sm | md | lg`，默认为`md`。

```vue
<template>
  <d-switch v-model="checkedSmall" size="sm"></d-switch>
  <d-switch v-model="uncheckedMiddle"></d-switch>
  <d-switch v-model="checkedLarge" size="lg"></d-switch>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const checkedSmall = ref(true);
    const uncheckedMiddle = ref(true);
    const checkedLarge = ref(true);
    return {
      checkedSmall,
      uncheckedMiddle,
      checkedLarge,
    };
  },
});
</script>

<style scoped lang="scss">
.devui-switch:not(:last-of-type) {
  margin-right: 5px;
}
</style>
```

:::

### 禁用

:::demo 可选，是否禁用开关，默认为 false。

```vue
<template>
  <d-switch class="mr-1" v-model="checkedDisabled" :disabled="true"></d-switch>
  <d-switch v-model="checkedDisabled1" :disabled="true"></d-switch>
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
  <div>
    <d-switch v-model="checkedColor" color="#FECC55"></d-switch>
    <d-switch color="#50D4AB" v-model="checkedIcon">
      <template #checkedContent>
        <i class="icon-right"></i>
      </template>
      <template #uncheckedContent>
        <i class="icon-error"></i>
      </template>
    </d-switch>
    <d-switch v-model="checkedSmContent" size="sm">
      <template #checkedContent>开</template>
      <template #uncheckedContent>关</template>
    </d-switch>
    <d-switch v-model="checkedContent">
      <template #checkedContent>开</template>
      <template #uncheckedContent>关</template>
    </d-switch>
    <d-switch v-model="checkedLgContent" size="lg">
      <template #checkedContent>开</template>
      <template #uncheckedContent>关</template>
    </d-switch>
  </div>

</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const checkedColor = ref(true);
    const checkedContent = ref(false);
    const checkedSmContent = ref(false);
    const checkedLgContent = ref(false);
    const checkedIcon = ref(true);
    return {
      checkedColor,
      checkedContent,
      checkedSmContent,
      checkedLgContent,
      checkedIcon,
    };
  },
});
</script>
```

:::

### 自定义绑定值

:::demo switch 打开关闭时可以自定义值，打开时为 active-value，关闭时为 inactive-value

```vue
<template>
  <d-switch class="mr-1" v-model="activeValue1" active-value="打开" inactive-value="关闭"></d-switch>
  <d-switch class="mr-1" v-model="activeValue2" :active-value="1" :inactive-value="0"></d-switch>
  <d-switch v-model="activeValue3" :active-value="true" :inactive-value="false"></d-switch>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const activeValue1 = ref('打开');
    const activeValue2 = ref(0);
    const activeValue3 = ref(true);
    return {
      activeValue1,
      activeValue2,
      activeValue3,
    };
  },
});
</script>
```

:::

### Switch 参数

| 参数           | 类型                          | 默认  | 说明                         | 跳转 Demo                     |
| :------------- |:----------------------------| :---- | :--------------------------- | :---------------------------- |
| v-model        | `string\                    | number \|boolean` | --    | 绑定值                       | [基本用法](#size)             |
| size           | [ISwitchSize](#iswitchsize) | `md`  | 可选，开关尺寸大小           | [size](#size)                 |
| color          | `string`                    | --    | 可选，开关打开时的自定义颜色 | [自定义样式](#自定义样式)     |
| disabled       | `boolean`                   | false | 可选，是否禁用开关           | [基本用法](#size)             |
| active-value   | `string\                    | number \|boolean` | true  | 可选，开关打开时的值         | [自定义绑定值](#自定义绑定值) |
| inactive-value | `string\                    | number \|boolean` | true  | 可选，开关关闭时的值         | [自定义绑定值](#自定义绑定值) |

### Switch 事件

| 事件   | 类型                    | 说明                                  |
| :----- | :---------------------- | :------------------------------------ |
| change | `EventEmitter<boolean>` | 可选,开关打开返回 true,关闭返回 false |

### Switch 插槽

| 名称             | 说明           | 参数 | 跳转 Demo                 |
| :--------------- | :------------- | :--- | :------------------------ |
| checkedContent   | 打开状态的文案 | --   | [自定义样式](#自定义样式) |
| uncheckedContent | 关闭状态的文案 | --   | [自定义样式](#自定义样式) |

### Switch 类型定义
#### ISwitchSize
```ts
type ISwitchSize = 'sm' | 'md' | 'lg';
```
