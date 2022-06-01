import { defineComponent, provide, reactive, SetupContext, watch } from 'vue';
import { TabsData, tabsProps, TabsState, TabsProps } from './tabs-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './tabs.scss';
import TabNav from './components/tab-nav/tab-nav';
import { useTabsEvent } from './use-tabs';

export default defineComponent({
  name: 'DTabs',
  props: tabsProps,
  emits: ['update:modelValue', 'active-tab-change', 'tab-remove', 'tab-add', 'tab-change'],
  setup(props: TabsProps, ctx: SetupContext) {
    const ns = useNamespace('tabs');
    const state: TabsState = reactive({
      data: [],
      active: props.modelValue,
      showContent: props.showContent,
      slots: [],
    });
    provide<TabsData>('tabs', { state });

    const { onUpdateModelValue, onActiveTabChange, onTabRemove, onTabAdd, onTabChange } = useTabsEvent(ctx);

    watch(
      () => state.active,
      () => {
        onUpdateModelValue(state.active);
      }
    );

    return () => {
      return (
        <div class={ns.b()}>
          <TabNav
            {...props}
            onActiveTabChange={onActiveTabChange}
            onTabRemove={onTabRemove}
            onTabAdd={onTabAdd}
            onTabChange={onTabChange}
          />
          {ctx.slots.default?.()}
        </div>
      );
    };
  },
});
