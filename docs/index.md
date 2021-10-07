# 快速开始

引导您如何在项目中使用DevUI

### Vue版本

当前支持的Vue版本 ^3.0.0

### 1. 创建一个项目

推荐使用@vite/cli创建你的项目

```shell
yarn create vite my-vue-app --template vue-ts
```

### 2. 安装

进入你的项目文件夹，使用yarn安装DevUI

```shell
yarn add vue-devui

# 可选，字体图标库, 部分Demo依赖此字体库
# yarn add @devui-design/icons
# main.ts 文件引入
# import '@devui-design/icons/icomoon/devui-icon.css'
```

### 3. 引入模块和样式

main.ts

```js
import DevUI from 'vue-devui'
import 'vue-devui/style.css'

createApp(App).use(DevUI).mount('#app')
```

### 4. 启动开发调试

```shell
yarn dev
```