# Panel

Content panel for content grouping。

### When to use

Used when the page content needs to be displayed in groups, generally including three parts: header, content area, and bottom。

### Basic usage

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
