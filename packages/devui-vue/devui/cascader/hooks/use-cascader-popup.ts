/**
 * 控制窗口打开收起
 */
import { ref, watch, computed } from 'vue';
import { PopupTypes, CascaderProps } from '../src/cascader-types';
import { dropdownOpenClass } from './use-cascader-class';
export const popupHandles = (props: CascaderProps): PopupTypes => {
  const menuShow = ref(false);
  const menuOpenClass = ref('');
  const disabled = computed(() => props.disabled); // select是否被禁用
  const stopDefault = ref(false);
  const updateStopDefaultType = () => {
    stopDefault.value = !menuShow.value;
  };

  const openPopup = () => {
    if (disabled.value) {return;}
    menuShow.value = !menuShow.value;
    updateStopDefaultType();
  };

  watch(menuShow, (status) => {
    menuOpenClass.value = dropdownOpenClass(status);
  });

  return {
    menuShow,
    stopDefault,
    menuOpenClass,
    updateStopDefaultType,
    openPopup,
  };
};
