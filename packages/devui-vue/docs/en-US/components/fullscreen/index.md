# Fullscreen 全屏

全屏组件。

#### 何时使用

当用户需要将某一区域进行全屏展示时。

### 基本用法

:::demo 将需要全屏的容器包裹在`<d-fullscreen>`标签里面，通过`v-model`控制全屏状态，传入`true`则启动全屏，设置成`false`则退出全屏，也可以通过按下`ESC`快捷键推出全屏。本例还展示了自定义层级`z-index`的用法。

```vue
<template>
  <d-fullscreen v-model="isOpen" :z-index="20">
    <div class="demo-fullscreen-container">
      <d-button @click="isOpen = !isOpen">{{ btnContent }}</d-button>
    </div>
  </d-fullscreen>
</template>
<script>
import { ref, watch } from 'vue';

export default {
  setup() {
    const isOpen = ref(false);
    const btnContent = ref('全屏');

    watch(isOpen, (newVal) => {
      if (newVal) {
        btnContent.value = '退出全屏';
      } else {
        btnContent.value = '全屏';
      }
    });

    return {
      isOpen,
      btnContent,
    };
  },
};
</script>
<style>
.demo-fullscreen-container {
  margin: 8px;
}
</style>
```

:::

### 全屏模式

:::demo 通过`mode`设置全屏模式，默认为`normal`普通全屏，全屏之后容器将充满整个浏览器窗口，`mode`设置成`immersive`可以启用沉浸式全屏，让容器充满整个电脑屏幕。<br>不管是普通全屏还是沉浸式全屏，都支持按下快捷键`ESC`退出全屏。

```vue
<template>
  <d-fullscreen v-model="isOpenNormal" :z-index="20">
  <div class="demo-fullscreen-container">
      <d-button @click="isOpenNormal = !isOpenNormal">{{ btnContentNormal }}</d-button>
    </div>
  </d-fullscreen>
  
  <d-fullscreen v-model="isOpenImmersive" mode="immersive">
  <div class="demo-fullscreen-container">
      <d-button @click="isOpenImmersive = !isOpenImmersive">{{ btnContentImmersive }}</d-button>
    </div>
  </d-fullscreen>
</template>
<script>
import { ref, watch } from 'vue';

export default {
  setup() {
    const isOpenNormal = ref(false);
    const btnContentNormal = ref('普通全屏');

    watch(isOpenNormal, (newVal) => {
      if (newVal) {
        btnContentNormal.value = '退出全屏';
      } else {
        btnContentNormal.value = '普通全屏';
      }
    });

    const isOpenImmersive = ref(false);
    const btnContentImmersive = ref('沉浸式全屏');

    watch(isOpenImmersive, (newVal) => {
      if (newVal) {
        btnContentImmersive.value = '退出全屏';
      } else {
        btnContentImmersive.value = '沉浸式全屏';
      }
    });

    return {
      isOpenNormal,
      btnContentNormal,
      isOpenImmersive,
      btnContentImmersive,
    };
  },
};
</script>
```

:::

### Fullscreen 参数

| 参数名  | 类型                      | 默认     | 说明               | 跳转 Demo             |
| :------ | :------------------------ | :------- | :----------------- | :-------------------- |
| v-model | `boolean`                 | false    | 可选，是否启动全屏 | [基本用法](#基本用法) |
| mode    | `'normal' \| 'immersive'` | 'normal' | 可选，设置全屏模式 | [全屏模式](#全屏模式) |
| z-index | `number`                  | 10       | 可选，设置全屏层级 | [基本用法](#基本用法) |

### Fullscreen 插槽

| 插槽名  | 说明               | 参数 |
| :------ | :----------------- | :--- |
| default | 默认插槽，全屏容器 | --   |

