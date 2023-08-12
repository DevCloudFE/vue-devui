# Anchor 锚点

跳转到页面指定位置的组件。

#### 何时使用

需要在页面的各个部分之间实现快速跳转时。

<script lang="ts">
  import { defineComponent } from 'vue'
  import Anchor from './demo'
  export default defineComponent({
    components: {
      Anchor
    }
  })
</script>
<anchor /> 
 
### 基本用法

 
在页面中使用：

```html
<!--  class="scrollTarget" 加上这个类名是局部滚动,不加是全局滚动 -->
<div v-d-anchor-box className="scrollTarget">
  <ul>
    <li v-d-anchor-link="anchorlink-one">anchorlink-one</li>
    <li v-d-anchor-link="anchorlink-two">anchorlink-two</li>
    <li v-d-anchor-link="anchorlink-three">anchorlink-three</li>
    <li v-d-anchor-link="anchorlink-four">anchorlink-four</li>
  </ul>
  <div>
    <div v-d-anchor="anchorlink-one">
      anchorlink-one1
    </div>
    <div v-d-anchor="anchorlink-two">
      anchorlink-two
    </div>
    <div v-d-anchor="anchorlink-three">
      anchorlink-three
    </div>
    <div v-d-anchor="anchorlink-four">
      anchorlink-four
    </div>
  </div>
</div>
```
 
### Anchor

定义一个锚点。
### Anchor 参数

|     参数     |   类型   | 默认 |                         说明                          | 跳转 Demo                    |全局配置项| 
| :----------------: | :----------: | :------: | :--: | :---------------------------------------------------: | ---------------------------- |
|   dAnchor    | `string` |  --  |               必选，设置一个锚点的名字                | [基本用法](#基本用法) |
| anchorActive | `string` |  --  | 可选，锚点处于激活状态的时候，模块生效对应的 css 类名 | [基本用法](#基本用法) |

### Anchor 锚点激活事件

自动会给锚点加上以下类对应不同激活的对象。

|           css 类名            |        代表意义        |
| :---------------------------: | :--------------------: |
| anchor-active-by-anchor-link  |    点击锚点链接激活    |
|    anchor-active-by-scroll    | 容器滚动到锚点位置激活 |
| anchor-active-by-click-inside |  点击锚点内部内容激活  |
|   anchor-active-by-initial    |  初始化滚动条位置激活  |

### AnchorLink

定义一个锚点的链接，点击链接会滑动到锚点，锚点处于页面顶部的时候也会激活链接的 class。

### AnchorLink 参数

|     参数     |   类型   | 默认 |                         说明                          | 跳转 Demo                    |全局配置项| 
| :----------------: | :----------: | :------: | :--: | :---------------------------------------------------: | ---------------------------- |
| dAnchorLink  | `string` |  --  |            必选，点击滑动的目标锚点的名字             | [基本用法](#基本用法) |
| anchorActive | `string` |  --  | 可选，锚点处于激活状态的时候，链接生效对应的 css 类名 | [基本用法](#基本用法) |

### AnchorBox

必须有一个容器，否则功能无法使用。

定义一个扫描锚点的容器，放在 dAnchor 与 dAnchorLink 的公共父节点上，用于锚点和链接之间的通信。
