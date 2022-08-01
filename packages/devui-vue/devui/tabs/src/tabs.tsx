import { defineComponent, provide, reactive, SetupContext, watch } from 'vue';
import { TabsData, tabsProps, TabsState, TabsProps } from './tabs-types';
import './tabs.scss';
import TabNav from './components/tab-nav/tab-nav';
import { useTabsEvent, useTabsRender } from './use-tabs';

export default defineComponent({
  name: 'DTabs',
  props: tabsProps,
  emits: ['update:modelValue', 'active-tab-change', 'tab-remove', 'tab-add', 'tab-change'],
  setup(props: TabsProps, ctx: SetupContext) {
    const state: TabsState = reactive({
      data: [],
      active: props.modelValue,
      showContent: props.showContent,
      slots: [],
    });
    provide<TabsData>('tabs', { state });

    const { onUpdateModelValue, onActiveTabChange, onTabRemove, onTabAdd, onTabChange } = useTabsEvent(ctx);
    const { tabsClasses } = useTabsRender(props);

    watch(
      () => state.active,
      () => {
        onUpdateModelValue(state.active);
      }
    );

    return () => {
      const tabNav = (
        <TabNav {...props} onActiveTabChange={onActiveTabChange} onTabRemove={onTabRemove} onTabAdd={onTabAdd} onTabChange={onTabChange} />
      );
      const content = ctx.slots.default?.();
      return (
        <div class={tabsClasses.value}>
          {props.tabPosition === 'bottom' ? [content, tabNav] : [tabNav, content]}
          <div style={'clear: both'}></div>
        </div>
      );
    };
  },
});
