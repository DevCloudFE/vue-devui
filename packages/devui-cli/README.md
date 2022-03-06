# DevUI CLI

`DevUI CLI`是一个为组件库而生的脚手架工具，它有以下特性：
1. 创建组件库模板
2. 创建组件库入口文件

## 快速开始

### 本地启动

```sh
pnpm dev --filter devui-cli
```

成功启动之后将生成`devui-cli/lib/bin.js`文件，`dev`命令是可以热加载的，修改完代码不需要重新运行该命令。

运行该文件，即可进入创建组件的交互式命令行界面，按照引导创建组件模板或组件库入口文件。

```sh
pnpm cli --filter devui-cli create
```

### 构建

```sh
pnpm build --filter devui-cli
```

构建成功之后将生成`devui-cli/lib/bin.js`文件，这是最终的产物，用于发布 npm 包。

## 命令

目前支持以下命令：
- create
- build：进行中

### create

在当前目录下创建组件模板、组件库入口文件等。

主要有以下问答选项：
- 选择一个类型
  - `component`： 已完成，创建组件模板
  - `component-test`： 进行中
  - `component-doc`： 进行中
  - `lib-entry`： 已完成，会根据创建的组件来自动生成入口文件
  - `doc-nav`： 进行中
- 输入组件名称：将以该名称创建组件文件夹和组件名
- 输入组件中文名：文档中的组件标题将显示该名称
- 选择组件类型：`通用`、`导航`、`反馈`、`数据录入`、`数据展示`、`布局`
- 选择组件包含的形式（多选）：`component`、`service`、`directive`

### build

进行中
