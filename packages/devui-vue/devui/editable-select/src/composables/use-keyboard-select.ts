import { Ref } from 'vue';
import { EditableSelectProps, Option, Options } from '../editable-select-types';
import { States } from './use-select';

export interface UseKeyboardSelectReturnType {
  onKeydown: (e: KeyboardEvent) => void;
}

const EVENT_CODE = {
  tab: 'Tab',
  enter: 'Enter',
  up: 'ArrowUp', // 38
  down: 'ArrowDown', // 40
  esc: 'Escape',
};

export function useKeyboardSelect(
  props: EditableSelectProps,
  states: States,
  filteredOptions: Ref<Options>,
  scrollToItem: (index: number) => void,
  handleOptionSelect: (option: Option, byClick: boolean) => void
): UseKeyboardSelectReturnType {
  const updateHoveringIndex = (index: number) => {
    states.hoveringIndex = index;
  };

  const onKeyboardNavigate = (direction: 'ArrowDown' | 'ArrowUp', hoverIndex: number = states.hoveringIndex): void => {
    if (!states.visible) {
      states.visible = true;
      return;
    }

    if (filteredOptions.value.length === 0 || props.loading) {
      return;
    }

    let newIndex = 0;

    if (direction === 'ArrowDown') {
      newIndex = hoverIndex + 1;
      if (newIndex > filteredOptions.value.length - 1) {
        newIndex = 0;
      }
    } else if (direction === 'ArrowUp') {
      newIndex = hoverIndex - 1;
      if (newIndex < 0) {
        newIndex = filteredOptions.value.length - 1;
      }
    }
    const option = filteredOptions.value[newIndex];

    if (option[props.disabledKey]) {
      return onKeyboardNavigate(direction, newIndex);
    } else {
      updateHoveringIndex(newIndex);
      scrollToItem(newIndex);
    }
  };

  const onEscOrTab = () => {
    states.visible = false;
  };

  const onKeyboardSelect = () => {
    if (!states.visible) {
      return (states.visible = true);
    }

    const option = filteredOptions.value[states.hoveringIndex];
    if (option) {
      handleOptionSelect(option, false);
    }
  };

  const onKeydown = (e: KeyboardEvent) => {
    const keyCode = e.key || e.code;

    const { tab, esc, down, up, enter } = EVENT_CODE;

    if (keyCode === up || keyCode === down) {
      e.preventDefault();
    }

    switch (keyCode) {
    case up:
      onKeyboardNavigate('ArrowUp');
      break;
    case down:
      onKeyboardNavigate('ArrowDown');
      break;
    case esc:
    case tab:
      onEscOrTab();
      break;
    case enter:
      onKeyboardSelect();
      break;
    }
  };
  return {
    onKeydown,
  };
}
