import { onUnmounted, ref, watch, Ref } from 'vue';

export function overlayVisible(backgroundBlock: Ref<boolean>): Ref<boolean> {
  const visible = ref(false);
  const body = document.body;
  const originOverflow = body.style.overflow;
  watch(visible, (value) => {
    if (backgroundBlock.value) {
      body.style.overflow = value ? 'hidden' : originOverflow;
    }
  });

  onUnmounted(() => {
    body.style.overflow = originOverflow;
  });

  return visible;
}