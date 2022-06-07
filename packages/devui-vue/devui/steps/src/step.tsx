import { computed, defineComponent, getCurrentInstance, inject, Ref, toRefs } from 'vue';
import { stepProps, StepProps } from './step-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { Icon } from '../../icon';
import './step.scss';
import { ACTIVE_STEP, STEPS, STEPS_SPACE } from './const';

export default defineComponent({
  name: 'DStep',
  props: stepProps,
  setup(props: StepProps) {
    const { title } = toRefs(props);
    const ns = useNamespace('step');
    const instance = getCurrentInstance();

    const activeStep = inject(ACTIVE_STEP);

    const steps = inject(STEPS);
    steps.value.push(instance);

    const stepsSpace = inject(STEPS_SPACE);

    const currentStepIndex = steps.value.indexOf(instance);

    const stepClass = computed(() => {
      const activeClass = activeStep.value === currentStepIndex ? ' active' : '';
      const finishedClass = activeStep.value > currentStepIndex ? ' finished' : '';

      return `${ns.b()}${activeClass}${finishedClass}`;
    });
    const stepStyle = computed(() => {
      const styleObj = {};

      if (stepsSpace) {
        styleObj.width = `${stepsSpace}px`;
      } else {
        styleObj.flexBasis = `${100 / (steps.value.length - 1)}%`;
      }
      return styleObj;
    });

    return () => {
      return (
        <div class={stepClass.value} style={stepStyle.value}>
          <div class={ns.e('dot-container')}>
            {
              activeStep.value > steps.value.indexOf(instance)
                ? <Icon name="right-o" color="var(--devui-success)" size="24px"></Icon>
                : <span class={ns.e('dot')}>{ currentStepIndex + 1 }</span>
            }
            <div class={ns.e('line')}></div>
          </div>
          <span class={ns.e('title')}>{ title.value }</span>
        </div>
      );
    };
  }
});
