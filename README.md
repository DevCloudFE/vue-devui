<p align="center">
  <a href="https://devui.design/home" target="_blank" rel="noopener noreferrer">
    <img alt="DevUI Logo" src="https://github.com/DevCloudFE/vue-devui/raw/dev/packages/devui-vue/public/logo.svg" width="180" style="max-width:100%;">
  </a>
</p>

<h1 align="center">Vue DevUI</h1>

<p align="center">Vue3 component library based on <a href="https://devui.design/" target="_blank" rel="noopener noreferrer">DevUI Design</a></p>

English | [简体中文](README.zh-CN.md)

🌈 Features：

- 📦 40 high-quality components that are simple, easy to use, and flexible.
- 🔑 Support for TypeScript.
- ⛰️ Support for Nuxt3.
- ⚡ Support for on-demand import.
- 🌍 Support internationalization.
- 🎨 Support theme customization, and built-in seven beautiful themes such as `Galaxy`, `Sweet` and `Provence`.

## 🔧 Usage

The first step is to install vue devui:

```
npm i vue-devui
```

Then import `DevUI` in the `main.ts` file:

```ts
import { createApp } from 'vue'
import App from './App.vue'

// Import Vue DevUI component and style
import DevUI from 'vue-devui'
import 'vue-devui/style.css'

createApp(App).use(DevUI).mount('#app')
```

Then you can use the vue devui component(such as `<d-button>`) in the `App.vue` file:

```vue
<template>
  <d-button>Button</d-button>
</template>
```

## 🖥️ Development

```shell
git clone git@github.com:DevCloudFE/vue-devui.git
cd vue-devui
pnpm i
pnpm dev
```

