import { defineComponent, provide, toRef, ExtractPropTypes } from 'vue';
import DRadio from './radio';
import { radioGroupProps, radioGroupInjectionKey } from './radio-types';
import './radio-group.scss';

export default defineComponent({
  name: 'DRadioGroup',
  props: radioGroupProps,
  emits: ['change', 'update:modelValue'],
  setup(props: ExtractPropTypes<typeof radioGroupProps>, { emit }) {
    /** change 事件 */
    const emitChange = (radioValue: string) => {
      emit('update:modelValue', radioValue);
      emit('change', radioValue);
    };

    // 注入给子组件
    provide(radioGroupInjectionKey, {
      modelValue: toRef(props, 'modelValue'),
      name: toRef(props, 'name'),
      disabled: toRef(props, 'disabled'),
      beforeChange: props.beforeChange,
      emitChange
    });
  },
  render() {
    const { values, direction } = this;
    /** 获取展示内容 */
    const getContent = () => {
      const defaultSlot = this.$slots.default;
      // 有默认插槽则使用默认插槽
      if (defaultSlot) {
        return defaultSlot();
      }
      // 有数据列表则使用数据列表
      else if (Array.isArray(values)) {
        return values.map((item) => {
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
          'devui-radio-group',
          {
            'is-row': direction === 'row',
            'is-column': direction === 'column'
          }
        ]}
      >
        {getContent()}
      </div>
    );
  }
});
