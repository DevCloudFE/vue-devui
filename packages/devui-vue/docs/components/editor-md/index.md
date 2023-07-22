# Markdown MD 编辑器

### 基本用法

:::demo `v-model`双向绑定输入容器内的值；当内容发生变化时，出发`content-change`事件，返回当前内容。

```vue
<template>
  <input v-model="content" />
  <d-editor-md v-model="content" :md-rules="mdRules" base-url="https://test-base-url" @content-change="valueChange"></d-editor-md>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const content = ref('`Not use ngModel` aaa');
    const mdRules = reactive({
      linkify: {
        fuzzyLink: false,
      },
    });

    const valueChange = (val) => {
      console.log(val);
    };

    return { content, mdRules, valueChange };
  },
});
</script>
```

:::

### 自定义渲染

:::demo 自定义从 md 到 html 的渲染规则。

```vue
<template>
  <d-editor-md v-model="content" :custom-renderer-rules="customRendererRules"></d-editor-md>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const content = ref('[link](#test)');
    const customRendererRules = ref([
      {
        key: 'link_open',
        value: function (tokens, idx, opts, env, self) {
          const defaultRender = function (nTokens, index, options, ev, that) {
            return that.renderToken(nTokens, index, options);
          };
          const token = tokens[idx];
          const attrs = token.attrs;
          const hrefIndex = token.attrIndex('href');
          const href = attrs[hrefIndex][1];
          if (typeof window !== 'undefined') {
            attrs[hrefIndex][1] = location.href + href;
          }
          token.attrPush(['target', '_blank']);
          token.attrPush(['id', href]);
          return defaultRender(tokens, idx, opts, env, self);
        },
      },
    ]);
    return { content, customRendererRules };
  },
});
</script>
```

:::

### EditorMd 参数

| 参数名                | 类型                                      | 默认值 | 说明                                                                                                               |
| :-------------------- | :---------------------------------------- | :----- | :----------------------------------------------------------------------------------------------------------------- |
| v-model               | `string`                                  | ''     | 编辑器内容双向绑定                                                                                                 |
| options               | `object`                                  | {}     | 编辑器初始化时，自定义配置，可参考[CodeMirror Options](https://codemirror.net/doc/manual.html#config)              |
| base-url              | `string`                                  | --     | 设置渲染到 html 时，为相对 url 添加的 baseUrl                                                                      |
| custom-parse          | `(html: string) => string`                | --     | 自定义对渲染后的 html 处理，需要接收渲染后的 html，返回自定义处理后的 html                                         |
| md-rules              | `object`                                  | {}     | 设置 markdown 对字符串的处理方式， 可参考[markdown-it](https://www.npmjs.com/package/markdown-it?activeTab=readme) |
| custom-renderer-rules | [ICustomRenderRule[]](#icustomrenderrule) | []     | 自定义 markdown 对节点的渲染方式，每条规则需要指定对应节点 key,并自定义渲染函数                                    |
| custom-xss-rules      | [ICustomXssRule[]](#icustomxssrule)       | []     | 自定义 xss 对某种 tag 的过滤方式，每条规则需要指定 tag, 并给出需要加入白名单的属性数组                             |
| placeholder           | `string`                                  | ''     | 编辑器无内容是的提示信息                                                                                           |
| fullscreen-z-index    | `number`                                  | 10     | 编辑器全屏状态的 z-index                                                                                           |

### EditorMd 事件

| 事件名                 | 回调参数                     | 说明                             | 跳转 Demo |
| :--------------------- | :--------------------------- | :------------------------------- | :-------- |
| after-editor-init      | `Function(instance: object)` | 编辑器初始化事件，返回编辑器对象 |           |
| content-change         | `Function(content: string)`  | 编辑器内容改变事件，返回当前内容 |           |
| preview-content-change | `Function()`                 | 预览内容改变时触发               |           |

### MdRender 参数

| 参数名                | 类型                                      | 默认值 | 说明                                                                                                              | 跳转 Demo |
| :-------------------- | :---------------------------------------- | :----- | :---------------------------------------------------------------------------------------------------------------- | :-------- |
| base-url              | `string`                                  | --     | 设置渲染到 html 时，为相对 url 添加 baseUrl                                                                       |           |
| custom-parse          | `(html: string) => string`                | --     | 自定义对渲染后的 html 处理，需要接受渲染后的 html，返回自定义处理后的 html                                        |           |
| md-rules              | `object`                                  | {}     | 设置 markdown 对字符串的处理方式, 可参考[markdown-it](https://www.npmjs.com/package/markdown-it?activeTab=readme) |           |
| custom-renderer-rules | [ICustomRenderRule[]](#icustomrenderrule) | []     | 设置 markdown 对字符串的处理方式, 可参考[markdown-it](https://www.npmjs.com/package/markdown-it?activeTab=readme) |           |
| custom-xss-rules      | [ICustomXssRule[]](#icustomxssrule)       | []     | 自定义 xss 对某种 tag 的过滤方式，每条规则需要指定 tag，并给出需要加入白名单的属性数组                            |           |

### MdRender 事件

| 事件名           | 回调参数           | 说明                                       | 跳转 Demo |
| :--------------- | :----------------- | :----------------------------------------- | :-------- |
| md-render-change | `Function(string)` | 内容改变时触发，返回对应 html 渲染结果字段 |           |

#### ICustomRenderRule

```ts
interface ICustomRenderRule {
  key: string;
  value: Function;
}
```

#### ICustomXssRule

```ts
interface ICustomXssRule {
  key: string;
  value: string[];
}
```
