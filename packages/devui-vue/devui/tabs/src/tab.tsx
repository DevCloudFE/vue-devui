import { defineComponent, inject } from 'vue';
import { tabProps } from './tab-types';
import type { Tabs } from './tabs-types';

export default defineComponent({
  name: 'DTab',
  props: tabProps,
  setup(props, { slots }) {
    const tabs = inject<Tabs>('tabs');
    tabs.state.slots.push(slots.title);
    tabs.state.data.push(props);
    return () => {
      const { id } = props;
      const content =
        tabs.state.showContent && tabs.state.active === id ? (
          <div class="devui-tab-content">
            <div role="tabpanel" class="devui-tab-pane in active">
              {slots.default()}
            </div>
          </div>
        ) : null;
      return content;
    };
  },
});
