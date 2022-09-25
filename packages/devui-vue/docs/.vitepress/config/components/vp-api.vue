<template>
  <h3 :id="`${name}-参数`" tabindex="-1">{{ name }} 参数</h3>
  <div v-html="sourceCode" />
  <template v-if="typeCode.length">
    <h3 :id="`${name} 类型定义`" tabindex="-1">{{ name }} 类型定义</h3>
    <div class="example-api" v-for="(item, index) in typeCode" :key="index" v-highlight v-html="marked(item)"></div>
  </template>
</template>

<script setup lang="ts">
import {  computed } from 'vue';
import { marked } from 'marked';
import hljs from 'highlight.js';

const vHighlight = {
  mounted(el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
      hljs.highlightBlock(block);
    });
  },
};

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
  typeCode: {
    type: String,
  },
  name: {
    type: String,
  },
});

const sourceCode = computed(() => {
  return marked(props.source);
});
const typeCode = computed(() => {
  if (props.typeCode && props.typeCode.length) {
    return props.typeCode?.split(',');
  }
  return [];
});
</script>

<style lang="scss">
.vp-doc a {
  color: #5e7ce0 !important;
}
.example-api {
  pre {
    position: relative;
    z-index: 1;
    margin: 0;
    padding: 1.25rem 1.5rem;
    background: transparent;
    overflow-x: auto;
    background: #f8f8f8;
    margin-top: 1rem;
  }
  & code {
    color: #07a;
  }
  pre code.hljs {
    padding: 0;
    box-shadow: none;
    background: #f8f8f8;
  }
  .hljs-string {
    color: #690;
  }
  .hljs-title {
    color: indianred;
  }
}
.vp-doc table {
  display: table;
}
h3,
h4 {
  margin-top: 2rem;
}
</style>
