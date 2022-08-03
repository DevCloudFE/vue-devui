/**
 * 控制窗口打开收起
 */
import { ref, watch, computed, Ref } from 'vue';
import { PopupTypes, CascaderProps } from '../src/cascader-types';
import { dropdownOpenClass } from './use-cascader-class';
import { onClickOutside } from '@vueuse/core';
export const popupHandles = (props: CascaderProps, overlayRef: Ref, origin: Ref): PopupTypes => {
  const menuShow = ref(false);
  const menuOpenClass = ref('');
  const disabled = computed(() => props.disabled); // select是否被禁用
  const stopDefault = ref(false);
  const updateStopDefaultType = () => {
    stopDefault.value = !menuShow.value;
  };

  const openPopup = () => {
    if (disabled.value) {
      return;
    }
    menuShow.value = !menuShow.value;
    updateStopDefaultType();
  };

  watch(menuShow, (status) => {
    menuOpenClass.value = dropdownOpenClass(status);
  });

  onClickOutside(
    overlayRef,
    () => {
      menuShow.value = false;
    },
    { ignore: [origin] }
  );

  return {
    menuShow,
    stopDefault,
    menuOpenClass,
    updateStopDefaultType,
    openPopup,
  };
};
