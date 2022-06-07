# Grid 栅格

24 栅格系统。

#### 何时使用

需要使用弹性布局时，并且需要适配不同的屏幕时，使用 grid 组件。

### 基本用法

基础栅格

:::demo 使用 Row 和 Col 组件，可以创建一个基本的栅格系统，Col 必须放在 Row 里面。

```vue
<template>
  <d-row class="docs-devui-row">
    <d-col :span="12">col-12</d-col>
    <d-col :span="12">col-12</d-col>
  </d-row>
  <d-row class="docs-devui-row">
    <d-col :span="8">col-8</d-col>
    <d-col :span="8">col-8</d-col>
    <d-col :span="8">col-8</d-col>
  </d-row>
  <d-row class="docs-devui-row">
    <d-col :span="6">col-6</d-col>
    <d-col :span="6">col-6</d-col>
    <d-col :span="6">col-6</d-col>
    <d-col :span="6">col-6</d-col>
  </d-row>
  <d-row class="docs-devui-row">
    <d-col :span="4">col-4</d-col>
    <d-col :span="4">col-4</d-col>
    <d-col :span="4">col-4</d-col>
    <d-col :span="4">col-4</d-col>
    <d-col :span="4">col-4</d-col>
    <d-col :span="4">col-4</d-col>
  </d-row>
</template>

<style>
.docs-devui-row:not(:last-of-type) {
  margin-bottom: 20px;
}
.docs-devui-row .devui-col {
  text-align: center;
  min-height: 44px;
  line-height: 44px;
}
.docs-devui-row .devui-col:nth-of-type(2n + 1) {
  background: var(--devui-global-bg);
}
.docs-devui-row .devui-col:nth-of-type(2n) {
  background: var(--devui-brand);
}
</style>
```

:::

### 对齐

垂直对齐和水平对齐

:::demo 使用 Row 的 align 属性和 justify 属性子元素垂直对齐和水平对齐。

```vue
<template>
  <p>Align top</p>
  <d-row align="top" class="docs-devui-row">
    <d-col :span="6" class="col-child">col-6</d-col>
    <d-col :span="6" class="col-child">col-6</d-col>
    <d-col :span="6" class="col-child">col-6</d-col>
    <d-col :span="6" class="col-child">col-6</d-col>
  </d-row>
  <p>Align middle</p>
  <d-row align="middle" class="docs-devui-row">
    <d-col :span="6" class="col-child">col-6</d-col>
    <d-col :span="6" class="col-child">col-6</d-col>
    <d-col :span="6" class="col-child">col-6</d-col>
    <d-col :span="6" class="col-child">col-6</d-col>
  </d-row>
  <p>Align bottom</p>
  <d-row align="bottom" class="docs-devui-row">
    <d-col :span="6" class="col-child">col-6</d-col>
    <d-col :span="6" class="col-child">col-6</d-col>
    <d-col :span="6" class="col-child">col-6</d-col>
    <d-col :span="6" class="col-child">col-6</d-col>
  </d-row>
  <p>Justify start</p>
  <d-row justify="start" class="docs-devui-row">
    <d-col :span="4" class="col-child">col-4</d-col>
    <d-col :span="4" class="col-child">col-4</d-col>
    <d-col :span="4" class="col-child">col-4</d-col>
    <d-col :span="4" class="col-child">col-4</d-col>
  </d-row>
  <p>Justify center</p>
  <d-row justify="center" class="docs-devui-row">
    <d-col :span="4" class="col-child">col-4</d-col>
    <d-col :span="4" class="col-child">col-4</d-col>
    <d-col :span="4" class="col-child">col-4</d-col>
    <d-col :span="4" class="col-child">col-4</d-col>
  </d-row>
  <p>Justify end</p>
  <d-row justify="end" class="docs-devui-row">
    <d-col :span="4" class="col-child">col-4</d-col>
    <d-col :span="4" class="col-child">col-4</d-col>
    <d-col :span="4" class="col-child">col-4</d-col>
    <d-col :span="4" class="col-child">col-4</d-col>
  </d-row>
  <p>Justify between</p>
  <d-row justify="between" class="docs-devui-row">
    <d-col :span="4" class="col-child">col-4</d-col>
    <d-col :span="4" class="col-child">col-4</d-col>
    <d-col :span="4" class="col-child">col-4</d-col>
    <d-col :span="4" class="col-child">col-4</d-col>
  </d-row>
  <p>Justify around</p>
  <d-row justify="around" class="docs-devui-row">
    <d-col :span="4" class="col-child">col-4</d-col>
    <d-col :span="4" class="col-child">col-4</d-col>
    <d-col :span="4" class="col-child">col-4</d-col>
    <d-col :span="4" class="col-child">col-4</d-col>
  </d-row>
</template>
```

