# Textarea 多行文本框

文本输入区域。

#### 何时使用

需要手动输入文字，并且文字内容较多时使用。

### 基本用法

:::demo

```vue
<template>
  <h4 style="margin: 10px 0">Default</h4>

  <d-textarea value="我是默认值" autofocus id="textArea" css-class="my-text-area"></d-textarea>

  <h4 style="margin: 10px 0">Disabled</h4>

  <d-textarea placeholder="我是被禁用状态" disabled></d-textarea>

  <h4 style="margin: 10px 0">Error</h4>

  <d-textarea placeholder="我是出错状态" error></d-textarea>
</template>
```

:::

### 调整大小

:::demo

```vue
<template>
  <h4 style="margin: 10px 0">vertical</h4>
  <d-textarea placeholder="我可以缩放" resize="vertical"></d-textarea>

  <h4 style="margin: 10px 0">horizontal</h4>

  <d-textarea resize="horizontal" placeholder="请输入"></d-textarea>

  <h4 style="margin: 10px 0">both</h4>

  <d-textarea resize="both" placeholder="请输入"></d-textarea>

  <h4 style="margin: 10px 0">none</h4>

  <d-textarea resize="none" placeholder="请输入"></d-textarea>

  <h4 style="margin: 10px 0">inherit</h4>

  <d-textarea resize="inherit" placeholder="请输入"></d-textarea>
</template>
```

:::

### 显示字数

:::demo

```vue
<template>
  <h4 style="margin: 10px 0">默认</h4>
  <d-textarea show-count placeholder="请输入"></d-textarea>
  <h4 style="margin: 10px 0">显示最大字数</h4>
  <d-textarea show-count :max-length="20" placeholder="请输入"></d-textarea>
</template>
```

:::

### 事件响应

:::demo

```vue
<template>
  <d-textarea
    show-count
    :max-length="20"
    placeholder="打开控制台输入文字看看"
    @update:value="onUpdate"
    @change="onChange"
    @focus="onFocus"
    @keydown="onKeydown"
  ></d-textarea>
</template>

<script>
export default {
  setup() {
    const onUpdate = (value) => {
      console.log('【d-textarea update value】： ', value);
    };
    const onChange = (value) => {
      console.log('【d-textarea change value】：', value);
    };
    const onFocus = (e) => {
      console.log('【d-textarea onFocus】:', e);
    };
    const onKeydown = (e) => {
      console.log('【d-textarea onKeydown:', e);
    };
    return {
      onUpdate,
      onChange,
      onFocus,
      onKeydown,
    };
  },
};
</script>
```

:::

### Textarea 参数

| 参数名      | 类型              | 默认值 | 说明                         | 跳转 Demo             |
| :---------- | :---------------- | :----- | :--------------------------- | :-------------------- |
| id          | `string`          | -      | 可选，文本框 id              | [基本用法](#基本用法) |
| placeholder | `string`          | -      | 可选，文本框 placeholder     | [基本用法](#基本用法) |
| value       | `string`          | -      | 可选，文本框默认值           | [基本用法](#基本用法) |
| disabled    | `boolean`         | false  | 可选，文本框是否被禁用       | [基本用法](#基本用法) |
| autofocus   | `boolean`         | false  | 可选，文本框是否自动获得焦点 | [基本用法](#基本用法) |
| error       | `boolean`         | false  | 可选，文本框是否出现输入错误 | [基本用法](#基本用法) |
| resize      | [Resize](#resize) | 'none' | 可选，文本框是否可调整大小   | [调整大小](#调整大小) |
| show-count  | `boolean`         | false  | 可选，文本框是否是否展示字数 | [显示字数](#显示字数) |

### Textarea 事件

| 事件名  | 回调参数                  | 说明                           | 跳转 Demo             |
| :------ | :------------------------ | :----------------------------- | :-------------------- |
| update  | `Function(value: string)` | 文本框内容变化（实时触发）     | [事件响应](#事件响应) |
| focus   | `Function(event: Event)`  | 文本框获得焦点                 | [事件响应](#事件响应) |
| blur    | `Function(event: Event)`  | 文本框失去焦点                 | [事件响应](#事件响应) |
| change  | `Function(value: string)` | 文本框内容变化（失去焦点触发） | [事件响应](#事件响应) |
| keydown | `Function(event: Event)`  | 文本框按下键盘                 | [事件响应](#事件响应) |

### Textarea 类型定义

<br />

#### Resize

```ts
type Resize = 'none' | 'vertical' | 'horizontal' | 'both' | 'inherit';
```
