
# Toast 全局通知

全局信息提示组件。

### 何时使用

当需要向用户全局展示提示信息时使用，显示数秒后消失。

### 基本用法

common 时不展示图标。

<section>
  <d-toast :value="msgs">
    <template v-slot:customTemplate="msg">
      <a class="devui-link" href="http://devui.huawei.com" target="_blank">Back to {{ msg.myInfo }} Home Page</a>
    </template>
  </d-toast>
  <d-button bsStyle="success" @click.native="showToast('success')">Success</d-button>
  <d-button bsStyle="warning" @click.native="showToast('warn')">Warn</d-button>
  <d-button bsStyle="danger" @click.native="showToast('error')">Error</d-button>
  <d-button bsStyle="primary" @click.native="showToast('multiple')">Multiple</d-button>
  <d-button bsStyle="common" @click.native="showToast('link')">link</d-button>
  <d-button bsStyle="common" @click.native="showToast('plainText')">pure text</d-button>
  <d-button bsStyle="common" @click.native="showToast('common')">common</d-button>
  <d-button bsStyle="warning" @click.native="showToast('noTitle')">no title</d-button>
</section>

```html
<section>
  <d-toast :value="msgs">
    <template v-slot:customTemplate="msg">
      <a class="devui-link" href="http://devui.huawei.com" target="_blank">Back to {{ msg.myInfo }} Home Page</a>
    </template>
  </d-toast>
  <d-button bsStyle="success" @click="showToast('success')">Success</d-button>
  <d-button bsStyle="warning" @click="showToast('warn')">Warn</d-button>
  <d-button bsStyle="danger" @click="showToast('error')">Error</d-button>
  <d-button bsStyle="primary" @click="showToast('multiple')">Multiple</d-button>
  <d-button bsStyle="common" @click="showToast('link')">link</d-button>
  <d-button bsStyle="common" @click="showToast('plainText')">pure text</d-button>
  <d-button bsStyle="common" @click="showToast('common')">common</d-button>
  <d-button bsStyle="warning" @click="showToast('noTitle')">no title</d-button>
</section>
```

```ts
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const msgs = ref<any[]>([])

    function showToast(type: any) {
      switch (type) {
        case 'link':
          msgs.value = [
            { severity: 'info', summary: 'Relative', detail: `<a href="/home" target="_blank">Back to Home Page</a>` },
            { severity: 'info', summary: 'Absolute', content: 'slot:customTemplate', myInfo: 'Devui' }
          ]
          break
        case 'multiple':
          msgs.value = [
            {
              severity: 'info',
              summary: 'Summary',
              content: 'This is a test text. This is a test text. This is a test text.'
            },
            {
              severity: 'info',
              summary: 'Summary',
              content: 'This is a test text. This is a test text. This is a test text.'
            }
          ]
          break
        case 'noTitle':
          msgs.value = [{ severity: 'warn', content: 'This is a test text. This is a test text. This is a test text.' }]
          break
        case 'plainText':
          msgs.value = [{ severity: 'info', content: 'data：<id:gc5aa71bfd86943db9e3e8f34dc347a15><label:content>' }]
          break
        default:
          msgs.value = [
            {
              severity: type,
              summary: 'Summary',
              content: 'This is a test text. This is a test text. This is a test text.'
            }
          ]
      }
    }

    return {
      msgs,
      showToast
    }
  }
})
```

### 超时时间

当设置超时时间、没有标题时，则不展示标题和关闭按钮。

<section>
  <d-toast :life="5000" :value="msgs2"></d-toast>
  <d-button bsStyle="success" @click.native="showToast2('success')">Success</d-button>
  <d-button bsStyle="warning" @click.native="showToast2('warn')">Warn</d-button>
  <d-button bsStyle="danger" @click.native="showToast2('error')">Error</d-button>
  <d-button bsStyle="common" @click.native="showToast2('common')">common</d-button>
</section>

```html
<section>
  <d-toast :life="5000" :value="msgs"></d-toast>
  <d-button bsStyle="success" @click="showToast('success')">Success</d-button>
  <d-button bsStyle="warning" @click="showToast('warn')">Warn</d-button>
  <d-button bsStyle="danger" @click="showToast('error')">Error</d-button>
  <d-button bsStyle="common" @click="showToast('common')">common</d-button>
</section>
```

```ts
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const msgs = ref<any[]>([])

    function showToast(type: any) {
      switch (type) {
        case 'error':
          msgs.value = [{ severity: type, content: 'This is a test text. This is a test text. This is a test text.' }]
          break
        case 'common':
          msgs.value = [{ severity: type, content: 'This is a test text. This is a test text. This is a test text.' }]
          break
        default:
          msgs.value = [
            {
              severity: type,
              summary: 'Summary',
              content: 'This is a test text. This is a test text. This is a test text.'
            }
          ]
      }
    }

    return {
      msgs,
      showToast
    }
  }
})
```

