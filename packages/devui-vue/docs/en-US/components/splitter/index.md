# Splitter

Split page.

**When To Use**

When you want to dynamically adjust the size of different page layout areas.

### Basic Usage

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

### Vertical Layout Usage

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
  name: "DSplitterDemoVertical",
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

### Combination Layout Usage

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
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: "DSplitterDemoMulti",
  setup() {

    const sizeChange = (size) => {
      console.log(size);
    }

    return {
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

### Specifies the folding direction

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
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: "DSplitterDemoDirection",
  setup() {

    const sizeChange = (size) => {
      console.log(size);
    }

    return {
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

### Collapse and collapse menu 【TODO】

### API

### d-splitter parameters

|        Parameter        |     Type     |    Default     |               Description                | Jump to Demo                                      |
| :----------------: | :----------: | :-----------: | :-------------------------------: | :--------------------------------------------- |
|    orientation     | `'vertical' \| 'horizontal'` |           'horizontal'            | Optional. It specifies the split direction of the splitter. The value can be'vertical'\|'horizontal' |  [Basic usage](#basic-usage)|
|    splitBarSize    |   `string`   |     '2px'     |    Optional. The default value is 2px.   | [Basic usage](#basic-usage)                          |
|  disabledBarSize   |   `string`   |     '1px'     | Optional. This parameter is valid when the unadjustable width is set for the panel. | [Vertical layout usage](#vertical-layout-usage)                  |
| showCollapseButton |  `boolean`   |     true      |    Optional. Whether to display the collapse/expand button    | [Collapse and collapse menu](#collapse-and-collapse-menu-todo)          |

### d-splitter-pane parameters

|       Parameter        |    Type    |  Default  |                         Description                          | Jump to Demo                             |
| :---------------: | :--------: | :------: | :---------------------------------------------------: | :------------------------------------ |
|       size        |  `string`  |    --    |      Optional. Specifies the width of the pane and sets the pixel value or percentage.       | [Basic usage](#basic-usage)                 |
|      minSize      |  `string`  |    --    |    Optional. Specifies the minimum width of the pane and sets the pixel value or percentage.     | [Basic usage](#basic-usage)                 |
|      maxSize      |  `string`  |    --    |    Optional. This parameter specifies the maximum width of the pane and sets the pixel value or percentage.     | [Basic usage](#basic-usage)                 |
|     resizable     | `boolean`  |   true   |    Optional. Specifies whether the size of a pane can be adjusted, which affects adjacent panes.    | [Vertical layout usage](#vertical-layout-usage)         |
|    collapsible    | `boolean`  |  false   |            Optional. Specifies whether the pane can be collapsed or collapsed.             | [Basic usage](#basic-usage)                 |
|     collapsed     | `boolean`  |  false   | Optional. Specifies whether to collapse the pane during initialization. This parameter is used together with `collapsible`. | [Vertical layout usage](#vertical-layout-usage)         |
| collapseDirection | `'before' \| 'after' \|                        'both'`                        | 'both'                                | Optional. This parameter specifies the folding direction of a non-edge pane. This parameter is used together with `collapsible`. | [Collapse and collapse menu](#collapse-and-collapse-menu-todo)

### d-splitter-pane event

|        Event        |          Type           |                    Description                     | Jump to Demo                             |
| :----------------: | :---------------------: | :-----------------------------------------: | ------------------------------------- |
|     sizeChange     | `EventEmitter<string>`  | When the size changes, the changed value (pixel value or percentage) is returned. | [Basic usage](#basic-usage)                 |
|  collapsedChange   | `EventEmitter<boolean>` |    Whether the current pane is collapsed or expanded.     | [Basic usage](#basic-usage)                 |
