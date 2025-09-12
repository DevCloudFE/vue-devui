# TagInput 标签输入框

输入标签组件。

#### 何时使用

当用户需要输入多个标签时。

### 基本用法

:::demo

```vue

<template>
  <d-tag-input
    v-model="state.tags"
    v-model:suggestionList="state.suggestionList"
    displayProperty="name"
    placeholder="Add a tag"
    no-data="暂无数据"
    :minLength="1"
    :caseSensitivity="true"
    @change="changeValue"
    @update:tags="changeTags"
    @update:suggestionList="changeSuggestionList"
  ></d-tag-input>
</template>
<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      tags: [{ name: "123" }],
      suggestionList: [{ name: "item1" }, { name: "item2" }, { name: "item3" }, { name: "item4" }]
    })
    const changeTags = (val) => {
      console.log(val)
    }
    const changeSuggestionList = (val) => {
      console.log(val)
    }
    const changeValue = (val) => {
      console.log(val)
    }

    return {
      state,
      changeTags,
      changeSuggestionList,
      changeValue
    }
  }
})
</script>
```

:::

### disabled

:::demo

```vue

<template>
  <d-tag-input
    v-model="state.tags"
    v-model:suggestionList="state.suggestionList"
    :disabled="true"
  ></d-tag-input>
</template>
<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      tags: [{ name: "123" }],
      suggestionList: [
        { name: "item1" },
        { name: "item2" },
        { name: "item3" },
        { name: "item4" },
        { name: "item5" },
        { name: "item6" }
      ]
    })

    return {
      state
    }
  }
})
</script>
```

:::

### 标签最小长度&最大标签数

:::demo

```vue

<template>
  <d-tag-input
    v-model="state.tags"
    v-model:suggestionList="state.suggestionList"
    :minLength="3"
    :maxTags="5"
  ></d-tag-input>
</template>
<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      tags: [{ name: "item1" }],
      suggestionList: [
        { name: "item2" },
        { name: "item3" },
        { name: "item4" },
        { name: "item5" },
        { name: "item6" }
      ]
    })

    return {
      state
    }
  }
})
</script>
```

:::

### TagInput 参数

|       参数        |       类型       |           默认            |                 说明                 | 跳转 Demo             | 全局配置项 |
|:---------------:|:--------------:|:-----------------------:| :----------------------------------: | :-------------------- | ---------- |
|     v-model     |    `Array`     |           []            | 必选，记录输入的标签和选择的标签列表 | [基本用法](#基本用法) |
| suggestionList  |    `Array`     |           []            | 可选，下拉选项，默认可选择的标签列表 | [基本用法](#基本用法) |
| displayProperty |    `string`    |         'name'          |       可选，列表项使用的属性名       | [基本用法](#基本用法) |
|   placeholder   |    `string`    |           ''            |      可选，输入框的 placeholder      | [基本用法](#基本用法) |
|     noData      |    `string`    |         '暂无数据'          |           可选，无数据提示           | [基本用法](#基本用法) |
|     maxTags     |    `number`    | Number.MAX_SAFE_INTEGER |      可选，可输入标签的最大个数      | [标签最小长度&最大标签数](#标签最小长度-最大标签数) |
|    minLength    |    `number`    |           `3`           |      可选，可输入标签的最大个数      | [标签最小长度&最大标签数](#标签最小长度-最大标签数) |
|    maxLength    |    `number`    | Number.MAX_SAFE_INTEGER |      可选，可输入标签的最大个数      | [标签最小长度&最大标签数](#标签最小长度-最大标签数) |
| caseSensitivity |   `boolean`    |          false          |   可选，大小写敏感，默认忽略大小写   |                       |            |
|   spellcheck    |   `boolean`    |          true           | 可选，input 输入框是否开启拼写检查的 |                       |            |
|  isAddBySpace   |   `boolean`    |          true           |     可选，是否支持空格键输入标签     |                       |            |
|    disabled     |   `boolean`    |          false          |       可选，disabled 灰化状态        |    [disabled](#disabled)                   |

### TagInput 事件

|    事件     |  说明                                                     | 跳转 Demo             |
| :---------: | :------------------------------------------------------- | --------------------- |
| change | 当选中某个选项项后，将会调用此函数，参数为当前选择项的值 | [基本用法](#基本用法) |
| update:suggestionList | 当选项数据发生变化时，返回新的可选择标签列表 | [基本用法](#基本用法) |
