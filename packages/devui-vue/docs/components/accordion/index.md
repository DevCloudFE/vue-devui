# Accordion 手风琴

为页面提供导航的组件。

#### 何时使用

需要通过分组组织菜单的时候使用。

### 基本用法

传入菜单，监听含子项的可展开菜单的开合事件(menuToggle)或可点击菜单的点击事件(itemClick)。可展开菜单默认展开使用属性 open，可点击菜单默认激活使用属性 active，禁用项使用 disabled。通过 restrictOneOpen 设置是否限制只能展开一个一级菜单。

:::demo

```vue
<template>
  <div class="basic-menu">
    <d-accordion
      :data="menu"
      :accordionType="accordionTypeEmbed ? 'embed' : 'normal'"
      :restrictOneOpen="restrictOneOpen"
      @itemClick="itemClick"
      @menuToggle="menuToggle"
      :loadingTemplate="false"
    >
      <template #loadingTemplate="{ item, deepth }">
        <li class="devui-accordion-item">
          <div class="devui-accordion-item-title devui-over-flow-ellipsis" style="{{ textIndent: deepth * 20 + 'px' }}">自定义加载...</div>
        </li>
      </template>
    </d-accordion>
  </div>

  <div class="basic-option">
    <d-switch v-model="restrictOneOpen"></d-switch>
    Only one level-1 menu can be expanded.
    <!--限制只能展开一个一级菜单-->
  </div>
  <div class="basic-option">
    <d-switch v-model="accordionTypeEmbed"></d-switch>
    Embedded menu (no shadow)
    <!--内嵌菜单形式（无阴影）-->
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'accordion',
  setup() {
    const restrictOneOpen = ref(false);
    const accordionTypeEmbed = ref(false);
    const menu = ref([
      {
        title: 'Content 1',
        children: [{ title: 'Child Content 1' }, { title: 'Child Content 2' }, { title: 'Child Content ' }],
      },
      {
        title: 'Content 2（This is a long sentence for option display.）',
        children: [
          { title: 'Child Content 1 (This is a long sentence for option display.)' },
          { title: 'Child Content 2' },
          { title: 'Child Content 3' },
        ],
      },
      {
        title: 'Content 3 (Default Open)',
        open: true,
        children: [
          { title: 'Child Content 1 (Disabled)', disabled: true },
          { title: 'Child Content 2 (Default Active)', active: true },
          { title: 'Child Content 3' },
        ],
      },
      {
        title: 'Content 4 (No Child)',
        children: [],
      },
      {
        title: 'Content 5 (Disabled)',
        disabled: true,
        children: [],
      },
      {
        title: 'Content 6 (Dynamic Content)',
        needLoadChildren: true,
        loading: false,
        children: [],
      },
    ]);

    const itemClick = (event) => {
      console.log('item click' + JSON.stringify(event));
    };
    const menuToggle = (event) => {
      console.log('menu toggle' + JSON.stringify(event));
      if (event.open && event.item.needLoadChildren) {
        event.item.loading = true;
        setTimeout(() => {
          event.item.children = [{ title: 'Child Content 1' }, { title: 'Child Content 2' }];
          event.item.needLoadChildren = false;
          event.item.loading = false;
        }, 2000);
      }
    };

    return {
      menu,
      restrictOneOpen,
      accordionTypeEmbed,
      itemClick,
      menuToggle,
    };
  },
});
</script>
<style scoped lang="scss">
.basic-menu {
  width: 200px;
}

.basic-option {
  line-height: 20px;
  vertical-align: middle;
  margin-top: 20px;
}

.basic-option > d-toggle {
  display: inline-block;
  transform: translateY(3px);
}

@media (max-width: 250px) {
  .basic-menu {
    width: 80%;
  }
}
</style>
```

:::

### 使用内置路由和链接类型

通过设置 linkType 切换不同的内置路由和链接类型：默认类型''；路由类型'routerLink'；外链类型：'hrefLink'；基于数据判断路由或链接类型：'dependOnLinkTypeKey'。

:::demo

