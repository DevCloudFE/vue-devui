import { defineComponent, ref, computed, nextTick, watch, PropType } from 'vue';
import removeBtnSvg from './remove-btn';
import './tag-input.scss';

interface Suggestion {
  __index: number
  [x: string]: any
}

const tagInputProps = {
  tags: {
    type: Array as PropType<any[]>,
    default: (): [] => []
  },
  displayProperty: {
    type: String,
    default: 'name'
  },
  placeholder: {
    type: String,
    default: ''
  },
  maxTags: {
    type: Number,
    default: Number.MAX_SAFE_INTEGER
  },
  maxTagsText: {
    type: String,
    default: ''
  },
  spellcheck: {
    type: Boolean,
    default: true
  },
  suggestionList: {
    type: Array as PropType<any[]>,
    default: (): [] => []
  },
  disabled: {
    type: Boolean,
    default: false
  },
  disabledText: {
    type: String,
    default: ''
  },
  noData: {
    type: String,
    default: ''
  },
  onValueChange: {
    type: Function as PropType<(oldTags: any[], newTags: any[]) => void>,
    default: undefined
  },
  'onUpdate:tags': {
    type: Function as PropType<(v: any[]) => void>,
    default: undefined
  },
  'onUpdate:suggestionList': {
    type: Function as PropType<(v: any[]) => void>,
    default: undefined
  }
} as const;

const KEYS_MAP = {
  tab: 'Tab',
  down: 'ArrowDown',
  up: 'ArrowUp',
  enter: 'Enter'
} as const;

