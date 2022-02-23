# Panel 面板

内容面板，用于内容分组。

### 何时使用

当页面内容需要进行分组显示时使用，一般包含头部、内容区域、底部三个部分。

### 基本用法

:::demo

```vue
<template>
  <d-panel type="primary" :isCollapsed="true" :showAnimation="true">
    <d-panel-header>Panel with foldable</d-panel-header>
    <d-panel-body>This is body</d-panel-body>
  </d-panel>
  <br />
  <br />
  <d-panel :toggle="toggle" :isCollapsed="true" :showAnimation="true" :hasLeftPadding="false">
    <d-panel-header>
      Panel has no left padding
      <em :class="`icon icon-chevron-${toggleState ? 'down' : 'up'}`"></em>
    </d-panel-header>
    <d-panel-body>This is body</d-panel-body>
  </d-panel>
  <br />
  <br />
  <d-panel :isCollapsed="true" :beforeToggle="beforeToggle">
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
    const toggle = (e) => (toggleState.value = e);
    const beforeToggle = () => false;
    return {
      toggle,
      toggleState,
      beforeToggle
    };
  }
});
</script>
```

:::

### 多种类型

面板类型分为 default、primary、success，danger、warning、info。

:::demo

```vue
<template>
  <d-panel type="info" :isCollapsed="true" :showAnimation="true">
    <d-panel-header>Panel with info Type</d-panel-header>
    <d-panel-body>This is body</d-panel-body>
  </d-panel>
  <d-panel type="primary" :isCollapsed="true" :showAnimation="true">
    <d-panel-header>Panel with Primary Type</d-panel-header>
    <d-panel-body>This is body</d-panel-body>
  </d-panel>
  <br />
  <br />
  <d-panel type="success" :isCollapsed="true" :showAnimation="true">
    <d-panel-header>Panel with Success Type</d-panel-header>
    <d-panel-body>This is body</d-panel-body>
  </d-panel>
  <br />
  <br />
  <d-panel type="warning" :isCollapsed="true" :showAnimation="true">
    <d-panel-header>Panel with Warning Type</d-panel-header>
    <d-panel-body>This is body</d-panel-body>
  </d-panel>
  <br />
  <br />
  <d-panel type="danger" :isCollapsed="true" :showAnimation="true">
    <d-panel-header>Panel with danger Type</d-panel-header>
    <d-panel-body>This is body</d-panel-body>
  </d-panel>
</template>
```

:::

### 阻止折叠

某种情况下，我们需要阻止面板收起。Panel 提供了这项 API，我们可以使用 beforeToggle 来阻止面板的收起

根据条件判断，当 panel 展开时，点击阻止折叠按钮，将无法折叠 panel。当 panel 展开时不影响操作。

:::demo

```vue
<template>
  <d-panel
    type="primary"
    :hasLeftPadding="padding"
    :toggle="handleToggle"
    :beforeToggle="beforeToggle"
    :showAnimation="showAnimation"
  >
    <d-panel-header>
      Panel with foldable
      <i :class="`icon-arrow-${toggle ? 'down' : 'up'}`"></i>
    </d-panel-header>
    <d-panel-body>This is body</d-panel-body>
  </d-panel>
  <br />
  <br />
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
    let state;
    let padding = ref(false);
    const handleToggle = (e) => {
      toggle.value = e;
    };
    const beforeToggle = (e) => {
      console.log(e);
      return panelToggle.value;
    };
    return {
      state,
      toggle,
      panelToggle,
      beforeToggle,
      isCollapsed,
      handleToggle,
      showAnimation,
      padding
    };
  }
});
</script>
```

:::

### 动态切换

我们以 hasLeftPadding 为例

理论上所有的属性都可以动态切换

:::demo

```vue
<template>
  <d-panel :hasLeftPadding="padding" :isCollapsed="true">
    <d-panel-header>Panel with foldable</d-panel-header>
    <d-panel-body>This is body</d-panel-body>
  </d-panel>
  <br />
  <br />
  <d-button @click="padding = !padding">
    {{ padding ? '有左填充' : '没有左填充' }}
  </d-button>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    let padding = ref(false);
    return {
      padding
    };
  }
});
</script>
```

:::

### API

|      参数      |             类型              |   默认    |                                                    说明                                                     |
| :------------: | :---------------------------: | :-------: | :---------------------------------------------------------------------------------------------------------: |
|      type      |           PanelType           | 'default' |                                              可选，面板的类型                                               |
|    cssClass    |            string             |    --     |                                            可选，自定义 class 名                                            |
|  isCollapsed   |            boolean            |   false   |                                               可选，是否展开                                                |
| hasLeftPadding |            boolean            |   true    |                                           可选，是否显示左侧填充                                            |
| showAnimation  |            boolean            |   true    |                                             可选，是否展示动画                                              |
|  beforeToggle  | Function\|Promise\|Observable |    --     | 可选，面板折叠状态改变前的回调函数，返回 boolean 类型，返回 false 可以阻止面板改变折叠状态 根据条件阻止折叠 |
|     toggle     |           Function            |    --     |     可选，面板当前状态的回调函数，返回 boolean 类型，返回 false 代表面板被收起，返回 true 代表面板展开      |

### 接口&类型定义

```javascript
export type PanelType = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info';
```
