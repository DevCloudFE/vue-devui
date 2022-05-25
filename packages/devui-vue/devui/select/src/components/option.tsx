import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import useOption from '../composables/use-option';
import { optionProps, OptionProps } from '../select-types';
export default defineComponent({
  name: 'DOption',
  props: optionProps,
  setup(props: OptionProps, ctx: SetupContext) {
    const { currentName, selectOptionCls, isVisible, optionSelect } = useOption(props);
    return () => {
      return (
        <li
          v-show={isVisible.value}
          onClick={(e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            optionSelect();
          }}
          class={selectOptionCls.value}>
          {ctx.slots?.default ? ctx.slots.default() : currentName.value}
        </li>
      );
    };
  },
});
