import { computed, reactive, toRefs, watch, ref } from 'vue';
import type { SetupContext, Ref } from 'vue';
import { InputNumberProps, UseEvent, UseRender, IState, UseExpose } from './input-number-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { isNull, isNumber, isUndefined } from '../../shared/utils';

const ns = useNamespace('input-number');

export function useRender(props: InputNumberProps, ctx: SetupContext): UseRender {
  const { style, class: customClass, ...otherAttrs } = ctx.attrs;
  const customStyle = { style };

  const wrapClass = computed(() => [
    {
      [ns.b()]: true,
    },
    customClass,
  ]);

  const controlButtonsClass = computed(() => ({
    [ns.e('control-buttons')]: true,
    disabled: props.disabled,
    [ns.m(props.size)]: true,
  }));

  const inputWrapClass = computed(() => ({
    [ns.e('input-wrap')]: true,
    [ns.m(props.size)]: true,
  }));

  const inputInnerClass = computed(() => ({
    [ns.e('input-box')]: true,
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
      return state.userInputValue;
    }
    let currentValue = state.currentValue;
    if (currentValue === '' || isUndefined(currentValue) || Number.isNaN(currentValue)) {
      return '';
    }
    if (isNumber(currentValue)) {
      currentValue = currentValue.toFixed(numPrecision.value);
    }
    return currentValue;
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

  const correctValue = (value: number | string | undefined | null, shouldUpdate?: boolean) => {
    if (value === '' || isUndefined(value) || isNull(value) || Number.isNaN(value)) {
      return undefined;
    }
    let newVal = Number(value);
    newVal = toPrecision(newVal);
    if (newVal > max.value || newVal < min.value) {
      newVal = newVal > max.value ? max.value : min.value;
      shouldUpdate && ctx.emit('update:modelValue', newVal);
    }
    return newVal;
  };

  const setCurrentValue = (value: number | string | undefined) => {
    const oldVal = state.currentValue;
    const newVal = correctValue(value);
    if (oldVal === newVal) {
      return;
    }
    state.userInputValue = undefined;
    ctx.emit('update:modelValue', newVal);
    ctx.emit('input', newVal);
    ctx.emit('change', newVal, oldVal);
    state.currentValue = newVal;
  };

  const minDisabled = computed(() => isNumber(state.currentValue) && computeByStep(state.currentValue, -1) < props.min);
  const maxDisabled = computed(() => isNumber(state.currentValue) && computeByStep(state.currentValue) > props.max);

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
      state.currentValue = correctValue(val, true);
      state.userInputValue = undefined;
    },
    { immediate: true }
  );

  const onInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    state.userInputValue = value;
  };

  const onChange = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    const newVal = value !== '' ? Number(value) : '';
    if ((isNumber(newVal) && !Number.isNaN(newVal)) || value === '') {
      setCurrentValue(newVal);
    }
    state.userInputValue = undefined;
  };

  return { inputVal, minDisabled, maxDisabled, onAdd, onSubtract, onInput, onChange };
}
