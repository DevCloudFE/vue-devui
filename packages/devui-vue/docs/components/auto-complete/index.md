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
    :allowEmptyValueSearch="allowEmptyValueSearch"
    :selectValue="selectValue"
    :transInputFocusEmit="transInputFocusEmit"
    :appendToBody="true"
    :appendToBodyDirections="appendToBodyDirections"
    :dAutoCompleteWidth="450"
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
    const selectValue = ()=>{
      console.log('selectValue')
    }
    const transInputFocusEmit = ()=>{
      console.log('transInputFocusEmit')
    }
    const appendToBodyDirections = ref({
      originX: 'left',
      originY: 'bottom',
      overlayX: 'left',
      overlayY: 'top',
    })
    return {
      value,
      source,
      allowEmptyValueSearch,
      transInputFocusEmit,
      selectValue,
      appendToBodyDirections
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
通过 searchFn 自定义数据的匹配方法和返回的数据格式。
:::demo

```vue
<template>
  <d-auto-complete
    v-model="value"
    :searchFn="searchFn"
    disabledKey="disabled"
    isSearching
    :delay="1000"
    :formatter="formatter"
  >
    <template #searchingTemplate="slotProps" >
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
通过 itemTemplate、noResultItemTemplate 自定义下拉框和无匹配提示。
:::demo

```vue
<template>
  <d-auto-complete
    :source="source"
    v-model="value"
  >
    <template #itemTemplate="slotProps" >
      <div>
          第{{slotProps.index}}项: {{slotProps.item}}
      </div>
    </template>
    <template #noResultItemTemplate="slotProps" >
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

通过 latestSource 设置最近输入。

:::demo

```vue
<template>
  <d-auto-complete
    :source="source"
    v-model="value"
    :latestSource="latestSource"
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



### 懒加载
enableLazyLoad 开启懒加载

:::demo

```vue
<template>
  <d-auto-complete
    ref="autoCompleteRef"
    :source="source"
    v-model="value"
    enableLazyLoad
    :load-more="loadMore"
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


### d-auto-complete

d-auto-complete 参数

|          参数          |                        类型                         |                       默认                       |                                                                              说明                                                                               | 跳转 Demo                              | 全局配置项 |
| :--------------------: | :-------------------------------------------------: | :----------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------- | ---------- |
|         source         |                    `Array<any>`                     |                        --                        |                                                              必选，有 searchFn 的情况下可以不必选                                                               | [基本用法](#基本用法)           |
| allowEmptyValueSearch  |                      `boolean`                      |                      false                       |                                                     可选，在绑定的输入框 value 为空时，是否进行搜索提示操作                                                     | [基本用法](#基本用法)     |
|      appendToBody      |                      `boolean`                      |                      false                       |                                                                可选，下拉弹出是否 append to body                                                                | [基本用法](#基本用法)     |
| appendToBodyDirections | `Object as PropType<ConnectionPosition>` | `{originX: 'left',originY: 'bottom',overlayX: 'left',overlayY: 'top',}` |                               可选，指定下拉框与输入框的相对位置，ConnectionPosition 请参考 Overlay                                | [基本用法](#基本用法)    |
|        disabled        |                      `boolean`                      |                      false                       |                                                                       可选，是否禁用指令                                                                        | [设置禁用](#设置禁用)          |
|         delay          |                      `number`                       |                       300                        |                                                 可选，只有在 delay 时间经过后并且未输入新值，才做搜索查询（`ms`）                                                 | [基本用法](#基本用法)     |
|      disabledKey       |                      `string`                       |                        --                        | 可选，禁用单个选项，当传入资源 source 选项类型为对象，比如设置为'disabled'，则当对象的 disable 属性为 true 时，比如{ label: xxx, disabled: true }，该选项将禁用 | [自定义数据匹配方法](#自定义数据匹配方法)          |
|      itemTemplate      |                    `slot`                    |                        --                        |                                                                      可选，自定义展示模板。slotProps：{ index: 下标索引, item: 当前项内容 }。                                                                         | [自定义模板展示](#自定义模板展示)     |
|  noResultItemTemplate  |                    `slot`                    |                        --                        |                                                                   可选，没有匹配项的展示结果。slotProps：输入内容。                                                                     | [自定义模板展示](#自定义模板展示)     |
|       formatter        |               `(item: any) => string`               |     [`defaultFormatter`](#defaultFormatter)      |                                                                        可选，格式化函数                                                                         | [自定义数据匹配方法](#自定义数据匹配方法)          |
|      isSearching       |                      `boolean`                      |                      false                       |                                                     可选，是否在搜索中，用于控制 searchingTemplate 是否显示                                                     | [自定义数据匹配方法](#自定义数据匹配方法)     |
|   searchingTemplate    |                    `slot`                    |                        --                        |                                                                   可选，自定义搜索中显示模板。slotProps：输入内容。                                                                    | [自定义数据匹配方法](#自定义数据匹配方法)     |
|       sceneType        |                      `string`                       |                        --                        |                                                                 可选，值为 'select'、'suggest'                                                                  | [启用懒加载](#启用懒加载)      |
|        searchFn        |        `(term: string) => Array<any>`        |      [`defaultSearchFn`](#defaultSearchFn)       |                                                                      可选，自定义搜索过滤                                                                       | [自定义数据匹配方法](#自定义数据匹配方法) |
|        tipsText        |                      `string`                       |                    '最近输入'                    |                                                                         可选，提示文字                                                                          | [设置禁用](#设置禁用)          |
|      latestSource      |                    `Array<any>`                     |                        --                        |                                                                         可选， 最近输入                                                                         | [最近输入](#最近输入)           |
|      valueParser       |                `(item: any) => any`                 |    [`defaultValueParse`](#defaultValueParse)     |                                                                   可选， 对选中后数据进行处理                                                                   | [懒加载](#懒加载)      |
|     enableLazyLoad     |                      `boolean`                      |                      false                       |                                                                      可选，是否允许懒加载                                                                       | [懒加载](#懒加载)      |
|   dAutoCompleteWidth   |                      `number`                       |                        --                        |                                                                     可选，调整宽度（`px`）                                                                      |[基本用法](#基本用法)
|     showAnimation      |                      `boolean`                      |                       true                       |                                                                       可选，是否开启动画                                                                        |                                        | ✔          |      |           |

d-auto-complete 事件

|        参数         |                                         类型                                         |                                                                  说明                                                                  | 跳转 Demo                         |
| :-----------------: | :----------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------- |
|      loadMore       |               `EventEmitter<ComponentRef<AutoCompletePopupComponent>>`               | 懒加载触发事件，配合`enableLazyLoad`使用，使用`$event.loadFinish()`关闭 loading 状态，其中\$event 为 AutoCompletePopupComponent 的实例 | [懒加载](#懒加载) |
|     selectValue     |                                 `EventEmitter<any>`                                  |                                                      可选，选择选项之后的回调函数                                                      | [基本用法](#基本用法) |
| transInputFocusEmit | `EventEmitter<any>`  |                                                      可选，Input focus 时回调函数             | [基本用法](#基本用法)  |


# 接口 & 类型定义

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
