export default {
  mounted: (el: HTMLElement, binding: Record<string, any>) => {
    if (binding.value) {
      el.focus();
    }
  },
};
