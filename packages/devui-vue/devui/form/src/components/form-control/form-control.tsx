import { defineComponent, ref, watch, computed, inject, onUnmounted } from 'vue';
import type { SetupContext } from 'vue';
import { FormContext, FORM_TOKEN } from '../../form-types';
import { formControlProps, FormControlProps } from './form-control-types';
import { Popover } from '../../../../popover';
import { SuccessIcon, ErrorIcon, PendingIcon } from '../form-icons';
import { useNamespace } from '@devui/shared/utils';
import { useFormControl, useFormControlValidate } from './use-form-control';
import './form-control.scss';

export default defineComponent({
  name: 'DFormControl',
  props: formControlProps,
  setup(props: FormControlProps, ctx: SetupContext) {
    const formContext = inject(FORM_TOKEN) as FormContext;
    const formControl = ref();
    const popoverRef = ref();
    const ns = useNamespace('form');
    const { controlClasses, controlContainerClasses, labelData } = useFormControl(props);
    const { feedbackStatus, showFeedback, showPopover, showMessage, errorMessage, popPosition } = useFormControlValidate();

    const align = computed(() => {
      if (popPosition.value?.some((item: string) => item.includes('start'))) {
        return 'start';
      }
      if (popPosition.value?.some((item: string) => item.includes('end'))) {
        return 'end';
      }
      return undefined;
    });

    return () => (
      <div class={controlClasses.value} ref={formControl}>
        <div class={controlContainerClasses.value}>
          <Popover
            ref={popoverRef}
            is-open={showPopover.value}
            trigger="manually"
            content={errorMessage.value}
            pop-type="error"
            position={popPosition.value}
            align={align.value}
            scroll-element="auto"
            append-to-body-scroll-strategy={formContext.appendToBodyScrollStrategy}>
            {ctx.slots.default?.()}
          </Popover>
          {showFeedback.value && (
            <span class={[ns.e('feedback-icon'), ns.em('feedback-icon', feedbackStatus.value)]}>
              {feedbackStatus.value === 'error' && <ErrorIcon />}
              {feedbackStatus.value === 'success' && <SuccessIcon />}
              {feedbackStatus.value === 'pending' && <PendingIcon />}
            </span>
          )}
        </div>
        <div class={ns.e('control-info')}>
          {showMessage.value && <div class="error-message">{errorMessage.value}</div>}
          {labelData.value.formItemCtx.slots.extraInfo
            ? labelData.value.formItemCtx.slots.extraInfo()
            : props.extraInfo && <div class={ns.e('control-extra')}>{props.extraInfo}</div>}
        </div>
      </div>
    );
  },
});
