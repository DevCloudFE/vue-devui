# Menu 菜单

Menu usually used to navigation.

### When To Use

When you need to store, arrange and display a series of options

### Basic

:::demo If the screen size is too small, an ellipsis appears

```vue
<template>
  <d-menu mode="horizontal" :default-select-keys="['home']" style="margin-bottom: 120px" :width="width + 'px'">
    <d-menu-item key="home">
      <template #icon>
        <i class="icon-homepage"></i>
      </template>
      Home
    </d-menu-item>
    <d-sub-menu title="课程" key="course">
      <d-menu-item key="c"> C </d-menu-item>
      <d-sub-menu title="Python" key="python">
        <d-menu-item key="basic"> basic </d-menu-item>
        <d-menu-item key="advanced"> advanced </d-menu-item>
      </d-sub-menu>
    </d-sub-menu>
    <d-menu-item key="person">个人</d-menu-item>
    <d-menu-item key="custom" href="https://www.baidu.com" disabled> Link To Baidu </d-menu-item>
  </d-menu>
  <d-slider :min="0" :max="480" v-model="width"></d-slider>
</template>

<script setup lang="ts">
import { ref } from 'vue';
let width = ref(480);
</script>

```

:::

### Icon

Sometimes. We need define some icon for subMenu or menuItem. We can use ```icon```slot to define icon. At the same time, we can also use CSS to customize the slot

:::demo

```vue
<template>
  <d-menu mode="horizontal">
    <d-menu-item key="home">
      <template #icon>
        <i class="icon-homepage"></i>
      </template>
      Home Page
    </d-menu-item>
    <d-menu-item key="course"> course </d-menu-item>
  </d-menu>
</template>
```

:::

### Vertical

Vertical menus are generally widely used in the background, and submenus can be embedded in menus

:::demo

```vue
<template>
  <d-menu mode="vertical" :default-select-keys="['item1']" width="256px">
    <d-menu-item key="item1">
      <template #icon>
        <i class="icon-homepage"></i>
      </template>
      <span>Home</span>
    </d-menu-item>
    <d-sub-menu title="System" key="system">
      <template #icon>
        <i class="icon-system"></i>
      </template>
      <d-menu-item key="system-item">
        <span>System item</span>
      </d-menu-item>
      <d-sub-menu title="Setting" key="setting">
        <template #icon>
          <i class="icon-setting"></i>
        </template>
        <d-menu-item key="setting-item">
          <span>Setting item</span>
        </d-menu-item>
      </d-sub-menu>
    </d-sub-menu>
  </d-menu>
</template>
```

:::

### Default-Open

You can modify the expanded submenu items by setting 'open keys'

:::demo

```vue
<template>
  <d-menu width="256px" mode="vertical" :open-keys="['sub1', 'sub3']">
    <d-sub-menu key="sub1" title="sub1">
      <d-menu-item key="Sub1-item1"> Sub1 > item1 </d-menu-item>
      <d-menu-item key="Sub1-item2"> Sub1 > item2 </d-menu-item>
    </d-sub-menu>
    <d-sub-menu key="sub2" title="sub2">
      <d-menu-item key="Sub2-item1"> Sub2 > item1 </d-menu-item>
      <d-menu-item key="Sub2-item2"> Sub2 > item2 </d-menu-item>
    </d-sub-menu>
    <d-sub-menu key="sub3" title="sub3">
      <d-menu-item key="Sub3-item1"> Sub3 > item1 </d-menu-item>
      <d-menu-item key="Sub3-item2"> Sub3 > item2 </d-menu-item>
    </d-sub-menu>
  </d-menu>
</template>
```

:::

### Collapsed

:::demo

```vue
<d-button @click="changeCollapsed">
  Collapsed
</d-button>
<template>
  <d-menu :collapsed-indent="48" mode="vertical" width="256px" :default-select-keys="['item1']" :collapsed="collapsed">
    <d-menu-item key="item1" :disabled="isDisabled">
      <template #icon>
        <i class="icon-homepage"></i>
      </template>
      <span>Home</span>
    </d-menu-item>
    <d-sub-menu title="System" key="system">
      <template #icon>
        <i class="icon-system"></i>
      </template>
      <d-menu-item key="system-item">
        <span>System item</span>
      </d-menu-item>
      <d-sub-menu title="Setting" key="setting">
        <template #icon>
          <i class="icon-setting"></i>
        </template>
        <d-menu-item key="setting-item">
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

### Deselect

The function of canceling multiple selection can only be used in menus that allow multiple selection. The menu item will trigger the 'deselect' event when canceling multiple selection.

:::demo

```vue
<template>
  <d-menu @select="select" @deselect="deselect" @submenu-change="submenuChange" :default-select-keys="['item1']" multiple width="256px">
    <d-menu-item key="item1"> Item1 </d-menu-item>
    <d-menu-item key="item2"> Item2 </d-menu-item>
    <d-sub-menu title="Setting" key="icon-setting">
      <template #icon>
        <i class="icon-setting"></i>
      </template>
      <d-menu-item key="setting-item">
        <span>Setting item</span>
      </d-menu-item>
    </d-sub-menu>
  </d-menu>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const select = (e) => {
      console.log(e);
    };
    const deselect = (e) => {
      console.log(e);
    };
    const submenuChange = (e) => {
      console.log(e);
    };
    return {
      select,
      deselect,
      submenuChange,
    };
  },
});
</script>
```

:::

### Only One Expansion

:::demo Modify the ` ` ` open keys ` ` ` array through the submenu state change event to achieve the effect

``` vue
  <template>
    <d-menu @submenu-change="submenuChange" :default-select-keys="['item1']" :open-keys="openKeys" width="256px"
    >
      <d-sub-menu title="submenu-1" key="submenu-1">
        <template #icon>
          <i class="icon-infomation"></i>
        </template>
        <d-menu-item key="subemenu-item-1">
          <span>submenu-item-1</span>
        </d-menu-item>
        <d-sub-menu title="submenu-4" key="submenu-4">
          <template #icon>
            <i class="icon-infomation"></i>
          </template>
          <d-menu-item key="subemenu-item-4">
            <span>submenu-item-1</span>
          </d-menu-item>
        </d-sub-menu>
        <d-sub-menu title="submenu-5" key="submenu-5">
          <template #icon>
            <i class="icon-infomation"></i>
          </template>
          <d-menu-item key="subemenu-item-5">
            <span>submenu-item-1</span>
          </d-menu-item>
        </d-sub-menu>
      </d-sub-menu>
      <d-sub-menu title="submenu-2" key="submenu-2">
        <template #icon>
          <i class="icon-setting"></i>
        </template>
        <d-menu-item key="submenu-item-2">
          <span>submenu-item-2</span>
        </d-menu-item>
      </d-sub-menu>
      <d-sub-menu title="submenu-3" key="submenu-3">
        <template #icon>
          <i class="icon-setting"></i>
        </template>
        <d-menu-item key="submenu-item-6">
          <span>submenu-item-2</span>
        </d-menu-item>
      </d-sub-menu>
    </d-menu>
  </template>

  <script>
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    setup() {
      const openKeys = ref(['submenu-1']);
      const rootSubMenuKeys = ref(['submenu-1','submenu-2','submenu-3']);
      const submenuChange = (e) => {
        console.log(e);
        const {key} = e;
        if (rootSubMenuKeys.value.includes(key)){
          while (openKeys.value.length){
            openKeys.value.shift();
          }
          openKeys.value.push(key);
        }
      };
      return {
        openKeys,
        submenuChange,
      };
    },
  });
  </script>
