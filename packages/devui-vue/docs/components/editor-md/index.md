# Markdown MD 编辑器

### 基本用法

:::demo `v-model`双向绑定输入容器内的值；当内容发生变化时，出发`content-change`事件，返回当前内容。

```vue
<template>
  <input v-model="content" />
  <d-editor-md v-model="content" :md-rules="mdRules" base-url="https://test-base-url" @content-change="valueChange" @preview-content-change="previewChange"></d-editor-md>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const content = ref('# This is the title');
    const mdRules = reactive({
      linkify: {
        fuzzyLink: false,
      },
    });

    const valueChange = (val) => {
      console.log(val);
    };

    const previewChange = (val) => {
      console.log(val);
    };

    return { content, mdRules, valueChange, previewChange };
  },
});
</script>
```

:::

### 自定义渲染

:::demo 自定义从 md 到 html 的渲染规则，也可自定义XSS过滤规则，放开指定标签。

```vue
<template>
  <d-editor-md v-model="content" :custom-renderer-rules="customRendererRules" :custom-xss-rules="customRenderRules"></d-editor-md>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const content = ref('[link](#test)\n<kbd>kbd 标签渲染</kbd>');
    const customRenderRules = ref([
      {
        key: 'kbd',
        value: [], // 为空表示过滤所有属性，放开属性则添加对应项，如['id', 'style']
      },
      {
        key: 'input',
        value: null, // value值为null，则对应标签不会被渲染
      }
    ])
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
    return { content, customRendererRules, customRenderRules };
  },
});
</script>
```
:::

### 自定义工具栏

:::demo 自定义编辑器的工具栏

```vue
<template>
  <d-editor-md v-model="content" :toolbar-config="toolbarConfig" :custom-toolbars="customToolbars"></d-editor-md>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const content = ref('');
    const toolbarConfig = ['add',
      ['undo', 'redo'],
      ['h1', 'h2', 'bold', 'italic', 'strike', 'underline', 'color', 'font'],
      ['ul', 'ol', 'checklist', 'code', 'link', 'image', 'table'],
      'fullscreen',
    ];
    const customToolbars = {
      add: {
        id: 'add',
        name: '新增',
        exitName: '新增',
        type: 'button',
        icon: `<span>+</span>`,
        shortKey: 'ALT+K',
        handler: () => {
          console.log('自定义工具点击事件');
        },
      },
      undo: {
        id: 'undo',
        name: '撤销',
        exitName: '撤销',
        type: 'button',
        icon: `<svg width="16px" height="14px" viewBox="0 0 16 14">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g fill="#293040">
            <path d="M11,5 C13.7614237,5 16,7.23857625 16,10 C16,12.7614237 13.7614237,15 11,15 L7,15 L7,14 L11,14 C13.209139,14 15,12.209139 15,10 C15,7.790861 13.209139,6 11,6 L5,6 L5,10 L0,5.5 L5,1 L5,5 L11,5 Z" id="路径"></path>
          </g>
        </g>
        </svg>`,
        shortKey: 'Ctrl+M',
        handler: () => {
          console.log('覆盖原有工具栏功能事件');
        },
      }
    };
    return { content, toolbarConfig, customToolbars };
  },
});
</script>
```

:::

### 纯渲染模式

:::demo 使用 MDRender 进行单独渲染

```vue
<template>
  <d-md-render :content="content" :md-rules="mdRules" base-url="https://test-base-url"></d-md-render>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const content = ref('# h1 \n [link](#test)');
    const mdRules = reactive({
      linkify: {
        fuzzyLink: false,
      },
    });

    return { content, mdRules };
  },
});
</script>
```

:::

### 单列渲染模式

:::demo 通过 mode 控制不同的显示模式

```vue
<template>
  <d-button variant="solid" color="primary" @click="handleModeChange" style="margin-bottom:8px">切换编辑/只读模式</d-button>
  <d-editor-md
    v-model="content"
    :mode="mode"
    :md-rules="mdRules"
    base-url="https://test-base-url"
    @content-change="valueChange"
  ></d-editor-md>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const content = ref('# This is the title');
    const mdRules = reactive({
      linkify: {
        fuzzyLink: false,
      },
    });

    const valueChange = (val) => {
      console.log(val);
    };

    const mode = ref('editonly');

    const handleModeChange = () => {
      if (mode.value === 'editonly') {
        mode.value = 'readonly';
      } else {
        mode.value = 'editonly';
      }
    };

    return { content, mode, mdRules, valueChange, handleModeChange };
  },
});
</script>
```

:::

### 配置图片文件上传

