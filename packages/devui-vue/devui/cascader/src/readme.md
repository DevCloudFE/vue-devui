# 组件组成
cacader组件分为：
- `cascader.tsx`主要文件，渲染主视图
- `cascader-multiple.tsx`多选模式下的内容展示container，单选模式为input组件
- `cascader-list.tsx`渲染列
- `cascader-item.tsx`渲染列中的项

# 组件设计
以下属性在`hooks/use-cascader-item.ts`中
- `activeIndexs`：每列中的选中下标，负责弹窗交互视图更新
- `value`：选中的项的value值集合，也可以通过props方式传入

**activeIndex** 负责视图更新，也就是hover或者click每项时的交互行为，**value**负责输出选中值。通过`watch`监听这两个值的改变驱动视图和值输出
