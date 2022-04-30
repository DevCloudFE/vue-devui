# Ripple 水波纹指令

水波纹指令，用于点击之后产生水波纹的动效。

#### 何时使用

`v-ripple`指令用于点击之后产生水波纹的动效, 可以应用于任何块级元素。

> 注：只能作用于块级元素

### 基本用法

:::demo 用户 可以在组件 或者 HTML 元素上任意使用 <span color="#409EFF">`v-ripple`</span> 指令 使用基本的 <span color="#409EFF">`v-ripple`</span> 指令， `v-ripple` 接收 一个对象

```vue
<template>
  <d-row :gutter="50">
    <d-col :span="12">
      <div class="ripple-button">
        <div class="ripple-html-element" v-ripple="{ color: '#5e7ce0',duration: 300, delay: 300 }">HTML元素 中使用 v-ripple</div>
      </div>
    </d-col>
    <d-col :span="12">
      <div class="ripple-button">
        <div class="ripple-html-element" v-ripple="{ duration: 800 }">HTML元素 中使用 v-ripple</div>
      </div>
    </d-col>
  </d-row>
</template>
<style scoped>
.ripple-button {
  display: flex;
}
</style>
```

:::

### 自定义颜色

:::demo

```vue
<template>
  <ul class="demo-ripple">
    <li
      v-for="item in [
        { color: '#409EFF', text: '这是一条 Primary 涟漪' },
        { color: '#67C23A', text: '这是一条 Success 涟漪' },
        { color: '#E6A23C', text: '这是一条 Warning 涟漪' },
        { color: '#F56C6C', text: '这是一条 Danger 涟漪' },
        { color: '#909399', text: '这是一条 Info 涟漪' }
      ]"
      :style="{ color: item.color }"
    >
      <div class="ripple-change-text-color" v-ripple="{ duration: 300 }">
        {{ item.text }}
      </div>
    </li>
  </ul>
</template>
<style>
  .demo-ripple {
    list-style: none;
    padding-left: 0;
  }
</style>
```

:::


### 应用于其他组件

Button 组件

:::demo

```vue
<template>
  <div class="demo-spacing">
    <d-button variant="solid" v-ripple="{ duration: 300 }">Solid button</d-button>
    <d-button v-ripple="{ duration: 300 }">Secondary button</d-button>
    <d-button icon="add" title="Add" v-ripple="{ duration: 300 }"></d-button>
  </div>
</template>
```

:::

Card 组件 

:::demo
```vue
<template>
  <d-card v-ripple="{ duration: 300 }" class="demo-card" :src="'https://devui.design/components/assets/image1.png'">
    <template #avatar>
      <d-avatar name="DevUI"></d-avatar>
    </template>
    <template #title>
      DEVUI Course
    </template>
    <template #subtitle class="icon">
      <d-icon name="company-member"></d-icon><span>DevUI</span>
    </template>
    <template #content>
      DEVUI is a free open-source and common solution for the front end of enterprise mid- and back-end products. Its design values are basedon...
    </template>
    <template #actions>
      <div class="card-block">
        <d-icon name="like"></d-icon ><span>12</span>
      </div>
      <div class="card-block">
        <d-icon name="star-o"></d-icon ><span>8</span>
      </div>
      <div class="card-block">
        <d-icon name="message"></d-icon ><span>8</span>
      </div>
    </template>
  </d-card>
</template>
<style lang="scss">
  .demo-card {
    width: 350px;
    cursor: pointer;
    transition:
      box-shadow .3s cubic-bezier(.645,.045,.355,1),
      transform .3s cubic-bezier(.645,.045,.355,1);
    
    &:hover {
      box-shadow: 0 4px 16px 0 rgba(0,0,0,.1);
      transform: translateY(-5px);
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

<style>
  .ripple-html-element {
    width: 600px;
    height: 150px; 
    text-align: center; 
    line-height: 150px;
    border: 1px solid #eee50;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)!important;
    user-select: none;
  }
  .ripple-change-text-color {
    display: block;
    padding: 20px;
    user-select: none;
  }
</style>

### Ripple 参数

| 参数名          | 类型      | 默认        | 说明                              |
| :-------------- | :-------- | :---------- | :-------------------------------- |
| color           | `string`  | '#00000050' | 可选，默认当前文本颜色            |
| initial-opacity | `number`  | 0.1         | 可选，初始交互效果透明度大小      |
| final-opacity   | `number`  | 0.1         | 可选，结束交互效果长按透明度大小  |
| duration        | `number`  | 400         | 可选，持续时间                    |
| easing          | `string`  | 'ease-out'  | 可选，缓动动画                    |
| delay           | `number`  | 75`         | 可选，延迟 debouceTime 时间后调用 |
| disabled        | `boolean` | false       | 可选，禁止水波效果                |
