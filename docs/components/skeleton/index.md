# Skeleton 骨架屏
用于在内容加载过程中展示一组占位图形。

### 何时使用
在需要等待加载内容的位置设置一个骨架屏，某些场景下比 Loading 的视觉效果更好。

### 基本用法
基础的骨架效果, 通过 `row` 属性配置占位段落行数。

:::demo

```vue
<template>
  <d-skeleton :row="6" />
</template>
```
:::

### 展示子组件
将 loading 属性设置成 false 表示内容加载完成，此时会隐藏占位图，并显示 Skeleton 的子组件。

:::demo

```vue
<template>
  <d-skeleton :row="6" :loading="false">
    <div>实际内容</div>
  </d-skeleton>
</template>
```
:::

### API
d-skeleton 参数
|  参数   |   类型    |  默认  | 说明                                          |
| :-----: | :-------: | :----: | :-------------------------------------------- |
|   row   | `number`  |  `0`   | 段落占位图行数                                |
| loading | `boolean` | `true` | 是否显示骨架屏，传 `false` 时会展示子组件内容 |
| animate | `boolean` | `true` | 是否开启动画                                  |
|         |           |        |                                               |
|         |           |        |                                               |
|         |           |        |                                               |
|         |           |        |                                               |
|         |           |        |                                               |
|         |           |        |                                               |
