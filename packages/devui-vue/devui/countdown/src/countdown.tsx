import { defineComponent, ref, onUnmounted } from 'vue'
import { countdownProps, CountdownProps, DateFormat } from './countdown-types'
import './countdown.scss'

export default defineComponent({
  name: 'DCountdown',
  props: countdownProps,
  emits: ['onChange', 'onFinish'],
  setup(props: CountdownProps, ctx) {
    const fomatMap = new Map([['Y', 12], ['M', 30], ['D', 24], ['H', 60], ['m', 60], ['s', 1000], ['S', 1]])
    const timeInitialValue = new Map([['Y', 0], ['M', 0], ['D', 0], ['H', 0], ['m', 0], ['s', 0], ['S', 0]]);
    const dateValue = new Map([['Y', 0], ['M', 0], ['D', 0], ['H', 0], ['m', 0], ['s', 0], ['S', 0]])
    const s = new Set([]);
    const timeFormat: { k: string; n: number; }[] = []
    const timeStr = ref('')

    const initFormat = () => {
      const { format } = props;
      const m = timeFormat;
      for (let i = 0; i < format.length; i++) {
        const k = format[i];
        if (m.length === 0 || m[m.length - 1].k !== k || !fomatMap.has(k)) {
          m.push({ k, n: 1 })
        } else {
          m[m.length - 1].n++
        }
        if (fomatMap.has(k)) {
          s.add(k)
        }
      }
    }
    const numFormat = (n: number, len: number) => {
      const maxNum = 10 ** len - 1;
      if (n >= maxNum) {
        return n;
      } else {
        const carryLen = len - n.toString().length;
        let str = ''
        for (let i = 0; i < carryLen; i++) {
          str += '0'
        }
        return str + n;
      }
    }
    const getTime = () => {
      const timediff = props.value - new Date().getTime();
      const leftTime = timediff > 0 ? timediff : 0
      const year = Math.floor(leftTime / (365 * 24 * 60 * 60 * 1000));
      const month = Math.floor(leftTime / (30 * 24 * 60 * 60 * 1000) % 12);
      const day = Math.floor(leftTime / (24 * 60 * 60 * 1000) % 30);
      const hour = Math.floor(leftTime / (60 * 60 * 1000) % 24);
      const minute = Math.floor(leftTime / (60 * 1000) % 60);
      const second = Math.floor(leftTime / 1000 % 60);
      const millsecond = leftTime % 1000;
      timeInitialValue.set('Y', year);
      timeInitialValue.set('M', month);
      timeInitialValue.set('D', day);
      timeInitialValue.set('H', hour);
      timeInitialValue.set('m', minute);
      timeInitialValue.set('s', second);
      timeInitialValue.set('S', millsecond);
      let storage = 0;
      for (const k of dateValue.keys()) {
        if (s.has(k)) {
          dateValue.set(k, timeInitialValue.get(k) + storage)
          storage = 0;
        } else {
          storage += timeInitialValue.get(k) * fomatMap.get(k);
        }
      }
      if(!s.has('S')) {
        dateValue.set('s', Math.round(leftTime / 1000 % 60))
      }

      const t = timeFormat.reduce((pre, cur) => {
        if (timeInitialValue.has(cur.k)) {
          return pre + numFormat(dateValue.get(cur.k), cur.n)
        }
        return pre + cur.k;
      }, '')
      timeStr.value = t;
      ctx.emit('onChange', {
        leftTime,
        timeInitialValue,
        dateValue
      });
      return leftTime;
    }
    initFormat();
    getTime();
    const countdown = setInterval(() => {
      const t = getTime();
      if (t === 0) {
        ctx.emit('onFinish');
        clearInterval(countdown)
      }
    }, s.has('S') ? 100 : 1000)

    
    onUnmounted(() => {
      clearInterval(countdown)
    })
    
    return () => {
      return (<div class="devui-countdown" style={props.valueStyle}>
        <span class="countdown-prefix">
          { props.prefix }
        </span>
        <span class="countdown-value">
          {timeStr.value}
        </span>
        <span class="countdown-suffix">
          { props.suffix }
        </span>
      </div>
      )
    }
  }
})
