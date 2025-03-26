<template>
  <div class="demo-between">
    <d-button icon="arrow-left">
      Prev
    </d-button>
    <d-button
      icon="arrow-right"
      variant="solid"
      icon-pos="right"
    >
      Next
    </d-button>
  </div>
</template>

<style scoped>
.demo-between {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}
</style>
