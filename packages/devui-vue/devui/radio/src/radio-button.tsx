import { defineComponent, SetupContext } from 'vue';
import { radioProps, RadioProps } from './radio-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { useRadio } from './use-radio';
import './radio.scss';

export default defineComponent({
  name: 'DRadioButton',
  props: radioProps,
  emits: ['change', 'update:modelValue'],
  setup(props: RadioProps, ctx: SetupContext) {
    const ns = useNamespace('radio-button');
    const { isChecked, radioName, isDisabled, handleChange } = useRadio(props, ctx);
    return () => {
      const labelCls = [
        ns.b(),
        {
          active: isChecked.value,
          disabled: isDisabled.value,
        },
      ];

      return (
        <label class={labelCls}>
          <input
            type="radio"
            name={radioName.value}
            class={ns.e('input')}
            disabled={isDisabled.value}
            onChange={handleChange}
            value={props.value}
            checked={isChecked.value}
          />
          <span class={ns.e('label')}>{ctx.slots.default?.()}</span>
        </label>
      );
    };
  },
});
