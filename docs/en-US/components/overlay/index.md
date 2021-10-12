## overlay
The mask layer is a basic component and is used to build components independent of the current page layout。
### When to use
You can use this component when you need a global pop-up window, or when you need an element-following function。
### Fixed overlay

:::demo Use `sm`, `''`, `lg` to define the basic type of `Search`

```vue
<template>
  <d-button @click="handleClick" style="width: 100px;">{{title}}</d-button>
  <d-fixed-overlay 
    v-model:visible="visible" 
    backgroundClass="justify-center items-center bg-gray-50" 
    backgroundBlock
  >
    <div class="h-100 w-100" style="background: red;">hello world</div>
  </d-fixed-overlay>
</template>
<script>
import { defineComponent, ref, computed } from 'vue';
export default defineComponent({
  setup() { 
    const origin = ref();
    const visible = ref(false);
    const handleClick = () => visible.value = !visible.value;
    const title = computed(() => visible.value ? '隐藏' : '显示固定遮罩层' );
    return {
      visible,
      handleClick,
      title
    }
  },
});
</script>
```
:::


### Elastic overlay

:::demo
```vue
<template>
  <div class="h-500 w-full flex flex-column items-center justify-center">
    <div 
      ref="origin" 
      class="flex items-center justify-center h-100 w-100 text-white bg-gray"
    >orgin</div>
    <d-button @click="handleVisible" style="margin: 20px;">{{title}}</d-button>
    <div class="w-full mt-20">
      <div class="flex mt-20">
        <span style="width: 200px">依赖元素的 X 轴：</span>
        <d-radio-group v-model="position.originX" :values="horizontalProps" css-style="row"/>
      </div>
      <div class="flex mt-20">
        <span style="width: 200px">依赖元素的 Y 轴：</span>
        <d-radio-group v-model="position.originY" :values="verticalProps" css-style="row"/>
      </div>
      <div class="flex mt-20">
        <span style="width: 200px">Overlay X 轴：</span>
        <d-radio-group v-model="position.overlayX" :values="horizontalProps" css-style="row"/>
      </div>
      <div class="flex mt-20">
        <span style="width: 200px">Overlay Y 轴：</span>
        <d-radio-group v-model="position.overlayY" :values="verticalProps" css-style="row"/>
      </div>
    </div>
  </div>

  <d-flexible-overlay 
    :origin="origin" 
    v-model:visible="visible"
    :position="position"
  >
    <div 
      class="flex items-center justify-center text-white-50 h-100 w-100"
      style="background: #673ab7;"
    >hello world</div>
  </d-flexible-overlay>
</template>
<script>
import { defineComponent, ref, computed, reactive } from 'vue'

export default defineComponent({
  setup() { 
    const origin = ref();
    const visible = ref(false);
    const title = computed(() => visible.value ? '隐藏' : '显示')
    const handleVisible = () => visible.value = !visible.value;
    
    const horizontalProps = ['left', 'center', 'right'];
    const verticalProps = ['top', 'center', 'bottom'];
    const position = reactive({
      originX: 'left', 
      originY: 'top', 
      overlayX: 'left', 
      overlayY: 'top'
    });

    return {
      origin,
      visible,
      handleVisible,
      title,
      position,
      verticalProps, 
      horizontalProps
    }
  }
})
</script>
```

:::

<style>
.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.h-100 {
  height: 100px;
}

.w-100 {
  width: 100px;
}

.text-white {
  color: white;
}

.bg-gray {
  background: gray;
}

.h-500 {
  height: 500px;
}

.w-full {
  width: 100%;
}

.bg-gray-50 {
  background: #00000088;
}

.text-white-50 {
  color: #ffffff88;
}

.mt-20 {
  margin-top: 20px;
}
</style>


### API 
The parameter of d-fixed-overlay

|       parameter       |            type            | default  | description                                                                  |
| :--------------: | :------------------------: | :---: | :-------------------------------------------------------------------- |
|     visible      |         `boolean`          | false | Optional, whether the mask layer is visible                                                 |
| onUpdate:visible | `(value: boolean) => void` |  --   | Optional, the mask layer cancels the visible event                                              |
| backgroundBlock  |         `boolean`          | false | Optional, if true, the background cannot be scrolled                                       |
| backgroundClass  |          `string`          |  --   | Optional, the style class of the background                                                    |
|   hasBackdrop    |         `boolean`          | true  | Optional, if false, the content behind the background will be triggered                           |
|  backdropClick   |        `() => void`        |  --   | Optional, click on the event triggered by the background                                              |
|  backdropClose   |         `boolean`          | false | Optional, if true, clicking on the background will trigger `onUpdate:visible`, the default parameter is false |
|   overlayStyle   |      `CSSProperties`       |  --   | Optional, the style of the mask layer                                                   |

The parameter of d-flexible-overlay

|       参数       |                                                                                                    类型                                                                                                    | 默认  | 说明                                                              |
| :--------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---: | :---------------------------------------------------------------- |
|     visible      |                                                                                                 `boolean`                                                                                                  | false | 可选，遮罩层是否可见                                              |
| onUpdate:visible |                                                                                         `(value: boolean) => void`                                                                                         |  --   | 可选，遮罩层取消可见事件                                          |
| backgroundBlock  |                                                                                                 `boolean`                                                                                                  | false | 可选，如果为 true，背景不能滚动                                   |
| backgroundClass  |                                                                                                  `string`                                                                                                  |  --   | 可选，背景的样式类                                                |
|   hasBackdrop    |                                                                                                 `boolean`                                                                                                  | true  | 可选，如果为false，背景后下的内容将可以触发                       |
|  backdropClick   |                                                                                                `() => void`                                                                                                |  --   | 可选，点击背景触发的事件                                          |
|  backdropClose   |                                                                                                 `boolean`                                                                                                  | false | 可选，如果为true，点击背景将触发 `onUpdate:visible`，参数是 false |
|      origin      |                                                     `Element \| ComponentPublicInstance \| { x: number, y: number, width?: number, height?: number }`                                                      | false | 必选，你必须指定起点元素才能让遮罩层与该元素连接在一起            |
|     position     | `{originX: HorizontalPos, originY: VerticalPos, overlayX: HorizontalPos, overlayY: VerticalPos } (type HorizontalPos = 'left' \| 'center' \| 'right') ( type VerticalPos = 'top' \| 'center' \| 'bottom')` | false | 可选，指定遮罩层与原点的连接点                                    |
