import { computed, defineComponent, provide, toRefs } from 'vue';
import type { SetupContext } from 'vue';
import SkeletonItem from './components/skeleton-item';
import { skeletonProps, SkeletonProps, roundInjectionKey, animationInjectionKey } from './skeleton-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './skeleton.scss';

export default defineComponent({
  name: 'DSkeleton',
  props: skeletonProps,
  setup(props: SkeletonProps, ctx: SetupContext) {
    const ns = useNamespace('skeleton');
    const { loading, rows, showAnimation, round } = toRefs(props);
    const paragraphs = computed(() => new Array(rows.value).fill(''));
    provide(animationInjectionKey, showAnimation);
    provide(roundInjectionKey, round);

    return () =>
      loading.value ? (
        ctx.slots.placeholder ? (
          ctx.slots.placeholder()
        ) : (
          <div class={ns.b()}>
            <SkeletonItem class={ns.e('title')} />
            {paragraphs.value.map(() => (
              <SkeletonItem class={ns.e('paragraph')} />
            ))}
          </div>
        )
      ) : (
        ctx.slots.default?.()
      );
  },
});
