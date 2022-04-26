import { defineComponent, ref } from 'vue';
import type { SetupContext } from 'vue';
import { formControlProps, FormControlProps } from './form-control-types';
import { Popover } from '../../../../popover';
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
    const { showPopover, showMessage, errorMessage, popPosition } = useFormControlValidate();

    return () => (
      <div class={controlClasses.value} ref={formControl}>
        <div class={controlContainerClasses.value}>
          <Popover
            is-open={showPopover.value}
            trigger="manually"
            content={errorMessage.value}
            pop-type="error"
            position={popPosition.value}>
            {{
              reference: () => <div class={ns.e('control-content')}>{ctx.slots.default?.()}</div>,
            }}
          </Popover>
        </div>
        <div class={ns.e('control-info')}>
          {showMessage.value && <div class="error-message">{errorMessage.value}</div>}
          {props.extraInfo && <div class={ns.e('control-extra')}>{props.extraInfo}</div>}
        </div>
      </div>
    );
  },
});
