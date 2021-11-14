# Textarea 多行文本框

文本输入区域。

### 何时使用

需要手动输入文字，并且文字内容较多时使用。

### 基本用法

:::demo

```vue
<template>
  <h4 style="margin: 10px 0">Default</h4>

  <d-textarea
    value="我是默认值"
    :autofocus="true"
    id="textArea"
    cssClass="my-text-area"
  ></d-textarea>

  <h4 style="margin: 10px 0">Disabled</h4>

  <d-textarea placeholder="我是被禁用状态" :disabled="true"></d-textarea>

  <h4 style="margin: 10px 0">Error</h4>

  <d-textarea placeholder="我是出错状态" :error="true"></d-textarea>
</template>
<style>
.dinput {
  width: 200px;
}
</style>
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
  <d-textarea :showCount="true" placeholder="请输入"></d-textarea>
  <h4 style="margin: 10px 0">显示最大字数</h4>
  <d-textarea
    :showCount="true"
    :maxLength="20"
    placeholder="请输入"
  ></d-textarea>
</template>
<style>
.dinput {
  width: 200px;
}
</style>
```

:::

### 事件响应

:::demo

```vue
<template>
  <d-textarea
    :showCount="true"
    :maxLength="20"
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
      console.log("【d-textarea update value】： ", value);
    };
    const onChange = (value) => {
      console.log("【d-textarea change value】：", value);
    };
    const onFocus = (e) => {
      console.log("【d-textarea onFocus】:", e);
    };
    const onKeydown = (e) => {
      console.log("【d-textarea onKeydown:", e);
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

### d-textarea API

d-textarea 参数

| 参数        | 类型                                                      | 默认     | 说明                                                                                 | 跳转 Demo             | 全局配置项 |
| ----------- | --------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------ | --------------------- | ---------- |
| id          | string                                                    | `-`      | 可选，文本框 id                                                                      | [基本用法](#基本用法) |            |
| placeholder | string                                                    | `-`      | 可选，文本框 placeholder                                                             | [基本用法](#基本用法) |            |
| value       | string                                                    | `-`      | 可选，文本框默认值                                                                   | [基本用法](#基本用法) |            |
| disabled    | boolean                                                   | `false`  | 可选，文本框是否被禁用                                                               | [基本用法](#基本用法) |            |
| autoFocus   | boolean                                                   | `false`  | 可选，文本框是否自动获得焦点                                                         | [基本用法](#基本用法) |            |
| error       | boolean                                                   | `false`  | 可选，文本框是否出现输入错误                                                         | [基本用法](#基本用法) |            |
| resize      | `'none' \|'vertical' \|'horizontal' \|'both' \|'inherit'` | `'none'` | 可选，文本框是否可调整大小，可选项：不可调整，水平调整，垂直调整，自由调整，默认继承 | [调整大小](#调整大小) |            |
| showCount   | boolean                                                   | `false`  | 可选，文本框是否是否展示字数                                                         | [显示字数](#显示字数) |            |

d-textarea 事件

| 事件    | 类型                   | 说明                           | 跳转 Demo             |
| ------- | ---------------------- | ------------------------------ | --------------------- |
| update  | `EventEmitter<string>` | 文本框内容变化（实时触发）     | [事件响应](#事件响应) |
| focus   | `EventEmitter<Event>`  | 文本框获得焦点                 | [事件响应](#事件响应) |
| blur    | `EventEmitter<Event>`  | 文本框失去焦点                 | [事件响应](#事件响应) |
| change  | `EventEmitter<string>` | 文本框内容变化（失去焦点触发） | [事件响应](#事件响应) |
| keydown | `EventEmitter<Event>`  | 文本框按下键盘                 | [事件响应](#事件响应) |
