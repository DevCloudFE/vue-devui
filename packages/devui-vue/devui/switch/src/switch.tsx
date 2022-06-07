import { defineComponent, renderSlot, useSlots, SetupContext } from 'vue';
import { SwitchProps, switchProps } from './switch-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { useSwitch } from './use-switch';
import './switch.scss';

export default defineComponent({
  name: 'DSwitch',
  props: switchProps,
  emits: ['change', 'update:modelValue'],
  setup(props: SwitchProps, ctx: SetupContext) {
    const ns = useNamespace('switch');
    const { toggle, checked, switchDisabled, switchSize } = useSwitch(props, ctx);
    return () => {
      const outerCls = {
        [ns.b()]: true,
        [ns.m(switchSize.value)]: true,
        [ns.m('checked')]: checked.value,
        [ns.m('disabled')]: switchDisabled.value,
      };
      const outerStyle = [
        `background: ${checked.value && !switchDisabled.value ? props.color : ''}`,
        `border-color: ${checked.value && !switchDisabled.value ? props.color : ''}`,
      ];

      const checkedContent = renderSlot(useSlots(), 'checkedContent');
      const uncheckedContent = renderSlot(useSlots(), 'uncheckedContent');
      return (
        <span class={outerCls} style={outerStyle} onClick={toggle}>
          <span class={ns.e('inner-wrapper')}>
            <div class={ns.e('inner')}>{checked.value ? checkedContent : uncheckedContent}</div>
          </span>
          <small></small>
        </span>
      );
    };
  },
});
