<template>
  <d-button
    variant="solid"
    :loading="showLoading"
    @click="handleClick"
  >
    Click Me
  </d-button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const showLoading = ref(false);
const handleClick = () => {
  showLoading.value = true;

  setTimeout(() => {
    showLoading.value = false;
  }, 2000);
};
</script>
