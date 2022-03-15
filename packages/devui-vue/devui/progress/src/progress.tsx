import {
  defineComponent,
  reactive,
  toRefs,
  watch,
} from 'vue';

import './progress.scss';

interface data {
  pathString: string;
  trailPath: any;
  strokePath: any;
}

export default defineComponent({
  name: 'DProgress',
  props: {
    height: {
      type: String,
      default: '20px',
    },
    percentage: {
      type: Number,
      default: 0,
    },
    percentageText: {
      type: String,
      default: '',
    },
    barBgColor: {
      type: String,
      default: '#5170ff',
    },
    isCircle: {
      type: Boolean,
      default: false,
    },
    strokeWidth: {
      type: Number,
      default: 6,
    },
    showContent: {
      type: Boolean,
      default: true,
    }
  },
  setup(props) {
    const {
      height,
      percentage,
      percentageText,
      barBgColor,
      isCircle,
      strokeWidth,
      showContent,
    } = toRefs(props);

    const data: data = reactive({
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
        stroke: '#dfe1e6',
        strokeDasharray: `${len}px ${len}px`,
        strokeDashoffset: `0`,
        transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
      };

      data.strokePath = {
        stroke: barBgColor || null,
        strokeDasharray: `${(percentage.value / 100) * len }px ${len}px`,
        strokeDashoffset: `0`,
        transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s'
      };
    };

    setCircleProgress();

    watch([height, percentage, percentageText, barBgColor, isCircle, strokeWidth, showContent], () => {
      setCircleProgress();
    });

    return {
      data,
    };
  },
  render() {
    const {
      height,
      percentage,
      percentageText,
      barBgColor,
      isCircle,
      strokeWidth,
      showContent,
      data,
      $slots,
    } = this;

    const progressLine = (
      <div
        class="devui-progress--line"
        style={{
          height: height,
          borderRadius: height,
        }}
      >
        <div
          class="devui-progress-bar"
          style={{
            height: height,
            borderRadius: height,
            width: `${percentage}%`,
            backgroundColor: barBgColor,
          }}
        />
        <span
          style={{
            lineHeight: height,
          }}
        >
          {percentageText}
        </span>
      </div>
    );

    const textElement = (
      <span class="devui-progress-circle-text">{percentage}%</span>
    );

    const progressCircle = (
      <div class="devui-progress-circle">
        <svg class="devui-progress-circle" viewBox="0 0 100 100">
          <path
            class="devui-progress-circle-trail"
            fill-opacity="0"
            stroke-width={strokeWidth}
            style={data.trailPath}
            d={data.pathString}
          />
          <path
            class="devui-progress-circle-path"
            d={data.pathString}
            stroke-linecap="round"
            fill-opacity="0"
            stroke={barBgColor}
            stroke-width={percentage ? strokeWidth : 0}
            style={data.strokePath}
          />
        </svg>
        {showContent && $slots.default?.()}
        {showContent && !$slots.default && textElement}
      </div>
    );

    return (
      <div class="devui-progress">
        {!isCircle ? progressLine : progressCircle}
      </div>
    );
  }
});