```vue
<template>
  <div class="menu-container">
    <div class="menu-wrapper">
      <div>
        router link (recommended)
        <!--路由链接（推荐使用）-->
      </div>
      <d-accordion :data="menu1" class="menu" linkType="routerLink"></d-accordion>
    </div>
    <div class="menu-wrapper">
      <div>
        original hyperlink (cross site scene)
        <!--原生超链接（涉及跨站场景使用）-->
      </div>
      <d-accordion :data="menu2" class="menu" linkType="hrefLink"></d-accordion>
    </div>
    <div class="menu-wrapper">
      <div>
        mix link (partial cross site scene)
        <!--混合链接（部分涉及跨站场景使用）-->
      </div>
      <d-accordion :data="menu3" class="menu" linkType="dependOnLinkTypeKey"></d-accordion>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'accordion',
  setup() {
    const menu1 = ref([
      {
        title: 'Basic',
        children: [
          { title: 'Accordion', link: '/components/accordion/' },
          { title: 'Anchor', link: '/components/anchor/' },
          { title: 'Button', link: '/components/button/' },
        ],
      },
      {
        title: 'Advanced',
        children: [
          { title: 'Data Table (disabled)', disabled: true, link: '/components/datatable/' },
          {
            title: 'Drag Drop (parameter example)',
            link: '/components/dragdrop/?query=foo#bar',
          },
        ],
      },
      {
        title: 'Others',
        children: [
          { title: 'Icon Library', link: '/components/icon/' },
          { title: 'Home Page', disabled: true, link: '/' },
        ],
      },
    ]);

    const menu2 = ref([
      {
        title: 'Basic',
        children: [
          { title: 'Alert', link: '/components/alert/', target: '_self' },
          { title: 'Anchor', link: '/components/anchor/', target: '_self' },
          { title: 'Accordion', link: '/components/accordion/', target: '_self' },
        ],
      },
      {
        title: 'Advanced',
        children: [
          {
            title: 'Data Table (disabled)',
            disabled: true,
            link: '/components/datatable/',
            target: '_self',
          },
          { title: 'Drag Drop', link: '/components/dragdrop/', target: '_self' },
        ],
      },
      {
        title: 'Others',
        children: [
          { title: 'Icon Library', link: '/components/icon/', target: '_self' },
          { title: 'Home Page(open blank page)', link: '/', target: '_blank' },
        ],
      },
    ]);

    const menu3 = ref([
      {
        title: 'Basic',
        children: [
          { title: 'Alert', link: '/components/alert/', linkType: 'routerLink' },
          { title: 'Anchor', link: '/components/anchor/', linkType: 'routerLink' },
          { title: 'Button', link: '/components/button/', linkType: 'routerLink' },
        ],
      },
      {
        title: 'Advanced',
        children: [
          {
            title: 'Data Table (disabled)',
            disabled: true,
            link: '/components/datatable/',
            linkType: 'routerLink',
          },
          { title: 'Drag Drop', link: '/components/dragdrop/', linkType: 'routerLink' },
        ],
      },
      {
        title: 'Others',
        children: [
          { title: 'Icon Library', link: '/components/icon/', linkType: 'routerLink' },
          { title: 'Home Page(External link open in this window)', link: '/', linkType: 'hrefLink' },
        ],
      },
    ]);

    return {
      menu1,
      menu2,
      menu3,
    };
  },
});
</script>
<style scoped>
.menu {
  width: 200px;
}
.menu-container {
  overflow: auto;
  padding-left: 2px;
}
.menu-wrapper {
  float: left;
}

.menu-wrapper + .menu-wrapper {
  margin-left: 20px;
}

:host::after {
  content: '';
  display: block;
  clear: both;
}

@media (max-width: 800px), (min-width: 1024px) and (max-width: 1100px), (min-width: 1280px) and (max-width: 1480px) {
  .menu-wrapper {
    float: none;
  }

  .menu-wrapper + .menu-wrapper {
    margin-top: 20px;
    margin-left: 0;
  }
}

@media (max-width: 250px) {
  .menu {
    width: 80%;
  }
}

.menu-wrapper > div {
  margin-bottom: 8px;
}
</style>
```