:::demo 设置 imageUploadToServer 后，编辑器对粘贴操作也将进行监听，若有图片也将触发 imageUpload 事件。

```vue
<template>
  <d-editor-md v-model="content" :image-upload-to-server="true" @content-change="valueChange" @image-upload="imageUpload"></d-editor-md>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const content = ref('# This is the title');

    const valueChange = (val) => {
      console.log(val);
    };

    const imageUpload = ({ file, callback }) => {
      let message;
      const rFilter = /^(image\/bmp|image\/gif|image\/jpge|image\/jpeg|image\/jpg|image\/png|image\/tiff)$/i;
      if (!rFilter.test(file.type)) {
        console.log(rFilter, file.type);
        message = 'Please choose bmp/jpg/jpge/png/gif/tiff type picture to upload';
      } else if (file.size / (1024 * 1024) > 1) {
        message = 'Please choose a picture smaller than 1M to upload';
      }

      if (message) {
        // throw the error message by yourself
        return false;
      } else {
        new Promise((resolve) => {
          const xhr = new XMLHttpRequest();
          xhr.open('POST', 'https://xxx.xxx.com/v1/xxx');
          xhr.setRequestHeader('yourKey', 'yourValue');

          xhr.addEventListener(
            'load',
            (evt) => {
              const result = JSON.parse(xhr.responseText);
              resolve(result);
            },
            false
          );

          const fd = new FormData();
          fd.append('file', file);
          xhr.send(fd);
        }).then((res) => {
          if (res.status === 'success') {
            callback({ name: file.name, imgUrl: res['imgUrl'], title: res['imgTitle'] });
          } else {
            // throw your error message
          }
        });
      }
    };

    return { content, valueChange, imageUpload };
  },
});
</script>
```

:::

### checkbox 渲染

:::demo 通过配置md-plugins checkbox插件，进行checkbox渲染于checked变更响应。

editor-md/checkbox
:::

### 数学公式 渲染

:::demo 通过配置md-plugins katex插件，进行数学公式渲染。

```vue
<template>
  <d-editor-md
    v-model="content"
  >
  </d-editor-md>
  <!-- <d-editor-md
    v-model="content"
    :md-plugins="plugins"
  >
  </d-editor-md> -->
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
// import mk from '@iktakahiro/markdown-it-katex';  // 请首先安装 @iktakahiro/markdown-it-katex 依赖

export default defineComponent({
  setup() {
    const content = ref(`$E = mc^2$
$\\sqrt{3x-1}+(1+x)^2$  // DEMO无法进行import，使用时请放开代码中注释
    `);

    const mdPlugins = [{
      // plugin: mk
    }];

    return { content, mdPlugins };
  },
});
</script>

<style>
@import 'katex/dist/katex.min.css';  /* 请首先安装 katex 依赖 */
</style>
```

:::

### PlantUML 渲染

:::demo 通过配置md-plugins plantuml插件，进行plantuml图渲染。

```vue
<template>
  <d-editor-md
    v-model="content"
  >
  </d-editor-md>
  <!-- <d-editor-md
    v-model="content"
    :md-plugins="plugins"
  >
  </d-editor-md> -->
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
// import PlantUml from 'markdown-it-plantuml';  // 请首先安装 markdown-it-plantuml 依赖

export default defineComponent({
  setup() {
    const content = ref(`// DEMO无法进行import，使用时请放开代码中注释
@startuml
Alice -> "Bob()" : Hello
"Bob()" -> "This is very long" as Long
' You can also declare:
' "Bob()" -> Long as "This is very long"
Long --> "Bob()" : ok
@enduml`);

    const mdPlugins = [{
      // plugin: PlantUml,
      // opts: {server: 'https://www/plantuml.com/plantuml'} // 自定义server可参考plantuml官方文档进行搭建
    }];

    return { content, mdPlugins };
  },
});
</script>
```

:::

### emoji渲染

通过配置`md-plugins` emoji插件，进行emoji表情渲染。具体使用方式参考示例代码。

:::demo

```vue
<template>
  <d-editor-md v-model="content" :md-plugins="plugins"></d-editor-md>
</template>

<script>
import { defineComponent,ref } from 'vue';
// import { full as emoji } from 'markdown-it-emoji'; // 请首先安装 markdown-it-emoji 依赖

export default defineComponent({
  setup(){
    const content = ref(':joy:');
    const plugins = [];
    /* const plugins = [{
      plugin: emoji,
    }]; */

    return {content,plugins}
  }
})

</script>
```

:::

### 配置快速提示

:::demo 设置 hintConfig 后，可用于支持@选择用户等场景。

