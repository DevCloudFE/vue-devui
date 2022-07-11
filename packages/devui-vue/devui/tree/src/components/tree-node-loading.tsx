import { defineComponent } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';

export default defineComponent({
  name: 'DTreeNodeLoading',
  setup() {
    const ns = useNamespace('loading-children ');
    return () => {
      return <span class={ns.b()}>加载中...</span>;
    };
  },
});
