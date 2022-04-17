<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import PageFooter from "./PageFooter.vue"
import NextAndPrevLinks from "./NextAndPrevLinks.vue"
import PageToc from "./PageToc.vue"
import BackToTop from './BackToTop.vue'
import PageContributor from './PageContributor.vue'
import { CONTRIBUTORS_MAP } from './PageContributorConfig'

const isComponents = computed(() => useRoute().path.indexOf('components') > -1)

const contributors = computed(() => {
  const pathArr = useRoute().path.split('/')
  const componentName = pathArr[pathArr.length - 2]
  return CONTRIBUTORS_MAP[componentName]
})
</script>

<template>
  <main class="page">
    <div class="container">
      <slot name="top" />

      <Content class="content" />

      <div v-if="contributors && contributors.length > 0">
        <div class="page-contributor-label">Contributors</div>
        <PageContributor :contributors="contributors" />
      </div>

      <PageFooter />
      <NextAndPrevLinks />

      <slot name="bottom" />
      <BackToTop />
      <PageToc v-if="isComponents" class="toc-warpper" />
    </div>
  </main>
</template>

<style scoped>
.page {
  padding-top: var(--header-height);
}

@media (min-width: 720px) {
  .page {
    margin-left: 16.4rem;
    margin-right: 40px;
  }
}

@media (min-width: 960px) {
  .page {
    margin-left: 20rem;
  }
}

.container {
  margin: 0 auto;
  padding: 0 1.5rem 4rem;
  max-width: 48rem;
}

.content {
  padding-bottom: 1.5rem;
}

@media (max-width: 420px) {
  .content {
    /* fix carbon ads display */
    clear: both;
  }
}

.page-contributor-label {
  color: #24292f;
  font-weight: 600;
  line-height:32px;
}
</style>
