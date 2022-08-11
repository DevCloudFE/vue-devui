# Sticky 便贴

便签组件。

#### 何时使用

当用户在滚动屏幕时，需要某个区域内容在段落或者浏览器可视区域可见时。

### 基本用法

:::demo 默认容器为父元素

```vue
<template>
  <div style="height: 400px">
    <d-sticky :view="view" :zIndex="zIndex" @statusChange="statusChangeHandler">
      <p>基本用法</p>
    </d-sticky>
  </div>
</template>

<script>
export default {
  setup(props) {
    const view = {
      top: 100,
      bottom: 0
    }
    const zIndex = 1000

    function statusChangeHandler(status) {
      console.log('status =', status)
    }

    return {
      view,
      zIndex,
      statusChangeHandler
    }
  }
}
</script>
```

:::

### 指定容器

:::demo

```vue
<template>
  <div style="height: 200px">
    <d-sticky :view="view" :container="container">
      <p>指定容器</p>
    </d-sticky>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
export default {
  setup(props) {
    let state = reactive({
      container: null
    })
    const view = {
      top: 100,
      bottom: 0
    }
    onMounted(() => {
      state.container = document.getElementsByClassName('container')[0]
    })
    return {
      view,
      ...toRefs(state)
    }
  }
}
</script>
```

:::

### 指定滚动容器

:::demo

```vue
<template>
  <div style="height:200px; overflow-y: scroll; " class="scrollTarget">
    <div style="height: 1000px">
      <d-sticky :view="view" :scrollTarget="scrollTarget">
        <p>指定滚动容器</p>
      </d-sticky>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'

export default {
  setup(props) {
    let state = reactive({
      scrollTarget: null
    })
    const view = {
      top: 100,
      bottom: 0
    }
    onMounted(() => {
      state.scrollTarget = document.getElementsByClassName('scrollTarget')[0]
    })
    return {
      view,
      ...toRefs(state)
    }
  }
}
</script>
```

:::

### API

|     参数     |              类型              |           默认           | 说明                                                                                   | 跳转 Demo                     | 全局配置项 |
| :----------: | :----------------------------: | :----------------------: | :------------------------------------------------------------------------------------- | ----------------------------- | ---------- |
|    zIndex    |            `number`            |            --            | 可选，指定包裹层的 z-index，用于浮动的时候控制 z 轴的叠放                              | [基本用法](#基本用法)         |            |
|  container   |           `Element`            |          父容器          | 可选，触发的容器，可不同于父容器                                                       | [指定容器](#指定容器)         |            |
|     view     | `{top?:number,bottom?:number}` |    `{top:0,bottom:0}`    | 可选，用于可视区域的调整，比如顶部有固定位置的头部等，数值对应被遮挡的顶部或底部的高度 | [基本用法](#基本用法)         |            |
| scrollTarget |           `Element`            | document.documentElement | 可选，设置要发生滚动的容器，一般为滚动条所在容器，为主页面的滚动条时候可以不设置       | [指定滚动容器](#指定滚动容器) |            |

### d-sticky 事件

|     事件     |   类型   |                     说明                     |       跳转 Demo       |
| :----------: | :------: | :------------------------------------------: | :-------------------: |
| statusChange | `string` | 可选，状态变化的时候触发，值为变化后的状态值 | [基本用法](#基本用法) |