:::

### 子元素的间隔

栅格之间的间隔可以用 Row 的 gutter 属性

:::demo :gutter="10" 子元素左右间隔为 5px；:gutter="[10, 20]" 子元素左右间隔为 5px，上下间隔为 10px；需要适配屏幕宽度的情况，:gutter="{ xs: 10, sm: 20, md: [20, 10], lg: [30, 20], xl: [40, 30], xxl: [50, 40] }"

```vue
<template>
  <d-row :gutter="10" class="docs-devui-row">
    <d-col :span="6" class="col-gutter">
      <div class="col-child">col-6</div>
    </d-col>
    <d-col :span="6" class="col-gutter">
      <div class="col-child">col-6</div>
    </d-col>
    <d-col :span="6" class="col-gutter">
      <div class="col-child">col-6</div>
    </d-col>
    <d-col :span="6" class="col-gutter">
      <div class="col-child">col-6</div>
    </d-col>
  </d-row>
  <d-row :gutter="[10, 20]" class="docs-devui-row">
    <d-col :span="6" class="col-gutter">
      <div class="col-child">col-6</div>
    </d-col>
    <d-col :span="6" class="col-gutter">
      <div class="col-child">col-6</div>
    </d-col>
    <d-col :span="6" class="col-gutter">
      <div class="col-child">col-6</div>
    </d-col>
    <d-col :span="6" class="col-gutter">
      <div class="col-child">col-6</div>
    </d-col>
  </d-row>
  <d-row :gutter="{ xs: 10, sm: 20, md: [20, 10], lg: [30, 20], xl: [40, 30], xxl: [50, 40] }" class="docs-devui-row">
    <d-col :span="6" class="col-gutter">
      <div class="col-child">col-6</div>
    </d-col>
    <d-col :span="6" class="col-gutter">
      <div class="col-child">col-6</div>
    </d-col>
    <d-col :span="6" class="col-gutter">
      <div class="col-child">col-6</div>
    </d-col>
    <d-col :span="6" class="col-gutter">
      <div class="col-child">col-6</div>
    </d-col>
  </d-row>
</template>

<style>
.col-gutter {
  height: auto;
  background: transparent !important;
}
.col-gutter:nth-of-type(2n + 1) > .col-child {
  background: var(--devui-global-bg);
}
.col-gutter:nth-of-type(2n) > .col-child {
  background: var(--devui-brand);
}
</style>
```

:::

### flex 填充

Col 的 flex 属性支持 flex 填充。

:::demo

```vue
<template>
  <d-row type="flex" class="docs-devui-row">
    <d-col :flex="2">2 / 5</d-col>
    <d-col :flex="3">3 / 5</d-col>
  </d-row>
  <d-row type="flex" class="docs-devui-row">
    <d-col flex="100px">100px</d-col>
    <d-col flex="auto">auto</d-col>
  </d-row>
  <d-row type="flex" class="docs-devui-row">
    <d-col flex="1 1 200px">1 1 200px</d-col>
    <d-col flex="0 1 300px">0 1 300px</d-col>
  </d-row>
</template>
```

:::

### 左右偏移

使用 Col 的 offset、pull 和 push 来使子元素左右偏移。

:::demo 列偏移。使用 offset 可以将列向右侧偏。例如，offset={4} 将元素向右侧偏移了 4 个列（column）的宽度；offset、pull、push 也可以内嵌到。

```vue
<template>
  <d-row class="docs-devui-row">
    <d-col :span="8">col-8</d-col>
    <d-col :span="8" :offset="8">col-8</d-col>
  </d-row>
  <d-row class="docs-devui-row">
    <d-col :span="6" :offset="6">col-6 col-offset-6</d-col>
    <d-col :span="6" :offset="6">col-6 col-offset-6</d-col>
  </d-row>
  <d-row class="docs-devui-row">
    <d-col :span="12" :offset="6" :md="{ span: 22, offset: 1 }">col-12 col-offset-6</d-col>
  </d-row>
</template>
```

:::

### 响应式布局

预设六个响应尺寸：xs sm md lg xl xxl。

