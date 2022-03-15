import { ref,SetupContext } from 'vue'
import { AutoCompleteProps,HandleSearch } from '../auto-complete-types'
export default function useLazyHandle(props: AutoCompleteProps,ctx:SetupContext,handleSearch:HandleSearch):any {
  const showLoading = ref(false)
  const dropDownRef = ref()
  const loadMore = () => {
    if(!props.enableLazyLoad && showLoading) return
    const dropDownValue = dropDownRef.value
    const height = dropDownValue.scrollHeight
    const scrollTop = dropDownValue.clientHeight + dropDownValue.scrollTop

    if(scrollTop >= height && scrollTop >= props.maxHeight) {
      props.loadMore()
      showLoading.value = true
    }
  }
  ctx.expose({loadFinish})

  async function loadFinish (){
    await handleSearch(props.modelValue,props.enableLazyLoad)
    showLoading.value = false
  }
  return {
    showLoading,
    dropDownRef,
    loadMore,
  }
}


