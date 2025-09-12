import { defineComponent, getCurrentInstance } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { createI18nTranslate } from '../../../locale/create';

export default defineComponent({
  name: 'DTreeNodeLoading',
  setup() {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DTree', app);
    const ns = useNamespace('loading-children ');

    return () => {
      return <span class={ns.b()}>{`${t('loading') || 'Loading'}...`}</span>;
    };
  },
});
