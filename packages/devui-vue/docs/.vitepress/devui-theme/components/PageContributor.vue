<script setup lang="ts">
import { toRefs, computed } from 'vue';
import { Avatar } from '@devui/avatar';

interface Props {
  contributors: Array<{
    avatar: String;
    homepage: String;
  }>;
  spacing?: number;
  avatarSize?: number;
}

const props = withDefaults(defineProps<Props>(), {
  contributors: () => [],
  spacing: 8,
  avatarSize: 36,
});

const { contributors, spacing, avatarSize } = toRefs(props);

const validContributors = computed(() => {
  return contributors.value.filter((item) => item.avatar);
});
</script>

<template>
  <div class="page-contributor">
    <a v-for="contributor of validContributors" :href="contributor.homepage" target="_blank">
      <Avatar
        v-if="contributor.avatar"
        class="contributor-avatar"
        :style="{
          marginRight: `${spacing}px`,
          marginBottom: `${spacing - 4}px`,
        }"
        :imgSrc="contributor.avatar"
        :width="avatarSize"
        :height="avatarSize"
      />
    </a>
  </div>
</template>

<style scoped lang="scss">
.page-contributor {
  display: flex;
  flex-wrap: wrap;

  .contributor-avatar {
    margin: 0 8px 4px 0;
  }
}
</style>
