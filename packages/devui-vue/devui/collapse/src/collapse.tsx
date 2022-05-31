import { defineComponent, provide, reactive, toRefs } from 'vue';
import { SELECT_TOKEN } from './const';
import { collapseProps, CollapseContext } from './collapse-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './collapse.scss';

export default defineComponent({
  name: 'DCollapse',
  props: collapseProps,
  emits: ['change', 'update:modelValue'],
  setup(props, ctx) {
    const ns = useNamespace('collapse');
    const scrollbarNs = useNamespace('scrollbar');
    provide(
      SELECT_TOKEN,
      reactive({
        ...toRefs(props),
      }) as CollapseContext
    );

    return () => {
      return <div class={[ns.b(), scrollbarNs.b()]}>{ctx.slots.default?.()}</div>;
    };
  },
});
