import { defineComponent, ref,computed } from 'vue'
import { inputNumberProps, InputNumberProps } from './input-number-types'
import './input-number.scss'

export default defineComponent({
  name: 'DInputNumber',
  props: inputNumberProps,
  emits: ['update:modelValue','change','input','focus','blur','keydown'],
  setup(props:InputNumberProps, ctx) {
    const inputVal = ref(props.modelValue)
    let isDisabled = ref('')
    let isSize = ref('')

    // 大小
    isSize = computed(() => {
      console.log(props.size)
      return `devui-input-number-${props.size}`
    })
    
    // 判断是否禁用
    isDisabled = computed(() => {
      return props.disabled?'devui-input-disabled':''
    })

    //新增
    const add = () => {
      if(props.disabled) return
      if(inputVal.value >= props.max) return
      inputVal.value += props.step != 0?props.step:1
      ctx.emit('change',inputVal.value)
      ctx.emit('update:modelValue', inputVal.value);
    }
    // 减少
    const subtract = () => {
      if(props.disabled) return
      if(inputVal.value <= props.min) return
      inputVal.value -= props.step != 0?props.step:1
      ctx.emit('change',inputVal.value)
      ctx.emit('update:modelValue', inputVal.value);
    }
    const onInput = (val) => {
      inputVal.value = parseInt(val.data);
      ctx.emit('input', val.data);
    };
    const onFocus = ($event: Event) => {
      ctx.emit('focus', $event);
    };
    const onBlur = ($event: Event) => {
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
      isDisabled,
      isSize,
      add,
      subtract,
      onInput,
      onChange,
      onKeydown,
      onBlur,
      onFocus
    }
  },
  render() {
    const {
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
      onFocus
    } = this;
    const dInputNum = [
      'devui-input-number',
      isDisabled,
      isSize
    ]
    return (
      <div class={dInputNum}>
        <div class='devui-input-item'>
          <span class='devui-subtract' onClick={subtract}>-</span>
          <input 
            type="number" 
            value={inputVal} 
            class='devui-input-style' 
            placeholder={placeholder}
            onInput={onInput} 
            onChange={onChange} 
            onFocus={onFocus}
            onBlur={onBlur}
            onKeydown={onKeydown}/>
          <span class='devui-add' onClick={add}>+</span>
        </div>
      </div>
    )
  }
})