### 自定义样式

<br/>

<section>
  <d-toast :value="msgs3" :sticky="true" :style="{ top: '20px' }" :styleClass="'custom-class'"></d-toast>
  <d-button bsStyle="common" @click.stop="showToast3()">Custom Style</d-button>
</section>

```html
<section>
  <d-toast :value="msgs" :style="{ top: '20px' }" :styleClass="'custom-class'"></d-toast>
  <d-button bsStyle="common" @click="showToast()">Custom Style</d-button>
</section>
```

```scss
.custom-class {
  .devui-toast-item-container {
    color: #252b3a;
    background-color: #ffffff;

    .devui-toast-icon-close {
      top: 10px;
      right: 13px;

      & i.icon {
        color: #252b3a !important;
      }
    }

    .devui-toast-image {
      top: 15px;
    }

    .devui-toast-message {
      line-height: 23px;

      .devui-toast-title {
        font-size: 16px;
      }

      p {
        font-size: 14px;
      }
    }
  }
}
```

```ts
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const msgs = ref<any[]>([])

    function showToast() {
      msgs.value = [
        {
          severity: 'success',
          summary: 'Success',
          content: 'This is a test text. This is a test text. This is a test text.'
        }
      ]
    }

    return {
      msgs,
      showToast
    }
  }
})
```

### 每个消息使用单独的超时时间

当设置超时时间模式为 single 时，每个消息使用自身的 life 作为超时时间，如果未设置则按 severity 判断，severity 也未设置时默认超时时间为 5000 毫秒。

<section>
  <d-toast lifeMode="single" :value="msgs4"></d-toast>
  <d-button bsStyle="common" @click.native="showToast4()">Single</d-button>
</section>

```html
<section>
  <d-toast lifeMode="single" :value="msgs"></d-toast>
  <d-button bsStyle="common" @click="showToast()">Single</d-button>
</section>
```

```ts
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const msgs = ref<any[]>([])

    function showToast() {
      msgs.value = [
        { life: 3000, summary: 'Summary', content: 'This is a test text. This is a test text. This is a test text.' },
        {
          life: 6000,
          severity: 'info',
          summary: 'Summary',
          content: 'This is a test text. This is a test text. This is a test text.'
        },
        {
          severity: 'success',
          summary: 'Success',
          content: 'This is a test text. This is a test text. This is a test text.'
        },
        { severity: 'warn', summary: 'Warn', content: 'This is a test text. This is a test text. This is a test text.' }
      ]
    }

    return {
      msgs,
      showToast
    }
  }
})
```

### 服务方式调用

使用服务的方式创建 toast 全局通知。

<d-button @click.native="openToast()">click me show simplest toast!</d-button>
<d-button v-if="!isShow" @click.native="openToast2()" bsStyle="common">click me show customer toast!</d-button>
<d-button v-if="isShow" @click.native="closeToast2()">click me close customer toast!</d-button>
<d-button v-if="isShow" @click.native="closeToast3()" bsStyle="common">only close first customer toast!</d-button>

```html
<d-button @click.native="openToast()">click me show simplest toast!</d-button>
<d-button v-if="!isShow" @click.native="openToast2()" bsStyle="common">click me show customer toast!</d-button>
<d-button v-if="isShow" @click.native="closeToast2()">click me close customer toast!</d-button>
<d-button v-if="isShow" @click.native="closeToast3()" bsStyle="common">only close first customer toast!</d-button>
```

```ts
import { defineComponent, ref } from 'vue'
import { ToastService } from 'devui/toast'

export default defineComponent({
  setup() {
    const results = ref()

    function openToast2() {
      results.value = ToastService.open({
        value: [
          { severity: 'info', summary: 'summary', content: '1. I am content' },
          { severity: 'error', summary: 'summary', content: '2. I am content' },
          { severity: 'error', summary: 'summary', content: '3. I am content' }
        ],
        sticky: true,
        style: { width: '600px', color: 'red' },
        styleClass: 'myCustom-toast',
        life: 5000,
        lifeMode: 'global',
        /*
          接收发射过来的数据
        */
        onCloseEvent(value: any) {
          console.log('closeEvent', value)
        },
        onValueChange(value: any) {
          console.log('valueChange', value)
        }
      })

      console.log('results', results.value)

      isShow.value = true
    }

    function closeToast2() {
      results.value.toastInstance.close()
      isShow.value = false
    }

    function closeToast3() {
      /*
        1.可以根据指定下标关闭 results.value.toastInstance.close(0);
        2.可以根据value对象去关闭，作用跟1是等同的，如下所示：
      */
      results.value.toastInstance.close({ severity: 'info', summary: 'summary', content: '1. I am content' })
    }

    return {
      isShow,
      openToast,
      openToast2,
      closeToast2,
      closeToast3
    }
  }
})
```

