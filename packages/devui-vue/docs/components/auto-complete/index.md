# AutoComplete 自动补全

联想用户可能需要的输入结果。

### 何时使用

当需要根据用户输入的部分字符推断出他可能想要输入的内容时。


### 基本用法
通过 source 设置自动完成的数据源。
:::demo

```vue
<template>
  <d-auto-complete
    :delay="1000"
    :source="source"
    v-model="value"
    :allow-empty-value-search="allowEmptyValueSearch"
    :select-value="selectValue"
    :trans-input-focus-emit="transInputFocusEmit"
    :position="position"
    :width="420"
  >
  </d-auto-complete>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const value = ref('')
    const allowEmptyValueSearch = ref(true)
    const source = ref([
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
      'CoffeeScript',
    ])
    const selectValue = (e)=>{
      console.log('selectValue',e)
    }
    const transInputFocusEmit = ()=>{
      console.log('transInputFocusEmit')
    }
    const position = ref(['bottom'])
    return {
      value,
      source,
      allowEmptyValueSearch,
      transInputFocusEmit,
      selectValue,
      position
    }
  }
})
</script>

<style>

</style>
```

:::


### 设置禁用
通过 disabled 设置是否禁用。
:::demo

```vue
<template>
 <d-row type="flex" class="docs-devui-row">
    <d-col :flex="4">
      <d-auto-complete
        :source="source"
        v-model="value"
        :disabled="isDisabled"
      >
      </d-auto-complete>
    </d-col>
    <d-col :flex="2">
      <d-button id="primaryBtn" @click="toggle" style="margin-left:10px">
        {{ isDisabled ? 'Enable AutoComplete' : 'Disable AutoComplete' }}
      </d-button>
    </d-col>
  </d-row>

</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const value = ref('')
    const source = ref([
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
      'CoffeeScript',
    ])
    const isDisabled = ref(false)
    function toggle(){
      isDisabled.value= !isDisabled.value
    }
    return {
      value,
      source,
      isDisabled,
      toggle
    }
  }
})
</script>

<style>

</style>
```

:::

### 自定义数据匹配方法
通过 search-fn 自定义数据的匹配方法和返回的数据格式。
:::demo

```vue
<template>
  <d-auto-complete
    v-model="value"
    :search-fn="searchFn"
    disabled-key="disabled"
    is-searching
    :delay="1000"
    :formatter="formatter"
  >
    <template #searching="slotProps" >
      <div>
          {{`searching: ${slotProps}`}}
      </div>
    </template>
  </d-auto-complete>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const value = ref('')
    const mySource = ref([
      {
        label:'C#',
        disabled:false
      },{
        label:'C++',
        disabled:false
      },{
        label:'CPython',
        disabled:false
      },{
        label:'Java',
        disabled:false
      },{
        label:'JavaScript',
        disabled:false
      },{
        label:'Go',
        disabled:false
      },{
        label:'Ruby',
        disabled:false
      },{
        label:'F#',
        disabled:false
      },{
        label:'TypeScript',
        disabled:false
      },{
        label:'SQL',
        disabled:true
      },{
        label:'LiveScript',
        disabled:false
      },{
        label:'CoffeeScript',
        disabled:false
      }
    ])
    const formatter = (item) =>{
      return item.label;
    }
    //trem：input输入内容
    const searchFn =async (trem)=>{
      let arr = []
      await new Promise((resolve)=>{
        setTimeout(() => {
          resolve()
        }, 1000);
      })
      mySource.value.forEach((item) => {
        let cur = item.label
        cur = cur.toLowerCase()
        if (cur.startsWith(trem)) {
            arr.push(item)
        }
      })
      return arr
    }
    return {
      value,
      searchFn,
      formatter
    }
  }
})
</script>

<style>

</style>
```

:::

### 自定义模板展示
通过 item、nothing 自定义下拉框和无匹配提示。
:::demo

```vue
<template>
  <d-auto-complete
    :source="source"
    v-model="value"
  >
    <template #item="slotProps" >
      <div>
          第{{slotProps.index}}项: {{slotProps.item}}
      </div>
    </template>
    <template #nothing="slotProps" >
      <div>
          {{`没有匹配项: ${slotProps}`}}
      </div>
    </template>
  </d-auto-complete>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const value = ref('')
    const source = ref([
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
      'CoffeeScript',
    ])

    return {
      value,
      source
    }
  }
})
</script>

<style>

</style>
```

:::


### 最近输入

通过 latest-source 设置最近输入。

:::demo

```vue
<template>
  <d-auto-complete
    :source="source"
    v-model="value"
    :latest-source="latestSource"
  >
  </d-auto-complete>
</template>

<script>
import { defineComponent, ref,toRefs,getCurrentInstance } from 'vue'
export default defineComponent({
  setup() {
    const value = ref('')
    const latestSource = ref(['JavaScript','TypeScript'])
    const source = ref([
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
      'CoffeeScript',
    ])
    
    return {
      value,
      source,
      latestSource
    }
  }
})
</script>

<style>

</style>
```

:::



### 启用懒加载
enable-lazy-load 开启懒加载

:::demo

```vue
<template>
  <d-auto-complete
    ref="autoCompleteRef"
    :source="source"
    v-model="value"
    enable-lazy-load
    :load-more="loadMore"
    scene-type="select"
  >
  </d-auto-complete>
</template>

<script>
import { defineComponent, ref,toRefs,getCurrentInstance } from 'vue'
export default defineComponent({
  setup() {
    const value = ref('')
    const source = ref([
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
      'CoffeeScript',
      'C1',
      'C2',
      'C3',
      'C4',
      'C5',
      'C6',
      'C7',
    ])
    const autoCompleteRef =ref(null)
    
    const loadMore = () => {
      setTimeout(() => {
        source.value.push('lazyData'+source.value.length)
        autoCompleteRef.value?.loadFinish()
      },3000)
    }
    return {
      value,
      source,
      loadMore,
      autoCompleteRef
    }
  }
})
</script>

<style>

</style>
```

