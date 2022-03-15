import { defineComponent, reactive } from 'vue';
import VerticalSliderFunction from '../vertical-slider';

import './index.scss';

const TimePicker = defineComponent({
  props: {
    time: { type: Date }
  },
  setup(props) {

    const { time = new Date() } = props || {};
    const state = reactive({
      hour: time.getHours(),
      minute: time.getMinutes(),
      second: time.getSeconds()
    });

    const hours = Array(24).fill(0).map((_, i) => `${i}`.padStart(2, '0'));
    const minutes = Array(60).fill(0).map((_, i) => `${i}`.padStart(2, '0'));

    return () => {
      return (
        <div class="devui-calendar-timepicker">
          <div class="head">
            <div class="chars">
              {/* <span>{`:`}</span>
              <span>{`:`}</span> */}
              <span>
                {state.hour.toString().padStart(2, '0')}:
                {state.minute.toString().padStart(2, '0')}:
                {state.second.toString().padStart(2, '0')}
              </span>
            </div>
          </div>
          <div class="select">
            <VerticalSliderFunction
              items={hours}
              selectedIndex={state.hour}
              onChange={(_: any, idx: number) => state.hour = idx}
            />
            <VerticalSliderFunction
              items={minutes}
              selectedIndex={state.minute}
              onChange={(_: any, idx: number) => state.minute = idx}
            />
            <VerticalSliderFunction
              items={minutes}
              selectedIndex={state.second}
              onChange={(_: any, idx: number) => state.second = idx}
            />
          </div>
        </div>
      );
    };
  }
});

export default TimePicker;
