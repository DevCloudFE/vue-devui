# Splitter 分割器

页面分割器。

**何时使用**

需要动态调整不同页面布局区域大小的时候选择使用。

### 基本用法

:::demo

```vue
<template>
  <section>
    <d-splitter class="splitter-border" :orientation="orientation" :splitBarSize="splitBarSize" style="height: 300px">
      <template v-slot:DSplitterPane>
        <d-splitter-pane
          collapseDirection="before"
          :size="size"
          :minSize="minSize"
          :collapsible="true"
          @sizeChange="sizeChange"
          @collapsedChange="collapsedChange"
        >
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
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'DSplitterDemoBasic',
  setup() {
    const orientation = ref('horizontal');
    const splitBarSize = '2px';
    // splitter pane input
    const size = ref('30%');
    const minSize = ref('20%');
    const maxSize = ref('60%');
    const sizeChange = (size) => {
      console.log(size);
    };
    const collapsedChange = (event) => {
      console.log(event);
    };

    return {
      orientation,
      splitBarSize,
      size,
      minSize,
      maxSize,
      sizeChange,
      collapsedChange,
    };
  },
});
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

### 垂直布局用法

:::demo

```vue
<template>
  <section>
    <d-splitter style="height: 500px" class="splitter-border" orientation="vertical" :disableBarSize="disableBarSize">
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
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'DSplitterDemoVertical',
  setup() {
    const collapsed = ref(true);
    const disableBarSize = '2px';

    const sizeChange = (size) => {
      console.log(size);
    };

    return {
      disableBarSize,
      collapsed,
      sizeChange,
    };
  },
});
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

### 组合布局用法

:::demo

```vue
<template>
  <section>
    <d-splitter class="splitter-border" style="height: 600px" orientation="vertical">
      <template v-slot:DSplitterPane>
        <d-splitter-pane size="400px" minSize="100px" :sizeChange="sizeChange">
          <d-splitter style="height: 100%">
            <template v-slot:DSplitterPane>
              <d-splitter-pane size="30%" minSize="20%" :sizeChange="sizeChange">
                <div class="pane-content">
                  <h2>Left</h2>
                  <div>width: 30%, min-width: 20%</div>
                </div>
              </d-splitter-pane>
              <d-splitter-pane minSize="15%">
                <d-splitter style="height: 100%" orientation="vertical">
                  <template v-slot:DSplitterPane>
                    <d-splitter-pane size="50%" style="overflow: hidden">
                      <div class="pane-content">
                        <h2>Top</h2>
                        <div>height: 50%</div>
                      </div>
                    </d-splitter-pane>
                    <d-splitter-pane style="overflow: hidden">
                      <div class="pane-content">
                        <h2>Bottom</h2>
                        <div>height: auto</div>
                      </div>
                    </d-splitter-pane>
                  </template>
                </d-splitter>
              </d-splitter-pane>
            </template>
          </d-splitter>
        </d-splitter-pane>
        <d-splitter-pane style="overflow: hidden">
          <div class="pane-content">
            <h2>Bottom</h2>
            <div>height: auto</div>
          </div>
        </d-splitter-pane>
      </template>
    </d-splitter>
  </section>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'DSplitterDemoMulti',
  setup() {
    const sizeChange = (size) => {
      console.log(size);
    };

    return {
      sizeChange,
    };
  },
});
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

### 指定折叠收起方向

:::demo

```vue
<template>
  <section>
    <d-splitter class="splitter-border" style="height: 300px">
      <template v-slot:DSplitterPane>
        <d-splitter-pane size="30%" minSize="20%" :sizeChange="sizeChange">
          <div class="pane-content">
            <h2>Left</h2>
            <div>width: 30%, min-width: 20%</div>
          </div>
        </d-splitter-pane>
        <d-splitter-pane minSize="15%" :collapsible="true" collapseDirection="before">
          <div class="pane-content">
            <h2>Center</h2>
            <div>Specify the folding and retracting direction to fold forward</div>
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
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'DSplitterDemoDirection',
  setup() {
    const sizeChange = (size) => {
      console.log(size);
    };

    return {
      sizeChange,
    };
  },
});
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

### Splitter 参数

| 参数                 | 类型                                        | 默认值       | 描述                              | 跳转 Demo                             |
| :------------------- | :------------------------------------------ | :----------- | :-------------------------------- | :------------------------------------ |
| orientation          | [SplitterOrientation](#splitterorientation) | 'horizontal' | 可选，指定 Splitter 分割方向      | [基本用法](#基本用法)                 |
| split-bar-size       | `string`                                    | '2px'        | 可选，分隔条大小，默认 2px        | [基本用法](#基本用法)                 |
| disabled-bar-size    | `string`                                    | '1px'        | 可选，pane 设置不可调整宽度时生效 | [垂直布局用法](#垂直布局用法)         |
| show-collapse-button | `boolean`                                   | true         | 可选，是否显示收起/展开按钮       | [折叠收缩显示菜单](#折叠收缩显示菜单) |

### SplitterPane 参数

| 参数               | 类型                                    | 默认值 | 描述                                                  | 跳转 Demo                             |
| :----------------- | :-------------------------------------- | :----- | :---------------------------------------------------- | :------------------------------------ |
| size               | `string`                                | --     | 可选，指定 pane 宽度，设置像素值或者百分比            | [基本用法](#基本用法)                 |
| min-size           | `string`                                | --     | 可选，指定 pane 最小宽度，设置像素值或者百分比        | [基本用法](#基本用法)                 |
| max-size           | `string`                                | --     | 可选，指定 pane 最大宽度，设置像素值或者百分比        | [基本用法](#基本用法)                 |
| resizable          | `boolean`                               | true   | 可选，指定 pane 是否可调整大小，会影响相邻 pane       | [垂直布局用法](#垂直布局用法)         |
| collapsible        | `boolean`                               | false  | 可选，指定 pane 是否可折叠收起                        | [基本用法](#基本用法)                 |
| collapsed          | `boolean`                               | false  | 可选，指定 pane 初始化是否收起，配合`collapsible`使用 | [垂直布局用法](#垂直布局用法)         |
| collapse-direction | [CollapseDirection](#collapsedirection) | 'both' | 可选，指定非边缘 pane 收起方向，配合`collapsible`使用 | [指定折叠收起方向](#指定折叠收起方向) |

### SplitterPane 事件

| 事件             | 类型                            | 描述                                        | 跳转 Demo             |
| :--------------- | :------------------------------ | :------------------------------------------ | --------------------- |
| size-change      | `(size: string) => void`        | 大小变动时，返回改变后的值,像素值或者百分比 | [基本用法](#基本用法) |
| collapsed-change | `(collapsed: boolean>) => void` | 折叠和展开时，返回当前 pane 是否折叠        | [基本用法](#基本用法) |

### Splitter 类型定义

#### SplitterOrientation

```ts
export type SplitterOrientation = 'vertical' | 'horizontal';
```

#### CollapseDirection

```ts
export type CollapseDirection = 'before' | 'after' | 'both';
```
