import { TagInputProps, HandleEnter, OnSelectIndexChange, UseInputKeydownReturnTypes } from '../tag-input-types';

export const useInputKeydown = (
  props: TagInputProps,
  handleEnter: HandleEnter,
  onSelectIndexChange: OnSelectIndexChange): UseInputKeydownReturnTypes => {

  const KEYS_MAP = {
    tab: 'Tab',
    down: 'ArrowDown',
    up: 'ArrowUp',
    enter: 'Enter',
    space: ' ',
  } as const;

  const onInputKeydown = ($event: KeyboardEvent) => {
    switch ($event.key) {
    case KEYS_MAP.tab:
    case KEYS_MAP.enter:
    case KEYS_MAP.space:
      if (!props.isAddBySpace && KEYS_MAP.space) {
        return;
      }
      handleEnter();
      break;
    case KEYS_MAP.down:
      onSelectIndexChange(true);
      break;
    case KEYS_MAP.up:
      onSelectIndexChange(false);
      break;
    default:
      break;
    }
  };

  return { onInputKeydown };
};
