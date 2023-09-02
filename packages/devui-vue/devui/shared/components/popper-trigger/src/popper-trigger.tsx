import {  defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import { usePopperTrigger } from './use-popper-trigger';

export default defineComponent({
  name: 'DPopperTrigger',
  setup(_, ctx: SetupContext) {
    const { slots } = ctx;
    return () => {
      const defaultSlot = slots.default?.();
      if (!defaultSlot) {
        return null;
      }
      const {addDirectiveToFirstValidChild} = usePopperTrigger();
      addDirectiveToFirstValidChild(defaultSlot)

      return defaultSlot;
    };
  },
});
