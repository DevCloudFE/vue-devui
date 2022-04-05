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
    :allow-empty-value-search="allowEmptyValueSearch"
    :select-value="selectValue"
    :trans-input-focus-emit="transInputFocusEmit"
    :position="position"
    :width="420"
    :append-to-body="true"
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


### Disabled
You can set the disabled parameter to disable it in the text box and disable the options in the drop-down list box by using the disabled-key parameter.
:::demo

```vue
<template>
 <d-row type="flex">
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
You can use search-fn to customize the data matching method and the returned data format.
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
Use item、nothing to customize the drop-down list box and display no matching message.
:::demo

```vue
<template>
  <d-auto-complete
    :source="source"
    v-model="value"
  >
    <template #item="slotProps" >
      <div>
          No.{{slotProps.index}}: {{slotProps.item}}
      </div>
    </template>
    <template #nothing="slotProps" >
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

Set latest-source to the latest input.

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

### Enable lazy load

enable-lazy-load: enables lazy loading.

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
    :value-parser="valueParser"
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
    const valueParser = (e) => {
      return e + '123'
    }
    return {
      value,
      source,
      loadMore,
      valueParser,
      autoCompleteRef
    }
  }
})
</script>

<style>

</style>
```

:::



### AutoComplete Parameter

|        Parameter         |              Type              |                 Default                 |                                                                                                                Description                                                                                                                | Jump to Demo                                                        | Global Config |
| :----------------------: | :----------------------------: | :-------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------ | ------------- |
|          source          |  [`SourceType`](#sourcetype)   |                   --                    |                                                                                      Required. This parameter is optional if searchFn is specified.                                                                                       | [Basic usage](#Basic-usage)                                         |
| allow-empty-value-search |           `boolean`            |                  false                  |                                                                      Optional. indicates whether to display a search message when the bound text box value is empty.                                                                      | [Basic usage](#Basic-usage)                                         |
|      append-to-body      |           `boolean`            |                  false                  |                                                                                Optional. Whether to append to body is displayed in the drop-down list box.                                                                                | [Basic usage](#Basic-usage)                                         |
|         position         |   [`Placement`](#placement)    |              `['bottom']`               |                                                                             Optional. Specify the relative position of the drop-down box and the input box .                                                                              | [Basic usage](#Basic-usage)                                         |
|         disabled         |           `boolean`            |                  false                  |                                                                                             Optional. Indicating whether to disable commands.                                                                                             | [Disabled](#Disabled)                                               |
|          delay           |            `number`            |                   300                   |                                                                   Optional. The search is performed only after the delay time elapses and a new value is entered. (ms)                                                                    | [Basic usage](#Basic-usage)                                         |
|       disabled-key       |            `string`            |                   --                    | Optional. Disable a single option. If the input resource source option type is an object, for example, disabled, and the disable attribute of the object is true, for example, {label: xxx, disabled: true}, this option will be disabled | [Customized data matching method](#Customized-data-matching-method) |
|        formatter         |    `(item: any) => string`     |  [defaultFormatter](#defaultFormatter)  |                                                                                                       Optional. Formatting function                                                                                                       | [Customized data matching method](#Customized-data-matching-method) |
|       is-searching       |           `boolean`            |                  false                  |                                                                                      Optional. indicating whether the search template is displayed.                                                                                       | [Customized data matching method](#Customized-data-matching-method) |
|        scene-type        |            `string`            |                   --                    |                                                                                             Optional. The value can be select or suggestion.                                                                                              | [Enable lazy load](#Enable-lazy-load)                               |
|        search-fn         | `(term: string) => Array<any>` |   [defaultSearchFn](#defaultSearchFn)   |                                                                                                   Optional. Customized search filtering                                                                                                   | [Customized data matching method](#Customized-data-matching-method) |
|        tips-text         |            `string`            |             'Latest input'              |                                                                                                           Optional. prompt text                                                                                                           | [Disabled](#Disabled)                                               |
|      latest-source       |          `Array<any>`          |                   --                    |                                                                                                          Optional. Latest input                                                                                                           | [Latest input](#Latest-input)                                       |
|       value-parser       |      `(item: any) => any`      | [defaultValueParse](#defaultValueParse) |                                                                                                     (optional) Process selected data                                                                                                      | [Enable lazy load](#Enable-lazy-load)                               |
|     enable-lazy-load     |           `boolean`            |                  false                  |                                                                                                 Optional. Whether lazy loading is allowed                                                                                                 | [Enable lazy load](#Enable-lazy-load)                               |
|          width           |            `number`            |                   400                   |                                                                                                      Optional. Adjust the width (px)                                                                                                      | [Basic usage](#Basic-usage)                                         |
|      show-animation      |           `boolean`            |                  true                   |                                                                                                  optional. Whether to enable animation.                                                                                                   |                                                                     | ✔             |  |  |

### AutoComplete Event

|       Parameter        |       Type        |                                                                                                           Description                                                                                                           | Jump to Demo                          |
| :--------------------: | :---------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------ |
|       load-more        |    `function`     | optional. It is a lazy loading trigger event. It is used together with enable-lazy-load. `$event.loadFinish()` is used to disable the loading status. $event is the instance of the pop-up component AutoCompletePopupComponent | [Enable lazy load](#Enable-lazy-load) |
|      select-value      | `function(value)` |                                                                                     (optional), callback function after selecting an option                                                                                     | [Basic usage](#Basic-usage)           |
| trans-input-focus-emit |    `function`     |                                                                                          (optional). Callback function for input focus                                                                                          | [Basic usage](#Basic-usage)           |

### AutoComplete slots

|   Name    |                        Description                        | Jump to Demo                                                        |
| :-------: | :-------------------------------------------------------: | :------------------------------------------------------------------ |
|   item    |          Optional. Customized display template .          | [Customized template display](#Customized-template-display)         |
|  nothing  |         Optional. No matching item is displayed .         | [Customized template display](#Customized-template-display)         |
| searching | Optional. The template is displayed in customized search. | [Customized data matching method](#Customized-data-matching-method) |

# Interface & Type Definition

### SourceType
```ts
interface SourceItemObj {
  label: string;
  disabled: boolean;
  [propName: string]: unknown;
}
type SourceType = Array<string>| Array<SourceItemObj>
```
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
defaultSearchFn = (term: string) => {
  type ItemType = typeof source.value[0];
  const arr: ItemType[] = [];
  source.value.forEach((item) => {
    let cur = formatter.value((item as ItemType));
    cur = cur.toLowerCase();
    if (cur.startsWith(term)) {
      arr.push(item);
    }
  });
  return arr as SourceType;
};
```
term indicates the entered keyword.
  

### defaultFormatter

```ts
defaultFormatter = (item: string | SourceItemObj) => {
  if(typeof item === 'string'){
    return item;
  }
  return item!==null ? item.label || item.toString() : '';
};
```
item indicates a data item.
  

### defaultValueParse

```ts
defaultValueParse = (item) => item;
```
item indicates a data item.