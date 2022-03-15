import { defineComponent, ExtractPropTypes, inject, computed } from 'vue';
import { radioProps, radioGroupInjectionKey } from './radio-types';
import './radio.scss';

export default defineComponent({
  name: 'DRadio',
  props: radioProps,
  emits: ['change', 'update:modelValue'],
  setup(props: ExtractPropTypes<typeof radioProps>, { emit }) {
    const radioGroupConf = inject(radioGroupInjectionKey, null);

    /** 是否禁用 */
    const isDisabled = computed(() => {
      return props.disabled || radioGroupConf?.disabled.value;
    });
    /** 判断是否勾选 */
    const isChecked = computed(() => {
      const _value = radioGroupConf ? radioGroupConf.modelValue.value : props.modelValue;

      return props.value === _value;
    });
    /** radio 的 name 属性 */
    const radioName = computed(() => {
      return radioGroupConf ? radioGroupConf.name.value : props.name;
    });

    /** 判断是否允许切换 */
    const judgeCanChange = (_value: string) => {
      const beforeChange = props.beforeChange || (radioGroupConf ? radioGroupConf.beforeChange : null);

      let flag = Promise.resolve(true);
      if (beforeChange) {
        const canChange = beforeChange(_value);
        if (typeof canChange === 'undefined') {
          return flag;
        }
        if (typeof canChange === 'boolean') {
          flag = Promise.resolve(canChange);
        } else {
          flag = canChange;
        }
      }
      return flag;
    };

    return {
      isChecked,
      radioName,
      disabled: isDisabled,
      handleChange: async (event: Event) => {
        const _value = props.value;
        const canChange = await judgeCanChange(_value);

        // 不可以切换
        if (!canChange) {
          event.preventDefault();
          return;
        }
        radioGroupConf?.emitChange(_value); // 触发父组件的change
        emit('update:modelValue', _value);
        emit('change', _value);
      }
    };
  },
  render() {
    const {
      disabled,
      radioName,
      value,
      isChecked,
      $slots,
      handleChange
    } = this;
    const labelCls = [
      'devui-radio',
      {
        active: isChecked,
        disabled
      }
    ];

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
            <circle class="devui-radio-material-outer" cx="512" cy="512" r="486.5" stroke-width="51" />
            <circle class="devui-radio-material-inner" cx="512" fill-rule="nonzero" cy="512" r="320" />
          </svg>
        </span>
        <span class="devui-radio-label">{$slots.default?.()}</span>
      </label>
    );
  }
});
