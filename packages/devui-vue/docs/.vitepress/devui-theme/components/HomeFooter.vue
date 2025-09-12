<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <footer v-if="frontmatter.footer" class="footer">
    <div class="container">
      <div class="footer-item">
        <div class="footer-item__title">社区</div>
        <ul>
          <li><a href="https://github.com/DevCloudFE/vue-devui" target="_blank">代码仓库</a></li>
          <li><a href="https://github.com/DevCloudFE/vue-devui/releases" target="_blank">更新日志</a></li>
          <li><a href="https://github.com/DevCloudFE/vue-devui/issues" target="_blank">反馈建议</a></li>
          <li><a href="https://juejin.cn/user/712139267650141" target="_blank">DevUI 掘金专栏</a></li>
          <li><a href="https://www.zhihu.com/people/devui-design" target="_blank">DevUI 知乎主页</a></li>
          <li><a href="https://segmentfault.com/u/devui" target="_blank">SegmentFault</a></li>
        </ul>
      </div>
      <div class="footer-item">
        <div class="footer-item__title">生态</div>
        <ul>
          <li><a href="https://devui.design/" target="_blank">Ng DevUI</a></li>
          <li><a href="https://vue-devui.github.io/" target="_blank">Vue DevUI</a></li>
          <li><a href="https://react-devui.surge.sh/" target="_blank">React DevUI</a></li>
          <li><a href="https://devui.design/admin-page/home" target="_blank">Ng DevUI Admin</a></li>
          <li><a href="https://devui.design/icon/ruleResource" target="_blank">DevUI Icons</a></li>
          <li><a href="https://devcloudfe.github.io/devui-playground" target="_blank">DevUI Playground</a></li>
        </ul>
      </div>
      <div class="footer-item">
        <div class="footer-item__title">友链</div>
        <ul>
          <li><a href="http://h5.dooring.cn/" target="_blank">H5-Dooring - 让H5制作，更简单</a></li>
          <li><a href="https://www.light-tower.top/" target="_blank">灯塔 - 公益性质的反霸凌团队</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@import '@devui/styles-var/devui-var';

.footer {
  margin: 0 auto;
  max-width: 960px;
}

@media (min-width: 720px) {
  .footer {
    padding: 0 1.5rem;
  }
}

.container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 2rem 1.5rem 2.25rem;

  .footer-item {
    margin-right: 20px;
    font-size: 14px;

    &:last-child {
      margin-right: 0;
    }

    ul {
      list-style: none;
      padding-left: 0;

      a {
        color: $devui-text;
        text-decoration: none;
        line-height: 28px;

        &:hover {
          color: $devui-brand;
        }
      }
    }

    &__title {
      font-size: 18px;
    }
  }
}

.home-hero + .footer .container,
.home-features + .footer .container,
.home-content + .footer .container {
  /* border-top: 1px solid var(--c-divider); */
}

@media (min-width: 420px) {
  .container {
    padding: 3rem 1.5rem 3.25rem;
  }
}

.text {
  margin: 0;
  text-align: center;
  line-height: 1.4;
  font-size: 0.9rem;
  color: $devui-text-weak;
}
</style>
