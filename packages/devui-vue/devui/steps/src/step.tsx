import { computed, defineComponent, getCurrentInstance, inject, toRefs } from 'vue';
import { stepProps, StepProps } from './step-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { Icon } from '../../icon';
import { ACTIVE_STEP, STEPS, STEPS_PROPS } from './const';
import './step.scss';

export default defineComponent({
  name: 'DStep',
  props: stepProps,
  setup(props: StepProps) {
    const { title, description } = toRefs(props);
    const ns = useNamespace('step');
    const instance = getCurrentInstance();

    const activeStep = inject(ACTIVE_STEP);

    const steps = inject(STEPS);
    steps.value.push(instance);

    const stepsProps = inject(STEPS_PROPS);

    const currentStepIndex = steps.value.indexOf(instance);

    const stepClass = computed(() => {
      const activeClass = activeStep.value === currentStepIndex ? ' active' : '';
      const finishedClass = activeStep.value > currentStepIndex ? ' finished' : '';
      const centerClass =  stepsProps.alignCenter ? ' center' : '';

      return `${ns.b()}${activeClass}${finishedClass}${centerClass}`;
    });
    const stepStyle = computed(() => {
      const styleObj = {};

      if (stepsProps.space) {
        styleObj.width = `${stepsProps.space}px`;
      } else {
        styleObj.flexBasis = stepsProps.alignCenter
          ? `${100 / steps.value.length}%`
          : `${100 / (steps.value.length - 1)}%`;
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
          { description.value && <span class={ns.e('description') }>{ description.value }</span>}
        </div>
      );
    };
  }
});