### Toast Api

<DevuiApiTable :columns="tableColumns" :data="apiData" />

### Toast Event

<DevuiApiTable :columns="tableColumns" :data="eventData" />

### 接口 & 类型定义

Message

```ts
export interface Message {
  severity?: string // 预设值有 common、success、error、warn、info，超时时间参见 life 说明，未设置或非预设值时超时时间为 5000 毫秒，warn 和 error 为 10000 毫秒
  summary?: string // 消息标题。当设置超时时间，未设置标题时，不展示标题和关闭按钮
  detail?: string // 消息内容，推荐使用content替换
  content?: string | `slot:${string}` | (message: Message) => ReturnType<typeof h> // 消息内容，支持纯文本和插槽，推荐使用
  life?: number // 单个消息超时时间，需设置 lifeMode 为 single 。每个消息使用自己的超时时间，开启该模式却未设置时按 severity 判断超时时间
  id?: any // 消息ID
}
```

### Service 引入方式

```ts
import { ToastService } from 'devui'
```

### Service 使用

```ts
// 方式 1，局部引入 ToastService
ToastService.open({ xxx })

// 方式2，全局属性
app.config.globalProperties.$toastService.open({ xxx })
```

### Service Api

<DevuiApiTable :columns="tableColumns" :data="serviceData" />

<script lang="ts">
import { defineComponent, ref, h } from 'vue'
import { ToastService } from '../../../devui/toast'
import DevuiApiTable from '../../../devui/shared/devui-api-table'

