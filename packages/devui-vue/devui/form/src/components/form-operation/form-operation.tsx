import { defineComponent, computed, inject } from 'vue';
import { FORM_TOKEN, FormContext, LabelSize } from '../../form-types';
import './form-operation.scss';

export default defineComponent({
  name: 'DFormOperation',
  setup(props, ctx) {
    const formContext = inject(FORM_TOKEN) as FormContext;
    const LabelSizeMap: Record<LabelSize, number> = {
      sm: 80,
      md: 100,
      lg: 150,
    };
    const styles = computed(() => ({
      marginLeft: formContext.layout === 'horizontal' ? `${LabelSizeMap[formContext.labelSize] + 16}px` : undefined,
    }));
    return () => (
      <div class="devui-form-operation" style={styles.value}>
        {ctx.slots.default?.()}
      </div>
    );
  },
});