```vue
<template>
  <d-editor-md
    v-model="content"
    :placeholder="'You can enter @ associate member, enter # to associate an order number...'"
    :hint-config="hintConfig"
    :fullscreen-z-index="1000"
    @content-change="valueChange"
  >
    <template #hintTemplate>
      <ul class="list-menu" v-if="hintList && hintList.length">
        <li class="menu-item" v-for="(item, index) of hintList" @click="hintItemClick(item)">{{ `${item.itemText}`}}</li>
      </ul>
    </template>
  </d-editor-md>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const content = ref('');

    const valueChange = (val) => {
      console.log(val);
    };

    const hintList = ref([]);

    const hintItemClick = (item) => {
      hintCallback.value && hintCallback.value(item.insertText || item.itemText);
    };

    const hintCallback = ref();

    const hintConfig = {
      '#': (e) => {
          const { callback, cursorHint, prefix } = e;
          const numberList = [
            {
              itemText: '00001',
              insertText: '[00001](#00001)'
            },
            {
              itemText: '00002',
              insertText: '[00002](#00002)'
            },
            {
              itemText: '00003',
              insertText: '[00003](#00003)'
            },
            {
              itemText: '00004',
              insertText: '[00004](#00004)'
            }
          ];
          hintList.value = numberList.filter((item) => item.itemText.indexOf(cursorHint) !== -1);
          hintCallback.value = callback;
      },
      '@': {
        handler: (e) => {
          const { callback, cursorHint, prefix } = e;
          const userList = [
            {
              itemText: 'User1'
            },
            {
              itemText: 'User2'
            },
            {
              itemText: 'User3'
            },
            {
              itemText: 'User4'
            }
          ];
          hintList.value = userList.filter((item) => item.itemText.indexOf(cursorHint) !== -1);
          hintCallback.value = callback;
        },
      },
      throttleTime: 200,
    };

    return { content, valueChange, hintConfig, hintList, hintCallback, hintItemClick };
  },
});
</script>
<style>
.list-menu {
  padding: 8px;
  margin: 0;
  width: 100px;
}
.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 4px;
  cursor: pointer;
}
.menu-item:hover {
  background-color: var(--devui-list-item-hover-bg, #f2f5fc);
  color: var(--devui-list-item-hover-text, #526ecc);
}
</style>
```

:::

### TOC目录渲染

:::demo 支持TOC目录生成

```vue
<template>
  <d-editor-md v-model="content" :base-url="baseUrl"></d-editor-md>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const content = ref(`[TOC]
# Directory

## Level-1 Directory
This is a Level-1 directory.

### Level-2 Directory
This is a Level-1 directory.

## Level-1 Directory
This is a Level-1 directory.
`);
    const baseUrl = location.href;

    return { content, baseUrl };
  },
});
</script>
```

:::

### mermaid 渲染

:::demo 支持mermaid流程图、甘特图、时序图等图表渲染

```vue
<template>
  <d-editor-md v-model="content" :fullscreen-z-index="1000"></d-editor-md>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const content = ref(`# Flow Chart
\`\`\`mermaid
flowchart LR
A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
\`\`\`

# Gantt
\`\`\`mermaid
gantt
    section Section
    Completed :done,    des1, 2014-01-06,2014-01-08
    Active        :active,  des2, 2014-01-07, 3d
    Parallel 1   :         des3, after des1, 1d
    Parallel 2   :         des4, after des1, 1d
    Parallel 3   :         des5, after des3, 1d
    Parallel 4   :         des6, after des4, 1d
\`\`\`

# Class Diagram
\`\`\`mermaid
classDiagram
Class01 <|-- AveryLongClass : Cool
<<Interface>> Class01
Class09 --> C2 : Where am I?
Class09 --* C3
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
class Class10 {
  <<service>>
  int id
  size()
}
\`\`\`

# State Diagram
\`\`\`mermaid
stateDiagram-v2
[*] --> Still
Still --> [*]
Still --> Moving
Moving --> Still
Moving --> Crash
Crash --> [*]
\`\`\`

# Pie
\`\`\`mermaid
pie
"Dogs" : 386
"Cats" : 85
"Rats" : 15
\`\`\`

# Sequence Diagram
\`\`\`mermaid
sequenceDiagram
Alice->>John: Hello John, how are you?
loop Healthcheck
    John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts!
John-->>Alice: Great!
John->>Bob: How about you?
Bob-->>John: Jolly good!
\`\`\`
`);

    return { content };
  },
});
</script>

:::

### EditorMd 参数

