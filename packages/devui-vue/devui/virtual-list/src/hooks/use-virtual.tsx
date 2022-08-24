import type { ComputedRef } from 'vue';
import { computed, toRefs } from 'vue';
import { VirtualListProps } from '../virtual-list-types';

interface IUseVirtual {
  isVirtual: ComputedRef<boolean>;
  inVirtual: ComputedRef<boolean>;
}

export default function useVirtual(props: VirtualListProps): IUseVirtual {
  const { height, data, itemHeight, virtual } = toRefs(props);
  const isVirtual = computed(() => {
    return Boolean(virtual.value !== false && height.value);
  });
  const inVirtual = computed(() => {
    return Boolean(isVirtual.value && data.value.length && itemHeight.value * data.value.length > height.value);
  });
  return { isVirtual, inVirtual };
}
