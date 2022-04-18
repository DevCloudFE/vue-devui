# Popover
Simple text prompt box.

### When To Use
Used to notify users of non-critical problems or to indicate that a control is in a special situation.

### Basic Usage
:::demo
```vue
<template>
<div class="popover-demo-item" >
  <d-popover content="default!" controlled>
    <template #reference>
      <d-button variant="common">default</d-button>
    </template>
  </d-popover>
  <d-popover content="info!" popType="info" :position="['top']" controlled>
    <template #reference>
      <d-button  variant="primary">info</d-button>
    </template>
  </d-popover>
  <d-popover  content="error!" popType="error" controlled :position="['left']" :zIndex="9999">
    <template #reference>
      <d-button  variant="danger">error</d-button>
    </template>
  </d-popover>
    <d-popover  content="success!" popType="success" controlled :position="['right']">
    <template #reference>
      <d-button  variant="success">success</d-button>
    </template>
  </d-popover>
  <d-popover  content="warning!" popType="warning" controlled>
    <template #reference>
      <d-button  variant="warning">warning</d-button>
    </template>
  </d-popover>
  <d-popover  content="no-animation!" :showAnimation="false" :popMaxWidth="100" controlled>
    <template #reference>
      <d-button  variant="common">no-animation</d-button>
    </template>
  </d-popover>
</div>
</template>
<style>
.popover-demo-item > *{
  margin-right:10px;
}
</style>
```
:::

### Custom Tips
The HTMLElement or TemplateRef type can be transferred.

:::demo

```vue
<template>
<div class="popover-demo-item">
  <d-popover content="Custom Content" controlled>
    <template #reference>
      <d-button variant="primary"> click me!</d-button>
    </template>
  </d-popover>
  <d-popover  content="Custom Content" trigger="hover" controlled :popoverStyle="{ backgroundColor: '#7693f5',color: '#fff'}">
    <template #reference>
      <d-button variant="primary"> hover me!</d-button>
    </template>
  </d-popover>
</div>
</template>

<style>
.popover-demo-item > *{
  margin-right:10px;
}
</style>
```
:::


### Position
A total of 12 pop-up positions are supported.

:::demo

```vue
<template>
<div class="item">
  <d-popover  :position="['left']" controlled>
  <template #content>
      <div>left</div>
    </template>
  <template #reference>
    <d-button variant="common">left</d-button>
  </template>
  </d-popover>
  <d-popover  :position="['left-top']" controlled>
    <template #content>
        <div >left-top</div>
        <div>left-top</div>
    </template>
    <template #reference>
      <d-button variant="common">left-top</d-button>
    </template>
  </d-popover>
  <d-popover  :position="['left-bottom']" controlled >
    <template #content>
        <div>left-bottom</div>
        <div>left-bottom</div>
      </template>
    <template #reference>
      <d-button variant="common">left-bottom</d-button>
    </template>
  </d-popover>
</div>

<div style="margin-top:10px;" class="item">
  <d-popover :position="['top']" controlled>
    <template #content>
        <span >top</span>
      </template>
    <template #reference>
      <d-button variant="common">top</d-button>
    </template>
  </d-popover>
  <d-popover :position="['top-left']" controlled>
    <template #content>
        <span >top-left</span>
      </template>
    <template #reference>
      <d-button variant="common">top-left</d-button>
    </template>
  </d-popover>
  <d-popover :position="['top-right']" controlled>
    <template #content>
        <span >top-right</span>
      </template>
    <template #reference>
      <d-button variant="common">top-right</d-button>
    </template>
  </d-popover>
</div>

<div style="margin-top:10px;" class="item">
  <d-popover :position="['right']" controlled>
    <template #content>
        <div >right</div>
      </template>
    <template #reference>
      <d-button variant="common">right</d-button>
    </template>
  </d-popover>
  <d-popover :position="['right-top']" controlled>
    <template #content>
        <div >right-top</div>
        <div >right-top</div>
      </template>
    <template #reference>
      <d-button variant="common">right-top</d-button>
    </template>
  </d-popover>
    <d-popover :position="['right-bottom']" controlled>
    <template #content>
        <div >right-bottom</div>
        <div >right-bottom</div>
      </template>
    <template #reference>
      <d-button variant="common">right-bottom</d-button>
    </template>
  </d-popover>
</div>

<div style="margin-top:10px;" class="item">
  <d-popover :position="['bottom']" controlled>
    <template #content>
        <div >bottom</div>
      </template>
    <template #reference>
      <d-button variant="common">bottom</d-button>
    </template>
  </d-popover>
    <d-popover :position="['bottom-left']" controlled>
    <template #content>
        <div >bottom-left</div>
      </template>
    <template #reference>
      <d-button variant="common">bottom-left</d-button>
    </template>
  </d-popover>
  <d-popover  :position="['bottom-right']" controlled>
    <template #content>
        <div >bottom-right</div>
      </template>
    <template #reference>
      <d-button variant="common">bottom-right</d-button>
    </template>
  </d-popover>
</div>
</template>
<style>
.popover-demo-item > *{
  margin-right:10px;
}
</style>
```

