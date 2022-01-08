# Modal 模态弹窗
模态对话框。
### 何时使用
1.需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。

2.弹窗起到与用户进行交互的作用，用户可以在对话框中输入信息、阅读提示、设置选项等操作。

#### 标准对话框
使用dialogService可拖拽的标准对话框。
:::demo
```vue
<template>
  <d-button @click="open">打开 modal</d-button>
</template>
<script>
import {ref, defineComponent, inject, onMounted, h} from 'vue';
export default defineComponent({
  setup() {
    const modalservice = inject('DIALOG_SERVICE_TOKEN');
    const open = () => {
      const result = modalservice.open({
        title: 'Start Snapshot Version',
        content: () => (
          h('div', {}, [
            'Modal Content',
            h('div', {}, ['name: Tom']),
            h('div', {}, ['age: 10']),
            h('div', {}, ['address: Chengdu']),
          ])
        ),
        buttons: [{
          variant: 'primary',
          text: 'Ok',
          handler: () => result.hide(),
        }, {
          variant: 'common',
          text: 'Cancel',
          handler: () => result.hide()
        }]
      });
    }
    return {
      open,
    }
  }
})
</script>
```
:::

#### 自定义对话框
使用modalService可以自定义对话框内的所有内容。
:::demo

```vue
<template>
  <div>👷施工中</div>
</template>
<script>
import {ref, defineComponent, inject, onMounted, h} from 'vue';
export default defineComponent({
  setup() {
  }
})
</script>

```
:::

#### 拦截对话框关闭
通过 beforeHidden 设置在关闭弹出框时的拦截方法。
:::demo

```vue
<template>
  <d-button variant="common" @click="open">click me!</d-button>
</template>
<script>
import {ref, defineComponent, inject, onMounted, h} from 'vue';
export default defineComponent({
  setup() {
    const dialogService = inject('DIALOG_SERVICE_TOKEN');
    const open = () => {
      const result = dialogService.open({
        title: 'Start Snapshot Version',
        content: () => (
          h('div', {}, [
            'Modal Content',
            h('div', {}, ['name: Tom']),
            h('div', {}, ['age: 10']),
            h('div', {}, ['address: Chengdu']),
          ])
        ),
        dialogtype: 'standard',
        beforeHidden: beforeHidden,
        backdropCloseable: true,
        buttons: [{
          variant: 'primary',
          text: 'Save',
          handler: () => result.hide(),
        }]
      });
    }

    const beforeHidden = () => {
      return new Promise((resolve) => {
        const results = dialogService.open({
          width: '300px',
          maxHeight: '600px',
          title: '',
          content: () => 'Do you want to save the modification before closing the page?',
          backdropCloseable: false,
          dialogtype: 'warning',
          buttons: [{
            variant: 'primary',
            text: 'Save',
            handler() {
              results.hide();
              resolve(true);
            }
          }, {
            variant: 'common',
            text: 'Cancel',
            handler() {
              results.hide();
              resolve(true);
            }
          }]
        });
      });
    }

    return { open };
  }
})
</script>

```
:::


#### 信息提示
各种类型的信息提示框。
:::demo
```vue
<template>
  <div class="btn-group">
    <d-button variant="common" @click="open('success', '成功', 'Delete [Git] repository successfully.')">success</d-button>
    <d-button variant="common" @click="open('failed', '错误', 'It is failed. if you want to resolve it,please contact the supportor.')">fail</d-button>
    <d-button variant="common" @click="open('warning', '警告', 'Leaving this page!')">warning</d-button>
    <d-button variant="common" @click="open('info', '提示', 'You signed in with another tab or window. Reload to refresh your session.')">info</d-button>
  </div>
</template>
<script>
import {ref, defineComponent, inject, onMounted, h} from 'vue';
export default defineComponent({
  setup() {
    const dialogService = inject('DIALOG_SERVICE_TOKEN');
    const open = (type, title, content) => {
      const result = dialogService.open({
        title,
        content: () => h('span', {style: {fontSize: '12px'} }, content),
        dialogType: type,
        backdropCloseable: true,
        buttons: [{
          variant: 'primary',
          text: 'Save',
          handler: () => result.hide(),
        }]
      });
    }

    return { open };
  }
})
</script>
<style>
  .btn-group > * {
    margin-right: 8px;
  }
</style>
```
:::

