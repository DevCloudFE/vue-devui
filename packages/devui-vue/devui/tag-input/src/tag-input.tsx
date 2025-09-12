import {
  defineComponent,
  ref,
  computed,
  nextTick,
  watch,
  SetupContext,
  getCurrentInstance,
  Teleport,
  Transition,
  onMounted,
  onUnmounted,
} from 'vue';
import { createI18nTranslate } from '../../locale/create';
import { FlexibleOverlay } from '../../overlay/src/flexible-overlay';
import { useNamespace } from '../../shared/hooks/use-namespace';
import removeBtnSvg from './components/icon-remove';
import { Suggestion, TagInputProps, tagInputProps } from './tag-input-types';
import './tag-input.scss';
import { useInputKeydown } from './composables/use-input-keydown';
import { onClickOutside } from '@vueuse/core';

export default defineComponent({
  name: 'DTagInput',
  props: tagInputProps,
  emits: ['update:modelValue', 'update:suggestionList', 'change'],
  setup(props: TagInputProps, ctx: SetupContext) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DTagInput', app);

    const ns = useNamespace('tag-input');

    const selectedTags = ref<Array<Suggestion>>([]);
    watch(() => props.modelValue, () => {
      selectedTags.value = props.modelValue;
    }, { immediate: true, deep: true });

    const add = (arr: Suggestion[], target: Suggestion) => {
      const res = Object.assign({}, target);
      delete res.__index;
      return arr.concat(res);
    };

    const remove = (arr: Suggestion[], targetIdx: number) => {
      const newArr = arr.slice();
      newArr.splice(targetIdx, 1);
      return newArr;
    };

    const tagInputVal = ref('');
    const onInput = ($event: Event) => {
      const v = ($event.target as HTMLInputElement).value || '';
      tagInputVal.value = v.trim();
    };

    const mergedSuggestions = computed<Suggestion[]>(() => {
      const suggestions = props.suggestionList.map((item, index: number) => {
        return {
          __index: index,
          ...item,
        };
      });
      if (tagInputVal.value === '') {
        return suggestions;
      }

      return suggestions.filter((item: Suggestion) => {
        const val = item[props.displayProperty] as string;

        // 大小写敏感
        if (props.caseSensitivity) {
          return val.indexOf(tagInputVal.value) !== -1;
        } else {
          return val.toLowerCase().indexOf(tagInputVal.value.toLowerCase()) !== -1;
        }
      });
    });

    const selectIndex = ref(0);
    watch(mergedSuggestions, () => {
      selectIndex.value = 0;
    });

    const onSelectIndexChange = (isUp = false) => {
      if (isUp) {
        selectIndex.value < mergedSuggestions.value.length - 1 ? selectIndex.value++ : (selectIndex.value = 0);
        return;
      }
      selectIndex.value > 0 ? selectIndex.value-- : (selectIndex.value = mergedSuggestions.value.length - 1);
    };

    const tagInputRef = ref();
    const isInputBoxFocus = ref(false);
    const onInputFocus = () => {
      isInputBoxFocus.value = true;
    };

    const handleEnter = () => {
      let res: Suggestion = { [props.displayProperty]: tagInputVal.value };
      if (tagInputVal.value === '' && mergedSuggestions.value.length === 0) {
        return false;
      }
      if (selectedTags.value.findIndex((item) => item[props.displayProperty] === tagInputVal.value) > -1) {
        tagInputVal.value = '';
        return false;
      }
      if (
        mergedSuggestions.value.length === 0 &&
        (tagInputVal.value.length < props.minLength || tagInputVal.value.length > props.maxLength)
      ) {
        tagInputVal.value = '';
        return false;
      }
      if (mergedSuggestions.value.length) {
        const target = mergedSuggestions.value[selectIndex.value];
        res = target;
        ctx.emit('update:suggestionList', remove(props.suggestionList, target.__index as number));
      }

      const newTags = add(selectedTags.value, res);
      ctx.emit('change', selectedTags.value, newTags);
      ctx.emit('update:modelValue', newTags);
      mergedSuggestions.value.length === 0 && (tagInputVal.value = '');
    };

    const { onInputKeydown } = useInputKeydown(props, handleEnter, onSelectIndexChange);

    const removeTag = ($event: Event, tagIdx: number) => {
      $event.preventDefault();
      const newTags = remove(selectedTags.value, tagIdx);
      ctx.emit('change', selectedTags.value, newTags);
      ctx.emit('update:modelValue', newTags);
      ctx.emit('update:suggestionList', add(props.suggestionList, selectedTags.value[tagIdx]));

      nextTick(() => {
        tagInputRef.value?.focus();
        isInputBoxFocus.value = true;
      });
    };

    const onSuggestionItemClick = ($event: Event, itemIndex: number) => {
      $event.preventDefault();
      const target = mergedSuggestions.value[itemIndex];
      const newTags = add(selectedTags.value, target);
      const newSuggestions = remove(props.suggestionList, target.__index as number);
      ctx.emit('change', selectedTags.value, newTags);
      ctx.emit('update:modelValue', newTags);
      ctx.emit('update:suggestionList', newSuggestions);
    };

    const isTagsLimit = computed(() => props.maxTags <= selectedTags.value.length);
    const isShowSuggestion = computed(() => {
      return !props.disabled && !isTagsLimit.value && isInputBoxFocus.value;
    });

    // 已选择 tags 列表
    const chosenTags = () => {
      return <ul class={ns.e('tags')} title={props.disabled ? props.disabledText : ''}>
        {selectedTags.value.map((tag, tagIdx) => {
          return (
            <li class={ns.e('tags__item')}>
              <span>{tag[props.displayProperty]}</span>
              {!props.disabled && (
                <a class="remove-button" onClick={($event: Event) => removeTag($event, tagIdx)}>
                  {removeBtnSvg}
                </a>
              )}
            </li>
          );
        })}
      </ul>;
    };


    const origin = ref();
    // 获取容器宽度
    const dropdownWidth = ref('0');
    const updateDropdownWidth = () => {
      dropdownWidth.value = origin?.value?.clientWidth ? origin.value.clientWidth + 'px' : '100%';
    };

    onMounted(() => {
      updateDropdownWidth();
      window.addEventListener('resize', updateDropdownWidth);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateDropdownWidth);
    });

    const dropdownRef = ref();
    // 点击外部关闭suggestionList
    onClickOutside(
      dropdownRef,
      () => {
        isInputBoxFocus.value = false;
      },
      { ignore: [origin] },
    );

    // 选择建议列表
    const suggestionList = () => {
      const showNoData = mergedSuggestions.value.length === 0;
      const suggestionListItem = mergedSuggestions.value.map((item: Suggestion, index: number) => {
        return (
          <li
            class={{ [ns.e('suggestion-list__item')]: true, selected: index === selectIndex.value }}
            onClick={($event: Event) => {
              onSuggestionItemClick($event, index);
            }}
          >
            {item[props.displayProperty]}
          </li>
        );
      });

      const noDataTplCls = `${ns.e('suggestion-list__item')} ${ns.e('suggestion-list__no-data')}`;
      const noDataTpl = <li class={noDataTplCls}>{props.noData}</li>;

      return <Teleport to="body">
        <Transition name="fade">
          <FlexibleOverlay
            ref={dropdownRef}
            origin={origin.value}
            v-model={isShowSuggestion.value}
            style={{ zIndex: 'var(--devui-z-index-dropdown, 1052)' }}
          >
            <ul class={ns.e('suggestion-list')} style={{ width: `${dropdownWidth.value}` }}>
              {showNoData ? noDataTpl : suggestionListItem}
            </ul>
          </FlexibleOverlay>
        </Transition>
      </Teleport>;
    };

    const tagsWrapperCls = computed(() => {
      return {
        [ns.e('tags__wrapper')]: true,
        'is-disabled': props.disabled,
      };
    });

    const inputCls = computed(() => {
      return {
        [ns.e('input')]: true,
        [ns.e('input_hide')]: props.disabled,
      };
    });

    return () => (<div class={ns.b()} ref={origin}>
      <div class={tagsWrapperCls.value}>
        {chosenTags()}
        <input
          type="text"
          ref="tagInputRef"
          value={tagInputVal.value}
          class={inputCls.value}
          onKeydown={onInputKeydown}
          onFocus={onInputFocus}
          onInput={onInput}
          placeholder={isTagsLimit.value ? `${props.maxTagsText || t('maxTagsText')} ${props.maxTags}` : props.placeholder}
          spellcheck={props.spellcheck}
          disabled={isTagsLimit.value}
        />
      </div>
      {suggestionList()}
    </div>);
  },
});
