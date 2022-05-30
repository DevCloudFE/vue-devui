import { defineComponent, SetupContext, toRefs, Transition } from 'vue';
import { fixedOverlayProps, FixedOverlayProps } from './fixed-overlay-types';
import { useFixedOverlay } from './use-fixed-overlay';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import './fixed-overlay.scss';

export const FixedOverlay = defineComponent({
  name: 'DFixedOverlay',
  inheritAttrs: false,
  props: fixedOverlayProps,
  emits: ['update:modelValue', 'click'],
  setup(props: FixedOverlayProps, ctx: SetupContext) {
    const { modelValue } = toRefs(props);
    const ns = useNamespace('fixed-overlay');
    const { onClick } = useFixedOverlay(props, ctx);

    return () => (
      <Transition name={ns.m('fade')}>
        {modelValue.value && (
          <div class={ns.b()} {...ctx.attrs} onClick={onClick}>
            {ctx.slots.default?.()}
          </div>
        )}
      </Transition>
    );
  },
});
