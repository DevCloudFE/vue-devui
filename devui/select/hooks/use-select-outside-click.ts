import { Ref, onMounted, onBeforeUnmount } from 'vue';

export default function (
  refs: Ref[],
  isOpen: Ref<boolean>,
  toggleChange: (isOpen: boolean) => void
): void {
  function onGlobalMouseDown(e: MouseEvent) {
    let target = e.target as HTMLElement;

    /**
     * TODO: 需要去了解下shadow DOM
     */
    if (target.shadowRoot && e.composed) {
      target = (e.composedPath()[0] || target) as HTMLElement;
    }

    const element = [refs[0]?.value, refs[1]?.value];
    if (
      isOpen.value &&
      element.every((el) => el && !el.contains(target) && el !== target)
    ) {
      toggleChange(false);
    }
  }

  onMounted(() => {
    document.body.addEventListener('mousedown', onGlobalMouseDown, false);
  });

  onBeforeUnmount(() => {
    document.body.addEventListener('mousedown', onGlobalMouseDown, false);
  });
}
