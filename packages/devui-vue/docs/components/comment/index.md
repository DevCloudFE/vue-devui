# comment 评论

用于评论展示。

### 何时使用

需要显示图标时。


### 基本用法

:::demo 通过template插槽，指定评论模块的位置。

```vue
<d-comment>
    <template #avatar>  //头像
      <d-avatar
        imgSrc=""
      ></d-avatar>
    </template>
    <template #datetime>  // 评论时间
      <d-tooltip :title="'时间'">时间</d-tooltip>
    </template>
    <template #content> // 评论内容
      <div>My comment component displays content</div>
    </template>
    <template #author> // 作者
      <div>comment</div>
    </template>
    <template #actions> // 底部操作组
      <d-tooltip :title="'like'" :mouseEnterDelay="10">
        <d-icon
          name=""
        ></d-icon>
      </d-tooltip>
    </template>
  </d-comment>
```

:::

### 不使用插槽修改头像

:::demo 通过`avatar`属性指定图片路径。

```vue
<d-comment :avatar="'http://xxx.png'">
    <template #datetime>  // 评论时间
      <d-tooltip :title="'时间'">时间</d-tooltip>
    </template>
    <template #content> // 评论内容
      <div>My comment component displays content</div>
    </template>
    <template #author> // 作者
      <div>comment</div>
    </template>
    <template #actions> // 底部操作组
      <d-tooltip :title="'like'" :mouseEnterDelay="10">
        <d-icon
          name=""
        ></d-icon>
      </d-tooltip>
    </template>
  </d-comment>
```

:::





### API

| 参数        | 类型     | 默认      | 说明                    | 跳转 Demo                         |
|-------------|----------|-----------|-----------------------|---------------------------------|
| avatar        | `String` | --        | 非必选，avatar 图片路径          | [基本用法](#基本用法)             |

