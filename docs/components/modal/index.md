:::demo

```vue
<template>
  <d-button @click="open">打开 modal</d-button>
</template>
<script>
import {ref, defineComponent, inject, onMounted, h} from 'vue';
export default defineComponent({
  setup() {
    const modalservice = inject('MODAL_SERVICE_TOKEN');
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
        buttons: [
          {
            bsStyle: 'primary',
            text: 'Ok',
            disabled: false,
            handler: () => result.hide(),
          }, {
            id: 'btn-cancel',
            bsStyle: 'common',
            text: 'Cancel',
            handler: () => result.hide()
          },
        ]
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
  <d-modal 
    v-model="visible"
    :buttons="buttons"
    title="Start Snapshot Version"
  >
    <div>
      Modal Content
      <div>name: {{ data.name }}</div>
      <div>age: {{ data.age }}</div>
      <div>address: {{ data.address }}</div>
    </div>
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

