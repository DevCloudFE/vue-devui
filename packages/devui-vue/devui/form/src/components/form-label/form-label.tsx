import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import { formLabelProps, FormLabelProps } from './form-label-types';
import Popover from '../../../../popover/src/popover';
import { HelpTipsIcon } from '../form-icons';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import { useFormLabel } from './use-form-label';
import './form-label.scss';

export default defineComponent({
  name: 'DFormLabel',
  props: formLabelProps,
  setup(props: FormLabelProps, ctx: SetupContext) {
    const ns = useNamespace('form');
    const { labelClasses, labelInnerClasses } = useFormLabel();

    return () => (
      <span class={labelClasses.value}>
        <span class={labelInnerClasses.value}>{ctx.slots.default?.()}</span>
        {props.helpTips && (
          <Popover content={props.helpTips} position={['top']} trigger={'hover'} pop-type={'info'}>
            <HelpTipsIcon class={ns.e('label-help')} />,
          </Popover>
        )}
      </span>
    );
  },
});
