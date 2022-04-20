# ImagePreview 图片预览

预览一张或多张图片的组件。

#### 何时使用

需要根据用户传入进行图片预览展示或对容器内图片进行预览时。

### 基本用法

:::demo 使用 v-d-image-preview 指令，对容器内图片进行预览。

```vue
<template>
  <div v-d-image-preview class="devui-image-preview-demo">
    <img v-for="src in imageList" :src="src" :key="src" />
  </div>
</template>
<script>
import { defineComponent, ref, reactive } from 'vue'
export default defineComponent({
  setup() {
    const _imageList = [
      'https://devui.design/components/assets/image1.png',
      'https://devui.design/components/assets/image3.png'
    ]
    const imageList = ref(_imageList)
    return {
      imageList
    }
  }
})
</script>
```

:::

### 自定义开启预览窗口

:::demo 传入 custom 参数,指令会自动注入 open 方法，通过 custom.open 开启预览窗口

```vue
<template>
  <div
    v-d-image-preview="{ custom: image.custom, disableDefault: true }"
    class="devui-image-preview-demo"
  >
    <img v-for="src in imageList" :src="src" :key="src" />
  </div>
  <d-button @click="open" class="btn">自定义</d-button>
</template>
<script>
import { defineComponent, ref, reactive } from 'vue'
export default defineComponent({
  setup() {
    const _imageList = [
      'https://devui.design/components/assets/image1.png',
      'https://devui.design/components/assets/image3.png'
    ]
    const imageList = ref(_imageList)
    const image = reactive({
      custom: {},
      imageList: _imageList
    })
    function open() {
      image.custom.open()
    }
    return {
      imageList,
      image,
      open
    }
  }
})
</script>
```

:::

### 设置 zIndex

:::demo 通过设置 zIndex 控制弹出效果的层级，设置 backDropZIndex 控制弹出层背景的层级。可以看到当设置 zIndex 小于 backDropZIndex 时，imagePreview 会显示在背景下方。可以通过 Esc 关闭 imagePreview。

```vue
<template>
  <div class="devui-image-preview-flex">
    <d-radio-group direction="row" v-model="zIndex">
      <d-radio v-for="item in zIndexList" :key="item" :value="item">
        {{ item }}
      </d-radio>
    </d-radio-group>
    <span class="text">zIndex: {{ zIndex }}</span>
  </div>
  <div class="devui-image-preview-flex">
    <d-radio-group direction="row" v-model="backDropZIndex">
      <d-radio v-for="item in backDropZIndexList" :key="item" :value="item">
        {{ item }}
      </d-radio>
    </d-radio-group>
    <span class="text">backDropZIndex: {{ backDropZIndex }}</span>
  </div>
  <div
    v-d-image-preview="{ zIndex: Number(zIndex), backDropZIndex: Number(backDropZIndex) }"
    class="devui-image-preview-demo"
  >
    <img v-for="src in imageList" :src="src" :key="src" />
  </div>
</template>
<script>
import { defineComponent, ref, reactive } from 'vue'
export default defineComponent({
  setup() {
    const imageList = ref([
      'https://devui.design/components/assets/image1.png',
      'https://devui.design/components/assets/image3.png'
    ])
    const zIndexList = ref(['1000', '1050', '1100'])
    const backDropZIndexList = ref(['900', '1040', '1000'])
    const zIndex = ref('1050')
    const backDropZIndex = ref('1040')

    return {
      imageList,
      zIndexList,
      backDropZIndexList,
      zIndex,
      backDropZIndex
    }
  }
})
</script>
```

:::

### 参数

|      参数名      |   类型    | 默认  | 说明                                                          |
| :------------ | :------- | :--- | :------------------------------------------------------------ |
|     custom     | `Object`  |  --   | 可选，指令会自动注入 open 方法，通过 custom.open 开启预览窗口 |
| disable-default | `Boolean` | false | 可选，关闭默认点击触发图片预览方式                            |
|     z-index     | `Number`  | 1050  | 可选，设置预览时图片的 z-index 值                             |
| back-drop-z-index | `Number`  | 1040  | 可选，设置预览时图片背景的 z-index 值                         |

<style lang="scss">
.devui-image-preview-demo {
  display: flex;
  flex-wrap: wrap;
  img {
    cursor: pointer;
    margin-bottom: 10px;
  }
  .btn {
    margin: 10px;
  }
}
.devui-image-preview-flex {
  display: flex;
  align-items: center;
  .text {
    margin-left: 20px;
  }
}
</style>
