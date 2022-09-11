# Message 全局提示

常用于主动操作后的反馈提示。 与 Notification 的区别是后者更多用于系统级通知的被动提醒。

### 何时使用

当需要向用户全局展示提示信息时使用，显示数秒后消失。

### 基础用法

共有四种`Message`样式：normal、success、error、warning、info。

:::demo

```vue
<template>
  <div class="demo-spacing">
    <d-button  @click="open('normal')">normal</d-button>
    <d-button  @click="open('success')">success</d-button>
    <d-button  @click="open('error')">error</d-button>
    <d-button  @click="open('warning')">warning</d-button>
    <d-button  @click="open('info')">info</d-button>
   </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {

    function open (type) { 
      this.$message({
        type,
        message: 'this is a message.'
      })
    }
    
    return { open };
  }
});
</script>
```
:::

### 可关闭消息提示

默认的 Message 是不可以被人工关闭的。 如果你需要手动关闭功能，你可以把 `showClose` 设置为 `true` 此外，默认的关闭时间为 3000 毫秒，当把这个属性（`duration`）的值设置为0便表示该消息不会被自动关闭。

:::demo

```vue
<template>
  <div class="demo-spacing">
    <d-button  @click="closeIcon()">show close icon</d-button>
    <d-button  @click="notClose()">not close</d-button>
   </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {

    function closeIcon () {
      this.$message({
        type:'success',
        message:'Show close button.',
        showClose: true,
      });
    }

    function notClose () {
      this.$message({
        type:'info',
        message:'Do not automatically close messages.',
        showClose: true,
        duration: 0
      });
    }
    
    return { closeIcon, notClose };
  }
});
</script>
```

:::

### 超时时间

通过设置`duration`来规定`message`所显示的时间以毫秒来规定(1000毫秒 => 1秒)，将这个属性设置为0则不会自动关闭。

:::demo

```vue
<template>
  <div class="demo-spacing">
    <d-button  @click="open()">show message 5000ms</d-button>
   </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {

    function open () { 
      this.$message({
        type:'success',
        message:'show message 5000ms.',
        duration: 5000,
        showClose: true,
      });
    }
    
    return { open };
  }
});
</script>
```


:::

### 阴影和边框设置

通过设置`bordered`为`false`来关闭`message`的边框。

通过设置`shadow`为`false`来关闭`message`的阴影。

:::demo

```vue
<template>
  <div class="demo-spacing">
    <d-button  @click="closeBordered()">close bordered</d-button>
    <d-button  @click="closeShadow()">close shadow</d-button>
    <d-button  @click="closeBAndS()">close bordered And shadow</d-button>
   </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {

    function closeBordered () {
      this.$message({
        type:'success',
        message:'close bordered.',
        bordered: false,
      });
    }

    function closeShadow () {
      this.$message({
        type:'info',
        message:'close shadow.',
        shadow: false,
      });
    }

    function closeBAndS () {
      this.$message({
        type:'error',
        message:'close shadow.',
        bordered: false,
        shadow: false,
      });
    }
    
    return { closeBordered, closeShadow, closeBAndS };
  }
});
</script>
```

:::

### 关闭回调

通过onClose参数设置消息关闭时的回调。
:::demo

```vue
<template>
  <div class="demo-spacing">
    <d-button  @click="closeMessage()">close message</d-button>
   </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {

    function closeMessage () {
      this.$message({
        type:'success',
        message:'close message.',
        onClose: () => {
          console.log('message closed');
        },
      });
    }
    
    return { closeMessage };
  }
});
</script>
```

:::

### 多种用法
调用message 消息的时候可以有多种调用方法和多种使用方式。

##### 调用方式
```javascript
// 第一种 全局调用
this.$message('I call message globally');

// 第二种 引入局部调用
import { message } from 'vue-devui'
message('I call message locally')
```

##### 使用方式
```javascript
import { message } from 'vue-devui'

// 传入字符串直接使用默认参数
message('I am a default message');

// 传入对象设置参数
message({
  message:'I am message',
  type: 'info',
  bordered: false,
});

// 直接选择类型调用
message.error('I am a error message');
message.error({
  message:'I am a error message',
  bordered: false,
  shadow: false,
});
```

### Message 参数

| 参数名   | 类型               | 默认     | 说明                       | 跳转                          |
| :------- | :----------------- | :------- | :------------------------- | :---------------------------- |
| message  | `string` | ''  | 设置消息文字 | [基础用法](#基础用法) |
| type  | `MessageType` | 'normal'| 设置消息内容类型   | [基础用法](#基础用法)   |
| showClose | `Boolean`| false | 设置展示可关闭按钮 | [可关闭消息提示](#可关闭消息提示)   |
| duration | `number`| 3000   | 设置超时时间         | [超时时间](#超时时间)   |
| shadow | `Boolean`| true   | 设置是否展示阴影        | [阴影和边框设置](#阴影和边框设置)   |
| bordered | `Boolean`| true   | 设置是否展示边框         | [阴影和边框设置](#阴影和边框设置)   |
| on-close | `() => void` | - | 设置消息关闭时的回调 | [关闭回调](#关闭回调)         |


### Message 类型定义

#### MessageType

```ts
type MessageType = 'normal' | 'success' | 'error' | 'warning' | 'info';
```
