import { ComputedRef, nextTick, Ref } from 'vue';
import { OptionObjectItem } from '../editable-select-type';

interface useKeyboardSelectReturnType {
  handleKeydown: (event: KeyboardEvent) => void;
}
export const useKeyboardSelect: (
  dropdownRef: Ref<any>,
  disabled: string,
  visible: Ref<boolean>,
  hoverIndex: Ref<number>,
  selectedIndex: Ref<number>,
  options: ComputedRef<OptionObjectItem[]>,
  toggleMenu: () => void,
  closeMenu: () => void,
  handleClick: (options: OptionObjectItem) => void
) => useKeyboardSelectReturnType = (
  dropdownRef,
  disabled,
  visible,
  hoverIndex,
  selectedIndex,
  options,
  toggleMenu,
  closeMenu,
  handleClick
) => {
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

  const onKeyboardNavigation = (direction: string, newIndex?: number) => {
    if (!newIndex) {
      newIndex = hoverIndex.value;
    }
    if (!['ArrowDown', 'ArrowUp'].includes(direction)) {return;}
    if (direction === 'ArrowUp') {
      if (newIndex === 0) {
        newIndex = options.value.length - 1;
        scrollToItem(newIndex);
        updateHoveringIndex(newIndex);
        return;
      }
      newIndex = newIndex - 1;
    } else if (direction === 'ArrowDown') {
      if (newIndex === options.value.length - 1) {
        newIndex = 0;
        scrollToItem(newIndex);
        updateHoveringIndex(newIndex);
        return;
      }
      newIndex = newIndex + 1;
    }

    const option = options.value[newIndex];
    if (option[disabled]) {
      return onKeyboardNavigation(direction, newIndex);
    }
    scrollToItem(newIndex);
    updateHoveringIndex(newIndex);
  };

  const handleKeydown = (event: KeyboardEvent) => {
    const keyCode = event.key || event.code;

    if (options.value.length === 0) {return;}

    if (!visible.value) {
      return toggleMenu();
    }

    const onKeydownEnter = () => {
      handleClick(options.value[hoverIndex.value]);
      closeMenu();
    };

    const onKeydownEsc = () => {
      closeMenu();
    };

    switch (keyCode) {
    case 'Enter':
      onKeydownEnter();
      break;
    case 'Escape':
      onKeydownEsc();
      break;
    default:
      onKeyboardNavigation(keyCode);
    }
  };
  return {
    handleKeydown
  };
};
