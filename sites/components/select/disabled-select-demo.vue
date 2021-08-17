<template>
  <d-select v-model="value1" :options="options1" :disabled="true" />
  <br>
  <d-select v-model="value2" :options="options2" option-disabled-key="disabled" />
  <br>
  <d-select v-model="value3" :options="options3" :multiple="true" option-disabled-key="disabled" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup () {
    const value1 = ref('动不了啦')
    const options1 = reactive(['动不了啦'])

    const value2 = ref('')
    const options2 = reactive([
        {
            value: '试试'
        }, {
            value: '试试就逝世',
            disabled: true
        }
    ])

    const value3 = ref('')
    const options3 = reactive([
        {
            name: '多选',
            value: 0
        }, {
            name: '多选很重要呢',
            value: 1,
            disabled: true
        }, {
            name: '多选真的很重要呢',
            value: 2,
            disabled: false
        }
    ])

    return {
      value1,
      options1,
      value2,
      options2,
      value3,
      options3
    }
  },
})
</script>
