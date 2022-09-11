import { defineComponent, SetupContext } from 'vue';
import { checkboxGroupProps, CheckboxGroupProps } from './checkbox-types';
import DCheckbox from './checkbox';
import './checkbox-group.scss';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { useCheckboxGroup } from './use-checkbox';

export default defineComponent({
  name: 'DCheckboxGroup',
  props: checkboxGroupProps,
  emits: ['change', 'update:modelValue'],
  setup(props: CheckboxGroupProps, ctx: SetupContext) {
    const ns = useNamespace('checkbox');
    const { defaultOpt } = useCheckboxGroup(props, ctx);

    return () => {
      let children = ctx.slots.default?.();
      const getContent = () => {
        if (children) {
          return children;
        } else {
          if (props.options?.length > 0) {
            children = props.options.map((opt) => {
              let mergedOpt = null;
              if (typeof opt === 'string') {
                mergedOpt = Object.assign({}, defaultOpt, {
                  label: opt,
                  value: opt,
                });
              } else if (typeof opt === 'object') {
                mergedOpt = Object.assign({}, defaultOpt, {
                  ...opt,
                  label: opt.name,
                });
              }

              return <DCheckbox {...mergedOpt}></DCheckbox>;
            });
          }
          return children;
        }
      };


      return (
        <div
          class={[
            ns.e('group'),
            {
              'is-row': props.direction === 'row',
              'is-column': props.direction === 'column',
            },
          ]}
        >
          {getContent()}
        </div>
      );
    };
  },
});
