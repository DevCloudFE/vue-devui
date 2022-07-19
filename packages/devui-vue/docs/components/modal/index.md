# Modal 模态弹窗

模态对话框。

#### 何时使用

1. 需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。
2. 弹窗起到与用户进行交互的作用，用户可以在对话框中输入信息、阅读提示、设置选项等操作。

### 基本用法

展示模态对话框的基本使用方法。
:::demo

```vue
<template>
  <div class="demo-spacing">
    <d-button @click="dialogVisible1 = true">open modal</d-button>
    <d-modal v-model="dialogVisible1" title="Tips" @open="open" @close="close">
      <span>This is a message</span>
    </d-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dialogVisible1 = ref(false);

const open = () => {
  console.log('open');
};
const close = () => {
  console.log('close');
};
</script>
```

:::

### 自定义标题、按钮和宽度

展示模态对话框的基本使用方法。
:::demo

```vue
<template>
  <div class="demo-spacing">
    <d-button @click="dialogVisible2 = true">open modal</d-button>
    <d-modal v-model="dialogVisible2" width="30%">
      <span>This is a message</span>
      <template #title>
        <d-icon name="like" class="icon"></d-icon>
        <span>Good Title</span>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <d-button @click="dialogVisible2 = false" style="margin-right: 12px;">Cancel</d-button>
          <d-button color="primary" @click="dialogVisible2 = false">Confirm</d-button>
        </span>
      </template>
    </d-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dialogVisible2 = ref(false);
</script>

<style scoped>
.icon {
  margin-right: 4px;
  position: relative;
  top: -1px;
}
</style>
```

:::

### 关闭前回调

展示模态对话框的基本使用方法。
:::demo

```vue
<template>
  <div class="demo-spacing">
    <d-button @click="dialogVisible3 = true">open modal</d-button>
    <d-modal v-model="dialogVisible3" title="Tips" :before-close="beforeClose">
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <d-button @click="dialogVisible3 = false" style="margin-right: 12px;">Cancel</d-button>
          <d-button color="primary" @click="dialogVisible3 = false">Confirm</d-button>
        </span>
      </template>
    </d-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dialogVisible3 = ref(false);

const beforeClose = (done: () => void) => {
  alert('确认关闭?');
  done();
};
</script>
```

:::

### 拖拽弹框

展示模态对话框的基本使用方法。
:::demo

```vue
<template>
  <div class="demo-spacing">
    <d-button @click="dialogVisible4 = true">open modal</d-button>
    <d-modal v-model="dialogVisible4" title="Tips" draggable>
      <span>This is a message</span>
    </d-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dialogVisible4 = ref(false);
</script>
```

:::

### Modal 参数

| 参数名               | 类型                                | 默认  | 说明                                          | 跳转 Demo                                         |
| :------------------- | :---------------------------------- | :---- | :-------------------------------------------- | :------------------------------------------------ |
| v-model / modelValue | boolean                             | -     | 必填，是否显示 Modal                          | [基本用法](#基本用法)                             |
| title                | string                              | -     | 可选，Modal 标题                              | [基本用法](#基本用法)                             |
| width                | string / number                     | 50%   | 可选，Modal 宽度                              | [自定义标题、按钮和宽度](#自定义标题、按钮和宽度) |
| showClose            | boolean                             | true  | 可选，是否显示关闭按钮                        | -                                                 |
| draggable            | boolean                             | false | 可选，Modal 是否可拖拽                        | [拖拽弹框](#拖拽弹框)                             |
| closeOnClickOverlay  | boolean                             | true  | 可选，点击遮罩层是否关闭 Modal                | -                                                 |
| appendToBody         | boolean                             | true  | 可选，Modal 自身是否插入至 body 元素上        | -                                                 |
| beforeClose          | function(done)，done 用于关闭 Modal | true  | 可选，关闭前的回调，会暂停 可选，Modal 的关闭 | -                                                 |

### Modal 插槽

| 插槽名  | 说明                   |
| :------ | :--------------------- |
| title   | Modal 自定义标题       |
| default | Modal 内容             |
| footer  | Modal 按钮操作区的内容 |

### Modal 事件

| 事件名 | 说明             | 参数 |
| :----- | :--------------- | :--- |
| open   | Modal 打开的回调 | -    |
| close  | Modal 关闭的回调 | -    |
