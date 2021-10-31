# Tooltip 

Text prompt component。

### When to use

The user moves the mouse to the text, and it is used when further prompts are needed。

### Basic usage

:::demo We can control the display position of the tooltip by controlling the attribute `position`. There are 4 values for `position`, which are `top`, `right`, `bottom`, and `left`. Control the content of the tooltip prompt box through the attribute `content`。

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

### Delay trigger

The mouse will be triggered after moving in for more than [mouseEnterDelay] milliseconds to prevent flashing caused by the user accidentally swiping. The default value is 150 milliseconds; after the mouse is moved out, the toolTip component will be hidden after [mouseLeaveDelay] milliseconds. The default value Is 100 milliseconds。

:::demo Use the `mouseEnterDelay` property to control the `delay display` of the tooltip prompt box (the default is 100ms), and the `mouseLeaveDelay` property to control the `delay disappearing` of the tooltip prompt box (the default is 150ms)
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

|    parameter     |   type   |   default    | description                     | jump Demo                         | Global configuration items |
| :---------: | :------: | :-------: | :----------------------- | --------------------------------- | --------- |
|    content     | `string|DOMString` |    --     | Required, tooltip displays content             | [基本用法](#基本用法)             ||
|    position     | `PositionType | PositionType[]` |  ['top', 'right', 'bottom', 'left']   | Optional, tooltip display position     | [基本用法](#基本用法)             ||
|    showAnimation     | `boolean` |  true   | Optional, whether to show the wipe out animation    |            |✔|
|    mouseEnterDelay    | `number` | 150 | Optional, how long is the delay before the Tooltip is displayed after the mouse moves in, the unit is ms          | [基本用法](#延时触发)             ||
| mouseLeaveDelay | `number` |  100   | Optional, after the mouse is moved out, how long is the delay before the Tooltip is hidden, the unit is ms | [基本用法](#延时触发) ||