#### 更新标准弹出框按钮状态
通过update方法来更新dialog配置的buttons配置。
:::demo
```vue
<template>
  <d-button @click="open">打开 modal</d-button>
</template>
<script>
import {ref, defineComponent, inject, onMounted, h} from 'vue';
export default defineComponent({
  setup() {
    const modalservice = inject('DIALOG_SERVICE_TOKEN');
    const open = () => {
      const result = modalservice.open({
        title: 'Start Snapshot Version',
        content: () => (
          h('div', {
            onMouseover() {
              result.updateButtonOptions([{disabled: true}]);
            }
          }, [
            'Modal Content',
            h('div', {}, ['name: Tom']),
            h('div', {}, ['age: 10']),
            h('div', {}, ['address: Chengdu']),
          ])
        ),
        buttons: [{
          variant: 'primary',
          text: 'Ok',
          handler: () => result.hide(),
        }, {
          variant: 'common',
          text: 'Cancel',
          handler: () => result.hide()
        }]
      });
    }
    return {
      open,
    }
  }
})
</script>
```
:::

#### 配置按钮自动获得焦点
配置dialogService的buttons中的autofocus属性可以设置按钮自动获得焦点，可以通过回车直接触发按钮点击。
:::demo
```vue
<template>
  <d-button @click="open">打开 modal</d-button>
</template>
<script>
import {ref, defineComponent, inject, onMounted, h} from 'vue';
export default defineComponent({
  setup() {
    const modalservice = inject('DIALOG_SERVICE_TOKEN');
    const open = () => {
      const result = modalservice.open({
        title: 'Start Snapshot Version',
        content: () => (
          h('div', {
            onMouseover() {
              result.updateButtonOptions([{disabled: true}]);
            }
          }, [
            'Modal Content',
            h('div', {}, ['name: Tom']),
            h('div', {}, ['age: 10']),
            h('div', {}, ['address: Chengdu']),
          ])
        ),
        buttons: [{
          variant: 'primary',
          text: 'Ok',
          autofocus: true,
          handler: () => result.hide(),
        }, {
          variant: 'common',
          text: 'Cancel',
          handler: () => result.hide()
        }]
      });
    }
    return {
      open,
    }
  }
})
</script>
```
:::

#### 通过外层fixed同时避免滚动和抖动
通过外层fixed同时避免滚动和抖动，在使用这种方式时，页面内所有fixed元素需要给定具体的位置值，使用默认定位值会导致位置偏移。
:::demo
```vue
<template>
  <d-button @click="open">打开 modal</d-button>
</template>
<script>
import {ref, defineComponent, inject, onMounted, h} from 'vue';
export default defineComponent({
  setup() {
    const modalservice = inject('DIALOG_SERVICE_TOKEN');
    const open = () => {
      const result = modalservice.open({
        bodyScrollable: false,
        title: 'Start Snapshot Version',
        content: () => (
          h('div', {}, [
            'Modal Content',
            h('div', {}, ['name: Tom']),
            h('div', {}, ['age: 10']),
            h('div', {}, ['address: Chengdu']),
          ])
        ),
        buttons: [{
          variant: 'primary',
          text: 'Ok',
          handler: () => result.hide(),
        }, {
          variant: 'common',
          text: 'Cancel',
          handler: () => result.hide()
        }]
      });
    }
    return {
      open,
    }
  }
})
</script>
```
:::


### API
Modal 和 Dialog 均以 service 方式来构造。

他们通过这种方式引入：
```vue

{
  setup() {
    const modalService = inject('MODAL_SERVICE_TOKEN');
    const dialogService = inject('DIALOG_SERVICE_TOKEN');
  }
}
```
#### Modal

ModalService.open(props: ModalOptions)

ModalOptions 属性

