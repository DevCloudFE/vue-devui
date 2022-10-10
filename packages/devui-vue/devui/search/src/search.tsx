import { defineComponent, getCurrentInstance, ref } from 'vue';
import { SearchProps, searchProps } from './search-types';
import { getRootClass } from './composables/use-search-class';
import { keywordsHandles } from './composables/use-search-keywords';
import { keydownHandles } from './composables/use-search-keydown';
import DInput from '../../input/src/input';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './search.scss';
import { createI18nTranslate } from '../../locale/create';
import SearchCloseIcon from './components/search-close-icon';
import SearchIcon from './components/search-icon';

export default defineComponent({
  name: 'DSearch',
  props: searchProps,
  emits: ['update:modelValue', 'search'],
  setup(props: SearchProps, ctx) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DSearch', app);

    const ns = useNamespace('search');
    const isFocus = ref(false);
    const rootClasses = getRootClass(props, isFocus);
    const { keywords, clearIconShow, onClearHandle } = keywordsHandles(ctx, props);
    const { onInputKeydown, onClickHandle, useEmitKeyword } = keydownHandles(ctx, keywords, props);

    const onInputUpdate = (event: string) => {
      if (props.isKeyupSearch) {
        useEmitKeyword(event);
      }
      keywords.value = event;
      ctx.emit('update:modelValue', event);
    };

    const onFocus = () => {
      isFocus.value = true;
    };
    const onBlur = () => {
      isFocus.value = false;
    };

    return () => {
      const inputProps = {
        size: props.size,
        disabled: props.disabled,
        autoFocus: props.autoFocus,
        modelValue: keywords.value,
        placeholder: props.placeholder || t('placeholder'),
        onKeydown: onInputKeydown,
        'onUpdate:modelValue': onInputUpdate,
        onFocus: onFocus,
        onBlur: onBlur,
      };
      return (
        <label class={rootClasses.value}>
          {props.iconPosition === 'left' && (
            <div class={ns.e('icon')} onClick={onClickHandle}>
              <SearchIcon></SearchIcon>
            </div>
          )}
          <DInput {...inputProps}></DInput>
          {clearIconShow.value && (
            <div class={ns.e('clear')} onClick={onClearHandle}>
              <SearchCloseIcon></SearchCloseIcon>
            </div>
          )}
          {props.iconPosition === 'right' && (
            <div class={ns.e('icon')} onClick={onClickHandle}>
              <SearchIcon></SearchIcon>
            </div>
          )}
        </label>
      );
    };
  },
});
