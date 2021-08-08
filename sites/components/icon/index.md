# Icon 图标

用于显示图标。

### 何时使用

需要显示图标时。

### 基本用法

<d-icon name="emoji"></d-icon>
<d-icon name="right" color="#3dcca6"></d-icon>
<d-icon name="error" color="#f95f5b"></d-icon>
<d-icon name="ban" color="#f95f5b" size="lg"></d-icon>

```html
<d-icon name="emoji"></d-icon>
<d-icon name="right" color="#3dcca6"></d-icon>
<d-icon name="error" color="#f95f5b"></d-icon>
<d-icon name="ban" color="#f95f5b" size="lg"></d-icon>
```

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

引入字体图标的css

```css
@import 'my-icon.css';
```

or

```js
import 'my-icon.css';
```

使用

```html
<d-icon class-prefix="my-icon" name="right" />
```