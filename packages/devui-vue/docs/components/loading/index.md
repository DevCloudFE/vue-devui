# Loading 加载提示

提示用户页面正在执行指令，需要等待。

#### 何时使用

当执行指令时间较长（需要数秒以上）时，向用户展示正在执行的状态。

### 基本用法

展示加载表格数据的场景中的基本使用方法。
:::demo

```vue
<template>
  <d-button @click="fetchTableData" style="margin-top: 8px">click me!</d-button>
  <table
    v-d-loading="loadingStatus"
    :backdrop="true"
    position-type="relative"
    :view="{ top: '50%', left: '50%' }"
    :z-index="100"
    style="width: 100%; text-align: left;"
  >
    <thead>
      <tr>
        <th>序号</th>
        <th>姓名</th>
        <th>队伍</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(val, index) in datas" :key="index">
        <td>{{ index }}</td>
        <td>张家齐</td>
        <td>跳水</td>
        <td>跳水队</td>
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
        datas.push(1, 2, 3)
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

### 多 promise

支持多个 promise。
:::demo

```vue
<template>
  <d-button @click="fetchMutiplePromise" style="margin-top: 8px">click me!</d-button>

  <div
    v-d-loading="promises"
    message="One moment please..."
    style="margin-top: 20px; width: 100%; height: 80px; padding: 10px;"
  >
    loading will show here2
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const promises = ref([])
    const fetchMutiplePromise = () => {
      let list = []
      for (let i = 0; i < 3; i++) {
        list.push(
          new Promise((res, rej) => {
            setTimeout(() => {
              res(i)
            }, (i + 1) * 1000)
          }).then((res) => {
            return res
          })
        )
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

### 自定义样式

通过 templateRef 自定义 loading 样式。
:::demo

```vue
<template>
  <d-button @click="showLoading1" style="margin-right: 8px; display: inline-block; width: 220px;">
    Loading Style 1
  </d-button>

  <d-button
    v-d-loading="isShowLoading2"
    @click="showLoading2"
    :loading-template-ref="temp2"
    style="margin-right: 8px; display: inline-block; width: 220px;"
  >
    Loading Style 2
  </d-button>

  <d-button
    v-d-loading="true"
    variant="text"
    :loading-template-ref="temp3"
    style="margin-right: 8px; display: inline-block; width: 220px;"
  >
    Loading Style 3
  </d-button>

  <div
    style="height: 80px; line-height: 80px"
    v-d-loading="isShowLoading1"
    :loading-template-ref="temp1"
  >
    loading will show here1
  </div>
</template>

<script>
import { defineComponent, ref, h } from 'vue'

export default defineComponent({
  setup() {
    const temp1 = h(
      'div',
      {
        className: 'devui-infinity-loading'
      },
      h('i', {
        className: 'icon-refresh'
      })
    )

    const temp2 = h(
      'div',
      {
        className: 'devui-circle-loading-container-2'
      },
      h('i', {
        className: 'icon-refresh'
      })
    )

    const temp3 = h(
      'div',
      {
        className: 'devui-circle-loading-container-3'
      },
      h('i', {
        className: 'icon-refresh'
      })
    )

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

### 服务方式调用

使用服务的方式全屏加载 loading 组件或者在指定宿主上加载 loading 组件。
:::demo

```vue
<template>
  <d-button @click="serviceToBody" style="margin-right: 8px; display: inline-block; width: 220px;">
    click me show full screen loading!
  </d-button>

  <d-button
    v-if="isShow"
    @click="openTargetLoading"
    style="margin-right: 8px; display: inline-block; width: 200px;"
  >
    click me show loading in target!
  </d-button>

  <d-button
    v-else
    @click="closeTargetLoading"
    style="margin-right: 8px; display: inline-block; width: 200px;"
  >
    click me close loading in target!
  </d-button>

  <div id="me" style="margin-top: 20px; width: 100%; height: 60px; padding: 10px;">
    loading will show here3
  </div>
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
        zIndex: 1
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

### Loading 参数

| 参数名           | 类型                                                      | 默认                    | 说明                                                             | 跳转 Demo                 |
| :------------------ | :------------------------------------------------------------- | :--------------------------- | :--------------------------------------------------------------------- | :----------------------------- |
| v-d-loading         | `Promise<any>` \| <br>`Array<Promise<any>>` \| <br>`Boolean` \| <br>`undefined` | --                          | 可选，指令方式，控制 loading 状态                                     | [基本用法](#基本用法)         |
| target             | `element`                                                     | document.body               | 可选，服务方式，Loading 需要覆盖的<br> DOM 节点                           | [服务方式调用](#服务方式调用) |
| message            | `string`                                                      | --                          | 可选，loading 时的提示信息                                            | [多 promise](#多promise)      |
| loading-template-ref | `VNode`                                                       | --                          | 可选，自定义 loading 模板                                             | [自定义样式](#自定义样式)     |
| backdrop           | `boolean`                                                     | true                        | 可选，loading 时是否显示遮罩                                          | [基本用法](#基本用法)         |
| position-type       | `string`                                                      | relative                    | 可选，指定`dLoading`宿主元素的定位类型，<br>取值与 css position 属性一致。 | [基本用法](#基本用法)         |
| view               | {<br>&nbsp;&nbsp;top?: string, <br>&nbsp;&nbsp;left?: string <br>}                                 | {<br>&nbsp;&nbsp;top: '50%', <br>&nbsp;&nbsp;left: '50%'<br>} | 可选，调整 loading 的显示位置，<br>相对于宿主元素的顶部距离与左侧距离     | [基本用法](#基本用法)         |
| z-index             | `number`                                                      | --                          | 可选，loading 加载提示的 z-index 值                                   | [基本用法](#基本用法)         |
