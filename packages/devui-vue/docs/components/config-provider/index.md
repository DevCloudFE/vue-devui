# ConfigProvider 全局化配置

用来提供全局的配置选项，让你的配置能够在全局都能够被访问到，ConfigProvider 使用了 [Vue 的 provide/inject 特性](https://v3.cn.vuejs.org/guide/composition-api-provide-inject.html)

### 如何使用

通过全局配置项功能定义组件的默认行为，可以减少重复的参数设置

### 基本用法

:::demo 通过 `size` 设置全局组件大小(现仅支持 `button`)

```vue
<template>
  <div style="display: flex; gap: 20px;">
    <d-config-provider size="lg">
      <d-button>lg</d-button>
    </d-config-provider>

    <d-button>default</d-button>

    <d-config-provider size="sm">
      <d-button>sm</d-button>
    </d-config-provider>
  </div>
</template>
```

:::

### API

d-config-provider 参数

| 参数 | 类型                     | 默认 | 说明           |
| ---- | ------------------------ | ---- | -------------- |
| size | `'lg'\|'md'\|'sm'\|'xs'` | 'md' | 可选，组件大小 |