Open your browser and visit: [http://localhost:3000/](http://localhost:3000/).

## 🤝 Contributing

Welcome to join our Vue DevUI open source project!🎉

By participating in the Vue DevUI project, we can together:
- 🔥 Learn the latest cool `Vite` + `Vue3` + `TypeScript` + `JSX` technology.
- 🎁 Learn how to design and develop UI components.
- ⭐ Hone programming skills and learn excellent programming practice.
- 🎊 Meet a group of friends who love learning and open source.

If you don't know how to start, please read our [contributing guide](https://vue-devui.github.io/contributing/)

## ✨ Contributors

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
    <td align="center"><a href="https://github.com/asdlml6"><img src="https://avatars.githubusercontent.com/u/61737780?v=4?s=100" width="100px;" alt=""/><br /><sub><b>小九九</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=asdlml6" title="Code">💻</a></td>
    <td align="center"><a href="http://blog.alanlee.top"><img src="https://avatars.githubusercontent.com/u/42601044?v=4?s=100" width="100px;" alt=""/><br /><sub><b>AlanLee</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=AlanLee97" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ForeseeBear"><img src="https://avatars.githubusercontent.com/u/15258339?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Echo</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=ForeseeBear" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/GaoNeng-wWw"><img src="https://avatars.githubusercontent.com/u/31283122?v=4?s=100" width="100px;" alt=""/><br /><sub><b>GaoNeng</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=GaoNeng-wWw" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/xingyan95"><img src="https://avatars.githubusercontent.com/u/11143986?v=4?s=100" width="100px;" alt=""/><br /><sub><b>行言</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=xingyan95" title="Code">💻</a> <a href="https://github.com/DevCloudFE/vue-devui/issues?q=author%3Axingyan95" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://devin974.github.io/"><img src="https://avatars.githubusercontent.com/u/67035714?v=4?s=100" width="100px;" alt=""/><br /><sub><b>devin</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=devin974" title="Code">💻</a></td>
    <td align="center"><a href="https://juejin.cn/user/1618116899507735/posts"><img src="https://avatars.githubusercontent.com/u/70649502?v=4?s=100" width="100px;" alt=""/><br /><sub><b>无声</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=ivestszheng" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/zxlfly"><img src="https://avatars.githubusercontent.com/u/26324442?v=4?s=100" width="100px;" alt=""/><br /><sub><b>sleep_fish</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=zxlfly" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/whylost"><img src="https://avatars.githubusercontent.com/u/62528887?v=4?s=100" width="100px;" alt=""/><br /><sub><b>迷心whylost</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=whylost" title="Code">💻</a></td>
    <td align="center"><a href="https://juejin.im/user/5c15d35fe51d4545ae495e43"><img src="https://avatars.githubusercontent.com/u/31237954?v=4?s=100" width="100px;" alt=""/><br /><sub><b>X.Q. Chen</b></sub></a><br /><a href="#infra-brenner8023" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/DevCloudFE/vue-devui/commits?author=brenner8023" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/git-Where"><img src="https://avatars.githubusercontent.com/u/16344566?v=4?s=100" width="100px;" alt=""/><br /><sub><b>葉家男孩</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=git-Where" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/CatsAndMice"><img src="https://avatars.githubusercontent.com/u/58327088?v=4?s=100" width="100px;" alt=""/><br /><sub><b>lihai</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=CatsAndMice" title="Code">💻</a></td>
    <td align="center"><a href="http://www.naluduo.vip"><img src="https://avatars.githubusercontent.com/u/28448589?v=4?s=100" width="100px;" alt=""/><br /><sub><b>纳撸多</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=naluduo233" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/ElsaOOo"><img src="https://avatars.githubusercontent.com/u/48074435?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ElsaOOo</b></sub></a><br /><a href="#maintenance-ElsaOOo" title="Maintenance">🚧</a> <a href="#infra-ElsaOOo" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/DevCloudFE/vue-devui/commits?author=ElsaOOo" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/liuxdi"><img src="https://avatars.githubusercontent.com/u/10958003?v=4?s=100" width="100px;" alt=""/><br /><sub><b>刘小迪</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=liuxdi" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/unfound"><img src="https://avatars.githubusercontent.com/u/32935349?v=4?s=100" width="100px;" alt=""/><br /><sub><b>unfound</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=unfound" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Roading"><img src="https://avatars.githubusercontent.com/u/7751774?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Roading</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=Roading" title="Code">💻</a></td>
    <td align="center"><a href="http://inreasons.cn"><img src="https://avatars.githubusercontent.com/u/47918504?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Chestnut</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=banlify" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/c0dedance"><img src="https://avatars.githubusercontent.com/u/38075730?v=4?s=100" width="100px;" alt=""/><br /><sub><b>c0dedance</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=c0dedance" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/duqingyu"><img src="https://avatars.githubusercontent.com/u/30541930?v=4?s=100" width="100px;" alt=""/><br /><sub><b>杜庆愉</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=duqingyu" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/linxiang07"><img src="https://avatars.githubusercontent.com/u/40119767?v=4?s=100" width="100px;" alt=""/><br /><sub><b>linxiang</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=linxiang07" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/nextniko"><img src="https://avatars.githubusercontent.com/u/40553790?v=4?s=100" width="100px;" alt=""/><br /><sub><b>掘墓忍者</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=nextniko" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/zcj996"><img src="https://avatars.githubusercontent.com/u/52314078?v=4?s=100" width="100px;" alt=""/><br /><sub><b>一个大胖子</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=zcj996" title="Code">💻</a> <a href="https://github.com/DevCloudFE/vue-devui/commits?author=zcj996" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://bandism.net/"><img src="https://avatars.githubusercontent.com/u/22633385?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ikko Ashimine</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=eltociear" title="Documentation">📖</a></td>
    <td align="center"><a href="https://xiaoborao.github.io/"><img src="https://avatars.githubusercontent.com/u/27467603?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Bob</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=xiaoboRao" title="Code">💻</a></td>
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
    <td align="center"><a href="https://github.com/XiaoRIGE"><img src="https://avatars.githubusercontent.com/u/33147011?v=4?s=100" width="100px;" alt=""/><br /><sub><b>宋小日</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/issues?q=author%3AXiaoRIGE" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/daviForevel"><img src="https://avatars.githubusercontent.com/u/39021499?v=4?s=100" width="100px;" alt=""/><br /><sub><b>daviForevel</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=daviForevel" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/lj1990111"><img src="https://avatars.githubusercontent.com/u/8649913?v=4?s=100" width="100px;" alt=""/><br /><sub><b>lj1990111</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=lj1990111" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/newer2333"><img src="https://avatars.githubusercontent.com/u/32949033?v=4?s=100" width="100px;" alt=""/><br /><sub><b>newer2333</b></sub></a><br /><a href="https://github.com/DevCloudFE/vue-devui/commits?author=newer2333" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

[MIT](https://github.com/DevCloudFE/vue-devui/blob/dev/LICENSE)
