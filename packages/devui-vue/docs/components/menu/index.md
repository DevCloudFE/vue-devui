# Menu 菜单

Menu 组件通常用于导航.

### 何时使用

在需要收纳，排列，展示一系列选项时.

### 基本用法

:::demo

```vue
<template>
  <d-menu mode="horizontal" :default-select-keys="['item1']">
    <d-menu-item :key="'item1'">
      <template #icon>
        <i class="icon-homepage"></i>
      </template>
      首页
    </d-menu-item>
    <d-sub-menu title="课程">
      <d-menu-item>
        C
      </d-menu-item>
      <d-sub-menu title="Python">
        <d-menu-item>
          基础
        </d-menu-item>
        <d-menu-item>
          进阶
        </d-menu-item>
      </d-sub-menu>
    </d-sub-menu>
    <d-menu-item>个人</d-menu-item>
    <d-menu-item href="https://www.baidu.com"> Link To Baidu </d-menu-item>
  </d-menu>
  <br /><br /><br /><br /><br /><br />
</template>
```

:::

### 自定义图标

有时我们需要为子菜单或菜单项定义一些图标，此时我们可以使用```icon```插槽来为菜单定义icon。同时我们也可以使用css来对插槽进行定制化的修改.

:::demo
```vue
<template>
  <d-menu mode="horizontal">
    <d-menu-item key="home">
      <template #icon>
        <i class="icon-homepage"></i>
      </template>
      主页
    </d-menu-item>
    <d-menu-item key="classes">
      课程
    </d-menu-item>
  </d-menu>
</template>
```
:::

### 垂直菜单

垂直菜单一般在后台中较为广泛使用，子菜单可以嵌入菜单中

:::demo

```vue
<template>
  <d-menu mode="vertical" :default-select-keys="['item1']" width="256px">
    <d-menu-item key="item1" :disabled="isDisabled">
      <template #icon>
        <i class="icon-homepage"></i>
      </template>
      <span>Home</span>
    </d-menu-item>
    <d-sub-menu title="System">
      <template #icon>
        <i class="icon-system"></i>
      </template>
      <d-menu-item>
        <span>System item</span>
      </d-menu-item>
      <d-sub-menu title="Setting">
        <template #icon>
          <i class="icon-setting"></i>
        </template>
        <d-menu-item>
          <span>Setting item</span>
        </d-menu-item>
      </d-sub-menu>
    </d-sub-menu>
  </d-menu>
</template>
```

:::

### 默认展开

通过设置`open-keys`可以修改展开的子菜单项目.

:::demo

```vue
<template>
  <d-menu width="256px" mode="vertical" :open-keys="['sub1', 'sub3']">
    <d-sub-menu key="sub1" title="sub1">
      <d-menu-item> Sub1 > item1 </d-menu-item>
      <d-menu-item> Sub1 > item2 </d-menu-item>
    </d-sub-menu>
    <d-sub-menu key="sub2" title="sub2">
      <d-menu-item> Sub2 > item1 </d-menu-item>
      <d-menu-item> Sub2 > item2 </d-menu-item>
    </d-sub-menu>
    <d-sub-menu key="sub3" title="sub3">
      <d-menu-item> Sub3 > item1 </d-menu-item>
      <d-menu-item> Sub3 > item2 </d-menu-item>
    </d-sub-menu>
  </d-menu>
</template>
```

:::

### 收缩菜单

:::demo

```vue
<d-button @click="changeCollapsed">
  Collapsed
</d-button>
<template>
  <d-menu mode="vertical" width="256px" :default-select-keys="['item1']" :collapsed="collapsed">
    <d-menu-item key="item1" :disabled="isDisabled">
      <template #icon>
        <i class="icon-homepage"></i>
      </template>
      <span>Home</span>
    </d-menu-item>
    <d-sub-menu title="System">
      <template #icon>
        <i class="icon-system"></i>
      </template>
      <d-menu-item>
        <span>System item</span>
      </d-menu-item>
      <d-sub-menu title="Setting">
        <template #icon>
          <i class="icon-setting"></i>
        </template>
        <d-menu-item>
          <span>Setting item</span>
        </d-menu-item>
      </d-sub-menu>
    </d-sub-menu>
  </d-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
let collapsed = ref(false);
const isDisabled = ref(true);
const changeCollapsed = () => {
  collapsed.value = !collapsed.value;
};
</script>
```

:::

### 取消多选

取消多选功能仅能使用在允许多选的菜单中，菜单项将会在取消多选时触发`deselect`事件。

:::demo

