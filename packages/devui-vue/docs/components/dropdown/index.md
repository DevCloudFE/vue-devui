# Dropdown 下拉菜单

// todo 组件描述

### 何时使用

// todo 使用时机描述


### 基本用法
// todo 用法描述
:::demo // todo 展开代码的内部描述

```vue
<template>
  <d-button ref="origin" v-dDropdown trigger="click">More</d-button>
  <d-dropdown :origin="origin" trigger="click">
    <ul class="devui-dropdown-menu" role="menu">
      <li role="menuitem">
        <a class="devui-dropdown-item">Item 1</a>
      </li>
      <li class="disabled" role="menuitem">
        <a class="devui-dropdown-item disabled">Item 2</a>
      </li>
      <li role="menuitem">
        <a class="devui-dropdown-item">Item 3</a>
      </li>
      <li role="menuitem">
        <a class="devui-dropdown-item">Item 4</a>
      </li>
    </ul>
  </d-dropdown>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      origin: ref()
    }
  }
})
</script>

<style>
.devui-dropdown-menu > ul {
  list-style: none;
}
.devui-dropdown-menu li {
  padding-left: 0;
}

.devui-dropdown-menu a {
  color: unset;
}
.devui-dropdown-menu a:hover {
  text-decoration: none !important;
}

</style>
```

:::

hover 触发
:::demo // todo 展开代码的内部描述
```vue
<template>
  <d-button ref="origin">More</d-button>
  <d-dropdown :origin="origin" trigger="hover" closeOnMouseLeaveMenu>
    <ul class="devui-dropdown-menu" role="menu">
      <li role="menuitem">
        <a class="devui-dropdown-item">Item 1</a>
      </li>
      <li class="disabled" role="menuitem">
        <a class="devui-dropdown-item disabled">Item 2</a>
      </li>
      <li role="menuitem">
        <a class="devui-dropdown-item">Item 3</a>
      </li>
      <li role="menuitem">
        <a class="devui-dropdown-item">Item 4</a>
      </li>
    </ul>
  </d-dropdown>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      origin: ref(),
    }
  }
})
</script>

<style>
.devui-dropdown-menu > ul {
  list-style: none;
}
.devui-dropdown-menu li {
  padding-left: 0;
}

.devui-dropdown-menu a {
  color: unset;
}
.devui-dropdown-menu a:hover {
  text-decoration: none !important;
}
</style>
```

:::

### d-dropdown

d-dropdown 参数

| 参数                  | 类型             | 默认    | 说明                                                                                                            |
| --------------------- | ---------------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| origin                | `Element`        |         | 必选，必须指定 dropdown 的关联元素                                                                              |
| isOpen                | `boolean`        | `false` | 可选，可以显示指定 dropdown 是否打开                                                                            |
| disabled              | `boolean`        | `false` | 可选，设置为 true 禁用 dropdown                                                                                 |
| trigger               | `TriggerType`    | `click` | 可选，dropdown 触发方式, click 为点击，hover 为悬停（也包含点击）、manually 为完全手动控制                      |
| closeScope            | `CloseScopeArea` | `all`   | 可选，点击关闭区域，blank 点击非菜单空白才关闭, all 点击菜单内外都关闭，none 菜单内外均不关闭仅下拉按键可以关闭 |
| closeOnMouseLeaveMenu | `boolean`        | `false` | 可选，是否进入菜单后离开菜单的时候关闭菜单                                                                      |
| showAnimation         | `boolean`        | `true`  | 可选，是否开启动画                                                                                              |

TriggerType 参数
```typescript
type TriggerType = 'click' | 'hover' | 'manually';
```

CloseScopeArea 参数
```typescript
type CloseScopeArea = 'all' | 'blank' | 'none';
```