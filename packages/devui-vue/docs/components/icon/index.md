# Icon 图标

用于显示图标。

### 何时使用

需要显示图标时。

所有内置的图标可在DevUI官网进行查看：

[https://devui.design/icon/ruleResource](https://devui.design/icon/ruleResource)

### 基本用法

:::demo 通过`name`属性，指定需要显示的图标。

```vue
<d-icon name="like"></d-icon>
<d-icon name="https://devui.design/components/assets/logo.svg" size="16px"></d-icon>
```

:::

### 图标颜色

:::demo 通过`color`属性指定图标的颜色。

```vue
<d-icon name="right-o" color="#50d4ab"></d-icon>
<d-icon name="error-o" color="#f95f5b"></d-icon>
```

:::

### 图标大小

:::demo 通过`size`属性，设置图标大小。

```vue
<d-icon name="experice-new" size="32px"></d-icon>
<d-icon name="experice-new" size="48px"></d-icon>
```

:::

### 自定义字体图标

Icon 组件默认引用 DevUI 图标库的图标，如果需要在现有 Icon 的基础上使用更多图标，可以引入第三方 iconfont 对应的字体文件和 CSS 文件，之后就可以在 Icon 组件中直接使用。

```css
@font-face {
  font-family: "my-icon";
  src: url("./my-icon.ttf") format("truetype");
}

.my-icon {
  font-family: "my-icon";
}

.my-icon-right::before {
  content: "\E03F";
}
```

引入字体图标的 css

```css
@import "my-icon.css";
```

or

```js
import "my-icon.css";
```

使用

```html
<d-icon class-prefix="my-icon" name="right" />
```

### API

|    参数     |   类型   |   默认    | 说明                     | 跳转 Demo                         |
| :---------: | :------: | :-------: | :----------------------- | --------------------------------- |
|    name     | `String` |    --     | 必选，Icon 名称          | [基本用法](#基本用法)             |
|    size     | `String` |  '16px'   | 可选，图标大小           | [基本用法](#基本用法)             |
|    color    | `String` | '#252b3a' | 可选，图标颜色           | [基本用法](#基本用法)             |
| class-prefix | `String` |  'icon'   | 可选，自定义字体图标前缀 | [自定义字体图标](#自定义字体图标) |
