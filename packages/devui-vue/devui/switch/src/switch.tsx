import { defineComponent, renderSlot, useSlots } from 'vue';
import { SwitchProps, switchProps } from './switch-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './switch.scss';

export default defineComponent({
  name: 'DSwitch',
  props: switchProps,
  emits: ['change', 'update:checked'],
  setup(props: SwitchProps, ctx) {
    const canChange = () => {
      if (props.disabled) {
        return Promise.resolve(false);
      }
      if (props.beforeChange) {
        const res = props.beforeChange(!props.checked);
        return typeof res === 'boolean' ? Promise.resolve(res) : res;
      }

      return Promise.resolve(true);
    };
    const toggle = () => {
      canChange().then((res) => {
        if (!res) {
          return;
        }
        ctx.emit('update:checked', !props.checked);
        ctx.emit('change', !props.checked);
      });
    };

    return {
      toggle,
    };
  },

  render() {
    const { size, checked, disabled, color, toggle } = this;
    const ns = useNamespace('switch');
    const outerCls = {
      [ns.b()]: true,
      [ns.m(size)]: size !== '',
      [ns.m('checked')]: checked,
      [ns.m('disabled')]: disabled,
    };
    const outerStyle = [`background: ${checked && !disabled ? color : ''}`, `border-color: ${checked && !disabled ? color : ''}`];

    const checkedContent = renderSlot(useSlots(), 'checkedContent');
    const uncheckedContent = renderSlot(useSlots(), 'uncheckedContent');
    return (
      <span class={outerCls} style={outerStyle} onClick={toggle}>
        <span class={ns.e('inner-wrapper')}>
          <div class={ns.e('inner')}>{checked ? checkedContent : uncheckedContent}</div>
        </span>
        <small></small>
      </span>
    );
  },
});
