<script setup lang="ts">
import { toRefs } from 'vue'
import { Avatar } from '@devui/avatar'

const props = defineProps<{
  contributors: Array<{
    avatar: String,
    homepage: String
  }>,
  spacing: {
    type: number,
    default: 8
  },
  avatarSize: {
    type: number,
    default: 36
  }
}>()

const { contributors, spacing, avatarSize } = toRefs(props)
</script>

<template>
  <div class="page-contributor">
    <a v-for="contributor of contributors" :href="contributor.homepage" target="_blank">
      <Avatar v-if="contributor.avatar" class="contributor-avatar" :style="{
        marginRight: `${spacing}px`,
        marginBottom: `${spacing - 4}px`
      }" :imgSrc="contributor.avatar" :width="avatarSize" :height="avatarSize" />
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
