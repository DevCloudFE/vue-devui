# 快速开始

引导您如何在项目中使用`Vue DevUI`

### Vue版本

当前支持的 Vue 版本`^3.0.0`

### 1. 创建一个项目

推荐使用`@vite/cli`创建你的项目

```shell
# npm 6.x
npm create vite my-vue-app --template vue-ts

# npm 7+
npm create vite my-vue-app -- --template vue-ts
```

### 2. 安装

进入你的项目文件夹，使用 NPM 安装`Vue DevUI`

```shell
npm i vue-devui
```

### 3. 引入插件和样式

在`src/main.ts`文件中写入以下内容

```ts
import DevUI from 'vue-devui'
import 'vue-devui/style.css'

createApp(App).use(DevUI).mount('#app')
```

### 4. 使用

在`src/App.vue`文件的`<template>`中增加以下内容

```vue
<template>
  <!-- 使用 Button 组件 -->
  <d-button>确定</d-button>
</template>
```

### 5. 启动开发调试

```shell
npm run dev
```