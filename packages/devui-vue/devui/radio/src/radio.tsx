import { defineComponent, SetupContext } from 'vue';
import { radioProps, RadioProps } from './radio-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
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
      const labelCls = {
        active: isChecked.value,
        disabled: isDisabled.value,
        [ns.b()]: true,
        [ns.m('bordered')]: border.value,
        [ns.m(size.value)]: size.value,
      };

      return (
        <div class={radioCls}>
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
            <span class={ns.e('material')}>
              <svg height="100%" width="100%" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <circle
                  class={{ [ns.e('material-outer')]: true, disabled: isDisabled.value }}
                  cx="512"
                  cy="512"
                  r="486.5"
                  stroke-width="51"
                />
                <circle
                  class={{ [ns.e('material-inner')]: true, disabled: isDisabled.value }}
                  cx="512"
                  fill-rule="nonzero"
                  cy="512"
                  r="320"
                />
              </svg>
            </span>
            <span class={ns.e('label')}>{ctx.slots.default?.()}</span>
          </label>
        </div>
      );
    };
  },
});
