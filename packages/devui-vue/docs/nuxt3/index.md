# 在 Nuxt3 项目中使用

你可以通过以下方式在 Nuxt3 项目中使用 Vue DevUI 组件库。

在你的 Nuxt3 项目根目录创建文件 `plugins/vue-devui.ts`，写入以下内容：

```ts
import VueDevUI from 'vue-devui';
import 'vue-devui/style.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueDevUI);
});
```

然后在`app.vue`文件中使用 Vue DevUI 的组件：

```vue
<template>
  <div>
    <DButton>确定</DButton>
    <DAlert type="success">操作成功！</DAlert>
    <NuxtWelcome />
  </div>
</template>
```
