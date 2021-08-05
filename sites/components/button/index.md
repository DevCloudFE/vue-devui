# Button 按钮

按钮用于开始一个即时操作。

### 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

### 主要按钮

<d-button id="primaryBtn" style="margin-right: 8px">Primary</d-button>
<d-button :disabled="true">Disabled</d-button>

```html
<d-button id="primaryBtn" style="margin-right: 8px">Primary</d-button>
<d-button :disabled="true">Disabled</d-button>
```

### 次要按钮

<d-button bsStyle="common" style="margin-right: 8px">Common</d-button>
<d-button bsStyle="common" :disabled="true">Disabled</d-button>

```html
<d-button bsStyle="common" style="margin-right: 8px">Common</d-button>
<d-button bsStyle="common" :disabled="true">Disabled</d-button>
```