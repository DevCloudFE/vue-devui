# Dropdown 下拉菜单
按下弹出列表组件。

### 何时使用
当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。



### 基本用法

:::demo

```vue
<template>
  <div class="space-y-s">
    <div class="flex items-center">
      触发方式：
      <d-radio-group direction="row" v-model="trigger">
        <d-radio v-for="item in triggerList" :key="item" :value="item">
          {{ item }}
        </d-radio>
      </d-radio-group>
    </div>
    <div class="flex items-center">
      关闭区域： 
      <d-radio-group direction="row" v-model="closeScope">
        <d-radio v-for="item in closeScopeAreas" :key="item" :value="item">
          {{ item }}
        </d-radio>
      </d-radio-group>
    </div>

    <div class="flex items-center">
      仅当鼠标从菜单移除时才关闭：
      <d-switch v-model:checked="closeOnMouseLeaveMenu"></d-switch>
    </div>

    <div class="flex items-center">
      动画开关：
      <d-switch v-model:checked="showAnimation"></d-switch>
    </div>
    <div class="flex items-center">
      自定义宽度：
      <d-input-number v-model="width" :max="400" :min="100" :step="100" /> px
    </div>
  </div>
  <d-button ref="origin" style="margin-top: 20px; margin-right: 10px">More</d-button>
  <d-button 
    v-show="trigger === 'manually'" 
    @click="isOpen = !isOpen"
  >
    {{!isOpen ? 'show dropdown' : 'close dropdown'}}
  </d-button>
  <d-dropdown 
    :origin="origin"
    :isOpen="isOpen"
    :trigger="trigger" 
    :closeScope="closeScope"
    :closeOnMouseLeaveMenu="closeOnMouseLeaveMenu"
    :showAnimation="showAnimation"
    :width="width"
  >
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
      isOpen: ref(false),
      trigger: ref('click'),
      triggerList: ['click', 'hover', 'manually'],

      closeScope: ref('blank'),
      closeScopeAreas: ['all', 'blank', 'none'],
      closeOnMouseLeaveMenu: ref(false),
      showAnimation: ref(true),
      width: ref(100)
    }
  }
})
</script>

<style>
ul.devui-dropdown-menu{
  padding-left: 0;
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

| 参数                  | 类型                                 | 默认    | 说明                                                                                                            |
| --------------------- | ------------------------------------ | ------- | --------------------------------------------------------------------------------------------------------------- |
| origin                | `Element \| ComponentPublicInstance` | 无      | 必选，必须指定 dropdown 的关联元素                                                                              |
| isOpen                | `boolean`                            | `false` | 可选，可以显示指定 dropdown 是否打开                                                                            |
| disabled              | `boolean`                            | `false` | 可选，设置为 true 禁用 dropdown                                                                                 |
| trigger               | `TriggerType`                        | `click` | 可选，dropdown 触发方式, click 为点击，hover 为悬停（也包含点击）、manually 为完全手动控制                      |
| closeScope            | `CloseScopeArea`                     | `all`   | 可选，点击关闭区域，blank 点击非菜单空白才关闭, all 点击菜单内外都关闭，none 菜单内外均不关闭仅下拉按键可以关闭 |
| closeOnMouseLeaveMenu | `boolean`                            | `false` | 可选，是否进入菜单后离开菜单的时候关闭菜单                                                                      |
| showAnimation         | `boolean`                            | `true`  | 可选，是否开启动画                                                                                              |
| width         | `number \| string`                            | `102px`  | 可选，对 dropdown 内容的宽度进行自定义                                                                                              |

TriggerType 类型
```typescript
type TriggerType = 'click' | 'hover' | 'manually';
```

CloseScopeArea 类型
```typescript
type CloseScopeArea = 'all' | 'blank' | 'none';
```