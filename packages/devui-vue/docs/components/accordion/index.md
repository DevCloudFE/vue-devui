# Accordion 手风琴
为页面提供导航的组件。
### 何时使用
需要通过分组组织菜单的时候使用。

### 基本用法
传入菜单，监听含子项的可展开菜单的开合事件(menuToggle)或可点击菜单的点击事件(itemClick)。可展开菜单默认展开使用属性open，可点击菜单默认激活使用属性active，禁用项使用disabled。通过restrictOneOpen设置是否限制只能展开一个一级菜单。

:::demo

```vue
<template>
    <div class="menu">
        <d-accordion
            :data="menu"
            :accordionType="accordionTypeEmbed ? 'embed' : 'normal'"
            :restrictOneOpen="restrictOneOpen"
            @itemClick="itemClick"
            @menuToggle="menuToggle"
            childrenKey="sub"
        >
            <template #loadingTemplate={item,deepth}>
                <li class='devui-accordion-item'>
                    <div
                        class="devui-accordion-item-title devui-over-flow-ellipsis"
                        style="{{ textIndent: deepth * 20 + 'px' }}"
                    >
                        我是自定义加载...
                    </div>
                </li>
            </template>
            <template #noContentTemplate={item,deepth}>
                <li class='devui-accordion-item'>
                    <div
                        class="devui-accordion-item-title devui-over-flow-ellipsis disabled"
                        style="{{ textIndent: deepth * 20 + 'px' }}"
                    >
                        我是无数据模板
                    </div>
                </li>
            </template>
        </d-accordion>
    </div>
    
    <div class="option">
        <d-switch v-model:checked="restrictOneOpen"></d-switch> Only one level-1 menu can be expanded.<!--限制只能展开一个一级菜单-->
    </div>
    <div class="option"><d-switch v-model:checked="accordionTypeEmbed"></d-switch> Embedded menu (no shadow)<!--内嵌菜单形式（无阴影）--></div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: "accordion",
    setup() {
        const restrictOneOpen = ref(false)
        const accordionTypeEmbed = ref(false)
        const menu = ref([{
            title: 'Content 1',
            children: [
            {title: 'Child Content 1'},
            {title: 'Child Content 2'},
            {title: 'Child Content '},
            ]
        }, {
            title: 'Content 2（This is a long sentence for option display.）',
            children: [
            {title: 'Child Content 1 (This is a long sentence for option display.)'},
            {title: 'Child Content 2'},
            {title: 'Child Content 3'},
            ]
        }, {
            title: 'Content 3 (Default Open)',
            open: true,
            children: [
            {title: 'Child Content 1 (Disabled)', disabled: true},
            {title: 'Child Content 2 (Default Active)', active: true},
            {title: 'Child Content 3'},
            ]
        }, {
            title: 'Content 4 (No Child)',
            children: []
        }, {
            title: 'Content 5 (Disabled)',
            disabled: true,
            children: [
            ]
        }, {
            title: 'Content 6 (Dynamic Content)',
            needLoadChildren: true,
            loading: false,
            children: [
            ]
        }])

        const itemClick = (event) => {
            console.log('item click' + JSON.stringify(event));
        }
        const menuToggle = (event) => {
            console.log('menu toggle' + JSON.stringify(event));
            if (event.open && event.item.needLoadChildren) {
                event.item.loading = true;
                setTimeout(() => {
                    event.item.children = [
                        {title: 'Child Content 1'},
                        {title: 'Child Content 2'}
                    ];
                    event.item.needLoadChildren = false;
                    event.item.loading = false;
                }, 2000);
            }
        }

        return {
            menu,
            restrictOneOpen,
            accordionTypeEmbed,
            itemClick,
            menuToggle
        }
    }
})
</script>
<style scoped>
.menu {
  width: 200px;
}

.option {
  line-height: 20px;
  vertical-align: middle;
  margin-top: 20px;
}

.option > d-toggle {
  display: inline-block;
  transform: translateY(3px);
}

@media (max-width: 250px) {
  .menu {
    width: 80%;
  }
}
ul {
    list-style: none
}
</style>
```


:::


### 使用模板
可展开菜单和可点击菜单分别使用模板。可展开菜单指定menuItemTemplate，可点击菜单指定itemTemplate。没有数据模板指定noContentTemplate，并可以通过showNoContent控制无数据的时候不展开。 加载中模板指定loadingTemplate，通过item的loadingKey对应的属性值控制是否显示加载中。