```vue
<template>
  <d-menu :default-select-keys="['item1']" multiple width="256px">
    <d-menu-item key="item1"> Item1 </d-menu-item>
    <d-menu-item key="item2"> Item2 </d-menu-item>
    <d-sub-menu title="Setting">
      <template #icon>
        <i class="icon-setting"></i>
      </template>
      <d-menu-item>
        <span>Setting item</span>
      </d-menu-item>
    </d-sub-menu>
  </d-menu>
</template>
```

:::

### 响应式参数

例如,`width`, `open-keys`, `default-select-keys`等参数均为响应式

:::demo

```vue
<template>
  <d-button @click="changeDisabled">changeDisabled</d-button>
  <d-menu mode="vertical" :width="width + 'px'" :default-select-keys="['item1']" :collapsed="collapsed">
    <d-menu-item key="item1" :disabled="isDisabled">
      <template #icon>
        <i class="icon-homepage"></i>
      </template>
      <span>Home</span>
    </d-menu-item>
    <d-sub-menu title="System">
      <template #icon>
        <i class="icon-system"></i>
      </template>
      <d-menu-item>
        <span>System item</span>
      </d-menu-item>
      <d-sub-menu title="Setting">
        <template #icon>
          <i class="icon-setting"></i>
        </template>
        <d-menu-item>
          <span>Setting item</span>
        </d-menu-item>
      </d-sub-menu>
    </d-sub-menu>
  </d-menu>
  <br />
  <d-slider :min="0" :max="480" v-model="width" tipsRenderer="px"></d-slider>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
let collapsed = ref(false);
let isDisabled = ref(false);
let width = ref(256);
const changeDisabled = () => {
  isDisabled.value = !isDisabled.value;
  console.log(isDisabled.value);
};
</script>
```

:::

### d-menu 参数

| 参数                | 类型       | 默认       | 说明                       | 跳转 Demo                 | 全局配置项 |
| ------------------- | ---------- | ---------- | -------------------------- | ------------------------- | ---------- |
| width               | String     | ''         | 用于控制菜单宽度           | [响应式参数](#响应式参数) |            |
| collapsed           | Boolean    | false      | 用于决定菜单是否收起       | [收缩面板](#收缩面板)     |            |
| collapsed-indent    | Number     | 24         | 收起时图表距离菜单的距离   | /                         |            |
| indent-size         | Number | 24         | 未收起时二级菜单的缩进大小 | /                         |            |
| multiple            | Boolean    | false      | 是否可以多选               | /                         |            |
| mode                | menuMode   | 'vertical' | 菜单类型                   | [基本用法](#基本用法)     |            |
| open-keys           | Array      | []         | 默认展开的子菜单 key 值    | [默认展](#默认展开)       |            |
| default-select-keys | Array      | []         | 默认选择菜单项 key 值      | /                         |            |

### d-menu 事件

| 事件           | 类型                                                                       | 说明                                                 | 跳转 Demo |
| -------------- | -------------------------------------------------------------------------- | ---------------------------------------------------- | --------- |
| select         | ```(e: {type:'select', el: HTMLElement})=>void```                          | 选中菜单项时触发该事件,被禁用的选项不会被触发        |           |
| dselect        | ```(e: {type: 'dselect', el: HTMLElement})=>void```                        | 取消选中时触发该事件，如果菜单不是多选菜单不会被触发 |           |
| submenu-change | ```(e: {type: 'submenu-change': el: HTMLElement: state: boolean})=>void``` | 子菜单状态被更改时会触发                             |

### d-menu-item 


| 参数 | 类型 | 默认 | 说明 | 跳转 Demo | 全局配置项 |
| :----: | :----: | :----: | :----: | :---------: | ---------- |
|disable|boolean|false|是否禁用|||
|key|string|''|菜单项的key值，需唯一|||
|href|string|''|单击菜单项后跳转的页面|[基本用法](#基本用法)|

### d-sub-menu

| 参数 | 类型 | 默认 | 说明 | 跳转 Demo | 全局配置项 |
| :----: | :----: | :----: | :----: | :---------: | ---------- |
|title|String|''|子菜单标题|||
|disable|boolean|false|是否禁用子菜单|||

### d-menu-item 插槽

| 插槽名 | 说明 |
| :---: | :--: |
|icon|用于定义菜单项的icon|

### d-sub-menu 插槽

| 插槽名 | 说明 |
| :---: |:---:|
|icon|用于定义子菜单标题的icon|

### 接口及其定义

``` typescript
export type menuMode = 'vertical' | 'horizontal';
```

