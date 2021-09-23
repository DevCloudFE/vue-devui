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
import {ref, defineComponent} from 'vue';

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
      visible: visibleRef,
      open,
      buttons,
      data: {name: 'Tom', age: '10', address: 'Chengdu'}
    }
  }
})
</script>

```
:::
