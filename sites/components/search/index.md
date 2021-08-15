# Search 搜索框

### 基本用法

<p>
Small
<d-search size="sm" style="width: 200px"></d-search>
Middle
<d-search style="width: 200px"></d-search>
Large
<d-search iconPosition="left" size="lg" style="width: 200px"></d-search>
Disabled
<d-search disabled style="width: 200px"></d-search>
</p>

```html
<!-- small -->
<d-search size="sm"></d-search>
<!-- middle 默认 -->
<d-search></d-search>
<!-- large -->
<d-search size="lg"></d-search>
<!-- disabled -->
<d-search disabled></d-search>
```

### 搜索图标左置
<p>
  <d-search iconPosition="left" style="width: 200px"></d-search>
</p>

```html
<d-search iconPosition="left"></d-search>
```

### 无边框
<p>
  <d-search iconPosition="left" noBorder style="width: 200px"></d-search>
</p>

```html
<d-search iconPosition="left" noBorder></d-search>
```

### 双向绑定

<p>
  <d-search v-model="searchText" style="width: 200px"></d-search>
</p>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const searchText = ref('')
    return {
      searchText,
    }
  },
})
</script>

```html
<d-search v-model="searchText"></d-search>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const searchText = ref('Devui')
    return {
      searchText
    }
  },
})
</script>
```


