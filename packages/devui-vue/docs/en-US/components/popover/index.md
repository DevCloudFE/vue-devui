# Popover  
Simple text prompt bubble box。

### When to use
Used to notify users of non-critical issues or to prompt a control in a special situation。

### Basic usage
When Popover pops up, it will be positioned based on the content of the `reference` slot。

<div class="popover" >
  <d-popover visible>
    <template #reference>
      <d-button bsStyle="common">default</d-button>
    </template>
  </d-popover>
  <d-popover  content="info!" popType="info" position="top" trigger="hover">
    <template #reference>
      <d-button  bsStyle="primary">info</d-button>
    </template>
  </d-popover>
  <d-popover  content="error!" popType="error" position="left" :zIndex="9999">
    <template #reference>
      <d-button  bsStyle="danger">error</d-button>
    </template>
  </d-popover>
    <d-popover  content="success!" popType="success" position="right">
    <template #reference>
      <d-button  bsStyle="success">success</d-button>
    </template>
  </d-popover>
  <d-popover  content="warning!" popType="warning" >
    <template #reference>
      <d-button  bsStyle="warning">warning</d-button>
    </template>
  </d-popover>
  <d-popover  content="no-animation!" :showAnimation="false">
    <template #reference>
      <d-button  bsStyle="common">no-animation</d-button>
    </template>
  </d-popover>
</div>


```html
  <d-popover visible>
    <template #reference>
      <d-button bsStyle="common">default</d-button>
    </template>
  </d-popover>

  <d-popover  content="info!" popType="info" position="top" trigger="hover">
    <template #reference>
      <d-button  bsStyle="primary">info</d-button>
    </template>
  </d-popover>

  <d-popover  content="error!" popType="error" position="left" :zIndex="9999">
    <template #reference>
      <d-button  bsStyle="danger">error</d-button>
    </template>
  </d-popover>

  <d-popover  content="success!" popType="success" position="right">
    <template #reference>
      <d-button  bsStyle="success">success</d-button>
    </template>
  </d-popover>

  <d-popover  content="warning!" popType="warning" >
    <template #reference>
      <d-button  bsStyle="warning">warning</d-button>
    </template>
  </d-popover>
  <d-popover  content="no-animation!" :showAnimation="false">
    <template #reference>
      <d-button  bsStyle="common">no-animation</d-button>
    </template>
  </d-popover>
```

### Custom content  
Customize the content of the `reference` slot and the content of the pop-up prompt。

<div>
  <d-popover content="Custom-content">
    <template #reference>
      <d-button bsStyle="primary">Custom-content</d-button>
    </template>
  </d-popover>
</div>

```html
<div>
  <d-popover content="Custom-content">
    <template #reference>
      <d-button bsStyle="primary">Custom-content</d-button>
    </template>
  </d-popover>
</div>
```

### Pop-up position
A total of 12 pop-up positions are supported。

<div>
  <d-popover  position="left">
  <template #content>
      <div>left</div>
    </template>
  <template #reference>
    <d-button bsStyle="common">left</d-button>
  </template>
  </d-popover>
  <d-popover  position="left-top" >
    <template #content>
        <div >left-top</div>
        <div>left-top</div>
    </template>
    <template #reference>
      <d-button bsStyle="common">left-top</d-button>
    </template>
  </d-popover>
  <d-popover  position="left-bottom" >
    <template #content>
        <div>left-bottom</div>
        <div>left-bottom</div>
      </template>
    <template #reference>
      <d-button bsStyle="common">left-bottom</d-button>
    </template>
  </d-popover>
</div>

<div style="margin-top:10px;">
  <d-popover   position="top" >
    <template #content>
        <span >top</span>
      </template>
    <template #reference>
      <d-button bsStyle="common">top</d-button>
    </template>
  </d-popover>
  <d-popover  position="top-left" >
    <template #content>
        <span >top-left</span>
      </template>
    <template #reference>
      <d-button bsStyle="common">top-left</d-button>
    </template>
  </d-popover>
  <d-popover  position="top-right" >
    <template #content>
        <span >top-right</span>
      </template>
    <template #reference>
      <d-button bsStyle="common">top-right</d-button>
    </template>
  </d-popover>
</div>

<div style="margin-top:10px;">
  <d-popover   position="right" >
    <template #content>
        <div >right</div>
      </template>
    <template #reference>
      <d-button bsStyle="common">right</d-button>
    </template>
  </d-popover>
  <d-popover   position="right-top" >
    <template #content>
        <div >right-top</div>
        <div >right-top</div>
      </template>
    <template #reference>
      <d-button bsStyle="common">right-top</d-button>
    </template>
  </d-popover>
    <d-popover  position="right-bottom" >
    <template #content>
        <div >right-bottom</div>
        <div >right-bottom</div>
      </template>
    <template #reference>
      <d-button bsStyle="common">right-bottom</d-button>
    </template>
  </d-popover>
</div>

<div style="margin-top:10px;">
  <d-popover   position="bottom" >
    <template #content>
        <div >bottom</div>
      </template>
    <template #reference>
      <d-button bsStyle="common">bottom</d-button>
    </template>
  </d-popover>
    <d-popover  position="bottom-left" >
    <template #content>
        <div >bottom-left</div>
      </template>
    <template #reference>
      <d-button bsStyle="common">bottom-left</d-button>
    </template>
  </d-popover>
  <d-popover  position="bottom-right" >
    <template #content>
        <div >bottom-right</div>
      </template>
    <template #reference>
      <d-button bsStyle="common">bottom-right</d-button>
    </template>
  </d-popover>
