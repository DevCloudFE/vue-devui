import { defineComponent, provide, reactive, SetupContext, watch } from 'vue';
import { TabsData, tabsProps, TabsState, TabsProps } from './tabs-types';
import { TabContext } from './components/tab/tab-types';
import TabNav from './components/tab-nav/tab-nav';
import { useTabsEvent, useTabsRender } from './use-tabs';

export default defineComponent({
  name: 'DTabs',
  props: tabsProps,
  emits: ['update:modelValue', 'active-tab-change', 'tab-remove', 'tab-add', 'tab-change'],
  setup(props: TabsProps, ctx: SetupContext) {
    const state: TabsState = reactive({
      data: {},
      active: props.modelValue,
      showContent: props.showContent,
    });
    const addTab = (tabCtx: TabContext) => {
      if (tabCtx.uid) {
        state.data[tabCtx.uid] = tabCtx;
      }
    };
    const deleteTab = (uid: number | undefined) => {
      if (uid) {
        delete state.data[uid];
      }
    };
    provide<TabsData>('tabs', { state, addTab, deleteTab });

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
