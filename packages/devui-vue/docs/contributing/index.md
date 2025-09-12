# Vue DevUI 贡献指南

你好！我们很高兴你有兴趣为 Vue DevUI 做出贡献。在提交你的贡献之前，请花点时间阅读以下指南：

### 快速上手

Vue DevUI 使用 `pnpm` 构建 `monorepo` 仓库，你应该使用 [pnpm 6.x](https://www.pnpm.cn/) 包管理器，以确保不会因为包管理器的不同而引发异常。
> pnpm 7.x 发生了[break change](https://github.com/pnpm/pnpm/releases/tag/v7.0.0)，如要使用pnpm 7.x 请自行更新`package.json`的script，例如本地启动：`pnpm --filter vue-devui dev`，其他修改可以查阅上述链接。

如果你想参与 `devui-vue` 的开发或者测试：

1. 点击 GitHub 右上角的 Fork 按钮，将仓库 Fork 仓库到个人空间
2. Clone 个人空间项目到本地：`git clone git@github.com:username/vue-devui.git`
3. 在 Vue DevUI 的根目录下运行`pnpm i`, 安装 node 依赖
4. 运行 `pnpm dev`，启动组件库网站
5. 使用浏览器访问：[http://localhost:3000/](http://localhost:3000/)

```bash
# username 为用户名，执行前请替换
git clone git@github.com:username/vue-devui.git
cd vue-devui
git remote add upstream git@github.com:DevCloudFE/vue-devui.git
pnpm i
pnpm dev
```

### 参与贡献

Vue DevUI 是一个多人合作的开源项目，为了避免多人同时开发同一个组件/功能，请先在 [issues 列表](https://github.com/DevCloudFE/vue-devui/issues) 中选择自己感兴趣的任务，在评论区认领。

> 提交之前需要给Commit添加GPG签名，参考：https://insights.thoughtworks.cn/how-to-sign-git-commit/

1. 请确保你已经完成快速上手中的步骤，并且正常访问 [http://localhost:3000/](http://localhost:3000/)
2. 创建新分支 `git checkout -b username/feature1`，分支名字建议为`username/feat-xxx`/`username/fix-xxx`
3. 本地编码，需遵循 [开发规范](/contributing/development-specification/)
4. 遵循 [Angular Commit Message Format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit) 进行提交（**不符合规范的提交将不会被合并**）
5. 提交到远程仓库，也就是 Fork 后的仓库，`git push origin branchName`
6. (可选) 同步上游仓库dev分支最新代码，`git pull upstream dev`
7. 打开上游仓库提交 [PR](https://github.com/DevCloudFE/vue-devui/pulls)
8.  仓库 Committer 进行 Code Review，并提出意见
9.  PR 发起人根据意见调整代码（一个分支发起了 PR 后，后续的 commit 会自动同步，不需要重新 PR）
10.  仓库管理员合并PR
11.  贡献流程结束，感谢你的贡献

如果涉及新组件或组件的新特性，则需要：

1. 完善组件中英文文档
2. 完善组件的单元测试
3. 完成组件[自检清单](https://github.com/DevCloudFE/vue-devui/wiki/%E7%BB%84%E4%BB%B6%E8%87%AA%E6%A3%80%E6%B8%85%E5%8D%95)

代码在提交之前会自动执行 ESLint 检查，并且在 GitHub PR 提交门禁中也加上了 ESLint 检查任务，所以在提交之前请确保你的代码符合 ESLint 规范，ESLint 检查不通过，PR 将无法合入哦。

你可通过执行以下命令来手动执行代码检查：

```bash
# 执行 ESLint 检查
pnpm cli --filter vue-devui -- code-check -t eslint
pnpm cli --filter vue-devui -- code-check -t eslint -c alert,button

# 执行单元测试
pnpm cli --filter vue-devui -- code-check -t unit-test
pnpm cli --filter vue-devui -- code-check -t unit-test -c alert,button
```

### 加入开源社区

贡献完成之后，你可以在 PR 评论中 @all-contributors 这个机器人🤖️，将你加到贡献者列表中，比如：

```
@all-contributors please add @yourname for code.
```

你还可以提交一个 PR 修改 `PageContributorConfig.ts` 文件，主要修改你所贡献组件的 avatar 和 homepage 两个字段，这样你的头像就会展示在`官网首页`和`组件文档`中相应组件文档底部的贡献者列表中。

```
packages/devui-vue/docs/.vitepress/devui-theme/components/PageContributorConfig.ts
```

如果你对我们的开源项目感兴趣，欢迎通过以下方式加入我们的开源社区。

- 添加官方小助手微信：devui-official，加入我们的技术交流群
- 加入邮件列表：devui-contributor@googlegroups.com
