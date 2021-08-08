# CheckBox 复选框

多选框。

### 何时使用

1. 在一组选项中进行多项选择；
2. 单独使用可以表示在两个状态之间切换，可以和提交操作结合。

### 基本用法

<d-checkbox label="Checked" :isShowTitle="false" v-model:checked="checked"> </d-checkbox>
<d-checkbox label="Not checked" :isShowTitle="false" v-model:checked="unchecked"> </d-checkbox>

```html
<d-checkbox label="Checked" :isShowTitle="false" v-model:checked="checked"> </d-checkbox>
<d-checkbox label="Not checked" :isShowTitle="false" v-model:checked="unchecked"> </d-checkbox>
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