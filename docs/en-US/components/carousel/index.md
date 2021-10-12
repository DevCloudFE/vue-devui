# Carousel

A set of carousel areas。

### When to use

1. Used to display pictures or cards。

### Basic usage
<d-carousel height="200px" v-model:activeIndex="activeIndex" :activeIndexChange="onChange">
  <d-carousel-item v-for="item in items" :key="item">{{ item }} </d-carousel-item>
</d-carousel>

```html
<d-carousel height="200px">
  <d-carousel-item v-for="item in items" :key="item">{{ item }} </d-carousel-item>
</d-carousel>
```
```css
.d-carousel-item {
  text-align: center;
  line-height: 200px;
  background: var(--devui-global-bg, #f3f6f8);
}
```
### 指示器&切换箭头
arrowTrigger设为always可以使箭头永久显示，dotTrigger设为hover可以使hover到点上就切换。

<d-carousel height="200px" arrowTrigger="always" dotTrigger="hover">
  <d-carousel-item v-for="item in items" :key="item">{{ item }} </d-carousel-item>
</d-carousel>

```html
<d-carousel height="200px" arrowTrigger="always" dotTrigger="hover">
  <d-carousel-item v-for="item in items" :key="item">{{ item }} </d-carousel-item>
</d-carousel>
```
### Automatic carousel
<d-carousel height="200px" autoplay :autoplaySpeed="3000">
  <d-carousel-item v-for="item in items" :key="item">{{ item }} </d-carousel-item>
</d-carousel>

```html
<d-carousel height="200px" autoplay :autoplaySpeed="3000">
  <d-carousel-item v-for="item in items" :key="item">{{ item }} </d-carousel-item>
</d-carousel>
```
### Custom action
<d-carousel ref="carousel" height="200px" arrowTrigger="never">
  <d-carousel-item v-for="item in items" :key="item">{{ item }} </d-carousel-item>
</d-carousel>
<div class="carousel-demo-operate">
  <d-button bsStyle="common" :btnClick="onPrev">上一张</d-button>
  <d-button bsStyle="primary" :btnClick="onNext">下一张</d-button>
  <d-button bsStyle="common" :btnClick="onGoFirst">第一张</d-button>
</div>

```html
<d-carousel ref="carousel" height="200px" arrowTrigger="never" :activeIndexChange="onChange">
  <d-carousel-item v-for="item in items" :key="item">{{ item }} </d-carousel-item>
</d-carousel>
<div class="carousel-demo-operate">
  <d-button bsStyle="common" :btnClick="onPrev">上一张</d-button>
  <d-button bsStyle="primary" :btnClick="onNext">下一张</d-button>
  <d-button bsStyle="common" :btnClick="onGoFirst">第一张</d-button>
</div>
```
```css
.carousel-demo-operate{
    margin-top: 10px;

    display: flex;
    align-items: center;

    > * {
        margin-right: 20px;
    }
}
```

### API
#### parameter

|     parameter     |             type             |   default   | description                                            | jump Demo                                        |
| :----------: | :--------------------------: | :------: | :---------------------------------------------- | ------------------------------------------------ |
| arrowTrigger | `'hover'\|'never'\|'always'` | 'hover'  | Optional, specify the switching arrow display mode                      | [Indicator-switch-arrow](#Indicator-switch-arrow)       |
|   autoplay   |          `boolean`           |  false   | Optional, whether to rotate automatically                              | [Automatic-carousel](#Automatic-carousel) |
| autoplaySpeed |           `number`           |   3000   | Optional, used with `autoplay`, automatic rotation speed, unit: ms | [Automatic-carousel](#Automatic-carousel) |
|    height    |           `string`           |  '100%'  | Optional, carousel container height                             | [Basic-usage](#Basic-usage)    |
|   showDots   |          `boolean`           |   true   | Optional, whether to display the panel indicator                        | [Automatic-carousel](#Automatic-carousel) |
| dotPosition  |      `'top'\|'bottom'`       | 'bottom' | Optional, panel indicator position                            | [Indicator-switch-arrow](#Indicator-switch-arrow)  |
|  dotTrigger  |      `'click'\|'hover'`      | 'click'  | Optional, indicator triggers carousel mode                        | [Indicator-switch-arrow](#Indicator-switch-arrow)  |
| activeIndex  |           `number`           |    0     | Optional, initialize the active card index, starting from 0, supporting `[(activeIndex)]` two-way binding        | [Basic-usage](#Basic-usage)    |

#### Event

|      event          |          type           |                    description                     | jump Demo                                                     |
| :----------------: | :---------------------: | :-----------------------------------------: | -------------------------------------------------            |
|      activeIndexChange    | `EventEmitter<number>`  | When the card is switched, return to the index of the current card, starting from 0    | [Basic-usage](#Basic-usage)             |

#### methods

|    methods     | description                                | jump Demo                       |
| :---------: | :---------------------------------- | :----------------------------- |
|   prev()    | Switch to the previous card                    | [Custom-action](#Custom-action)   |
|   next()    | Switch to the next card                    | [Custom-action](#Custom-action)   |
| goTo(index) | Switch to the card with the specified index, the index starts from 0 | [Custom-action](#Custom-action)   |


<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const items = ref<string[]>(["page 1", 'page 2', 'page 3', 'page 4'])
    const activeIndex = ref(2)

    const carousel = ref()

    const onPrev = () => {
      carousel.value?.prev?.()
    }
    const onNext = () => {
      carousel.value?.next?.()
    }
    const onGoFirst = () => {
      carousel.value?.goto?.(0)
    }
    const onChange = (index: number) => {
      console.log(index, activeIndex.value)
    }

    return {
      activeIndex,
      items,

      carousel,
      onPrev,
      onNext,
      onGoFirst,
      onChange,
    }
  }
})
</script>
<style lang="scss">
.d-carousel-item {
  text-align: center;
  line-height: 200px;
  background: var(--devui-global-bg, #f3f6f8);
}
.carousel-demo-operate{
    margin-top: 10px;

    display: flex;
    align-items: center;

    > * {
        margin-right: 20px;
    }
}
</style>