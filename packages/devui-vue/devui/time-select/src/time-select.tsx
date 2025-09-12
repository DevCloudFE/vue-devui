import { defineComponent, getCurrentInstance, SetupContext } from 'vue';
import { createI18nTranslate } from '../../locale/create';
import { Select } from '../../select/index';
import { timeSelectProps, TimeSelectProps } from './time-select-types';
import { useTimeSelect } from './use-time-select';

export default defineComponent({
  name: 'DTimeSelect',
  components: { Select },
  props: timeSelectProps,
  emits: ['change', 'blur', 'focus', 'update:modelValue'],
  setup(props: TimeSelectProps, ctx: SetupContext) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DTimeSelect', app);

    const { options, changeData, select, clearData, focusFun, blurFun } = useTimeSelect(props, ctx);
    return () => {
      return (
        <Select
          ref={select}
          modelValue={props.modelValue}
          options={options.value}
          onValueChange={changeData}
          placeholder={props.placeholder || t('placeholder')}
          option-disabled-key="disabled"
          disabled={props.disabled}
          allow-clear={props.clearable}
          size={props.size}
          onClear={clearData}
          onFocus={focusFun}
          onBlur={blurFun}
        />
      );
    };
  },
});
