<template>
  <div style='width:500px'>
    <d-category-search collapseTags :category="category" :selected-tags="selectedTags" search-key=""
      :default-search-field="defaultSearchField" :input-autofocus="false"
      placeholder="Click here to choose a filter condition"></d-category-search>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const category = ref([
  {
    label: 'status',
    field: 'status',
    type: 'radio',
    group: 'Basic',
    filterKey: 'status',
    options: [
      { status: 'new' },
      { status: 'developing' },
      { status: 'completed' },
      { status: 'under acceptance' },
      { status: 'closed-loop' },
    ],
  },
  {
    label: 'checker',
    field: 'checker',
    type: 'checkbox',
    group: 'Personnel-related',
    filterKey: 'name',
    options: [
      { name: 'Jack', value: 'Jack' },
      { name: 'Tom', value: 'Tom' },
      { name: 'Jerry', value: 'Jerry' },
    ],
  },
  {
    label: 'tag',
    field: 'tag',
    type: 'label',
    group: 'Basic',
    filterKey: 'label',
    colorKey: 'color',
    options: [
      { label: 'Bug', color: '#f66f6a' },
      { label: 'Epic', color: '#5e7ce0' },
      { label: 'Story', color: '#50d4ab' },
    ],
  },
  {
    label: 'release version',
    field: 'releaseVersion',
    type: 'textInput',
    group: 'Basic',
    maxLength: 10,
    validateRules: [
      { required: true, message: '不能为空', trigger: 'change' },
      { min: 3, max: 10, message: '不小于3个字符，不大于6个字符', trigger: 'change' },
    ],
  },
  {
    label: 'commit number',
    field: 'commitNumber',
    type: 'numberRange',
    group: 'User-defined',
    min: { left: 0 },
    max: { left: 30, right: 50 },
    step: { left: 2, right: 3 },
    placeholder: { left: 'min', right: 'max' },
  },
]);
const selectedTags = ref([
]);
const defaultSearchField = ['creator', 'status'];
</script>
