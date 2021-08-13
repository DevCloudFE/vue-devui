<template>
  <d-select v-model="value" :options="options" :multiple="true" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup () {
    const value = ref([])
    const options = reactive([1,2,3])

    return {
      value,
      options
    }
  },
})
</script>
