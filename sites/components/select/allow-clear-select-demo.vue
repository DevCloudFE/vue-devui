<template>
  <d-select v-model="value1" :options="options1" :allow-clear="true" />
  <br>
  <d-select v-model="value2" :options="options2" :multiple="true" :allow-clear="true" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup () {
    const value1 = ref('')
    const options1 = reactive(['可以清除',2,3])
    let value2 = ref(['多选','当然','也可以','清除'])
    const options2 = reactive(['多选','当然','也可以','清除'])
    console.log(value2);
    

    return {
      value1,
      options1,
      value2,
      options2
    }
  },
})
</script>