```
:::

### Reactivity-Attribute

eg. `width`, `open-keys`, `default-select-keys`

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
    <d-sub-menu title="System" key="icon-system">
      <template #icon>
        <i class="icon-system"></i>
      </template>
      <d-menu-item key="system-item">
        <span>System item</span>
      </d-menu-item>
      <d-sub-menu title="Setting" key="icon-setting">
        <template #icon>
          <i class="icon-setting"></i>
        </template>
        <d-menu-item key="setting-item">
          <span>Setting item</span>
        </d-menu-item>
      </d-sub-menu>
    </d-sub-menu>
  </d-menu>
  <br />
  <d-slider :min="0" :max="480" v-model="width"></d-slider>
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

### d-menu Attribute

| Attribute                | Type                  | Default Value       | Description                                                                            | Demo                 |
| ------------------- | --------------------- | ---------- | ------------------------------------------------------------------------------- | ------------------------- |
| width               | String                | ''         | Used to control menu width                                                                | [Reactivity-Attribute](#Reactivity-Attribute) |
| collapsed           | Boolean               | false      | Used to decide whether to collapse the menu                                                            | [Collapsed](#Collapsed)     |
| collapsed-indent    | Number                | 24         | The distance between the starting icon and the left and right borders                                                    | [Collapsed](#Collapsed)     |
| multiple            | Boolean               | false      | Can I select more than one                                                                    | [Deselect](#Deselect)     |
| mode                | [menuMode](#menumode) | 'vertical' | menu type                                                                        | [Basic-Use](#Basic-Use)     |
| open-keys           | Array                 | []         | default open key of menu item| [默认展开](#默认展开)     |
| default-select-keys | Array                 | []         | default select key of menu item item                                                           | [Basic-Use](#Basic-Use)     |
| router              | Boolean               | false      | Whether to enable 'Vue router' mode. Enabling this mode will jump the route with the key as the path when the navigation is activated | -                         |

### d-menu Event

| Event           | Type                                                                                | Description                                                 | Demo             |
| -------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------- | --------------------- |
| select         | `(e: {type: 'select', key: string, el: HTMLElement, e: PointerEvent})=>void`        | if select will trigger this event. if is disabled will not trigger        | [Deselect](#Deselect) |
| deselect       | `(e: {type: 'deselect', key: string, el: HTMLElement, e: PointerEvent})=>void`      | This event will be triggered when deselecting. If the menu is not multi select, it will not be triggered | [Deselect](#Deselect) |
| submenu-change | `(e: {type: 'submenu-change', state: boolean, key: string, el: HTMLElement})=>void` | Triggered when the submenu state is changed                             | [Deselect](#Deselect) |

### d-menu-item

|   Attribute   |  Type   | Default Value  |          Description           |       Demo       |
| :------: | :-----: | :---: | :---------------------: | :-------------------: |
| disabled | boolean | false | disabled menu item         |           -           |
|   key    | string  |  ''   | key of the menu item. Need to be unique |           -           |
|   href   | string  |  ''   | Page to jump to after clicking the menu item  | [Basic-Use](#Basic-Use) |
|  route   | object  |   -   |   Vue Router path object   |           -           |

### d-sub-menu

|   Attribute   |  Type   | Default Value  |      Description      |       Demo       |
| :------: | :-----: | :---: | :------------: | :-------------------: |
|  title   | String  |  ''   | sub-menu title   | [Basic-Use](#Basic-Use) |
| disabled | boolean | false | disabled sub-menu |           -           |

### d-menu-item slot

| 插槽名 |         Description          |
| :----: | :-------------------: |
|  icon  | used to define icon |

### d-sub-menu slot

| 插槽名 |           Description            |
| :----: | :-----------------------: |
|  icon  | used to define icon |

### menu type

#### menuMode

```typescript
export type menuMode = 'vertical' | 'horizontal';
```
