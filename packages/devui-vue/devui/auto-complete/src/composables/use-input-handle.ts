import { ref, Ref, SetupContext } from 'vue';
import {HandleSearch,RecentlyFocus,InputDebounceCb,TransInputFocusEmit} from '../auto-complete-types'
export default function useInputHandle(ctx: SetupContext,searchList:Ref<any[]>,showNoResultItemTemplate:Ref<boolean>, modelValue:Ref<string>,disabled:Ref<boolean>,delay:Ref<number>,handleSearch: HandleSearch, transInputFocusEmit:Ref<TransInputFocusEmit>,recentlyFocus:RecentlyFocus,latestSource:Ref<Array<any>>): any {
    const visible = ref(false)
    const inputRef = ref()
    const searchStatus = ref(false)
    const debounce =(cb:InputDebounceCb,time:number) =>{
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
    const onInputCb = async(value:string)=>{
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
        recentlyFocus(latestSource.value)
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
                if (ctx.slots.noResultItemTemplate&&searchList.value.length==0&&modelValue.value.trim()!='') {
                    showNoResultItemTemplate.value=true
                }
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