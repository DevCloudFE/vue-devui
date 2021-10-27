# CheckBox 复选框

多选框。

### 何时使用

1. 在一组选项中进行多项选择；
2. 单独使用可以表示在两个状态之间切换，可以和提交操作结合。

### 基本用法
:::demo

```vue
<template>
  <d-checkbox label="Checked" :isShowTitle="false" v-model="checked" />
  <d-checkbox label="Not checked" :isShowTitle="false" v-model="unchecked" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const checked = ref(true)
    const unchecked = ref(false)
    return {
      checked,
      unchecked
    }
  }
})
</script>
```
:::


#### 使用 CheckboxGroup
:::demo

```vue
<template>
  <d-checkbox-group v-model="checkedValues" label="爱好">
    <d-checkbox label="篮球" value="basketball" />
    <d-checkbox label="足球" value="football" />
  </d-checkbox-group>
  <div>
    {{ checkedValues.reduce((prev, current) => `${current} ${prev}`, '') }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const checked = ref(true)
    const unchecked = ref(false)
    const checkedValues = ref([]);
    return {
      checked,
      unchecked,
      checkedValues
    }
  }
})
</script>
```
:::