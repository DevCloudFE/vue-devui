import {
  computed,
  defineComponent,
  inject,
  onBeforeMount,
  onMounted,
  onUpdated,
  onUnmounted,
  reactive,
  SetupContext,
  shallowRef,
  watch,
  nextTick,
} from 'vue';
import { TabsData, tabsProps, TabsProps, TabsStateData } from '../../tabs-types';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import { useTabNavRender } from './composables/use-tab-nav-render';
import { useTabNavFunction } from './composables/use-tab-nav-function';
import { useTabNavEvent } from './composables/use-tab-nav-event';
import './tab-nav.scss';
import { OffSetData } from './tab-nav-types';

export default defineComponent({
  name: 'DTabNav',
  props: tabsProps,
  emits: ['active-tab-change', 'tab-remove', 'tab-add', 'tab-change'],
  setup(props: TabsProps, ctx: SetupContext) {
    const ns = useNamespace('tabs');
    const tabsEle = shallowRef<HTMLUListElement>();
    const data: OffSetData = reactive({ offsetLeft: 0, offsetWidth: 0, offsetTop: 0, offsetHeight: 0, id: null });
    const tabs = inject<TabsData>('tabs');
    const tabsList = computed(() => Object.values(tabs?.state.data || {}));
    const { ulClasses, aClasses, customStyle, sliderAnimationStyle } = useTabNavRender(props, data);
    const { update, beforeMount, mounted, activeClick, tabCanClose } = useTabNavFunction(props, tabs, tabsList, data, ctx, tabsEle);
    const { onTabRemove, onTabAdd } = useTabNavEvent(ctx);

    // 添加新的tab选项
    const handleTabAdd = () => {
      onTabAdd();
      nextTick(() => {
        // 使每次添加新tab后，滚动条都在最右侧
        if (tabsEle.value) {
          tabsEle.value.scrollLeft = tabsEle.value.scrollWidth;
        }
      });
    };

    // 鼠标是否在滑动
    let isSlide = false;
    // tab滑动
    const handleSlideTab = (mousedownEvent: MouseEvent) => {
      if (tabsEle.value) {
        // 鼠标按下x坐标
        const mousedownX = mousedownEvent.clientX;
        // 当前滚动条距离
        const scrollLeft = tabsEle.value.scrollLeft;
        isSlide = true;
        // 监听鼠标滑动
        tabsEle.value.addEventListener('mousemove', (mousemoveEvent: MouseEvent) => {
          if (isSlide && tabsEle.value) {
            // 当前鼠标移动x坐标
            const mousemoveX = mousemoveEvent.clientX;
            // 滑动距离
            const scrollWidth = mousemoveX - mousedownX;
            tabsEle.value.scrollLeft = scrollLeft - scrollWidth;
          }
        });
        tabsEle.value.addEventListener('mouseup', () => {
          isSlide = false;
        });
        tabsEle.value.addEventListener('mouseleave', () => {
          isSlide = false;
        });
      }
    };

    onUpdated(() => update());
    onBeforeMount(() => beforeMount());
    onMounted(() => {
      mounted();
      // tab超出容器后监听滑动
      if (tabsEle.value) {
        tabsEle.value.addEventListener('mousedown', handleSlideTab);
      }
    });
    onUnmounted(() => {
      if (tabsEle.value) {
        tabsEle.value.removeEventListener('mousedown', handleSlideTab);
      }
    });

    watch(
      () => props.modelValue,
      () => {
        const tab = tabsList.value.find((item) => item.props.id === props.modelValue);
        if (tab) {
          activeClick(tab);
        }
      }
    );

    return () => {
      const closeIconEl = (item: TabsStateData) => {
        return tabCanClose(item) ? (
          <span class={ns.e('close-btn')} onClick={(ev: MouseEvent) => onTabRemove(item, ev)}>
            <d-icon size="12px" name="error-o" />
          </span>
        ) : null;
      };
      const newButton = props.addable ? (
        <li class={ns.e('new-tab')} onClick={handleTabAdd}>
          <d-icon name="add"></d-icon>
        </li>
      ) : null;
      return (
        <ul ref={tabsEle} role="tablist" class={ulClasses.value}>
          {(tabsList.value || []).map((item) => {
            return (
              <li
                role="presentation"
                onClick={() => {
                  activeClick(item);
                }}
                class={(props.modelValue === item.props.id ? 'active' : '') + (item.props.disabled ? ' disabled' : '')}
                id={item.props.id}>
                <span class={ns.e('nav-content')}>
                  <a
                    role="tab"
                    data-toggle={item.props.id}
                    aria-expanded={props.modelValue === item.props.id}
                    class={aClasses.value}
                    style={customStyle}>
                    {item.slots.title ? item.slots.title() : <span>{item.props.title}</span>}
                  </a>
                  {closeIconEl(item)}
                </span>
              </li>
            );
          })}
          {newButton}
          <div class={ns.e(`nav-${props.type}-animation`)} style={sliderAnimationStyle.value}></div>
        </ul>
      );
    };
  },
});
