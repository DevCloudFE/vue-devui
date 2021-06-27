import { defineComponent, provide, toRef, ExtractPropTypes } from 'vue';
import { radioGroupProps } from './use-radio';
import { radioGroupInjectionKey } from './use-radio';
import './radio-group.scss';

export default defineComponent({
  name: 'DRadioGroup',
  props: radioGroupProps,
  emits: ['change', 'update:value'],
  setup (props: ExtractPropTypes<typeof radioGroupProps>, ctx) {
    const { emit } = ctx;
    const doChange = (radioValue: string) => {
      emit('update:value', radioValue);
      emit('change', radioValue);
    };
    provide(radioGroupInjectionKey, {
      value: toRef(props, 'value'),
      name: toRef(props, 'name'),
      beforeChange: props.beforeChange,
      doChange
    });
  },
  render () {
    const {
      cssStyle
    } = this;
    return (
      <div class="devui-radio-group">
        <div class={cssStyle === 'column' ? '' : 'devui-radio-horizontal'}>
          {this.$slots.default?.()}
        </div>
      </div>
    );
  }
});
