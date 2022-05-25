import { computed, ref } from 'vue';
import type { SetupContext, Ref } from 'vue';
import { InputNumberProps, UseEvent, UseRender } from './input-number-types';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('input-number');

export function useRender(props: InputNumberProps): UseRender {
  const isFocus = ref(false);

  const wrapClass = computed(() => ({
    [ns.b()]: true,
    [ns.m('disabled')]: props.disabled,
    [ns.m(props.size)]: true,
  }));

  const controlButtonClass = computed(() => ({
    [ns.e('control-button')]: true,
    active: isFocus.value,
  }));

  const inputWrapClass = ns.e('input-wrap');

  const inputInnerClass = computed(() => ({
    [ns.e('input-style')]: true,
    [ns.e('input-box')]: true,
    active: isFocus.value,
  }));

  return { isFocus, wrapClass, controlButtonClass, inputWrapClass, inputInnerClass };
}

export function useEvent(props: InputNumberProps, ctx: SetupContext, isFocus: Ref<boolean>): UseEvent {
  const inputVal = ref(props.modelValue < props.min ? props.min : props.modelValue);

  const onAdd = () => {
    if (props.disabled || inputVal.value >= props.max) {
      return;
    }
    if (props.step !== 0) {
      const maxSpaceVal = props.max - inputVal.value;
      if (inputVal.value < props.max && maxSpaceVal < props.step) {
        inputVal.value += maxSpaceVal;
      } else if (inputVal.value < props.max && maxSpaceVal > props.step) {
        inputVal.value += props.step;
      } else {
        inputVal.value += props.step;
      }
    } else {
      inputVal.value += 1;
    }
    isFocus.value = true;
    ctx.emit('change', inputVal.value);
    ctx.emit('update:modelValue', inputVal.value);
  };

  const onSubtract = () => {
    if (props.disabled || inputVal.value <= props.min) {
      return;
    }
    if (props.step !== 0) {
      const minSpaceVal = inputVal.value - props.min;
      if (inputVal.value > props.min && minSpaceVal > props.step) {
        inputVal.value -= props.step;
      } else if (inputVal.value > props.min && minSpaceVal < props.step) {
        inputVal.value -= minSpaceVal;
      } else {
        inputVal.value -= props.step;
      }
    } else {
      inputVal.value -= 1;
    }
    isFocus.value = true;
    ctx.emit('change', inputVal.value);
    ctx.emit('update:modelValue', inputVal.value);
  };

  const onInput = (event: Event) => {
    console.log(event);
    inputVal.value = parseInt((event.target as HTMLInputElement).value || '0');
    ctx.emit('input', inputVal.value);
    ctx.emit('update:modelValue', inputVal.value);
  };

  const onFocus = ($event: Event) => {
    isFocus.value = true;
    ctx.emit('focus', $event);
  };
  const onBlur = ($event: Event) => {
    console.log('blur', $event);
    isFocus.value = false;
    ctx.emit('blur', $event);
  };
  const onChange = ($event: Event) => {
    ctx.emit('change', ($event.target as HTMLInputElement).value);
  };
  const onKeydown = ($event: KeyboardEvent) => {
    ctx.emit('keydown', $event);
  };

  return { inputVal, onAdd, onSubtract, onInput, onFocus, onBlur, onChange, onKeydown };
}
