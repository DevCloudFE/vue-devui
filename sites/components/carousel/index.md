# Carousel 走马灯

一组轮播的区域。

### 何时使用

1. 用于展示图片或者卡片。

### 基本用法
<d-carousel height="200px">
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

### 自动轮播
<d-carousel height="200px" autoplay>
  <d-carousel-item v-for="item in items" :key="item">{{ item }} </d-carousel-item>
</d-carousel>

```html
<d-carousel height="200px" autoplay>
  <d-carousel-item v-for="item in items" :key="item">{{ item }} </d-carousel-item>
</d-carousel>
```

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const items = ref<string[]>(["page 1", 'page 2', 'page 3', 'page 4'])

    return {
      items,
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
</style>