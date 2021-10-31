# Loading

Prompt the user that the page is executing instructions and needs to wait。

### When to use

When the execution time is long (it takes more than a few seconds), show the user the status of execution。


### Basic usage
Show the basic usage in the scene of loading table data。
:::demo 

```vue
<template>
  <d-button @click="fetchTableData" style="margin-top: 8px">click me!</d-button>
  <table
    v-dLoading="loadingStatus"
    :backdrop="true"
    positionType="relative"
    :view="{top: '50%', left: '50%'}"
    :zIndex="100"
    style="width: 100%; text-align: left;"
  >
    <thead>
      <tr>
        <th>序号</th><th>姓名</th><th>队伍</th><th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(val, index) in datas" :key="index">
        <td>{{index}}</td><td>张家齐</td><td>跳水</td><td>跳水队</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  setup() {
    const loadingStatus = ref(false)
    const datas = reactive([])
    const fetchTableData = () => {
      loadingStatus.value = true

      setTimeout(() => {
        datas.push(1,2,3)
        loadingStatus.value = false
      }, 2000)
    }

    return {
      datas,
      loadingStatus,
      fetchTableData
    }
  }
})
</script>
```
:::


### many promise
support many promise。
:::demo 

```vue
<template>
  <d-button @click="fetchMutiplePromise" style="margin-top: 8px">click me!</d-button>

  <div
    v-dLoading="promises"
    message="One moment please..."
    style="margin-top: 20px; width: 100%; height: 80px; padding: 10px;"
  >loading will show here2</div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {    
    const promises = ref([])
    const fetchMutiplePromise = () => {
      let list = []
      for (let i = 0; i < 3; i++) {
        list.push(new Promise((res, rej) => {
          setTimeout(() => {
            res(i)
          }, (i + 1) * 1000)
        }).then((res) => {
          return res
        }))
      }
      promises.value = list
    }

    return {
      promises,
      fetchMutiplePromise
    }
  }
})
</script>
```
:::

### Custom Css Style
Customize loading style through templateRef。
:::demo 

```vue
<template>
  <d-button
    :width="220"
    @click="showLoading1"
    style="margin-right: 8px; display: inline-block;">Loading Style 1</d-button>
    
  <d-button
    :width="220"
    v-dLoading="isShowLoading2"
    @click="showLoading2"
    :loadingTemplateRef="temp2"
    style="margin-right: 8px; display: inline-block;">Loading Style 2</d-button>

  <d-button
    v-dLoading="true"
    bsStyle="text"
    :width="220"
    :loadingTemplateRef="temp3"
    style="margin-right: 8px; display: inline-block;">Loading Style 3</d-button>

  <div
    style="height: 80px; line-height: 80px"
    v-dLoading="isShowLoading1"
    :loadingTemplateRef="temp1">loading will show here1</div>
</template>

<script>
import { defineComponent, ref, h } from 'vue'

export default defineComponent({
  setup() {
    const temp1 = h('div', {
      className: 'devui-infinity-loading'
    }, h('i', {
      className: 'icon-refresh'
    }))
    
    const temp2 = h('div', {
      className: 'devui-circle-loading-container-2'
    }, h('i', {
      className: 'icon-refresh'
    }))
    
    const temp3 = h('div', {
      className: 'devui-circle-loading-container-3'
    }, h('i', {
      className: 'icon-refresh'
    }))
    
    const isShowLoading1 = ref(false)
    const showLoading1 = () => {
      isShowLoading1.value = new Promise((res) => {
        setTimeout(() => {
          res(true)
        }, 1000)
      })
    }

    const isShowLoading2 = ref(false)
    const showLoading2 = () => {
      isShowLoading2.value = new Promise((res) => {
        setTimeout(() => {
          res(true)
        }, 1000)
      })
    }

    return {
      temp1,
      temp2,
      temp3,
      isShowLoading1,
      isShowLoading2,
      showLoading1,
      showLoading2
    }
  }
})
</script>

<style>
.devui-infinity-loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.devui-circle-loading-container-2 {
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
}

.devui-circle-loading-container-3 {
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
```
:::

### Service method call
Use the service method to load the loading component in full screen or load the loading component on the specified host。
:::demo 

```vue
<template>
  <d-button
    :width="220"
    @click="serviceToBody"
    style="margin-right: 8px; display: inline-block;">click me show full screen loading!</d-button>

  <d-button
    :width="200"
    v-if="isShow"
    @click="openTargetLoading"
    style="margin-right: 8px; display: inline-block;">click me show loading in target!</d-button>

  <d-button
    :width="200"
    v-else
    bsStyle="common"
    @click="closeTargetLoading"
    style="margin-right: 8px; display: inline-block;">click me close loading in target!</d-button>

  <div id="me" style="margin-top: 20px; width: 100%; height: 60px; padding: 10px;">loading will show here3</div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default {
  data() {
    return {
      isShow: true,
      resultTarget: null
    }
  },
  methods: {
    serviceToBody() {
      const results = this.$loadingService.open()

      setTimeout(() => {
        results.loadingInstance.close()
      }, 2000)
    },
    openTargetLoading() {
      this.resultTarget = this.$loadingService.open({
        target: document.querySelector('#me'),
        message: 'One moment please...',
        positionType: 'relative',
        zIndex: 1,
      })
      this.isShow = false
    },
    closeTargetLoading() {
      this.resultTarget.loadingInstance.close()
      this.isShow = true
    }
  }
}
</script>
```
:::

### parameter
The parameter of dLoading

| **parameter**           | **type**                                                     | **default**                  | **description**                                                     | **jump Demo**                |
| ------------------ | ------------------------------------------------------------ | ------------------------- | ------------------------------------------------------------ | ---------------------------- |
| v-dLoading         | `Promise<any> \| Array<Promise<any>> \| Boolean \| undefined` | --                        | Optional, command mode, control loading status                            | [Basic-usage](#Basic-usage)        |
| target             | `element`                                                      | document.body             | Optional, service mode, DOM nodes that need to be covered by Loading                  | [Service-method-call](#Service-method-call) |
| message            | `string`                                                       | --                        | Optional, prompt message during loading                                   | [many-promise](#many-promise)      |
| loadingTemplateRef | `VNode`                                                        | --                        | Optional, custom loading template                                    | [Custom-css-style](#Custom-css-style)     |
| backdrop           | `boolean`                                                      | true                      | Optional, whether to show the mask during loading                                 | [Basic-usage](#Basic-usage)        |
| positionType       | `string`                                                       | relative                  | Optional, specify the positioning type of the `dLoading` host element, the value is consistent with the css position attribute。 | [Basic-usage](#Basic-usage)        |
| view               | `{top?:string,left?:string} `                                  | {top: '50%', left: '50%'} | Optional, adjust the display position of loading, relative to the top and left distances of the host element | [Basic-usage](#Basic-usage)        |
| zIndex             | `number`                                                       | --                        | Optional, z-index value of loading prompt                           | [Basic-usage](#Basic-usage)        |

