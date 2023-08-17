import { defineComponent } from 'vue';
import { useNamespace } from '@devui/shared/utils';

export default defineComponent({
  name: 'DCarouselItem',
  setup(props, { slots }) {
    const ns = useNamespace('carousel');
    const children = slots.default?.();

    return () => <div class={ns.e('item')}>{children}</div>;
  },
});
