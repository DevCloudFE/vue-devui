# Tooltip 提示

文字提示组件。

### 何时使用

用户鼠标移动到文字上，需要进一步的提示时使用。

### 基本用法

:::demo我们可以通过控制属性`position`来控制tooltip的显示位置，`position`取值有4个，分别是`top`、`right`、`bottom`、`left`。通过属性`content`控制tooltip提示框的内容。

<d-tooltip position='top' content='I am a HTML Element!'><button style="height: 50px; width: 60px; background: cornflowerblue; margin-top: 30px;">上面</button></d-tooltip>

<d-tooltip position='right' content='I am a HTML Element!'><button style="height: 50px; width: 60px; background: cornflowerblue; margin-top: 30px;">右面</button></d-tooltip>

<d-tooltip position='bottom' content='I am a HTML Element!'><button style="height: 50px; width: 60px; background: cornflowerblue; margin-top: 30px;">下面</button></d-tooltip>

<d-tooltip position='left' content='I am a HTML Element!'><button style="height: 50px; width: 60px; background: cornflowerblue; margin-top: 30px;">左面</button></d-tooltip>

```vue
<template>
  <d-tooltip position='top' content='I am a HTML Element!'>
    <div class='example'>上面</div>
  </d-tooltip>
  <d-tooltip position='bottom' content='I am a HTML Element!'>
    <div class='example'>下面</div>
  </d-tooltip>
  <d-tooltip position='left' content='I am a HTML Element!'>
    <div class='example'>左面</div>
  </d-tooltip>
  <d-tooltip position='right' content='I am a HTML Element!'>
    <div class='example'>右面</div>
  </d-tooltip>
</template>
```

```css
.example {
  height: 50px;
  width: 60px;
  background: cornflowerblue;
  margin-top: 30px;
}
```
:::

### 延时触发

鼠标移入的时长超过 [mouseEnterDelay] 毫秒之后才会触发，以防止用户无意划过导致的闪现，默认值是150毫秒；鼠标移出之后，再经过[mouseLeaveDelay]毫秒后，toolTip组件才会隐藏，默认值是100毫秒。

:::demo 通过`mouseEnterDelay`属性来控制tooltip提示框的`延迟显示`（默认是100ms），`mouseLeaveDelay`属性来控制tooltip提示框的`延迟消失`（默认是150ms）
<d-tooltip position='top' content=' Mouse enter 500ms later.' mouseEnterDelay='500'><div style='width: fit-content; height: 30px; background: cornflowerblue;padding: 10px;display:flex; justify-content: center; align-items: center;color: #fff;border-radius: 3px;'>MouseEnter delay 500ms</div></d-tooltip>

<d-tooltip position='top' content=' Mouse leave 1000ms later.' mouseLeaveDelay='1000'><div style='width: fit-content; height: 30px; padding: 10px; display: flex; justify-content: center; align-items: center; color: #252b3a; background: #fff;border-radius: 5px;border: 1px solid rgb(173, 176, 184); margin-top: 30px;'>MouseLeave delay 1000ms</div></d-tooltip>
```vue
<template>
  <d-tooltip position='top' content='Mouse enter 500ms later.' mouseEnterDelay='500'>
    <div class='customCss'>MouseEnter delay 500ms</div>
  </d-tooltip>
  <br>
  <d-tooltip position='top' content='Mouse leave 1000ms later.' mouseLeaveDelay='1000'>
    <div class='customCss-leave'>MouseLeave delay 1000ms</div>
  </d-tooltip>
</template>
```

```css
.customCss {
  width: fit-content;
  height: 30px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: cornflowerblue;
}
.customCss-leave {
  width: fit-content;
  height: 30px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #252b3a;
  background: #fff;
}
```
:::

### Tooltip Api

|    参数     |   类型   |   默认    | 说明                     | 跳转 Demo                         | 全局配置项 |
| :---------: | :------: | :-------: | :----------------------- | --------------------------------- | --------- |
|    content     | `string|DOMString` |    --     | 必选，tooltip显示内容             | [基本用法](#基本用法)             ||
|    position     | `PositionType | PositionType[]` |  ['top', 'right', 'bottom', 'left']   | 可选，tooltip显示位置     | [基本用法](#基本用法)             ||
|    showAnimation     | `boolean` |  true   | 可选，是否显示划出动画    |            |✔|
|    mouseEnterDelay    | `number` | 150 | 可选，鼠标移入后延时多少才显示Tooltip，单位是ms           | [基本用法](#延时触发)             ||
| mouseLeaveDelay | `number` |  100   | 可选，鼠标移出后延时多少才隐藏Tooltip，单位是ms | [基本用法](#延时触发) ||
