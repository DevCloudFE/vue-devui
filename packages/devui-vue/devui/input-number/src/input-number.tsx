import { defineComponent, toRefs } from 'vue';
import type { SetupContext } from 'vue';
import { inputNumberProps, InputNumberProps } from './input-number-types';
import Icon from '../../icon/src/icon';
import { useRender, useEvent } from './use-input-number';
import './input-number.scss';

export default defineComponent({
  name: 'DInputNumber',
  props: inputNumberProps,
  emits: ['update:modelValue', 'change', 'input', 'focus', 'blur', 'keydown'],
  setup(props: InputNumberProps, ctx: SetupContext) {
    const { disabled } = toRefs(props);
    const { isFocus, wrapClass, controlButtonClass, inputWrapClass, inputInnerClass } = useRender(props);
    const { inputVal, onAdd, onSubtract, onInput, onFocus, onBlur, onChange, onKeydown } = useEvent(props, ctx, isFocus);

    return () => (
      <div class={wrapClass.value}>
        <div onBlur={onBlur} class={controlButtonClass.value}>
          <span onClick={onAdd}>
            <Icon size="12px" name="chevron-up"></Icon>
          </span>
          <span onClick={onSubtract}>
            <Icon size="12px" name="chevron-down"></Icon>
          </span>
        </div>
        <div class={inputWrapClass}>
          <input
            type="number"
            value={inputVal.value}
            placeholder={props.placeholder}
            disabled={disabled.value}
            class={inputInnerClass.value}
            onInput={onInput}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeydown={onKeydown}
          />
        </div>
      </div>
    );
  },
});
