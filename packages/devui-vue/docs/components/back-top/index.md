# BackTop 回到顶部

返回页面顶部的操作按钮。

#### 何时使用

当页面内容区域比较长时；当用户需要频繁返回顶部查看相关内容时。

### 基本用法

回到顶部按钮的默认样式，距离底部 50px，右侧 30px。

:::demo

```vue
<template>
  <div>
    <div>这里看不到我嘿嘿，下滑试试</div>
    <d-back-top />
    <d-back-top bottom="100px">
      <d-icon name="chevron-up"></d-icon>
    </d-back-top>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      msg: 'BackTop 回到顶部 组件文档示例'
    }
  }
})
</script>

<style></style>
```

:::

### 自定义

回到顶部组件可自定义按钮样式，限制宽高：40px \* 40px。同时可通过 class 个性化设置按钮样式。

:::demo

```vue
<template>
  <div>
    <div>这里看不到我嘿嘿，下滑试试</div>
    <d-back-top bottom="100px">
      <d-icon name="chevron-up" color="#fff"></d-icon>
    </d-back-top>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {}
})
</script>

<style>
.devui-back-top .devui-backtop-custom {
  background-color: #5e7ce0;
}
</style>
```

:::

### 嵌入容器内部

通过设置 target 参数，可对特定容器进行返回顶部操作。

:::demo

```vue
<template>
  <div class="devui-scroll-container">
    <ul class="devui-scroll-content">
      <li class="backtop-demo-item" v-for="(item, index) of list" :key="item">
        {{ index + 1 + '. ' + item }}
      </li>
      <d-back-top
        target=".devui-scroll-content"
        :visibleHeight="100"
        bottom="5px"
        right="5px"
      ></d-back-top>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const msg = 'DevUI倡导沉浸、灵活、至简的设计价值观'
    const list = []
    for (let i = 0; i < 20; i++) {
      list.push(msg)
    }
    return {
      list
    }
  }
})
</script>

<style>
.devui-scroll-container {
  width: 600px;
  height: 300px;
  margin-top: 20px;
}

.devui-scroll-content {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  list-style-type: none;
}

.backtop-demo-item {
  line-height: 35px;
  border-bottom: 1px solid #dfe1e6;
}
</style>
```

:::

### d-back-top

d-back-top 参数

|     参数      |   类型   |   默认   |                                 说明                                  |       跳转 Demo       |
| :-----------: | :------: | :------: | :-------------------------------------------------------------------: | :-------------------: |
|    bottom     | `string` |  "50px"  |                      可选，按钮距离页面底部位置                       |   [示例](#基本用法)   |
|     right     | `string` |  "30px"  |                       可选，按钮距离页面右边距                        |   [示例](#基本用法)   |
| visibleHeight | `number` |   300    | 可选，滚动高度达到 visibleHeight 所设值后展示回到顶部按钮，单位为`px` |   [示例](#基本用法)   |
|    target     | `string` | 'window' |                      可选，触发滚动的元素选择器                       | [示例](#嵌入容器内部) |
|               |          |          |                                                                       |                       |

d-back-top 事件

| 事件 | 类型 | 说明 | 跳转 Demo |
| ---- | ---- | ---- | --------- |
|      |      |      |           |
|      |      |      |           |
|      |      |      |           |
