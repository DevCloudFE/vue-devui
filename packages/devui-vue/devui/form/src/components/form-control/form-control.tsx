import { defineComponent, ref } from 'vue';
import type { SetupContext } from 'vue';
import { uniqueId } from 'lodash';
import { formControlProps, FormControlProps } from './form-control-types';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import { useFormControl, useFormControlValidate } from './use-form-control';
import './form-control.scss';

export default defineComponent({
  name: 'DFormControl',
  props: formControlProps,
  setup(props: FormControlProps, ctx: SetupContext) {
    const formControl = ref();
    const uid = uniqueId('dfc-');
    const ns = useNamespace('form');
    const { controlClasses, controlContainerClasses } = useFormControl(props);
    const { errorMessage } = useFormControlValidate();

    return () => (
      <div class={controlClasses.value} ref={formControl} data-uid={uid}>
        <div class={controlContainerClasses.value}>
          <div class={ns.e('control-content')} id={uid}>
            {ctx.slots.default?.()}
          </div>
        </div>
        <div class={ns.e('control-info')}>
          {errorMessage.value && <div class="error-message">{errorMessage.value}</div>}
          {props.extraInfo && <div class={ns.e('control-extra')}>{props.extraInfo}</div>}
        </div>
      </div>
    );
  },
});
