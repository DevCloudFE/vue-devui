# Loading 加载提示

提示用户页面正在执行指令，需要等待。

### 何时使用

当执行指令时间较长（需要数秒以上）时，向用户展示正在执行的状态。

### 参数

| **参数**           | **类型**                                                     | **默认**                  | **说明**                                                     | **跳转 Demo**                |
| ------------------ | ------------------------------------------------------------ | ------------------------- | ------------------------------------------------------------ | ---------------------------- |
| v-dLoading         | Promise\<any\> / Array\<Promise\<any\>\> / Boolean / undefined | --                        | 可选，指令方式，控制 loading 状态                            | [基本用法](#基本用法)        |
| target             | Element                                                      | document.body             | 可选，服务方式，Loading 需要覆盖的 DOM 节点                  | [服务方式调用](#服务方式调用) |
| message            | String                                                       | --                        | 可选，loading 时的提示信息                                   | [多promise](#多promise)      |
| loadingTemplateRef | VNode                                                        | --                        | 可选，自定义 loading 模板                                    | [自定义样式](#自定义样式)     |
| backdrop           | Boolean                                                      | true                      | 可选，loading 时是否显示遮罩                                 | [基本用法](#基本用法)        |
| positionType       | String                                                       | relative                  | 可选，指定`dLoading`宿主元素的定位类型,取值与 css position 属性一致。 | [基本用法](#基本用法)        |
| view               | {top?:string,left?:string}                                   | {top: '50%', left: '50%'} | 可选，调整 loading 的显示位置，相对于宿主元素的顶部距离与左侧距离 | [基本用法](#基本用法)        |
| zIndex             | Number                                                       | --                        | 可选，loading加载提示的 z-index 值                           | [基本用法](#基本用法)        |




### 基本用法
展示加载表格数据的场景中的基本使用方法。

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

```html
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

<script lang="ts">
import { defineComponent, ref, Ref, reactive } from 'vue'

export default defineComponent({
  setup() {
    const loadingStatus: Ref<boolean> = ref(false)
    const datas: Array<number> = reactive([])
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

### 多promise
支持多个promise。

<d-button @click="fetchMutiplePromise" style="margin-top: 8px">click me!</d-button>

<div
  v-dLoading="promises.value"
  :backdrop="true"
  message="One moment please..."
  style="margin-top: 20px; width: 100%; height: 80px; padding: 10px;"
>loading will show here2</div>

```html
<template>
  <d-button @click="fetchMutiplePromise" style="margin-top: 8px">click me!</d-button>

  <div
    v-dLoading="promises.value"
    message="One moment please..."
    style="margin-top: 20px; width: 100%; height: 80px; padding: 10px;"
  >loading will show here2</div>
</template>

<script lang="ts">
import { defineComponent, shallowReactive } from 'vue'

export default defineComponent({
  setup() {    
    const promises: any = shallowReactive({
      value: []
    })
    const fetchMutiplePromise = () => {
      let list = []
      for (let i = 0; i < 3; i++) {
        list.push(new Promise((res: Function, rej: Function) => {
          setTimeout(() => {
            res(i)
          }, (i + 1) * 1000)
        }).then((res: any) => {
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

### 自定义样式
通过 templateRef 自定义loading样式。

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

<div style="height: 80px; line-height: 80px" v-dLoading="isShowLoading1" :loadingTemplateRef="temp1">loading will show here1</div>

```html
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

<script lang="tsx">
import { defineComponent, ref, Ref, h } from 'vue'
import './customStyle.scss'

export default defineComponent({
  setup() {
    const temp1 = <div class="devui-infinity-loading"><i class="icon-refresh"></i></div>
    const temp2 = <div class="devui-circle-loading-container-2"><i class="icon-refresh"></i></div>
    const temp3 = <div class="devui-circle-loading-container-3"><i class="icon-refresh"></i></div>

    const isShowLoading1: Ref<Promise<unknown> | false> = ref(false)
    const showLoading1 = () => {
      isShowLoading1.value = new Promise((res: any) => {
        setTimeout(() => {
          res(true)
        }, 1000)
      })
    }

    const isShowLoading2: Ref<Promise<unknown> | false> = ref(false)
    const showLoading2 = () => {
      isShowLoading2.value = new Promise((res: any) => {
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
```
```scss
// ./customStyle.scss
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
```

### 服务方式调用
使用服务的方式全屏加载loading组件或者在指定宿主上加载loading组件。

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

```html
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

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { LoadingService } from 'vue-devui'

export default defineComponent({
  setup() {
    const serviceToBody = () => {
      const results = LoadingService.open()

      setTimeout(() => {
        results.loadingInstance.close()
      }, 2000)
    }

    const isShow = ref(true)
    let resultTarget: any
    const openTargetLoading = () => {
      resultTarget = LoadingService.open({
        target: document.querySelector('#me'),
        message: 'One moment please...',
        positionType: 'relative',
        zIndex: 1,
      })
      isShow.value = false
    }

    const closeTargetLoading = () => {
      resultTarget.loadingInstance.close()
      isShow.value = true
    }

    return {
      isShow,
      serviceToBody,
      openTargetLoading,
      closeTargetLoading
    }
  }
})
</script>
```

<script lang="tsx">
import { defineComponent, ref, Ref, reactive, shallowReactive, h } from 'vue'
import { LoadingService } from '../../../devui/vue-devui'
import './customStyle.scss'

export default defineComponent({
  setup() {
    // 基础使用
    const loadingStatus: Ref<boolean> = ref(false)
    const datas: Array<number> = shallowReactive([])
    const fetchTableData = () => {
      loadingStatus.value = true

      setTimeout(() => {
        datas.push(1,2,3)
        loadingStatus.value = false
      }, 2000)
    }
  
    // 多个promise
    const promises: any = shallowReactive({
      value: []
    })
    const fetchMutiplePromise = () => {
      let list = []
      for (let i = 0; i < 3; i++) {
        list.push(new Promise((res: Function, rej: Function) => {
          setTimeout(() => {
            res(i)
          }, (i + 1) * 1000)
        }).then((res: any) => {
          return res
        }))
      }
      promises.value = list
    }
    
    // 服务方式
    const serviceToBody = () => {
      const results = LoadingService.open()
    
      setTimeout(() => {
        results.loadingInstance.close()
      }, 2000)
    }
    
    const isShow = ref(true)
    let resultTarget: any
    const openTargetLoading = () => {
      resultTarget = LoadingService.open({
        target: document.querySelector('#me'),
        message: 'One moment please...',
        positionType: 'relative',
        zIndex: 1,
      })
      isShow.value = false
    }
    
    const closeTargetLoading = () => {
      resultTarget.loadingInstance.close()
      isShow.value = true
    }
    
    // 自定义样式
    const temp1 = <div class="devui-infinity-loading"><i class="icon-refresh"></i></div>
    const temp2 = <div class="devui-circle-loading-container-2"><i class="icon-refresh"></i></div>
    const temp3 = <div class="devui-circle-loading-container-3"><i class="icon-refresh"></i></div>
    
    const isShowLoading1: Ref<Promise<unknown> | false> = ref(false)
    const showLoading1 = () => {
      isShowLoading1.value = new Promise((res: any) => {
        setTimeout(() => {
          res(true)
        }, 1000)
      })
    }
    
    const isShowLoading2: Ref<Promise<unknown> | false> = ref(false)
    const showLoading2 = () => {
      isShowLoading2.value = new Promise((res: any) => {
        setTimeout(() => {
          res(true)
        }, 1000)
      })
    }
    
    return {
      // 基本使用
      datas,
      loadingStatus,
      fetchTableData,
    
      // 多promise
      promises,
      fetchMutiplePromise,
    
      // 服务方式
      isShow,
      serviceToBody,
      openTargetLoading,
      closeTargetLoading,
    
      // 自定义样式
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