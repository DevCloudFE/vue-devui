<template>
  <div class="demo-block" :class="[customClass ? customClass : '']">
    <div class="source">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemoBlock',
  props: {
    customClass: String
  }
}
</script>

<style scoped>
.demo-block {
  margin: 10px 0;
}
.demo-block .source {
  border: solid 1px #ebebeb;
  border-radius: 3px;
  box-sizing: border-box;
  padding: 24px;
  transition: .2s;
}
</style>
