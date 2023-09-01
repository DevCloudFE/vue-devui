import { ref, onMounted, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';

export function useSelectMenuSize(selectRef: Ref, dropdownRef: Ref, isOpen: Ref<boolean>) {
  const originRef = ref();
  const dropdownWidth = ref(0);
  let observer: ResizeObserver;

  const updateDropdownWidth = () => {
    dropdownWidth.value = originRef.value?.getBoundingClientRect().width || 0;
    if (isOpen.value) {
      dropdownRef.value.updatePosition();
    }
  };

  const watchInputSize = () => {
    if (window) {
      observer = new window.ResizeObserver(updateDropdownWidth);
      observer.observe(originRef.value);
    }
  };

  onMounted(() => {
    originRef.value = selectRef.value.$el;
    watchInputSize();
    updateDropdownWidth();
  });

  onBeforeUnmount(() => {
    observer?.unobserve(originRef.value);
  });

  return { originRef, dropdownWidth };
}
