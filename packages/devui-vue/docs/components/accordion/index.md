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
        ></d-accordion>
    </div>
    
    <div class="option">
        <d-switch v-model:checked="restrictOneOpen"></d-switch> Only one level-1 menu can be expanded.<!--限制只能展开一个一级菜单-->
    </div>
    <div class="option"><d-switch @change="switchChange" v-model:checked="accordionTypeEmbed"></d-switch> Embedded menu (no shadow)<!--内嵌菜单形式（无阴影）--></div>
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

        const switchChange = (e) => {
            console.log(e, accordionTypeEmbed)
        }


        return {
            menu,
            restrictOneOpen,
            accordionTypeEmbed,
            switchChange
        }
    }
})
</script>
<style>
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