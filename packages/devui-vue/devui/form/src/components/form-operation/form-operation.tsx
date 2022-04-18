import { defineComponent, computed, reactive, inject } from 'vue';
import { FORM_TOKEN, IForm, LabelSize } from '../../form-types';
import './form-operation.scss';

export default defineComponent({
  name: 'DFormOperation',
  setup(props, ctx) {
    const Form = reactive(inject(FORM_TOKEN) as IForm);
    const labelData = reactive(Form.labelData);
    const LabelSizeMap: Record<LabelSize, number> = {
      sm: 80,
      md: 100,
      lg: 150,
    };
    const styles = computed(() => ({
      marginLeft: labelData.layout === 'horizontal' ? `${LabelSizeMap[labelData.labelSize] + 16}px` : undefined,
    }));
    return () => (
      <div class="devui-form-operation" style={styles.value}>
        {ctx.slots.default?.()}
      </div>
    );
  },
});
