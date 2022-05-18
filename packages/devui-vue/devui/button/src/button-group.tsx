import { defineComponent, provide, toRef } from 'vue';
import { buttonGroupProps, ButtonGroupProps, buttonGroupInjectionKey } from './button-types';
import './button-group.scss';
import { useNamespace } from '../../shared/hooks/use-namespace';


export default defineComponent({
  name: 'DButtonGroup',
  props: buttonGroupProps,
  setup(props: ButtonGroupProps, { slots }) {

    const ns = useNamespace('button-group');

    provide(buttonGroupInjectionKey, {
      size: toRef(props, 'size'),
    });

    return () => {
      return (
        <div class={ns.b()}>{slots.default && slots.default()}</div>
      );
    };
  },
});
