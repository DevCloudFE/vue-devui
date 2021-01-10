<template>
  <button
    @click="onClick"
  >
    <span class="button-content"><slot></slot></span>
  </button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-button',
  emits: ['click'],
  setup(props, ctx) {
    const onClick = event => {
      ctx.emit('click', event)
    }
  },
})
</script>