<template>
  <div class="wrapper">
    <div id="menuLink" class="menu-link">
      <span></span>
    </div>
    <div class="devui-components-search">
      <!--TODO: 搜索框-->
    </div>
    <div class="sidebar">
      <ul class="devui-menu" style="margin-bottom: 0">
        <li class="devui-menu-item">
          <a href="/get-start">快速开始</a>
        </li>
        <li class="devui-menu-item">
          <a href="/color" style="position: relative"
            >颜色变量
            <sup class="devui-beta-label">Beta</sup>
          </a>
        </li>
        <li class="devui-menu-item">
          <a href="/theme-guide" style="position: relative">主题化使用指南 </a>
        </li>
      </ul>
      <nav class="side-nav">
        <!--TODO: 左侧组件导航-->
      </nav>
    </div>
    <div class="doc-viewer-container">
      <div class="main">
        <!--TODO: 文档主体内容-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'app-content'
}
</script>

<style lang="scss">
  
</style>