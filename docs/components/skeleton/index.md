# Skeleton 骨架屏
用于在内容加载过程中展示一组占位图形。

### 何时使用
在需要等待加载内容的位置设置一个骨架屏，某些场景下比 Loading 的视觉效果更好。

### 基本用法
最基本的占位效果。

:::demo

```vue
<template>
  <d-skeleton :row="3" />
</template>
```
:::


### 复杂组合
:::demo

```vue
<template>
  <div class="skeleton-btn-groups">
      <div>
          展示骨架屏：
         <d-switch v-model:checked="loading" />
      </div>
      <div>
          动画：
         <d-switch v-model:checked="animate" />
      </div>
      <div>
          显示头像：
         <d-switch v-model:checked="avatar" />
      </div>
      <div>
          显示标题：
         <d-switch v-model:checked="title" />
      </div>
      <div>
          显示段落：
         <d-switch v-model:checked="paragraph" />
      </div>
  </div>
  <d-skeleton :row="4" :animate="animate" :avatar="avatar" :title="title" :paragraph="paragraph" :loading="loading">
      <div>
        <div>content1</div>
        <div>content2</div>
        <div>content3</div>
        <div>content4</div>
      </div>
  </d-skeleton>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const loading = ref(true)
    const animate = ref(true)
    const avatar = ref(true)
    const title = ref(true)
    const paragraph = ref(true)

    return {
      loading,
	    animate,
      avatar,
      title,
      paragraph
    }
  }
})
</script>
<style>
.skeleton-btn-groups{
  display: flex;
  margin-bottom: 1rem;
}
</style>
```
:::

### API
d-skeleton 参数
|  参数   |   类型    |  默认   | 说明                                          |
| :-----: | :-------: | :-----: | :-------------------------------------------- |
|   row   | `number`  |   `0`   | 可选，段落占位图行数                                |
| loading | `boolean` | `true`  | 可选，是否显示骨架屏，传 `false` 时会展示子组件内容 |
| animate | `boolean` | `true`  | 可选，是否开启动画                               |
| avatar  | `boolean` | `false` | 可选，是否显示头像占位图                         |
| title | `boolean` | `true` | 可选，是否显示标题占位图 |
| paragraph | `boolean` | `true` | 可选，是否显示段落占位图 |

