# Drawer 抽屉板

屏幕边缘滑出的浮层面板组件。

### 何时使用

1. 抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到到原任务。
2. 当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。
3. 当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。

### 基本用法

<h4>基本用法，可以控制全屏、关闭和设置宽度。</h4>

:::demo

```vue
<template>
  <d-button  @click="drawerShow"> drawer {{ btnName }} </d-button>
  <d-drawer
    v-if="isDrawerShow"
    v-model:visible="isDrawerShow" 
    :width="drawerWidth"
    :isCover="isCover" 
    :backdropCloseable="backdropCloseable"
    :beforeHidden="beforeHidden"
    position="right"
    @close="drawerClose"
    @afterOpened="drawerAfterOpened"
  />
</template>
<script>
import { ref } from 'vue'

export default ({
  setup() {
    let isDrawerShow = ref(false)
    let btnName = ref('close')
    let drawerWidth = ref('15vw')
    let isCover = ref(false)
    let backdropCloseable = ref(true);

    const drawerShow = () => {
      isDrawerShow.value = true
      btnName.value = 'open'
    }

    const drawerClose = () => {
      btnName.value = 'close'
    }

    const drawerAfterOpened = () => {
      console.log('open')
    }

    const beforeHidden = () => {
      return new Promise((resolve) => {
        resolve(false);
      });
    }

    return {
      isDrawerShow,
      btnName,
      drawerWidth,
      drawerShow,
      drawerClose,
      drawerAfterOpened,
      isCover,
      backdropCloseable,
      beforeHidden,
    }
  }
})
</script>
```

:::

### 参数及API

| 参数 | 类型 | 默认 | 说明 | 跳转 Demo |
| :---------: | :------: | :-------: | :----------------------- | --------------------------------- |
| v-model:visible | `Boolean` | `false` | 必选，设置抽屉板是否可见 | [基本用法](#基本用法) |
| width | `String` | `300px` | 可选，设置抽屉板宽度 | [基本用法](#基本用法) |
| zIndex | `Number` | `1000` | 可选，设置 drawer 的 z-index 值 | [基本用法](#基本用法) |
| isCover | `Boolean` | `true` | 可选，是否有遮罩层 | [基本用法](#基本用法) |
| escKeyCloseable | `Boolean` | `true` | 可选，设置可否通过 esc 按键来关闭 drawer 层 | [基本用法](#基本用法) |
| position | `String` | 'right' | 可选，抽屉板出现的位置，'left'或者'right' | [基本用法](#基本用法) |
| backdropCloseable | `Boolean` | true | 可选，设置可否通过点击背景来关闭 drawer 层 | [基本用法](#基本用法) |
| beforeHidden | `Function \| Promise` | -- | 可选，关闭窗口之前的回调 | [基本用法](#基本用法) |
| onClose | `Function` | -- | 可选，关闭 drawer 时候调用 | [基本用法](#基本用法) |
| onAfterOpened | `Function` | -- | 可选，打开 drawer 后时候调用 | [基本用法](#基本用法) |
