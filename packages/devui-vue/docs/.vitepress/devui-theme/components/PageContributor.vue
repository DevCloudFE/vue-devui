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
      <Avatar v-if="contributor.avatar" class="contributor-avatar" :imgSrc="contributor.avatar" :width="avatarSize" :height="avatarSize" />
    </a>
  </div>
</template>

<style scoped lang="scss">
.page-contributor {
  display: flex;
  flex-wrap: wrap;

  a {
    padding: 10px 10px 0;
  }

  ::v-deep .devui-avatar-img {
    display: block;
  }
}
</style>
