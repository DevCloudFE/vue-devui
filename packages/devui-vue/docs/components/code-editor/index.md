# codeEditor 代码编辑器

基于monaco editor, 为你的页面增加代码编辑能力。

由于monaco editor对语法处理是通过web Worker实现的，所以需要加载处理语法的 Worker, 配置方式参考[官方教程](https://github.com/microsoft/monaco-editor/blob/main.docs/integrate-esm.md).

### 基本用法

:::demo `v-model`双向绑定编辑器内容，`options`参数[参考 monaco editor 定义](https://github.com/microsoft/monaco-editor/api/interfaces/monaco.editor.IEditorConstructionOptions.html)。

```vue

<template>
    <dp-code-editor v-model="code" :options="{language: 'typescript' }" style="height: 220px"></dp-code-editor>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
    const code = ref(`export class cell {
    public row:number;
    public col: number;
    public live: boolean;

    constructor(row: number, col: number, live: boolean) {
        this.row = row;
        this.col = col;
        this.live = live;
    }
}`)

    return { code };
}
})
</script>

```

:::

### CodeEditor参数

| 参数          | 类型                            | 默认  | 说明                                                                                      | 
| :------------ | :------------------------------ | :---- | :---------------------------------------------------------------------------------------- |
| v-model          | `string`                        | ''    | 可选，传入编辑器内容                                                    |
| mode         | [Mode](#mode)                        | 'normal'    | 可选，编辑器模式                                                    |
| original-text     | `string`                        | ''    | 可选，diff模式下原始对比文本                                                    |
| theme     | [Theme](#theme)                        | 'light'    | 可选，编辑器主题                                                   |
| auto-height     | `boolean`                        | false    | 可选，编辑器高度是否根据内容自适应                                                   |
| refresh-all     | `boolean`                        | false    | 可选, 是否需要刷新全部评论                                                   |
| offset-left     | `number`                        | --    | 可选, 传入的domNode的左偏移量                                                |
| add-comment-icon     | `string`                        | ''    | 可选, 左侧添加评论图标                                               |
| expand-comment-icon     | `string`                        | ''    | 可选, 左侧展开评论图标                                               |
| options     |   [Options](#options)              | {}    | 可选, 编辑器选项，[参考](https://github.com/microsoft/monaco-editor/api/interfaces/monaco.editor.IEditorConstructionOptions.html)             |
| mouse-target-type     | [monaco.editor.MouseTargetType](https://github.com/microsoft/monaco-editor/api/enums/monaco.editor.MouseTargetType.html)          | [2, 4]    | 可选, 鼠标点击返回事件区域 |
| editor-decorations     | [Decoration[]](#decoration)                       | []    | 可选, 编辑器的侧边装饰                           |
| comments     | [Comment[]](#comment)                       | []    | 可选, 代码检视内容                           |


### CodeEditor 事件

### CodeEditor 事件

| 事件   | 回掉参数                | 说明                                          |
| :----- | :------------------ | :------------------------------------------------- |
| after-editor-init | `Function(instance: IStandaloneCodeEditor \| IStandaloneDiffEditor)` | 初始化完成事件，返回monaco-editor实例 |
| click | `Function(event: IEditorMouseEvent)` | 点击编辑器不同区域返回事件 |

### 类型定义

#### Mode

```ts
type Mode = 'normal' | 'diff' | 'review';
```

#### Theme

```ts
type Theme = 'light' | 'dark';
```

#### Options

```ts
type Options = monaco.IEditorConstructionOptions;
```

#### Decoration
```ts
interface Decoration {
    lineNumber: number;
    icon?: string;
    customClasses?: string;
    glyphClassName?: string;
}
```

#### Comment

```ts
interface Comment {
    lineNumber: number;
    isExpanded: boolean;
    domNode?: HTMLElement;
    heightInPx?: number;
    allowEditorOverflow?: boolean;
    offsetLedt?: number;
}
```

#### IStandaloneCodeEditor

```ts
type IStandaloneCodeEditor = monaco.IStandaloneCodeEditor;
```

#### IStandaloneDiffEditor

```ts
type IStandaloneDiffEditor = monaco.IStandaloneDiffEditor
```