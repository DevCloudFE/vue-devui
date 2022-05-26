# Comment 评论

对网站内容的反馈、评价和讨论。

#### 何时使用

评论组件可用于对事物的讨论，例如页面、博客文章、问题等等。

### 基本用法

:::demo

```vue
<template>
  <d-comment
    avatar=""
    author="郑迪"
    datetime="10小时前"
  >
    用于对事物的讨论，例如页面、博客文章、问题等等。
  </d-comment>
</template>
```

:::

### 自定义

:::demo

```vue
<template>
  <d-comment>
    <p>用于对事物的讨论，例如页面、博客文章、问题等等。</p>

    <template v-slot:avatar>
      <a class="comment-demo-custom__avatar" href="https://juejin.cn/user/712139267650141" target="_blank">
        <d-avatar :isRound="false" imgSrc="https://vue-devui.github.io/assets/logo.svg"></d-avatar>
      </a>
    </template>

    <template v-slot:head>
      <div class="comment-demo-custom__head">
        <div class="comment-demo-custom__author">
          <a href="https://juejin.cn/user/712139267650141" target="_blank">
            <span>DevUI团队</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="14" viewBox="0 0 23 14">
              <g fill="none" fill-rule="evenodd">
                <path fill="#34D19B" d="M3 1h17a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z" />
                <path fill="#FFF" d="M3 4h2v7H3zM8 6h2l2 5h-2z" />
                <path fill="#FFF" d="M14 6h-2l-2 5h2zM3 9h5v2H3zM16.333 4L17 3v3h-2zM15 6h2v4h-2zM17 8h1v2h-1zM17 3h1v2h-1zM18 3h2v8h-2z" />
              </g>
            </svg>
          </a>
          <span>华为 @ 前端组件库</span>
        </div>
        <time class="comment-demo-custom__datetime">17天前</time>
      </div>
    </template>

    <template v-slot:actions>
      <div class="comment-demo-custom__actions">
        <d-button variant="text" icon="like">10</d-button>
        <d-button variant="text" icon="comment">评论</d-button>
      </div>
    </template>
  </d-comment>
</template>
<style lang="scss">
.comment-demo-custom__avatar {
  margin-right: 16px;
}

.comment-demo-custom__head {
  display: flex;
  justify-content: space-between;
}

.comment-demo-custom__author {
  margin-right: 24px;
}

.comment-demo-custom__author a {
  margin-right: 12px;
  font-size: 14px;
  color: var(--devui-text);
  font-weight: bold;
}

.comment-demo-custom__author a:hover {
  text-decoration: none;
}

.comment-demo-custom__author > span {
  color: var(--devui-text-weak);
}

.comment-demo-custom__actions button {
  margin-right: 12px;
}
</style>
```

:::

### Comment 参数

| 参数名   | 类型     | 默认 | 说明     |
| :------- | :------- | :--- | :------- |
| avatar   | `string` | ''   | 头像     |
| author   | `string` | ''   | 作者     |
| datetime | `string` | ''   | 时间     |

### Comment 插槽

| 插槽名   | 说明           |
| :------- | :------------- |
| default  | 评论内容的插槽 |
| avatar   | 头像插槽       |
| author   | 作者插槽       |
| datetime | 时间插槽       |
| head     | 头部插槽       |
| actions  | 操作区域插槽   |
