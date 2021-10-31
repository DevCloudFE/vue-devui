# anchor 
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
 
# When to use

 
Use in the page:

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
 
# dAnchor

Define an anchor point。
### dAnchor parameter

|     parameter     |   type   | default |                         illustrate                          | jump Demo                    |config| 
| :----------------: | :----------: | :------: | :--: | :---------------------------------------------------: | ---------------------------- |
|   dAnchor    | `string` |  --  |               required, set an anchor name                | [basic usage](demo#basic-usage) |
| anchorActive | `string` |  --  | Optional, when the anchor point is activated, the corresponding css class name for the module to take effect | [basic usage](demo#basic-usage) |

### dAnchor activation event

The following classes are automatically added to the anchor points to correspond to different activated objects。

|           css classname            |        Representative meaning        |
| :---------------------------: | :--------------------: |
| anchor-active-by-anchor-link  | Click on the anchor link to activate    |
|    anchor-active-by-scroll    | The container is scrolled to the anchor point to activate |
| anchor-active-by-click-inside | Click on the content inside the anchor to activate  |
|   anchor-active-by-initial    | Initialize scroll bar position activation  |

# dAnchorLink

Define a link with an anchor point. Clicking on the link will slide to the anchor point. When the anchor point is at the top of the page, the link class will be activated。

### dAnchorLink parameter

|     parameter     |   type   | default |                         illustrate                          | jump Demo                    |config| 
| :----------------: | :----------: | :------: | :--: | :---------------------------------------------------: | ---------------------------- |
| dAnchorLink  | `string` |  --  |            required, click the name of the target anchor point to slide            | [basic usage](demo#basic-usage) |
| anchorActive | `string` |  --  | optional, when the anchor point is active, the css class name corresponding to the effective link | [basic usage](demo#basic-usage) |

# dAnchorBox

There must be a container, otherwise the function cannot be used。

Define a container for scanning anchor points and place it on the common parent node of dAnchor and dAnchorLink for communication between anchor points and links。