</div>

```html
<div>
  <d-popover  position="left">
  <template #content>
      <div>left</div>
    </template>
  <template #reference>
    <d-button bsStyle="common">left</d-button>
  </template>
  </d-popover>
  <d-popover  position="left-top" >
    <template #content>
        <div >left-top</div>
        <div>left-top</div>
    </template>
    <template #reference>
      <d-button bsStyle="common">left-top</d-button>
    </template>
  </d-popover>
  <d-popover  position="left-bottom" >
    <template #content>
        <div>left-bottom</div>
        <div>left-bottom</div>
      </template>
    <template #reference>
      <d-button bsStyle="common">left-bottom</d-button>
    </template>
  </d-popover>
</div>

<div style="margin-top:10px;">
  <d-popover   position="top" >
    <template #content>
        <span >top</span>
      </template>
    <template #reference>
      <d-button bsStyle="common">top</d-button>
    </template>
  </d-popover>
  <d-popover  position="top-left" >
    <template #content>
        <span >top-left</span>
      </template>
    <template #reference>
      <d-button bsStyle="common">top-left</d-button>
    </template>
  </d-popover>
  <d-popover  position="top-right" >
    <template #content>
        <span >top-right</span>
      </template>
    <template #reference>
      <d-button bsStyle="common">top-right</d-button>
    </template>
  </d-popover>
</div>

<div style="margin-top:10px;">
  <d-popover   position="right" >
    <template #content>
        <div >right</div>
      </template>
    <template #reference>
      <d-button bsStyle="common">right</d-button>
    </template>
  </d-popover>
  <d-popover   position="right-top" >
    <template #content>
        <div >right-top</div>
        <div >right-top</div>
      </template>
    <template #reference>
      <d-button bsStyle="common">right-top</d-button>
    </template>
  </d-popover>
    <d-popover  position="right-bottom" >
    <template #content>
        <div >right-bottom</div>
        <div >right-bottom</div>
      </template>
    <template #reference>
      <d-button bsStyle="common">right-bottom</d-button>
    </template>
  </d-popover>
</div>

<div style="margin-top:10px;">
  <d-popover   position="bottom" >
    <template #content>
        <div >bottom</div>
      </template>
    <template #reference>
      <d-button bsStyle="common">bottom</d-button>
    </template>
  </d-popover>
    <d-popover  position="bottom-left" >
    <template #content>
        <div >bottom-left</div>
      </template>
    <template #reference>
      <d-button bsStyle="common">bottom-left</d-button>
    </template>
  </d-popover>
  <d-popover  position="bottom-right" >
    <template #content>
        <div >bottom-right</div>
      </template>
    <template #reference>
      <d-button bsStyle="common">bottom-right</d-button>
    </template>
  </d-popover>
</div>
```

### Delay trigger
Only when the trigger is hover, the mouse moves in for more than [mouseEnterDelay] milliseconds to trigger to prevent flashing caused by the user inadvertently swiping. The default value is 150 milliseconds; after the mouse is moved out, it will be triggered after [mouseLeaveDelay] milliseconds. , The Popover component will be hidden, the default value is 100 milliseconds。

<div>
  <d-popover  position="bottom-right" trigger="hover" :mouseEnterDelay ="500">
    <template #content>
        <div > Mouse enter 500ms later. </div>
        show Me
      </template>
    <template #reference>
      <d-button bsStyle="primary">MouseEnter delay 500ms</d-button>
    </template>
  </d-popover>
  <d-popover  position="bottom-right" trigger="hover" :mouseLeaveDelay="2000">
    <template #content>
        <div> Mouse leave 2000ms later. </div>
      </template>
    <template #reference>
      <d-button bsStyle="common"> MouseLeave delay 2000ms</d-button>
    </template>
  </d-popover>
</div>

```html
  <d-popover  position="bottom-right" >
    <template #content>
        <div >bottom-right</div>
      </template>
    <template #reference>
      <d-button bsStyle="primary">bottom-right</d-button>
    </template>
  </d-popover>
  <d-popover  position="bottom-right" >
    <template #content>
        <div >bottom-right</div>
      </template>
    <template #reference>
      <d-button bsStyle="common">bottom-right</d-button>
    </template>
  </d-popover>
```

### dPopover parameter

| parameter  | type | default | description | jump Demo |
| ---- | ---- | ---- | ---- | ---- |
| content | `string` | defalut |Optional, the display content of the pop-up box | [Custom-content](#Custom-content) |
| visible | `boolean` | false | Optional, the initial pop-up state of the bullet box | [Basic-usage](#Basic-usage) |
| trigger | `string` | click | Optional, trigger mode of the bullet frame | [Basic-usage](#Basic-usage) |
| popType | `string`  | default | Optional, pop-up box type, different styles | [Basic-usage](#Basic-usage) |
| zIndex | `number` | 1060 | Optional, z-index value is used to manually control the layer height | [Basic-usage](#Basic-usage) |
| positionType | `string` | bottom | Optionally, control the direction in which the bullet frame appears | [Pop-up-position](#Pop-up-position) |
| showAnimation | `boolean` | true | Optional, whether to show animation | [Basic-usage](#Basic-usage) |
| mouseEnterDelay | `number` | 150 | Optional, only when the trigger is hover, set the delay after the mouse moves in to display Popover, the unit is `ms`| [Delay-trigger](#Delay-trigger) |
| mouseLeaveDelay | `number` | 100     | Optional, only need to set the delay after the mouse is moved out to hide the popover only when the trigger is hover, the unit is `ms` | [Delay-trigger](#Delay-trigger) |

