<script setup lang="ts">
import { defineEmit, ref, watch } from 'vue'
import Theme from '@devui/theme'
import NavBarTitle from './NavBarTitle.vue'
import NavLinks from './NavLinks.vue'
import ToggleSideBarButton from './ToggleSideBarButton.vue'

const theme = new Theme('light')

const darkMode = ref(false)
const switchText = ref('浅色')

watch(
  () => darkMode.value,
  (darkMode, prevDarkMode) => {
    theme.applyTheme(darkMode ? 'dark' : 'light')
    switchText.value = darkMode ? '深色' : '浅色'
  }
)

defineEmit(['toggle'])
</script>

<template>
  <header class="nav-bar">
    <ToggleSideBarButton @toggle="$emit('toggle')" />

    <NavBarTitle />

    <div class="flex-grow" />

    <div class="nav">
      <NavLinks />
    </div>

    <div class="flex items-center mt-xxs ml-xs">
      <d-switch v-model:checked="darkMode"></d-switch>
      {{switchText}}
    </div>

    <slot name="search" />
  </header>
</template>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: var(--z-index-navbar);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--c-divider);
  padding: 0.7rem 1.5rem 0.7rem 4rem;
  height: var(--header-height);
  background-color: var(--c-bg);
}

@media (min-width: 720px) {
  .nav-bar {
    padding: 0.7rem 1.5rem;
  }
}

.flex-grow {
  flex-grow: 1;
}

.nav {
  display: none;
}

@media (min-width: 720px) {
  .nav {
    display: block;
  }
}
</style>
