<template>
  <d-editor-md
    v-model="content"
    :md-rules="mdRules"
    base-url="https://test-base-url"
    @content-change="valueChange"
    @checked-change="onCheckedEvent"
  />
  <!-- <d-editor-md
    v-model="content"
    :md-rules="mdRules"
    :md-plugins="plugins"
    base-url="https://test-base-url"
    @content-change="valueChange"
    @checked-change="onCheckedEvent"
  /> -->
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
// import { checkbox } from 'vue-devui/editor-md'; // demo无法进行import，使用时请放开注释

const content = ref('- [x] checked \n - [ ] unchecked // demo无法进行import，使用时请放开代码中注释');
const mdRules = reactive({
  linkify: {
    fuzzyLink: false,
  },
});

const valueChange = (val) => {
  console.log(val);
};

const plugins = reactive([
  {
    // plugin: checkbox,
    opts: {
      idPrefix: 'devui',
      disable: false,
    },
  },
]);

const onCheckedEvent = (val) => {
  console.log('demo', val);
  content.value = val;
};
</script>