|       属性        |                           类型                            |   默认   | 说明                                             |
| :---------------: | :-------------------------------------------------------: | :------: | :----------------------------------------------- |
|       width       |                         `string`                          |    --    | 可选，弹出框宽度(e.g '300px')                    |
|      zIndex       |                         `number`                          |   1050   | 可选，弹出框 z-index 值                          |
|  backdropZIndex   |                         `number`                          |   1049   | 可选，如果为 true，背景不能滚动                  |
|     placement     |              `'center' \| 'top' \| 'bottom'`              | 'center' | 可选，弹出框出现的位置                           |
|      offsetX      |                         `string`                          |  '0px'   | 可选，弹出框纵向偏移                             |
|      offsetY      |                         `string`                          |  '0px'   | 可选，弹出框横向偏移                             |
|  bodyScrollable   |                         `boolean`                         |   true   | 可选，modal 打开后，body是否可滚动，默认可滚动。 |
| backdropCloseable |                         `boolean`                         |   true   | 可选，点击空白处是否能关闭弹出框                 |
|   showAnimation   |                         `boolean`                         |   true   | 可选，是否显示动画                               |
|     escapable     |                         `boolean`                         |   true   | 可选，点击背景触发的事件                         |
|      content      |                          `Slot`                           |   true   | 可选，弹出框内容                                 |
|      onClose      |                       `() => void`                        |    --    | 可选，弹出框关闭之后回调的函数                   |
|   beforeHidden    | `(() => Promise<boolean> \| boolean) \| Promise<boolean>` |    --    | 可选，关闭窗口之前的回调                         |

#### Dialog

DialogService.open(props: DialogOptions)

DialogOptions 属性

|       属性        |                           类型                            |    默认    | 说明                                                   |
| :---------------: | :-------------------------------------------------------: | :--------: | :----------------------------------------------------- |
|       width       |                         `string`                          |     --     | 可选，弹出框宽度(e.g '300px')                          |
|      zIndex       |                         `number`                          |    1050    | 可选，弹出框 z-index 值                                |
|  backdropZIndex   |                         `number`                          |    1049    | 可选，如果为 true，背景不能滚动                        |
|     placement     |              `'center' \| 'top' \| 'bottom'`              |  'center'  | 可选，弹出框出现的位置                                 |
|      offsetX      |                         `string`                          |   '0px'    | 可选，弹出框纵向偏移                                   |
|      offsetY      |                         `string`                          |   '0px'    | 可选，弹出框横向偏移                                   |
|  bodyScrollable   |                         `boolean`                         |    true    | 可选，modal 打开后，body是否可滚动，默认可滚动。       |
| backdropCloseable |                         `boolean`                         |    true    | 可选，点击空白处是否能关闭弹出框                       |
|   showAnimation   |                         `boolean`                         |    true    | 可选，是否显示动画                                     |
|     escapable     |                         `boolean`                         |    true    | 可选，点击背景触发的事件                               |
|     draggable     |                         `boolean`                         |    true    | 可选，弹出框是否可拖拽                                 |
|    dialogType     |   `'standard'\|'success'\|'failed'\|'warning'\|'info'`    | 'standard' | 可选，弹出框类型，有四种选择                           |
|       title       |                         `string`                          |     --     | 可选，弹出框 title                                     |
|      content      |                          `Slot`                           |     --     | 可选，弹出框内容，支持字符串和组件                     |
|      buttons      |                     `ButtonOptions[]`                     |     []     | 可选，弹出框按钮，支持自定义文本、样式、禁用、点击事件 |
|      onClose      |                       `() => void`                        |     --     | 可选，弹出框关闭之后回调的函数                         |
|   beforeHidden    | `(() => Promise<boolean> \| boolean) \| Promise<boolean>` |     --     | 可选，关闭窗口之前的回调                               |

### Other

ButtonOptions 定义
|   属性    |           类型            | 默认  | 说明               |
| :-------: | :-----------------------: | :---: | :----------------- |
|   text    |         `string`          |  --   | 可选，按钮文本内容 |
|  handler  | `($event: Event) => void` |  --   | 可选，按钮点击事件 |
| autofocus |         `boolean`         | false | 可选，自动聚焦     |
| disabled  |         `boolean`         | false | 可选，禁用按钮     |

