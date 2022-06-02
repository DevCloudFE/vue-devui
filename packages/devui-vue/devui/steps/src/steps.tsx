import { defineComponent, provide, ref, toRefs, watch } from 'vue';
import { stepsProps, StepsProps } from './steps-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './steps.scss';
import { ACTIVE_STEP, STEPS } from './const';

export default defineComponent({
  name: 'DSteps',
  props: stepsProps,
  emits: ['update:modelValue'],
  setup(props: StepsProps, { slots }) {
    const { modelValue } = toRefs(props);
    const ns = useNamespace('steps');

    const activeStep = ref(modelValue.value);
    provide(ACTIVE_STEP, activeStep);

    const steps = ref([]);
    provide(STEPS, steps);

    watch(modelValue, (newVal) => {
      activeStep.value = newVal;
    });

    return () => {
      return (
        <div class={ns.b()}>
          { slots.default?.() }
        </div>
      );
    };
  }
});
