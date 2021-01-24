<template>
  <div class="main">
    <div class="docs-header">
      <h1>{{ data.name || componentName }} {{ data.cnName }}</h1>
      <div style="margin-bottom: 40px;">{{ data.description }}</div>
      <div v-if="data.tmw">
        <h3>何时使用</h3>
        <div style="margin-bottom: 20px;">{{ data.tmw }}</div>
      </div>
      <!-- TODO: d-tabs -->
    </div>
    <div class="examples-viewer">
      <div class="examples-viewer-wrapper">
        <!-- TODO: Demo列表 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-demo-cell',
  data() {
    return {
      data: {},
      componentName: ''
    };
  },
  mounted() {
    this.data = this.$route.meta;
  },
}
</script>