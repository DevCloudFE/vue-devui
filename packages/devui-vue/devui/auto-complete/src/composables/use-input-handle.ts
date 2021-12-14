import { setTimeout } from "core-js";
import { ref, Ref, SetupContext } from "vue";
export default function useInputHandle(ctx: SetupContext,showNoResultItemTemplate:Ref<Boolean>, modelValue:Ref<string>,disabled:Ref<Boolean>,delay:Ref<Number>,handleSearch: Function, transInputFocusEmit: Ref<Function>): any {
    const visible = ref(false)
    const inputRef = ref()
    const searchStatus = ref(false)
    const debounce =(cb:Function,time:Number) =>{
        let timer
        return (...args)=>{
            if(timer){
                clearTimeout(timer)
            }
            timer = setTimeout(async ()=>{
                searchStatus.value=true
                await cb(...args)
                searchStatus.value=false
            },time)
        }
    }
    // todo 存在体验问题，自定搜索和没有结果的模板情况下，模板快速消失，但是下拉框有过度效果，会留下白框渐变
    const onInputCb = async(value:String)=>{
        await handleSearch(value)
        visible.value = true
    }
    const onInputDebounce = debounce(onInputCb,delay.value)
    const onInput =(e: Event) => {
        const inp = e.target as HTMLInputElement
        searchStatus.value=false
        showNoResultItemTemplate.value=false
        ctx.emit('update:modelValue', inp.value)
        onInputDebounce(inp.value)
    }
    const onFocus =() => {
        handleSearch(modelValue.value)
        transInputFocusEmit.value && transInputFocusEmit.value()
    }
    const handleClose = ()=>{
        visible.value=false
        searchStatus.value=false
        showNoResultItemTemplate.value=false
    }
    const toggleMenu =()=>{
    if(!disabled.value){
        if(visible.value){
            handleClose()
        }else{
            visible.value=true
        }
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