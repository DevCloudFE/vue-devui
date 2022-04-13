<script setup lang="ts">
import NavLinks from './NavLinks.vue'
import SideBarLinks from './SideBarLinks.vue'

defineProps({
  open: { type: Boolean, required: true }
})
</script>

<template>
  <aside class="sidebar" :class="{ open }">
    <NavLinks class="nav" />

    <slot name="sidebar-top" />

    <SideBarLinks />

    <slot name="sidebar-bottom" />
  </aside>
</template>

<style scoped lang="scss">
@import '@devui/styles-var/devui-var';

.sidebar {
  position: fixed;
  top: var(--header-height);
  bottom: 0;
  z-index: var(--z-index-sidebar);
  width: 16.4rem;
  background-color: $devui-base-bg;
  transform: translateX(-100%);
  transition: transform 0.25s ease;
  overflow-y: hidden;

  &:hover {
    overflow-y: auto;
  }
}

@media (min-width: 720px) {
  .sidebar {
    transform: translateX(0);
  }
}

@media (min-width: 960px) {
  .sidebar {
    width: 20rem;
  }
}

.sidebar.open {
  transform: translateX(0);
  left: 0;
  border-right: 1px solid $devui-dividing-line;
}

.nav {
  display: block;
}

@media (min-width: 720px) {
  .nav {
    display: none;
  }
}
</style>
