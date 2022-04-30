# Tabs 选项卡

选项卡切换组件。

#### 何时使用

用户需要通过平级的区域将大块内容进行收纳和展现，保持界面整洁。

### 基本用法

:::demo

```vue
<template>
  <d-tabs v-model="id">
    <d-tab id="tab1" title="Tab1">
      <p>Tab1 Content</p>
    </d-tab>
    <d-tab id="tab2" title="Tab2">
      <p>Tab2 Content</p>
    </d-tab>
    <d-tab id="tab3" title="Tab3">
      <p>Tab3 Content</p>
    </d-tab>
  </d-tabs>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const id = ref('tab1');
    return {
      id,
    };
  },
});
</script>
```

:::

### Pills 类型

:::demo

```vue
<template>
  <d-tabs type="pills" v-model="id">
    <d-tab id="tab1" title="Tab1">
      <p>Tab1 Content</p>
    </d-tab>
    <d-tab id="tab2" title="Tab2">
      <p>Tab2 Content</p>
    </d-tab>
    <d-tab id="tab3" title="Tab3">
      <p>Tab3 Content</p>
    </d-tab>
  </d-tabs>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const id = ref('tab1');
    return {
      id,
    };
  },
});
</script>
```

:::

### Options 类型

:::demo

```vue
<template>
  <d-tabs type="options" v-model="id">
    <d-tab id="tab1" title="Tab1">
      <p>Tab1 Content</p>
    </d-tab>
    <d-tab id="tab2" title="Tab2">
      <p>Tab2 Content</p>
    </d-tab>
    <d-tab id="tab3" title="Tab3">
      <p>Tab3 Content</p>
    </d-tab>
  </d-tabs>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const id = ref('tab1');
    return {
      id,
    };
  },
});
</script>
```

:::

### Wrapped 类型

:::demo

```vue
<template>
  <d-tabs type="wrapped" v-model="id">
    <d-tab id="tab1" title="Tab1">
      <p>Tab1 Content</p>
    </d-tab>
    <d-tab id="tab2" title="Tab2">
      <p>Tab2 Content</p>
    </d-tab>
    <d-tab id="tab3" title="Tab3">
      <p>Tab3 Content</p>
    </d-tab>
  </d-tabs>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const id = ref('tab1');
    return {
      id,
    };
  },
});
</script>
```

:::

### Slider 类型

:::demo

```vue
<template>
  <d-tabs type="slider" v-model="id">
    <d-tab id="tab1" title="Tab1">
      <p>Tab1 Content</p>
    </d-tab>
    <d-tab id="tab2" title="Tab2">
      <p>Tab2 Content</p>
    </d-tab>
    <d-tab id="tab3" title="Tab3">
      <p>Tab3 Content</p>
    </d-tab>
  </d-tabs>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const id = ref('tab1');
    return {
      id,
    };
  },
});
</script>
```

:::

### 禁用选项卡

:::demo

```vue
<template>
  <d-tabs v-model="id">
    <d-tab id="tab1" title="Tab1" disabled>
      <p>Tab1 Content</p>
    </d-tab>
    <d-tab id="tab2" title="Tab2">
      <p>Tab2 Content</p>
    </d-tab>
    <d-tab id="tab3" title="Tab3">
      <p>Tab3 Content</p>
    </d-tab>
  </d-tabs>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const id = ref('tab2');
    return {
      id,
    };
  },
});
</script>
```

:::

### 拦截 tab 切换

:::demo

```vue
<template>
  <d-tabs v-model="id" :before-change="beforeChange" @active-tab-change="activeTabChange">
    <d-tab id="tab1" title="Tab1">
      <p>Tab1 Content</p>
    </d-tab>
    <d-tab id="tab2" title="Tab2">
      <p>Tab2 Content</p>
    </d-tab>
    <d-tab id="tab3" title="Tab3">
      <p>Tab3 Content</p>
    </d-tab>
  </d-tabs>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const id = ref('tab3');
    const beforeChange = (tab) => {
      if (tab === 'tab1') {
        id.value = 'tab2';
        return false;
      } else {
        return true;
      }
    };
    const activeTabChange = (id) => {
      console.log(id, 'activeTabChange');
    };
    return {
      id,
      beforeChange,
      activeTabChange,
    };
  },
});
</script>
```

:::

### 自定义模板

:::demo

```vue
<template>
  <d-tabs v-model="id">
    <d-tab id="tab1" title="Tab1">
      <template v-slot:title><d-icon name="code" class="mr-xxs" />代码</template>
      <p>Tab1 Content</p>
    </d-tab>
    <d-tab id="tab2" title="Tab2">
      <template v-slot:title><d-icon name="merge-request" class="mr-xxs" />合并请求</template>
      <p>Tab2 Content</p>
    </d-tab>
    <d-tab id="tab3" title="Tab3">
      <template v-slot:title><d-icon name="help" class="mr-xxs" />Issues</template>
      <p>Tab3 Content</p>
    </d-tab>
  </d-tabs>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const id = ref('tab3');
    return {
      id,
    };
  },
});
</script>
```

:::

### Tabs 参数

| 参数          | 类型                    | 默认   | 说明                                                                                                        |
| ------------- | ----------------------- | ------ | ----------------------------------------------------------------------------------------------------------- |
| type          | [ITabsType](#itabstype) | 'tabs' | 可选，选项卡组的类型                                                                                        |
| show-content  | `boolean`               | true   | 可选，是否显示选项卡对应的内容                                                                              |
| v-model       | `string`                | --     | 可选，当前激活的选项卡，值为选项卡的 id                                                                     |
| custom-width  | `string`                | --     | 可选，自定义选项卡的宽                                                                                      |
| vertical      | `boolean`               | false  | 可选，是否垂直显                                                                                            |
| before-change | `function\|Promise`     | --     | tab 切换前的回调函数,返回 boolean 类型，返回 false 可以阻止 tab 的切换                                      |
| reactivable   | `boolean`               | false  | 可选，点击当前处于激活态的 tab 时是否触发`active-tab-change`事件，<br>`true`为允许触发，`false`为不允许触发 |

### Tabs 事件

| 参数              | 类型                       | 说明                                                |
| ----------------- | -------------------------- | --------------------------------------------------- |
| active-tab-change | `function(string\|number)` | 可选，选项卡切换的回调函数，返回当前激活选项卡的 id |

### Tab 参数

| 参数     | 类型             | 默认  | 说明                                   |
| -------- | ---------------- | ----- | -------------------------------------- |
| id       | `number\|string` | --    | 可选，选项卡的 id 值, 需要设置为唯一值 |
| title    | `string`         | --    | 可选，选项卡的标题                     |
| disabled | `boolean`        | false | 可选，选项卡是否不可用                 |

### Tab 插槽

| 名称  | 说明             |
| ----- | ---------------- |
| title | 自定义选项卡标题 |

### 类型定义

#### ITabsType

```ts
type ITabsType = 'tabs' | 'pills' | 'options' | 'wrapped' | 'slider';
```
