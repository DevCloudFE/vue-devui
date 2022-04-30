<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToc } from '../composables/useToc'
import { useActiveSidebarLinks } from '../composables/activeBar'

const headers = useToc()
const marker = ref()
const container = ref()
// 滚动监听
useActiveSidebarLinks(container, marker)
const forwardText = computed(() => {
  return localStorage.getItem('preferred_lang') === 'zh-CN' ? '快速前往' : 'Forward'
})
</script>

<template>
  <aside ref="container">
    <nav class="devui-content-nav">
      <h3 class="devui-fast-forward">{{ forwardText }}</h3>
      <ul class="devui-step-nav">
        <li v-for="{ link, text } in headers" :key="link" class="devui-item">
          <a class="devui-link" :href="link" :title="text">{{ text }}</a>
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
  width: 200px;
  position: fixed;
  top: 50px;
  right: calc((100vw - 1440px) / 2 - 10px);
  z-index: 1;

  .devui-fast-forward {
    width: 130px;
    font-size: $devui-font-size-card-title;
    color: $devui-text;
    line-height: 24px;
    font-weight: bold;
    padding-bottom: 10px;
    margin-left: 17px;
  }

  .devui-step-nav {
    overflow-y: hidden;
    height: calc(100vh - 182px);
    margin-top: 10px;
    padding-bottom: 20px;

    &:hover {
      overflow-y: auto;
    }

    & > li {
      list-style: none;
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
        -webkit-transition: all 0.3s ease;
        transition: all 0.3s ease;
      }
      a.current {
        color: $devui-link;
      }
    }
  }

  .devui-link:hover,
  .devui-link.active {
    color: $devui-brand;
    text-decoration: none;
  }
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
