# Dropdown 下拉菜单

// todo 组件描述

### 何时使用

// todo 使用时机描述


### 基本用法
// todo 用法描述
:::demo // todo 展开代码的内部描述

```vue
<template>
  <d-button ref="origin">More</d-button>
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

.devui-dropdown-menu > a {
  color: unset;
}
.devui-dropdown-menu > a:hover {
  text-decoration: none;
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

.devui-dropdown-menu > a {
  color: unset;
}
.devui-dropdown-menu > a:hover {
  text-decoration: none;
}

</style>
```

:::

### d-dropdown

d-dropdown 参数

| 参数 | 类型 | 默认 | 说明 | 跳转 Demo | 全局配置项 |
| ---- | ---- | ---- | ---- | --------- | ---------- |
|      |      |      |      |           |            |
|      |      |      |      |           |            |
|      |      |      |      |           |            |

d-dropdown 事件

| 事件 | 类型 | 说明 | 跳转 Demo |
| ---- | ---- | ---- | --------- |
|      |      |      |           |
|      |      |      |           |
|      |      |      |           |

