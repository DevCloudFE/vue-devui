import { defineComponent, ref } from 'vue';
import type { SetupContext } from 'vue';
import { formControlProps, FormControlProps } from './form-control-types';
import { Popover } from '../../../../popover';
import { SuccessIcon, ErrorIcon, PendingIcon } from '../form-icons';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import { useFormControl, useFormControlValidate } from './use-form-control';
import './form-control.scss';

export default defineComponent({
  name: 'DFormControl',
  props: formControlProps,
  setup(props: FormControlProps, ctx: SetupContext) {
    const formControl = ref();
    const ns = useNamespace('form');
    const { controlClasses, controlContainerClasses } = useFormControl(props);
    const { feedbackStatus, showFeedback, showPopover, showMessage, errorMessage, popPosition } = useFormControlValidate();

    return () => (
      <div class={controlClasses.value} ref={formControl}>
        <div class={controlContainerClasses.value}>
          <Popover
            is-open={showPopover.value}
            trigger="manually"
            content={errorMessage.value}
            pop-type="error"
            position={popPosition.value}>
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
          {props.extraInfo && <div class={ns.e('control-extra')}>{props.extraInfo}</div>}
        </div>
      </div>
    );
  },
});
