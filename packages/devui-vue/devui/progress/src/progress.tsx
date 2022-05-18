import { CSSProperties, defineComponent, effect, reactive, ref, toRefs, watch } from 'vue';
import { middleNum } from '../../shared/utils';
import { ProgressProps, progressProps, ISvgData } from './progress-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './progress.scss';

export default defineComponent({
  name: 'DProgress',
  props: progressProps,
  setup(props: ProgressProps) {
    const {
      height,
      percentage,
      percentageText,
      percentageTextPlacement,
      percentageTextColor,
      barBgColor,
      isCircle,
      strokeWidth,
      showContent,
    } = toRefs(props);

    const normalPercentage = ref(0);

    effect(() => {
      normalPercentage.value = middleNum(percentage.value);
    });

    const data: ISvgData = reactive({
      pathString: '',
      trailPath: null,
      strokePath: null,
    });

    const setCircleProgress = () => {
      if (!isCircle) {
        return;
      }

      const radius = 50 - strokeWidth.value / 2;
      const beginPositionY = -radius;
      const endPositionY = radius * -2;

      data.pathString = `M 50,50 m 0,${beginPositionY}
      a ${radius},${radius} 0 1 1 0,${-endPositionY}
      a ${radius},${radius} 0 1 1 0,${endPositionY}`;

      const len = Math.PI * 2 * radius;

      data.trailPath = {
        stroke: 'var(--devui-dividing-line, #dfe1e6)',
        strokeDasharray: `${len}px ${len}px`,
        strokeDashoffset: `0`,
        transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s',
      };

      data.strokePath = {
        stroke: barBgColor || null,
        strokeDasharray: `${(normalPercentage.value / 100) * len}px ${len}px`,
        strokeDashoffset: `0`,
        transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s',
      };
    };

    setCircleProgress();

    watch(
      [
        height,
        normalPercentage,
        percentageText,
        percentageTextPlacement,
        percentageTextColor,
        barBgColor,
        isCircle,
        strokeWidth,
        showContent,
      ],
      () => {
        setCircleProgress();
      }
    );

    return {
      data,
      normalPercentage,
    };
  },
  render() {
    const {
      height,
      normalPercentage,
      percentageText,
      percentageTextPlacement,
      percentageTextColor,
      barBgColor,
      isCircle,
      strokeWidth,
      showContent,
      data,
      $slots,
    } = this;
    const ns = useNamespace('progress');

    const isOutside = percentageTextPlacement === 'outside';
    const isInsideBg = percentageTextPlacement === 'insideBg';

    const createPercentageText = () => {
      return (
        <span
          style={{
            lineHeight: height,
            color: percentageTextColor,
          }}>
          {percentageText}
        </span>
      );
    };

    const progressLine = (
      <div class={ns.e('content')}>
        <div
          class={ns.e('line')}
          style={{
            height: height,
            borderRadius: height,
          }}>
          <div
            class={[ns.e('bar'), percentageTextPlacement]}
            style={{
              height: height,
              borderRadius: height,
              width: `${normalPercentage}%`,
              backgroundColor: barBgColor,
            }}>
            {!isOutside && !isInsideBg ? createPercentageText() : null}
          </div>
          {isInsideBg ? createPercentageText() : null}
        </div>
        {isOutside && !!percentageText ? createPercentageText() : null}
      </div>
    );

    const textElement = (
      <span class={ns.e('circle-text')} style={{ color: percentageTextColor }}>
        {normalPercentage}%
      </span>
    );

    const progressCircle = (
      <div class={ns.e('circle')}>
        <svg class={ns.e('circle')} viewBox="0 0 100 100">
          <path fill-opacity="0" stroke-width={strokeWidth} style={data.trailPath as CSSProperties} d={data.pathString} />
          <path
            d={data.pathString}
            stroke-linecap="round"
            fill-opacity="0"
            stroke={barBgColor}
            stroke-width={normalPercentage ? strokeWidth : 0}
            style={data.strokePath as CSSProperties}
          />
        </svg>
        {showContent && $slots.default?.()}
        {showContent && !$slots.default && textElement}
      </div>
    );

    return <div class={ns.b()}>{!isCircle ? progressLine : progressCircle}</div>;
  },
});
