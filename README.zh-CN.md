<p align="center">
  <a href="https://devui.design/" target="_blank" rel="noopener noreferrer">
    <img alt="DevUI Logo" src="https://vue-devui.github.io/assets/logo.svg" width="180" style="max-width:100%;">
  </a>
</p>

<h1 align="center">Vue DevUI</h1>

<p align="center">一个基于 <a href="https://devui.design/" target="_blank" rel="noopener noreferrer">DevUI Design</a> 的 Vue3 组件库。</p>

[English](README.md) | 简体中文

🌈 特性：

- 📦 包含 55 个简洁、易用、灵活的高质量组件
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

或者你也可以运行以下命令：

```sh
pnpm scripts
```

## 🤝 参与贡献

欢迎你参与到 Vue DevUI 项目的建设中来！🎉

通过参与 Vue DevUI 项目，我们可以一起：
- 🔥 学习最新的 `Vite`+`Vue3`+`TypeScript`+`JSX` 技术
- 🎁 学习如何设计和开发组件
- ⭐ 磨练编程技能，学习优秀的编程实践
- 🎊 结识一群热爱学习、热爱开源的朋友

如果你不知道从哪儿开始，可以阅读我们的[贡献指南](https://vue-devui.github.io/contributing/)

## ✨ 维护者

维护者是做出杰出贡献且在社区长期活跃的 DevUI 社区成员。

- [kagol](https://github.com/kagol)
- [xingyan95](https://github.com/xingyan95)
- [linxiang07](https://github.com/linxiang07)
- [Zcating](https://github.com/Zcating)
- [TinsFox](https://github.com/TinsFox)
- [JensonMiao](https://github.com/JensonMiao)
- [xiejay97](https://github.com/xiejay97)
- [daviForevel](https://github.com/daviForevel)
- [AlanLee97](https://github.com/AlanLee97)
- [SituC](https://github.com/SituC)
- [lj1990111](https://github.com/lj1990111)
- [newer2333](https://github.com/newer2333)
- [vaebe](https://github.com/vaebe)
- [ivestszheng](https://github.com/ivestszheng)
- [ElsaOOo](https://github.com/ElsaOOo)
- [asdlml6](https://github.com/asdlml6)
- [GaoNeng-wWw](https://github.com/GaoNeng-wWw)
- [chenxi24](https://github.com/chenxi24)
- [ErKeLost](https://github.com/ErKeLost)
- [brenner8023](https://github.com/brenner8023)

杰出贡献包括但不仅限于以下行为：
- 合并 10 个以上 PR
- 提出超过 10 条被 PR 作者认可的检视意见
- 提供建设性的优化意见并推动项目变得更好

## ✨ 贡献者

贡献者是在 DevUI 社区中合并了 1 个或多个 PR 的社区成员。

感谢以下 DevUI 的田主们 ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://juejin.cn/user/712139267650141"><img src="https://avatars.githubusercontent.com/u/9566362?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kagol</b></sub></a><br /><a href="#maintenance-kagol" title="Maintenance">🚧</a> <a href="https://github.com/DevCloudFE/vue-devui/commits?author=kagol" title="Code">💻</a> <a href="https://github.com/DevCloudFE/vue-devui/commits?author=kagol" title="Documentation">📖</a></td>
      <td align="center"><a href="https://github.com/TinsFox"><img src="https://avatars.githubusercontent.com/u/33956589?v=4?s=100" width="100px;" alt=""/><br /><sub><b>TinsFox</b></sub></a><br /><a href="#maintenance-TinsFox" title="Maintenance">🚧</a> <a href="#infra-TinsFox" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center"><a href="https://github.com/lnzhangsong"><img src="https://avatars.githubusercontent.com/u/15092594?v=4?s=100" width="100px;" alt=""/><br /><sub><b>nif</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=lnzhangsong" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/Zcating"><img src="https://avatars.githubusercontent.com/u/13329558?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Zcating</b></sub></a><br /><a href="#maintenance-Zcating" title="Maintenance">🚧</a> <a href="https://github.com/DevCloudFE/vue-devui/commits?author=Zcating" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/sufuwang"><img src="https://avatars.githubusercontent.com/u/46395105?v=4?s=100" width="100px;" alt=""/><br /><sub><b>王凯</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=sufuwang" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/iel-h"><img src="https://avatars.githubusercontent.com/u/53589602?v=4?s=100" width="100px;" alt=""/><br /><sub><b>iel</b></sub></a><br /><a href="#maintenance-iel-h" title="Maintenance">🚧</a> <a href="https://github.com/DevCloudFE/vue-devui/commits?author=iel-h" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/chenxi24"><img src="https://avatars.githubusercontent.com/u/40349890?v=4?s=100" width="100px;" alt=""/><br /><sub><b>chenxi24</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=chenxi24" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/asdlml6"><img src="https://avatars.githubusercontent.com/u/61737780?v=4?s=100" width="100px;" alt=""/><br /><sub><b>小九九</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=asdlml6" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center"><a href="http://blog.alanlee.top"><img src="https://avatars.githubusercontent.com/u/42601044?v=4?s=100" width="100px;" alt=""/><br /><sub><b>AlanLee</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=AlanLee97" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/ForeseeBear"><img src="https://avatars.githubusercontent.com/u/15258339?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Echo</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=ForeseeBear" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/GaoNeng-wWw"><img src="https://avatars.githubusercontent.com/u/31283122?v=4?s=100" width="100px;" alt=""/><br /><sub><b>GaoNeng</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=GaoNeng-wWw" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/xingyan95"><img src="https://avatars.githubusercontent.com/u/11143986?v=4?s=100" width="100px;" alt=""/><br /><sub><b>行言</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=xingyan95" title="Code">💻</a> <a href="https://github.com/DevCloudFE/vue-devui/issues?q=author%3Axingyan95" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://devin974.github.io/"><img src="https://avatars.githubusercontent.com/u/67035714?v=4?s=100" width="100px;" alt=""/><br /><sub><b>devin</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=devin974" title="Code">💻</a></td>
      <td align="center"><a href="https://juejin.cn/user/1618116899507735/posts"><img src="https://avatars.githubusercontent.com/u/70649502?v=4?s=100" width="100px;" alt=""/><br /><sub><b>无声</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=ivestszheng" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/zxlfly"><img src="https://avatars.githubusercontent.com/u/26324442?v=4?s=100" width="100px;" alt=""/><br /><sub><b>sleep_fish</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=zxlfly" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/whylost"><img src="https://avatars.githubusercontent.com/u/62528887?v=4?s=100" width="100px;" alt=""/><br /><sub><b>迷心whylost</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=whylost" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://juejin.im/user/5c15d35fe51d4545ae495e43"><img src="https://avatars.githubusercontent.com/u/31237954?v=4?s=100" width="100px;" alt=""/><br /><sub><b>X.Q. Chen</b></sub></a><br /><a href="#infra-brenner8023" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/DevCloudFE/vue-devui/commits?author=brenner8023" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/git-Where"><img src="https://avatars.githubusercontent.com/u/16344566?v=4?s=100" width="100px;" alt=""/><br /><sub><b>葉家男孩</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=git-Where" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/CatsAndMice"><img src="https://avatars.githubusercontent.com/u/58327088?v=4?s=100" width="100px;" alt=""/><br /><sub><b>lihai</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=CatsAndMice" title="Code">💻</a></td>
      <td align="center"><a href="http://www.naluduo.vip"><img src="https://avatars.githubusercontent.com/u/28448589?v=4?s=100" width="100px;" alt=""/><br /><sub><b>纳撸多</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=naluduo233" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/ElsaOOo"><img src="https://avatars.githubusercontent.com/u/48074435?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ElsaOOo</b></sub></a><br /><a href="#maintenance-ElsaOOo" title="Maintenance">🚧</a> <a href="#infra-ElsaOOo" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/DevCloudFE/vue-devui/commits?author=ElsaOOo" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/liuxdi"><img src="https://avatars.githubusercontent.com/u/10958003?v=4?s=100" width="100px;" alt=""/><br /><sub><b>刘小迪</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=liuxdi" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/unfound"><img src="https://avatars.githubusercontent.com/u/32935349?v=4?s=100" width="100px;" alt=""/><br /><sub><b>unfound</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=unfound" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/Roading"><img src="https://avatars.githubusercontent.com/u/7751774?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Roading</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=Roading" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center"><a href="http://inreasons.cn"><img src="https://avatars.githubusercontent.com/u/47918504?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Chestnut</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=banlify" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/c0dedance"><img src="https://avatars.githubusercontent.com/u/38075730?v=4?s=100" width="100px;" alt=""/><br /><sub><b>c0dedance</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=c0dedance" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/duqingyu"><img src="https://avatars.githubusercontent.com/u/30541930?v=4?s=100" width="100px;" alt=""/><br /><sub><b>杜庆愉</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=duqingyu" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/linxiang07"><img src="https://avatars.githubusercontent.com/u/40119767?v=4?s=100" width="100px;" alt=""/><br /><sub><b>linxiang</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=linxiang07" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/nextniko"><img src="https://avatars.githubusercontent.com/u/40553790?v=4?s=100" width="100px;" alt=""/><br /><sub><b>掘墓忍者</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=nextniko" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/zcj996"><img src="https://avatars.githubusercontent.com/u/52314078?v=4?s=100" width="100px;" alt=""/><br /><sub><b>一个大胖子</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=zcj996" title="Code">💻</a> <a href="https://github.com/DevCloudFE/vue-devui/commits?author=zcj996" title="Documentation">📖</a></td>
      <td align="center"><a href="https://bandism.net/"><img src="https://avatars.githubusercontent.com/u/22633385?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ikko Ashimine</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=eltociear" title="Documentation">📖</a></td>
      <td align="center"><a href="https://xiaoborao.github.io/"><img src="https://avatars.githubusercontent.com/u/27467603?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Bob</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=xiaoboRao" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/NidusP"><img src="https://avatars.githubusercontent.com/u/30283065?v=4?s=100" width="100px;" alt=""/><br /><sub><b>populus</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=NidusP" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/554246839"><img src="https://avatars.githubusercontent.com/u/24663941?v=4?s=100" width="100px;" alt=""/><br /><sub><b>tohalf</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=554246839" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/Lonely-shang"><img src="https://avatars.githubusercontent.com/u/34124930?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Miliky</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=Lonely-shang" title="Code">💻</a> <a href="https://github.com/DevCloudFE/vue-devui/commits?author=Lonely-shang" title="Tests">⚠️</a></td>
      <td align="center"><a href="https://github.com/MICD0704"><img src="https://avatars.githubusercontent.com/u/20532893?v=4?s=100" width="100px;" alt=""/><br /><sub><b>MICD</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=MICD0704" title="Code">💻</a> <a href="https://github.com/DevCloudFE/vue-devui/issues?q=author%3AMICD0704" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://github.com/ming-bin"><img src="https://avatars.githubusercontent.com/u/54826175?v=4?s=100" width="100px;" alt=""/><br /><sub><b>mingBin</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=ming-bin" title="Code">💻</a> <a href="https://github.com/DevCloudFE/vue-devui/issues?q=author%3Aming-bin" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://github.com/icjs-cc"><img src="https://avatars.githubusercontent.com/u/27618209?v=4?s=100" width="100px;" alt=""/><br /><sub><b>陈剑术</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=icjs-cc" title="Code">💻</a></td>
      <td align="center"><a href="https://www.merlin218.top/"><img src="https://avatars.githubusercontent.com/u/61051874?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Merlin218</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/issues?q=author%3AMerlin218" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://github.com/jingyiliu"><img src="https://avatars.githubusercontent.com/u/6957175?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Johnny.Liu</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/issues?q=author%3Ajingyiliu" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/Yangxfeng"><img src="https://avatars.githubusercontent.com/u/35209766?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yangxfeng</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/issues?q=author%3AYangxfeng" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://github.com/jCodeLife"><img src="https://avatars.githubusercontent.com/u/50767049?v=4?s=100" width="100px;" alt=""/><br /><sub><b>jCodeLife</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/issues?q=author%3AjCodeLife" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://github.com/XiaoRIGE"><img src="https://avatars.githubusercontent.com/u/33147011?v=4?s=100" width="100px;" alt=""/><br /><sub><b>宋小日</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/issues?q=author%3AXiaoRIGE" title="Bug reports">🐛</a> <a href="https://github.com/DevCloudFE/vue-devui/commits?author=XiaoRIGE" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/daviForevel"><img src="https://avatars.githubusercontent.com/u/39021499?v=4?s=100" width="100px;" alt=""/><br /><sub><b>daviForevel</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=daviForevel" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/lj1990111"><img src="https://avatars.githubusercontent.com/u/8649913?v=4?s=100" width="100px;" alt=""/><br /><sub><b>lj1990111</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=lj1990111" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/newer2333"><img src="https://avatars.githubusercontent.com/u/32949033?v=4?s=100" width="100px;" alt=""/><br /><sub><b>newer2333</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=newer2333" title="Code">💻</a></td>
      <td align="center"><a href="https://husky-bear.gitee.io/blob/"><img src="https://avatars.githubusercontent.com/u/50540342?v=4?s=100" width="100px;" alt=""/><br /><sub><b>哈士奇-黄</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=Husky-Yellow" title="Code">💻</a></td>
      <td align="center"><a href="http://innei.ren"><img src="https://avatars.githubusercontent.com/u/41265413?v=4?s=100" width="100px;" alt=""/><br /><sub><b>寻</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=Innei" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/aolyang"><img src="https://avatars.githubusercontent.com/u/72056179?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Anthonio OuYang</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=aolyang" title="Code">💻</a></td>
      <td align="center"><a href="https://yyblog.top"><img src="https://avatars.githubusercontent.com/u/57666140?v=4?s=100" width="100px;" alt=""/><br /><sub><b>FlingYP</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=flingyp" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/xzxldl55"><img src="https://avatars.githubusercontent.com/u/22699218?v=4?s=100" width="100px;" alt=""/><br /><sub><b>xzxldl55</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=xzxldl55" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/79E"><img src="https://avatars.githubusercontent.com/u/71202421?v=4?s=100" width="100px;" alt=""/><br /><sub><b>79</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=79E" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/SituC"><img src="https://avatars.githubusercontent.com/u/29355875?v=4?s=100" width="100px;" alt=""/><br /><sub><b>wailen</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=SituC" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/JensonMiao"><img src="https://avatars.githubusercontent.com/u/46488783?v=4?s=100" width="100px;" alt=""/><br /><sub><b>jenson</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=JensonMiao" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/dbsdaicheng"><img src="https://avatars.githubusercontent.com/u/62135142?v=4?s=100" width="100px;" alt=""/><br /><sub><b>dbsdaicheng</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=dbsdaicheng" title="Tests">⚠️</a></td>
      <td align="center"><a href="https://github.com/qinwencheng"><img src="https://avatars.githubusercontent.com/u/24841685?v=4?s=100" width="100px;" alt=""/><br /><sub><b>qinwencheng</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=qinwencheng" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/angelanana"><img src="https://avatars.githubusercontent.com/u/63281354?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Angelanana</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=angelanana" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/joo1es"><img src="https://avatars.githubusercontent.com/u/76929557?v=4?s=100" width="100px;" alt=""/><br /><sub><b>joo1es</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=joo1es" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/handsomezyw"><img src="https://avatars.githubusercontent.com/u/34366225?v=4?s=100" width="100px;" alt=""/><br /><sub><b>handsomezyw</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=handsomezyw" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/iamyoki"><img src="https://avatars.githubusercontent.com/u/74389358?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yoki</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=iamyoki" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/LadyChatterleyLover"><img src="https://avatars.githubusercontent.com/u/35223515?v=4?s=100" width="100px;" alt=""/><br /><sub><b>luopei</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=LadyChatterleyLover" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/wowCheng"><img src="https://avatars.githubusercontent.com/u/69743874?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mr.Cheng</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=wowCheng" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/Bbbtt04"><img src="https://avatars.githubusercontent.com/u/89759610?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Bbbtt04</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=Bbbtt04" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/Zz-ZzzZ"><img src="https://avatars.githubusercontent.com/u/48228016?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Zz-ZzzZ</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=Zz-ZzzZ" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/buaalkn"><img src="https://avatars.githubusercontent.com/u/89232641?v=4?s=100" width="100px;" alt=""/><br /><sub><b>buaalkn</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=buaalkn" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/hxj9102"><img src="https://avatars.githubusercontent.com/u/58357112?v=4?s=100" width="100px;" alt=""/><br /><sub><b>hxj9102</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=hxj9102" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/Whbbit1999"><img src="https://avatars.githubusercontent.com/u/60510247?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Whbbit1999</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=Whbbit1999" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/zhaoShijuan"><img src="https://avatars.githubusercontent.com/u/31791365?v=4?s=100" width="100px;" alt=""/><br /><sub><b>zhaoShijuan</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=zhaoShijuan" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

该项目遵循 [all-contributors](https://github.com/all-contributors/all-contributors) 规范。欢迎任何形式的贡献！

## 合作项目

- [H5-Dooring - 让H5制作，更简单](http://h5.dooring.cn/)
- [灯塔 - 公益性质的反霸凌团队](https://www.light-tower.top/)

## 开源许可

[MIT](https://github.com/DevCloudFE/vue-devui/blob/dev/LICENSE)