export default defineComponent({
  components: { DevuiApiTable },
  setup() {
    const msgs = ref<any[]>([])

    function showToast(type: any) {
      switch (type) {
        case 'link':
          msgs.value = [
            { severity: 'info', summary: 'Relative', detail: `<a href="/home" target="_blank">Back to Home Page</a>` },
            { severity: 'info', summary: 'Absolute', content: 'slot:customTemplate', myInfo: 'Devui' }
          ];
          break;
        case 'multiple':
          msgs.value = [
            { severity: 'info', summary: 'Summary', content: 'This is a test text. This is a test text. This is a test text.' },
            { severity: 'info', summary: 'Summary', content: 'This is a test text. This is a test text. This is a test text.' }
          ];
          break;
        case 'noTitle':
          msgs.value = [{ severity: 'warn', content: 'This is a test text. This is a test text. This is a test text.' }];
          break;
        case 'plainText':
          msgs.value = [{ severity: 'info', content: 'data：<id:gc5aa71bfd86943db9e3e8f34dc347a15><label:content>' }];
          break;
        default:
          msgs.value = [{ severity: type, summary: 'Summary', content: 'This is a test text. This is a test text. This is a test text.' }];
      }
    }

    const msgs2 = ref<any[]>([])

    function showToast2(type: any) {
      switch (type) {
        case 'error':
          msgs2.value = [{ severity: type, content: 'This is a test text. This is a test text. This is a test text.' }];
          break;
        case 'common':
          msgs2.value = [{ severity: type, content: 'This is a test text. This is a test text. This is a test text.' }];
          break;
        default:
          msgs2.value = [{ severity: type, summary: 'Summary', content: 'This is a test text. This is a test text. This is a test text.' }];
      }
    }


    const msgs3 = ref<any[]>([])

    function showToast3() {
      msgs3.value = [
        { severity: 'success', summary: 'Success', content: 'This is a test text. This is a test text. This is a test text.' },
      ];
    }

    const msgs4 = ref<any[]>([])

    function showToast4() {
      msgs4.value = [
        { life: 3000, summary: 'Summary', content: 'This is a test text. This is a test text. This is a test text.' },
        { life: 6000, severity: 'info', summary: 'Summary', content: 'This is a test text. This is a test text. This is a test text.' },
        { severity: 'success', summary: 'Success', content: 'This is a test text. This is a test text. This is a test text.' },
        { severity: 'warn', summary: 'Warn', content: 'This is a test text. This is a test text. This is a test text.' },
      ];
    }

    const isShow = ref(false)

    function openToast() {
      const results = ToastService.open({
        value: [{ severity: 'info', summary: 'summary', content: () => h('p', 2132131) }],
      });
      console.log('results', results);
    }

    const results = ref()

    function openToast2() {
      results.value = ToastService.open({
        value: [
          { severity: 'info', summary: 'summary', content: '1. I am content' },
          { severity: 'error', summary: 'summary', content: '2. I am content' },
          { severity: 'error', summary: 'summary', content: '3. I am content' },
        ],
        sticky: true,
        style: { width: '600px', color: 'red' },
        styleClass: 'myCustom-toast',
        life: 5000,
        lifeMode: 'global',
        /*
          接收发射过来的数据
        */
        onCloseEvent(value: any) {
          console.log('closeEvent', value)
        },
        onValueChange(value: any) {
          console.log('valueChange', value)
        }
      });

      console.log('results', results.value);

      isShow.value = true;
    }

    function closeToast2() {
      results.value.toastInstance.close();
      isShow.value = false;
    }

    function closeToast3() {
      /*
        1.可以根据指定下标关闭 results.value.toastInstance.close(0);
        2.可以根据value对象去关闭，作用跟1是等同的，如下所示：
      */
      results.value.toastInstance.close({ severity: 'info', summary: 'summary', content: '1. I am content' });
    }

    const tableColumns = [
      { key: 'key', title: '参数' },
      { key: 'type', title: '类型' },
      { key: 'value', title: '默认' },
      { key: 'desc', title: '说明' },
      { key: 'turn', title: '跳转', type: 'turn' }
    ]

    const apiData = [
      { key: 'value', type: 'Array<Message>', value: '[]', desc: '必选，消息内容数组，Message 对象定义见下文', turn: '基本用法' },
      { key: 'life', type: 'number', value: '5000', desc: '可选，超时时间，超时后自动消失，鼠标悬停可以阻止消失，单位毫秒。普通、成功、提示类默认为 5000 毫秒，错误、警告类默认为 10000 毫秒', turn: '超时时间' },
      { key: 'lifeMode', type: 'string', value: 'global', desc: '可选，超时时间模式，预设值为 global 和 single 。默认为 global，所有消息使用 life 或群组第一个消息的预设超时时间； 设置为 single 时， 每个消息使用自身的超时时间，参见 Message 中的 life 定义', turn: '每个消息使用单独的超时时间' },
      { key: 'sticky', type: 'boolean', value: 'false', desc: '可选，是否常驻，默认自动关闭', turn: '' },
      { key: 'style', type: 'object', value: '-', desc: '可选，样式', turn: '自定义样式' },
      { key: 'styleClass', type: 'string', value: '-', desc: '可选，类名', turn: '自定义样式' }
    ]


    const eventData = [
      { key: 'closeEvent', type: '(message: Message) => void', value: '-', desc: '消息关闭回调。', turn: '服务方式调用' },
      { key: 'valueChange', type: '(messages: Message[]) => void', value: '-', desc: '消息关闭后剩余消息回调。', turn: '服务方式调用' }
    ]

    const serviceData = [
      { key: 'value', type: 'Array<Message>', value: '[]', desc: '必选，消息内容数组，Message 对象定义见下文', turn: '服务方式调用' },
      { key: 'life', type: 'number', value: '5000', desc: '可选，超时时间，超时后自动消失，鼠标悬停可以阻止消失，单位毫秒。普通、成功、提示类默认为 5000 毫秒，错误、警告类默认为 10000 毫秒', turn: '服务方式调用' },
      { key: 'lifeMode', type: 'string', value: 'global', desc: '可选，超时时间模式，预设值为 global 和 single 。默认为 global，所有消息使用 life 或群组第一个消息的预设超时时间； 设置为 single 时， 每个消息使用自身的超时时间，参见 Message 中的 life 定义', turn: '服务方式调用' },
      { key: 'sticky', type: 'boolean', value: 'false', desc: '可选，是否常驻，默认自动关闭', turn: '服务方式调用' },
      { key: 'style', type: 'object', value: '-', desc: '可选，样式', turn: '服务方式调用' },
      { key: 'styleClass', type: 'string', value: '-', desc: '可选，类名', turn: '服务方式调用' },
      { key: 'onCloseEvent', type: '(message: Message) => void', value: '-', desc: '事件 closeEvent 回调', turn: '服务方式调用' },
      { key: 'valueChange', type: '(messages: Message[]) => void', value: '-', desc: '事件 valueChange 回调', turn: '服务方式调用' }
    ]

    return {
      tableColumns,
      apiData,
      eventData,
      serviceData,
      msgs,
      msgs2,
      msgs3,
      msgs4,
      showToast,
      showToast2,
      showToast3,
      showToast4,
      isShow,
      openToast,
      openToast2,
      closeToast2,
      closeToast3
    }
  }
})
</script>

<style lang="scss">
.custom-class {
  .devui-toast-item-container {
    color: #252b3a;
    background-color: #ffffff;

    .devui-toast-icon-close {
      top: 10px;
      right: 13px;

      & i.icon {
        color: #252b3a !important;
      }
    }

    .devui-toast-image {
      top: 15px;
    }

    .devui-toast-message {
      line-height: 23px;

      .devui-toast-title {
        font-size: 16px;
      }

      p {
        font-size: 14px;
      }
    }
  }
}
</style>
