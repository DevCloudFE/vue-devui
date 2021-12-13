# Button 按钮

按钮用于开始一个即时操作。

### 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

### 主要按钮

:::demo

```vue
<template>
  <d-button id="primaryBtn" style="margin-right: 8px">Primary</d-button>
  <d-button :disabled="true">Disabled</d-button>
</template>
```
:::
### 次要按钮

:::demo

```vue
<template>
  <d-button btnStyle="common" style="margin-right: 8px">Common</d-button>
  <d-button btnStyle="common" :disabled="true">Disabled</d-button>
</template>
```
:::

### 左按钮与右按钮

:::demo
```vue
<template>
  <d-button btnStyle="primary" bsPosition="left">Left</d-button>
  <d-button btnStyle="common" bsPosition="right">Right</d-button>
</template>
```
:::


### 警示按钮
用于标识系统中的关键操作，例如购买场景。
:::demo
```vue
<template>
  <d-button btnStyle="danger" type="submit">Buy</d-button>
</template>
```
:::

### 警示按钮
用于标识系统中的关键操作，例如购买场景。
:::demo
```vue
<template>
  <div class="flex flex-col space-y-xs">
    <d-button btnStyle="primary" type="submit">主要按钮</d-button>
    <d-button btnStyle="common" type="submit">通用按钮</d-button>
    <d-button btnStyle="text" type="submit">文本按钮</d-button>
    <d-button btnStyle="text-dark" type="submit">文本（暗色）按钮</d-button>
    <d-button btnStyle="success" type="submit">成功按钮</d-button>
    <d-button btnStyle="warning" type="submit">警告按钮</d-button>
  </div>
</template>
```
:::

### 文字按钮
用于标识系统中的关键操作，例如购买场景。
:::demo
```vue
<template>
  <d-button btnStyle="text" style="margin-right: 20px">Text</d-button>
  <d-button btnStyle="text-dark" style="margin-right: 20px">Text dark</d-button>
  <d-button btnStyle="text" :disabled="true">Disabled</d-button>
</template>
```
:::

### 加载中状态
:::demo
```vue
<template>
  <d-button :showLoading="showLoading" @click="handleClick"> click me! </d-button>
</template>
<script>
  import { ref, onBeforeUnmount } from 'vue';
  export default {
    setup() {
      const showLoading = ref(false);
      const timerId = ref();      
      const handleClick = () => {
        showLoading.value = true;
        timerId.value = setTimeout(() => {
          showLoading.value = false;
        }, 2000);
      }

      onBeforeUnmount(() => {
        if (!timerId.value) {
          return;
        }
        clearTimeout(timerId.value);
      });

      return { showLoading, handleClick };
    }
  }
</script>
```
:::

### 自动获得焦点
通过autofocus设置按钮自动获得焦点。
:::demo
```vue
<template>
  <d-button btnStyle="primary" :bordered="true" :autofocus="true" style="margin-right: 8px"> Confirm </d-button>
  <d-button btnStyle="common"> Cancel </d-button>
</template>
```
:::

### 图标

:::demo
```vue
<template>
  <div class="mb-l">
    <d-button icon="add" btnStyle="primary"> New </d-button>
    <d-button icon="filter" btnStyle="common"> Filter </d-button>
  </div>
  <div class="mb-l">
    <d-button icon="add" btnStyle="primary" :disabled="true"> New(disabled) </d-button>
    <d-button icon="filter" btnStyle="common" :disabled="true"> Filter(disabled) </d-button>
  </div>
  <div class="mb-l">
    <d-button icon="connect" btnStyle="text-dark" style="margin-right: 4px"> Link </d-button>
    <d-button icon="run" btnStyle="text-dark"> Run </d-button>
  </div>
  <div class="mb-l">
    <d-button class="mr-xs" icon="connect" btnStyle="text-dark" style="margin-right: 4px" :disabled="true"> Link(disabled) </d-button>
    <d-button class="mr-xs" icon="run" btnStyle="text-dark" :disabled="true"> Run(disabled) </d-button>
  </div>
  <div class="mb-l">
    <d-button class="mr-xs" icon="add" btnStyle="text-dark" title="add"></d-button>
    <d-button class="mr-xs" icon="delete" btnStyle="text-dark" title="delete"></d-button>
  </div>
  <div class="mb-l">
    <d-button icon="add" btnStyle="text-dark" :disabled="true" title="add"></d-button>
    <d-button icon="delete" btnStyle="text-dark" :disabled="true" title="delete"></d-button>
  </div>
  <div class="mb-l">
    <d-button class="mr-xs" btnStyle="common" class="mr-xs" bsSize="xs">
      Click me
      <span class="icon-chevron-down"></span>
    </d-button>
  </div>
  <div class="mb-l">
    <d-button class="mr-xs" btnStyle="text-dark">
      Click me
      <span class="icon-chevron-down"></span>
    </d-button>
  </div>
</template>
<style>

.icon-chevron-down {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  top: -0.1em;
}

</style>
```
:::

### API
d-button 参数
|   参数    |       类型        |   默认    | 说明                             |
| :-------: | :---------------: | :-------: | :------------------------------- |
|   type    |   `IButtonType`   | 'button'  | 可选，按钮类型                   |
| btnStyle  |  `IButtonStyle`   | 'primary' | 可选，按钮风格                   |
| position  | `IButtonPosition` | 'default' | 可选，按钮位置                   |
|   size    |   `IButtonSize`   |   'md'    | 可选，按钮大小                   |
| bordered  |     `boolean`     |   false   | 可选，是否有边框                 |
|   icon    |     `string`      |    --     | 可选，点击背景触发的事件         |
|   width   |     `string`      |    --     | 可选，弹出框宽度(e.g '300px')    |
| disabled  |     `boolean`     |   false   | 可选，是否禁用button             |
| autofocus |     `boolean`     |   false   | 可选，按钮加载时是否自动获得焦点 |

d-button 事件
|  参数   |             类型              | 默认  | 说明           |
| :-----: | :---------------------------: | :---: | :------------- |
| onClick | `(event: MouseEvent) => void` |  --   | 可选，点击事件 |


IButtonType 
``` typescript
type IButtonStyle = 'button' | 'submit' | 'reset';
```

IButtonStyle 
``` typescript
type IButtonStyle = 'common' | 'primary' | 'text' | 'text-dark' | 'danger' | 'success' | 'warning';
```

IButtonPosition 
``` typescript
type IButtonStyle = 'left' | 'right' | 'default';
```

IButtonSize
``` typescript
type IButtonStyle = 'lg' | 'md' | 'sm' | 'xs';
```
