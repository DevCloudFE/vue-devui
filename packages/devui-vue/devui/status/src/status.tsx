import { defineComponent, computed } from 'vue';
import type { IStatusType } from './status-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './status.scss';

export default defineComponent({
  name: 'DStatus',
  props: {
    type: {
      default: 'invalid',
      type: String as () => IStatusType,
    },
  },
  setup(props, ctx) {
    const ns = useNamespace('status');
    const typeClass = computed(() => {
      const { type } = props;
      const typeStatus = ['success', 'error', 'initial', 'warning', 'waiting', 'running', 'invalid'];
      let typeClassStr = `${ns.b()} ${ns.em('bg', 'invalid')}`;
      if (typeStatus.includes(type)) {
        typeClassStr = `${ns.b()} ${ns.em('bg', type)}`;
      }
      return typeClassStr;
    });
    return () => {
      return <span class={typeClass.value}>{ctx.slots.default?.()}</span>;
    };
  },
});
