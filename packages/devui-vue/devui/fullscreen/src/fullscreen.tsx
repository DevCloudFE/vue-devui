import { defineComponent, useSlots, renderSlot, ref } from 'vue';
import { fullscreenProps, FullscreenProps } from './fullscreen-types';
import useKeydown from './composables/use-keydown';
import useFullscreen from './composables/use-fullscreen';
import './fullscreen.scss';

export default defineComponent({
  name: 'DFullscreen',
  props: fullscreenProps,
  emits: ['update:modelValue'],
  setup(props: FullscreenProps, ctx) {
    const slotElement = ref(null);

    useFullscreen(props, slotElement, ctx);
    useKeydown(props, ctx);

    return () => {
      const defaultSlot = renderSlot(useSlots(), 'default');
      return <div ref={slotElement}>{defaultSlot}</div>;
    };
  },
});
