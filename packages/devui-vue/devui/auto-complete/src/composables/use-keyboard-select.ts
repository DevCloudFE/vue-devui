import { nextTick, ref, Ref } from 'vue';
import { DefaultFuncType, SelectOptionClick,SourceType } from '../auto-complete-types';

export default function useKeyBoardHandle(
  dropDownRef: Ref,
  visible: Ref<boolean>,
  searchList: Ref<SourceType>,
  selectedIndex: Ref<number>,
  searchStatus: Ref<boolean>,
  showNoResultItemTemplate: Ref<boolean>,
  selectOptionClick: SelectOptionClick,
  handleClose: DefaultFuncType
): {
    hoverIndex: Ref<number>;
    handlekeyDown: (e: KeyboardEvent) => void;
  } {
  const hoverIndex = ref(selectedIndex.value??0);
  const scrollToActive = (index: number) => {
    const ul = dropDownRef.value;
    const li = ul.children[index];
    nextTick(() => {
      if (li.scrollIntoViewIfNeeded) {
        li.scrollIntoViewIfNeeded(false);
      } else {
        const containerInfo = ul.getBoundingClientRect();
        const elementInfo = li.getBoundingClientRect();
        if (elementInfo.bottom > containerInfo.bottom || elementInfo.top < containerInfo.top) {
          li.scrollIntoView(false);
        }
      }
    });
  };
  const handlekeyDown = (e: KeyboardEvent) => {
    const keyCode = e.key || e.code;
    if (keyCode === 'Escape' && ((visible.value && searchList.value.length) || searchStatus.value||showNoResultItemTemplate.value)) {
      handleClose();
      return;
    }
    const status = visible.value && searchList.value.length && !searchStatus.value && !showNoResultItemTemplate.value;
    if (keyCode === 'ArrowDown' && status) {
      if (hoverIndex.value === searchList.value.length - 1) {
        hoverIndex.value = 0;
        scrollToActive(hoverIndex.value);
        return;
      }
      hoverIndex.value = hoverIndex.value + 1;
      scrollToActive(hoverIndex.value);
    } else if (keyCode === 'ArrowUp' && status) {
      if (hoverIndex.value === 0) {
        hoverIndex.value = searchList.value.length - 1;
        scrollToActive(hoverIndex.value);
        return;
      }
      hoverIndex.value = hoverIndex.value - 1;
      scrollToActive(hoverIndex.value);
    }
    if (keyCode === 'Enter' && status) {
      selectOptionClick(searchList.value[hoverIndex.value]);
      hoverIndex.value=selectedIndex.value??0;
      return;
    }
  };
  return {
    hoverIndex,
    handlekeyDown
  };
}
