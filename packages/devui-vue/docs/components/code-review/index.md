# CodeReview 代码检视

代码检视组件。

### 基本用法

:::demo

```vue
<template>
  <d-button @click="onChange">{{ outputFormat === 'line-by-line' ? '双栏' : '单栏' }}</d-button>
  <d-fullscreen v-model="isFullscreen" :z-index="100">
    <d-code-review
      :diff="diff"
      :expand-loader="codeLoader"
      :expand-threshold="8"
      :output-format="outputFormat"
      :show-blob="showBlob"
      @add-comment="onAddComment"
      @after-view-init="afterViewInit"
      @content-refresh="onContentRefresh"
    >
      <template #headOperate>
        <i :class="isFullscreen ? 'icon-frame-contract' : 'icon icon-frame-expand'" @click="isFullscreen = !isFullscreen"></i>
      </template>
      <template #blob>
        <div class="blob-box">
          <span>文件内容过长，已收起展示。</span>
          <span class="blob-box-expand" @click="showBlob = false">仍要展开</span>
        </div>
      </template>
    </d-code-review>
  </d-fullscreen>
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
    const outputFormat = ref('line-by-line');
    const isFullscreen = ref(false);
    const showBlob = ref(true);

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

    const onChange = () => {
      if (outputFormat.value === 'line-by-line') {
        outputFormat.value = 'side-by-side';
      } else {
        outputFormat.value = 'line-by-line';
      }
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

    const codeLoader = ([lStart, lEnd, rStart, rEnd], update) => {
      if (lStart >= 60) {
        return update('');
      }
      const code = [
        "var diffParser = require('./diff-parser.js').DiffParser;\n",
        "var htmlPrinter = require('./html-printer.js').HtmlPrinter;\n",
        "var diffParser = require('./diff-parser.js').DiffParser;\n",
        "var htmlPrinter = require('./html-printer.js').HtmlPrinter;\n",
        "var diffParser = require('./diff-parser.js').DiffParser;\n",
        "var htmlPrinter = require('./html-printer.js').HtmlPrinter;\n",
        "var diffParser = require('./diff-parser.js').DiffParser;\n",
        "var htmlPrinter = require('./html-printer.js').HtmlPrinter;\n",
      ];
      const content =
        '--- a/src/diff2html.js\n+++ b/src/diff2html.js\n@@ -' +
        Math.min(lStart, lEnd) +
        ',' +
        Math.abs(lStart - lEnd - 1) +
        ' +' +
        Math.min(rStart, rEnd) +
        ',' +
        Math.abs(rStart - rEnd - 1) +
        ' @@\n ' +
        code.slice(0, Math.min(Math.abs(lStart - lEnd - 1), 10)).join(' ');
      update(content);
    };

    return { diff, outputFormat, showBlob, isFullscreen, onChange, onAddComment, afterViewInit, onContentRefresh, codeLoader };
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
.blob-box {
  padding: 12px 16px;
  text-align: center;
  cursor: pointer;
}
.blob-box-expand {
  color: var(--devui-brand, #5e7ce0);
}
.blob-box-expand:hover {
  text-decoration: underline;
}
</style>
```

:::


### 多选代码行用法

本示例将展示在开启多选代码行，多选后单击最后一个选中的行，添加评论，并且将选中代码行和代码块放入评论内容中。

:::demo

