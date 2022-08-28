<h1 class="flex-center">
  组件功能概览
  <span class="component-count" :title="`${componentFeatureData.length} components`">{{ componentFeatureData.length }}</span>
  <span class="component-count" :title="`${featureCount} features`">{{ featureCount }}</span>
</h1>

Vue DevUI 组件库包含 77 个灵活、易用、功能强大的组件。

- ✅ 已完成
- 🚧 开发中
- ⌛ 待认领

<div v-for="(groupComponent, category) in groupBy(componentFeatureData, item => item.category)">
  <h2 class="flex-center">{{ startCase(category) }} {{ CATEGORY_MAP[category] }} <span class="component-count">{{ groupComponent.length }}</span></h2>
  <div v-for="component of groupComponent">
    <h3 class="flex-center">
      {{ startCase(component.name )}} {{ component.cnName }}
      <span class="component-count mr-xs">{{ component.features.length }}</span>
      <span v-if="component.complex" class="mr-xs">⭐</span>
      <span :class="`version-tag-${component.version?.slice(1, 2)}`">{{ component.version }}</span>
    </h3>
    <d-row v-for="(groupFeature, index) of group(component.features)" :style="{ marginTop: index === 0 ? '20px' : '0'}" :gutter="[0, 8]">
      <d-col v-for="feature of groupFeature" :span="8">
        {{ STATUS_MAP[feature?.status] }} <a :href="`/components/${component.name}/#${feature.cnName}`">{{ startCase(feature.name) }} {{ feature.cnName }}</a>
      </d-col>
    </d-row>
  </div>
</div>

<script setup>
  import { groupBy, startCase } from 'lodash';
  import { componentFeatureData, STATUS_MAP, CATEGORY_MAP } from './feature-data';
  import { CONTRIBUTORS_MAP } from '../../.vitepress/devui-theme/components/PageContributorConfig';

  function group(arr, step = 3) {
    if (!arr || arr.length === 0) return;
    if (arr.length <= step) return [arr];
    return arr.reduce((x, y) => {
        return Array.isArray(x) ? (x[x.length - 1].push(y) === step ? [...x, []] : x) : [[x, y]];
    });
  }

  const featureCount = componentFeatureData.reduce((acc, cur) => acc += cur.features.length, 0);
</script>

<style lang="scss">
@import '@devui/styles-var/devui-var.scss';

.flex-center {
  display: flex;
  align-items: center;
}

.component-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  padding: 0 2px;
  min-width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  font-size: $devui-font-size;
  font-weight: normal;
  border: 1px solid $devui-disabled-line;
  border-radius: $devui-border-radius;
  background-color: $devui-disabled-bg;
  color: $devui-disabled-text;
}
</style>
