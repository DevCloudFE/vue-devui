import { defineComponent, ExtractPropTypes, inject, computed } from 'vue';
import { radioProps, radioGroupInjectionKey } from './use-radio';
import './radio.scss';

export default defineComponent({
  name: 'DRadio',
  props: radioProps,
  emits: ['change', 'update:checked'],
  setup(props: ExtractPropTypes<typeof radioProps>, ctx) {
    const radioGroupConf = inject(radioGroupInjectionKey, null);
    const isChecked = computed(() => {
      return radioGroupConf ? radioGroupConf.value.value === props.value : props.checked;
    });
    const radioName = computed(() => {
      return radioGroupConf ? radioGroupConf.name.value : props.name;
    });
    const canChange = (targetVal: string) => {
      const beforeChange = props.beforeChange || (radioGroupConf ? radioGroupConf.beforeChange : undefined);
      let flag = Promise.resolve(true);
      if (beforeChange) {
        const res = beforeChange(targetVal);
        if (typeof res === 'undefined') {
          return flag;
        }
        if (typeof res === 'boolean') {
          flag = Promise.resolve(res);
        } else {
          flag = res;
        }
      }
      return flag;
    };

    return {
      isChecked,
      radioName,
      handleChange: (event: Event) => {
        canChange((event.target as HTMLInputElement).value).then(res => {
          if (!res) {
            event.preventDefault();
            return;
          }
          radioGroupConf?.doChange(props.value);
          ctx.emit('update:checked', (event.target as HTMLInputElement).checked);
          ctx.emit('change', props.value);
        });
      }
    };
  },
  render () {
    const {
      disabled,
      radioName,
      value,
      isChecked,
      $slots,
      handleChange
    } = this;
    const labelCls = {
      'devui-radio': true,
      active: isChecked,
      disabled
    };
    
    return (
      <label class={labelCls}>
        <input
          type="radio"
          name={radioName}
          class="devui-radio-input"
          disabled={disabled}
          onChange={handleChange}
          value={value}
          checked={isChecked}
           />
        <span class="devui-radio-material">
          <svg height="100%" width="100%" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <circle class={{'devui-outer': true, disabled}} cx="512" cy="512" r="486.5" stroke-width="51" />
            <circle class={{'devui-inner': true, disabled}} cx="512" fill-rule="nonzero" cy="512" r="320" />
          </svg>
        </span>
        <span class="devui-radio-label">{$slots.default?.()}</span>
      </label>
    );
  }
});