:::


### AutoComplete 参数

|           参数           |              类型              |                   默认                    |                                                                              说明                                                                               | 跳转 Demo                                 | 全局配置项 |
| :----------------------: | :----------------------------: | :---------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------- | ---------- |
|          source          |          `Array<any>`          |                    --                     |                                                              必选，有 searchFn 的情况下可以不必选                                                               | [基本用法](#基本用法)                     |
| allow-empty-value-search |           `boolean`            |                   false                   |                                                     可选，在绑定的输入框 value 为空时，是否进行搜索提示操作                                                     | [基本用法](#基本用法)                     |
|         position         |         `Placement[]`          |          ['bottom'](#placement)           |                                                               可选，指定下拉框与输入框的相对位置                                                                | [基本用法](#基本用法)                     |
|         disabled         |           `boolean`            |                   false                   |                                                                       可选，是否禁用指令                                                                        | [设置禁用](#设置禁用)                     |
|          delay           |            `number`            |                    300                    |                                                可选，只有在 delay 时间经过后并且未输入新值，才做搜索查询（`ms`）                                                | [基本用法](#基本用法)                     |
|       disabled-key       |            `string`            |                    --                     | 可选，禁用单个选项，当传入资源 source 选项类型为对象，比如设置为'disabled'，则当对象的 disable 属性为 true 时，比如{ label: xxx, disabled: true }，该选项将禁用 | [自定义数据匹配方法](#自定义数据匹配方法) |
|        formatter         |    `(item: any) => string`     |  [`defaultFormatter`](#defaultFormatter)  |                                                                        可选，格式化函数                                                                         | [自定义数据匹配方法](#自定义数据匹配方法) |
|       is-searching       |           `boolean`            |                   false                   |                                                     可选，是否在搜索中，用于控制 searchingTemplate 是否显示                                                     | [自定义数据匹配方法](#自定义数据匹配方法) |
|        scene-type        |            `string`            |                    --                     |                                                                 可选，值为 'select'、'suggest'                                                                  | [启用懒加载](#启用懒加载)                 |
|        search-fn         | `(term: string) => Array<any>` |   [`defaultSearchFn`](#defaultSearchFn)   |                                                                      可选，自定义搜索过滤                                                                       | [自定义数据匹配方法](#自定义数据匹配方法) |
|        tips-text         |            `string`            |                '最近输入'                 |                                                                         可选，提示文字                                                                          | [设置禁用](#设置禁用)                     |
|      latest-source       |          `Array<any>`          |                    --                     |                                                                         可选， 最近输入                                                                         | [最近输入](#最近输入)                     |
|       value-parser       |      `(item: any) => any`      | [`defaultValueParse`](#defaultValueParse) |                                                                   可选， 对选中后数据进行处理                                                                   | [启用懒加载](#启用懒加载)                 |
|     enable-lazy-load     |           `boolean`            |                   false                   |                                                                      可选，是否允许懒加载                                                                       | [启用懒加载](#启用懒加载)                 |
|          width           |            `number`            |                    400                    |                                                                     可选，调整宽度（`px`）                                                                      | [基本用法](#基本用法)                     |
|      show-animation      |           `boolean`            |                   true                    |                                                                       可选，是否开启动画                                                                        |                                           | ✔          |  |  |

### AutoComplete 事件

|          参数          |       类型        |                                                                说明                                                                 | 跳转 Demo             |
| :--------------------: | :---------------: | :---------------------------------------------------------------------------------------------------------------------------------: | :-------------------- |
|        loadMore        |    `function`     | 懒加载触发事件，配合`enable-lazy-load`使用，使用`$event.loadFinish()`关闭 loading 状态，其中\$event 为 AutoCompleteComponent 的实例 | [懒加载](#懒加载)     |
|      select-value      | `function(value)` |                                                    可选，选择选项之后的回调函数                                                     | [基本用法](#基本用法) |
| trans-input-focus-emit |    `function`     |                                                    可选，Input focus 时回调函数                                                     | [基本用法](#基本用法) |

### AutoComplete 插槽

|  插槽名   |                                   说明                                   | 跳转 Demo                                 |
| :-------: | :----------------------------------------------------------------------: | :---------------------------------------- |
|   item    | 可选，自定义展示模板。slotProps：{ index: 下标索引, item: 当前项内容 }。 | [自定义模板展示](#自定义模板展示)         |
|  nothing  |            可选，没有匹配项的展示结果。slotProps：输入内容。             | [自定义模板展示](#自定义模板展示)         |
| searching |            可选，自定义搜索中显示模板。slotProps：输入内容。             | [自定义数据匹配方法](#自定义数据匹配方法) |

# 接口 & 类型定义

### Placement
```ts
type Placement =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'right-start'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end';
```

### defaultSearchFn

```ts
defaultSearchFn = (term) => {
  return source.forEach((item)=>{
          let cur = formatter(item)
          cur = cur.toLowerCase()
          if(cur.startsWith(term)){
            arr.push(item)
          }
        })
  };
```
term 为输入的关键字。
  

### defaultFormatter

```ts
defaultFormatter = (item) => (item ? item.label || item.toString() : '');
```
item 为数据项。
  

### defaultValueParse

```ts
defaultValueParse = (item) => item;
```
item 为数据项。