# Drawer

A floating panel assembly that slides out from the edge of the screen.

#### When To Use

1. The drawer slides in from the edge of the parent form and covers part of the parent form's contents. Users don't have to leave the current task while operating inside the drawer, and can smoothly return to the original task when the operation is completed.
2. When you need an additional panel to control the contents of the parent form, this panel is called out when needed. For example, to control the display style of the interface, add content to the interface.
3. When temporary tasks need to be inserted into the current task flow to create or preview additional content. For example, displaying the terms of an agreement and creating subobjects.

### Basic Usage

:::demo Slides out from the right by default with a width of `300px`.

```vue
<template>
  <d-button variant="solid" color="primary" @click="showDrawer">Click Me</d-button>
  <d-drawer v-model="visible" style="padding: 20px;">Hello Drawer</d-drawer>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);
    const showDrawer = () => (visible.value = true);

    return { visible, showDrawer };
  },
});
</script>
```

:::

### Left Pop-up

:::demo Sets the left slideout via `position`.

```vue
<template>
  <d-button variant="solid" color="primary" @click="showDrawer">Click Me</d-button>
  <d-drawer v-model="visible" position="left" style="padding: 20px;">Left Drawer</d-drawer>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);
    const showDrawer = () => (visible.value = true);

    return { visible, showDrawer };
  },
});
</script>
```

:::

### Background Scroll

:::demo drawer After sliding out, the default background scroll is locked, which can be unlocked by setting `lock-scroll` to `false`.

```vue
<template>
  <d-button variant="solid" color="primary" @click="showDrawer">Click Me</d-button>
  <d-drawer v-model="visible" :lock-scroll="false" style="padding: 20px;">Background can be scrolled</d-drawer>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const visible = ref(false);
    const showDrawer = () => (visible.value = true);

    return { visible, showDrawer };
  },
});
</script>
```

:::

### Pre-close Callback

:::demo `before-close` is called when the user closes the drawer, which can be done by executing the `done` function after certain asynchronous operations have been completed.

```vue
<template>
  <d-button variant="solid" color="primary" @click="showDrawer">Click Me</d-button>
  <d-drawer v-model="visible" :before-close="onBeforeClose" style="padding: 20px;">Delay Close</d-drawer>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);
    const showDrawer = () => (visible.value = true);
    const onBeforeClose = (done) => {
      new Promise((resolve) => {
        setTimeout(resolve, 1000);
      }).then(done);
    };

    return { visible, showDrawer, onBeforeClose };
  },
});
</script>
```

:::

### Service Method

The :::demo component registers `$drawerService` globally, which can be used as a service, with the content of the drawer passed in as the `content` parameter. The service returns the `close` method for closing the drawer.

```vue
<template>
  <d-button variant="solid" color="primary" @click.native="showDrawer()">服务方式</d-button>
</template>

<script>
import { defineComponent, h } from 'vue';

export default defineComponent({
  setup() {
    function showDrawer() {
      this.$drawerService.open({
        content: () => h('div', { style: { padding: '20px' } }, [h('span', {}, ['Open drawer board in service mode'])]),
      });
    }

    return { showDrawer };
  },
});
</script>
```

:::

### Drawer Props

| Parameter              | Type             | Default | Description                                                                          | Jump to Demo                              |
| :--------------------- | :--------------- | :------ | :----------------------------------------------------------------------------------- | :---------------------------------------- |
| v-model                | `Boolean`        | `false` | Optional, set whether the drawer panel is visible or not                             | [Basic Usage](#basic-usage)               |
| position               | `String`         | `right` | Optional, where the drawer panel appears, 'left' or 'right'                          | [Left Pop-up](#left-pop-up)               |
| show-overlay           | `Boolean`        | `true`  | Optional, with or without masking layer                                              | [Basic Usage](#basic-usage)               |
| lock-scroll            | `Boolean`        | `true`  | Optional, whether to lock scrolling                                                  | [Background Scroll](#background-scroll)   |
| z-index                | `Number`         | `1000`  | Optional, set the z-index value of the drawer                                        | [Pre-close Callback](#pre-close-callback) |
| esc-key-closeable      | `Boolean`        | `true`  | Optional, set whether the drawer layer can be closed with the esc button.            | [Basic Usage](#basic-usage)               |
| close-on-click-overlay | `Boolean`        | `true`  | Optional, sets whether the drawer layer can be closed by clicking on the background. | [Basic Usage](#basic-usage)               |
| before-close           | `(done) => void` | `-`     | Optional, callback before closing the window, call `done` to close the drawer.       | [Pre-close Callback](#pre-close-callback) |

### Drawer Events

| Parameter | Type | Description                  |
| :-------- | :--- | :--------------------------- |
| open      | `-`  | drawer triggered when opened |
| close     | `-`  | drawer triggered when closed |

### Drawer Slots

| Name    | Type      | Description           | Jump to Demo                |
| :------ | :-------- | :-------------------- | :-------------------------- |
| default | `default` | drawer board contents | [Basic Usage](#basic-usage) |
