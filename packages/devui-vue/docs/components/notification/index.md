# Notification 全局通知

全局信息提示组件。

#### 何时使用

当需要向用户全局展示提示信息时使用，显示数秒后消失。

### 基本用法

:::demo 推荐使用服务方式调用，默认情况只展示消息内容和关闭按钮。

```vue
<template>
  <d-button @click.native="showService()">基本用法</d-button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    function showService() {
      this.$notificationService.open({
        content: '通知框消息内容',
      });
    }

    return { showService };
  },
});
</script>
```

:::

### 消息标题

:::demo 通过`title`参数设置消息标题，默认为空，不显示标题。

```vue
<template>
  <d-button @click.native="showService()">消息标题</d-button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    function showService() {
      this.$notificationService.open({
        title: '消息标题',
        content: '通知框消息内容',
      });
    }

    return { showService };
  },
});
</script>
```

:::

### 消息类型

:::demo 通过`type`参数设置消息类型，目前支持`normal`、`info`、`success`、`warning`、`danger`五种类型，默认`normal`类型，不显示类型图标。

```vue
<template>
  <d-button @click.native="showService()">消息类型</d-button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    function showService() {
      this.$notificationService.open({
        title: '消息标题',
        content: '通知框消息内容',
        type: 'success',
      });
    }

    return { showService };
  },
});
</script>
```

:::

### 超时时间

:::demo 通过`duration`参数设置超时时间，单位`ms`，默认`3000 ms`后自动关闭，设置为`0`则不会自动关闭。

```vue
<template>
  <d-button @click.native="showService()">超时时间</d-button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    function showService() {
      this.$notificationService.open({
        title: '消息标题',
        content: '通知框消息内容',
        duration: 1000,
      });
    }

    return { showService };
  },
});
</script>
```

:::

### 关闭回调

:::demo 通过`onClose`参数设置消息关闭时的回调。

```vue
<template>
  <d-button @click.native="showService()">关闭回调</d-button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    function showService() {
      this.$notificationService.open({
        title: '消息标题',
        content: '通知框消息内容',
        onClose: () => {
          console.log('notification closed');
        },
      });
    }

    return { showService };
  },
});
</script>
```

:::

### 组件方式调用

:::demo 除服务方式外，还提供组件方式调用，组件方式的默认插槽与服务方式的`content`参数作用一致，其他参数与服务方式保持同名。

```vue
<template>
  <d-button @click="showComponent">组件方式调用</d-button>
  <d-notification v-model="show" title="标题" type="info">通知提示内容</d-notification>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const show = ref(false);
    const showComponent = () => {
      show.value = true;
    };

    return { show, showComponent };
  },
});
</script>
```

:::

### Service 使用

```typescript
// 方式1，局部引入 NotificationService
import { NotificationService } from '@devui/vue-devui/notification';
NotificationService.open({ xxx });

// 方式2，全局属性
this.$notificationService.open({ xxx });
```

### Notification 参数

| 参数名   | 类型               | 默认     | 说明                       | 跳转                          |
| :------- | :----------------- | :------- | :------------------------- | :---------------------------- |
| v-model  | `boolean`          | 'false'  | 组件调用必选，控制是否显示 | [组件方式调用](#组件方式调用) |
| content  | `string`           | ''       | 可选，设置消息内容         | [基本用法](#基本用法)         |
| title    | `string`           | ''       | 可选，设置消息标题         | [消息标题](#消息标题)         |
| type     | `NotificationType` | 'normal' | 可选，设置消息类型         | [消息类型](#消息类型)         |
| duration | `number`           | '3000'   | 可选，设置超时时间         | [超时时间](#超时时间)         |
| on-close | `() => void`       | ''       | 可选，设置消息关闭时的回调 | [关闭回调](#关闭回调)         |

### Notification 插槽

| 插槽名  | 说明                         |
| :------ | :--------------------------- |
| default | 默认插槽，组件方式使用时有效 |

### 类型定义

#### NotificationType

```ts
type NotificationType = 'normal' | 'success' | 'error' | 'warning' | 'info';
```