:::

### 使用模板

可展开菜单和可点击菜单分别使用模板。可展开菜单指定 menuItemTemplate，可点击菜单指定 itemTemplate。没有数据模板指定 noContentTemplate，并可以通过 showNoContent 控制无数据的时候不展开。 加载中模板指定 loadingTemplate，通过 item 的 loadingKey 对应的属性值控制是否显示加载中。

:::demo

```vue
<template>
  <div class="use-template-menu">
    <d-accordion
      :data="menu"
      :accordionType="accordionTypeEmbed ? 'embed' : 'normal'"
      :restrictOneOpen="restrictOneOpen"
      @itemClick="itemClick"
      @menuToggle="menuToggle"
    >
      <template #menuItemTemplate="{ item, deepth, parent }">
        {{ item.title }}
        <span class="use-template-badge" v-if="item.children?.length">
          {{ item.children.length }}
        </span>
        <span class="operation-clear" v-if="item.needLoadChildren === false" @click="clearChildrenData($event, item)">
          reset
          <!--重置-->
        </span>
      </template>
      <template #itemTemplate="{ item, deepth, parent }">
        {{ item.title }}
        <span class="use-template-info">(Click Count: {{ item.clicktimes || '0' }})</span>
      </template>
      <template #noContentTemplate="{ deepth }">
        <li class="devui-accordion-item disabled">
          <div class="devui-accordion-item-title devui-over-flow-ellipsis disabled" style="{{ textIndent: deepth * 20 + 'px' }}">
            Not available yet. Please wait.
            <!--尚未开放，敬请期待...-->
          </div>
        </li>
      </template>
      <template #loadingTemplate="{ item }">
        <li class="devui-accordion-item">
          <div class="use-template-loading">
            <span class="use-template-circle-spinner"></span>
            loading...
            <!--正在用力地加载中...-->
          </div>
        </li>
      </template>
    </d-accordion>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'accordion',
  setup() {
    const restrictOneOpen = ref(false);
    const accordionTypeEmbed = ref(false);
    const menu = ref([
      {
        title: 'Content 1',
        open: true,
        children: [{ title: 'Child Content 1' }, { title: 'Child Content 2' }],
      },
      {
        title: 'Content 2',
        children: [{ title: 'Child Content 1' }, { title: 'Child Content 2' }, { title: 'Child Content 3' }, { title: 'Child Content 4' }],
      },
      {
        title: 'Content 3',
        children: [{ title: 'Child Content 1 (disabled)', disabled: true }, { title: 'Child Content 2' }, { title: 'Child Content 3' }],
      },
      {
        title: 'Content 4 (Custom No Data Template)',
        children: [], // 可展开菜单节点必须有children非undefined
      },
      {
        title: 'Content 5 (Custom loading Template)',
        needLoadChildren: true,
        loading: false,
        children: [],
      },
    ]);
    const childrenData = ref([
      { title: 'Child Content 1' },
      { title: 'Child Content 2' },
      { title: 'Child Content 3' },
      { title: 'Child Content 4' },
      { title: 'Child Content 5' },
      { title: 'Child Content 6' },
      { title: 'Child Content 7' },
    ]);

    const itemClick = (event) => {
      event.item.clicktimes = (event.item.clicktimes || 0) + 1;
    };

    const menuToggle = (event) => {
      if (event.open && event.item.needLoadChildren) {
        event.item.loading = true;
        setTimeout(() => {
          event.item.children = childrenData.value;
          event.item.needLoadChildren = false;
          event.item.loading = false;
        }, 1000);
      }
    };

    const clearChildrenData = (event, item) => {
      event.stopPropagation();
      item.children = [];
      item.needLoadChildren = true;
      item.open = false;
    };

    return {
      menu,
      restrictOneOpen,
      accordionTypeEmbed,
      itemClick,
      menuToggle,
      clearChildrenData,
    };
  },
});
</script>
<style scoped>
.use-template-menu {
  width: 400px;
}

.use-template-badge {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
  text-align: center;
  background: #5e7ce0;
  font-weight: normal;
}

.use-template-loading {
  position: relative;
  line-height: 40px;
  padding-left: 64px;
}

.use-template-circle-spinner {
  top: 10px;
  left: 36px;
  position: absolute;
  display: block;
  width: 20px;
  height: 20px;
  transform-origin: center;
  animation: circle infinite 0.75s linear;
  border: 2px solid #5e7ce0;
  border-top-color: transparent;
  border-radius: 50%;
}

@keyframes circle {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 500px) {
  .use-template-menu {
    width: 80%;
  }
}
</style>
```

