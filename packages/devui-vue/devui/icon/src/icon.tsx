import { computed, defineComponent, SetupContext, toRefs } from 'vue';
import { iconProps, IconProps } from './icon-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { useIconDom } from './composables/use-icon-dom';

export default defineComponent({
  name: 'DIcon',
  props: iconProps,
  setup(props: IconProps, ctx: SetupContext) {
    const { disabled, operable } = toRefs(props);
    const { iconDom } = useIconDom(props, ctx);
    const ns = useNamespace('icon');
    const wrapClassed = computed(() => ({
      [ns.e('container')]: true,
      [ns.m('disabled')]: disabled.value,
      [ns.m('operable')]: operable.value,
    }));
    const onClick = (e: Event) => {
      if (disabled.value) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };

    return () => (
      <div class={wrapClassed.value} onClick={onClick}>
        {ctx.slots.prefix?.()}
        {iconDom()}
        {ctx.slots.suffix?.()}
      </div>
    );
  },
});
