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
      const index = valList.value.findIndex((item) => item === val);
      if (index === -1) {
        const res = [...valList.value, val];
        ctx.emit('update:modelValue', res);
        ctx.emit('change', res);
        return;
      }
      valList.value.splice(index, 1);
      ctx.emit('update:modelValue', valList.value);
      ctx.emit('change', valList.value);
    };
    const isItemChecked = (itemVal: string) => valList.value.includes(itemVal);

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
        const mergedOpt = Object.assign({}, defaultOpt, opt);
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
