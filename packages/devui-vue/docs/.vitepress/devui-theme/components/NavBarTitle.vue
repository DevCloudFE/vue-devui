<script setup lang="ts">
import { withBase, useData } from 'vitepress'
const { site, theme, localePath } = useData()
function gopage (){
  document.querySelector('.nav-bar-title').setAttribute('href', window.location.pathname);
  return false;
};
</script>

<template>
  <a
    class="nav-bar-title"
    :aria-label="`${site.title}, back to home`"
    @click="gopage()"
  >
    <img
      v-if="theme.logo"
      class="logo"
      :src="withBase(theme.logo)"
      alt="Logo"
    />
    {{ site.title }}
  </a>
</template>

<style scoped lang="scss">
@import '@devui/styles-var/devui-var';

.nav-bar-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: $devui-text;
}

.nav-bar-title:hover {
  text-decoration: none;
}

.logo {
  margin-right: 0.75rem;
  height: 1.3rem;
  vertical-align: bottom;
}
</style>
