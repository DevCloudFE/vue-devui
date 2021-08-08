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

<script lang="ts">
import { defineComponent, ref, Ref, h } from 'vue'
import ShowLoading1 from './showLoading1.tsx'
import ShowLoading2 from './showLoading2.tsx'
import ShowLoading3 from './showLoading3.tsx'

export default defineComponent({
  setup() {
    const temp1 = h(ShowLoading1)
    const temp2 = h(ShowLoading2)
    const temp3 = h(ShowLoading3)

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

```tsx
// ./showLoading1.tsx
import { defineComponent } from 'vue'
import './customStyle.scss'

export default defineComponent({
  render() {
    return (
      <div class="devui-infinity-loading">
        <svg
          width="64px"
          height="64px"
          viewBox="0 0 64 64"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <linearGradient x1="-5.25355109%" y1="50%" x2="105.311016%" y2="50%" id="devui-loading-infinity-linearGradient">
              <stop stop-color="#1186FF" offset="0%"></stop>
              <stop stop-color="#1186FF" offset="13.2017232%"></stop>
              <stop stop-color="#FF5AB1" offset="87.0821974%"></stop>
              <stop stop-color="#FF5AB1" offset="100%"></stop>
            </linearGradient>
          </defs>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
            <path
              d="M32.8273356,32.0651475 C38.9215537,24.0217158 44.200047,20 48.6627517,20 C55.4764195,20 61,25.5964615 61,32.4999677 C61,39.4036031 55.4764195,45 48.6627517,45 C44.258896,45 39.0606745,41.0837108 33.0680872,33.2510678 L31.8765067,31.6765806 C25.9073188,23.8921935 20.7275235,20 16.3372483,20 C9.52358054,20 4,25.5964615 4,32.4999677 C4,39.4036031 9.52358054,45 16.3372483,45 C20.7979128,45 26.0734732,40.9820956 32.164057,32.9462221 L32.8273356,32.0651475 Z"
              id="infinity-bg"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-miterlimit="10"
              stroke="#3B5885"
              stroke-width="5"
              opacity="0.200000003"
            ></path>
            <path
              d="M32.8273356,32.0651475 C38.9215537,24.0217158 44.200047,20 48.6627517,20 C55.4764195,20 61,25.5964615 61,32.4999677 C61,39.4036031 55.4764195,45 48.6627517,45 C44.258896,45 39.0606745,41.0837108 33.0680872,33.2510678 L31.8765067,31.6765806 C25.9073188,23.8921935 20.7275235,20 16.3372483,20 C9.52358054,20 4,25.5964615 4,32.4999677 C4,39.4036031 9.52358054,45 16.3372483,45 C20.7979128,45 26.0734732,40.9820956 32.164057,32.9462221 L32.8273356,32.0651475 Z"
              stroke="url(#devui-loading-infinity-linearGradient)"
              stroke-width="5"
              id="infinity-outline"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-miterlimit="10"
            ></path>
          </g>
        </svg>
      </div>
    )
  }
})
```
```tsx
// ./showLoading2.tsx
import { defineComponent } from 'vue'
import './customStyle.scss'

export default defineComponent({
  render() {
    return (
      <div class="devui-circle-loading-container">
        <svg
          class="devui-circle-loading"
          width="16px"
          height="16px"
          viewBox="0 0 16 16"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.600000024" stroke-linecap="round">
            <circle transform="rotate(90,8,8)" stroke="#FFFFFF" stroke-width="2" cx="8" cy="8" r="6"></circle>
          </g>
        </svg>
      </div>
    )
  }
})
```
```tsx
// ./showLoading3.tsx
import { defineComponent } from 'vue'
import './customStyle.scss'

export default defineComponent({
  render() {
    return (
      <div class="devui-circle-loading-container-2">
        <svg
          class="devui-circle-loading"
          width="16px"
          height="16px"
          viewBox="0 0 16 16"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <linearGradient x1="-4.49677665%" y1="50%" x2="105.739916%" y2="50%" id="devui-loading-circle-linearGradient">
              <stop stop-color="#2276FD" offset="0%"></stop>
              <stop stop-color="#6BD5FF" offset="100%"></stop>
            </linearGradient>
          </defs>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
            <circle
              transform="rotate(90,8,8)"
              stroke="url(#devui-loading-circle-linearGradient)"
              stroke-width="2"
              cx="8"
              cy="8"
              r="6"
            ></circle>
          </g>
        </svg>
      </div>
    )
  }
})
```
```scss
// ./customStyle.scss
$len: 170px;
$time: 1800ms;

.devui-infinity-loading {
  svg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
}

#infinity-outline {
  stroke-dasharray: $len * 0.01, $len;
  stroke-dashoffset: 0;
  animation: anim $time linear infinite;
  opacity: 1;
}

#infinity-bg {
  stroke: #3b5885;
}

@keyframes anim {
  0% {
    stroke-dasharray: $len * 0, $len;
    stroke-dashoffset: -$len * 0;
  }

  55% {
    stroke-dasharray: $len * 0.24, $len;
    stroke-dashoffset: -$len * 0.36;
  }

  100% {
    stroke-dasharray: -$len * 0.93, $len;
    stroke-dashoffset: -$len * 0.93;
  }
}

.devui-circle-loading-container {
  position: absolute;
  top: 5px;
  left: 0;
}

.devui-circle-loading-container-2 {
  position: absolute;
  right: -20px;
  top: 5px;
}

.devui-circle-loading {
  animation: loadingCircle 1s linear infinite;
}

@keyframes loadingCircle {
  0% {
    stroke-dasharray: 1, 50;
    stroke-dashoffset: 0;
  }

  60% {
    stroke-dasharray: 30, 50;
    stroke-dashoffset: -30;
  }

  100% {
    stroke-dasharray: 1, 50;
    stroke-dashoffset: -50;
  }
}

.loading-container {
  height: 150px;
}
```



<script lang="tsx">
import { defineComponent, ref, Ref, reactive, shallowReactive, h } from 'vue'
import { LoadingService } from '../../../devui/vue-devui'
import ShowLoading1 from './showLoading1.tsx'
import ShowLoading2 from './showLoading2.tsx'
import ShowLoading3 from './showLoading3.tsx'

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
    const temp1 = h(ShowLoading1)
    const temp2 = h(ShowLoading2)
    const temp3 = h(ShowLoading3)
    
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