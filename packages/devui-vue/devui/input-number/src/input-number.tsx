import { defineComponent, ref, computed } from 'vue';
import { inputNumberProps, InputNumberProps } from './input-number-types';
import './input-number.scss';
import Icon from '../../icon/src/icon';

export default defineComponent({
  name: 'DInputNumber',
  props: inputNumberProps,
  emits: ['update:modelValue', 'change', 'input', 'focus', 'blur', 'keydown'],
  setup(props: InputNumberProps, ctx) {
    const inputVal = ref(props.modelValue);

    const focusVal = ref('');

    // 大小
    const isSize = computed(() => {
      return `devui-input-number-${props.size}`;
    });

    // 判断是否禁用
    const isDisabled = computed(() => {
      return props.disabled;
    });

    // 新增
    const add = () => {
      if (props.disabled) {return;}
      if (inputVal.value >= props.max) {return;}
      inputVal.value += props.step != 0 ? props.step : 1;
      focusVal.value = 'active';
      ctx.emit('change', inputVal.value);
      ctx.emit('update:modelValue', inputVal.value);
    };
    // 减少
    const subtract = () => {
      if (props.disabled) {return;}
      if (inputVal.value <= props.min) {return;}
      inputVal.value -= props.step != 0 ? props.step : 1;
      focusVal.value = 'active';
      ctx.emit('change', inputVal.value);
      ctx.emit('update:modelValue', inputVal.value);
    };
    const onInput = (val) => {
      inputVal.value = parseInt(val.data);
      ctx.emit('input', val.data);
      ctx.emit('update:modelValue', val.data);
    };
    const onFocus = ($event: Event) => {
      focusVal.value = 'active';
      ctx.emit('focus', $event);
    };
    const onBlur = ($event: Event) => {
      focusVal.value = '';
      ctx.emit('blur', $event);
    };
    const onChange = ($event: Event) => {
      ctx.emit('change', ($event.target as HTMLInputElement).value);
    };
    const onKeydown = ($event: KeyboardEvent) => {
      ctx.emit('keydown', $event);
    };
    return {
      inputVal,
      focusVal,
      isDisabled,
      isSize,
      add,
      subtract,
      onInput,
      onChange,
      onKeydown,
      onBlur,
      onFocus,
    };
  },
  render() {
    const {
      focusVal,
      placeholder,
      add,
      inputVal,
      isDisabled,
      isSize,
      subtract,
      onInput,
      onChange,
      onKeydown,
      onBlur,
      onFocus,
    } = this;
    const dInputNum = ['devui-input-number', isDisabled ? 'devui-input-disabled' : '', isSize];
    return (
      <div class={dInputNum}>
        <div  onBlur={onBlur} tabindex="1" class={['devui-control-buttons', focusVal.value]}>
          <span  onClick={add}><Icon size="12px" name="chevron-up"  ></Icon></span>
          <span  onClick={subtract}><Icon size="12px" name="chevron-down" ></Icon></span>
        </div>
        <div class="devui-input-item">
          <input
            type="number"
            value={inputVal}
            placeholder={placeholder}
            disabled={isDisabled}
            class={['devui-input-style devui-input-box', focusVal.value]}
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
