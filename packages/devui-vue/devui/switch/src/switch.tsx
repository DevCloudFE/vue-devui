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
      const switchCls = {
        [ns.b()]: true,
        [ns.m(switchSize.value)]: true,
      };

      const switchWrapperCls = {
        [ns.e('wrapper')]: true,
        [ns.m('checked')]: checked.value,
        [ns.m('disabled')]: switchDisabled.value,
      };

      const switchWrapperStyle = [
        `background: ${checked.value && !switchDisabled.value ? props.color : ''}`,
        `border-color: ${checked.value && !switchDisabled.value ? props.color : ''}`,
      ];

      const checkedContent = renderSlot(useSlots(), 'checkedContent');
      const uncheckedContent = renderSlot(useSlots(), 'uncheckedContent');

      return (
        <div class={switchCls}>
          <span class={switchWrapperCls} style={switchWrapperStyle} onClick={toggle}>
            <span class={ns.e('inner-wrapper')}>
              <div class={ns.e('inner')}>{checked.value ? checkedContent : uncheckedContent}</div>
            </span>
            <small></small>
          </span>
        </div>
      );
    };
  },
});
