# Fullscreen 全屏

全屏组件。

### 何时使用

当用户需要将某一区域进行全屏展示时。

### 普通全屏

充满当前浏览器窗口的普通全屏。

:::demo

```vue
<template>
  <d-fullscreen v-model="isOpen" :zIndex="20">
    <div>
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
      btnContent,
      isOpen,
    };
  },
};
</script>
```

:::

### 沉浸式全屏

充满整个显示器屏幕的沉浸式全屏。

:::demo

```vue
<template>
  <d-fullscreen v-model="isOpen" mode="immersive">
    <div>
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
      btnContent,
      isOpen,
    };
  },
};
</script>
```

:::

### 参数及 API

|  参数   |          类型           |   默认   | 说明               |
| :-----: | :---------------------: | :------: | :----------------- |
| v-model |        `Boolean`        |  false   | 可选，是否启动全屏 |
|  mode   | `immersive` 或 `normal` | `normal` | 可选，设置全屏模式 |
| z-index |        `Number`         |    10    | 可选，设置全屏层级 |
