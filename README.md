<p align="center">
  <a href="https://devui.design/home" target="_blank" rel="noopener noreferrer">
    <img alt="DevUI Logo" src="packages/devui-vue/public/logo.svg?sanitize=true" width="180" style="max-width:100%;">
  </a>
</p>

Vue DevUI 是 Vue3 版本的 DevUI 组件库，基于 [https://github.com/devcloudfe/ng-devui](https://github.com/devcloudfe/ng-devui)，倡导`沉浸`、`灵活`、`至简`的设计价值观。

DevUI 官方网站：[https://devui.design](https://devui.design)

# 当前状态: Beta

该项目还处于孵化和演进阶段，欢迎大家参与到 Vue DevUI 项目的建设中来！🎉🎉

通过参与 Vue DevUI 项目，你可以：
- 🔥 学习最新的 `Vite`+`Vue3`+`TypeScript`+`JSX` 技术
- 🎁 学习如何设计和开发组件
- ⭐ 参与到开源社区中来
- 🎊 结识一群热爱学习、热爱开源的朋友

[贡献指南](https://gitee.com/devui/vue-devui/wikis/【必看】快速开始)

# 快速开始

## 1 安装依赖

```
yarn(推荐)

or

npm i
```

## 2 启动

```
yarn dev(推荐)

or

npm run dev
```

## 3 访问

[http://localhost:3000/](http://localhost:3000/)

## 4 生产打包

```
yarn build(推荐)

or

npm run build
```

# 使用 Vue DevUI

## 1. 安装

```
yarn add vue-devui
```

## 2. 全量引入

```
import { createApp } from 'vue'
import App from './App.vue'

// Step 1: 引入 Vue DevUI 组件库
import DevUI from 'vue-devui'
// Step 2: 引入组件库样式
import 'vue-devui/style.css'

createApp(App)
.use(DevUI) // Step 3: 使用 Vue DevUI
.mount('#app')
```

## 3. 按需引入

除了全量引入，我们也支持单个组件按需引入。

```
import { createApp } from 'vue'
import App from './App.vue'

// Step 1: 引入单个组件
import { Button } from 'vue-devui'
// or import Button from 'vue-devui/button'
// Step 2: 引入组件样式
import 'vue-devui/button/style.css'

createApp(App)
.use(Button) // Step 3: 使用组件
.mount('#app')
```

## 4. 使用

```
<template>
  <d-button>确定</d-button>
</template>
```

# 图标库

图标库可以使用[DevUI图标库](https://devui.design/icon/ruleResource)，也可以使用第三方图标库，比如：iconfont。

## 使用DevUI图标库

### 安装

```
yarn add @devui-design/icons(推荐)

or

npm i @devui-design/icons
```

### 引入

在`main.ts`文件中，编写以下代码：

```
import '@devui-design/icons/icomoon/devui-icon.css'
```

### 使用

```
<d-icon name="love" color="red"></d-icon>
```

## 使用第三方图标库

如果有第三方图标库，可以用类似的方式引入。

### 引入

在`main.ts`文件中，编写以下代码：

```
import 'your-folder/my-icon.css'
```

### 使用

```
<d-icon classPrefix="my-icon" name="love" color="red"></d-icon>
```

其中的`classPrefix`参数的值，应该和你的字体图标样式文件`my-icon.css`里定义的样式前缀保持一致。

比如`my-icon.css`里的图标样式：

```css
.my-icon-branch-node:before {
	content: "\E001";
}
```

那么`classPrefix`就是`my-icon`。

# License

[MIT](https://gitee.com/devui/vue-devui/blob/dev/LICENSE)
