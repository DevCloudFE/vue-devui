import { defineComponent, inject, onUnmounted } from 'vue';
import { tabProps } from './tab-types';
import type { TabsData } from '../../tabs-types';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import './tab.scss';

export default defineComponent({
  name: 'DTab',
  props: tabProps,
  setup(props, { slots }) {
    const tabs = inject<TabsData>('tabs');
    tabs?.state.slots.push(slots.title);
    tabs?.state.data?.push(props);
    const ns = useNamespace('tab');

    onUnmounted(() => {
      tabs.state.data = tabs.state.data.filter((tab) => tab.id !== props.id);
    });
    return () => {
      const { id } = props;
      const content =
        tabs.state.showContent && tabs.state.active === id ? (
          <div class={ns.e('content')}>
            <div role="tabpanel">{slots.default?.()}</div>
          </div>
        ) : null;
      return content;
    };
  },
});
