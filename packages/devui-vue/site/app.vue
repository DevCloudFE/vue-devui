<template>
  <d-editor-md v-model="content" :md-plugins="mdPlugins"> </d-editor-md>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { full as emoji } from 'markdown-it-emoji';

const content = ref('aa:joy:');
const mdPlugins = [
  {
    plugin: emoji,
  },
];
</script>
