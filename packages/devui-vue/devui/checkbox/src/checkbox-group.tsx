import { defineComponent, ExtractPropTypes, provide, toRef } from 'vue';
import { checkboxGroupProps, checkboxGroupInjectionKey } from './use-checkbox';
import DCheckbox from './checkbox';
import './checkbox-group.scss';

export default defineComponent({
  name: 'DCheckboxGroup',
  props: checkboxGroupProps,
  emits: ['change', 'update:modelValue'],
  setup(props: ExtractPropTypes<typeof checkboxGroupProps>, ctx) {
    const valList = toRef(props, 'modelValue');

    const defaultOpt = {
      checked: false,
      isShowTitle: true,
      halfchecked: false,
      showAnimation: true,
      disabled: false,
    };
    const toggleGroupVal = (val: string) => {
      let index = -1;
      if (typeof valList.value[0] === 'string') {
        index = valList.value.findIndex((item) => item === val);
      } else if (typeof valList.value[0] === 'object') {
        index = valList.value.findIndex((item) => item.value === val);
      }

      if (index === -1) {
        if (typeof props.options[0] === 'object') {
          const newOne = props.options.find((item) => item.value === val);
          const res = [...valList.value, newOne];
          ctx.emit('update:modelValue', res);
          ctx.emit('change', res);
          return;
        }
        const res = [...valList.value, val];
        ctx.emit('update:modelValue', res);
        ctx.emit('change', res);
        return;
      }
      valList.value.splice(index, 1);
      ctx.emit('update:modelValue', valList.value);
      ctx.emit('change', valList.value);
    };
    const isItemChecked = (itemVal: string) => {
      if (typeof valList.value[0] === 'string') {
        return valList.value.includes(itemVal);
      } else if (typeof valList.value[0] === 'object') {
        return valList.value.some((item) => item.value === itemVal);
      }
    };

    provide(checkboxGroupInjectionKey, {
      disabled: toRef(props, 'disabled'),
      isShowTitle: toRef(props, 'isShowTitle'),
      color: toRef(props, 'color'),
      showAnimation: toRef(props, 'showAnimation'),
      beforeChange: props.beforeChange,
      isItemChecked,
      toggleGroupVal,
      itemWidth: toRef(props, 'itemWidth'),
      direction: toRef(props, 'direction'),
    });

    return {
      defaultOpt,
    };
  },
  render() {
    const { direction, $slots, defaultOpt, options } = this;
    let children = $slots.default?.();

    if (options?.length > 0) {
      children = options.map((opt) => {
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

    return (
      <div class="devui-checkbox-group">
        <div class={{ 'devui-checkbox-list-inline': direction === 'row' }}>
          {children}
        </div>
      </div>
    );
  },
});
