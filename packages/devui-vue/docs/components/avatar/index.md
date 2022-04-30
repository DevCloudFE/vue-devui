# Avatar 头像

显示用户头像的组件。

#### 何时使用

当需要显示用户头像时。

### 头像显示的基本规则

头像组件传入'name'属性时，会根据一定的规则显示头像的字段，具体规则参见 API。

:::demo

```vue
<template>
  <div class="avatar-demo-1">
    <d-avatar style="text-align: right" gender="Female" name="组件头像"></d-avatar>
    <d-avatar name="MyAvatar"></d-avatar>
    <d-avatar name="Avatar1 Avatar2"></d-avatar>
    <d-avatar name="1Avatar"></d-avatar>
  </div>
</template>

<style>
.avatar-demo-1 .devui-avatar {
  margin-right: 10px;
}
</style>
```

:::

### 头像的基础配置

头像组件可设置宽度，高度，是否为圆形头像，同时可自定义头像的显示字段，传入自定义图片等。

:::demo

```vue
<template>
  <div class="avatar-demo-2">
    <d-avatar name="Avatar" :width="28" :height="28"></d-avatar>
    <d-avatar customText="DevUI" :width="80" :height="80" :isRound="false"></d-avatar>
    <d-avatar imgSrc="/../../assets/logo.svg" :width="100" :height="100" :isRound="false"></d-avatar>
  </div>
</template>

<style>
.avatar-demo-2 {
  display: flex;
  align-items: center;
}
.avatar-demo-2 .devui-avatar {
  margin-right: 10px;
}
</style>
```

:::

### 头像的特殊显示

头像组件会对一些特殊情况进行处理，具体表现为用户不存在或展示默认头像，详细规则参见 API。

:::demo

```vue
<template>
  <div class="avatar-demo-3">
    <d-avatar></d-avatar>
    <d-avatar name=""></d-avatar>
  </div>
</template>

<style>
.avatar-demo-3 .devui-avatar {
  margin-right: 10px;
}
</style>
```

:::

### Avatar 参数

| 参数名      | 类型                       | 默认值 | 描述                                                                                | 跳转 Demo                                 |
| :---------- | :------------------------- | :----- | :---------------------------------------------------------------------------------- | :---------------------------------------- |
| name        | `string`                   | --     | 必选，传入字符串用于制作头像                                                        | [头像显示的基本规则](#头像显示的基本规则) |
| gender      | `string \| male \| female` | --     | 可选，根据性别区分头像颜色，传入 string，<br>可以是`female \| male`的任意大小写形式 | [头像显示的基本规则](#头像显示的基本规则) |
| width       | `number`                   | 40     | 可选，设定头像的宽度， 单位为`px`                                                   | [头像的基础配置](#头像的基础配置)         |
| height      | `number`                   | 40     | 可选，设定头像的高度，单位为`px`                                                    | [头像的基础配置](#头像的基础配置)         |
| is-round    | `boolean`                  | true   | 可选，是否显示为圆形头像                                                            | [头像的基础配置](#头像的基础配置)         |
| img-src     | `string`                   | --     | 可选，传入自定义图片作为头像                                                        | [头像的基础配置](#头像的基础配置)         |
| custom-text | `string`                   | --     | 可选，传入自定义显示文字                                                            | [头像的基础配置](#头像的基础配置)         |

### 其他说明

#### 头像显示基本规则

- 中文开头：取传入字符串的最后两个字符

- 英文开头：取传入字符串的前面两个字符

- 多个英文名连用：取传入字符串的前两个英文名首字母

- 非中英文开头：取传入字符串的前两个字符

#### 头像特殊显示规则

- 未传入`name`，`customText`，`imgSrc`，视为使用该头像的用户不存在

- 传入`name`，`customText`，`imgSrc`的值为空，视为使用该头像的用户无昵称，使用默认头像

#### 显示优先级排序

imgSrc > customText > name
