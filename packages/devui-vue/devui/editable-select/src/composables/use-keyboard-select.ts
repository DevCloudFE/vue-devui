import { ref, nextTick, ComputedRef, Ref } from 'vue';
import { OptionObjectItem } from '../editable-select-types';
interface useKeyboardSelectReturnType {
  handleKeydown: (event: KeyboardEvent) => void;
  hoverIndex: Ref<number>;
  selectedIndex: Ref<number>;
}
export const useKeyboardSelect = (
  dropdownRef: Ref,
  visible: Ref<boolean>,
  inputValue: Ref<string>,
  filteredOptions: ComputedRef<OptionObjectItem[]>,
  optionDisabledKey: string,
  filterOption: boolean | ((val: string, option: OptionObjectItem) => boolean) | undefined,
  loading: Ref<boolean>,
  handleClick: (options: OptionObjectItem) => void,
  closeMenu: () => void,
  toggleMenu: () => void
): useKeyboardSelectReturnType => {
  const hoverIndex = ref(0);
  const selectedIndex = ref(0);
  const updateHoveringIndex = (index: number) => {
    hoverIndex.value = index;
  };
  const scrollToItem = (index: number) => {
    const ul = dropdownRef.value;
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
  const handleEscape = () => {
    if (inputValue.value) {
      inputValue.value = '';
    } else {
      closeMenu();
    }
  };

  const handleEnter = () => {
    const len = filteredOptions.value.length;
    if (!visible.value || !len) {
      return toggleMenu();
    }

    len && len === 1 ? handleClick(filteredOptions.value[0]) : handleClick(filteredOptions.value[hoverIndex.value]);
    return closeMenu();
  };

  const handleKeyboardNavigation = (direction: string): void => {
    const len = filteredOptions.value.length;
    if (!len || len === 1) {
      return;
    }
    if (!['ArrowDown', 'ArrowUp'].includes(direction)) {
      return;
    }

    if (filterOption === false && loading.value) {
      return;
    }
    let newIndex = 0;
    newIndex = hoverIndex.value;

    if (direction === 'ArrowUp') {
      newIndex -= 1;
      if (newIndex === -1) {
        newIndex = len - 1;
      }
    } else if (direction === 'ArrowDown') {
      newIndex += 1;
      if (newIndex === len) {
        newIndex = 0;
      }
    }
    hoverIndex.value = newIndex;
    const option = filteredOptions.value[newIndex];
    if (option[optionDisabledKey]) {
      return handleKeyboardNavigation(direction);
    }
    updateHoveringIndex(newIndex);
    scrollToItem(newIndex);
  };

  const handleKeydown = (event: KeyboardEvent) => {
    const keyCode = event.key || event.code;
    switch (keyCode) {
    case 'Escape':
      handleEscape();
      break;
    case 'Enter':
      handleEnter();
      break;
    default:
      handleKeyboardNavigation(keyCode);
    }
  };
  return { handleKeydown, hoverIndex, selectedIndex };
};
