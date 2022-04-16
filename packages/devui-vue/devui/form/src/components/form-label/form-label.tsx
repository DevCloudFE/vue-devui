import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import { formLabelProps, FormLabelProps } from './form-label-types';
import Icon from '../../../../icon/src/icon';
import Popover from '../../../../popover/src/popover';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import { useFormLabel } from './use-form-label';
import './form-label.scss';

export default defineComponent({
  name: 'DFormLabel',
  props: formLabelProps,
  setup(props: FormLabelProps, ctx: SetupContext) {
    const ns = useNamespace('form');
    const { labelClasses, labelInnerClasses } = useFormLabel(props);

    return () => (
      <span class={labelClasses.value}>
        <span class={labelInnerClasses.value}>
          {ctx.slots.default?.()}
          {props.hasHelp && props.helpTips && (
            <Popover
              content={props.helpTips}
              showAnimation={false}
              position={['top']}
              trigger={'hover'}
              v-slots={{
                reference: () => (
                  <span class={ns.e('label-help')}>
                    <Icon name="helping" color="#252b3a"></Icon>
                  </span>
                ),
              }}></Popover>
          )}
        </span>
      </span>
    );
  },
});
