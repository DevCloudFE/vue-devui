# 按需引入

除了全量引入，我们也支持单个组件按需引入。

### 自动引入

配置`unplugin-vue-components`插件可以无需引入Vue DevUI就可以直接按需使用其中的组件，具体使用方式如下：

- 安装`unplugin-vue-components`插件

```shell
npm i -D unplugin-vue-components
```

- 在`vite.config.ts`文件中添加以下代码：

```ts
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

### 手动引入

在`src/main.ts`文件中写入以下内容：

```ts
import Button from 'vue-devui/button';
import 'vue-devui/button/style.css';

createApp(App).use(Button).mount('#app');
```

在`src/App.vue`文件的`<template>`中增加以下内容：

```vue
<template>
  <!-- 使用 Button 组件 -->
  <d-button>确定</d-button>
</template>
```
