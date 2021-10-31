# Quick Start

Guide you how to use DevUI in your project

### Vue version

Vue version currently supported ^3.0.0

### 1. Create a project

It is recommended to use @vite/cli to create your project

```shell
yarn create vite my-vue-app --template vue-ts
```

### 2. Install

Go to your project folder and use yarn to install DevUI

```shell
yarn add vue-devui

# 可选，字体图标库, 部分Demo依赖此字体库
# yarn add @devui-design/icons
```

### 3. Introduce modules and styles

main.ts

```js
import DevUI from 'vue-devui'
import 'vue-devui/style.css'

createApp(App).use(DevUI).mount('#app')
```

### 4. Start development and debugging

```shell
yarn dev
```