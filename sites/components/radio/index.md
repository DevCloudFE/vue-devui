# Radio 单选框

单选框。

### 何时使用

用户要从一个数据集中选择单个选项，且能并排查看所有可选项，选项数量在2~7之间时，建议使用单选按钮。

### 横向排列

<d-radio v-model:checked="checked">checked</d-radio>
<d-radio v-model:checked="unchecked">unchecked</d-radio>

```html
<d-radio v-model:checked="checked">checked</d-radio>
<d-radio v-model:checked="unchecked">unchecked</d-radio>
```

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const checked = ref(true)
    const unchecked = ref(false)

    return {
      checked,
      unchecked,
    }
  }
})
</script>
