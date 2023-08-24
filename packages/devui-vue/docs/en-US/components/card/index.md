# Card 卡片

通用卡片容器。

#### 何时使用

基础卡片容器，其中可包含文字，列表，图片，段落，用于概览展示时。

### 基本用法

:::demo

```vue
<template>
  <d-card class="card-demo-basic">
    <template #avatar>
      <d-avatar name="DevUI"></d-avatar>
    </template>
    <template #title> DEVUI Course </template>
    <template #subtitle class="card-demo-icon"> <d-icon name="company-member"></d-icon><span>DevUI</span> </template>
    <template #content>
      DEVUI is a free open-source and common solution for the front end of enterprise mid- and back-end products. Its design values are
      basedon...
    </template>
    <template #actions>
      <div class="card-block"><d-icon name="like"></d-icon><span>12</span></div>
      <div class="card-block"><d-icon name="star-o"></d-icon><span>8</span></div>
      <div class="card-block"><d-icon name="message"></d-icon><span>8</span></div>
    </template>
  </d-card>
</template>
<style lang="scss">

.card-demo-basic {
  cursor: pointer;

  .card-demo-icon {
    cursor: pointer;
    font-size: 16px;
    margin-right: 8px;
    vertical-align: middle;
  }
  .card-demo-icon + span {
    vertical-align: middle;
  }
  .card-block {
    margin-right: 16px;
    i {
      cursor: pointer;
      font-size: 16px;
      margin-right: 8px;
      vertical-align: middle;
    }
    i + span {
      vertical-align: middle;
    }
  }
  .card-container {
    width: 350px;
  }
  .action-text {
    color: #8a8e99;
  }
}
</style>
```

:::

### 阴影效果

你可以定义什么时候展示卡片的增强阴影效果。

使用 shadow 属性设置卡片增强阴影出现的时机。 可选值：'always'|'hover'|'never'，默认是 hover。

:::demo

```vue
<template>
  <d-row>
    <d-col :span="8">
      <d-card shadow="always" style="width: 250px">
        <template #content> always </template>
      </d-card>
    </d-col>
    <d-col :span="8">
      <d-card style="width: 250px">
        <template #content> hover </template>
      </d-card>
    </d-col>
    <d-col :span="8">
      <d-card shadow="never" style="width: 250px">
        <template #content> never </template>
      </d-card>
    </d-col>
  </d-row>
</template>
```

:::

### 使用图片

:::demo

```vue
<template>
  <d-card class="card-demo-use-img" :src="'https://devui.design/components/assets/image1.png'">
    <template #avatar>
      <d-avatar name="DevUI"></d-avatar>
    </template>
    <template #title> DEVUI Course </template>
    <template #subtitle class="card-demo-icon"> <d-icon name="company-member"></d-icon><span>DevUI</span> </template>
    <template #content>
      DEVUI is a free open-source and common solution for the front end of enterprise mid- and back-end products. Its design values are
      basedon...
    </template>
    <template #actions>
      <div class="card-block"><d-icon name="like"></d-icon><span>12</span></div>
      <div class="card-block"><d-icon name="star-o"></d-icon><span>8</span></div>
      <div class="card-block"><d-icon name="message"></d-icon><span>8</span></div>
    </template>
  </d-card>
</template>
<style lang="scss">

.card-demo-use-img {
  cursor: pointer;

  .icon {
    cursor: pointer;
    font-size: 16px;
    margin-right: 8px;
    vertical-align: middle;
  }
  .icon + span {
    vertical-align: middle;
  }
  .card-block {
    margin-right: 16px;
    i {
      cursor: pointer;
      font-size: 16px;
      margin-right: 8px;
      vertical-align: middle;
    }
    i + span {
      vertical-align: middle;
    }
  }
  .card-container {
    width: 350px;
  }
  img {
    max-width: none;
  }
  .action-text {
    color: #8a8e99;
  }
}
</style>
```

:::

### 自定义区域

通过 align 可设置操作区域对齐方式：起始对齐、尾部对齐、拉伸对齐。

:::demo

```vue
<template>
  <d-card class="card-demo-custom-area" :align="'spaceBetween'">
    <div class="custom-avatar">
      <d-avatar imgSrc="https://devui.design/components/assets/logo.svg" :width="48" :height="48" :isRound="false"></d-avatar>
      <div class="icon-star-o custom-star-action"></div>
    </div>
    <template v-slot:title> DEVUI Course </template>
    <template v-slot:actions>
      <div class="action-text">Updated at Otc 15 16:20</div>
      <div>
        <d-icon name="like"></d-icon>
        <d-icon name="more-operate"></d-icon>
      </div>
    </template>
  </d-card>
</template>
<style lang="scss">

.card-demo-custom-area {
  cursor: pointer;

  .icon {
    cursor: pointer;
    font-size: 16px;
    margin-right: 8px;
    vertical-align: middle;
  }
  .icon + span {
    vertical-align: middle;
  }
  .card-block {
    margin-right: 16px;
    i {
      cursor: pointer;
      font-size: 16px;
      margin-right: 8px;
      vertical-align: middle;
    }
    i + span {
      vertical-align: middle;
    }
  }
  .card-container {
    width: 350px;
  }
  img {
    max-width: none;
  }
  .action-text {
    color: #8a8e99;
  }
  .custom-avatar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    .custom-star-action {
      font-size: 20px;
      cursor: pointer;
    }
  }
}
</style>
```

:::

### Card 参数

| 参数   | 类型                          | 默认      | 说明                                                         | 跳转 Demo                 |
| :----- |:----------------------------| :-------- | :----------------------------------------------------------- | :------------------------ |
| src    | `string`                    | ''        | 可选，图片路径                                               | [使用图片](#使用图片)     |
| align  | [IAlignType](#ialigntype)   | `'start'` | 可选，操作区域对齐方式，分别对应起始对齐，尾部对齐，拉伸对齐 | [自定义区域](#自定义区域) |
| shadow | [IShadowType](#ishadowtype) | `'hover'` | 可选，设置增强阴影显示时机                                   | [阴影效果](#阴影效果)     |

### Card 插槽

两种方式使用：`v-slot:title` 或者具名插槽`#title`

| 名称     | 描述                                   |
| :------- | :------------------------------------- |
| avatar   | 头像区域，用作头像等图片展示           |
| title    | 卡片的主要内容描述，一般定义为卡片名称 |
| subtitle | 对标题的补充，可包含标签等信息         |
| actions  | 决策作用，可以包含操作文本或者操作图标 |

### Card 类型定义

#### IAlignType

```ts
type IAlignType = 'start' | 'end' | 'spaceBetween';
```

#### IShadowType

```ts
type IShadowType = 'always' | 'hover' | 'never';
```
