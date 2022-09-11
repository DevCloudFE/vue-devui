import { defineComponent, withModifiers } from 'vue';
import type { SetupContext } from 'vue';
import useOption from '../composables/use-option';
import { optionProps, OptionProps } from '../select-types';
export default defineComponent({
  name: 'DOption',
  props: optionProps,
  setup(props: OptionProps, ctx: SetupContext) {
    const { currentName, selectOptionCls, isVisible, optionSelect } = useOption(props);
    return () => (
      <li v-show={isVisible.value} onClick={withModifiers(optionSelect, ['prevent', 'stop'])} class={selectOptionCls.value}>
        {ctx.slots?.default ? ctx.slots.default() : currentName.value}
      </li>
    );
  },
});
