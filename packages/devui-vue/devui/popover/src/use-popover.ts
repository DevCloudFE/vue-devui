import { toRefs, ref, computed, watch, onUnmounted, onMounted } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import { debounce } from 'lodash';
import { PopoverProps, UsePopoverEvent } from './popover-types';

const TransformOriginMap: Record<string, string> = {
  top: '50% calc(100% + 8px)',
  bottom: '50% -8px',
  left: 'calc(100% + 8px)',
  right: '-8px 50%',
};

export function usePopover(
  props: PopoverProps,
  visible: Ref<boolean>,
  placement: Ref<string>,
  origin: Ref<HTMLElement | undefined>,
  popoverRef: Ref
): { overlayStyles: ComputedRef<Record<string, number | string>> } {
  const { trigger, isOpen } = toRefs(props);
  const overlayStyles = computed(() => ({
    zIndex: 1060,
    transformOrigin: TransformOriginMap[placement.value],
  }));

  const onDocumentClick: (e: Event) => void = (e: Event) => {
    if (!origin.value?.contains(<HTMLElement>e.target) && !popoverRef.value.$el?.contains(e.target)) {
      visible.value = false;
    }
  };

  watch(isOpen, (isOpenVal) => {
    visible.value = isOpenVal;
  });

  watch(visible, () => {
    if (visible.value && trigger.value !== 'manually') {
      document.addEventListener('click', onDocumentClick);
    } else {
      document.removeEventListener('click', onDocumentClick);
    }
  });
  onUnmounted(() => {
    document.removeEventListener('click', onDocumentClick);
  });

  return { overlayStyles };
}

export function usePopoverEvent(props: PopoverProps, visible: Ref<boolean>, origin: Ref): UsePopoverEvent {
  const { trigger, position, mouseEnterDelay, mouseLeaveDelay, disabled } = toRefs(props);
  const isClick: ComputedRef<boolean> = computed(() => trigger.value === 'click');
  const placement: Ref<string> = ref(position.value[0].split('-')[0]);
  const isEnter: Ref<boolean> = ref(false);

  const onClick = () => {
    if (disabled.value) {
      return;
    }
    isClick.value && (visible.value = !visible.value);
  };
  const enter = debounce(() => {
    isEnter.value && (visible.value = true);
  }, mouseEnterDelay.value);
  const leave = debounce(() => {
    !isEnter.value && (visible.value = false);
  }, mouseLeaveDelay.value);
  const onMouseenter = () => {
    if (disabled.value) {
      return;
    }
    if (!isClick.value) {
      isEnter.value = true;
      enter();
    }
  };
  const onMouseleave = () => {
    if (!isClick.value) {
      isEnter.value = false;
      leave();
    }
  };
  const quickLeave = () => {
    isEnter.value = false;
    visible.value = false;
  };
  watch(disabled, (newVal) => {
    if (newVal && visible.value) {
      quickLeave();
    }
  });
  const handlePositionChange: (pos: string) => void = (pos: string) => {
    placement.value = pos.split('-')[0];
  };
  onMounted(() => {
    if (trigger.value === 'click') {
      origin.value.addEventListener('click', onClick);
    } else if (trigger.value === 'hover') {
      origin.value.addEventListener('mouseenter', onMouseenter);
      origin.value.addEventListener('mouseleave', onMouseleave);
    }
  });

  return { placement, handlePositionChange, onMouseenter, onMouseleave };
}