```vue
<template>
  <d-button @click="onChange">{{ outputFormat === 'line-by-line' ? '双栏' : '单栏' }}</d-button>
  <d-fullscreen v-model="isFullscreen" :z-index="100">
    <d-code-review
      :diff="diff"
      :expand-loader="codeLoader"
      :expand-threshold="8"
      :output-format="outputFormat"
      :show-blob="false"
      :allow-checked="true"
      @add-comment="onAddComment"
      @after-view-init="afterViewInit"
      @content-refresh="onContentRefresh"
    >
      <template #headOperate>
        <i :class="isFullscreen ? 'icon-frame-contract' : 'icon icon-frame-expand'" @click="isFullscreen = !isFullscreen"></i>
      </template>
    </d-code-review>
  </d-fullscreen>
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
    const outputFormat = ref('line-by-line');
    const isFullscreen = ref(false);

    const comments = [];

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

    const onChange = () => {
      if (outputFormat.value === 'line-by-line') {
        outputFormat.value = 'side-by-side';
      } else {
        outputFormat.value = 'line-by-line';
      }
    };

    const onAddComment = ({ left, right, details }) => {
      console.log(left, right, details);
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
      let codeCheckedStr = '';
      let firstLineType = '';       
      let lastLineType = '';
      let firstLine = '';
      let lastLine = '';
      let codeStr = '';
      // 单栏
      if (outputFormat.value === 'line-by-line' && details) {
        firstLineType = details.codes[0].slice(0, 1);
        lastLineType = details.codes[details.codes.length - 1].slice(0, 1);
        console.log(firstLineType, lastLineType);
        firstLine = details.lefts[0];
        lastLine = details.lefts[details.lefts.length - 1];
        // 删除行是left 增加行是right
        if (firstLineType === '+') {
          firstLine = details.rights[0];
        }
        if (lastLineType === '+') {
          lastLine = details.rights[details.rights.length - 1];
        }
        codeCheckedStr = `lines ${firstLineType}${firstLine} to ${lastLineType}${lastLine}\n`;
        codeStr = details.codes.join('\n');
      }
      // 双栏
      if (outputFormat.value === 'side-by-side' && details) {
        let lineNumbers = details.lefts;
        let codes = details.codes.leftCode;
        if (left === -1) {
          lineNumbers = details.rights;
          codes = details.codes.rightCode;
        }
        firstLineType = codes[0].slice(0, 1);
        lastLineType = codes[codes.length - 1].slice(0, 1);
        firstLine = lineNumbers[0];
        lastLine = lineNumbers[lineNumbers.length - 1];
        codeCheckedStr = `lines ${firstLineType}${firstLine} to ${lastLineType}${lastLine}\n`;
        codeStr = codes.join('\n');
      }
      const container = document.createElement('div');
      container.classList.add('edit-comment-container');

      const textarea = document.createElement('textarea');
      textarea.setAttribute('autofocus', true);
      textarea.value = codeCheckedStr ? `${codeCheckedStr}\n \`\`\`suggestion \n
      ${codeStr} \n \`\`\`` : '';
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

    const codeLoader = ([lStart, lEnd, rStart, rEnd], update) => {
      if (lStart >= 60) {
        return update('');
      }
      const code = [
        "var diffParser = require('./diff-parser.js').DiffParser;\n",
        "var htmlPrinter = require('./html-printer.js').HtmlPrinter;\n",
        "var diffParser = require('./diff-parser.js').DiffParser;\n",
        "var htmlPrinter = require('./html-printer.js').HtmlPrinter;\n",
        "var diffParser = require('./diff-parser.js').DiffParser;\n",
        "var htmlPrinter = require('./html-printer.js').HtmlPrinter;\n",
        "var diffParser = require('./diff-parser.js').DiffParser;\n",
        "var htmlPrinter = require('./html-printer.js').HtmlPrinter;\n",
      ];
      const content =
        '--- a/src/diff2html.js\n+++ b/src/diff2html.js\n@@ -' +
        Math.min(lStart, lEnd) +
        ',' +
        Math.abs(lStart - lEnd - 1) +
        ' +' +
        Math.min(rStart, rEnd) +
        ',' +
        Math.abs(rStart - rEnd - 1) +
        ' @@\n ' +
        code.slice(0, Math.min(Math.abs(lStart - lEnd - 1), 10)).join(' ');
      update(content);
      codeReviewIns.updateCheckedLineClass();
    };

    return { diff, outputFormat, isFullscreen, onChange, onAddComment, afterViewInit, onContentRefresh, codeLoader };
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
  height: 120px;
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
.blob-box {
  padding: 12px 16px;
  text-align: center;
  cursor: pointer;
}
.blob-box-expand {
  color: var(--devui-brand, #5e7ce0);
}
.blob-box-expand:hover {
  text-decoration: underline;
}
</style>
```
:::

### CodeReview 参数

| 参数名           | 类型                                                                | 默认值         | 说明                                                                               |
| :--------------- | :------------------------------------------------------------------ | :------------- | :--------------------------------------------------------------------------------- |
| diff             | `string`                                                            | ''             | 必选，diff 内容                                                                    |
| fold             | `boolean`                                                           | false          | 可选，是否折叠显示                                                                 |
| allow-comment    | `boolean`                                                           | true           | 可选，是否支持评论                                                                 |
| allow-checked    | `boolean`                                                           | false          | 可选，是否支持代码行选中，开启后可以按住 shift 点击鼠标选中多行代码，只能按照从小到大的顺序选择，可以跨行选择，开启后add-comment事件的反回值会发生变化。参数内容详见[CommentPosition](#commentposition) |
| show-blob        | `boolean`                                                           | false          | 可选，是否展示缩略内容，一般大文件或二进制文件等需要展示缩略内容时使用             |
| output-format    | [OutputFormat](#outputformat)                                       | 'line-by-line' | 可选，diff 展示格式，单栏展示或者分栏展示                                          |
| diff-type        | [DiffType](#difftype)                                               | 'modify'       | 可选，文件 diff 类型                                                               |
| allow-expand     | `boolean`                                                           | true           | 可选，是否支持展开非 diff 折叠代码                                                 |
| expand-threshold | `number`                                                            | 50             | 可选，展开所有代码行的阈值，低于此阈值全部展开，高于此阈值分向上和向下两个操作展开 |
| expand-loader    | `(interval: Array<number>, update: (code: string) => void) => void` | --             | 可选，展开代码回调函数，interval 为展开边界，获取展开代码后，执行 update 更新视图  |

### CodeReview 事件

| 事件名          | 类型                                   | 说明                                                                                                                                        |
| :-------------- | :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| fold-change     | `Function(status: boolean)`            | 折叠状态改变时触发的事件，回传参数为当前的折叠状态                                                                                          |
| add-comment     | `Function(position: CommentPosition)`  | 点击添加评论图标时触发的事件，参数内容详见[CommentPosition](#commentposition)                                                               |
| after-view-init | `Function(methods: CodeReviewMethods)` | 初始化完成后触发的事件，返回相关操作方法，参数内容详见[CodeReviewMethods](#codereviewmethods)                                               |
| content-refresh | `Function(diffFile: DiffFile)`         | 内容刷新后触发的事件，返回解析后的相关文件信息，参数内容详见[DiffFile](https://github.com/rtfpessoa/diff2html/blob/master/src/types.ts#L49) |

### CodeReview 插槽

| 插槽名      | 说明                                                     |
| :---------- | :------------------------------------------------------- |
| headOperate | 自定义 head 右侧操作区内容                               |
| blob        | 自定义需要展示的缩略内容，文件为大文件或二进制文件时使用 |

### 接口定义

#### OutputFormat

```ts
type OutputFormat = 'line-by-line' | 'side-by-side';
```

#### DiffType

```ts
type DiffType = 'modify' | 'add' | 'delete' | 'rename';
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

allow-checked模式下的CommentPosition返回值会多出一个details，其中lefts和rights代表左右两侧被选中的行号，codes被选中部分的代码块，单栏模式下是一个数组，双栏模式下是一个对象，分别返回左侧和右侧被选中的代码块。如果选中行左侧或者右侧没值数组最后一项会为-1(单栏模式下需要注意不能直接跨方向使用，例如不能选中一个只有左侧行的行然后直接选择一个只有右侧行的行，例如示例中不能直接先选左10然后直接选右45)

```ts
interface CommentPosition {
  left: number,
  right: number,
  details?: {
    lefts: Array<number>,
    rights: Array<number>,
    codes: Array<string> | {
      leftCode: Array<string>,
      rightCode: Array<string>,
    }
  }
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

  // 更新选中行样式，直接调用一般用于展开时更新选中行样式，像示例中一样使用
  updateCheckedLineClass: ();
}
```
