<template>
  <div class="example-source-wrapper">
    <div class="example-source" v-html="decoded" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
});

const decoded = computed(() => {
  return decodeURIComponent(props.source);
});
</script>

<style lang="scss">
.example-source {
  overflow-x: scroll;
  position: relative;
  color: #fff;
  padding: 1em;
}
</style>