:::demo


```vue
<template>
    <div class="menu">
        <d-accordion
            :data="menu"
            :accordionType="accordionTypeEmbed ? 'embed' : 'normal'"
            :restrictOneOpen="restrictOneOpen"
            @itemClick="itemClick"
            @menuToggle="menuToggle"
        >
            <template #menuItemTemplate={item,deepth,parent}>
                {{ item.title }}
                <span class="badge" v-if="item.children?.length">{{ item.children.length }}</span>
                <span class="operation-clear" v-if="item.needLoadChildren === false" @click="clearChildrenData($event, item)">
                    reset
                    <!--重置-->
                </span>
            </template>
            <template #itemTemplate={item,deepth,parent}>
                {{ item.title }}
                <span class="info">(Click Count: {{ item.clicktimes || '0' }})</span>
            </template>
            <template #noContentTemplate={deepth}>
                <li class="devui-accordion-item disabled">
                    <div class="devui-accordion-item-title devui-over-flow-ellipsis disabled" style="{{ textIndent: deepth * 20 + 'px' }}">
                        Not available yet. Please wait.
                    <!--尚未开放，敬请期待...-->
                    </div>
                </li>
            </template>
            <template #loadingTemplate={item}>
                <li class="devui-accordion-item">
                    <div class="loading"><span class="circle-spinner"></span> loading...<!--正在用力地加载中...--></div>
                </li>
            </template>
        </d-accordion>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: "accordion",
    setup() {
        const restrictOneOpen = ref(false)
        const accordionTypeEmbed = ref(false)
        const menu = ref([{
            title: 'Content 1',
            open: true,
            children: [
            {title: 'Child Content 1'},
            {title: 'Child Content 2'},
            ]
        }, {
            title: 'Content 2',
            children: [
            {title: 'Child Content 1'},
            {title: 'Child Content 2'},
            {title: 'Child Content 3'},
            {title: 'Child Content 4'},
            ]
        }, {
            title: 'Content 3',
            children: [
            {title: 'Child Content 1 (disabled)', disabled: true},
            {title: 'Child Content 2'},
            {title: 'Child Content 3'},
            ]
        }, {
            title: 'Content 4 (Custom No Data Template)',
            children: [] // 可展开菜单节点必须有children非undefined
        }, {
            title: 'Content 5 (Custom loading Template)',
            needLoadChildren: true,
            loading: false,
            children: []
        }]);
        const childrenData = ref([
            {title: 'Child Content 1'},
            {title: 'Child Content 2'},
            {title: 'Child Content 3'},
            {title: 'Child Content 4'},
            {title: 'Child Content 5'},
            {title: 'Child Content 6'},
            {title: 'Child Content 7'},
        ])

        const itemClick = (event) => {
            event.item.clicktimes = (event.item.clicktimes || 0) + 1;
        }

        const menuToggle = (event) => {
            if (event.open && event.item.needLoadChildren) {
            event.item.loading = true;
            setTimeout(() => {
                event.item.children = childrenData.value;
                event.item.needLoadChildren = false;
                event.item.loading = false;
            }, 1000);
            }
        }

        const clearChildrenData = (event, item) => {
            event.stopPropagation();
            item.children = [];
            item.needLoadChildren = true;
            item.open = false;
        }

        return {
            menu,
            restrictOneOpen,
            accordionTypeEmbed,
            itemClick,
            menuToggle,
            clearChildrenData
        }
    }
})
</script>
<style scoped>
.menu {
  width: 400px;
}

.badge {
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

.loading {
  position: relative;
  line-height: 40px;
  padding-left: 64px;
}

.circle-spinner {
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
  .menu {
    width: 80%;
  }
}
</style>
```

:::


内部列表通过制定innerListTemplate使用模板。

:::demo

