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
        dialogType: 'success',
        buttons: [{
          btnStyle: 'primary',
          text: 'Ok',
          disabled: true,
          handler: () => result.hide(),
        }, {
          btnStyle: 'common',
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


:::demo

```vue
<template>
  <d-button @click="open">打开 modal</d-button>
  <d-modal v-model="visible" :backdropCloseable="true">
  </d-modal>
</template>
<script>
import {ref, defineComponent, inject, onMounted, h} from 'vue';
export default defineComponent({
  setup() {
    const visibleRef = ref(false);
    const open = () => {
      visibleRef.value = true;
    }
    const close = () => {
      visibleRef.value = false;
    }
    const buttons = [
      {
        bsStyle: 'primary',
        text: 'Ok',
        disabled: false,
        handler: close,
      }, {
        id: 'btn-cancel',
        bsStyle: 'common',
        text: 'Cancel',
        handler: close
      },
    ];
    return {
      open,
      visible: visibleRef,
      buttons,
      data: {name: 'Tom', age: '10', address: 'Chengdu'}
    }
  }
})
</script>

```
:::

