# Vue Devui 贡献指南

你好！ 我们很高兴你有兴趣为 Vue Devui 做出贡献。 在提交你的贡献之前，请务必花点时间阅读以下指南：

## 快速上手

Vue Devui 使用 `lerna.json` + `yarn` 构建 `monorepo` 仓库，你应该使用 [yarn](https://yarn.bootcss.com/) 包管理器，以确保不会因为包管理器的不同而引发异常
如果你想参与 `devui-vue` 的开发或者测试：

1. 点击Github右上角的Fork按钮，将仓库Fork仓库到个人空间
2. Clone个人空间项目到本地：`git clone git@github.com:username/vue-devui.git`
3. 在 Vue Devui 的根目录下运行`yarn i`, 安装node依赖
4. 进入 `packages/devui-vue` 目录下，运行 `yarn run dev`，这个脚本将会启动 `vitepress` 和组件库的开发环境下构建
5. 使用浏览器访问：http://localhost:3000（如遇白屏，请手动刷新页面）

```bash
# username 为用户名，执行前请替换
git clone git@github.com:username/vue-devui.git
cd vue-devui
git remote add upstream git@github.com:DevCloudFE/vue-devui.git
yarn i
yarn run dev
# 或者（推荐）
cd packages/devui-vue && yarn run dev
```

## 参与贡献

Vue Devui 是一个多人合作的开源项目，为了避免多人同时开发同一个组件/功能，请先在 [issues 列表](https://github.com/DevCloudFE/vue-devui/issues) 中选择自己感兴趣的任务，在评论区认领

1. 请确保你已经完成快速上手中的步骤，并且正常访问 http://localhost:3000
2. 创建新分支 `git checkout -b username/feature1`，分支名字建议为`username/feat-xxx`/`username/fix-xxx`
3. 本地编码
4. 遵循 [Angular Commit Message Format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit) 进行提交（**不符合规范的提交将不会被合并到dev分支**）
5. 提交到远程仓库，也就是Fork 后的仓库，`git push origin branchName`
6. (可选) 同步上游仓库dev分支最新代码，`git pull upstream dev`
7. 打开上游仓库提交[PR](https://github.com/DevCloudFE/vue-devui/pulls)
> 如果涉及新组件或组件的新特性，则需要：
9. 完善组件中英文文档
10. 完善组件的单元测试
11. 完成组件[自检清单](https://github.com/DevCloudFE/vue-devui/wiki/%E7%BB%84%E4%BB%B6%E8%87%AA%E6%A3%80%E6%B8%85%E5%8D%95)
12. 仓库管理员进行Code Review，并提出意见
13. PR 发起人根据意见调整代码（一个分支发起了PR后，后续的commit会自动同步，不需要重新PR）
14. 仓库管理员合并PR
15. 贡献流程结束，感谢你的贡献
