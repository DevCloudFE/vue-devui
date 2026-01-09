import { ref, watch } from 'vue';
import { debounce } from 'lodash';
import type { CategorySearchProps, ICollapseTagsTooltip, IRealCollapseTagsTooltip } from '../category-search-types';

export function useCategorySelectedTags(props: CategorySearchProps) {
  const isCollapseTags = ref(false);
  const collapseTagsCount = ref(0);
  const MouseEnterDelay = 150;
  const MouseLeaveDelay = 100;
  const defaultPopoverConfig: ICollapseTagsTooltip = {
    trigger: 'hover',
    position: ['top', 'bottom'],
  };
  const popoverConfig = ref<IRealCollapseTagsTooltip>(defaultPopoverConfig);

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
      if (popoverConfig.value.trigger === 'hover') {
        popoverConfig.value.trigger = 'manually';
        popoverConfig.value.isOpen = false;
      }
    },
    { immediate: true }
  );

  const enter = debounce(() => {
    isEnter && (popoverConfig.value.isOpen = true);
  }, MouseEnterDelay);
  const leave = debounce(() => {
    !isEnter && (popoverConfig.value.isOpen = false);
  }, MouseLeaveDelay);

  let isEnter = false;
  const onMouseEnter = () => {
    if (popoverConfig.value.trigger === 'manually') {
      isEnter = true;
      enter();
    }
  };

  const onMouseLeave = () => {
    if (popoverConfig.value.trigger === 'manually') {
      isEnter = false;
      leave();
    }
  };

  return { isCollapseTags, collapseTagsCount, popoverConfig, onMouseEnter, onMouseLeave };
}
