<template>
  <d-button
    variant="solid"
    :loading="showLoading"
    @click="handleClick"
  >
    Click Me
  </d-button>
</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    const showLoading = ref(false);

    const handleClick = () => {
      showLoading.value = true;

      setTimeout(() => {
        showLoading.value = false;
      }, 2000);
    };

    return { showLoading, handleClick };
  },
};
</script>
