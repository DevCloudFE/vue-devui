<script setup lang="ts">
import { ref, computed } from 'vue';
import { useToc } from '../composables/useToc';
import { useActiveSidebarLinks } from '../composables/activeBar';
import { CURRENT_LANG, ZH_CN } from '../const';

const headers = useToc();
const marker = ref();
const container = ref();
// 滚动监听
useActiveSidebarLinks(container, marker);
const forwardText = computed(() => {
  return CURRENT_LANG === ZH_CN ? '快速前往' : 'Forward';
});
</script>

<template>
  <aside ref="container" v-if="headers?.length > 0">
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
  top: 62px;
  right: 40px;
  z-index: 1;

  .devui-fast-forward {
    width: 130px;
    font-size: $devui-font-size;
    color: $devui-text;
    line-height: 24px;
    font-weight: 600;
    padding-bottom: 8px;
    margin-left: 16px;
  }

  .devui-step-nav {
    overflow-y: hidden;
    height: calc(100vh - 182px);
    margin-top: 0;
    padding-bottom: 0;

    &:hover {
      overflow-y: auto;
    }

    & > li {
      list-style: none;
      cursor: pointer;
      height: 36px;
      line-height: 36px;
      font-size: $devui-font-size-sm;
      color: $devui-text;
      position: relative;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      border-radius: $devui-border-radius-full;

      a {
        display: block;
        overflow: hidden;
        color: $devui-text;
        white-space: nowrap;
        text-overflow: ellipsis;
        -webkit-transition: all 0.3s ease;
        transition: all 0.3s ease;
        padding-left: 16px;
        text-decoration: none;

        :hover {
          background-color: $devui-list-item-hover-bg;
        }
      }

      a.current {
        color: $devui-link;
      }
    }
  }

  .devui-item {
    :hover {
      background-color: $devui-list-item-hover-bg;
    }

    .active {
      background-color: $devui-list-item-active-bg;
      font-weight: 600;
    }
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

@media (max-width: 1640px) {
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
