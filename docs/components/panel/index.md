# Panel 面板

内容面板，用于内容分组。

### 何时使用

当页面内容需要进行分组显示时使用，一般包含头部、内容区域、底部三个部分。

### 基本用法

<section>
  <d-panel type="primary" :isCollapsed="isCollapsed" :showAnimation="true" :beforeToggle="(e)=>{return true;}">
    <d-panel-header>
      Panel with foldable
      <!-- <em class="icon icon-chevron-down" [ngClass]="{ open: panel.isCollapsed }"></em> -->
    </d-panel-header>
    <d-panel-body>This is body</d-panel-body>
  </d-panel>
  <br /><br />
  <d-panel :isCollapsed="true" :hasLeftPadding="false" :showAnimation="true">
    <d-panel-header>
      Panel has no left padding
      <em class="icon icon-chevron-down"></em>
    </d-panel-header>
    <d-panel-body>This is body</d-panel-body>
  </d-panel>
  <br /><br />
  <d-panel>
    <d-panel-header>Panel with header and footer</d-panel-header>
    <d-panel-body>This is body</d-panel-body>
    <d-panel-footer>This is footer</d-panel-footer>
  </d-panel>
</section>

```html
<section>
  <d-panel type="primary" :isCollapsed="isCollapsed" :showAnimation="true">
    <d-panel-header>
      Panel with foldable
      <em class="icon icon-chevron-down" [ngClass]="{ open: panel.isCollapsed }"></em>
    </d-panel-header>
    <d-panel-body>This is body</d-panel-body>
  </d-panel>
  <br /><br />
  <d-panel :isCollapsed="isCollapsed" :hasLeftPadding="false" :showAnimation="true">
    <d-panel-header>
      Panel has no left padding
      <em class="icon icon-chevron-down"></em>
    </d-panel-header>
    <d-panel-body>This is body</d-panel-body>
  </d-panel>
  <br /><br />
  <d-panel>
    <d-panel-header>Panel with header and footer</d-panel-header>
    <d-panel-body>This is body</d-panel-body>
    <d-panel-footer>This is footer</d-panel-footer>
  </d-panel>
</section>
```

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const isCollapsed = ref(true)

    return {
      isCollapsed,
    }
  }
})
</script>


|参数|  	        类型|	                         默认|	     说明|
|:-:|:-:|:-:|:-:|
|type|	          PanelType|	                  'default'|	可选，面板的类型|
|cssClass|	      string|	                      --|	        可选，自定义 class 名|
|isCollapsed|	    boolean|	                    false|      可选，是否展开|
|hasLeftPadding|	boolean|	                    true|	      可选，是否显示左侧填充|
|showAnimation|	  boolean|	                    true|	      可选，是否展示动画|
|beforeToggle|	  Function\|Promise\|Observable|	--|         可选，面板折叠状态改变前的回调函数，返回 boolean 类型，返回 false 可以阻止面板改变折叠状态	根据条件阻止折叠|