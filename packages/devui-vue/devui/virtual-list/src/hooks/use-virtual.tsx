import type { ComputedRef } from 'vue';
import { computed } from 'vue';
import { VirtualListProps } from '../virtual-list-types';

interface IUseVirtual {
  isVirtual: ComputedRef<boolean>;
  inVirtual: ComputedRef<boolean>;
}

export default function useVirtual(props: VirtualListProps): IUseVirtual {
  const isVirtual = computed(() => {
    const { height, virtual } = props;
    return !!(virtual !== false && height);
  });
  const inVirtual = computed(() => {
    const { height, data } = props;
    return isVirtual.value && data && 20 * data.length > height;
  });
  return { isVirtual, inVirtual };
}
