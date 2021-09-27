# Switch 开关

开/关切换组件。

### 何时使用

当两种状态需要来回切换控制时，比如启用/禁用。

### 基本用法

<br />

#### Small

<br />

<d-switch v-model:checked="checkedSmall" size="sm"></d-switch>

<br />
<br />

#### Middle

<br />

<d-switch v-model:checked="uncheckedMiddle"></d-switch>

<br />

<d-switch v-model:checked="checkedMiddle"></d-switch>

<br />
<br />

#### Large

<br />

<d-switch v-model:checked="checkedLarge" size="lg"></d-switch>

```html
<d-switch v-model:checked="checkedSmall" size="sm"></d-switch>
<d-switch v-model:checked="uncheckedMiddle"></d-switch>
<d-switch v-model:checked="checkedMiddle"></d-switch>
<d-switch v-model:checked="checkedLarge" size="lg"></d-switch>
```

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const checkedSmall = ref(true)
    const uncheckedMiddle = ref(false)
    const checkedMiddle = ref(true)
    const checkedLarge = ref(true)
    
    return {
      checkedSmall,
      uncheckedMiddle,
      checkedMiddle,
      checkedLarge,
    }
  }
})
</script>
