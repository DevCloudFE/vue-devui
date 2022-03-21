import { ComputedRef, nextTick, ref, Ref } from 'vue';
import { OptionObjectItem } from '../editable-select-type';

interface useKeyboardSelectReturnType {
  handleKeydown: (event: KeyboardEvent) => void;
  hoverIndex: Ref<number>;
}
export const useKeyboardSelect: (
  dropdownRef: Ref<HTMLElement>,
  disabled: string,
  visible: Ref<boolean>,
  options: ComputedRef<OptionObjectItem[]>,
  toggleMenu: () => void,
  closeMenu: () => void,
  handleClick: (options: OptionObjectItem) => void
) => useKeyboardSelectReturnType = (dropdownRef, disabled, visible, options, toggleMenu, closeMenu, handleClick) => {
  const hoverIndex = ref(0);
  const selectedIndex = ref(0);
  const updateHoveringIndex = (index: number) => {
    hoverIndex.value = index;
  };
  const scrollToItem = (index: number) => {
    const ul = dropdownRef.value;
    const li = ul.children[index];
    nextTick(() => {
      const containerInfo = ul.getBoundingClientRect();
      const elementInfo = li.getBoundingClientRect();
      if (elementInfo.bottom > containerInfo.bottom || elementInfo.top < containerInfo.top) {
        li.scrollIntoView(false);
      }
    });
  };

  const onKeyboardNavigation = (direction: string, newIndex = 0): void => {
    if (options.value.length === 1) {
      return;
    }
    if (!['ArrowDown', 'ArrowUp'].includes(direction)) {
      return;
    }
    newIndex = hoverIndex.value;

    if (direction === 'ArrowUp') {
      if (newIndex === 0) {
        newIndex = options.value.length - 1;
        scrollToItem(newIndex);
        return updateHoveringIndex(newIndex);
      }
      newIndex = newIndex - 1;
    } else if (direction === 'ArrowDown') {
      if (newIndex === options.value.length - 1) {
        newIndex = 0;
        scrollToItem(newIndex);
        return updateHoveringIndex(newIndex);
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

  const onKeydownEnter = () => {
    let index = hoverIndex.value;
    if (options.value.length === 1) {
      index = 0;
    }
    handleClick(options.value[index]);
    closeMenu();
  };

  const onKeydownEsc = () => {
    closeMenu();
  };

  const handleKeydown = (event: KeyboardEvent) => {
    const keyCode = event.key || event.code;

    if (options.value.length === 0) {
      return;
    }

    if (!visible.value) {
      return toggleMenu();
    }

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
    handleKeydown,
    hoverIndex,
    selectedIndex,
  };
};
