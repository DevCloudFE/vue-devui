import { defineComponent, SetupContext } from 'vue';
import DRadio from './radio';
import { radioGroupProps, RadioGroupProps } from './radio-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { useRadioGroup } from './use-radio';
import './radio-group.scss';

export default defineComponent({
  name: 'DRadioGroup',
  props: radioGroupProps,
  emits: ['change', 'update:modelValue'],
  setup(props: RadioGroupProps, ctx: SetupContext) {
    const ns = useNamespace('radio-group');
    useRadioGroup(props, ctx);
    return () => {
      const getContent = () => {
        const defaultSlot = ctx.slots.default;
        // 有默认插槽则使用默认插槽
        if (defaultSlot) {
          return defaultSlot();
        }
        // 有数据列表则使用数据列表
        else if (Array.isArray(props.values)) {
          return props.values.map((item) => {
            return (
              <DRadio key={item} value={item}>
                {item}
              </DRadio>
            );
          });
        }
        // 什么都没有则返回空
        else {
          return '';
        }
      };

      return (
        <div
          class={[
            ns.b(),
            {
              'is-row': props.direction === 'row',
              'is-column': props.direction === 'column',
            },
          ]}>
          {getContent()}
        </div>
      );
    };
  },
});