:::

内部列表通过制定 innerListTemplate 使用模板。

:::demo

```vue
<template>
  <div class="inner-template-menu">
    <d-accordion :data="menu" :accordionType="accordionTypeEmbed ? 'embed' : 'normal'" :restrictOneOpen="restrictOneOpen">
      <template #innerListTemplate="{ item, deepth }">
        <div class="devui-accordion-submenu devui-accordion-show-animate inner-template-my-menu">
          {{ item.content }}
        </div>
      </template>
    </d-accordion>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'accordion',
  setup() {
    const restrictOneOpen = ref(false);
    const accordionTypeEmbed = ref(false);
    const menu = ref([
      {
        title: 'Content 1',
        children: [],
        content: 'Child Content of Content 1',
      },
      {
        title: 'Content 2',
        children: [],
        content: 'Child Content of Content 2',
      },
    ]);

    return {
      menu,
      restrictOneOpen,
      accordionTypeEmbed,
    };
  },
});
</script>
<style scoped>
.inner-template-menu {
  width: 400px;
}
.inner-template-my-menu {
  min-height: 60px;
  line-height: 40px;
  padding: 12px;
}

@media (max-width: 500px) {
  .inner-template-menu {
    width: 80%;
  }
}
</style>
```

:::

### 复合层级和自动展开

支持多层级和不限制嵌套层级。可以独立使用 autoOpenActiveMenu 使得激活的菜单的父层级自动展开。
:::demo

```vue
<template>
  <div class="multi-child-menu">
    <d-accordion :data="menu" :autoOpenActiveMenu="autoOpenActiveMenu"></d-accordion>
  </div>

  <div class="multi-child-option">
    <d-switch v-model="autoOpenActiveMenu"></d-switch>
    auto expend active menu
    <!--自动展开激活的菜单-->
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'accordion',
  setup() {
    const autoOpenActiveMenu = ref(false);
    const menu = ref([
      {
        title: 'Content 1 (as a leaf menu)',
      },
      {
        title: 'Content 2 (as a parent menu, has children)',
        children: [{ title: 'Child Content 1' }, { title: 'Child Content 2' }, { title: 'Child Content 3' }],
      },
      {
        title: 'Content 3 (as a parent menu, has children)',

        children: [
          {
            title: 'Child Content 1 (has children)',
            children: [{ title: 'Child Content 1' }, { title: 'Child Content 2', active: true }, { title: 'Child Content 3' }],
          },
          {
            title: 'Child Content 2 (has children',
            children: [
              { title: 'Child Content 1' },
              {
                title: 'Child Content 2 (has children',
                children: [{ title: 'Child Content 1' }, { title: 'Child Content 2' }, { title: 'Child Content 3' }],
              },
              { title: 'Child Content 3' },
            ],
          },
          { title: 'Child Content 2' },
          { title: 'Child Content 3' },
        ],
      },
      {
        title: 'Content 4 (as a parent menu, has no child)',
        children: [],
      },
    ]);

    return {
      menu,
      autoOpenActiveMenu,
    };
  },
});
</script>
<style scoped>
.multi-child-menu {
  width: 400px;
}

.multi-child-option {
  line-height: 20px;
  vertical-align: middle;
  margin-top: 20px;
}

.multi-child-option > d-toggle {
  display: inline-block;
  transform: translateY(3px);
}

@media (max-width: 500px) {
  .multi-child-menu {
    width: 80%;
  }
}
</style>
```

:::

### 改变键值

