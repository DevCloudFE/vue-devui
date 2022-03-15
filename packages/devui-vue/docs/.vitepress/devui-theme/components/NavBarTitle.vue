<script setup lang="ts">
import { withBase, useData } from 'vitepress'
const { site, theme, localePath } = useData()
function gopage() {
  document.querySelector('.nav-bar-title').setAttribute('href', window.location.pathname)
  return false
}
</script>

<template>
  <a class="nav-bar-title" :aria-label="`${site.title}, back to home`" @click="gopage()">
    <img v-if="theme.logo" class="logo" :src="withBase(theme.logo)" alt="Logo" />
    <span>{{ site.title }}</span>
  </a>
</template>

<style scoped lang="scss">
@import '@devui/styles-var/devui-var';

.nav-bar-title {
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 600;
  color: $devui-text;
  span {
    @media screen and (max-width: 360px) {
      display: none;
    }
  }
}

.nav-bar-title:hover {
  text-decoration: none;
  cursor: pointer;
}

.logo {
  margin-right: 0.75rem;
  height: 1.3rem;
  vertical-align: bottom;
}
</style>
