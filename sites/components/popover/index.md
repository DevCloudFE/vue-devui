# Popover 悬浮提示  
简单的文字提示气泡框。

### 何时使用
用来通知用户非关键性问题或提示某控件处于某特殊情况。

### 基本用法
当Popover弹出时，会基于`reference`插槽的内容进行定位。

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
```

### 自定义内容  
自定义`reference`插槽的内容与弹出提示内容。

<div>
  <d-popover content="自定义内容">
    <template #reference>
      <d-button bsStyle="primary">自定义内容</d-button>
    </template>
  </d-popover>
</div>

```html
<div>
  <d-popover content="自定义内容">
    <template #reference>
      <d-button bsStyle="primary">自定义内容</d-button>
    </template>
  </d-popover>
</div>
```

### 弹出位置
总共支持12个弹出位置。

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

### dPopover 参数

| 参数  | 类型 | 默认值 | 描述 | 跳转Demo |
| ---- | ---- | ---- | ---- | ---- |
| content | `string` | defalut |可选    弹出框的显示内容或 | [自定义内容](#自定义内容) |
| visible | `boolean` | false | 可选    弹框的初始化弹出状态 | [基本用法](#基本用法) |
| trigger | `string` | click | 可选    弹框触发方式 | [基本用法](#基本用法) |
| popType | `string`  | default | 可选    弹出框类型，样式不同 | [基本用法](#基本用法) |
| zIndex | `number` | 1060 | 可选     z-index值用于手动控制层高 | [基本用法](#基本用法) |
| positionType | `string` | bottom | 可选     positionType控制弹框出现 的方向 | [弹出位置](#弹出位置) |