通过 titleKey,childrenKey,disabledKey,activeKey 等等改变数组键值，适配不同的接口类型定义。
:::demo

```vue
<template>
  <div class="change-key-menu">
    <d-accordion
      :data="menu"
      :titleKey="key?.titleKey"
      :activeKey="key?.activeKey"
      :disabledKey="key?.disabledKey"
      :openKey="key?.openKey"
      :childrenKey="key?.childrenKey"
    ></d-accordion>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  name: 'accordion',
  setup() {
    const key = reactive({
      titleKey: 'value',
      activeKey: '$selected',
      disabledKey: 'forbidden',
      openKey: '$show',
      childrenKey: 'subs',
    });
    const menu = ref([
      {
        value: 'Content 1',
      },
      {
        value: 'Content 2 (expended)',
        $show: true,
        subs: [
          { value: 'Child Content 1 (disabled)', forbidden: true },
          { value: 'Child Content 2 (active)', $selected: true },
          { value: 'Child Content 3' },
        ],
      },
    ]);

    return {
      menu,
      key,
    };
  },
});
</script>
<style scoped>
.change-key-menu {
  width: 400px;
}

@media (max-width: 500px) {
  .change-key-menu {
    width: 80%;
  }
}
</style>
```

:::

### Accordion 参数

| 参数名             | 类型                                                  | 默认值     | 说明                                                                                                                                                                                                                                   | 跳转 Demo                                 |
| :----------------- | :---------------------------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------- |
| data               | `Array<any> \| AccordionMenuType`                     | --         | 必选，数据源，可以自定义数组或者使用预设的`AccordionMenuType`                                                                                                                                                                          | [基本用法](#基本用法)                     |
| titleKey           | `string`                                              | 'title'    | 可选，标题的属性名，item[titleKey]类型为`string`，为标题显示内容                                                                                                                                                                       | [改变键值](#改变键值)                     |
| loadingKey         | `string`                                              | 'loading'  | 可选，子菜单是否加载中的判断属性名，item[loadingKey]类型为`boolean`                                                                                                                                                                    | [改变键值](#改变键值)                     |
| childrenKey        | `string`                                              | 'children' | 可选，子菜单的属性名，item[childrenKey]类型为`Array<any>`                                                                                                                                                                              | [改变键值](#改变键值)                     |
| disabledKey        | `string`                                              | 'disabled' | 可选，是否禁用的属性名，item[disabledKey]类型为`boolean`                                                                                                                                                                               | [改变键值](#改变键值)                     |
| activeKey          | `string`                                              | 'active'   | 可选，子菜单是否激活的属性名，item[activeKey]类型为`boolean`                                                                                                                                                                           | [改变键值](#改变键值)                     |
| openKey            | `string`                                              | 'open'     | 可选，菜单是否展开的属性名，item[openKey]类型为`boolean`                                                                                                                                                                               | [改变键值](#改变键值)                     |
| restrictOneOpen    | `boolean`                                             | false      | 可选，限制一级菜单同时只能打开一个， 默认不限制                                                                                                                                                                                        | [基本用法](#基本用法)                     |
| menuItemTemplate   | `boolean`                                             | true       | 可选， 可展开菜单内容条模板，可用变量值见下                                                                                                                                                                                            | [使用模板](#使用模板)                     |
| itemTemplate       | `boolean`                                             | true       | 可选，可点击菜单内容条模板，可用变量值见下                                                                                                                                                                                             | [使用模板](#使用模板)                     |
| noContentTemplate  | `boolean`                                             | true       | 可选，没有内容的时候使用自定义模板，可用变量值见下                                                                                                                                                                                     | [使用模板](#使用模板)                     |
| loadingTemplate    | `boolean`                                             | true       | 可选，加载中使用自定义模板，可用变量值见下                                                                                                                                                                                             | [使用模板](#使用模板)                     |
| innerListTemplate  | `boolean`                                             | true       | 可选，子列表内容完全自定义，用做折叠面板，可用变量值见下                                                                                                                                                                               | [使用模板](#使用模板)                     |
| linkType           | `'routerLink'\|'hrefLink'\|'dependOnLinkTypeKey'\|''` | ''         | 可选，`'routerLink'`为路由场景；`'hrefLink'`为外部链接场景；`'dependOnLinkTypeKey'`为动态路由或外部链接场景；`''`为默认非链接类型（无法右键打开新标签页）                                                                              | [内置路由和链接类型](#内置路由和链接类型) |
| linkTypeKey        | `string`                                              | 'linkType' | 可选，链接内容的类型的 key 值，用于 linkType 为`'dependOnLinkTypeKey'`时指定对象链接类型属性名，item[linkTypeKey]类型为`'routerLink'\|'hrefLink'\| string`，其中`'routerLink'`为路由链接，`'hrefLink'`为外部链接，其他为默认非链接类型 |
| linkKey            | `string`                                              | 'link'     | 可选，链接内容的 key，用于 linkType 为连接类型记非`''`时，链接的取值的属性值，item[linkKey]为路由地址或者超链接地址                                                                                                                    |
| linkTargetKey      | `string`                                              | 'target'   | 可选，链接目标窗口的 key，用于链接类型，item[linkTargetKey]为单个链接的目标窗口                                                                                                                                                        |
| linkDefaultTarget  | `string`                                              | '\_self'   | 可选，不设置 target 的时候 target 默认值为`'_self'`，用于链接类型, 取值等同于 a 链接的 target 属性                                                                                                                                     | [内置路由和链接类型](#内置路由和链接类型) |
| autoOpenActiveMenu | `boolean`                                             | false      | 可选，是否自动展开带有活跃子项的菜单                                                                                                                                                                                                   | [复合层级和自动展开](#复合层级和自动展开) |
| accordionType      | `'normal'\|'embed'`                                   | 'normal'   | 可选，菜单形式是普通（带阴影）还是内嵌（不带阴影）                                                                                                                                                                                     | [基本用法](#基本用法)                     |
| showAnimation      | `boolean`                                             | true       | 可选，是否展示动画                                                                                                                                                                                                                     | [内置路由和链接类型](#内置路由和链接类型) |

### Accordion 事件

| 事件名           | 类型                                                                      | 说明                                                                                                                                                       | 跳转 Demo             |
| :--------------- | :------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------- |
| menuToggle       | `EventEmitter<`[`AccordionMenuToggleEvent`](#accordionmenutoggleevent)`>` | 可选，可展开菜单展开事件，返回对象里属性 item 为点击的对象数据，open 为 true 则将要展开 false 则将要关闭， parent 为父对象数据，event 为点击事件的原生事件 | [基本用法](#基本用法) |
| itemClick        | `EventEmitter<`[`AccordionItemClickEvent`](#accordionitemclickevent)`>`   | 可选，可点击菜单点击事件，返回对象里属性 item 为点击的对象数据，preActive 对象为上一次展开的对象， parent 为父对象数据，event 为点击事件的原生事件         | [基本用法](#基本用法) |
| activeItemChange | `EventEmitter<any>`                                                       | 可选，子项切换的时候会发出新激活的子项的数据                                                                                                               | [基本用法](#基本用法) |

### Accordion 类型定义

```typescript
/* 基础数据类型 */
type AccordionMenuItemLinkType = 'routerLink' | 'hrefLink' | string;
export interface AccordionBase {
  title: string;
  disabled?: boolean;
  [prop: string]: any;
}
interface IAccordionActiveable {
  active?: boolean;
}
interface IAccordionFoldable<T> {
  open?: boolean;
  loading?: boolean;
  children?: Array<T>;
}

interface IAccordionLinkable {
  link?: string;
  target?: boolean;
  linkType?: AccordionMenuItemLinkType;
}
export interface AccordionBaseItem extends AccordionBase, IAccordionActiveable {}
export interface AccordionBaseMenu<T> extends AccordionBase, IAccordionFoldable<T> {}

export interface AccordionLinkableItem extends AccordionBase, IAccordionActiveable, IAccordionLinkable {}
export interface AccordionMenuItem extends AccordionBase, IAccordionActiveable, IAccordionFoldable<AccordionMenuItem>, IAccordionLinkable {}

export type AccordionMenuType = Array<AccordionMenuItem>;

/* 基础事件类型 */
export interface AccordionMenuToggleEvent {
  item: any;
  open: boolean;
  parent: any;
  event: MouseEvent;
}
export interface AccordionItemClickEvent {
  item: any;
  prevActiveItem?: any;
  parent: any;
  event: MouseEvent;
}

/* 废弃接口 */
/** @deprecated  merge into `AccordionMenuItem`*/
export interface AccordionSubMenuItem {
  title: string;
  active?: boolean;
  disabled?: boolean;
  [prop: string]: any;
}
/** @deprecated  use `AccordionLinkableItem` instead*/
export interface AccordionSubMenuItemHrefLink {
  title: string;
  link: string;
  target?: string;
  active?: boolean;
  disabled?: boolean;
  [prop: string]: any;
}
/** @deprecated  use `AccordionLinkableItem` instead*/
export interface AccordionSubMenuItemRouterLink {
  title: string;
  link: string;
  target?: string;
  active?: boolean;
  disabled?: boolean;
  [prop: string]: any;
}
/** @deprecated  use `AccordionLinkableItem` instead*/
export interface AccordionSubMenuItemDynamicLink {
  title: string;
  link: string;
  linkType: 'routerLink' | 'hrefLink' | string;
  target?: string;
  active?: boolean;
  disabled?: boolean;
  [prop: string]: any;
}
```

### AccordionProps

```typescript
import { ExtractPropTypes } from 'vue';
import { AccordionMenuType } from './accordion.type';

export const accordionProps = {
  data: {
    type: Array as () => Array<any> | AccordionMenuType,
    default: null,
  },
  /* Key值定义, 用于自定义数据结构 */
  titleKey: { type: String, default: 'title' }, // 标题的key，item[titleKey]类型为string，为标题显示内容
  loadingKey: { type: String, default: 'loading' }, // 子菜单动态加载item[loadingKey]类型为boolean
  childrenKey: { type: String, default: 'children' }, // 子菜单Key
  disabledKey: { type: String, default: 'disabled' }, // 是否禁用Key
  activeKey: { type: String, default: 'active' }, // 菜单是否激活/选中
  openKey: { type: String, default: 'open' }, // 菜单是否打开

  /* 菜单模板 */
  menuItemTemplate: { type: Boolean, default: true }, // 可展开菜单内容条模板
  itemTemplate: { type: Boolean, default: true }, // 可点击菜单内容条模板

  menuToggle: {
    type: Function as unknown as () => (event: MouseEvent) => void,
    default: null,
  }, // 可展开菜单展开事件
  itemClick: {
    type: Function as unknown as () => (event: MouseEvent) => void,
    default: null,
  }, // 可点击菜单点击事件
  activeItemChange: {
    type: Function as unknown as () => (event: MouseEvent) => void,
    default: null,
  },

  /** 高级选项和模板 */
  restrictOneOpen: { type: Boolean, default: false }, // 限制一级菜单同时只能打开一个
  autoOpenActiveMenu: { type: Boolean, default: false }, // 自动展开活跃菜单
  showNoContent: { type: Boolean, default: true }, // 没有内容的时候是否显示没有数据
  noContentTemplate: { type: Boolean, default: true }, // 没有内容的时候使用自定义模板
  loadingTemplate: { type: Boolean, default: true }, // 加载中使用自定义模板
  innerListTemplate: { type: Boolean, default: true }, // 可折叠菜单内容完全自定义，用做折叠面板

  /* 内置路由/链接/动态判断路由或链接类型 */
  linkType: {
    type: String as () => 'routerLink' | 'hrefLink' | 'dependOnLinkTypeKey' | '' | string,
    default: '',
  },
  linkTypeKey: { type: String, default: 'linkType' }, // linkType为'dependOnLinkTypeKey'时指定对象linkType定义区
  linkKey: { type: String, default: 'link' }, // 链接内容的key
  linkTargetKey: { type: String, default: 'target' }, // 链接目标窗口的key
  linkDefaultTarget: { type: String, default: '_self' }, // 不设置target的时候target默认值

  accordionType: {
    type: String as () => 'normal' | 'embed',
    default: 'normal',
  },
} as const;

export type AccordionProps = ExtractPropTypes<typeof accordionProps>;
```

### 模板可以用变量值(使用方法如下)

```html
<template #templateName="{item}">{{item}}</template>
```

### menuItemTemplate 可用变量值

|        变量        |    类型    |                   变量含义说明                    |
| :----------------: | :--------: | :-----------------------------------------------: |
|        item        |   `any`    |                可展开类型菜单数据                 |
|       deepth       |  `number`  |                 表示嵌套结构层级                  |
|       parent       |   `any`    |                 所属父级菜单数据                  |
|   ~~~titleKey~~~   |  `string`  |        `已经废弃`~~~组件的 titleKey 值~~~         |
| ~~~disabledKey~~~  |  `string`  |       `已经废弃`~~~组件的 disabledKey 值~~~       |
|   ~~~openKey~~~    |  `string`  |         `已经废弃`~~~组件的 openKey 值~~~         |
| ~~~menuToggleFn~~~ | `Function` | `已经废弃`~~~参数应为 item，表示一级菜单被点击~~~ |

### itemTemplate 可用变量值

|       变量        |    类型    |                   变量含义说明                    |
| :---------------: | :--------: | :-----------------------------------------------: |
|       item        |   `any`    |                可点击类型菜单数据                 |
|      deepth       |  `number`  |                值表示嵌套结构层级                 |
|      parent       |   `any`    |                 所属父级菜单数据                  |
|  ~~~titleKey~~~   |  `string`  |        `已经废弃`~~~ 组件的 titleKey 值~~~        |
| ~~~disabledKey~~~ |  `string`  |      `已经废弃`~~~ 组件的 disabledKey 值~~~       |
|  ~~~activeKey~~~  |  `string`  |       `已经废弃`~~~ 组件的 activeKey 值~~~        |
| ~~~itemClickFn~~~ | `Function` | `已经废弃`~~~参数应为 item，表示二级菜单被点击~~~ |

### noContentTemplate 可用变量值

|  变量  |   类型   |    变量含义说明    |
| :----: | :------: | :----------------: |
|  item  |  `any`   |  父级菜单单个数据  |
| deepth | `number` | 值表示嵌套结构层级 |

### loadingTemplate 可用变量值

|       变量       |   类型   |        变量含义说明        |
| :--------------: | :------: | :------------------------: |
|       item       |  `any`   |      父级菜单单个数据      |
|      deepth      | `number` |     值表示嵌套结构层级     |
| ~~~loadingKey~~~ | `string` | ~~~组件的 loadingKey 值~~~ |

### innerListTemplate 可用变量值

|       变量        |    类型    |                            变量含义说明                            |
| :---------------: | :--------: | :----------------------------------------------------------------: |
|       item        |   `any`    |                          父级菜单单个数据                          |
|      deepth       |  `number`  |                         值表示嵌套结构层级                         |
|  ~~~titleKey~~~   |  `string`  |                 `已经废弃`~~~组件的 titleKey 值~~~                 |
| ~~~loadingKey~~~  |  `string`  |                `已经废弃`~~~组件的 loadingKey 值~~~                |
| ~~~childrenKey~~~ |  `string`  |               `已经废弃`~~~组件的 childrenKey 值~~~                |
| ~~~disabledKey~~~ |  `string`  |               `已经废弃`~~~组件的 disabledKey 值~~~                |
|   ~~~openKey~~~   |  `string`  |                 `已经废弃`~~~组件的 openKey 值~~~                  |
|  ~~~activeKey~~~  |  `string`  |          `已经废弃`~~~组件的 activeKey 值，用二级菜单~~~           |
|   menuToggleFn    | `Function` |      参数应为 item，表示菜单被展开，可选参数 event，原始事件       |
|    itemClickFn    | `Function` | 参数应为可点击菜单的 item，表示菜单被点击,可选参数 event，原始事件 |
