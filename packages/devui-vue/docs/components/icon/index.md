# Icon 图标

用于显示图标。

#### 何时使用

需要显示图标时。

所有内置的图标可在 DevUI 官网进行查看：[https://devui.design/icon/ruleResource](https://devui.design/icon/ruleResource)

### 基本用法

:::demo 通过`name`属性，指定需要显示的图标，支持 DevUI 图标库图标和 URL 形式的图标。

```vue
<template>
  <div class="demo-spacing">
    <d-icon name="like"></d-icon>
    <d-icon name="https://devui.design/components/assets/logo.svg" size="16px"></d-icon>
  </div>
</template>
```

:::

### 颜色

:::demo 通过`color`属性指定图标的颜色。

```vue
<template>
  <div class="demo-spacing">
    <d-icon name="right-o" color="#3DCCA6"></d-icon>
    <d-icon name="error-o" color="#F66F6A"></d-icon>
  </div>
</template>
```

:::

### 尺寸

:::demo 通过`size`属性，设置图标尺寸。

```vue
<template>
  <div class="demo-spacing">
    <d-icon name="insert-image"></d-icon>
    <d-icon name="insert-image" size="32px"></d-icon>
  </div>
</template>
```

:::

### 自定义字体图标

Icon 组件默认引用 DevUI 图标库的图标，如果需要在现有 Icon 的基础上使用更多图标，可以引入第三方 iconfont 对应的字体文件和 CSS 文件，之后就可以在 Icon 组件中直接使用。

```css
@font-face {
  font-family: 'my-icon';
  src: url('./my-icon.ttf') format('truetype');
}

.my-icon {
  font-family: 'my-icon';
}

.my-icon-right::before {
  content: '\E03F';
}
```

引入字体图标的 css

```css
@import 'my-icon.css';
```

使用

```html
<d-icon class-prefix="my-icon" name="right"></d-icon>
```

### 自定义svg

可以借助 [vite-plugin-vue-svg](https://www.npmjs.com/package/vite-plugin-vue-svg)，将 svg component 传入，实现自定义 svg。

```vue
<template>
  <d-icon :component="MySvgIcon"></d-icon>
</template>
<script>
import { defineComponent } from 'vue';
import MySvgIcon from '../../assets/logo.svg';

export default defineComponent({
  setup() {
    return {
      MySvgIcon,
    };
  },
});
</script>
```

### Icon 参数

| 参数名       | 类型           | 默认      | 说明                     | 跳转 Demo                         |
| :----------- | :------------- | :-------- | :----------------------- | :-------------------------------- |
| name         | `String`       | --        | 必选，图标名称           | [基本用法](#基本用法)             |
| size         | `String`       | '16px'    | 可选，图标尺寸           | [尺寸](#尺寸)                     |
| color        | `String`       | '#252b3a' | 可选，图标颜色           | [颜色](#颜色)                     |
| class-prefix | `String`       | 'icon'    | 可选，自定义字体图标前缀 | [自定义字体图标](#自定义字体图标) |
| component    | `VueComponent` | null      | 可选，自定义 svg 图标    | [自定义svg](#自定义svg)          |
