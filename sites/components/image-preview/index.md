# ImagePreview 图片预览

预览一张或多张图片的组件。

### 何时使用

需要根据用户传入进行图片预览展示或对容器内图片进行预览时。

### 基本用法

使用 image-preview 指令，对容器内图片进行预览。

<div v-image-preview class="devui-image-preview-demo">
  <img v-for="src in imageList" :src="src" :key="src" />
</div>

```html
<div v-image-preview class="devui-image-preview-demo">
  <img v-for="src in imageList" :src="src" :key="src" />
</div>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { IMAGE1, IMAGE2 } from './image'

  export default defineComponent({
    setup() {
      const imageList = ref([IMAGE1, IMAGE2])
      return {
        imageList
      }
    }
  })
</script>
```

### 自定义开启预览窗口

传入 custom 参数,指令会自动注入 open 方法，通过 custom.open 开启预览窗口

<div v-image-preview="{custom: image.custom, disableDefault:true }" class="devui-image-preview-demo">
  <img v-for="src in imageList" :src="src" :key="src" />
</div>
<d-button @click="open" class="btn">自定义</d-button>

```html
<div
  v-image-preview="{custom: image.custom, disableDefault:true }"
  class="devui-image-preview-demo"
>
  <img v-for="src in image.imageList" :src="src" :key="src" />
</div>
<d-button @click="open" class="btn">自定义</d-button>

<script lang="ts">
  import { defineComponent, reactive } from 'vue'
  import { IMAGE1, IMAGE2 } from './image'

  export default defineComponent({
    setup() {
      const image = reactive({
        custom: {},
        imageList: [IMAGE1, IMAGE2]
      })

      function open() {
        images.custom.open()
      }
      return {
        image,
        open
      }
    }
  })
</script>
```

### 设置 zIndex

通过设置 zIndex 控制弹出效果的层级，设置 backDropZIndex 控制弹出层背景的层级。
可以看到当设置 zIndex 小于 backDropZIndex 时，imagePreview 会显示在背景下方。
可以通过 Esc 关闭 imagePreview。

```
// 待嵌入 modal 组件即可
```

### API

|      参数      |   类型    | 默认  | 说明                                                          |
| :------------: | :-------: | :---: | :------------------------------------------------------------ |
|     custom     | `Object`  |  --   | 可选，指令会自动注入 open 方法，通过 custom.open 开启预览窗口 |
| disableDefault | `Boolean` | false | 可选，关闭默认点击触发图片预览方式                            |
|     zIndex     | `Number`  | 1050  | 可选，可选，设置预览时图片的 z-index 值                       |
| backDropZIndex | `Number`  | 1040  | 可选，设置预览时图片背景的 z-index 值                         |

<script lang="ts">
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

<style lang="scss">
.devui-image-preview-demo {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  img {
    margin: 10px;
    cursor: pointer;
  }
  .btn {
    margin: 10px;
  }
}
</style>
