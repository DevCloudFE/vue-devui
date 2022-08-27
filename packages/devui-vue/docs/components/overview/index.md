# 组件功能概览

Vue DevUI 组件库包含 77 个灵活、易用、功能强大的组件。

- ✅ 已完成
- 🚧 开发中
- ⌛ 待认领

<div v-for="(groupComponent, category) in groupBy(componentFeatureData, item => item.category)">
  <h2>{{ startCase(category) }} {{ CATEGORY_MAP[category] }}</h2>
  <div v-for="component of groupComponent">
    <h3>{{ startCase(component.name )}} {{ component.cnName }} <span v-if="component.complex">⭐</span><span :class="`version-tag-${component.version?.slice(1, 2)}`">{{ component.version }}</span></h3>
    <d-row v-for="(groupFeature, index) of group(component.features)" :style="{ marginTop: index === 0 ? '20px' : '0'}" :gutter="[0, 8]">
      <d-col v-for="feature of groupFeature" :span="8">
        {{ STATUS_MAP[feature?.status] }} <a :href="`/components/${component.name}/#${feature.cnName}`">{{ startCase(feature.name) }} {{ feature.cnName }}</a>
      </d-col>
    </d-row>
  </div>
</div>

<script setup>
  import { groupBy, startCase } from 'lodash-es';
  import { componentFeatureData, STATUS_MAP, CATEGORY_MAP } from './feature-data';
  import { CONTRIBUTORS_MAP } from '../../.vitepress/devui-theme/components/PageContributorConfig';

  function group(arr, step = 3) {
    if (!arr || arr.length === 0) return;
    if (arr.length <= step) return [arr];
    return arr.reduce((x, y) => {
        return Array.isArray(x) ? (x[x.length - 1].push(y) === step ? [...x, []] : x) : [[x, y]];
    });
  }
</script>
