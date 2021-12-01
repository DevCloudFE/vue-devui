<script setup lang="ts">
import { ref, watch } from 'vue'
import Theme from '@devui/theme/theme'
import NavBarTitle from './NavBarTitle.vue'
import NavLinks from './NavLinks.vue'
import ToggleSideBarButton from './ToggleSideBarButton.vue'
import DarkMode from './icons/DarkMode.vue'
import LightMode from './icons/LightMode.vue'
import ZhLang from './icons/ZhLang.vue'
import EnLang from './icons/EnLang.vue'

const theme = new Theme('light')

const darkMode = ref(false)

const defaultLanguage = ref(localStorage.getItem('preferred_lang'))
function useTranslation(target) {
  defaultLanguage.value = target
  localStorage.setItem('preferred_lang', target)
  if (target === 'en-US') {
    location.pathname = `/en-US${location.pathname}`
  } else if (target === 'zh-CN') {
    location.pathname = `${location.pathname.split('/en-US')[1]}`
  }
}

watch(
  () => darkMode.value,
  (darkMode, prevDarkMode) => {
    theme.applyTheme(darkMode ? 'dark' : 'light')
  }
)

defineEmits(['toggle'])
</script>

<template>
  <header class="nav-bar">
    <div class="nav-bar-inner">
      <ToggleSideBarButton @toggle="$emit('toggle')" />

      <NavBarTitle />

      <div class="flex-grow" />

      <div class="flex items-center">
        <div class="nav">
          <NavLinks />
        </div>

        <div class="custom-nav flex items-center ml-l">
          <div
            class="custom-nav-item ml-m"
            style="font-size: 0"
            @click="() => useTranslation(defaultLanguage === 'zh-CN' ? 'en-US' : 'zh-CN')"
          >
            <ZhLang v-if="defaultLanguage === 'zh-CN'"></ZhLang>
            <EnLang v-else></EnLang>
          </div>
          <div class="custom-nav-item flex items-center ml-m">
            <DarkMode v-if="darkMode" @click="darkMode = !darkMode"></DarkMode>
            <LightMode v-else @click="darkMode = !darkMode"></LightMode>
          </div>
          <a class="ml-m" style="font-size: 0;user-select:none" href="https://gitee.com/devui/vue-devui/stargazers">
            <img
              :src="`https://gitee.com/devui/vue-devui/badge/star.svg?theme=${
                darkMode ? 'dark' : 'white'
              }`"
              alt="star"
            />
          </a>
        </div>
      </div>

      <slot name="search" />
    </div>
  </header>
</template>

<style scoped lang="scss">
@import '@devui/styles-var/devui-var';

.nav-bar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 20;
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

.custom-nav svg {
  fill: $devui-text;
}

.custom-nav img {
  width: 6rem;
}

.custom-nav-item:hover {
  svg,
  path {
    fill: $devui-brand;
  }
}
</style>
