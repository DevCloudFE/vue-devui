# Toast 全局通知

全局信息提示组件。

#### 何时使用

当需要向用户全局展示提示信息时使用，显示数秒后消失。

### 基本用法

:::demo

```vue
<template>
  <div class="demo-spacing">
    <d-button @click="showToast">Success</d-button>
  </div>
</template>

<script>
export default {
  methods: {
    showToast() {
      this.$toast({
        value: [
          {
            severity: 'success',
            summary: 'summary',
            content: 'I am success content I am success content I am success content I am success content I am success content',
          },
          {
            severity: 'info',
            summary: 'summary',
            content: 'I am info content',
          },
        ],
      });
    },
  },
};
</script>
```

:::
