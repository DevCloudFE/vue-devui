---
layout: home
hero:
  name: Vue DevUI
  text: 
  tagline: 一个基于 DevUI Design 的 Vue3 组件库
  image:
    src: /assets/devui-design.svg
    alt: Vue DevUI
  actions:
  - theme: brand
    text: 开始
    link: /quick-start/ 
  - theme: alt 
    text: Github
    link: https://github.com/DevCloudFE/vue-devui

features:
- icon: 📦
  title: 丰富的功能
  details: 包含了55个简单、易用、灵活的高质量组件。。

- icon: 🎨️
  title: 主题
  details: 支持主题定制，并内置无限、追光、蜜糖等5个漂亮的主题。

- icon: 🔨
  title: cli
  details: 内置微脚手架，专注于组件的开发。

---

<script setup>
import Contributors from '@theme/components/Contributors.vue'
import HomeFooter from '@theme/components/HomeFooter.vue'
</script>

<Contributors />
<HomeFooter />


