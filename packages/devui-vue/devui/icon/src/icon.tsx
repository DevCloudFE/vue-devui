import { computed, defineComponent, SetupContext, toRefs } from 'vue';
import { iconProps, IconProps } from './icon-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { useIconDom } from './composables/use-icon-dom';

export default defineComponent({
  name: 'DIcon',
  props: iconProps,
  emits: ['click'],
  setup(props: IconProps, ctx: SetupContext) {
    const { disabled, operable } = toRefs(props);
    const { iconDom } = useIconDom(props, ctx);
    const ns = useNamespace('icon');
    const wrapClassed = computed(() => ({
      [ns.e('container')]: true,
      [ns.m('disabled')]: disabled.value,
      [ns.m('operable')]: operable.value,
      [ns.m('no-slots')]: !Object.keys(ctx.slots).length,
    }));
    const onClick = (e: Event) => {
      if (disabled.value) {
        return;
      }
      ctx.emit('click', e);
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
