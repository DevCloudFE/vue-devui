<template>
  <div class="main">
    <div class="docs-header">
      <h1>{{ data.name }} {{ data.cnName }}</h1>
      <div style="margin-bottom: 40px">{{ data.description }}</div>
      <div v-if="data.tmw">
        <h3>何时使用</h3>
        <div style="margin-bottom: 20px" v-html="data.tmw"></div>
      </div>
      <!-- TODO: d-tabs -->
      <d-tabs
        v-model="activeTab"
        :showContent="false"
        @activeTabChange="activeTabChange($event)"
      >
        <d-tab id="demo" title="Demo" tabId="demo"> </d-tab>
        <d-tab id="api" title="API" tabId="api"> </d-tab>
      </d-tabs>
    </div>
    <div class="examples-viewer">
      <div class="examples-viewer-wrapper">
        <!-- TODO: Demo列表 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonDemo from '../../devui/button/demo/button-demo';
import Tabs from '../../devui/tabs/tabs';
import Tab from '../../devui/tabs/tab';

export default {
  name: 'app-demo-cell',
  components: {
    'd-button-demo': ButtonDemo,
    'd-tabs': Tabs,
    'd-tab': Tab,
  },
  data() {
    return {
      data: {},
      activeTab: 'demo',
    };
  },
  methods: {
    activeTabChange(a) {
      this.$router.push(a);
    },
  },
  mounted() {
    this.data = this.$route.meta;
    this.activeTab = /\/demo$/.test(this.$route.path) ? 'demo' : 'api';
  },
};
</script>
