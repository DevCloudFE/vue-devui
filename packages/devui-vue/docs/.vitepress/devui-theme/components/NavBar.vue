<script setup lang="ts">
import { ref, watch, getCurrentInstance, onMounted, nextTick } from 'vue'
import {
  ThemeServiceInit,
  infinityTheme, provenceTheme, sweetTheme, deepTheme, galaxyTheme
} from 'devui-theme'
import NavBarTitle from './NavBarTitle.vue'
import NavLinks from './NavLinks.vue'
import ToggleSideBarButton from './ToggleSideBarButton.vue'
import ZhLang from './icons/ZhLang.vue'
import EnLang from './icons/EnLang.vue'
import ThemePicker from './ThemePicker.vue'
import { Locale } from '@devui/locale'
import enUS from '@devui/locale/lang/en-us'
import zhCN from '@devui/locale/lang/zh-cn'
import { LANG_KEY, CURRENT_LANG, ZH_CN, EN_US } from '../const'

// 主题切换
const THEME_MAP = {
  'infinity-theme': infinityTheme,
  'galaxy-theme': galaxyTheme,
  'sweet-theme': sweetTheme,
  'provence-theme': provenceTheme,
  'deep-theme': deepTheme,
}

const themes = Object.keys(THEME_MAP)



let themeService: any = null;

const currentTheme = ref(themes[0])

watch(currentTheme, (newVal) => {
  THEME_MAP[newVal] && themeService?.applyTheme?.(THEME_MAP[newVal])
})

onMounted(() => {
  const userCustomTheme = localStorage.getItem('user-custom-theme') || themes[0];
  nextTick(() => {
    themeService = ThemeServiceInit({
      ...THEME_MAP
    }, userCustomTheme)
    currentTheme.value = themeService
  })
})

// 国际化
const defaultLanguage = ref(CURRENT_LANG)
function useTranslation(target) {
  defaultLanguage.value = target
  localStorage.setItem(LANG_KEY, target)
  if (target === EN_US) {
    location.pathname = `/${EN_US}${location.pathname}`
  } else if (target === ZH_CN) {
    location.pathname = location.pathname.split(`/${EN_US}`)[1];
  }
}

defineEmits(['toggle'])

const LANG_MAP = {
  [ZH_CN]: '中文',
  [EN_US]: 'English',
}

const currentLang = ref(CURRENT_LANG);
const app = getCurrentInstance();
const switchLang = () => {
  if (currentLang.value === ZH_CN) {
    Locale.use(EN_US, enUS);
    currentLang.value = EN_US;
  } else {
    Locale.use(ZH_CN, zhCN);
    currentLang.value = ZH_CN;
  }
  app.appContext.config.globalProperties.langMessages.value = Locale.messages();
};
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
          <div class="custom-nav-item ml-m" style="font-size: 0"
            @click="() => useTranslation(defaultLanguage === ZH_CN ? EN_US : ZH_CN)" v-if="false">
            <ZhLang v-if="defaultLanguage === ZH_CN"></ZhLang>
            <EnLang v-else></EnLang>
          </div>
          <div class="custom-nav-item ml-m" @click="switchLang" v-if="false">
            {{ LANG_MAP[currentLang] }}
          </div>
          <div class="custom-nav-item flex items-center ml-m">
            <ThemePicker v-model="currentTheme"></ThemePicker>
          </div>
          <a class="custom-nav-item ml-m" style="font-size: 0;user-select:none"
            href="https://github.com/DevCloudFE/vue-devui" target="_blank">
            <svg viewBox="0 0 20 20" width="18" height="18">
              <path fill="var(--devui-text, #252b3a)"
                d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0">
              </path>
            </svg>
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
  cursor: pointer;

  path {
    fill: $devui-brand;
  }
}
</style>
