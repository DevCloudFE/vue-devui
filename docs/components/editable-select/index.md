# EditableSelect 可输入下拉选择框

同时支持输入和下拉选择的输入框。

### 何时使用

当需要同时支持用户输入数据和选择已有数据的时候使用，加入输入联想功能，方便用户搜索已有数据。

:::demo
```vue
<template>
  <d-editable-select v-model="selectItem1">
    <d-editable-select-option v-for="item in languages":key="item" :label="item">
      {{ item }}
    </d-editable-select-option>
    <div slot="empty">not Found data</div>
  </d-editable-select>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const languages = ref(['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python', 'Ruby', 'F#', 'TypeScript', 'SQL',
    'LiveScript', 'CoffeeScript']);
    const languages1 = ref([{name: 'c'}, {name: 'C++', disabled: true}]);
    const selectItem1 = ref("")
    return {
      languages,
      languages1,
      selectItem1
    };
  },
});
</script>

```
:::
