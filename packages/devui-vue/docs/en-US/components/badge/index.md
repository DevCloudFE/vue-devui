# Badge

Round logo of number in the upper right corner of the icon.

#### When To Use

The badge is appeared at the upper right corner of the icon or the right of a list item. It's usually an icon that shows a message with a number to tell user what need to be handled.

### Basic Badge

::: demo Basic badge type. When there is a package element, the badge and number are displayed in the upper right corner.

```vue
<template>
  <d-badge :count="6" status="danger" class="badge-item">Message</d-badge>
  <d-badge :count="7" status="waiting" class="badge-item">Message</d-badge>
  <d-badge :count="8" status="success" class="badge-item">Message</d-badge>
  <d-badge :count="100" status="info" class="badge-item">Message</d-badge>
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

### Dotted Badge

:::demo Point badge type. When there is a package element and `show-dot` is set to true, the dot is displayed in the upper right corner by default.

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

### Count Badge

:::demo When the badge is used independently and does not enclose any elements, only the badge status color and number are displayed.

```vue
<template>
  <ul class="badge-list">
    <li class="badge-list-item">
      <span>System message</span>
      <d-badge status="common" :count="50"></d-badge>
    </li>
    <li class="badge-list-item">
      <span>Personal message</span>
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

### Status Badge

:::demo When the badge is used independently, does not contain any elements, and the `show-dot` parameter is set to true, the badge is a status badge. Different color dots are displayed for different statuses.

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

### Badge Position

:::demo Set badgePos to set the badge position.

```vue
<template>
  <d-badge :count="6" status="danger" position="top-left" class="badge-item">Message</d-badge>
  <d-badge :count="7" status="waiting" position="top-right" class="badge-item">Message</d-badge>
  <d-badge :count="8" status="success" position="bottom-left" class="badge-item">
    <d-icon name="emoji" />
  </d-badge>
  <d-badge :count="100" status="info" position="bottom-right" class="badge-item">
    <d-icon name="notice" />
  </d-badge>
</template>
```

:::

### Custom

:::demo The bgColor parameter is used to set the badge status color (the badge status color specified by status is invalid). The offsetXY parameter is used to set the badge offset relative to the badgePos.Customizing text and background colors using textColor and bgColor.

```vue
<template>
  <d-badge :count="666" status="success" style="margin-right: 20px">
    <d-icon name="notice" />
  </d-badge>
  <d-badge :count="666" status="success" style="margin-right: 30px" :offset="[-10, 0]">
    <d-icon name="notice" />
  </d-badge>
  <d-badge count="6" style="margin-right: 20px" :offset="[0, -10]">Message</d-badge>
  <d-badge count="6" bg-color="red" text-color="#fff" style="margin-right: 20px">Message</d-badge>
  <d-badge count="2.3k" bg-color="#000" text-color="#fff"></d-badge>
</template>
```

:::

### d-badge Parameter

| Parameter       | Type                | Default        | Description                                                                                                                   |
| ---------- | ------------------- | ----------- | :--------------------------------------------------------------------------------------------------------------------- |
| count      | `Number`            | --          | Optional. Set the number of basic badges to be displayed.                                                                     |
| max-count  | `Number`            | 99          | Optional. Sets the maximum number of basic and counting badges that can be displayed.When count is greater than maxCount, maxCount+ is displayed.                                  |
| show-dot   | `Boolean`           | false       | Optional. The value true indicates the dot badge (with package) or status badge (without package). The value false indicates the basic badge (with package) or count badge (without package).                        |
| status     | `BadgeStatusType`   | --          | Optional. The status color is danger\| warning \| waiting \| success \| info.	                                                            |
| position   | `BadgePositionType` | 'top-right' | Optional. The logo position is top-left\| top-right \| bottom-left \| bottom-right                                                      |
| bg-color   | `String`            | --          | Optional. The badge color can be customized. In this case, the badge status color specified by status is invalid.                                                               |
| text-color | `String`            | --          | Optional. You can customize the logo text color.                                                                                           |
| offset     | `[number, number]`  | --          | Optional. Indicates the logo position offset when there is a package. The format is [x,y], in px. This parameter is optional. x is the relative right offset (right: -x px), y is the relative top offset (top: y px). |

### BadgeStatusType

```typescript
type BadgeStatusType = 'danger' | 'warning' | 'waiting' | 'success' | 'info' | 'common';
```

### BadgePositionType

```typescript
type BadgePositionType = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
```
