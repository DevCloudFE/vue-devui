# TagsInput 标签输入

输入标签组件。

### 何时使用

当用户需要输入多个标签时。

### 基本用法

<d-tags-input
  v-model:tags="state.tags"
  v-model:suggestionList="state.suggestionList"
  display-property="name"
  placeholder="请输入名字"
  no-data="暂无数据"
></d-tags-input>

```html
<d-tags-input
  v-model:tags="state.tags"
  v-model:suggestionList="state.suggestionList"
  display-property="name"
  placeholder="请输入名字"
  no-data="暂无数据"
></d-tags-input>
```

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      tags: [{name: '123'}],
      suggestionList: [{name: 'item1'}]
    })

    return {
      state,
    }
  }
})
</script>