export default defineComponent({
  name: 'DTagInput',
  props: tagInputProps,
  emits: ['update:tags', 'update:suggestionList', 'valueChange'],
  setup(props, ctx) {
    const add = (arr: any[], target: any) => {
      const res = Object.assign({}, target);
      delete res.__index;
      return arr.concat(res);
    };
    const remove = (arr: any[], targetIdx: number) => {
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
      const suggestions = props.suggestionList.map((item, index: number) => {
        return {
          __index: index,
          ...item
        };
      });
      if (tagInputVal.value === '') {
        return suggestions;
      }
      return suggestions.filter(item => item[props.displayProperty].includes(tagInputVal.value));
    });

    const selectIndex = ref(0);
    watch(mergedSuggestions, () => {
      selectIndex.value = 0;
    });
    const onSelectIndexChange = (isUp = false) => {
      if (isUp) {
        selectIndex.value < mergedSuggestions.value.length - 1 ? selectIndex.value++ : selectIndex.value = 0;
        return;
      }
      selectIndex.value > 0 ? selectIndex.value-- : selectIndex.value = mergedSuggestions.value.length - 1;
    };

    const tagInputRef = ref<HTMLInputElement | null>(null);
    const isInputBoxFocus = ref(false);
    const onInputFocus = () => {
      isInputBoxFocus.value = true;
    };
    const onInputBlur = () => {
      isInputBoxFocus.value = false;
    };
    const handleEnter = () => {
      let res = { [props.displayProperty]: tagInputVal.value };
      if (mergedSuggestions.value.length) {
        const target = mergedSuggestions.value[selectIndex.value];
        res = target;
        ctx.emit('update:suggestionList', remove(props.suggestionList, target.__index));
      }

      const newTags = add(props.tags, res);
      ctx.emit('valueChange', props.tags, newTags);
      ctx.emit('update:tags', newTags);
      mergedSuggestions.value.length === 0 && (tagInputVal.value = '');
    };
    const onInputKeydown = ($event: KeyboardEvent) => {
      switch ($event.key) {
        case KEYS_MAP.tab:
        case KEYS_MAP.enter:
          handleEnter();
          break;
        case KEYS_MAP.down:
          onSelectIndexChange(true);
          break;
        case KEYS_MAP.up:
          onSelectIndexChange();
          break;
        default:
          break;
      }
    };

    const removeTag = ($event: MouseEvent, tagIdx: number) => {
      $event.preventDefault();
      ctx.emit('update:suggestionList', add(props.suggestionList, props.tags[tagIdx]));
      const newTags = remove(props.tags, tagIdx);
      ctx.emit('valueChange', props.tags, newTags);
      ctx.emit('update:tags', newTags);
      nextTick(() => {
        tagInputRef.value?.focus();
      });
    };
    const onSuggestionItemClick = ($event: MouseEvent, itemIndex: number) => {
      $event.preventDefault();
      const target = mergedSuggestions.value[itemIndex];
      const newTags = add(props.tags, target);
      const newSuggestions = remove(props.suggestionList, target.__index);
      ctx.emit('valueChange', props.tags, newTags);
      ctx.emit('update:tags', newTags);
      ctx.emit('update:suggestionList', newSuggestions);
    };

    const isTagsLimit = computed(() => props.maxTags <= props.tags.length);
    const isShowSuggestion = computed(() => {
      return !props.disabled && !isTagsLimit.value && isInputBoxFocus.value;
    });

    return {
      tagInputRef,
      tagInputVal,
      isInputBoxFocus,
      onInput,
      onInputFocus,
      onInputBlur,
      removeTag,
      onSuggestionItemClick,
      onInputKeydown,
      isShowSuggestion,
      mergedSuggestions,
      selectIndex,
      isTagsLimit
    };
  },
  render () {
    const {
      tagInputVal,
      isInputBoxFocus,
      disabled,
      disabledText,
      isTagsLimit,
      maxTagsText,
      displayProperty,
      tags,
      onInputKeydown,
      onInputFocus,
      onInputBlur,
      onInput,
      onSuggestionItemClick,
      removeTag,
      placeholder,
      spellcheck,
      isShowSuggestion,
      noData,
      mergedSuggestions,
      selectIndex
    } = this;

    const inputBoxCls = {
      'devui-tags': true,
      'devui-form-control': true,
      'devui-dropdown-origin': true,
      'devui-dropdown-origin-open': isInputBoxFocus,
      'devui-disabled': disabled,
    };
    const tagInputCls = {
      input: true,
      'devui-input': true,
      'invalid-tag': false
    };
    const tagInputStyle = [
      `display:${disabled ? 'none' : 'block'};`
    ];

    const noDataTpl = <li class="devui-suggestion-item devui-disabled">
      { noData }
    </li>;

    return (
      <div class="devui-tags-host" tabindex="-1">
        <div class={inputBoxCls} style={['box-shadow: none;']}>
          <ul class="devui-tag-list" title={disabled ? disabledText : ''}>
            {
              tags.map((tag, tagIdx) => {
                return (
                  <li class="devui-tag-item">
                    <span>{tag[displayProperty]}</span>
                    {
                      !disabled &&
                      <a class="remove-button" onMousedown={($event) => removeTag($event,tagIdx)}>
                        { removeBtnSvg }
                      </a>
                    }
                  </li>
                );
              })
            }
          </ul>
          <input
            type="text"
            ref="tagInputRef"
            value={tagInputVal}
            class={tagInputCls}
            style={tagInputStyle}
            onKeydown={onInputKeydown}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            onInput={($event: any) => onInput($event)}
            placeholder={placeholder}
            spellcheck={spellcheck}
            disabled={isTagsLimit}
            title={isTagsLimit ? maxTagsText : ''} />
        </div>
        {
          !isShowSuggestion ? '' : (
            <div class="devui-tags-autocomplete devui-dropdown-menu">
              <ul class="devui-suggestion-list">
                {
                  mergedSuggestions.length === 0 ?
                    noDataTpl :
                    mergedSuggestions.map((item: any, index: number) => {
                      return (
                        <li
                          class={{'devui-suggestion-item': true, selected: index === selectIndex}}
                          onMousedown={($event) => {
                            onSuggestionItemClick($event, index);
                          }}>
                          { item[displayProperty] }
                        </li>
                      );
                    })
                }
              </ul>
            </div>
          )
        }
    </div>
    );
  }
});
