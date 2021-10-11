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
// 全局引入
import DevUI from 'vue-devui'
import 'vue-devui/style.css'

createApp(App).use(DevUI).mount('#app')
```

```js
// 按需引入
// main.ts文件
import { createApp } from 'vue'
import App from './App.vue'

// Step 1: 引入单个组件
import { Button } from 'vue-devui'
// or import Button from 'vue-devui/button'
// Step 2: 引入组件样式
// 方式一：手动引入组件样式
import 'vue-devui/button/style.css'

// 方式二：自动按需引入组件
// vite.config.ts文件
// import styleImport from 'vite-plugin-style-import'
//   plugins: [
//       vue(),
//       styleImport({
//         libs: [
//           {
//             libraryName: 'vue-devui',
//             esModule: true,
//             resolveStyle: (name) => `vue-devui/${name}/style`,
//           },
//         ],
//       })
//     ]

createApp(App)
.use(Button) // Step 3: 使用组件
.mount('#app')
```

### 4. 启动开发调试

```shell
yarn dev
```