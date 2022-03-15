import type { Slots, VNode } from 'vue';
export function getPropsSlot(
  slots: Slots,
  props: unknown,
  prop = 'default'
): VNode | string | undefined {
  return props[prop] ?? slots[prop]?.();
}
