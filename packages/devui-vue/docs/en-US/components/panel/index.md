# Panel

Panels are usually used for grouping

### When to use

it is used when the page content needs to be grouped for display, and generally contains three parts: the head, the content area, and the bottom.

### Quick start

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

### Type

Panels have six types: default, primary, success, danger, warning, info.

:::demo

```vue
<template>
  <d-panel type="info" :isCollapsed="true" :showAnimation="true">
    <d-panel-header>Panel with info Type</d-panel-header>
    <d-panel-body>This is body</d-panel-body>
  </d-panel>
  <br />
  <br />
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

### Prevent Collapse

if you dont want panel to fold. You can use `beforeToggle` properties

If beforeToggle return False. The Panel will can not to fold. But Unaffected when unfolded

::demo

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
    {{ panelToggle ? 'prevent to fold' : 'allow to fold' }}
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

### Properties Dynamic Change

We take hasLeftPadding properties as an example.

Theoretically all properties can dynamic change. We only take hasLeftPadding properties as an example.

:::demo

```vue
<template>
  <d-panel :type="type" :hasLeftPadding="padding" isCollapsed>
    <d-panel-header>Panel with foldable</d-panel-header>
    <d-panel-body>This is body</d-panel-body>
  </d-panel>
  <br />
  <br />
  <d-button @click="padding = !padding">
    {{ padding ? 'hasLeftPadding' : 'notLeftPadding' }}
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

|    Property    |             Type              | Descript  |                                                                                  default Value                                                                                   |
| :------------: | :---------------------------: | :-------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|      type      |           PanelType           | 'default' |                                                                         Optional. Can be set Panel Type                                                                          |
|    cssClass    |            string             |    --     |                                                                        Optional. User-defined class name                                                                         |
|  isCollapsed   |            boolean            |   false   |                                                                 Optional. Optional. Whether to expand the panel                                                                  |
| hasLeftPadding |            boolean            |   true    |                                                                  Optional. Whether to display the left padding                                                                   |
| showAnimation  |            boolean            |   true    |                                                               Optional. Indicating whether to display animations.                                                                |
|  beforeToggle  | Function\|Promise\|Observable |    --     | Optional. Callback function before the panel folding status changes. The value of this parameter is of the boolean type. If false is returned, the panel folding status changes. |
|     toggle     |           Function            |    --     |                                             Optional. Callback upon panel click to return the expanded status of the current panel.                                              |

### declare Interface & type

```javascript
export type PanelType = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info';
```
