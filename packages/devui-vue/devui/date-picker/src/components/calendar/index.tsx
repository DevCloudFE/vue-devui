import { TProps } from '../types';
import CalendarDatePanel from '../panel';
import TimePicker from '../timepicker';

import './index.scss';

const Calendar = (props: TProps): JSX.Element => {
  const { showTime = false } = props;
  let { current } = props;
  if (!(current instanceof Date)) {
    current = new Date;
  }
  if (props.type === 'range') {
    let { next } = props;
    if (!(next instanceof Date)) {
      next = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    }
    return (
      <div class="devui-calendar-container">
        <CalendarDatePanel {...props} pos={0} current={current} compare={next} />
        { showTime ? <TimePicker time={current} /> : null }
        <CalendarDatePanel {...props} pos={1} current={next} compare={current} />
        { showTime ? <TimePicker time={next} /> : null }
      </div>
    );
  } else {
    return (
      <div class="devui-calendar-container">
        <CalendarDatePanel {...props} pos={0} current={current} />
        { showTime ? <TimePicker time={current} /> : null }
      </div>
    );
  }
};

export default Calendar;