```vue
<template>
    <div class="menu">
        <d-accordion
            :data="menu"
            :accordionType="accordionTypeEmbed ? 'embed' : 'normal'"
            :restrictOneOpen="restrictOneOpen"
            @itemClick="itemClick"
            @menuToggle="menuToggle"
        >
            <template #innerListTemplate={item,deepth}>
                <div 
                    class="devui-accordion-submenu devui-accordion-show-animate my-menu"
                >
                    {{item.content}}
                </div>
            </template>
        </d-accordion>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: "accordion",
    setup() {
        const restrictOneOpen = ref(false)
        const accordionTypeEmbed = ref(false)
        const menu = ref([{
            title: 'Content 1',
            children: [],
            content: 'Child Content of Content 1'
        }, {
            title: 'Content 2',
            children: [],
            content: 'Child Content of Content 2'
        }]);

        const itemClick = (event) => {
            console.log('item click' + JSON.stringify(event));
        }
        const menuToggle = (event) => {
            console.log('menu toggle' + JSON.stringify(event));
            if (event.open && event.item.needLoadChildren) {
                event.item.loading = true;
                setTimeout(() => {
                    event.item.children = [
                        {title: 'Child Content 1'},
                        {title: 'Child Content 2'}
                    ];
                    event.item.needLoadChildren = false;
                    event.item.loading = false;
                }, 2000);
            }
        }

        return {
            menu,
            restrictOneOpen,
            accordionTypeEmbed,
            itemClick,
            menuToggle
        }
    }
})
</script>
<style scoped>
.menu {
  width: 400px;
}
.my-menu {
  min-height: 60px;
  line-height: 40px;
  padding: 12px;
}

@media (max-width: 500px) {
  .menu {
    width: 80%;
  }
}
</style>
```

:::

### 复合层级和自动展开
支持多层级和不限制嵌套层级。可以独立使用autoOpenActiveMenu使得激活的菜单的父层级自动展开。
:::demo

```vue
<template>
    <div class="menu">
        <d-accordion
            :data="menu"
            :autoOpenActiveMenu="autoOpenActiveMenu"
        >
        </d-accordion>
    </div>

    <div class="option">
        <d-switch v-model:checked="autoOpenActiveMenu"></d-switch> auto expend active menu<!--自动展开激活的菜单-->
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: "accordion",
    setup() {
        const autoOpenActiveMenu = ref(false)
        const menu = ref([{
            title: 'Content 1 (as a leaf menu)',
        }, {
            title: 'Content 2 (as a parent menu, has children)',
            children: [
            {title: 'Child Content 1'},
            {title: 'Child Content 2'},
            {title: 'Child Content 3'},
            ]
        }, {
            title: 'Content 3 (as a parent menu, has children)',

            children: [{
                title: 'Child Content 1 (has children)',
                children: [
                {title: 'Child Content 1'},
                {title: 'Child Content 2', active: true},
                {title: 'Child Content 3'},
                ]
            }, {
                title: 'Child Content 2 (has children',
                children: [
                {title: 'Child Content 1'},
                {
                    title: 'Child Content 2 (has children',
                    children: [
                    {title: 'Child Content 1'},
                    {title: 'Child Content 2'},
                    {title: 'Child Content 3'},
                    ]
                },
                {title: 'Child Content 3'},
                ]
            },
            {title: 'Child Content 2'},
            {title: 'Child Content 3'},
            ]
        }, {
            title: 'Content 4 (as a parent menu, has no child)',
            children: []
        }]);


        return {
            menu,
            autoOpenActiveMenu
        }
    }
})
</script>
<style scoped>
.menu {
  width: 400px;
}

.option {
  line-height: 20px;
  vertical-align: middle;
  margin-top: 20px;
}

.option > d-toggle {
  display: inline-block;
  transform: translateY(3px);
}

@media (max-width: 500px) {
  .menu {
    width: 80%;
  }
}
</style>
```

:::

### 改变键值
通过titleKey,childrenKey,disabledKey,activeKey等等改变数组键值，适配不同的接口类型定义。
:::demo

```vue
<template>
    <div class="menu">
        <d-accordion
            :data="menu"
            :titleKey="key?.titleKey"
            :activeKey="key?.activeKey"
            :disabledKey="key?.disabledKey"
            :openKey="key?.openKey"
            :childrenKey="key?.childrenKey"
        >
        </d-accordion>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
    name: "accordion",
    setup() {
        const key = reactive({
            titleKey: 'value',
            activeKey: '$selected',
            disabledKey: 'forbidden',
            openKey: '$show',
            childrenKey: 'subs',
        })
        const menu = ref([{
            value: 'Content 1',
        }, {
            value: 'Content 2 (expended)',
            $show: true,
            subs: [
            { value: 'Child Content 1 (disabled)', forbidden: true },
            { value: 'Child Content 2 (active)', $selected: true },
            { value: 'Child Content 3' },
            ]
        }]);

        return {
            menu,
            key
        }
    }
})
</script>
<style scoped>
.menu {
  width: 400px;
}

@media (max-width: 500px) {
  .menu {
    width: 80%;
  }
}
</style>
```