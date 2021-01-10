<template>
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
</template>

<script>
export default {
  name: 'app-demo-cell',
  data() {
    return {
      data: {
        name: 'Button',
        cnName: '按钮',
        description: '按钮用于开始一个即时操作，发起命令并获取结果，在特定场景中使用特定按钮形态',
        tmw: '标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。',
      },
      componentName: 'Button'
    };
  }
}
</script>