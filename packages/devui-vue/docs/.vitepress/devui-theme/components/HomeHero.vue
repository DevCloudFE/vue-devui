<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import NavLink from './NavLink.vue'

const { site, frontmatter } = useData()

const showHero = computed(() => {
  const {
    heroImage,
    heroText,
    tagline,
    actionLink,
    actionText
  } = frontmatter.value
  return heroImage || heroText || tagline || (actionLink && actionText)
})

const heroText = computed(() => frontmatter.value.heroText || site.value.title)
</script>

<template>
  <header v-if="showHero" class="home-hero">
    <figure v-if="frontmatter.heroImage" class="figure">
      <img
        class="image"
        :src="withBase(frontmatter.heroImage)"
        :alt="frontmatter.heroAlt"
      />
    </figure>

    <h1 v-if="heroText" id="main-title" class="title">{{ heroText }}</h1>
    <p v-if="frontmatter.tagline" class="description">
      {{ frontmatter.tagline }}
    </p>

    <div class="home-action-container">
        <div class="nav-link action" v-if="frontmatter.actionLink && frontmatter.actionText">
          <a class="item" :href="frontmatter.actionLink">
            {{ frontmatter.actionText }}
            <svg t="1650120099035" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3214" width="24" height="24"><path d="M214.677333 542.122667l0.042667-64.405334 477.653333-0.298666-225.301333-225.322667 45.568-45.568 303.424 303.424L512.213333 813.781333l-45.504-45.504 226.453334-226.453333-478.485334 0.298667z" p-id="3215" fill="#ffffff"></path></svg>
          </a>
        </div>

        <div class="nav-link action alt" v-if="frontmatter.altActionLink && frontmatter.altActionText">
          <a class="item" :href="frontmatter.altActionLink">
            <svg height="20" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github v-align-middle">
              <path fill="var(--devui-text, #252b3a)" fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
            {{ frontmatter.altActionText }}
          </a>
        </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import '@devui/styles-var/devui-var';

.home-hero {
  margin: 2.5rem 0 2.75rem;
  padding: 0 1.5rem;
  text-align: center;

  .image {
    width: auto !important;
    height: 260px !important;
  }
}

@media (min-width: 420px) {
  .home-hero {
    margin: 3.5rem 0;
  }
}

@media (min-width: 720px) {
  .home-hero {
    margin: 4rem 0 4.25rem;
  }
}

.figure {
  padding: 0 1.5rem;
}

.image {
  display: block;
  margin: 0 auto;
  width: auto;
  max-width: 100%;
  max-height: 280px;
  height: 260px;
}

@media (max-width: 420px) {
  .home-hero .image {
    height: 180px;
  }
}

.title {
  margin-top: 2.5rem;
  font-size: 2rem;
  font-weight: 700;
}

@media (min-width: 420px) {
  .title {
    font-size: 3rem;
  }
}

@media (min-width: 720px) {
  .title {
    margin-top: 3rem;
  }
}

.description {
  margin: 0;
  margin-top: 1rem;
  line-height: 1.3;
  font-size: 1.2rem;
  color: $devui-text-weak;
}

@media (min-width: 420px) {
  .description {
    line-height: 1.2;
    font-size: 1.6rem;
  }
}

.action {
  margin-top: 2rem;
  display: inline-block;
}

.action.alt {
  margin-left: 1.5rem;
}

@media (min-width: 420px) {
  .action {
    margin-top: 2.5rem;
    display: inline-block;
  }
}

.action :deep(.item) {
  display: inline-flex;
  align-items: center;
  border-radius: 6px;
  padding: 0 20px;
  line-height: 44px;
  font-size: 1rem;
  font-weight: 500;
  color: $devui-light-text;
  background-color: $devui-primary;
  border: 2px solid $devui-primary;
  transition: background-color 0.2s;
}

.action.alt :deep(.item) {
  color: $devui-text;
  border-color: $devui-list-item-hover-bg;
  background-color: $devui-list-item-hover-bg;
  border-style: solid;
}

.action.alt :deep(.item:hover) {
  color: $devui-text;
  border-color: $devui-list-item-selected-bg;
  background-color: $devui-list-item-selected-bg;
}

.action :deep(.item:hover) {
  text-decoration: none;
  color: $devui-light-text;
  background-color: $devui-primary-hover;
  border-color: $devui-primary-hover;
}

@media (min-width: 420px) {
  .action :deep(.item) {
    padding: 0 24px;
    line-height: 52px;
    font-size: 1.2rem;
    font-weight: 500;
  }
}

.home-action-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
