import { defineComponent, ref, onMounted, watch, onUnmounted, computed, getCurrentInstance } from 'vue';
import { IMentionSuggestionItem, mentionProps, type MentionProps } from './mention-types';
import DTextarea from '../../textarea/src/textarea';
import DIcon from '../../icon/src/icon';
import './mention.scss';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { debounce } from 'lodash';

export default defineComponent({
  name: 'DMention',
  components: {
    DTextarea,
    DIcon,
  },
  props: mentionProps,
  emits: ['select', 'change'],
  setup(props: MentionProps, { slots, emit }) {
    const ns = useNamespace('mention');
    const textContext = ref<string>('');
    const showSuggestions = ref<boolean>(false);
    const currentIndex = ref<number>(0);
    const suggestionsTop = ref<number>();
    const suggestionsLeft = ref<number>();
    const suggestions = ref<IMentionSuggestionItem[]>([]);
    const filteredSuggestions = ref<IMentionSuggestionItem[]>([]);
    const suggestionsDom = ref<HTMLDivElement>();
    const loading = computed(() => props.loading);
    const instance = getCurrentInstance();

    function getLastTriggerIndex(val: string) {
      let lastTriggerIndex = -1;
      for (const trigger of props.trigger) {
        lastTriggerIndex = Math.max(lastTriggerIndex, val.lastIndexOf(trigger));
      }
      return lastTriggerIndex;
    }

    function handleCompleteText(val: string | number) {
      const lastTriggerIndex = getLastTriggerIndex(textContext.value);
      textContext.value = textContext.value.substring(0, lastTriggerIndex + 1) + val.toLocaleString() + ' ';
      showSuggestions.value = false;
    }

    const handleUpdate = debounce((val: string) => {
      const lastChar = val.charAt(val.length - 1);
      if (props.trigger.includes(lastChar)) {
        showSuggestions.value = true;
      }
      if (lastChar === ' ') {
        showSuggestions.value = false;
      }
      if (showSuggestions.value) {
        const prefix = val.slice(getLastTriggerIndex(val) + 1, val.length - 1);
        if (props.position === 'top') {
          setTimeout(() => {
            const element = window.getComputedStyle(suggestionsDom.value as Element, null);
            const { height, width } = element;
            suggestionsTop.value = -Number(height.replace('px', ''));
            suggestionsLeft.value = Number(width.replace('px', ''));
          }, 0);
        }
        filteredSuggestions.value = (suggestions.value as IMentionSuggestionItem[]).filter((item: IMentionSuggestionItem) => {
          const string = String(item[props.dmValueParse.value as keyof IMentionSuggestionItem]).toLocaleLowerCase();
          return string.includes(prefix);
        });
      }
      emit('change', lastChar);
    }, 300);

    const handleBlur = (e: Event) => {
      const { target } = e;
      const ele = document.querySelector('.devui-mention');
      if (!ele?.contains(target as Element)) {
        setTimeout(() => {
          showSuggestions.value = false;
        }, 100);
      }
    };

    const handleFocus = () => {
      if (props.trigger.includes(textContext.value)) {
        showSuggestions.value = true;
      }
    };

    const clickItem = (item: IMentionSuggestionItem, e: MouseEvent) => {
      emit('select', item);
      e.stopPropagation();
      e.preventDefault();
      showSuggestions.value = false;
      handleCompleteText(item[props.dmValueParse.value as keyof IMentionSuggestionItem]);
    };

    const arrowKeyDown = (e: KeyboardEvent) => {
      if (showSuggestions.value && filteredSuggestions.value.length) {
        if (e.key === 'ArrowDown') {
          currentIndex.value++;
          if (currentIndex.value === filteredSuggestions.value.length) {
            currentIndex.value = 0;
          }
        }
        if (e.key === 'ArrowUp') {
          currentIndex.value--;
          if (currentIndex.value === -1) {
            currentIndex.value = filteredSuggestions.value.length - 1;
          }
        }
        const itemDom = instance?.proxy?.$refs[`devui-suggestions-item-${currentIndex.value}`];
        const itemOffsetTop = (itemDom as HTMLElement)?.offsetTop;
        const clientHeight = (suggestionsDom.value as HTMLElement)?.clientHeight;
        const itemTotal = Math.ceil(clientHeight / (itemDom as HTMLElement).clientHeight);
        if ((e.key === 'ArrowDown' && currentIndex.value >= itemTotal) || e.key === 'ArrowUp') {
          suggestionsDom.value?.scrollTo({
            top: itemOffsetTop,
          });
        }
      }
    };

    const enterKeyDown = (e: KeyboardEvent) => {
      if (showSuggestions.value && filteredSuggestions.value.length) {
        if (e.key === 'Enter') {
          e.stopPropagation();
          e.preventDefault();
          showSuggestions.value = false;
          handleCompleteText(filteredSuggestions.value[currentIndex.value][props.dmValueParse.value as keyof IMentionSuggestionItem]);
          emit('select', filteredSuggestions.value[currentIndex.value]);
        }
      }
    };

    watch(
      () => props.suggestions,
      (val) => {
        suggestions.value = val as IMentionSuggestionItem[];
        filteredSuggestions.value = val as IMentionSuggestionItem[];
      },
      { immediate: true, deep: true }
    );

    onMounted(() => {
      window.addEventListener('keydown', arrowKeyDown);
      window.addEventListener('keydown', enterKeyDown);
      document.addEventListener('click', handleBlur);
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', arrowKeyDown);
      window.removeEventListener('keydown', enterKeyDown);
      document.removeEventListener('click', handleBlur);
    });

    return () => {
      return (
        <div class={ns.b()}>
          <d-textarea
            v-model={textContext.value}
            show-glow-style={props.showGlowStyle}
            onUpdate={handleUpdate}
            onFocus={handleFocus}></d-textarea>
          {showSuggestions.value ? (
            loading.value ? (
              <div class={[`${ns.e('suggestions')} ${ns.e('suggestions-loading')}`]}>加载中... </div>
            ) : (
              <div
                class={ns.e('suggestions')}
                ref={suggestionsDom}
                style={{
                  marginTop: props.position === 'top' ? '0px' : '-16px',
                  top: suggestionsTop.value ? suggestionsTop.value + 'px' : 'inherit',
                  left: suggestionsLeft.value ? suggestionsLeft.value + 'px' : 'inherit',
                }}>
                {filteredSuggestions.value.length > 0 ? (
                  filteredSuggestions.value?.map((item, index) => {
                    return (
                      <div
                        ref={`devui-suggestions-item-${index}`}
                        class={`${ns.e('suggestions-item')}
                    ${currentIndex.value === index ? `${ns.e('suggestions-item-active')}` : ''}`}
                        key={item.id}
                        onClick={(e) => clickItem(item, e)}>
                        {slots.template ? slots.template({ item }) : item.value}
                      </div>
                    );
                  })
                ) : (
                  <div>{props.notFoundContent}</div>
                )}
              </div>
            )
          ) : null}
        </div>
      );
    };
  },
});
