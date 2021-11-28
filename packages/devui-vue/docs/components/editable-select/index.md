# EditableSelect 可输入下拉选择框

同时支持输入和下拉选择的输入框。

### 何时使用

当需要同时支持用户输入数据和选择已有数据的时候使用，加入输入联想功能，方便用户搜索已有数据。

### 基本用法

通过 options 设置数据源。

:::demo

```vue
<template>
  <d-editable-select
    appendToBody
    v-model="value"
    :options="options"
    :maxHeight="300"
  ></d-editable-select>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const value = ref('')
    const options = ref([
      'C#',
      'C',
      'C++',
      'CPython',
      'Java',
      'JavaScript',
      'Go',
      'Python',
      'Ruby',
      'F#',
      'TypeScript',
      'SQL',
      'LiveScript',
      'CoffeeScript'
    ])
    return {
      value,
      options
    }
  }
})
</script>
<style>
.demo-wrap {
  height: 300px;
}
</style>
```

:::

### 设置禁用选项

支持禁用指定数据。
:::demo

```vue
<template>
  <d-editable-select
    appendToBody
    v-model="value"
    :options="options"
    :maxHeight="300"
    disabled
  ></d-editable-select>
  <d-editable-select
    appendToBody
    v-model="value"
    :options="options1"
    :maxHeight="300"
    disabledKey="disable"
  ></d-editable-select>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const value = ref('')
    const options = ref([
      'C#',
      'C',
      'C++',
      'CPython',
      'Java',
      'JavaScript',
      'Go',
      'Python',
      'Ruby',
      'F#',
      'TypeScript',
      'SQL',
      'LiveScript',
      'CoffeeScript'
    ])
    const options1 = ref([{ name: 'c' }, { name: 'C++', disable: true }])
    return {
      value,
      options,
      options1
    }
  }
})
</script>
```

:::

### 异步获取数据源并设置匹配方法

支持异步设置数据源并设置匹配方法。
:::demo

```vue
<template>
  <d-editable-select
    appendToBody
    v-model="value"
    :options="options"
    :maxHeight="300"
    remote
    :remote-method="remoteMethod"
  ></d-editable-select>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const languages = [
      'C#',
      'C',
      'C++',
      'CPython',
      'Java',
      'JavaScript',
      'Go',
      'Python',
      'Ruby',
      'F#',
      'TypeScript',
      'SQL',
      'LiveScript',
      'CoffeeScript'
    ]
    const value = ref('')
    const options = ref([])

    const remoteMethod = (query) => {
      if (query !== '') {
        setTimeout(() => {
          options.value = languages.filter((item) => {
            return item.includes(query)
          })
        }, 200)
      } else {
        options.value = []
      }
    }

    return {
      value,
      options,
      remoteMethod
    }
  }
})
</script>
```

:::

### 懒加载

:::demo

```vue
<template>
  <d-editable-select
    appendToBody
    v-model="value"
    remote
    enableLazyLoad
    :options="options"
    :maxHeight="300"
    :remote-method="remoteMethod"
    :load-more="loadMore"
  ></d-editable-select>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const options = ref([])
    const value = ref('')
    const remoteMethod = (query) => {
      if (query !== '') {
        setTimeout(() => {
          for (let i = 0; i < 20; i++) {
            options.value.push(options.value.length + 1)
          }
        }, 1000)
      } else {
        options = []
      }
    }
    const loadMore = () => {
      setTimeout(() => {
        for (let i = 0; i < 20; i++) {
          options.value.push(options.value.length + 1)
        }
      }, 1000)
    }
    return { options, value, remoteMethod, loadMore }
  }
})
</script>
```

:::

### d-editable-select

d-editable-select 参数

| 参数           | 类型          | 默认  | 说明                                               | 跳转 Demo                    | 全局配置 |
| -------------- | ------------- | ----- | -------------------------------------------------- | ---------------------------- | -------- |
| appendToBody   | boolean       | false | 可选，下拉是否 appendToBody                        | [基本用法](#基本用法)        |          |
| width          | number        | --    | 可选，控制下拉框宽度，搭配 appendToBody 使用（px） | [基本用法](#基本用法)        |          |
| v-model        | string/number | --    | 绑定值                                             | [基本用法](#基本用法)        |          |
| options        | Array         | --    | 必选，数据列表                                     | [基本用法](#基本用法)        |          |
| disabled       | boolean       | false | 可选，值为 true 禁用下拉框                         | [设置禁用选项](设置禁用选项) |          |
| disabledKey    | string        | --    | 可选，设置禁用选项的 Key 值                        | [设置禁用选项](设置禁用选项) |          |
| maxHeight      | number        | --    | 可选，下拉菜单的最大高度（px）                     | [基本用法](#基本用法)        |          |
| remote         | boolean       | false | 可选，远程搜索                                     |                              |          |
| enableLazyLoad | boolean       | false | 可选，是否允许懒加载                               | [懒加载](#懒加载)            |          |

d-editable-select 事件

| 事件         | 类型 | 说明               | 跳转 Demo                                                |
| ------------ | ---- | ------------------ | -------------------------------------------------------- |
| filterMethod |      | 自定义筛选函数     |                                                          |
| remoteMethod |      | 远程搜索对应的函数 | [异步获取数据并设置匹配方法](异步获取数据并设置匹配方法) |
| loadMore     |      | 懒加载             | [懒加载](懒加载)                                         |

d-editable-select 插槽

| name    | 说明               |
| ------- | ------------------ |
| default | Option 模板        |
| empty   | 无 Option 时的列表 |
