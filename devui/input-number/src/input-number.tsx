import { defineComponent, ref,computed } from 'vue'
import { inputNumberProps, InputNumberProps } from './input-number-types'
import './input-number.scss'

export default defineComponent({
  name: 'DInputNumber',
  props: inputNumberProps,
  emits: [],
  setup(props:InputNumberProps, ctx) {
    const inputVal = ref(parseInt(props.value))
    
    // 判断是否禁用
    const isDisabled = computed(() => {
      return props.disabled
    })

    //新增
    const add = () => {
      if(inputVal.value >= props.max) return
      inputVal.value += 1
    }
    // 减少
    const subtract = () => {
      if(inputVal.value <= props.min) return
      inputVal.value -= 1
    }
    const onInput = (val) => {
      console.log(val)
      inputVal.value = parseInt(val.data)
    }
    const onChange = (val) => {
      console.log(val)

    }
    return {
      inputVal,
      isDisabled,
      add,
      subtract,
      onInput,
      onChange
    }
  },
  render() {
    const {
      placeholder,
      add,
      inputVal,
      subtract,
      onInput,
      onChange,
      isDisabled
    } = this;
    const dInputNum = [
      'd-input-number',
      {
        isDisabled
      }
    ]
    return (
      <div class='d-input-number'>
        <div class='d-input-item'>
          <span class='d-subtract' onClick={subtract}>-</span>
          <input type="number" disabled={isDisabled} onInput={onInput} onChange={onChange} value={inputVal} class='d-input-style' placeholder={placeholder} />
          <span class='d-add' onClick={add}>+</span>
        </div>
      </div>
    )
  }
})
