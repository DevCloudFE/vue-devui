import { onUnmounted, UnwrapRef , defineComponent, reactive, onMounted, ref } from 'vue';
import { invokeFunction, isIn } from './utils';
import { compareDateSort , parseDate } from './components/utils';
import { Input } from '../../input';
import { Icon } from '../../icon';

import {
  TState,
  handleCalendarSwitchState,
  formatValue,
  formatPlaceholder,
} from './helper';

import Calendar from './components/calendar';

import './date-picker.scss';

const formatRange = (state: UnwrapRef<TState>) => {
  const [start, end] = [state.start, state.end].sort((a, b) => a.getTime() - b.getTime());

  state.start = start;
  state.end = end;

  if (compareDateSort(start, end, 'm') !== 0) {
    state.current = start;
    state.next = end;
  } else {
    if (compareDateSort(start, state.current) < 0) {
      state.current = start;
    }
    if (compareDateSort(state.next, end) < 0) {
      state.next = end;
    }
  }
};

export default defineComponent({
  name: 'DDatepicker',
  props: {
    selectedDateChange: { type: Function },
    autoClose: { type: Boolean, default: false },
    range: { type: Boolean, default: false },
    showTime: { type: Boolean, default: false },
    format: { type: String, default: 'y/MM/dd' },
    rangeSpliter: { type: String, default: '-' },
    attachInputDom: { type: String },
    dateMin: { type: String },
    dateMax: { type: String },
  },
  setup(props) {

    const panel = ref<Node>(null);
    const input = ref<Node>(null);

    const current = parseDate(props.dateMin) || new Date();
    const next = new Date(current.getFullYear(), current.getMonth() + 1, 1);


    const state = reactive<TState>({
      show: false,
      value: '',
      placeholder: formatPlaceholder(props),
      current,
      next,
    });

    state.value = formatValue(state, props);
    state.placeholder = formatPlaceholder(props);

    const documentClick = (e: MouseEvent) => {
      e.stopPropagation();

      if(
        isIn(e.target as Node, panel.value)
        || isIn(e.target as Node, input.value)
      ) {
        return;
      }
      state.show = false;
    };

    onMounted(() => {
      document.addEventListener('click', documentClick);
    });

    onUnmounted(() => {
      document.removeEventListener('click', documentClick);
    });

    return () => {
      return (
        <div class="devui-datepicker-container">
          <div class="input-container" ref={input}>
            <Input
              ref={input}
              class="datepicker-input"
              modelValue={state.value}
              placeholder={state.placeholder}
              onFocus={() => state.show = true }
            />
            <Icon size="small" name="calendar" class="datepicker-input-icon" />
          </div>
          <div class="devui-datepicker-panel" ref={panel}>
            {state.show ? <Calendar
              type={props.range ? 'range' : 'select'}
              showTime={props.showTime}
              current={state.current}
              next={state.next}
              dateMin={parseDate(props.dateMin)}
              dateMax={parseDate(props.dateMax)}
              dateStart={state.start}
              dateEnd={state.end}
              dateHover={state.hover}
              onReset={(date: Date) => {
                state.end = state.hover = undefined;
                state.start = date;
              }}
              onChange={() => {
                state.value = formatValue(state, props);
                state.placeholder = formatPlaceholder(props);
                invokeFunction(props.selectedDateChange, state.value);
                if (props.autoClose) {
                  state.show = false;
                }
              }}
              onToday={(date: Date) => {
                state.current = date;
                state.start = date;
                state.value = formatValue(state, props);
                state.placeholder = formatPlaceholder(props);
                invokeFunction(props.selectedDateChange, state.value);
                if (props.autoClose) {
                  state.show = false;
                }
              }}
              onSelected={(date: Date) => {
                state.start = date;
                if (compareDateSort(state.current, date) !== 0) {
                  state.current = date;
                }
              }}
              onSelectStart={(date: Date) => state.start = date}
              onSelectEnd={(date: Date) => {
                state.end = date;
                formatRange(state);
              }}
              onSelecting={(date: Date) => state.hover = date}
              onPreviousYear={(date: Date, pos: number) => handleCalendarSwitchState(state, 0, pos, date)}
              onPreviousMonth={(date: Date, pos: number) => handleCalendarSwitchState(state, 1, pos, date)}
              onNextMonth={(date: Date, pos: number) => handleCalendarSwitchState(state, 2, pos, date)}
              onNextYear={(date: Date, pos: number) => handleCalendarSwitchState(state, 3, pos, date)}
            /> : null}
          </div>
        </div>
      );
    };
  }
});
