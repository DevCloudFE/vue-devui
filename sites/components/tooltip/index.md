# Tooltip 提示

文字提示组件。

### 何时使用

用户鼠标移动到文字上，需要进一步的提示时使用。

### 基本用法

<d-tooltip position='top' content='I am a HTML Element!'><button style="height: 50px; width: 60px; background: cornflowerblue; margin-top: 30px;">上面</button></d-tooltip>

<d-tooltip position='right' content='I am a HTML Element!'><button style="height: 50px; width: 60px; background: cornflowerblue; margin-top: 30px;">右面</button></d-tooltip>

<d-tooltip position='bottom' content='I am a HTML Element!'><button style="height: 50px; width: 60px; background: cornflowerblue; margin-top: 30px;">下面</button></d-tooltip>

<d-tooltip position='left' content='I am a HTML Element!'><button style="height: 50px; width: 60px; background: cornflowerblue; margin-top: 30px;">左面</button></d-tooltip>

```html
<section>
    <d-tooltip position='top' content='I am a HTML Element!'>
        <button>上面</button>
    </d-tooltip>
    <d-tooltip position='bottom' content='I am a HTML Element!'>
        <button>下面</button>
    </d-tooltip>
    <d-tooltip position='left' content='I am a HTML Element!'>
        <button>左面</button>
    </d-tooltip>
    <d-tooltip position='right' content='I am a HTML Element!'>
        <button>右面</button>
    </d-tooltip>
</section>
```

```scss
.d-tooltip {
  box-sizing: border-box;
  position: relative;
  .tooltip {
    box-sizing: border-box;
    position: absolute;
    width: fit-content;
    transition: all 0.5s;
    .arrow {
      width: 0;
      height: 0;
      position: absolute;
    }
    .tooltipcontent {
      box-sizing: border-box;
      padding: 10px;
      margin-left: 10px;
      width: fit-content;
      background-color: rgb(51, 51, 51);
      color: #fff;
    }
  }
}
```

### 延时触发

