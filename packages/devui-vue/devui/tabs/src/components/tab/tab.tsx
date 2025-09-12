import { defineComponent, getCurrentInstance, inject, onMounted, onUnmounted, reactive } from 'vue';
import { tabProps } from './tab-types';
import type { TabsData } from '../../tabs-types';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import './tab.scss';

export default defineComponent({
  name: 'DTab',
  props: tabProps,
  setup(props, { slots }) {
    const tabs = inject<TabsData>('tabs');
    const ns = useNamespace('tab');
    const instance = getCurrentInstance();
    const tabContext = reactive({
      uid: instance?.uid,
      slots,
      props,
    });

    onMounted(() => {
      tabs?.addTab(tabContext);
    });

    onUnmounted(() => {
      tabs?.deleteTab(tabContext.uid);
    });
    return () => {
      const { id } = props;
      const content =
        tabs?.state.showContent && tabs.state.active === id ? (
          <div class={ns.e('content')}>
            <div role="tabpanel">{slots.default?.()}</div>
          </div>
        ) : null;
      return content;
    };
  },
});
