# Badge

The round logo number in the upper right corner of the icon。

### When to use

Appears in the upper right corner of the icon or to the right of the list item, and prompts the user when there is a message to be processed through different status colors and numbers。

### Basic Badge

The basic badge type. When there is a package element, the badge and number will be displayed in the upper right corner。

<d-badge :count='6' status="danger" class="devui-badge-item">Unread message</d-badge>
<d-badge :count='7' status="waiting" class="devui-badge-item">Unread message</d-badge>
<d-badge :count='8' status="success" class="devui-badge-item">Unread message</d-badge>
<d-badge :count='100' status="info" class="devui-badge-item">Unread message</d-badge>

```html
<d-badge :count="6" status="danger">Unread message</d-badge>
<d-badge :count="7" status="waiting">Unread message</d-badge>
<d-badge :count="8" status="success">Unread message</d-badge>
<d-badge :count="100" status="info">Unread message</d-badge>
```

### Dot Badge

Dot badge type. When there is a package element and the showDot parameter is true, it is a dot badge. By default, small dots are displayed in the upper right corner and the number is not displayed。

<d-badge status="danger" showDot class="devui-badge-item">Unread message</d-badge>
<d-badge status="waiting" showDot class="devui-badge-item">Unread message</d-badge>
<d-badge status="warning" showDot class="devui-badge-item">
<d-icon name="like" />
</d-badge>
<d-badge status="info" showDot class="devui-badge-item">
<d-icon name="like" />
</d-badge>

```html
<d-badge status="danger" showDot>Unread message</d-badge>
<d-badge status="waiting" showDot>Unread message</d-badge>
<d-badge status="warning" showDot>
  <d-icon name="like" />
</d-badge>
<d-badge status="info" showDot>
  <d-icon name="like" />
</d-badge>
```

### Count Badge

When the badge is used independently and does not wrap any elements, only the badge status color and number are displayed。

<ul class="devui-badge-list">
  <li class="devui-badge-list-item">
    <span>Unread message</span>
    <d-badge status="danger" :count="50"></d-badge>
  </li>
  <li class="devui-badge-list-item">
    <span>Personal message</span>
    <d-badge status="info" :count="500"></d-badge>
  </li>
</ul>

```html
<ul class="devui-badge-list">
  <li class="devui-badge-list-item">
    <span>System message</span>
    <d-badge status="danger" :count="50"></d-badge>
  </li>
  <li class="devui-badge-list-item">
    <span>Personal message</span>
    <d-badge status="danger" :count="500"></d-badge>
  </li>
</ul>
```

### Status Badge

When the badge is used independently, does not wrap any elements, and the showDot parameter is true, it is a state badge, and different states show different color points。

<d-badge status="danger" showDot></d-badge>&nbsp danger <br />
<d-badge status="warning" showDot></d-badge>&nbsp warning <br />
<d-badge status="waiting" showDot></d-badge>&nbsp waiting <br />
<d-badge status="info" showDot></d-badge>&nbsp info <br />
<d-badge status="success" showDot></d-badge>&nbsp success <br />

```html
<d-badge status="danger" showDot></d-badge>&nbsp danger <br />
<d-badge status="warning" showDot></d-badge>&nbsp warning <br />
<d-badge status="waiting" showDot></d-badge>&nbsp waiting <br />
<d-badge status="info" showDot></d-badge>&nbsp info <br />
<d-badge status="success" showDot></d-badge>&nbsp success <br />
```

### Badge Position

Set the badge position through the badgePos parameter。

<d-badge :count='6' status="danger" badgePos="top-left" class="devui-badge-item">Unread message</d-badge>
<d-badge :count='7' status="waiting" badgePos="top-right" class="devui-badge-item">Unread message</d-badge>
<d-badge :count='8' status="success" badgePos="bottom-left" class="devui-badge-item">
<d-icon name="emoji" /></d-badge>
<d-badge :count='100' status="info" badgePos="bottom-right" class="devui-badge-item">
<d-icon name="notice" />
</d-badge>

```html
<d-badge :count="6" status="danger" badgePos="top-left">Unread message</d-badge>
<d-badge :count="7" status="waiting" badgePos="top-right">Unread message</d-badge>
<d-badge :count="8" status="success" badgePos="bottom-left">
  <d-icon name="emoji" />
</d-badge>
<d-badge :count="100" status="info" badgePos="bottom-right">
  <d-icon name="notice" />
</d-badge>
```

### Define

The badge display status color is set through the bgColor parameter (the badge status color set by the status parameter is invalid at this time), and the badge offset relative to the badgePos can be set through the offsetXY parameter. Customize text and background color through textColor and bgColor。

<d-badge :count="666" status="success" style="margin-right: 20px">
<d-icon name="notice" />
</d-badge>
<d-badge :count="666" status="success" style="margin-right: 30px" :offsetXY='[-10, 0]'>
<d-icon name="notice" />
</d-badge>
<d-badge count="6" style="margin-right: 20px" :offsetXY='[0, -10]' >Unread message</d-badge>
<d-badge count="6" bgColor="red" textColor="#fff" style="margin-right: 20px">Unread message</d-badge>
<d-badge count="2.3k" bgColor="#000" textColor="#fff"></d-badge>

```html
<d-badge :count="666" status="success" style="margin-right: 20px">
  <d-icon name="notice" />
</d-badge>
<d-badge :count="666" status="success" style="margin-right: 30px" :offsetXY="[-10, 0]">
  <d-icon name="notice" />
</d-badge>
<d-badge count="6" style="margin-right: 20px" :offsetXY="[0, -10]">Unread message</d-badge>
<d-badge count="6" bgColor="red" textColor="#fff" style="margin-right: 20px">Unread message</d-badge>
<d-badge count="2.3k" bgColor="#000" textColor="#fff"></d-badge>
```

### API

|   parameter    |        type         |    default     | illustrate                                                                                                                         |
| :-------: | :-----------------: | :---------: | :--------------------------------------------------------------------------------------------------------------------------- |
|   count   |      `Number`       |     --      | Optionally, set the number displayed in the basic badge and count badge                                                                                     |
| maxCount  |      `Number`       |     99      | Optional, set the maximum number of basic badges and count badges that can be displayed, and display maxCount+ when count> maxCount                                             |
|  showDot  |      `Boolean`      |    false    | Optional, when true, it is a dot badge (with package) or status badge (without package); when it is false, it is a basic badge (with package) or counting badge (without package)                              |
|  status   |  `BadgeStatusType`  |     --      | Optional, status color danger\| warning \| waiting \| success \| info                                                                  |
| badgePos  | `BadgePositionType` | 'top-right' | Optional, logo position top-left\| top-right \| bottom-left \| bottom-right                                                           |
|  bgColor  |      `String`       |     --      | Optional, customize the logo color, at this time the badge status color set by the status parameter is invalid                                                                     |
| textColor |      `String`       |     --      | Optional, logo text color can be customized                                                                                                  |
| offsetXY  | `[number, number] ` |     --      | Optional, optional, the logo position offset when there is a package, the format is [x,y], and the unit is px. x is the offset relative to right or left, and y is the offset relative to top or bottom |

<style lang="scss">
@import '@devui-design/icons/icomoon/devui-icon.css';
.devui-badge-item {
  background: #f3f6f8; 
  margin-right:20px;
  border-radius: 8px;
  padding: 4px 10px;
  font-size: 14px;
}
.devui-badge-list {
  width: 180px;
  padding: 4px 20px;
  background: #f3f6f8;
  font-size: 14px;
  border-radius: 8px;
  .devui-badge-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
