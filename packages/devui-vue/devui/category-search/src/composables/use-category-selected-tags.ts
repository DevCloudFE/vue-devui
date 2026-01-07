import { ref, watch } from 'vue';
import type { CategorySearchProps } from '../category-search-types';

export function useCategorySelectedTags(props: CategorySearchProps) {
  const isCollapseTags = ref(false);
  const collapseTagsCount = ref(0);
  const defaultPopoverConfig = {
    trigger: 'hover',
    position: ['top', 'bottom'],
  };
  const popoverConfig = ref(defaultPopoverConfig);

  watch(
    () => props.collapseTags,
    (val) => {
      if (typeof val === 'boolean') {
        isCollapseTags.value = val;
        collapseTagsCount.value = val ? 1 : 0;
      }
      if (typeof val === 'number') {
        isCollapseTags.value = true;
        collapseTagsCount.value = val;
      }
    },
    { immediate: true }
  );

  watch(
    () => props.collapseTagsTooltip,
    (val) => {
      if (val) {
        popoverConfig.value = { ...defaultPopoverConfig, ...val };
      }
    },
    { immediate: true }
  );

  return { isCollapseTags, collapseTagsCount, popoverConfig };
}
