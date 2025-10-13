import { computed, Ref, SetupContext } from 'vue';
import { debounce, isFunction } from 'lodash-es';
import { EditableSelectProps } from '../editable-select-types';
import { States } from './use-select';

export interface UseInputEventReturnType {
  blur: () => void;
  setSoftFocus: () => void;
  onMouseenter: () => void;
  onMouseleave: () => void;
  onInput: (e: Event) => void;
  handleBlur: (e: FocusEvent) => void;
  handleFocus: (e: FocusEvent) => void;
  handleClear: (e: Event) => void;
}

export function useInputEvent(
  inputRef: Ref<HTMLInputElement | undefined>,
  props: EditableSelectProps,
  states: States,
  ctx: SetupContext
): UseInputEventReturnType {
  const delay = computed(() => (props.remote ? 300 : 0));

  const setSoftFocus = () => {
    const _input = inputRef.value;
    if (_input) {
      _input.focus?.();
    }
  };

  // 聚焦
  const handleFocus = (e: FocusEvent) => {
    if (!states.softFocus) {
      ctx.emit('focus', e);
      states.isFocus = true;
    } else {
      states.softFocus = false;
    }
  };

  // 失焦
  const handleBlur = async (e: FocusEvent) => {
    if (states.isSilentBlur) {
      states.isSilentBlur = false;
    } else {
      ctx.emit('blur', e);
      states.isFocus = true;
    }
    states.softFocus = false;
  };

  const updateInputValue = (value: string) => {
    states.inputValue = value;
  };

  const handleQueryChange = (value: string) => {
    if (props.remote && isFunction(props.remoteMethod)) {
      props.remoteMethod(value);
    } else if (isFunction(props.filterMethod)) {
      props.filterMethod(value);
    }
  };

  const handleInputChange = () => {
    states.query = states.inputValue;
    ctx.emit('inputChange', states.query);
    handleQueryChange(states.query);
  };

  const debouncedOnInputChange = debounce(handleInputChange, delay.value);

  // 输入
  const onInput = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    updateInputValue(value);

    if (states.inputValue.length > 0 && !states.visible) {
      states.visible = true;
    }

    if (props.remote) {
      debouncedOnInputChange();
    } else {
      handleInputChange();
    }
  };

  const onMouseenter = () => {
    states.inputHovering = true;
  };

  const onMouseleave = () => {
    states.inputHovering = false;
  };
  // 清空输入
  const handleClear = () => {
    ctx.emit('update:modelValue', '');
    ctx.emit('change', '');
    ctx.emit('clear');

    states.hoveringIndex = -1;
    states.visible = false;
  };

  return {
    blur,
    setSoftFocus,
    handleFocus,
    handleBlur,
    handleClear,
    onInput,
    onMouseenter,
    onMouseleave,
  };
}
