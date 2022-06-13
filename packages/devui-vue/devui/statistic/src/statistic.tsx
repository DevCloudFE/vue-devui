import { defineComponent, computed, ref, onMounted, watch, SetupContext } from 'vue';
import { statisticProps, StatisticProps } from './statistic-types';
import { analysisValueType } from './utils/separator';
import { Tween } from './utils/animation';
import type { toType } from './utils/animation';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './statistic.scss';

export default defineComponent({
  name: 'DStatistic',
  props: statisticProps,
  setup(props: StatisticProps, ctx: SetupContext) {
    const innerValue = ref(props.valueFrom ?? props.value);
    const tween = ref<Tween | null>(null);
    const ns = useNamespace('statistic');

    const animation = (
      from: number = props.valueFrom ?? 0,
      to: number = typeof props.value === 'number' ? props.value : Number(props.value)
    ) => {
      if (from !== to) {
        tween.value = new Tween({
          from: {
            value: from,
          },
          to: {
            value: to,
          },
          delay: 0,
          duration: props.animationDuration,
          easing: 'easeOutCubic',
          onUpdate: (keys: toType) => {
            innerValue.value = keys.value;
          },
          onFinish: () => {
            innerValue.value = to;
          },
        });
        tween.value.start();
      }
    };
    const statisticValue = computed(() => {
      return analysisValueType(innerValue.value, props.value, props.groupSeparator, props.precision);
    });
    onMounted(() => {
      if (props.animation && props.start) {
        animation();
      }
    });
    // 我们可以手动控制animation
    watch(
      () => props.start,
      (value) => {
        if (value && !tween.value) {
          animation();
        }
      }
    );
    return () => (
      <div class={ns.b()}>
        <div class={ns.e('title')}>{ctx.slots.title?.() || props.title}</div>
        <div class={ns.e('content')}>
          {props.prefix || ctx.slots.prefix?.() ? <span class={ns.e('prefix')}>{ctx.slots.prefix?.() || props.prefix}</span> : null}
          <span class={ns.e('value')}>{statisticValue.value}</span>
          {props.suffix || ctx.slots.suffix?.() ? <span class={ns.e('suffix')}>{ctx.slots.suffix?.() || props.suffix}</span> : null}
        </div>
        {props.extra || ctx.slots.extra?.() ? <div class={ns.e('extra')}> {ctx.slots.extra?.() || props.extra}</div> : null}
      </div>
    );
  },
});
