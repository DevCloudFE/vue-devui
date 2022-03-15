# Dropdown 下拉菜单

按下弹出列表组件。

#### 何时使用

当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。

### 基本用法

:::demo 组件默认插槽中定义触发元素，`menu`插槽中定义菜单。默认通过点击触发元素展开菜单。

```vue
<template>
  <d-dropdown style="width: 100px;" :position="position" align="start">
    <d-button>Click Me</d-button>
    <template #menu>
      <ul class="list-menu">
        <li class="menu-item">Item 1</li>
        <li class="menu-item">Item 2</li>
        <li class="menu-item">Item 3</li>
        <li class="menu-item">Item 4</li>
      </ul>
    </template>
  </d-dropdown>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      position: ref(['bottom-start', 'top-start']),
    };
  },
});
</script>

<style>
.list-menu {
  padding: 0;
  margin: 0;
  width: 100px;
}
.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100px;
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

### 触发方式

:::demo 组件默认通过`click`方式展开；`hover`方式为鼠标移上触发元素展开菜单；`manually`方式为手动控制，通过设置`visible`来控制组件是否展开。

```vue
<template>
  <div class="space-y-s">
    <div class="flex items-center">
      触发方式：
      <d-radio-group direction="row" v-model="trigger">
        <d-radio v-for="item in triggerList" :key="item" :value="item">{{ item }}</d-radio>
      </d-radio-group>
    </div>
  </div>
  <d-dropdown :visible="isOpen" :trigger="trigger" :position="position" align="start" style="width: 100px;" @toggle="handleToggle">
    <d-button>More</d-button>
    <template #menu>
      <ul class="list-menu">
        <li class="menu-item">Item 1</li>
        <li class="menu-item">Item 2</li>
        <li class="menu-item">Item 3</li>
        <li class="menu-item">Item 4</li>
      </ul>
    </template>
  </d-dropdown>
  <d-button v-show="trigger === 'manually'" @click="isOpen = !isOpen" style="margin-left: 8px;">
    {{ !isOpen ? 'show dropdown' : 'close dropdown' }}
  </d-button>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      isOpen: ref(false),
      trigger: ref('click'),
      triggerList: ['click', 'hover', 'manually'],
      position: ref(['bottom-start']),
      handleToggle: (val) => {
        console.log(val);
      },
    };
  },
});
</script>
```

:::

### 可关闭区域

:::demo 通过`close-scope`参数设置点击关闭区域，默认值为`all`表示点击菜单内外都关闭，`blank`点击非菜单空白才关闭，`none`菜单内外均不关闭仅下拉按键可以关闭。

```vue
<template>
  <div class="space-y-s">
    <div class="flex items-center">
      关闭区域：
      <d-radio-group direction="row" v-model="closeScope">
        <d-radio v-for="item in closeScopeAreas" :key="item" :value="item">{{ item }}</d-radio>
      </d-radio-group>
    </div>
  </div>
  <d-dropdown :close-scope="closeScope" :position="position" align="start" style="width: 100px;">
    <d-button>More</d-button>
    <template #menu>
      <ul class="list-menu">
        <li class="menu-item">Item 1</li>
        <li class="menu-item">Item 2</li>
        <li class="menu-item">Item 3</li>
        <li class="menu-item">Item 4</li>
      </ul>
    </template>
  </d-dropdown>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      closeScope: ref('all'),
      closeScopeAreas: ['all', 'blank', 'none'],
      position: ref(['bottom-start']),
    };
  },
});
</script>
```

:::

### 多级菜单

:::demo

```vue
<template>
  <d-dropdown>
    <d-button>Click Me</d-button>
    <template #menu>
      <ul class="list-menu">
        <d-dropdown :position="position" :offset="0" align="start">
          <li class="menu-item">
            Item 1
            <i class="icon icon-chevron-right"></i>
          </li>
          <template #menu>
            <ul class="list-menu">
              <d-dropdown :position="position" :offset="0" align="start">
                <li class="menu-item">
                  Item 1-1
                  <i class="icon icon-chevron-right"></i>
                </li>
                <template #menu>
                  <ul class="list-menu">
                    <li class="menu-item">Item 1-1-1</li>
                    <li class="menu-item">Item 1-1-2</li>
                    <li class="menu-item">Item 1-1-3</li>
                  </ul>
                </template>
              </d-dropdown>
              <li class="menu-item">Item 1-2</li>
            </ul>
          </template>
        </d-dropdown>
        <li class="menu-item">Item 2</li>
      </ul>
    </template>
  </d-dropdown>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      position: ref(['right-start', 'right-end']),
    };
  },
});
</script>
```

:::

### 单独使用 DropdownMenu

:::demo

```vue
<template>
  <d-button ref="origin" @click="isOpen = !isOpen">More</d-button>
  <d-dropdown-menu v-model="isOpen" :origin="origin?.$el">
    <d-list style="width: 100px;">
      <d-list-item v-for="item of data" :key="item.value" @click="change(item.value)">{{ item.label }}</d-list-item>
    </d-list>
  </d-dropdown-menu>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const isOpen = ref(false);
    const origin = ref(null);
    const data = [
      { value: 'item 1', label: 'Item 1' },
      { value: 'item 2', label: 'Item 2' },
      { value: 'item 3', label: 'Item 3' },
    ];
    const change = (value) => {
      console.log('value', value);
      isOpen.value = false;
    };

    return {
      isOpen,
      origin,
      data,
      change,
    };
  },
});
</script>
```

:::

### d-dropdown 参数

| 参数                      | 类型                      | 默认         | 说明                                                                                          |
| ------------------------- | ------------------------- | ------------ | --------------------------------------------------------------------------------------------- |
| visible                   | `boolean`                 | `false`      | 可选，可以显示指定 dropdown 是否打开                                                          |
| trigger                   | `TriggerType`             | `click`      | 可选，dropdown 触发方式, click 为点、hover 为悬停、manually 为完全手动控制                    |
| close-scope               | `CloseScopeArea`          | `all`        | 可选，点击关闭区域，blank 点击非菜单空白关闭, all 点击菜单内外关闭，none 仅触发元素关闭       |
| position                  | `Placement[]`             | `['bottom']` | 可选，展开位置，若位置包含`start`或`end`，需通过`align`参数设置对齐方式                       |
| align                     | `start \| end \| null`    | `null`       | 可选，对齐方式，默认居中对齐。若指定`start`对齐，当`start`位置放不下时，会自动调整为`end`对齐 |
| offset                    | `number \| OffsetOptions` | `4`          | 可选，指定与触发元素的间距                                                                    |
| close-on-mouse-leave-menu | `boolean`                 | `false`      | 可选，是否进入菜单后离开菜单的时候关闭菜单                                                    |

### d-dropdown 事件

| 事件名 | 说明                                                          | 参数                    |
| ------ | ------------------------------------------------------------- | ----------------------- |
| toggle | 组件收起和展开的布尔值，true 表示将要展开，false 表示将要关闭 | `EventEmitter<boolean>` |

### d-dropdown 插槽

| 名称    | 说明                 |
| ------- | -------------------- |
| default | 菜单打开时的触发元素 |
| menu    | 下拉菜单的内容       |

### d-dropdown-menu 参数

| 参数          | 类型                      | 默认         | 说明                                                                                          |
| ------------- | ------------------------- | ------------ | --------------------------------------------------------------------------------------------- |
| origin        | `HTMLElement`             | `-`          | 必选，必须指定 DropdownMenu 的关联元素                                                        |
| v-model       | `boolean`                 | `false`      | 必选，指定 DropdownMenu 是否打开                                                              |
| position      | `Placement[]`             | `['bottom']` | 可选，展开位置，若位置包含`start`或`end`，需通过`align`参数设置对齐方式                       |
| align         | `start \| end \| null`    | `null`       | 可选，对齐方式，默认居中对齐。若指定`start`对齐，当`start`位置放不下时，会自动调整为`end`对齐 |
| offset        | `number \| OffsetOptions` | `4`          | 可选，指定与触发元素的间距                                                                    |
| close-outside | `() => boolean`           | `() => true` | 可选，点击外部区域的回调函数，默认返回 true，点击外部区域会关闭 DropdownMenu                  |

### TriggerType 类型

```typescript
type TriggerType = 'click' | 'hover' | 'manually';
```

### CloseScopeArea 类型

```typescript
type CloseScopeArea = 'all' | 'blank' | 'none';
```

### Placement 类型

```typescript
type Placement =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'right-start'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end';
```

### OffsetOptions 类型

```typescript
type OffsetOptions = { mainAxis?: number; crossAxis?: number };
```
