# Dashboard 仪表盘

仪表盘组件支持各类挂件 grid 风格进行布局

### 何时使用

当需要进行批量不同类型数据展示时使用

### 基本用法

:::demo

```vue
<template>
  <d-button @click="changePosition">Change Position</d-button>
  <d-dashboard>
    <d-dashboard-widget :x="widget.x" :y="widget.y" :w="widget.w" :h="widget.h">
      <d-countdown :value="deadline" />
    </d-dashboard-widget>
    <d-dashboard-widget>2</d-dashboard-widget>
    <d-dashboard-widget>3</d-dashboard-widget>
  </d-dashboard>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const widget = ref({
      x: 0,
      y: 0,
      w: 2,
      h: 2
    })
    const deadline = ref(Date.now() + 100 * 1000);
    const changePosition = () => {
      widget.value.x = 2;
      widget.value.y = 2;
    }
    return {
      deadline,
      widget,
      changePosition
    };
  },
});
</script>

<style></style>
```

:::

### Dashboard 参数

| 参数 | 类型 | 默认 | 说明 | 跳转 Demo | 全局配置项 |
| ---- | ---- | ---- | ---- | --------- | ---------- |
|      |      |      |      |           |            |
|      |      |      |      |           |            |
|      |      |      |      |           |            |

### Dashboard 事件

| 事件 | 类型 | 说明 | 跳转 Demo |
| ---- | ---- | ---- | --------- |
|      |      |      |           |
|      |      |      |           |
|      |      |      |           |

### Dashboar-Widget 组件
