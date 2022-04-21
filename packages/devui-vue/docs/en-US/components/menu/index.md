# Menu

Menu component is usually used for navigation

### When to used.

When it comes to packing, arranging, and displaying a range of options.

### Basic Used

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
      <d-menu-item> C </d-menu-item>
      <d-menu-item> Python </d-menu-item>
    </d-sub-menu>
    <d-menu-item>个人</d-menu-item>
    <d-menu-item href="https://www.baidu.com"> Link To Baidu </d-menu-item>
  </d-menu>
  <br /><br /><br /><br /><br /><br />
</template>
```

:::

### custom icons.

Sometimes we need declare icon for submenu or menu item. That we can use ```icon``` slot to declare icon of sub menu or menu item. At the same time, we can use ```css`` to make to make customized modifications for slot

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

### vertical Menu

vertical menu usually used in back-end. sub-menu can Embed in a menu

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

### default open

Setting`open-keys`can change sub menu item opan state

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

### collapse menu

To change `collapsed` can change menu collapsed status.

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

### cancel multi-selection

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

### dynamic argument

For example, parameters such as 'width', 'open-keys', 'default-select-keys' can be modified dynamically

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

### d-menu arguments

| argument            | type       | default value | introduce| Demo| global config |
| --- | --- | --- | --- | --- | --- |
| width               | String     | ''            | controller menu width                           | [dynamic argument](#dynamic argument) |               |
| collapsed           | Boolean    | false         | controller menu collapsed status                | [collapse menu](#collapse menu)       |               |
| collapsed-indent    | Number     | 24            | If menu is collapse icon sistance from the menu | /                                     |               |
| indent-size         | indentSize | 24            | Not collapse sub menu indent size               | /                                     |               |
| multiple            | Boolean    | false         | can multiple if is true                         | /                                     |               |
| mode                | menuMode   | 'vertical'    | menu types                                      | [Basic Used](#Basic Used)             |               |
| open-keys           | Array      | []            | default open sub menu's key                     | [default open](#default open)         |               |
| default-select-keys | Array      | []            | default select menu item's key                  | /                                     |               |

### d-menu event

| event| type|introduce| Demo |
| :---: | :---: | :---: | :---: | :---: | :---: |
| select         | `(e: {type:'select', el: HTMLElement})=>void`                          | select menu item will emit this event. if is disabled can't emit this event                      |
| dselect        | `(e: {type: 'dselect', el: HTMLElement})=>void`                        | The event is triggered when unchecked, if the menu is not multi-select the menu is not triggered |      |
| submenu-change | `(e: {type: 'submenu-change': el: HTMLElement: state: boolean})=>void` | Triggered when the submenu state is changed                                                      |

### d-menu-item arguments

| argument            | type       | default value | introduce| Demo| global config |
| :---: | :---: | :---: | --- | --- | :---: |
| disable | boolean | false |        Disabled this menu item.        |                       |            |
|   key   | string  |  ''   |    menu item's key. Must is unique     |                       |            |
|  href   | string  |  ''   | click menu item will link to page url. | [基本用法](#基本用法) |

### d-sub-menu event

| event| type|introduce| Demo |
| :---: | :---: | :---: | :---: | :---: | :---: |
|  title  | String  |  ''   | sub menu's title  |           |            |
| disable | boolean | false | disabled sub menu |           |            |

### d-menu-item slot

| slot name | description |
| :---: | :--: |
|icon|declare menu item icon|

### d-sub-menu slot

| slot name | description |
| :---: |:---:|
|icon|declare sub menu icon|

### Interface & declare

```typescript
export type menuMode = 'vertical' | 'horizontal';
```