| 参数名                 | 类型                                      | 默认值   | 说明                                                                                                               |
| :--------------------- | :---------------------------------------- | :------- | :----------------------------------------------------------------------------------------------------------------- |
| v-model                | `string`                                  | ''       | 编辑器内容双向绑定                                                                                                 |
| options                | `object`                                  | {}       | 编辑器初始化时，自定义配置，可参考[CodeMirror Options](https://codemirror.net/doc/manual.html#config)              |
| base-url               | `string`                                  | --       | 设置渲染到 html 时，为相对 url 添加的 baseUrl                                                                      |
| custom-parse           | `(html: string) => string`                | --       | 自定义对渲染后的 html 处理，需要接收渲染后的 html，返回自定义处理后的 html                                         |
| md-rules               | `object`                                  | {}       | 设置 markdown 对字符串的处理方式， 可参考[markdown-it](https://www.npmjs.com/package/markdown-it?activeTab=readme) |
| md-plugins             | [MdPlugin[]](#mdplugin)                   | --       | 设置 markdown-it 插件 |
| hintConfig             | [MdHintConfig[]](#hintconfig)             | --       | 设置 快速提示 配置 |
| mode                   | `'editonly' \| 'readonly' \| 'normal'`    | 'normal' | 只写/只读/双栏显示模式选择，默认 'normal' 双栏模式显示                                                             |
| custom-renderer-rules  | [ICustomRenderRule[]](#icustomrenderrule) | []       | 自定义 markdown 对节点的渲染方式，每条规则需要指定对应节点 key,并自定义渲染函数                                    |
| custom-xss-rules       | [ICustomXssRule[]](#icustomxssrule)       | []       | 自定义 xss 对某种 tag 的过滤方式，每条规则需要指定 tag, 并给出需要加入白名单的属性数组                             |
| placeholder            | `string`                                  | ''       | 编辑器无内容是的提示信息                                                                                           |
| fullscreen-z-index     | `number`                                  | 10       | 编辑器全屏状态的 z-index                                                                                           |
| image-upload-to-server | `boolean`                                 | false    | 是否打开图片自定义上传开关（打开后将将监听图片的复制，toolbar 图片功能上传，传出事件回调）                         |
| editor-container-height| `number`|--|可选，编辑器内容区高度          ||
| toolbar-config         | `Array(string)`                                   |`[['undo', 'redo'],['h1', 'h2', 'bold', 'italic', 'strike', 'underline', 'color', 'font'],['ul', 'ol', 'checklist', 'code', 'link', 'image', 'table'],'fullscreen']`|展示在toolbar工具栏处的按钮，用[]包起来的表示是同一组，不同组的会有线隔开。也可以自定义，自定义时需要配置参数custom-toolbars         ||
| custom-toolbars        | {[IToolbarItemConfig](#itoolbaritemconfig)} |--|配置toolbar-config中对应按钮的具体设置 [自定义工具栏](#自定义工具栏) | |

### EditorMd 事件

| 事件名                 | 回调参数                     | 说明                                                               | 跳转 Demo |
| :--------------------- | :--------------------------- | :----------------------------------------------------------------- | :-------- |
| after-editor-init      | `Function(instance: object)` | 编辑器初始化事件，返回编辑器对象                                   |           |
| content-change         | `Function(content: string)`  | 编辑器内容改变事件，返回当前内容                                   |           |
| preview-content-change | `Function(string)`                 | 预览内容改变时触发，返回对应的html字段                                                 |           |
| image-upload           | `Function({file, callback})` | 打开图片上传开关后，图片上传事件回调，返回文件内容与 callback 函数 |           |
| checked-change           | `Function(content: string)` | plugins添加checkbox后，预览checkbox checked状态改变回调 |           |

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
| checked-change   | `Function(content: string)` | plugins添加checkbox后，预览checkbox checked状态改变回调 |           |

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
  value: string[] | null;
}
```

#### MdPlugin

```ts
export interface MdPlugin {
  plugin: any;
  opts?: Object;
}
```

#### HintConfig

```ts
export interface HintConfigItem {
  handler: (obj: { callback: (replaceText: string) => void; cursorHint: string; prefix: string }) => void;
}
export interface HintConfig {
  throttleTime: number;  // 触发提示事件debounceTime(ms)，默认300
  [key: string]: HintConfigItem;  // key为触发提示前缀配置
}
```


### IToolbarItemConfig
```ts
export interface IToolbarItemConfig {
  id: string;
  name?: string;
  exitName?: string;
  type?: 'button' | 'dropDown';
  icon?: string;
  exitIcon?: string;
  template?: any;
  component?: any;
  shortKey?: string;
  params?: { [key: string]: any };
  handler?(editor?: any, params?: any): void;
}
const toolbars = Record<string, IToolbarItemConfig>
```
