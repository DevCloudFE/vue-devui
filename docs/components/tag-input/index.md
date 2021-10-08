# TagInput 标签输入框

输入标签组件。

### 何时使用

当用户需要输入多个标签时。

### 基本用法

<d-tag-input
v-model:tags="state.tags"
v-model:suggestionList="state.suggestionList"
display-property="name"
no-data="暂无数据"
:maxTags="4"
placeholder="请输入名字"

> </d-tag-input>

```html
<d-tag-input
  v-model:tags="state.tags"
  v-model:suggestionList="state.suggestionList"
  displayProperty="name"
  placeholder="请输入名字"
  no-data="暂无数据"
  :maxTags="4"
></d-tag-input>
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
      state
    }
  }
})
</script>

### d-tag-input 参数

|      参数       |   类型    |          默认           |                 说明                 | 跳转 Demo             | 全局配置项 |
| :-------------: | :-------: | :---------------------: | :----------------------------------: | :-------------------- | ---------- |
|      tags       |  `Array`  |           []            | 必选，记录输入的标签和选择的标签列表 | [基本用法](#基本用法) |
| suggestionList  |  `Array`  |           []            | 可选，下拉选项，默认可选择的标签列表 | [基本用法](#基本用法) |
| displayProperty | `string`  |         'name'          |       可选，列表项使用的属性名       | [基本用法](#基本用法) |
|   placeholder   | `boolean` |           ''            |      可选，输入框的 placeholder      | [基本用法](#基本用法) |
|     noData      | `boolean` |           ''            |           可选，无数据提示           | [基本用法](#基本用法) |
|     maxTags     | `number`  | Number.MAX_SAFE_INTEGER |      可选，可输入标签的最大个数      | [基本用法](#基本用法) |
| caseSensitivity | `boolean` |          false          |   可选，大小写敏感，默认忽略大小写   |                       |            |
|   spellcheck    | `boolean` |          true           | 可选，input 输入框是否开启拼写检查的 |                       |            |
|  isAddBySpace   | `boolean` |          true           |     可选，是否支持空格键输入标签     |                       |            |
|    disabled     | `boolean` |          false          |       可选，disabled 灰化状态        |                       |
|  showAnimation  | `boolean` |          true           |          可选，是否开启动画          |                       | ✔          |

### d-tags-input 事件

|    事件     |        类型         | 说明                                                     | 跳转 Demo             |
| :---------: | :-----------------: | :------------------------------------------------------- | --------------------- |
| valueChange | `EventEmitter<any>` | 当选中某个选项项后，将会调用此函数，参数为当前选择项的值 | [基本用法](#基本用法) |
