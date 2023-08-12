# Drawer 抽屉板

屏幕边缘滑出的浮层面板组件。

#### 何时使用

1. 抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到到原任务。
2. 当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。
3. 当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。

### 基本用法

:::demo 默认从右侧滑出，宽度为`300px`。

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

### 左侧弹出

:::demo 通过`position`设置左侧滑出。

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

### 背景滚动

:::demo drawer 滑出之后，默认背景滚动会被锁定，可通过`lock-scroll`设置为`false`来解锁。

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

### 关闭前回调

:::demo `before-close`在用户关闭 drawer 时会被调用，可在完成某些异步操作后，通过执行`done`函数关闭。

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

### 服务方式

:::demo 组件在全局注册了`$drawerService`，可通过服务的方式使用，drawer 的内容通过`content`参数传入。服务返回了用于关闭 drawer 的`close`方法。

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

### Drawer 参数

| 参数名                 | 类型             | 默认    | 说明                                              | 跳转 Demo                 |
| :--------------------- | :--------------- | :------ | :------------------------------------------------ | :------------------------ |
| v-model                | `Boolean`        | `false` | 可选，设置抽屉板是否可见                          | [基本用法](#基本用法)     |
| position               | `String`         | `right` | 可选，抽屉板出现的位置，'left'或者'right'         | [左侧弹出](#左侧弹出)     |
| show-overlay           | `Boolean`        | `true`  | 可选，是否有遮罩层                                | [基本用法](#基本用法)     |
| lock-scroll            | `Boolean`        | `true`  | 可选，是否锁定滚动                                | [背景滚动](#背景滚动)     |
| z-index                | `Number`         | `1000`  | 可选，设置 drawer 的 z-index 值                   | [基本用法](#基本用法)     |
| esc-key-closeable      | `Boolean`        | `true`  | 可选，设置可否通过 esc 按键来关闭 drawer 层       | [基本用法](#基本用法)     |
| close-on-click-overlay | `Boolean`        | `true`  | 可选，设置可否通过点击背景来关闭 drawer 层        | [基本用法](#基本用法)     |
| before-close           | `(done) => void` | `-`     | 可选，关闭窗口前的回调，调用 `done` 可关闭 drawer | [关闭前回调](#关闭前回调) |

### Drawer 事件

| 事件名 | 类型 | 说明              |
| :----- | :--- | :---------------- |
| open   | `-`  | drawer 打开时触发 |
| close  | `-`  | drawer 关闭时触发 |

### Drawer 插槽

| 插槽名  | 类型 | 说明       | 跳转 Demo             |
| :------ | :--- | :--------- | :-------------------- |
| default | 默认 | 抽屉板内容 | [基本用法](#基本用法) |
