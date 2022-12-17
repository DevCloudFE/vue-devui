import { computed, inject, SetupContext, toRef, provide, watch } from 'vue';
import { FORM_TOKEN, FORM_ITEM_TOKEN } from '../../form';
import { RadioProps, RadioGroupProps, radioGroupInjectionKey, UseRadioFn, valueTypes, UseRadioButtonFn } from './radio-types';

export function useRadio(props: RadioProps, ctx: SetupContext): UseRadioFn {
  const formContext = inject(FORM_TOKEN, undefined);
  const formItemContext = inject(FORM_ITEM_TOKEN, undefined);
  const radioGroupConf = inject(radioGroupInjectionKey, null);

  /** 是否禁用 */
  const isDisabled = computed(() => {
    return formContext?.disabled || props.disabled || radioGroupConf?.disabled.value;
  });
  /** 判断是否勾选 */
  const isChecked = computed(() => {
    const _value = radioGroupConf ? radioGroupConf.modelValue.value : props.modelValue;

    return props.value === _value;
  });
  /** radio 的 name 属性 */
  const radioName = computed(() => {
    return radioGroupConf ? radioGroupConf.name.value : props.name || void 0;
  });

  /** 判断是否允许切换 */
  const judgeCanChange = (_value: valueTypes) => {
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

  const handleChange = async (event: Event) => {
    const _value = props.value;
    const canChange = await judgeCanChange(_value);

    // 不可以切换
    if (!canChange) {
      event.preventDefault();
      return;
    }
    radioGroupConf?.emitChange(_value); // 触发父组件的change
    ctx.emit('update:modelValue', _value);
    ctx.emit('change', _value);
  };

  const border = computed(() => {
    return radioGroupConf?.border.value || props.border;
  });

  const size = computed(() => {
    return props.size || radioGroupConf?.size.value || formContext?.size || 'md';
  });

  watch(
    () => props.modelValue,
    () => {
      formItemContext?.validate('change').catch((err) => console.warn(err));
    }
  );
  return {
    isChecked,
    radioName,
    isDisabled,
    handleChange,
    border,
    size,
  };
}

export function useRadioGroup(props: RadioGroupProps, ctx: SetupContext): void {
  const formContext = inject(FORM_TOKEN, undefined);
  const formItemContext = inject(FORM_ITEM_TOKEN, undefined);

  /** change 事件 */
  const emitChange = (radioValue: valueTypes) => {
    ctx.emit('update:modelValue', radioValue);
    ctx.emit('change', radioValue);
  };

  watch(
    () => props.modelValue,
    () => {
      formItemContext?.validate('change').catch((err) => console.warn(err));
    }
  );

  // 组件 size 优先于表单 size
  const radioGroupSize = computed(() => props.size || formContext?.size || '');

  // 注入给子组件
  provide(radioGroupInjectionKey, {
    modelValue: toRef(props, 'modelValue'),
    name: toRef(props, 'name'),
    disabled: toRef(props, 'disabled'),
    border: toRef(props, 'border'),
    size: radioGroupSize,
    beforeChange: props.beforeChange,
    emitChange,
    fill: toRef(props, 'fill'),
    textColor: toRef(props, 'textColor'),
  });
}

export function useRadioButton(): UseRadioButtonFn {
  const radioGroupConf = inject(radioGroupInjectionKey, null);
  const mergedTextColor = computed(() => {
    return radioGroupConf?.textColor.value ?? undefined;
  });
  const mergedColor = computed(() => {
    return radioGroupConf?.fill.value ?? undefined;
  });

  return {
    mergedTextColor,
    mergedColor,
  };
}
