import { defineComponent, ref, onMounted, watch, onUnmounted, nextTick } from 'vue';
import { IMentionSuggestionItem, mentionProps, type MentionProps } from './mention-types';
import DTextarea from '../../textarea/src/textarea';
import DIcon from '../../icon/src/icon';
import './mention.scss';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { debounce } from 'lodash-es';

export default defineComponent({
  name: 'DMention',
  components: {
    DTextarea,
    DIcon,
  },
  props: mentionProps,
  emits: ['select', 'search'],
  setup(props: MentionProps, { slots, emit }) {
    const ns = useNamespace('mention');
    const value = ref<string>('');
    const showSuggestions = ref<boolean>(false);
    const suggestions = ref<IMentionSuggestionItem[]>([]);
    const result = ref<IMentionSuggestionItem[]>([]);
    const currentIndex = ref<number>(0);
    const loading = ref<boolean>(false);
    const suggestionsHeight = ref<number>();

    const handleUpdate = debounce((val: string) => {
      if (props.mentionTrigger.includes(val[0])) {
        showSuggestions.value = true;
        if (props.mentionPosition === 'top') {
          nextTick(() => {
            const suggestionsDom = document.getElementById('devui-suggestions');
            const height = window.getComputedStyle(suggestionsDom as Element, null).height;
            suggestionsHeight.value = -Number(height.replace('px', ''));
          });
        }
        if (val.length === 1) {
          result.value = suggestions.value;
        } else {
          result.value = suggestions.value.filter((item) =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (item as any)[props.dmValueParse.value].toLocaleLowerCase().includes(val.slice(1).toLocaleLowerCase())
          );
        }
      } else {
        showSuggestions.value = false;
      }
      emit('search', val.slice(1));
    }, 300);

    const handleBlur = () => {
      setTimeout(() => {
        showSuggestions.value = false;
      }, 100);
    };

    const handleFocus = () => {
      if (value.value === '@') {
        showSuggestions.value = true;
      }
    };

    const clickItem = (item: IMentionSuggestionItem, e: MouseEvent) => {
      emit('select', item);
      e.stopPropagation();
      e.preventDefault();
      showSuggestions.value = false;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value.value += (item as any)[props.dmValueParse.value];
    };

    const arrowKeyDown = (e: KeyboardEvent) => {
      if (showSuggestions.value && result.value.length) {
        if (e.key === 'ArrowDown') {
          currentIndex.value++;
          if (currentIndex.value === result.value.length) {
            currentIndex.value = 0;
          }
        }
        if (e.key === 'ArrowUp') {
          currentIndex.value--;
          if (currentIndex.value === -1) {
            currentIndex.value = result.value.length - 1;
          }
        }
        const dom = document.getElementById('devui-suggestions');
        const itemDom = document.getElementById(`devui-suggestions-item-${currentIndex.value}`);
        dom?.scrollTo({
          top: itemDom?.offsetTop,
        });
      }
    };

    const enterKeyDown = (e: KeyboardEvent) => {
      if (showSuggestions.value && result.value.length) {
        if (e.key === 'Enter') {
          e.stopPropagation();
          e.preventDefault();
          showSuggestions.value = false;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          value.value += (result.value[currentIndex.value] as any)[props.dmValueParse.value];
          emit('select', result.value[currentIndex.value]);
        }
      }
    };

    watch(
      () => props.mentionSuggestions,
      (val) => {
        suggestions.value = val as IMentionSuggestionItem[];
        result.value = val as IMentionSuggestionItem[];
      },
      { immediate: true, deep: true }
    );

    watch(
      () => props.mentionLoading,
      (val) => {
        loading.value = val;
      },
      { immediate: true }
    );

    onMounted(() => {
      window.addEventListener('keydown', arrowKeyDown);
      window.addEventListener('keydown', enterKeyDown);
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', arrowKeyDown);
      window.removeEventListener('keydown', enterKeyDown);
    });

    return () => {
      return (
        <div class={ns.b()}>
          <d-textarea v-model={value.value} onUpdate={handleUpdate} onBlur={handleBlur} onFocus={handleFocus}></d-textarea>
          {showSuggestions.value ? (
            loading.value ? (
              <div class={[`${ns.e('suggestions')} ${ns.e('suggestions-loading')}`]}>加载中... </div>
            ) : (
              <div
                class={ns.e('suggestions')}
                id="devui-suggestions"
                style={{
                  marginTop: props.mentionPosition === 'top' ? '0px' : '-16px',
                  top: suggestionsHeight.value ? suggestionsHeight.value + 'px' : 'inherit',
                }}>
                {result.value.length > 0 ? (
                  result.value?.map((item, index) => {
                    return (
                      <div
                        id={`devui-suggestions-item-${index}`}
                        class={`${ns.e('suggestions-item')} 
                    ${currentIndex.value === index ? `${ns.e('suggestions-item-active')}` : ''}`}
                        key={item.id}
                        onClick={(e) => clickItem(item, e)}>
                        {slots.template ? slots.template({ item }) : item.value}
                      </div>
                    );
                  })
                ) : (
                  <div>{props.mentionNotFoundContent}</div>
                )}
              </div>
            )
          ) : null}
        </div>
      );
    };
  },
});
