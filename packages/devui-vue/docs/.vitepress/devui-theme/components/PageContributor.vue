<script setup lang="ts">
import { toRefs } from 'vue'
import { Avatar } from '@devui/avatar'

const props = defineProps<{
  contributors: Array<{
    avatar: String,
    homepage: String
  }>
}>()

const { contributors } = toRefs(props)
</script>

<template>
  <div class="page-contributor">
    <div class="contributor-label">Contributors</div>
    <a v-for="contributor of contributors" :href="contributor.homepage" target="_blank">
      <Avatar class="contributor-avatar" :imgSrc="contributor.avatar" />
    </a>
  </div>
</template>

<style scoped lang="scss">
.page-contributor {
  .contributor-label {
    color: #24292f;
    font-weight: 600;
    line-height:32px;
  }

  .contributor-avatar {
    margin: 0 8px 4px 0;
  }
}
</style>
