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
  <d-button @click="drawerShow">drawer {{ btnName }}</d-button>
  <d-drawer
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

export default {
  setup() {
    let isDrawerShow = ref(false)
    let btnName = ref('close')
    let drawerWidth = ref('15vw')
    let isCover = ref(false)
    let backdropCloseable = ref(true)

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
        resolve(false)
      })
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
      beforeHidden
    }
  }
}
</script>
```

:::

### 自定义模板

<h4>自定义抽屉板模板。</h4>

:::demo

```vue
<template>
  <d-button @click="drawerShow">drawer</d-button>
  <d-drawer v-model:visible="isDrawerShow" :isCover="false">
    <template v-slot:content>内容区插槽</template>
    <template v-slot:header="{ fullscreen, closeDrawer }">
      <div style="display: flex;">
        <div @click="closeDrawer">关闭</div>
        &nbsp;&nbsp;
        <div @click="fullscreen">全屏切换</div>
      </div>
    </template>
  </d-drawer>
</template>
<script>
import { ref } from 'vue'

export default {
  setup() {
    let isDrawerShow = ref(false)

    const drawerShow = () => {
      isDrawerShow.value = !isDrawerShow.value
    }

    return {
      isDrawerShow,
      drawerShow
    }
  }
}
</script>
```

:::

### 以服务的方式调用

:::demo

```vue
<template>
  <d-button @click="open()">click me</d-button>
</template>
<script>
import { defineComponent, ref, h } from 'vue'
export default defineComponent({
  setup(props, ctx) {
    const drawerOne = ref(null)
    const drawerTwo = ref(null)
    function open() {
      drawerTwo.value = this.$drawerService.create(
        {
          width: '50%',
          data: {
            'update:visible': true
          },
          content: () => {
            return h(
              'div',
              {
                onClick: () => {
                  drawerTwo.value.destroy()
                }
              },
              'destroy Two'
            )
          }
        },
        drawerTwo.value
      )
      drawerTwo.value.show()
      drawerOne.value = this.$drawerService.create(
        {
          content: () => {
            return [
              h(
                'div',
                {
                  onClick: () => {
                    drawerOne.value.hide()
                  }
                },
                'hide One'
              ),
              h(
                'div',
                {
                  onClick: () => {
                    drawerTwo.value.destroy()
                  }
                },
                'destroy Two'
              )
            ]
          }
        },
        drawerOne.value
      )
      drawerOne.value.show()
    }
    return {
      open
    }
  }
})
</script>
```

:::

### 参数及 API

|       参数        |         类型          |  默认   | 说明                                        | 跳转 Demo             |
| :---------------: | :-------------------: | :-----: | :------------------------------------------ | --------------------- |
|  v-model:visible  |       `Boolean`       | `false` | 必选，设置抽屉板是否可见                    | [基本用法](#基本用法) |
|       width       |       `String`        | `300px` | 可选，设置抽屉板宽度                        | [基本用法](#基本用法) |
|      zIndex       |       `Number`        | `1000`  | 可选，设置 drawer 的 z-index 值             | [基本用法](#基本用法) |
|      isCover      |       `Boolean`       | `true`  | 可选，是否有遮罩层                          | [基本用法](#基本用法) |
|  escKeyCloseable  |       `Boolean`       | `true`  | 可选，设置可否通过 esc 按键来关闭 drawer 层 | [基本用法](#基本用法) |
|     position      |       `String`        | 'right' | 可选，抽屉板出现的位置，'left'或者'right'   | [基本用法](#基本用法) |
| backdropCloseable |       `Boolean`       |  true   | 可选，设置可否通过点击背景来关闭 drawer 层  | [基本用法](#基本用法) |
|   destroyOnHide   |       `Boolean`       |  true   | 可选，设置是否在隐藏时销毁 drawer 层        | [基本用法](#基本用法) |
|   beforeHidden    | `Function \| Promise` |   --    | 可选，关闭窗口之前的回调                    | [基本用法](#基本用法) |
|      onClose      |      `Function`       |   --    | 可选，关闭 drawer 时候调用                  | [基本用法](#基本用法) |
|   onAfterOpened   |      `Function`       |   --    | 可选，打开 drawer 后时候调用                | [基本用法](#基本用法) |

### 插槽

|  名称   |    类型    |    说明    |         跳转 Demo         |
| :-----: | :--------: | :--------: | :-----------------------: |
| content |  具名插槽  | 抽屉板内容 | [自定义模板](#自定义模板) |
| header  | 作用域插槽 | 抽屉板头部 | [自定义模板](#自定义模板) |

#### 作用域插槽参数

|    名称     |    作用    |                                  说明                                   |         跳转 Demo         |
| :---------: | :--------: | :---------------------------------------------------------------------: | :-----------------------: |
| fullscreen  |  切换全屏  |                                   --                                    | [自定义模板](#自定义模板) |
| closeDrawer | 关闭抽屉板 | 在关闭抽屉板时必须调用该方法，否则 `beforeHidden` 和 `close` 属性不生效 | [自定义模板](#自定义模板) |
