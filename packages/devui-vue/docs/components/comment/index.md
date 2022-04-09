# Comment 评论

对网站内容的反馈、评价和讨论。

#### 何时使用

评论组件可用于对事物的讨论，例如页面、博客文章、问题等等。

### 基本评论

:::demo

```vue
<template>
  <d-comment>
    <template v-slot:actions>
      <p>MyAvatar</p>
    </template>

    <template v-slot:author>MyAvatar</template>

    <template v-slot:avatar>
      <d-avatar name="MyAvatar"></d-avatar>
    </template>
    <template v-slot:content>
      <p>用于对事物的讨论，例如页面、博客文章、问题等等。</p>
    </template>
    <template v-slot:datetime>20:36</template>
  </d-comment>
</template>
```

:::

<style>

</style>

### API

d-comment 参数
| 参数 | 类型 | 默认 | 说明 |
| :------: | :--: | :--: | :---------------------------------------------- |
| actions | - | - | - |
| author | - | - | 要显示为注释作者的元素 |
| avatar | - | - | 要显示为评论头像的元素 - 通常是 avatar |
| content | - | - | 评论的主要内容 |
| datetime | - | - | 展示时间描述 |