:::demo 参照 Bootstrap 的 [响应式设计](https://getbootstrap.com/docs/3.4/css/)。

```vue
<template>
  <d-row class="docs-devui-row">
    <d-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">Col</d-col>
    <d-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4">Col</d-col>
    <d-col :xs="2">Col</d-col>
  </d-row>
  <d-row wrap class="docs-devui-row">
    <d-col :xs="0" :sm="4" :md="6" :lg="8" :xl="10">Col</d-col>
    <d-col :xs="24" :sm="16" :md="12" :lg="8" :xl="4">Col</d-col>
    <d-col :xs="0" :sm="4" :md="6" :lg="8">Col</d-col>
  </d-row>
</template>
```

:::

### 栅格排序

列排序。通过使用 order、 push 和 pull 类就可以改变列（column）的顺。

:::demo 参照 Bootstrap 的 [响应式设计](https://getbootstrap.com/docs/3.4/css/)。

```vue
<template>
  <d-row class="docs-devui-row">
    <d-col :span="18" :order="2">col-18 order-2</d-col>
    <d-col :span="6" :order="1">col-6 order-1</d-col>
  </d-row>
  <d-row class="docs-devui-row">
    <d-col :span="18" :push="6">col-18 col-push-6</d-col>
    <d-col :span="6" :pull="18">col-6 col-pull-18</d-col>
  </d-row>
</template>
```

:::

### Row 参数

| 参数名  | 类型                        | 默认    | 说明                                                                                                                  | 跳转 Demo                     |
| :------ | :-------------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------- | :---------------------------- |
| align   | [Align](#align)             | 'top'   | flex 布局下的垂直对齐方式                                                                                             | [垂直对齐](#垂直对齐)         |
| justify | [Justify](#justify)         | 'start' | flex 布局下的垂直对齐方式                                                                                             | [垂直对齐](#垂直对齐)         |
| gutter  | `number`\|`array`\|`object` | 0       | 栅格间隔，数值形式：水平间距。<br>对象形式支持响应式： { xs: 8, sm: 16, md: 24}。<br>数组形式：[水平间距, 垂直间距]。 | [子元素的间隔](#子元素的间隔) |
| wrap    | `boolean`                   | false   | 是否自动换行                                                                                                          |                               |

### Col 参数

| 参数名 | 类型             | 默认 | 说明                                                    | 跳转 Demo                                    |
| :----- | :--------------- | :--- | :------------------------------------------------------ | :------------------------------------------- |
| span   | `number`         | -    | 栅格占位格数，为 0 时相当于 display: none               | [基本用法](#基本用法)                        |
| flex   | `string\|number` | -    | flex 布局填充                                           | [flex 填充](#flex填充)                       |
| offset | `number`         | -    | 栅格左侧的间隔格数，间隔内不可以有栅格                  | [左右偏移](#左右偏移)                        |
| pull   | `number`         | -    | 栅格向左移动格数                                        | [左右偏移](#左右偏移)、[栅格排序](#栅格排序) |
| push   | `number`         | -    | 栅格向右移动格数                                        | [左右偏移](#左右偏移)、[栅格排序](#栅格排序) |
| order  | `number`         | -    | 栅格顺序，flex 布局模式下有效                           | [栅格排序](#栅格排序)                        |
| xs     | `number\|object` | -    | <576px 响应式栅格，可为栅格数或一个包含其他属性的对象   | [栅格排序](#栅格排序)                        |
| sm     | `number\|object` | -    | >=576px 响应式栅格，可为栅格数或一个包含其他属性的对象  | [响应式布局](#响应式布局)                    |
| md     | `number\|object` | -    | >=768px 响应式栅格，可为栅格数或一个包含其他属性的对象  | [响应式布局](#响应式布局)                    |
| lg     | `number\|object` | -    | >=992px 响应式栅格，可为栅格数或一个包含其他属性的对象  | [响应式布局](#响应式布局)                    |
| xl     | `number\|object` | -    | >=1200px 响应式栅格，可为栅格数或一个包含其他属性的对象 | [响应式布局](#响应式布局)                    |
| xxl    | `number\|object` | -    | >=1600px 响应式栅格，可为栅格数或一个包含其他属性的对象 | [响应式布局](#响应式布局)                    |

### Grid 类型定义

#### Align

```ts
type Align = 'top' | 'middle' | 'bottom';
```

#### Justify

```ts
type Justify = 'start' | 'end' | 'center' | 'around' | 'between';
```
