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
  <d-tabs type="options" v-model="id" custom-width="100px">
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

### 添加/删除

添加和删除选项卡

#### tabs

在 d-tabs 上设置 `closeable`、`addable`可显示关闭和新增 tab 的按钮。`tab-add`和`tab-remove`事件分别在添加和删除按钮被点击时触发。

:::demo

```vue
<template>
  <d-tabs v-model="editableId" closeable addable @tab-add="tabAdd" @tab-remove="tabRemove" @tab-change="onTabChange">
    <d-tab v-for="tab in tabs" :key="tab.id" :id="tab.id" :title="tab.title">
      <p>{{ tab.title }} Content</p>
    </d-tab>
  </d-tabs>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const editableId = ref('tab1');
    const tabs = ref([
      { id: 'tab1', title: 'Tab1' },
      { id: 'tab2', title: 'Tab2' },
      { id: 'tab3', title: 'Tab3' },
    ]);
    const tabAdd = () => {
      for (let i = 1; i <= tabs.value.length + 1; i++) {
        if (!tabs.value.find((item) => item.id === `tab${i}`)) {
          tabs.value.push({ id: `tab${i}`, title: `Tab${i}` });
          break;
        }
      }
    };
    const tabRemove = (targetTab) => {
      if (tabs.value.length === 1) {
        return;
      }
      const tempTabs = tabs.value;
      let activeName = editableId.value;

      if (activeName === targetTab.id) {
        tempTabs.forEach((tab, index) => {
          if (tab.id === targetTab.id) {
            const nextTab = tempTabs[index + 1] || tempTabs[index - 1];
            if (nextTab) {
              activeName = nextTab.id;
            }
          }
        });
      }

      editableId.value = activeName;
      tabs.value = tempTabs.filter((tab) => tab.id !== targetTab.id);
    };

    const onTabChange = (id, type) => {
      console.log(id);
      console.log(type);
    };
    return {
      editableId,
      tabs,
      tabAdd,
      tabRemove,
      onTabChange,
    };
  },
});
</script>
```

:::

#### tab

d-tab 的关闭按钮可单独控制，d-tabs 的 `closeable`属性为 true 时，d-tab 的`closeable`属性不生效。

:::demo

```vue
<template>
  <d-tabs v-model="soloEditableId">
    <d-tab v-for="tab in soloTabs" :key="tab.id" :id="tab.id" :title="tab.title" :closeable="tab.closeable">
      <p>{{ tab.title }} Content</p>
    </d-tab>
  </d-tabs>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const soloEditableId = ref('tab1');
    const soloTabs = ref([
      { id: 'tab1', title: 'Tab1', closeable: true },
      { id: 'tab2', title: 'Tab2', closeable: true },
      { id: 'tab3', title: 'Tab3', closeable: false },
    ]);

    return {
      soloEditableId,
      soloTabs,
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

### 标签位置的设置

可以通过 `tab-position` 设置标签的位置，一共有四个方向的设置 `'top' | 'right' | 'bottom' | 'left'`

:::demo

```vue
<template>
  <div>
    <d-radio-group direction="row" v-model="tabPosition">
      <d-radio-button v-for="item in groupFilterList1" :key="item" :value="item">
        {{ item }}
      </d-radio-button>
    </d-radio-group>
    <d-tabs :tab-position="tabPosition" v-model="tabPositionId">
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
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const tabPositionId = ref('tab1');
    const tabPosition = ref('top');
    const groupFilterList1 = ref(['top', 'right', 'bottom', 'left']);
    return {
      tabPositionId,
      tabPosition,
      groupFilterList1,
    };
  },
});
</script>
```

:::

### Tabs 参数

| 参数          | 类型                                  | 默认   | 说明                                                                                                        |
| ------------- | ------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------- |
| type          | [ITabsType](#itabstype)               | 'tabs' | 可选，选项卡组的类型                                                                                        |
| show-content  | `boolean`                             | true   | 可选，是否显示选项卡对应的内容                                                                              |
| v-model       | `string`                              | --     | 可选，当前激活的选项卡，值为选项卡的 id                                                                     |
| custom-width  | `string`                              | --     | 可选，自定义选项卡的宽                                                                                      |
| vertical      | `boolean`                             | false  | 可选，是否垂直显                                                                                            |
| before-change | `function\|Promise`                   | --     | tab 切换前的回调函数,返回 boolean 类型，返回 false 可以阻止 tab 的切换                                      |
| reactivable   | `boolean`                             | false  | 可选，点击当前处于激活态的 tab 时是否触发`active-tab-change`事件，<br>`true`为允许触发，`false`为不允许触发 |
| closeable     | `boolean`                             | false  | 可选，是否显示删除 tab 图标                                                                                 |
| addable       | `boolean`                             | false  | 可选，是否显示添加 tab 图标                                                                                 |
| tab-position  | [ITabPositionType](#itabpositiontype) | 'top'  | 可选，选项卡所在的位置                                                                                      |

### Tabs 事件

| 参数              | 类型                       | 说明                                                                               |
| ----------------- | -------------------------- | ---------------------------------------------------------------------------------- |
| active-tab-change | `function(string\|number)` | 可选，选项卡切换的回调函数，返回当前激活选项卡的 id                                |
| tab-remove        | `function(tab, event)`     | 可选，点击 tab 移除按钮时触发， `tab`是删除的 tab 对象                             |
| tab-add           | `function()`               | 可选，点击 tab 新增按钮时触发                                                      |
| tab-change        | `function(string\|number)` | 可选，添加、删除 tab 的回调函数，返回操作的选项卡 id 和 operation（add \| delete） |

### Tab 参数

| 参数      | 类型             | 默认  | 说明                                                               |
| --------- | ---------------- | ----- | ------------------------------------------------------------------ |
| id        | `number\|string` | --    | 可选，选项卡的 id 值, 需要设置为唯一值                             |
| title     | `string`         | --    | 可选，选项卡的标题                                                 |
| disabled  | `boolean`        | false | 可选，选项卡是否不可用                                             |
| closeable | `boolean`        | false | 可选，选项卡是否可关闭，tabs 的 closeable 为 true 时，该属性不生效 |

### Tab 插槽

| 名称  | 说明             |
| ----- | ---------------- |
| title | 自定义选项卡标题 |

### 类型定义

#### ITabsType

```ts
type ITabsType = 'tabs' | 'pills' | 'options' | 'wrapped' | 'slider';
```

#### ITabPositionType

```ts
type ITabPositionType = 'top' | 'right' | 'bottom' | 'left';
```