:::

### **Manual Control Display**
Displaying the pop-up dialog box through the visible interface to verify the form. To use the visible control function, set controlled to the default value false.

:::demo
```vue
<template>
  <d-popover :position="['top']" :visible="visible">
    <template #content>
        <div > Manual Control Display </div>
      </template>
    <template #reference>
      <d-button variant="primary" @click="onClick">Manual Control Display</d-button>
    </template>
  </d-popover>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup(){
    const visible=ref(false);
    const onClick = ()=>{
      visible.value = !visible.value ;
    }
    return{
      visible,
      onClick
    }
  }
})
</script>
```
:::


### Delay Trigger
Only when the trigger type is hover. This event is triggered only when the mouse pointer is moved in for more than `mouseEnterDelay` milliseconds. The default value is 150 ms to prevent flashing caused by unintentional strokes. The toolTip component is hidden only after `mouseLeaveDelay`milliseconds after the cursor is moved out. The default value is 100 milliseconds.

:::demo

```vue
<template>
<div class="item">
  <d-popover  :position="['bottom-right']" trigger="hover" controlled :mouseEnterDelay ="500">
    <template #content>
        <div > Mouse enter 500ms later. </div>
        show Me
      </template>
    <template #reference>
      <d-button variant="primary">MouseEnter delay 500ms</d-button>
    </template>
  </d-popover>
  <d-popover :position="['bottom-right']" trigger="hover" controlled :mouseLeaveDelay="2000">
    <template #content>
        <div> Mouse leave 2000ms later. </div>
      </template>
    <template #reference>
      <d-button variant="common"> MouseLeave delay 2000ms</d-button>
    </template>
  </d-popover>
  </div>
</template>
<style>
.popover-demo-item > * {
  margin-right:10px;
}
</style>
```
:::

### DPopover

#### Props

| **Parameter** | **Type** | **Default** | **Description** | **Jump to Demo** |
| ---- | ---- | ---- | ---- | ---- |
| content | `string` | defalut |Required. The display content of the pop-up box or template reference | [Custom Tips](#custom-tips) |
| visible | `boolean` | false | Optional. Initial pop-up status of the pop-up dialog box | [Basic Usage](#basic-usage) |
| trigger | `string` | click | Pop-up message triggering mode | [Basic Usage](#basic-usage) |
| controlled | `boolean` | false | Optional. Specifies whether to trigger a dialog box in `trigger` mode | [Basic Usage](#basic-usage) |
| popType | `string`  | default | Optional. Which indicates the type of the pop-up box with different styles | [Basic Usage](#basic-usage)  |
| zIndex | `number` | 1060 | Optional. Z-index value, which is used to manually control the height of the layer | [Basic Usage](#basic-usage)      |
| positionType | `string` | bottom | Optional. Specifies the content pop-up direction. For example, top-left indicates the content pop-up direction, and left indicates the left-aligned content. | [Position](#Position) |
| showAnimation | `boolean` | true | Optional. Whether to display animation | [Basic Usage](#basic-usage)  |
| popMaxWidth | `number` | - | Optional. Limit the maximum width of the pop-up box (`px`) | [Basic Usage](#basic-usage)      |
| mouseEnterDelay | `number` | 150 | Optional. Only when the type of trigger is hover. Delay for displaying Popover after the mouse is enter. The unit is `ms` | [Delay Trigger](#delay-trigger) |
| mouseLeaveDelay | `number` | 100     | Optional. Only when the type of trigger is hover. Delay for hiding Tooltip after the mouse is leave. The unit is `ms` | [Delay Trigger](#delay-trigger)|
| popoverStyle | `{[klass:string]:any;}` | - | Optional. When you need to change the style of the pop-up layer, the same background color is applied to the arrows. Style. Refer to [ngStyle](https://angular.io/api/common/NgStyle) | [Custom Tips](#custom-tips) |



#### Slot

| name      | description                                               |
| --------- | --------------------------------------------------------- |
| content   | Custom content                                            |
| reference | Triggers the contents of the element displayed by Popover |
