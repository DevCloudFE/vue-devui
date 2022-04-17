import { Ref, ref,SetupContext } from 'vue';
import { AutoCompleteProps,HandleSearch } from '../auto-complete-types';

export default function useLazyHandle(props: AutoCompleteProps,ctx: SetupContext,handleSearch: HandleSearch): {
  showLoading: Ref<boolean>;
  dropDownRef: Ref;
  loadMore: () => void;
} {
  const showLoading = ref(false);
  const dropDownRef = ref();
  const loadMore = () => {
    if(!props.enableLazyLoad && showLoading) {return;}
    const dropDownValue = dropDownRef.value;
    const height = dropDownValue.scrollHeight;
    const scrollTop = dropDownValue.clientHeight + dropDownValue.scrollTop;

    if(scrollTop >= height && scrollTop >= props.maxHeight) {
      props.loadMore();
      showLoading.value = true;
    }
  };

  async function loadFinish (){
    await handleSearch(props.modelValue,props.enableLazyLoad);
    showLoading.value = false;
  }
  ctx.expose({loadFinish});
  return {
    showLoading,
    dropDownRef,
    loadMore,
  };
}


