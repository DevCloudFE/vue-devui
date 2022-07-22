import { computed, toRefs, inject } from 'vue';
import { roundInjectionKey, animationInjectionKey } from '../skeleton-types';
import { SkeletonItemProps, UseSkeletonItem } from '../components/skeleton-item-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';

export function useSkeletonItem(props: SkeletonItemProps): UseSkeletonItem {
  const ns = useNamespace('skeleton-item');
  const { variant, size } = toRefs(props);
  const round = inject(roundInjectionKey, undefined);
  const showAnimation = inject(animationInjectionKey, undefined);

  const classes = computed(() => ({
    [ns.b()]: true,
    [ns.m(variant.value)]: true,
    [ns.m(size.value)]: variant.value !== 'square',
    [ns.m('round')]: variant.value !== 'circle' && Boolean(round?.value),
    [ns.m('animation')]: Boolean(showAnimation?.value),
  }));

  return { classes };
}
