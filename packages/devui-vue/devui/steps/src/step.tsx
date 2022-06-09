import { computed, defineComponent, getCurrentInstance, inject, toRefs } from 'vue';
import { stepProps, StepProps } from './step-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { Icon } from '../../icon';
import { ACTIVE_STEP, STEPS, STEPS_PROPS } from './const';
import './step.scss';

export default defineComponent({
  name: 'DStep',
  props: stepProps,
  setup(props: StepProps, { slots }) {
    const { title, description, icon, status } = toRefs(props);
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
      const statusClass = status?.value ? ` ${status?.value}` : '';
      const simpleClass = stepsProps.simple ? ` ${ns.m('simple')}` : '';

      return `${ns.b()}${activeClass}${finishedClass}${centerClass}${statusClass}${simpleClass}`;
    });
    const stepStyle = computed(() => {
      const styleObj = {};

      if (stepsProps.space) {
        styleObj.width = `${stepsProps.space}px`;
      } else {
        styleObj.flexBasis = (stepsProps.alignCenter || stepsProps.simple)
          ? `${100 / steps.value.length}%`
          : `${100 / (steps.value.length - 1)}%`;
      }
      return styleObj;
    });

    const iconColor = computed(() => {
      const isActive = activeStep.value === currentStepIndex;
      const isFinished = activeStep.value > currentStepIndex;

      return isActive
        ? 'var(--devui-brand)'
        : isFinished
          ? 'var(--devui-success)'
          : 'var(--devui-placeholder)';
    });

    const statusMap = {
      finish: <Icon name="right-o" color="var(--devui-success)" size="24px"></Icon>,
      success: <Icon name="right-o" color="var(--devui-success)" size="24px"></Icon>,
      error: <Icon name="error-o" color="var(--devui-danger)" size="24px"></Icon>,
    };

    const renderDot = () => {
      return slots.icon
        ? slots.icon?.(iconColor.value)
        : icon.value
          ? <Icon name={icon.value} color={iconColor.value} size="24px"></Icon>
          : (status.value && statusMap[status.value])
            ? statusMap[status.value]
            : activeStep.value > steps.value.indexOf(instance)
              ? <Icon name="right-o" color="var(--devui-success)" size="24px"></Icon>
              : <span class={ns.e('dot')}>{ currentStepIndex + 1 }</span>;
    };

    return () => {
      return (
        <>
          {
            stepsProps.simple
              ? <div class={stepClass.value} style={stepStyle.value}>
                { title.value }
              </div>
              : <div class={stepClass.value} style={stepStyle.value}>
                <div class={ns.e('dot-container')}>
                  { renderDot() }
                  <div class={ns.e('line')}></div>
                </div>
                <div class={ns.e('content')}>
                  <span class={ns.e('title')}>{ title.value }</span>
                  { description.value && <span class={ns.e('description') }>{ description.value }</span>}
                </div>
              </div>
          }
        </>
      );
    };
  }
});
