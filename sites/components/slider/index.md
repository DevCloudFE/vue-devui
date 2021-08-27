# Slider滑动输入条

滑动输入条

### 何时使用
当用户需要在数值区间内进行选择时使用

### 基本用法
<br />
<d-slider :min="0" :max="40"></d-slider>
<br />

### 带有输入框的滑动组件
<br />
<d-slider :min="0" :max="40" showInput></d-slider>
<br />

### 可设置Step的滑动组件
<br />
<d-slider :min="0" :max="40" :step="3"></d-slider>
<br />

### 禁止输入态
<br />
<d-slider :min="0" :max="40" :step="3" :disabled="true"></d-slider>
<br />

```html
<d-slider :min="0" :max="40" ></d-slider>

<d-slider :min="0" :max="40"  showInput></d-slider>

<d-slider :min="0" :max="40"  :step="3"></d-slider>

<d-slider :min="0" :max="40"  :disabled="true"></d-slider>
```








