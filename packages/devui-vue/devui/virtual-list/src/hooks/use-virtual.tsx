import type { ComputedRef } from 'vue';
import { computed } from 'vue';
import { VirtualListProps } from '../virtual-list-types';

interface IUseVirtual {
  isVirtual: ComputedRef<boolean>;
  inVirtual: ComputedRef<boolean>;
}

export default function useVirtual(props: VirtualListProps): IUseVirtual {
  const isVirtual = computed(() => {
    const { height, itemHeight, virtual } = props;
    return !!(virtual !== false && height && itemHeight);
  });
  const inVirtual = computed(() => {
    const { height, itemHeight, data } = props;
    return isVirtual.value && data && itemHeight * data.length > height;
  });
  return { isVirtual, inVirtual };
}
