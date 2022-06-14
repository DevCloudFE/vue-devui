# Badge 徽标

图标右上角的圆形徽标数字。

#### 何时使用

出现在图标右上角或列表项右方，通过不同的状态色加数字提示用户有消息需要处理时。

### 基本徽章

::: demo 基本徽章类型，当有包裹元素时在右上角显示徽章和数目。

```vue
<template>
  <d-badge :count="6" status="danger" class="badge-item">未读消息</d-badge>
  <d-badge :count="7" status="waiting" class="badge-item">未读消息</d-badge>
  <d-badge :count="8" status="success" class="badge-item">未读消息</d-badge>
  <d-badge :count="100" status="info" class="badge-item">未读消息</d-badge>
</template>

<style>
.badge-item {
  background-color: var(--devui-global-bg, #f3f6f8);
  margin-right: 20px;
  margin-bottom: 8px;
  border-radius: 10px;
  padding: 4px 8px;
  font-size: 14px;
}
</style>
```

:::

### 点状徽章

:::demo 点状徽章类型，当有包裹元素且 `show-dot` 参数为 true 时为点状徽章，默认在右上角展示小点不显示数目。

```vue
<template>
  <d-badge status="danger" show-dot class="badge-dot-item">
    <d-icon name="feedback" />
  </d-badge>
  <d-badge status="waiting" show-dot class="badge-dot-item">
    <d-icon name="feedback" />
  </d-badge>
  <d-badge status="warning" show-dot class="badge-dot-item">
    <d-icon name="feedback" />
  </d-badge>
  <d-badge status="info" show-dot class="badge-dot-item">
    <d-icon name="feedback" />
  </d-badge>
</template>

<style>
.badge-dot-item {
  margin-right: 20px;
}
</style>
```

:::

### 计数徽章

:::demo 当徽章独立使用且不包裹任何元素时，只展示徽章状态色和数目。

```vue
<template>
  <ul class="badge-list">
    <li class="badge-list-item">
      <span>系统消息</span>
      <d-badge status="common" :count="50"></d-badge>
    </li>
    <li class="badge-list-item">
      <span>个人消息</span>
      <d-badge status="common" :count="500"></d-badge>
    </li>
  </ul>
</template>

<style>
.badge-list {
  width: 200px;
  font-size: 14px;
  background-color: var(--devui-base-bg, #fff);
  box-shadow: var(--devui-shadow-length-base, 0 1px 4px 0) var(--devui-light-shadow, rgba(37, 43, 58, 0.2));
}
.badge-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
}
</style>
```

:::

### 状态徽章

:::demo 当徽章独立使用、不包裹任何元素且 `show-dot` 参数为 true 时为状态徽章，不同状态展示不同色点。

```vue
<template>
  <d-badge status="danger" show-dot></d-badge>
  &nbsp;danger
  <br />
  <d-badge status="warning" show-dot></d-badge>
  &nbsp;warning
  <br />
  <d-badge status="waiting" show-dot></d-badge>
  &nbsp;waiting
  <br />
  <d-badge status="info" show-dot></d-badge>
  &nbsp;info
  <br />
  <d-badge status="success" show-dot></d-badge>
  &nbsp;success
  <br />
</template>
```

:::

### 徽章位置

:::demo 通过 `position` 参数设置徽章位置。

```vue
<template>
  <d-badge :count="6" status="danger" position="top-left" class="badge-item">未读消息</d-badge>
  <d-badge :count="7" status="waiting" position="top-right" class="badge-item">未读消息</d-badge>
  <d-badge :count="8" status="success" position="bottom-left" class="badge-item">
    <d-icon name="emoji" />
  </d-badge>
  <d-badge :count="100" status="info" position="bottom-right" class="badge-item">
    <d-icon name="notice" />
  </d-badge>
</template>
```

:::

### 自定义

:::demo 通过 `bg-color` 参数设置徽章展示状态色(此时 `status` 参数设置的徽章状态色失效)，通过 `offset` 参数可设置相对于 position 的徽章偏移量。通过 ` text-color``、bgColor ` 自定义文字、背景颜色。

```vue
<template>
  <d-badge :count="666" status="success" style="margin-right: 20px">
    <d-icon name="notice" />
  </d-badge>
  <d-badge :count="666" status="success" style="margin-right: 30px" :offset="[-10, 0]">
    <d-icon name="notice" />
  </d-badge>
  <d-badge count="6" style="margin-right: 20px" :offset="[0, -10]">未读消息</d-badge>
  <d-badge count="6" bg-color="red" text-color="#fff" style="margin-right: 20px">未读消息</d-badge>
  <d-badge count="2.3k" bg-color="#000" text-color="#fff"></d-badge>
</template>
```

:::

### 隐藏徽章

通过 `hidden` 属性设置徽章是否可见

::: demo

```vue
<template>
  <d-badge :hidden="isHidden" :count="6" status="danger" class="badge-item">未读消息</d-badge>
  <d-badge :hidden="isHidden" status="danger" show-dot class="badge-dot-item">
    <d-icon name="feedback" />
  </d-badge>
  <br />
  <d-button @click="hiddenNum">隐藏</d-button>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const isHidden = ref(false);
    const hiddenNum = () => {
      isHidden.value = !isHidden.value;
    };
    return {
      isHidden,
      hiddenNum,
    };
  },
});
</script>
```

:::

### Badge 参数

| 参数名     | 类型                                    | 默认        | 说明                                                                                                                       |
| :--------- | :-------------------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------- |
| count      | `number`                                | --          | 可选，设置基本徽章和计数徽章中显示的数目                                                                                   |
| max-count  | `number`                                | 99          | 可选，设置基本徽章和计数徽章最大可显示数目，<br>当 count > `max-count` 时显示 `max-count+`                                 |
| show-dot   | `boolean`                               | false       | 可选，true 时为点状徽章(有包裹)或状态徽章(无包裹)，<br>false 时为基本徽章(有包裹)或计数徽章(无包裹)                        |
| status     | [BadgeStatusType](#badgestatustype)     | 'info'      | 可选，状态色                                                                                                               |
| position   | [BadgePositionType](#badgepositiontype) | 'top-right' | 可选，徽标位置                                                                                                             |
| bg-color   | `string`                                | --          | 可选，自定义徽标色，此时 status 参数设置的徽章状态色失效                                                                   |
| text-color | `string`                                | --          | 可选, 可自定义徽标文字颜色                                                                                                 |
| offset     | `[number, number]`                      | --          | 可选，有包裹时徽标位置偏移量，格式为[x,y]，单位为 px。<br>x 为相对 right 或 left 的偏移量，y 为相对 top 或 bottom 的偏移量 |
| hidden     | `boolean`                               | false       | 可选，是否显示徽章                                                                                                         |

### Badge 类型定义

#### BadgeStatusType

```ts
type BadgeStatusType = 'danger' | 'warning' | 'waiting' | 'success' | 'info' | 'common';
```

#### BadgePositionType

```ts
type BadgePositionType = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
```
