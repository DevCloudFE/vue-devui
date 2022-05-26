import { Ref, ref } from "vue";

export function initSelect(defaultSelectKeys: string[], keys: string, isMutiple: boolean, disabled: Ref<boolean>):
boolean{
  const isSelect = ref(false);
  if(!isMutiple){
    if (defaultSelectKeys[0] === keys && !disabled.value){
      isSelect.value = true;
    } else {
      isSelect.value = false;
    }
  } else{
    if (defaultSelectKeys.includes(keys)){
      isSelect.value = true;
    } else {
      isSelect.value = false;
    }
  }
  return isSelect.value;
}
