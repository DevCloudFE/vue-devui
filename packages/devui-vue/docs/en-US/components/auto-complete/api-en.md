# AutoComplete 

Guess what users may need when entering.

### When To Use

When you need to deduce the content that a user may want to enter according to some characters entered by the user.


### Basic usage
Set source to the data source that is automatically completed.
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


### Disabled
You can set the disabled parameter to disable it in the text box and disable the options in the drop-down list box by using the disabledKey parameter.
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

### Customized data matching method
You can use searchFn to customize the data matching method and the returned data format.
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

### Customized template display
Use itemTemplate and noResultItemTemplate to customize the drop-down list box and display no matching message.
:::demo

```vue
<template>
  <d-auto-complete
    :source="source"
    v-model="value"
  >
    <template #itemTemplate="slotProps" >
      <div>
          No.{{slotProps.index}}: {{slotProps.item}}
      </div>
    </template>
    <template #noResultItemTemplate="slotProps" >
      <div>
          {{`No any results match : ${slotProps}`}}
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


### Latest input

Set latestSource to the latest input.

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

### Enable lazy load

enableLazyLoad: enables lazy loading.

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

d-auto-complete Parameter

|          Parameter          |                        Type                         |                       Default                       |                                                                              Description                                                                               | Jump to Demo                             | Global Config |
| :--------------------: | :-------------------------------------------------: | :----------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------- | ---------- |
|         source         |                    `Array<any>`                     |                        --                        |                                                              Required. This parameter is optional if searchFn is specified.                                                               | [Basic usage](#Basic-usage)           |
| allowEmptyValueSearch  |                      `boolean`                      |                      false                       |                                                     Optional. indicates whether to display a search message when the bound text box value is empty.                                                     | [Basic usage](#Basic-usage)     |
|      appendToBody      |                      `boolean`                      |                      false                       |                                                                Optional. Whether to append to body is displayed in the drop-down list box.                                                                | [Basic usage](#Basic-usage)     |
| appendToBodyDirections | `Object as PropType<ConnectionPosition>` | `{originX: 'left',originY: 'bottom',overlayX: 'left',overlayY: 'top',}` |                               Optional. Specify the relative position of the drop-down box and the input box. for details about ConnectionPosition, see Overlay                              | [Basic usage](#Basic-usage)    |
|        disabled        |                      `boolean`                      |                      false                       |                                                                       Optional. Indicating whether to disable commands.                                                                        | [Disabled](#Disabled)          |
|         delay          |                      `number`                       |                       300                        |                                                 Optional. The search is performed only after the delay time elapses and a new value is entered. (ms)                                                 | [Basic usage](#Basic-usage)     |
|      disabledKey       |                      `string`                       |                        --                        | Optional. Disable a single option. If the input resource source option type is an object, for example, disabled, and the disable attribute of the object is true, for example, {label: xxx, disabled: true}, this option will be disabled | [Customized data matching method](#Customized-data-matching-method)          |
|      itemTemplate      |                    `slot`                    |                        --                        |                                                                      Optional. Customized display template                                                                       | [Customized template display](#Customized-template-display)     |
|  noResultItemTemplate  |                    `slot`                    |                        --                        |                                                                   Optional. No matching item is displayed.                                                                    | [Customized template display](#Customized-template-display)     |
|       formatter        |               `(item: any) => string`               |     [defaultFormatter](#defaultFormatter)      |                                                                        Optional. Formatting function                                                                         | [Customized data matching method](#Customized-data-matching-method)          |
|      isSearching       |                      `boolean`                      |                      false                       |                                                     Optional. indicating whether the search template is displayed.                                                     | [Customized data matching method](#Customized-data-matching-method)     |
|   searchingTemplate    |                    `slot`                    |                        --                        |                                                                   Optional. The template is displayed in customized search.                                                                    | [Customized data matching method](#Customized-data-matching-method)     |
|       sceneType        |                      `string`                       |                        --                        |                                                                 Optional. The value can be select or suggestion.                                                                  | [Enable lazy load](#Enable-lazy-load)      |
|        searchFn        |        `(term: string) => Array<any>`        |      [defaultSearchFn](#defaultSearchFn)       |                                                                      Optional. Customized search filtering                                                                       | [Customized data matching method](#Customized-data-matching-method) |
|        tipsText        |                      `string`                       |                    'Latest input'                    |                                                                         Optional. prompt text                                                                          | [Disabled](#Disabled)          |
|      latestSource      |                    `Array<any>`                     |                        --                        |                                                                         Optional. Latest input                                                                         | [Latest input](#Latest-input)           |
|      valueParser       |                `(item: any) => any`                 |    [defaultValueParse](#defaultValueParse)     |                                                                   (optional) Process selected data                                                                   | [Enable lazy load](#Enable-lazy-load)      |
|     enableLazyLoad     |                      `boolean`                      |                      false                       |                                                                      	Optional. Whether lazy loading is allowed                                                                      | [Enable lazy load](#Enable-lazy-load)      |
|   dAutoCompleteWidth   |                      `number`                       |                        --                        |                                                                     Optional. Adjust the width (px)                                                                      |[Basic usage](#Basic-usage)
|     showAnimation      |                      `boolean`                      |                       true                       |                                                                      optional. Whether to enable animation.                                                                        |                                        | ✔          |      |           |

dAutoComplete Event

|        Parameter         |                                         Type                                         |                                                                  Description                                                                  | Jump to Demo                         |
| :-----------------: | :----------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------- |
|      loadMore       |               `EventEmitter<ComponentRef<AutoCompletePopupComponent>>`               | : optional. It is a lazy loading trigger event. It is used together with enableLazyLoad. `$event.loadFinish()` is used to disable the loading status. $event is the instance of the pop-up component AutoCompletePopupComponent | [Enable lazy load](#Enable-lazy-load) |
|     selectValue     |                                 `EventEmitter<any>`                                  |                                                      (optional), callback function after selecting an option数                                                      | [Basic usage](#Basic-usage) |
| transInputFocusEmit | `EventEmitter<any>`  |                                                      (optional). Callback function for input focus             | [Basic usage](#Basic-usage)  |


# Interface & Type Definition

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
term indicates the entered keyword.
  

### defaultFormatter

```ts
defaultFormatter = (item) => (item ? item.label || item.toString() : '');
```
item indicates a data item.
  

### defaultValueParse

```ts
defaultValueParse = (item) => item;
```
item indicates a data item.
