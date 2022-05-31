import { defineComponent, SetupContext } from 'vue';
import { radioProps, RadioProps } from './radio-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { useRadio, useRadioButton } from './use-radio';
import './radio-button.scss';

export default defineComponent({
  name: 'DRadioButton',
  props: radioProps,
  emits: ['change', 'update:modelValue'],
  setup(props: RadioProps, ctx: SetupContext) {
    const ns = useNamespace('radio-button');
    const { isChecked, radioName, isDisabled, handleChange, size } = useRadio(props, ctx);
    const { mergedTextColor, mergedColor } = useRadioButton();
    return () => {
      const labelCls = {
        active: isChecked.value,
        disabled: isDisabled.value,
        [ns.b()]: true,
        [ns.m(size.value)]: true,
      };

      const spanStyle = [
        `border-color:${isChecked.value && mergedColor.value ? mergedColor.value : ''}`,
        `background-color:${isChecked.value && mergedColor.value ? mergedColor.value : ''}`,
        `color:${isChecked.value && mergedTextColor.value ? mergedTextColor.value : ''}`,
      ];
      return (
        <label class={labelCls} style={spanStyle}>
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
