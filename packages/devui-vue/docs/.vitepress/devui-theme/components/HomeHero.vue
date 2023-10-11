<script setup lang="ts">
import { computed } from 'vue';
import { useData, withBase } from 'vitepress';
import NavLink from './NavLink.vue';

const { site, frontmatter } = useData();

const showHero = computed(() => {
  const { heroImage, heroText, tagline, actionLink, actionText } = frontmatter.value;
  return heroImage || heroText || tagline || (actionLink && actionText);
});

const heroText = computed(() => frontmatter.value.heroText || site.value.title);
</script>

<template>
  <header v-if="showHero" class="home-hero">
    <div class="devui-banner-card">
      <div class="devui-banner-card-left">
        <div class="design-title" v-if="heroText">{{ heroText.split(' ')[0] }}</div>
        <div class="design-title" v-if="heroText">{{ heroText.split(' ')[1] }}</div>
        <div class="subtitle" v-if="frontmatter.tagline">{{ frontmatter.tagline }}</div>

        <div class="quick-ref">
          <div class="nav-link action" v-if="frontmatter.actionLink && frontmatter.actionText">
            <a class="item" :href="frontmatter.actionLink">
              {{ frontmatter.actionText }}
              <svg
                t="1650120099035"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3214"
                width="24"
                height="24"
              >
                <path
                  d="M214.677333 542.122667l0.042667-64.405334 477.653333-0.298666-225.301333-225.322667 45.568-45.568 303.424 303.424L512.213333 813.781333l-45.504-45.504 226.453334-226.453333-478.485334 0.298667z"
                  p-id="3215"
                  fill="#ffffff"
                ></path>
              </svg>
            </a>
          </div>

          <div class="nav-link action alt" v-if="frontmatter.altActionLink && frontmatter.altActionText">
            <a class="item" :href="frontmatter.altActionLink">
              {{ frontmatter.altActionText }}
              <svg
                height="20"
                aria-hidden="true"
                viewBox="0 0 16 16"
                version="1.1"
                width="32"
                data-view-component="true"
                class="octicon octicon-mark-github v-align-middle"
              >
                <path
                  fill="var(--devui-text, #252b3a)"
                  fill-rule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="devui-banner-card-right">
        <div class="banner-img-wrapper">
          <img src="../../../assets/banner-decorate.png" alt="" />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import '@devui/styles-var/devui-var';

.home-hero {
  margin: auto;
  padding: 60px 0;
  max-width: 1200px;
}

.description {
  margin: 0;
  margin-top: 1rem;
  line-height: 1.3;
  font-size: 1.2rem;
  color: $devui-text-weak;
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
  border-radius: 22px;
  padding: 0 30px;
  line-height: 44px;
  font-size: $devui-font-size-page-title;
  font-weight: 500;
  color: $devui-light-text;
  background-color: $devui-primary;
  border: 1px solid $devui-primary;
  transition: background-color 0.2s;
}

.action.alt :deep(.item) {
  color: $devui-text;
  border-color: $devui-line;
  background-color: $devui-block;
  border-style: solid;
}

.action.alt :deep(.item:hover) {
  color: $devui-brand-active;
  border-color: $devui-form-control-line-active;
  background-color: $devui-block;
}

.action :deep(.item:hover) {
  text-decoration: none;
  color: $devui-light-text;
  background-color: $devui-primary-hover;
  border-color: $devui-primary-hover;
}

.devui-banner-card {
  padding: 42px 32px;
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(150, 180, 255, 0.16);
  display: flex;

  .devui-banner-card-left {
    flex: 1;
    min-width: 340px;

    .design-title {
      font-size: 88px;
      line-height: 96px;
      letter-spacing: 0;
      font-weight: 600;
      max-width: 710px;
    }

    .subtitle {
      margin-top: 16px;
      font-size: $devui-font-size-modal-title;
    }
  }

  .devui-banner-card-right {
    flex: 1;

    .banner-img-wrapper {
      width: 100%;
      position: relative;
    }

    img {
      width: 810px;
      position: absolute;
      top: -170px;
      right: -152px;
      max-width: none;
    }
  }

  .quick-ref {
    margin-top: 32px;
    display: flex;
    flex-wrap: wrap;
  }
}

@media (max-width: 1440px) and (min-width: 1280px) {
  .devui-banner-card .devui-banner-card-right img {
    right: -40px;
  }
}

@media (max-width: 1280px) and (min-width: 960px) {
  .devui-banner-card .devui-banner-card-right img {
    width: 600px;
    top: -46px;
    right: 0;
  }
}

@media (max-width: 960px) and (min-width: 840px) {
  .devui-banner-card .devui-banner-card-right img {
    width: 500px;
    top: -12px;
    right: -32px;
  }
}

@media (max-width: 840px) {
  .home {
    padding-top: 0;

    .home-hero {
      padding: 0;
    }
  }

  .devui-banner-card {
    flex-direction: column;

    .devui-banner-card-left .design-title {
      font-size: 64px;
    }

    .devui-banner-card-right img {
      width: 100%;
      position: static;
    }

    .quick-ref {
      margin-top: 0;
    }
  }
}
</style>
