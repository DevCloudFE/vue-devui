import { defineComponent, SetupContext, computed } from 'vue';
import { radioProps, RadioProps } from './radio-types';
import { useNamespace } from '@devui/shared/utils';
import { useRadio } from './use-radio';
import './radio.scss';

export default defineComponent({
  name: 'DRadio',
  props: radioProps,
  emits: ['change', 'update:modelValue'],
  setup(props: RadioProps, ctx: SetupContext) {
    const ns = useNamespace('radio');
    const { isChecked, radioName, isDisabled, handleChange, border, size } = useRadio(props, ctx);
    return () => {
      const radioCls = {
        [ns.e('wrapper')]: true,
      };
      const labelCls = computed(() => ({
        active: isChecked.value,
        disabled: isDisabled.value,
        [ns.b()]: true,
        [ns.m('bordered')]: border.value,
        [ns.m(size.value)]: border.value,
        [ns.m('glow-style')]: props.showGlowStyle,
      }));

      return (
        <div class={radioCls}>
          <label class={labelCls.value}>
            <input
              type="radio"
              name={radioName.value}
              class={ns.e('input')}
              disabled={isDisabled.value}
              onClick={handleChange}
              value={props.value}
              checked={isChecked.value}
            />
            <span class={ns.e('material')}></span>
            <span class={ns.e('label')}>{ctx.slots.default?.()}</span>
          </label>
        </div>
      );
    };
  },
});
