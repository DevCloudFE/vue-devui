# ImagePreview

Preview the components of one or more pictures。

### When to use

When you need to preview the image or preview the image in the container according to the user input。

### Basic usage

Use the v-d-image-preview command to preview the image in the container。

<div v-d-image-preview class="devui-image-preview-demo">
  <img v-for="src in imageList" :src="src" :key="src" />
</div>

```html
<div v-d-image-preview class="devui-image-preview-demo">
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

### Custom open preview window

Pass in the custom parameter, the command will be automatically injected into the open method, and the preview window will be opened through custom.open

<div v-d-image-preview="{custom: image.custom, disableDefault:true }" class="devui-image-preview-demo">
  <img v-for="src in imageList" :src="src" :key="src" />
</div>
<d-button @click="open" class="btn">自定义</d-button>

```html
<div
  v-d-image-preview="{custom: image.custom, disableDefault:true }"
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

### Set zIndex

Set zIndex to control the level of the pop-up effect, and set backDropZIndex to control the level of the background of the pop-up layer。
You can see that when zIndex is set to be less than backDropZIndex, imagePreview will be displayed below the background。
You can close imagePreview by Esc。

```
// 待嵌入 modal 组件即可
```

### API

|      parameter      |   type    | default  | description                                           |
| :------------: | :-------: | :---: | :------------------------------------------------------------ |
|     custom     | `Object`  |  --   | Optional, the command will be automatically injected into the open method, and the preview window will be opened through custom.open |
| disableDefault | `Boolean` | false | Optional, turn off the default click trigger image preview mode |
|     zIndex     | `Number`  | 1050  | Optional, optional, set the z-index value of the picture when previewing |
| backDropZIndex | `Number`  | 1040  | Optional, set the z-index value of the image background during preview   |

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
