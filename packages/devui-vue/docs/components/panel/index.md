# Panel 面板

内容面板，用于内容分组。

#### 何时使用

当页面内容需要进行分组显示时使用，一般包含头部、内容区域、底部三个部分。

### 基本用法

:::demo

```vue
<template>
  <d-panel>
    <d-panel-header>Click me to expand</d-panel-header>
    <d-panel-body>This is body</d-panel-body>
  </d-panel>
</template>
```

:::

### 默认状态

:::demo 通过设置`is-collapsed`为`true`可以默认展开面板。

```vue
<template>
  <d-panel :is-collapsed="true">
    <d-panel-header>Panel header</d-panel-header>
    <d-panel-body>This is body</d-panel-body>
  </d-panel>
</template>
```

:::

### 面板类型

:::demo 面板类型有5种：`primary` / `success` / `danger` / `warning` / `info`，默认为`info`。

```vue
<template>
  <d-panel :is-collapsed="true">
    <d-panel-header>Panel with info Type</d-panel-header>
    <d-panel-body>This is body</d-panel-body>
  </d-panel>
  <br>
  <d-panel type="primary" :is-collapsed="true">
    <d-panel-header>Panel with primary Type</d-panel-header>
    <d-panel-body>This is body</d-panel-body>
  </d-panel>
  <br>
  <d-panel type="success" :is-collapsed="true">
    <d-panel-header>Panel with success Type</d-panel-header>
    <d-panel-body>This is body</d-panel-body>
  </d-panel>
  <br>
  <d-panel type="warning" :is-collapsed="true">
    <d-panel-header>Panel with warning Type</d-panel-header>
    <d-panel-body>This is body</d-panel-body>
  </d-panel>
  <br>
  <d-panel type="danger" :is-collapsed="true">
    <d-panel-header>Panel with danger Type</d-panel-header>
    <d-panel-body>This is body</d-panel-body>
  </d-panel>
</template>
```

:::

### 面板样式

:::demo

```vue
<template>
  <d-panel @toggle="toggle" :is-collapsed="true" :has-left-padding="false">
    <d-panel-header>
      Panel has no left padding
      <em :class="`icon icon-chevron-${toggleState ? 'down' : 'up'}`"></em>
    </d-panel-header>
    <d-panel-body>This is body</d-panel-body>
  </d-panel>
  <br>
  <d-panel :is-collapsed="true">
    <d-panel-header>Panel with header and footer</d-panel-header>
    <d-panel-body>This is body</d-panel-body>
    <d-panel-footer>This is footer</d-panel-footer>
  </d-panel>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const toggleState = ref(true);

    const toggle = (value) => {
      toggleState.value = value;
    };

    return {
      toggle,
      toggleState
    };
  }
});
</script>
```

:::

### 阻止折叠

:::demo 我们可以使用`before-toggle`来阻止面板的收起。根据条件判断，当`Panel`展开时，点击阻止折叠按钮，将无法折叠`Panel`，当`Panel`展开时不影响操作。

```vue
<template>
  <d-panel
    type="primary"
    :is-collapsed="isCollapsed"
    @toggle="handleToggle"
    :before-toggle="beforeToggle"
  >
    <d-panel-header>
      Panel header
      <i :class="`icon-chevron-${toggle ? 'down' : 'up'}`"></i>
    </d-panel-header>
    <d-panel-body>This is body</d-panel-body>
  </d-panel>
  <br>
  <d-button @click="panelToggle = !panelToggle">
    {{ panelToggle ? '阻止折叠' : '允许折叠' }}
  </d-button>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    let isCollapsed = ref(true);
    let panelToggle = ref(true);
    let toggle = ref(true);
    let showAnimation = ref(true);

    const handleToggle = (value) => {
      toggle.value = value;
    };
    
    const beforeToggle = () => {
      return panelToggle.value;
    };

    return {
      toggle,
      panelToggle,
      beforeToggle,
      isCollapsed,
      handleToggle,
    };
  }
});
</script>
```
:::

### Panel 参数

| 参数名           | 类型                                          | 默认   | 说明                                                                                               |
| :--------------- | :-------------------------------------------- | :----- | :------------------------------------------------------------------------------------------------- |
| type             | [PanelType](#paneltype)                       | 'info' | 可选，面板的类型                                                                                   |
| is-collapsed     | `boolean`                                     | false  | 可选，是否默认展开                                                                                 |
| has-left-padding | `boolean`                                     | true   | 可选，是否显示左侧填充                                                                             |
| show-animation   | `boolean`                                     | true   | 可选，是否显示动画                                                                                 |
| before-toggle    | `(value: boolean, done?: () => void) => void` | --     | 可选，面板折叠状态改变前的回调函数。<br>参数`value`代表当前状态，<br>参数`done()`可以控制Panel开合 |

### Panel 事件

| 事件名 | 类型                       | 说明                 |
| :----- | :------------------------- | :------------------- |
| toggle | `(value: boolean) => void` | 可选，切换面板的事件 |

### Panel 类型定义

#### PanelType

```ts
export type PanelType = 'primary' | 'success' | 'danger' | 'warning' | 'info';
```
