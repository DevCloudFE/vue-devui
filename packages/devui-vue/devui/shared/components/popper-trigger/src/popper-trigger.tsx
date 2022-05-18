import { cloneVNode, defineComponent, withDirectives, inject } from 'vue';
import type { SetupContext, Ref } from 'vue';
import { POPPER_TRIGGER_TOKEN } from './popper-trigger-types';
import { getFirstValidChild } from './use-popper-trigger';

export default defineComponent({
  name: 'DPopperTrigger',
  setup(_, ctx: SetupContext) {
    const { slots, attrs } = ctx;
    return () => {
      const defaultSlot = slots.default?.(attrs);
      const triggerRef = inject(POPPER_TRIGGER_TOKEN) as Ref<HTMLElement | null>;

      if (!defaultSlot) {
        return null;
      }

      const firstValidChild = getFirstValidChild(defaultSlot);

      if (!firstValidChild) {
        return null;
      }

      return withDirectives(cloneVNode(firstValidChild, attrs), [
        [
          {
            mounted(el) {
              triggerRef.value = el;
            },
            updated(el) {
              triggerRef.value = el;
            },
            unmounted() {
              triggerRef.value = null;
            },
          },
        ],
      ]);
    };
  },
});
