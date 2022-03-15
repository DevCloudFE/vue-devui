/**
 * 清空按钮显示、隐藏
 */
import { SetupContext, Ref } from 'vue';
import { KeydownReturnTypes, SearchProps } from '../search-types';
import { debounce } from 'lodash';

type EmitProps = 'update:modelValue' | 'search';

export const keydownHandles = (ctx: SetupContext<EmitProps[]>, keywords: Ref<string>, props: SearchProps): KeydownReturnTypes => {
  const useEmitKeyword = debounce((value: string) => {
    ctx.emit('search', value);
  }, props.delay);
  const handleEnter = ($event: KeyboardEvent) => {
    if ($event.target instanceof HTMLInputElement) {
      const value = $event.target.value;
      useEmitKeyword(value);
    }
  };
  const onClickHandle = () => {
    if (!props.disabled) {
      ctx.emit('search', keywords.value);
    }
  };
  const KEYS_MAP: { [key: string]: ($event: KeyboardEvent) => void } = {
    Enter: handleEnter,
  };
  const onInputKeydown = ($event: KeyboardEvent) => {
    KEYS_MAP[$event.key]?.($event);
  };

  return {
    onInputKeydown,
    useEmitKeyword,
    onClickHandle,
  };
};
