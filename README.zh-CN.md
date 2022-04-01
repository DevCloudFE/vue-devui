<p align="center">
  <a href="https://devui.design/" target="_blank" rel="noopener noreferrer">
    <img alt="DevUI Logo" src="https://github.com/DevCloudFE/vue-devui/raw/dev/packages/devui-vue/public/logo.svg" width="180" style="max-width:100%;">
  </a>
</p>

<h1 align="center">Vue DevUI</h1>

<p align="center">一个基于 <a href="https://devui.design/" target="_blank" rel="noopener noreferrer">DevUI Design</a> 的 Vue3 组件库。</p>

[English](README.md) | 简体中文

🌈 特性：

- 📦 包含 40 个简洁、易用、灵活的高质量组件
- 🔑 支持 TypeScript
- ⛰️ 支持 Nuxt3
- ⚡ 支持按需引入
- 🌍 支持国际化
- 🎨 支持主题定制，并内置 追光 / 蜜糖 / 紫罗兰 等 7 种漂亮的主题

## 🔧 如何使用

### 1. 安装

```
npm i vue-devui
```

### 2. 引入

在`main.ts`文件中引入`vue-devui`。

```ts
import { createApp } from 'vue'
import App from './App.vue'

// 引入 Vue DevUI 组件库及样式
import DevUI from 'vue-devui'
import 'vue-devui/style.css'

createApp(App).use(DevUI).mount('#app')
```

### 3. 使用

在`App.vue`文件中使用 Vue DevUI 组件。

```vue
<template>
  <d-button>确定</d-button>
</template>
```

## 🖥️ 本地开发

```shell
git clone git@github.com:DevCloudFE/vue-devui.git
cd vue-devui
pnpm i
pnpm dev
```

打开浏览器访问：[http://localhost:3000/](http://localhost:3000/)

## 🤝 参与贡献

欢迎你参与到 Vue DevUI 项目的建设中来！🎉

通过参与 Vue DevUI 项目，我们可以一起：
- 🔥 学习最新的 `Vite`+`Vue3`+`TypeScript`+`JSX` 技术
- 🎁 学习如何设计和开发组件
- ⭐ 磨练编程技能，学习优秀的编程实践
- 🎊 结识一群热爱学习、热爱开源的朋友

如果你不知道从哪儿开始，可以阅读我们的[贡献指南](https://vue-devui.github.io/contributing/)

## ✨ 贡献者

感谢以下 DevUI 的田主们 ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

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
    <td align="center"><a href="https://juejin.cn/user/1618116899507735/posts"><img src="https://avatars.githubusercontent.com/u/70649502?v=4?s=100" width="100px;" alt=""/><br /><sub><b>无声</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=ivestszheng" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/zxlfly"><img src="https://avatars.githubusercontent.com/u/26324442?v=4?s=100" width="100px;" alt=""/><br /><sub><b>sleep_fish</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=zxlfly" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/whylost"><img src="https://avatars.githubusercontent.com/u/62528887?v=4?s=100" width="100px;" alt=""/><br /><sub><b>迷心whylost</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=whylost" title="Code">💻</a></td>
    <td align="center"><a href="https://juejin.im/user/5c15d35fe51d4545ae495e43"><img src="https://avatars.githubusercontent.com/u/31237954?v=4?s=100" width="100px;" alt=""/><br /><sub><b>X.Q. Chen</b></sub></a><br /><a href="#infra-brenner8023" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/DevCloudFE/vue-devui/commits?author=brenner8023" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/git-Where"><img src="https://avatars.githubusercontent.com/u/16344566?v=4?s=100" width="100px;" alt=""/><br /><sub><b>葉家男孩</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=git-Where" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/CatsAndMice"><img src="https://avatars.githubusercontent.com/u/58327088?v=4?s=100" width="100px;" alt=""/><br /><sub><b>lihai</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=CatsAndMice" title="Code">💻</a></td>
    <td align="center"><a href="http://www.naluduo.vip"><img src="https://avatars.githubusercontent.com/u/28448589?v=4?s=100" width="100px;" alt=""/><br /><sub><b>纳撸多</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=naluduo233" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ElsaOOo"><img src="https://avatars.githubusercontent.com/u/48074435?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ElsaOOo</b></sub></a><br /><a href="#maintenance-ElsaOOo" title="Maintenance">🚧</a> <a href="#infra-ElsaOOo" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/DevCloudFE/vue-devui/commits?author=ElsaOOo" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/liuxdi"><img src="https://avatars.githubusercontent.com/u/10958003?v=4?s=100" width="100px;" alt=""/><br /><sub><b>刘小迪</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=liuxdi" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/unfound"><img src="https://avatars.githubusercontent.com/u/32935349?v=4?s=100" width="100px;" alt=""/><br /><sub><b>unfound</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=unfound" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Roading"><img src="https://avatars.githubusercontent.com/u/7751774?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Roading</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=Roading" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

该项目遵循 [all-contributors](https://github.com/all-contributors/all-contributors) 规范。欢迎任何形式的贡献！

## 开源许可

[MIT](https://github.com/DevCloudFE/vue-devui/blob/dev/LICENSE)
