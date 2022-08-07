import { ComputedRef, nextTick, Ref } from 'vue';
import { OptionObjectItem } from '../editable-select-types';
interface useKeyboardSelectReturnType {
  handleKeydown: (event: KeyboardEvent) => void;
}
export function useKeyboardSelect(
  dropdownRef: Ref,
  hoverIndex: Ref<number>,
  filteredOptions: ComputedRef<OptionObjectItem[]>,
  disabledKey: string,
  visible: Ref<boolean>,
  loading: Ref<boolean>,
  handleClick: (option: OptionObjectItem, index: number) => void,
  toggleMenu: () => void,
  closeMenu: () => void
): useKeyboardSelectReturnType {
  const handleEscape = () => {
    closeMenu();
  };
  const handleEnter = () => {
    handleClick(filteredOptions.value[hoverIndex.value], hoverIndex.value);
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

  const updateIndex = (index: number) => {
    hoverIndex.value = index;
  };

  const handleKeyboardNavigation = (direction: string, index = hoverIndex.value): void => {
    const len = filteredOptions.value.length;

    if (len === 0) {
      return;
    }
    if (!['ArrowUp', 'ArrowDown'].includes(direction)) {
      return;
    }
    if (direction === 'ArrowUp') {
      index -= 1;
      if (index === -1) {
        index = len - 1;
      }
    } else if (direction === 'ArrowDown') {
      index += 1;
      if (index === len) {
        index = 0;
      }
    }

    const option = filteredOptions.value[index];

    if (option[disabledKey]) {
      return handleKeyboardNavigation(direction, index);
    }

    updateIndex(index);
    scrollToItem(index);
  };
  const handleKeydown = (event: KeyboardEvent) => {
    const keyCode = event.key || event.code;
    if (loading.value) {
      return;
    }
    if (!visible.value) {
      return toggleMenu();
    }
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
  return {
    handleKeydown,
  };
}
