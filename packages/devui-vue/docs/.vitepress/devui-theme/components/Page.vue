<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vitepress';
import PageFooter from './PageFooter.vue';
import NextAndPrevLinks from './NextAndPrevLinks.vue';
import PageToc from './PageToc.vue';
import BackToTop from './BackToTop.vue';
import PageContributor from './PageContributor.vue';
import { CONTRIBUTORS_MAP } from './PageContributorConfig';

const isComponents = computed(() => useRoute().path.indexOf('components') > -1);

const contributors = computed(() => {
  const pathArr = useRoute().path.split('/');
  const componentName = pathArr[pathArr.length - 2];
  return CONTRIBUTORS_MAP[componentName];
});
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

    <div class="devui-docs-footer">
      <div>
        <div class="devui-docs-footer-title">找到我们</div>
        <div class="devui-docs-footer-content">
          <div class="content-foot">
            <a rel="noopener noreferrer" href="https://github.com/DevCloudFE/ng-devui" target="_blank" class="devui-docs-footer-link">
              <img src="./img/github.svg" />
              <span>Github</span>
            </a>
          </div>

          <div class="content-foot">
            <a rel="noopener noreferrer" href="https://juejin.cn/user/712139267650141" target="_blank" class="devui-docs-footer-link">
              <img src="./img/juejin.svg" />
              <span>DevUI团队</span>
            </a>
          </div>

          <div class="content-foot">
            <a rel="noopener noreferrer" href="https://zhuanlan.zhihu.com/devui" target="_blank" class="devui-docs-footer-link">
              <img src="./img/zhihu.svg" />
              <span>DevUI Design</span></a
            >
          </div>

          <div class="content-foot" style="position: relative">
            <a class="wechat-info">
              <img src="./img/wechat.svg" />
              <span>官方交流群</span>
              <img class="wechat-img" src="./img/wechat.jpg" />
            </a>
          </div>
        </div>
      </div>

      <div class="devui-docs-footer-desc">
        <img src="./img/logo.svg" alt="" />
        <span>粤A2-20044005号</span>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.page {
  padding-top: var(--header-height);
  height: 100vh;
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
  max-width: 1024px !important;
  min-height: calc(100% - 196px);
}

.page > .container:first-child {
  max-width: 1064px !important;
  padding: 0 20px 20px 20px !important;
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
  line-height: 32px;
}

.devui-docs-footer {
  height: 162px;
  max-width: 1024px;
  margin: 0 auto;
  padding: 32px 32px 0 32px;
  background-color: var(--devui-global-bg);
  border-radius: 20px 20px 0 0;

  &-title {
    font-size: var(--devui-font-size);
    color: var(--devui-text);
    font-weight: bold;
    margin-bottom: 20px;
  }

  &-content {
    display: flex;
    height: 52px;

    .content-foot {
      margin-right: 80px;

      a {
        display: flex;
        align-items: center;
      }

      span {
        font-size: var(--devui-font-size-sm);
        line-height: 16px;
        margin-left: 8px;
      }
    }
  }

  &-desc {
    border-top: 1px solid var(--devui-dividing-line);
    height: 40px;
    display: flex;
    align-items: center;

    img {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }

    span {
      font-size: var(--devui-font-size-sm);
      color: var(--devui-aide-text);
      line-height: 40px;
    }
  }
}

.devui-docs-footer-link {
  color: var(--devui-text);

  &:hover {
    color: var(--devui-link-active);
    cursor: pointer;
  }
}

.wechat-info {
  color: var(--devui-text);

  &:hover {
    cursor: pointer;
    color: var(--devui-link-active);

    .wechat-img {
      display: block !important;
    }
  }

  .wechat-img {
    position: absolute;
    display: none;
    width: 160px;
    max-width: fit-content;
    bottom: 60px;
    left: 0;
  }
}
</style>
