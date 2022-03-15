import { defineComponent } from 'vue';
import { SearchProps, searchProps } from './search-types';
import { getRootClass } from './hooks/use-search-class';
import { keywordsHandles } from './hooks/use-search-keywords';
import { keydownHandles } from './hooks/use-search-keydown';
import DInput from '../../input/src/input';
import './search.scss';

export default defineComponent({
  name: 'DSearch',
  props: searchProps,
  emits: ['update:modelValue', 'search'],
  setup(props: SearchProps, ctx) {
    const rootClasses = getRootClass(props);
    const { keywords, clearIconShow, onClearHandle } = keywordsHandles(ctx, props);
    const { onInputKeydown, onClickHandle, useEmitKeyword } = keydownHandles(ctx, keywords, props);

    const onInputUpdate = (event: string) => {
      if (props.isKeyupSearch) {
        useEmitKeyword(event);
      }
      keywords.value = event;
      ctx.emit('update:modelValue', event);
    };

    return () => {
      return (
        <div class={rootClasses.value}>
          {props.iconPosition === 'left' && (
            <div class='devui-search__icon' onClick={onClickHandle}>
              <d-icon name='search' size='inherit' key='search'></d-icon>
            </div>
          )}
          <DInput
            size={props.size}
            disabled={props.disabled}
            autoFocus={props.autoFocus}
            modelValue={keywords.value}
            maxLength={props.maxLength}
            placeholder={props.placeholder}
            cssClass={props.cssClass}
            onKeydown={onInputKeydown}
            onUpdate:modelValue={onInputUpdate}></DInput>
          {clearIconShow.value && (
            <div class='devui-search__clear' onClick={onClearHandle}>
              <d-icon name='close' size='inherit' key='close'></d-icon>
            </div>
          )}
          {props.iconPosition === 'right' && (
            <div class='devui-search__icon' onClick={onClickHandle}>
              <d-icon name='search' size='inherit' key='search'></d-icon>
            </div>
          )}
        </div>
      );
    };
  },
});
