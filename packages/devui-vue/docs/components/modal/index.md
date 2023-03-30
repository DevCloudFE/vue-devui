# Modal 模态弹窗

模态框。

#### 何时使用

1.需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。

2.Modal 起到与用户进行交互的作用，用户可以在 Modal 中输入信息、阅读提示、设置选项等操作。

### 基础用法

:::demo `v-model`双向绑定，控制 Modal 是否显示；`title`参数设置 Modal 标题。

```vue
<template>
  <d-button @click="handleClick">打开 modal</d-button>
  <d-modal v-model="visible" title="Start Snapshot Version">
    <div>name: {{ data.name }}</div>
    <div>age: {{ data.age }}</div>
    <div>address: {{ data.address }}</div>
  </d-modal>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);
    const data = reactive({
      name: 'Tom',
      age: 20,
      address: 'Chengdu',
    });
    const handleClick = () => {
      visible.value = true;
    };

    return { visible, data, handleClick };
  },
});
</script>
```

:::

### 保留最后一次关闭位置

:::demo `keep-last`可使当前modal再次打开时保留上次关闭位置。

```vue
<template>
  <d-button @click="handleClick">打开 modal</d-button>
  <d-modal v-model="visible" title="Start Keep Last" :keep-last="true">
    <div>name: {{ data.name }}</div>
    <div>age: {{ data.age }}</div>
    <div>address: {{ data.address }}</div>
  </d-modal>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);
    const data = reactive({
      name: 'Tom',
      age: 20,
      address: 'Chengdu',
    });
    const handleClick = () => {
      visible.value = true;
    };

    return { visible, data, handleClick };
  },
});
</script>
```

:::

### 自定义标题和操作按钮

:::demo `header`插槽可以自定义 Modal 顶部区域，子组件`d-modal-header`为顶部区域提供了默认样式，自定义样式可通过在子组件设置`style/class`实现。`footer`插槽同理。

```vue
<template>
  <d-button @click="handleClick">打开 modal</d-button>
  <d-modal v-model="visible">
    <template #header>
      <d-modal-header>
        <d-icon name="like"></d-icon>
        <span>Good Title</span>
      </d-modal-header>
    </template>
    <div>name: {{ data.name }}</div>
    <div>age: {{ data.age }}</div>
    <div>address: {{ data.address }}</div>
    <template #footer>
      <d-modal-footer style="text-align: right; padding-right: 20px;">
        <d-button @click="hidden">取消</d-button>
        <d-button @click="hidden">确认</d-button>
      </d-modal-footer>
    </template>
  </d-modal>
</template>
<script>
import { ref, defineComponent, reactive } from 'vue';
export default defineComponent({
  setup() {
    const visible = ref(false);
    const data = reactive({
      name: 'Tom',
      age: 20,
      address: 'Chengdu',
    });
    const handleClick = () => {
      visible.value = true;
    };
    const hidden = () => {
      visible.value = false;
    };

    return { visible, data, handleClick, hidden };
  },
});
</script>
```

:::

### 信息提示

:::demo 各种类型的信息提示框。

```vue
<template>
  <d-button class="mr-1" @click="handleClick('success')">success</d-button>
  <d-button class="mr-1" @click="handleClick('failed')">failed</d-button>
  <d-button class="mr-1" @click="handleClick('warning')">warning</d-button>
  <d-button class="mr-1" @click="handleClick('info')">info</d-button>
  <d-modal v-model="visible" title="Start Snapshot Version" :type="type">
    <div>name: {{ data.name }}</div>
    <div>age: {{ data.age }}</div>
    <div>address: {{ data.address }}</div>
  </d-modal>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);
    const type = ref('');
    const data = reactive({
      name: 'Tom',
      age: 20,
      address: 'Chengdu',
    });
    const handleClick = (t: string) => {
      visible.value = true;
      type.value = t;
    };

    return { visible, data, handleClick, type };
  },
});
</script>
```

:::

### 关闭前回调

:::demo `before-close`在用户点击关闭按钮或者遮罩层时会被调用，可在完成某些异步操作后，通过`done`参数关闭。

```vue
<template>
  <d-button @click="handleClick">打开 modal</d-button>
  <d-modal v-model="visible" :before-close="beforeClose" style="width: 500px;">
    <div>name: {{ data.name }}</div>
    <div>age: {{ data.age }}</div>
    <div>address: {{ data.address }}</div>
    <template #footer>
      <d-modal-footer style="text-align: right; padding-right: 20px;">
        <d-button @click="hidden">取消</d-button>
        <d-button @click="hidden">确认</d-button>
      </d-modal-footer>
    </template>
  </d-modal>
</template>

<script>
import { ref, defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);
    const data = reactive({
      name: 'Tom',
      age: 20,
      address: 'Chengdu',
    });
    const handleClick = () => {
      visible.value = true;
    };
    const hidden = () => {
      visible.value = false;
    };
    const beforeClose = (done) => {
      new Promise((resolve) => {
        setTimeout(resolve, 1000);
      }).then(done);
    };

    return { visible, data, handleClick, hidden, beforeClose };
  },
});
</script>
```

:::

### Modal 参数

| 参数名                 | 类型                                 | 默认值 | 说明                                       | 跳转 Demo                 |
| :--------------------- | :----------------------------------- | :----- | :----------------------------------------- | :------------------------ |
| v-model                | `boolean`                            | false  | 是否显示 Modal                             | [基础用法](#基础用法)     |
| title                  | `string`                             | -      | 可选，Modal 的标题                         | [基础用法](#基础用法)     |
| keep-last      | `boolean`                            | false   | 可选，是否保留上次移动位置  | [保留最后一次关闭位置](#保留最后一次关闭位置)  
| lock-scroll            | `boolean`                            | true   | 可选，是否将 body 滚动锁定                 |
| close-on-click-overlay | `boolean`                            | true   | 可选，点击空白处是否能关闭 Modal           |
| before-close           | `(done) => void`                     | -      | 可选，关闭前的回调，调用 done 可关闭 Modal | [关闭前回调](#关闭前回调) |
| escapable              | `boolean`                            | true   | 可选，是否支持 esc 键关闭弹窗              |                           |
| show-close             | `boolean`                            | true   | 可选，是否展示关闭按钮                     |                           |
| draggable              | `boolean`                            | true   | 可选，弹框是否可拖拽                       |
| show-animation         | `boolean`                            | true   | 可选，是否显示动画                         |
| show-overlay           | `boolean`                            | true   | 可选，是否展示遮罩层                       |                           |
| append-to-body         | `boolean`                            | true   | 可选，是否将 Modal 提升到 body 层          |                           |
| type                   | success \| failed \| warning \| info | -      | 可选，弹框信息提示                         |

### Modal 插槽

| 插槽名  | 说明              |
| :------ | :---------------- |
| default | Modal 内容        |
| header  | 自定义 Modal 顶部 |
| footer  | 自定义 Modal 底部 |
