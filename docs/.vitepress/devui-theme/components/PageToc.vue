<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToc } from '../composables/useToc'
import { useActiveSidebarLinks } from '../composables/active-bar'

const headers = useToc()
const marker = ref()
const container = ref()
// 滚动监听
useActiveSidebarLinks(container, marker)
</script>

<template>
  <aside ref="container">
    <nav class="devui-content-nav">
      <h3 class="devui-fast-forward">快速前往</h3>
      <ul class="devui-step-nav">
        <li
          v-for="{ link, text } in headers"
          :key="link"
          class="devui-item"
        >
          <a class="devui-link" :href="link">{{ text }}</a>
        </li>
      </ul>
      <div ref="marker" class="devui-marker"></div>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
@import '@devui/styles-var/devui-var';
//内容区导航样式
.devui-content-nav {
  width: 240px;
  position: fixed;
  top: 50px;
  right: 0;
  height: 100%;
  z-index: 1;

  .devui-fast-forward {
    width: 130px;
    font-size: $devui-font-size-card-title;
    color: $devui-text;
    line-height: 24px;
    font-weight: bold;
    padding-bottom: 10px;
    margin-left: 20px;
    border-bottom: 1px solid $devui-dividing-line;
  }

  .devui-step-nav {
    margin-top: 10px;

    & > li {
      list-style: none;
      // padding-left: 20px;
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      font-size: $devui-font-size;
      color: $devui-text;
      position: relative;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      a {
        display: block;
        width: 110px;
        overflow: hidden;
        color: $devui-text;
        white-space: nowrap;
        text-overflow: ellipsis;
        -webkit-transition: all .3s ease;
        transition: all .3s ease;

      }
      a.current {
        color: $devui-link;
      }
    }
  }
}

.active {
  color: $devui-link !important;
}

@media (max-width: 1800px) {
  .devui-content-nav {
    width: 150px;
  }

  .devui-content-layout {
    padding: 0 15% 0 8%;
  }
}


@media (max-width: 1250px) {
  .devui-content-nav {
    display: none;
  }
}

@media (max-width: 1024px) {
  .devui-content-layout {
    width: 100%;
    margin-left: 0;
    transition: all 0.2s ease-out;
  }
}
</style>
