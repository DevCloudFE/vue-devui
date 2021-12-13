import { ref, Ref, SetupContext } from "vue";

export default function useInputHandle(ctx: SetupContext, modelValue:Ref<string>,disabled:Ref<boolean>,handleSearch: Function, transInputFocusEmit: Function): any {
    const visible = ref(false)
    const inputRef = ref()
    const searchStatus = ref(false)
    // todo如何使用rx防抖
    const onInput = (e: Event) => {
        const inp = e.target as HTMLInputElement
        ctx.emit('update:modelValue', inp.value)
        visible.value = true

        handleSearch(inp.value)
    }
    const onFocus = () => {
        handleSearch(modelValue.value)
        transInputFocusEmit && transInputFocusEmit(true, inputRef)
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