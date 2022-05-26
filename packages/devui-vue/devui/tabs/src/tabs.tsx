import { defineComponent, provide, reactive } from 'vue';
import { TabsData, tabsProps, TabsState, TabsProps } from './tabs-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './tabs.scss';
import TabNav from './components/tab-nav/tab-nav';

export default defineComponent({
  name: 'DTabs',
  props: tabsProps,
  emits: ['update:modelValue', 'active-tab-change'],
  setup(props: TabsProps, { emit, slots }) {
    const ns = useNamespace('tabs');
    const state: TabsState = reactive({
      data: [],
      active: props.modelValue,
      showContent: props.showContent,
      slots: [],
    });
    provide<TabsData>('tabs', { state });

    const updateModelValue = (value: string) => {
      emit('update:modelValue', value);
    };
    const activeTabChange = (value: string) => {
      emit('active-tab-change', value);
    };
    return () => {
      return (
        <div class={ns.b()}>
          <TabNav {...props} onUpdate:modelValue={updateModelValue} onActiveTabChange={activeTabChange} />
          {slots.default?.()}
        </div>
      );
    };
  },
});
