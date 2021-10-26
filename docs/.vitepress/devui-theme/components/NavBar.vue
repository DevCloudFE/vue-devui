<script setup lang="ts">
import { ref, watch } from 'vue'
import Theme from '@devui/theme/theme'
import { Switch as DSwitch } from '@devui/switch'
import NavBarTitle from './NavBarTitle.vue'
import NavLinks from './NavLinks.vue'
import ToggleSideBarButton from './ToggleSideBarButton.vue'

const theme = new Theme("light");

const darkMode = ref(false);
const switchText = ref("浅色");

const defaultLanguage = ref(localStorage.getItem('preferred_lang'))
function useTranslation (target){
  defaultLanguage.value = target
  localStorage.setItem('preferred_lang', target)
  if (target === 'en-US'){
    location.pathname = `/en-US${location.pathname}`
  }else if (target === 'zh-CN'){
    location.pathname = `${location.pathname.split('/en-US')[1]}`
  }
}

watch(
  () => darkMode.value,
  (darkMode, prevDarkMode) => {
    theme.applyTheme(darkMode ? 'dark' : 'light')
    switchText.value = darkMode ? '深色' : '浅色'
  }
)


defineEmits(['toggle'])
</script>

<template>
  <header class="nav-bar">
    <ToggleSideBarButton @toggle="$emit('toggle')" />

    <NavBarTitle />

    <div class="flex-grow" />

    <div class="flex items-center">
      <div class="nav">
        <NavLinks />
      </div>

      <div class="flex items-center ml-xs mt-xxs">
        <d-switch v-model:checked="darkMode" size="sm"></d-switch>
        <span style="font-size:0.9rem;" class="mb-xxs">{{ switchText }}</span>
      </div>
      <div style="margin-left: 10px" @click="() => useTranslation( defaultLanguage === 'zh-CN' ? 'en-US' : 'zh-CN' )">
        {{defaultLanguage === 'zh-CN' ? '中文' : 'English'}}
      </div>
    </div>

    <slot name="search" />
  </header>
</template>

<style scoped lang="scss">
@import '@devui/styles-var/devui-var';

.nav-bar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: var(--z-index-navbar);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $devui-dividing-line;
  padding: 0.7rem 1.5rem 0.7rem 4rem;
  height: var(--header-height);
  background-color: $devui-base-bg;
  &:hover {
    cursor: pointer;
  }
}

@media (min-width: 720px) {
  .nav-bar {
    padding: 0.7rem 1.5rem;
  }
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
