import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import Popover from '../../../../popover/src/popover';
import { HelpTipsIcon } from '../form-icons';
import { useNamespace } from '@devui/shared/utils';
import { useFormLabel } from './use-form-label';
import './form-label.scss';

export default defineComponent({
  name: 'DFormLabel',
  setup(_, ctx: SetupContext) {
    const ns = useNamespace('form');
    const { labelClasses, labelInnerClasses, tipsPopover } = useFormLabel();

    return () => (
      <span class={labelClasses.value}>
        <span class={labelInnerClasses.value}>{ctx.slots.default?.()}</span>
        {tipsPopover.value.content && (
          <Popover class={ns.e('label-tips-popover')} {...tipsPopover.value}>
            <HelpTipsIcon class={ns.e('label-help')} />,
          </Popover>
        )}
      </span>
    );
  },
});
