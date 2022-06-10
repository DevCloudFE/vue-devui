import { computed, defineComponent, provide, ref, toRefs, watch } from 'vue';
import { stepsProps, StepsProps } from './steps-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './steps.scss';
import { ACTIVE_STEP, STEPS, STEPS_PROPS } from './const';

export default defineComponent({
  name: 'DSteps',
  props: stepsProps,
  emits: ['update:modelValue'],
  setup(props: StepsProps, { slots }) {
    const { modelValue, direction, simple } = toRefs(props);
    const ns = useNamespace('steps');

    const activeStep = ref(modelValue.value);
    provide(ACTIVE_STEP, activeStep);

    provide(STEPS_PROPS, props);

    const steps = ref([]);
    provide(STEPS, steps);

    watch(modelValue, (newVal) => {
      activeStep.value = newVal;
    });

    const stepsClass = computed(() => {
      const directionClass = direction.value === 'vertical' ? ' vertical' : '';
      const simpleClass = simple.value ? ' simple' : '';

      return `${ns.b()}${directionClass}${simpleClass}`;
    });

    return () => {
      return (
        <div class={stepsClass.value}>
          { slots.default?.() }
        </div>
      );
    };
  }
});
