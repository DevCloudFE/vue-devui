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
import ClickOutside from '../../shared/devui-directive/clickoutside';
import { FlexibleOverlay } from '../../overlay/src/flexible-overlay';
import { useNamespace } from '../../shared/hooks/use-namespace';
import removeBtnSvg from './components/icon-remove';
import { Suggestion, TagInputProps, tagInputProps } from './tag-input-types';
import './tag-input.scss';
import { useInputKeydown } from './composables/use-input-keydown';

export default defineComponent({
  name: 'DTagInput',
  directives: {
    ClickOutside,
  },
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
    const onInput = ($event: InputEvent) => {
      const v = ($event.target as HTMLInputElement).value || '';
      tagInputVal.value = v.trim();
    };

    const mergedSuggestions = computed<Suggestion[]>(() => {
      let suggestions = props.suggestionList.map((item, index: number) => {
        return {
          __index: index,
          ...item,
        };
      });
      if (tagInputVal.value === '') {
        return suggestions;
      }

      return (suggestions = props.caseSensitivity
        ? suggestions.filter((item) => item[props.displayProperty].indexOf(tagInputVal.value) !== -1)
        : suggestions.filter((item) => item[props.displayProperty].toLowerCase().indexOf(tagInputVal.value.toLowerCase()) !== -1));
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

    // 点击元素外部区域关闭Suggestion选择
    const closeSuggestion = () => {
      isInputBoxFocus.value = false;
    };

    const handleEnter = () => {
      let res = { [props.displayProperty]: tagInputVal.value };
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
        ctx.emit('update:suggestionList', remove(props.suggestionList, target.__index));
      }

      const newTags = add(selectedTags.value, res);
      ctx.emit('change', selectedTags.value, newTags);
      ctx.emit('update:modelValue', newTags);
      mergedSuggestions.value.length === 0 && (tagInputVal.value = '');
    };

    const { onInputKeydown } = useInputKeydown(props, handleEnter, onSelectIndexChange);

    const removeTag = ($event: Event, tagIdx: number) => {
      $event.preventDefault();
      ctx.emit('update:suggestionList', add(props.suggestionList, selectedTags.value[tagIdx]));
      const newTags = remove(selectedTags.value, tagIdx);
      ctx.emit('change', selectedTags.value, newTags);
      ctx.emit('update:modelValue', newTags);

      nextTick(() => {
        tagInputRef.value?.focus();
        isInputBoxFocus.value = true;
      });
    };

    const onSuggestionItemClick = ($event: Event, itemIndex: number) => {
      $event.preventDefault();
      const target = mergedSuggestions.value[itemIndex];
      const newTags = add(selectedTags.value, target);
      const newSuggestions = remove(props.suggestionList, target.__index);
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
      return <ul class="devui-tag-list" title={props.disabled ? props.disabledText : ''}>
        {selectedTags.value.map((tag, tagIdx) => {
          return (
            <li class="devui-tag-item">
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

    const noDataTpl = <li class="devui-suggestion-item devui-disabled">{props.noData}</li>;

    const origin = ref();
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

    // 选择建议列表
    const suggestionList = () => {
      const showNoData = mergedSuggestions.value.length === 0;
      const suggestionListItem = mergedSuggestions.value.map((item: Suggestion, index: number) => {
        return (
          <li
            class={{ 'devui-suggestion-item': true, selected: index === selectIndex.value }}
            onClick={($event: Event) => {
              onSuggestionItemClick($event, index);
            }}
          >
            {item[props.displayProperty]}
          </li>
        );
      });

      return <Teleport to="body">
        <Transition name="fade">
          <FlexibleOverlay
            origin={origin.value}
            v-model={isShowSuggestion.value}
            style={{ zIndex: 'var(--devui-z-index-dropdown, 1052)' }}
          >
            <div class="devui-tags-autocomplete" style={{ width: `${dropdownWidth.value}` }}>
              <ul class="devui-suggestion-list">
                {showNoData ? noDataTpl : suggestionListItem}
              </ul>
            </div>
          </FlexibleOverlay>
        </Transition>
      </Teleport>;
    };

    const inputBoxCls = computed(() => {
      return {
        'devui-tags': true,
        'devui-form-control': true,
        'devui-dropdown-origin': true,
        'devui-dropdown-origin-open': isInputBoxFocus.value,
        'devui-disabled': props.disabled,
      };
    });

    const tagInputCls = {
      input: true,
      'devui-input': true,
      'invalid-tag': false,
    };
    const tagInputStyle = computed(() => {
      return [`display:${props.disabled ? 'none' : 'block'};`];
    });

    return () => (<div class={ns.b()} ref={origin} v-click-outside={closeSuggestion}>
      <div class={inputBoxCls.value}>
        {chosenTags()}
        <input
          type="text"
          ref="tagInputRef"
          value={tagInputVal.value}
          class={tagInputCls}
          style={tagInputStyle.value}
          onKeydown={onInputKeydown}
          onFocus={onInputFocus}
          onInput={($event: InputEvent) => onInput($event)}
          placeholder={isTagsLimit.value ? `${props.maxTagsText || t('maxTagsText')} ${props.maxTags}` : props.placeholder}
          spellCheck={props.spellcheck}
          disabled={isTagsLimit.value}
        />
      </div>
      {suggestionList()}
    </div>);
  },
});
