import { computed, reactive, toRefs, watch, ref, inject } from 'vue';
import type { SetupContext, Ref, CSSProperties } from 'vue';
import { InputNumberProps, UseEvent, UseRender, IState, UseExpose } from './input-number-types';
import { isNumber, isUndefined, useNamespace } from '@devui/shared/utils';
import { FORM_ITEM_TOKEN, FORM_TOKEN, FormItemContext } from '@devui/shared/components/form';

const ns = useNamespace('input-number');

export function useRender(props: InputNumberProps, ctx: SetupContext): UseRender {
  const formContext = inject(FORM_TOKEN, undefined);
  const { style, class: customClass, ...otherAttrs } = ctx.attrs;
  const customStyle = { style: style as CSSProperties };

  const formItemContext = inject(FORM_ITEM_TOKEN, undefined) as FormItemContext;
  const isValidateError = computed(() => formItemContext?.validateState === 'error');

  const inputNumberSize = computed(() => props.size || formContext?.size || 'md');

  const wrapClass = computed(() => [
    {
      [ns.b()]: true,
    },
    customClass,
  ]);

  const controlButtonsClass = computed(() => ({
    [ns.e('control-buttons')]: true,
    [ns.em('control-buttons', 'error')]: isValidateError.value,
    disabled: props.disabled,
    [ns.m(inputNumberSize.value)]: true,
  }));

  const inputWrapClass = computed(() => ({
    [ns.e('input-wrap')]: true,
    [ns.m(inputNumberSize.value)]: true,
  }));

  const inputInnerClass = computed(() => ({
    [ns.e('input-box')]: true,
    [ns.em('input-box', 'error')]: isValidateError.value,
    disabled: props.disabled,
  }));

  return { wrapClass, customStyle, otherAttrs, controlButtonsClass, inputWrapClass, inputInnerClass };
}

export function useExpose(ctx: SetupContext): UseExpose {
  const inputRef = ref();
  const focus = () => {
    inputRef.value.focus();
  };
  const blur = () => {
    inputRef.value.blur();
  };
  const select = () => {
    inputRef.value.select();
  };
  ctx.expose({ focus, blur, select });

  return { inputRef };
}

function getPrecision(pre: number | undefined): number {
  let precision = 0;
  if (isUndefined(pre)) {
    return precision;
  }
  const preString = pre.toString();
  const dotIndex = preString.indexOf('.');
  if (dotIndex !== -1) {
    precision = preString.length - dotIndex - 1;
  }
  return precision;
}

export function useEvent(props: InputNumberProps, ctx: SetupContext, inputRef: Ref): UseEvent {
  const { min, max, step, disabled } = toRefs(props);
  const state = reactive<IState>({
    currentValue: props.modelValue || '',
    userInputValue: undefined,
  });

  const numPrecision = computed(() => {
    if (!isUndefined(props.precision)) {
      return props.precision;
    } else {
      return Math.max(getPrecision(props.modelValue), getPrecision(step.value));
    }
  });

  const inputVal = computed(() => {
    if (!isUndefined(state.userInputValue)) {
      return props.formatter ? props.formatter(state.userInputValue ?? 0) : state.userInputValue;
    }
    let currentValue = state.currentValue;
    if (currentValue === '' || isUndefined(currentValue) || Number.isNaN(currentValue)) {
      return '';
    }
    if (isNumber(currentValue)) {
      // todo 小数精度 确认是否应该以正则处理
      currentValue = currentValue.toFixed(numPrecision.value);
    }
    return props.formatter ? props.formatter(currentValue ?? 0) : currentValue;
  });

  const toPrecision = (num: number) => {
    return Number.parseFloat(num.toFixed(numPrecision.value));
  };

  const computeByStep = (val: number | string, addOrNot: 1 | -1 = 1) => {
    if (!isNumber(val)) {
      return state.currentValue;
    }
    return toPrecision(val + step.value * addOrNot);
  };

  const correctValue = (value: number | string | undefined | null) => {
    // 校验正则
    const valueStr = value + '';
    if (props.reg && !valueStr.match(new RegExp(props.reg))) {
      return undefined;
    }

    let newVal = Number(value);
    // 不是0 是假值或者是NaN返回undefined
    if (newVal !== 0 && (!Number(value) || Number.isNaN(newVal))) {
      return undefined;
    }

    // 精度限制存在才做转换
    if (!isUndefined(props.precision)) {
      newVal = toPrecision(newVal);
    }

    // 判断数据是否大于或小于限定数值
    if (newVal > max.value || newVal < min.value) {
      newVal = newVal > max.value ? max.value : min.value;
    }
    return newVal;
  };

  const setCurrentValue = (value: number | string | undefined) => {
    const oldVal = state.currentValue;
    const newVal = correctValue(value);

    state.userInputValue = undefined;

    // 0 可以被更新
    if (newVal !== 0 && !newVal) {
      ctx.emit('update:modelValue', oldVal);
      return;
    }

    // 新旧数据一致不做更新
    if (oldVal === newVal) {
      return;
    }

    ctx.emit('update:modelValue', newVal);
    ctx.emit('input', newVal);
    ctx.emit('change', newVal, oldVal);
    state.currentValue = newVal;
  };

  const minDisabled = computed(() => isNumber(state.currentValue) && (computeByStep(state.currentValue, -1) as number) < props.min);
  const maxDisabled = computed(() => isNumber(state.currentValue) && (computeByStep(state.currentValue) as number) > props.max);

  const onAdd = () => {
    if (disabled.value || maxDisabled.value) {
      return;
    }
    inputRef.value.focus();
    const newVal = computeByStep(state.currentValue || 0);
    setCurrentValue(newVal);
  };

  const onSubtract = () => {
    if (disabled.value || minDisabled.value) {
      return;
    }
    inputRef.value.focus();
    const newVal = computeByStep(state.currentValue || 0, -1);
    setCurrentValue(newVal);
  };

  watch(
    () => props.modelValue,
    (val) => {
      state.currentValue = correctValue(val);
    },
    { immediate: true }
  );

  const onInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    if (value[0] === '-') {
      state.userInputValue = '-' + value.substring(1).replace(/[^0-9.]/g, '');
    } else {
      state.userInputValue = value.replace(/[^0-9.]/g, '');
    }
    inputRef.value.value = props.formatter ? props.formatter(state.userInputValue) : state.userInputValue;
  };

  const onChange = () => {
    const value = state.userInputValue;
    const newVal = value !== '' ? Number(value) : '';
    if ((isNumber(newVal) && !Number.isNaN(newVal)) || value === '') {
      setCurrentValue(newVal);
    }
    state.userInputValue = undefined;
  };

  return { inputVal, minDisabled, maxDisabled, onAdd, onSubtract, onInput, onChange };
}
