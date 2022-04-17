import { defineComponent, computed, ref, onMounted, watch } from 'vue';
import { statisticProps, StatisticProps } from './statistic-types';
import { analysisValueType } from './utils/separator';
import { Tween } from './utils/animation';
import type { toType } from './utils/animation';
import './statistic.scss';

export default defineComponent({
  name: 'DStatistic',
  inheritAttrs: false,
  props: statisticProps,
  setup(props: StatisticProps, ctx) {
    const innerValue = ref(props.valueFrom ?? props.value);
    const tween = ref<Tween | null>(null);

    const animation = (
      from: number = props.valueFrom ?? 0,
      to: number = typeof props.value === 'number' ? props.value : Number(props.value)
    ) => {
      if (from !== to) {
        tween.value = new Tween({
          from: {
            value: from
          },
          to: {
            value: to
          },
          delay: 0,
          duration: props.animationDuration,
          easing: 'easeOutCubic',
          onUpdate: (keys: toType) => {
            innerValue.value = keys.value;
          },
          onFinish: () => {
            innerValue.value = to;
          }
        });
        tween.value.start();
      }
    };
    const statisticValue = computed(() => {
      return analysisValueType(
        innerValue.value,
        props.value,
        props.groupSeparator,
        props.precision
      );
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
    return () => {
      return (
        <div class='devui-statistic' {...ctx.attrs}>
          <div class='devui-statistic-title' style={props.titleStyle}>
            {ctx.slots.title?.() || props.title}
          </div>
          <div class='devui-statistic-content' style={props.valueStyle}>
            {props.prefix || ctx.slots.prefix?.() ? (
              <span class='devui-statistic-prefix'>{ctx.slots.prefix?.() || props.prefix}</span>
            ) : null}
            <span class='devui-statistic--value'>{statisticValue.value}</span>
            {props.suffix || ctx.slots.suffix?.() ? (
              <span class='devui-statistic-suffix'>{ctx.slots.suffix?.() || props.suffix}</span>
            ) : null}
          </div>
          {props.extra || ctx.slots.extra?.() ? (
            <div class='devui-statistic-extra'> {ctx.slots.extra?.() || props.extra}</div>
          ) : null}
        </div>
      );
    };
  }
});
