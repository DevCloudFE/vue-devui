# CodeReview 代码检视

代码检视组件。

### 基本用法

:::demo

```vue
<template>
  <d-code-review :diff="diff" @add-comment="onAddComment" @after-view-init="afterViewInit" @content-refresh="onContentRefresh">
    <template #headOperate>
      <i class="icon icon-frame-expand"></i>
    </template>
  </d-code-review>
</template>

<script>
import { defineComponent, ref, h } from 'vue';

export default defineComponent({
  setup() {
    const diff = `--- a/src/diff2html.js
+++ b/src/diff2html.js
@@ -7,7 +7,6 @@
 
 (function() {
   var diffParser = require('./diff-parser.js').DiffParser;
-  var fileLister = require('./file-list-printer.js').FileListPrinter;
   var htmlPrinter = require('./html-printer.js').HtmlPrinter;
 
   function Diff2Html() {
@@ -43,7 +42,7 @@
 
     var fileList = '';
     if (configOrEmpty.showFiles === true) {
-      fileList = fileLister.generateFileList(diffJson, configOrEmpty);
+      fileList = htmlPrinter.generateFileListSummary(diffJson, configOrEmpty);
     }
 
     var diffOutput = '';
`;

    let codeReviewIns = {};

    const comments = [
      {
        lineNumber: 10,
        lineSide: 'left',
        comment: createCommentBlock(10, 'left', 'This is a comment for delete lines.'),
      },
      {
        lineNumber: 43,
        lineSide: 'right',
        comment: createCommentBlock(43, 'right', 'This is a comment for unchanged lines on Right.'),
      },
      {
        lineNumber: 45,
        lineSide: 'right',
        comment: createCommentBlock(45, 'right', 'This is a comment for changed lines on Right.'),
      },
      {
        lineNumber: 46,
        lineSide: 'left',
        comment: createCommentBlock(46, 'left', 'This is a comment for changed lines on Left.'),
      },
    ];

    function createCommentBlock(lineNumber, lineSide, param) {
      const container = document.createElement('div');
      container.classList.add('comment-container');

      // render函数第一个参数Component是业务自定义的组件
      // render(h(Component), container);

      // render函数在demo中不能用，故用原生dom示意
      const head = document.createElement('div');
      head.classList.add('head-box');
      const user = document.createElement('span');
      user.innerText = '张三';
      const deleteIcon = document.createElement('i');
      deleteIcon.className = 'icon icon-delete';
      deleteIcon.addEventListener('click', () => {
        const index = comments.findIndex((item) => item.lineNumber === lineNumber && item.lineSide === lineSide);
        comments.splice(index, 1);
        codeReviewIns.removeComment(lineNumber, lineSide);
      });
      head.appendChild(user);
      head.appendChild(deleteIcon);

      const span = document.createElement('span');
      span.innerText = param;

      container.appendChild(head);
      container.appendChild(span);

      return container;
    }

    const renderComment = () => {
      comments.forEach(({ lineNumber, lineSide, comment }) => {
        codeReviewIns.insertComment(lineNumber, lineSide, comment);
      });
    };

    const onAddComment = ({ left, right }) => {
      let lineSide = '';
      let lineNumber = -1;
      // line-by-line模式，当在未变更的行添加评论时，left和right均不为-1，业务可自行决定评论插入在left还是right，此demo插入在right。
      if (left !== -1 && right !== -1) {
        lineSide = 'right';
        lineNumber = right;
      } else if (left !== -1) {
        lineSide = 'left';
        lineNumber = left;
      } else {
        lineSide = 'right';
        lineNumber = right;
      }
      const container = document.createElement('div');
      container.classList.add('edit-comment-container');

      const textarea = document.createElement('textarea');
      textarea.setAttribute('autofocus', true);
      const buttonBox = document.createElement('div');
      const confirmButton = document.createElement('button');
      const cancelButton = document.createElement('button');
      confirmButton.innerText = '确定';
      confirmButton.addEventListener('click', () => {
        const inputValue = textarea.value;
        comments.push({ lineNumber, lineSide, comment: createCommentBlock(lineNumber, lineSide, inputValue) });
        codeReviewIns.removeComment(lineNumber, lineSide);
        renderComment();
      });
      cancelButton.innerText = '取消';
      cancelButton.addEventListener('click', () => {
        codeReviewIns.removeComment(lineNumber, lineSide);
      });
      buttonBox.appendChild(confirmButton);
      buttonBox.appendChild(cancelButton);

      container.appendChild(textarea);
      container.appendChild(buttonBox);
      codeReviewIns.insertComment(lineNumber, lineSide, container);
    };

    const afterViewInit = (e) => {
      codeReviewIns = e;
    };

    const onContentRefresh = (e) => {
      renderComment();
    };

    return { diff, onAddComment, afterViewInit, onContentRefresh };
  },
});
</script>

<style>
.comment-container {
  padding: 8px 12px;
  border-top: 1px solid var(--devui-dividing-line, #dfe1e6);
  border-bottom: 1px solid var(--devui-dividing-line, #dfe1e6);
}
.comment-container .head-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.comment-container .head-box > span {
  font-size: var(--devui-font-size);
  font-weight: bold;
}
.comment-container .icon-delete {
  color: var(--devui-icon-text, #252b3a);
  cursor: pointer;
}
.edit-comment-container {
  padding: 8px 12px;
}
.edit-comment-container textarea {
  width: 100%;
  height: 70px;
  resize: none;
  outline: none;
}
.edit-comment-container textarea:focus {
  border-color: #5e7ce0;
}
.edit-comment-container div {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.edit-comment-container div button {
  width: 64px;
  height: 32px;
  font-size: var(--devui-font-size);
  color: var(--devui-text, #252b3a);
  border-radius: 4px;
  background-color: #d1d1d1;
  margin-left: 4px;
}
.edit-comment-container div button:first-of-type {
  color: var(--devui-light-text, #252b3a);
  background-color: var(--devui-primary);
}
</style>
```

:::

### CodeReview 参数

| 参数名        | 类型                          | 默认值         | 说明                                      |
| :------------ | :---------------------------- | :------------- | :---------------------------------------- |
| diff          | `string`                      | ''             | 必选，diff 内容                           |
| fold          | `boolean`                     | false          | 可选，是否折叠显示                        |
| output-format | [OutputFormat](#outputformat) | 'line-by-line' | 可选，diff 展示格式，单栏展示或者分栏展示 |

### CodeReview 事件

| 事件名          | 类型                                   | 说明                                                                                                                                        |
| :-------------- | :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| fold-change     | `Function(status: boolean)`            | 折叠状态改变时触发的事件，回传参数为当前的折叠状态                                                                                          |
| add-comment     | `Function(position: CommentPosition)`  | 点击添加评论图标时触发的事件，参数内容详见[CommentPosition](#commentposition)                                                               |
| after-view-init | `Function(methods: CodeReviewMethods)` | 初始化完成后触发的事件，返回相关操作方法，参数内容详见[CodeReviewMethods](#codereviewmethods)                                               |
| content-refresh | `Function(diffFile: DiffFile)`         | 内容刷新后触发的事件，返回解析后的相关文件信息，参数内容详见[DiffFile](https://github.com/rtfpessoa/diff2html/blob/master/src/types.ts#L49) |

### CodeReview 插槽

| 插槽名      | 说明                       |
| :---------- | :------------------------- |
| headOperate | 自定义 head 右侧操作区内容 |

### 接口定义

#### OutputFormat

```ts
type OutputFormat = 'line-by-line' | 'side-by-side';
```

#### LineSide

```ts
type LineSide = 'left' | 'right';
```

#### CommentPosition

line-by-line 模式，left 表示左侧一栏的行号，right 表示右侧一栏的行号；当添加评论的位置没有发生内容变更时，left 和 right 均为具体行号；当添加评论的位置内容被删除时，left 为具体行号，right 为-1；当添加评论的位置为新增内容时，left 为-1，right 为具体行号。

```ts
interface CommentPosition {
  left: number;
  right: number;
}
```

#### CodeReviewMethods

```ts
interface CodeReviewMethods {
  // 切换折叠状态，可通过 status 参数设置折叠状态
  toggleFold: (status?: boolean) => void;

  // 插入评论的方法，传入行号、left/right、评论块DOM结构
  insertComment: (lineNumber: number, lineSide: LineSide, commentDom: HTMLElement) => void;

  // 删除评论的方法，传入行号、left/right
  removeComment: (lineNumber: number, lineSide: LineSide) => void;
}
```
