import { defineComponent, SetupContext } from 'vue';
import { checkboxProps, CheckboxProps } from './checkbox-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { useCheckbox, useCheckboxButton } from './use-checkbox';
import './checkbox-button.scss';

export default defineComponent({
  name: 'DCheckboxButton',
  props: checkboxProps,
  emits: ['change', 'update:checked', 'update:modelValue'],
  setup(props: CheckboxProps, ctx: SetupContext) {
    const ns = useNamespace('checkbox-button');
    const { mergedChecked, mergedDisabled, mergedIsShowTitle, mergedColor, handleClick, size } = useCheckbox(props, ctx);
    const { mergedTextColor } = useCheckboxButton();
    return () => {
      const labelTitle = mergedIsShowTitle.value ? props.title || props.label : '';
      const spanStyle = [
        `border-color:${mergedChecked.value && mergedColor.value ? mergedColor.value : ''}`,
        `background-color:${mergedChecked.value && mergedColor.value ? mergedColor.value : ''}`,
        `color:${mergedChecked.value && mergedTextColor.value ? mergedTextColor.value : ''}`,
      ];
      const labelCls = {
        [ns.b()]: true,
        active: mergedChecked.value,
        disabled: mergedDisabled.value,
        unchecked: !mergedChecked.value,
      };
      const spanCls = {
        [ns.e('content')]: true,
        [ns.m(size.value)]: true,
      };
      const stopPropagation = ($event: Event) => $event.stopPropagation();

      return (
        <label title={labelTitle} onClick={handleClick} class={labelCls}>
          <input
            name={(props.name || props.value) as string}
            class={ns.e('input')}
            type="checkbox"
            checked={mergedChecked.value}
            disabled={mergedDisabled.value}
            onClick={stopPropagation}
            onChange={stopPropagation}
          />
          <span style={spanStyle} class={spanCls}>
            {props.label || ctx.slots.default?.()}
          </span>
        </label>
      );
    };
  },
});
