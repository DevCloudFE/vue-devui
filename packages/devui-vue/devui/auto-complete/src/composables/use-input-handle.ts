import { setTimeout } from "core-js";
import { ref, Ref, SetupContext } from "vue";
export default function useInputHandle(ctx: SetupContext, modelValue:Ref<string>,disabled:Ref<Boolean>,delay:Ref<Number>,handleSearch: Function, transInputFocusEmit: Ref<Function>): any {
    const visible = ref(false)
    const inputRef = ref()
    const searchStatus = ref(false)
    const debounce = (cb,time) =>{
        let timer
        console.log("debounce");
        return (...args)=>{
            if(timer){
                clearTimeout(timer)
            }
            timer = setTimeout(()=>{
                cb(...args)
            },time)
        }
    }
    const onInput = (e: Event) => {
        const inp = e.target as HTMLInputElement
        ctx.emit('update:modelValue', inp.value)
        visible.value = true
        debounce(handleSearch,delay.value)(inp.value)
    }
    const onFocus = () => {
        debounce(handleSearch,delay.value)(modelValue.value)
        transInputFocusEmit.value && transInputFocusEmit.value(true, inputRef)
    }
    const handleClose = ()=>{
        visible.value=false
    }
    const toggleMenu =()=>{
    if(!disabled.value){
        visible.value=!visible.value
    }
    }
    return {
        handleClose,
        toggleMenu,
        onInput,
        onFocus,
        inputRef,
        visible,
        searchStatus
    }
}