import { defineComponent, inject, onBeforeMount, onMounted, onUpdated, reactive, ref, SetupContext, shallowRef, watch } from 'vue';
import { TabsData, tabsProps, TabsProps } from '../../tabs-types';
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
    const data: OffSetData = reactive({ offsetLeft: 0, offsetWidth: 0, id: null });
    const tabs = inject<TabsData>('tabs');
    const { ulClasses } = useTabNavRender(props);
    const { update, beforeMount, mounted, activeClick, tabCanClose } = useTabNavFunction(props, tabs, data, ctx, tabsEle);
    const { onTabRemove, onTabAdd } = useTabNavEvent(ctx);

    onUpdated(() => update());
    onBeforeMount(() => beforeMount());
    onMounted(() => mounted());

    watch(
      () => props.modelValue,
      () => {
        const tab = tabs?.state.data?.find((item) => item.id === props.modelValue);
        if (tab) {
          activeClick(tab);
        }
      }
    );

    return () => {
      const closeIconEl = (item) => {
        return tabCanClose(item) ? (
          <span class={ns.e('close-btn')} onClick={(ev: MouseEvent) => onTabRemove(item, ev)}>
            <d-icon size="12px" name="error-o" />
          </span>
        ) : null;
      };
      const newButton = props.addable ? (
        <li class={ns.e('new-tab')} onClick={onTabAdd}>
          <d-icon name="add"></d-icon>
        </li>
      ) : null;
      return (
        <ul ref={tabsEle} role="tablist" class={ulClasses.value}>
          {(tabs?.state.data || []).map((item, i) => {
            return (
              <li
                role="presentation"
                onClick={() => {
                  activeClick(item);
                }}
                class={(props.modelValue === (item.id || item.tabId) ? 'active' : '') + (item.disabled ? ' disabled' : '')}
                id={item.id || item.tabId}>
                <a role="tab" data-toggle={item.id} aria-expanded={props.modelValue === (item.id || item.tabId)}>
                  {tabs?.state.slots[i] ? tabs.state.slots[i]() : <span>{item.title}</span>}
                </a>
                {closeIconEl(item)}
              </li>
            );
          })}
          {newButton}
          <div
            class={ns.e(`nav-${props.type}-animation`)}
            style={{
              left: data.offsetLeft + 'px',
              width: data.offsetWidth + 'px',
            }}></div>
        </ul>
      );
    };
  },
});
