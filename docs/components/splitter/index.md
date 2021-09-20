# Splitter 分割器

页面分割器。

**何时使用**

需要动态调整不同页面布局区域大小的时候选择使用。

### 基本用法

:::demo

```vue
<template>
  <section>
    <d-splitter class="splitter-border"  :orientation="orientation" :splitBarSize="splitBarSize" style="height: 300px">
      <template v-slot:DSplitterPane>
        <d-splitter-pane collapseDirection="before" :size="size" :minSize="minSize" :collapsible="true" @sizeChange="sizeChange" @collapsedChange="collapsedChange">
          <div class="pane-content">
            <h2>Left</h2>
            <div>width: 30%, min-width: 20%</div>
          </div>
        </d-splitter-pane>
        <d-splitter-pane minSize="15%">
          <div class="pane-content">
            <h2>Right</h2>
            <div>Content</div>
          </div>
        </d-splitter-pane>
      </template>
    </d-splitter>
  </section>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: "DSplitterDemoBasic",
  setup() {
    const orientation = ref("horizontal");
    const splitBarSize = '2px';
    // splitter pane input
    const size = ref("30%");
    const minSize = ref("20%");
    const maxSize = ref("60%");
    const sizeChange = (size) => {
      console.log(size);
    }
    const collapsedChange = (event) => {
      console.log(event);
    }

    return {
      orientation,
      splitBarSize,
      size,
      minSize,
      maxSize,
      sizeChange,
      collapsedChange
    }
  },
})
</script>

<style> 
.pane-content {
  padding: 0 12px;
}

.splitter-border {
  border: 1px solid #dfe1e6;
}

</style>
```
:::


 <!-- `<style lang="scss"></style>` 的写法，在 `:::demo 语法中` 不起作用， 看了依赖包 `vitepress-theme-demoblock` 源码
是渲染的正则表达式只匹配 `<style></style>` 这种写法，TODO：待后续优化 
<style lang="scss"> 
@import "@devui/style/theme/color";

.pane-content {
  padding: 0 12px;
}

.splitter-border {
  border: 1px solid $devui-dividing-line;
}-->

### 垂直布局用法

:::demo

```vue
<template>
  <section>
    <d-splitter style="height: 500px" class="splitter-border"  orientation="vertical" :disableBarSize="disableBarSize" >
      <template v-slot:DSplitterPane>
        <d-splitter-pane size="200px" minSize="150px" :collapsed="collapsed" :collapsible="true" @sizeChange="sizeChange">
          <div class="pane-content">
            <h2>Top</h2>
            <div>height: 200px</div>
          </div>
        </d-splitter-pane>
        <d-splitter-pane style="overflow: hidden">
          <div class="pane-content">
            <h2>Center</h2>
            <div>height: auto</div>
          </div>
        </d-splitter-pane>
        <d-splitter-pane size="150px" :resizable="false" :collapsible="true">
          <div class="pane-content">
            <h2>Bottom</h2>
            <div>height: 150px, resizable: false</div>
          </div>
        </d-splitter-pane>
      </template>
    </d-splitter>
  </section>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: "DSplitterVerticalBasic",
  setup() {
    const collapsed = ref(true);
    const disableBarSize = '2px';

    const sizeChange = (size) => {
      console.log(size);
    }

    return {
      disableBarSize,
      collapsed,
      sizeChange,
    }
  },
})
</script>

<style> 
.pane-content {
  padding: 0 12px;
}

.splitter-border {
  border: 1px solid #dfe1e6;
}

</style>
```

:::

### 组合布局用法【TODO】

### 指定折叠收起方向【TODO】

### 折叠收缩显示菜单【TODO】

