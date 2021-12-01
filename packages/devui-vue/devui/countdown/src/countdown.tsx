import { defineComponent, ref, onUnmounted } from 'vue'
import { countdownProps, CountdownProps } from './countdown-types'
import './countdown.scss'
import { getFormatTime, getLegalTime, getTimeSplit, getDeduplication, numFormat } from './utils'

export default defineComponent({
  name: 'DCountdown',
  props: countdownProps,
  emits: ['onChange', 'onFinish'],
  setup(props: CountdownProps, ctx) {
    const s = getDeduplication(props.format);
    const timeFormat = getTimeSplit(props.format);
    const timeStr = ref('')

    const getTimeStr = (legalTime: Map<string, number>) => {
      const fomatMap = new Set(['Y', 'M', 'D', 'H', 'm', 's', 'S']);
      const t = timeFormat.reduce((pre, cur) => {
        if (fomatMap.has(cur.k)) {
          return pre + numFormat(legalTime.get(cur.k), cur.n)
        }
        return pre + cur.k;
      }, '')
      timeStr.value = t; 
    }

    const getTime = () => {
      const value = new Date(props.value).getTime();
      const leftTime = value > new Date().getTime() ? value - new Date().getTime() : 0
      const formatTime = getFormatTime(leftTime);
      const legalTime = getLegalTime(s, formatTime);
      !ctx.slots.default && getTimeStr(legalTime);
      ctx.emit('onChange', {
        leftTime,
        formatTime,
        legalTime
      });
      return leftTime;
    }

    const countdown = setInterval(() => {
      const t = getTime();
      if (t === 0) {
        ctx.emit('onFinish');
        clearInterval(countdown)
      }
    }, s.has('S') ? 100 : 1000)

    getTime();
    onUnmounted(() => {
      clearInterval(countdown);
    })

    return () => {
      return (<div class="devui-countdown">
        {
          ctx.slots.default ? ctx.slots.default() : (
            <div class="countdown-content" style={props.valueStyle}>
              <span class="countdown-prefix">
                {props.prefix}
              </span>
              <span class="countdown-value">
                {timeStr.value}
              </span>
              <span class="countdown-suffix">
                {props.suffix}
              </span>
            </div>
          )
        }
      </div>
      )
    }
  }
})
