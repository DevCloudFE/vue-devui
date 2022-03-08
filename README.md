<p align="center">
  <a href="https://devui.design/home" target="_blank" rel="noopener noreferrer">
    <img alt="DevUI Logo" src="https://github.com/DevCloudFE/vue-devui/raw/dev/packages/devui-vue/public/logo.svg" width="180" style="max-width:100%;">
  </a>
</p>

Vue DevUI 是 Vue3 版本的 DevUI 组件库，基于 [https://github.com/devcloudfe/ng-devui](https://github.com/devcloudfe/ng-devui)，倡导`沉浸`、`灵活`、`至简`的设计价值观。

DevUI 官方网站：[https://devui.design](https://devui.design)

## 当前状态: Beta

该项目还处于孵化和演进阶段，欢迎大家参与到 Vue DevUI 项目的建设中来！🎉🎉

通过参与 Vue DevUI 项目，你可以：
- 🔥 学习最新的 `Vite`+`Vue3`+`TypeScript`+`JSX` 技术
- 🎁 学习如何设计和开发组件
- ⭐ 参与到开源社区中来
- 🎊 结识一群热爱学习、热爱开源的朋友

[贡献指南](https://github.com/DevCloudFE/vue-devui/wiki/%E8%B4%A1%E7%8C%AE%E6%8C%87%E5%8D%97)

## 快速开始

### 1 安装依赖

```
pnpm i
```

### 2 启动

```
pnpm dev
```

### 3 访问

[http://localhost:3000/](http://localhost:3000/)

### 4 生产打包

```
pnpm build
```

## 使用 Vue DevUI

### 1. 安装

```
pnpm i vue-devui
```

### 2. 全量引入

在`main.ts`文件中编写以下代码：
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

### 3. 按需引入

除了全量引入，我们也支持单个组件按需引入。

在`main.ts`文件中编写以下代码：
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

### 4. 配置自动按需引入`unplugin-vue-components`（推荐）

配置`unplugin-vue-components`插件可以无需引入Vue DevUI就可以直接按需使用其中的组件，具体使用方式如下：

在`vite.config.ts`文件中添加以下代码：
```
import Components from 'unplugin-vue-components/vite'
import { DevUiResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),

    // 新增
    Components({
      resolvers: [
        DevUiResolver()
      ]
    })
  ]
})
```

配置了以上插件，就可以直接在代码中使用`Vue DevUI`的组件，而无需在`main.ts`文件中引入`Vue DevUI`。

### 5. 使用

```
<template>
  <d-button>确定</d-button>
</template>
```

## 图标库

图标库推荐使用[DevUI图标库](https://devui.design/icon/ruleResource)，也可以使用第三方图标库，比如：iconfont。

### 使用DevUI图标库

#### 安装

```
pnpm i @devui-design/icons
```

#### 引入

在`main.ts`文件中，编写以下代码：

```
import '@devui-design/icons/icomoon/devui-icon.css'
```

#### 使用

```
<d-icon name="love" color="red"></d-icon>
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://juejin.cn/user/712139267650141"><img src="https://avatars.githubusercontent.com/u/9566362?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kagol</b></sub></a><br /><a href="#maintenance-kagol" title="Maintenance">🚧</a> <a href="https://github.com/DevCloudFE/vue-devui/commits?author=kagol" title="Code">💻</a> <a href="https://github.com/DevCloudFE/vue-devui/commits?author=kagol" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/TinsFox"><img src="https://avatars.githubusercontent.com/u/33956589?v=4?s=100" width="100px;" alt=""/><br /><sub><b>TinsFox</b></sub></a><br /><a href="#maintenance-TinsFox" title="Maintenance">🚧</a> <a href="#infra-TinsFox" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/lnzhangsong"><img src="https://avatars.githubusercontent.com/u/15092594?v=4?s=100" width="100px;" alt=""/><br /><sub><b>nif</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=lnzhangsong" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Zcating"><img src="https://avatars.githubusercontent.com/u/13329558?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Zcating</b></sub></a><br /><a href="#maintenance-Zcating" title="Maintenance">🚧</a> <a href="https://github.com/DevCloudFE/vue-devui/commits?author=Zcating" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/sufuwang"><img src="https://avatars.githubusercontent.com/u/46395105?v=4?s=100" width="100px;" alt=""/><br /><sub><b>王凯</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=sufuwang" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/iel-h"><img src="https://avatars.githubusercontent.com/u/53589602?v=4?s=100" width="100px;" alt=""/><br /><sub><b>iel</b></sub></a><br /><a href="#maintenance-iel-h" title="Maintenance">🚧</a> <a href="https://github.com/DevCloudFE/vue-devui/commits?author=iel-h" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/chenxi24"><img src="https://avatars.githubusercontent.com/u/40349890?v=4?s=100" width="100px;" alt=""/><br /><sub><b>chenxi24</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=chenxi24" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/asdlml6"><img src="https://avatars.githubusercontent.com/u/61737780?v=4?s=100" width="100px;" alt=""/><br /><sub><b>小九九</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=asdlml6" title="Code">💻</a></td>
    <td align="center"><a href="http://blog.alanlee.top"><img src="https://avatars.githubusercontent.com/u/42601044?v=4?s=100" width="100px;" alt=""/><br /><sub><b>AlanLee</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=AlanLee97" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ForeseeBear"><img src="https://avatars.githubusercontent.com/u/15258339?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Echo</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=ForeseeBear" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/GaoNeng-wWw"><img src="https://avatars.githubusercontent.com/u/31283122?v=4?s=100" width="100px;" alt=""/><br /><sub><b>GaoNeng</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=GaoNeng-wWw" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/xingyan95"><img src="https://avatars.githubusercontent.com/u/11143986?v=4?s=100" width="100px;" alt=""/><br /><sub><b>行言</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=xingyan95" title="Code">💻</a></td>
    <td align="center"><a href="https://devin974.github.io/"><img src="https://avatars.githubusercontent.com/u/67035714?v=4?s=100" width="100px;" alt=""/><br /><sub><b>devin</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=devin974" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

[MIT](https://github.com/DevCloudFE/vue-devui/blob/dev/LICENSE)
