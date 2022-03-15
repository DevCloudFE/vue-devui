import { compareDate, invokeCallback } from '../utils';
import { Year, Month } from './svg-icon';
import { TCalendarToolbarItemProps, TDateToolbarProps } from '../types';
import './index.scss';

const Item = (props: TCalendarToolbarItemProps) => {
  const {
    button: Btn,
    disabled = false,
    rotate = 0,
    date,
    pos,
  } = props;
  const color = disabled ? '#cfd0d3' : '#585d6b';
  const className = `${disabled ? 'disabled' : ''}`;
  const handleClick = disabled ? undefined : () => invokeCallback(props.cb, date, pos);
  return (
    <a class={className} onClick={handleClick}>
      <Btn color={color} rotate={rotate} />
    </a>
  );
};

export const Title = (props: { date: Date }) => {
  const { date } = props;
  return (
    <a class="title">{
      `${date.getFullYear()}年${(date.getMonth() + 1 + '').padStart(2, '0')}月`
    }</a>
  );
};

const CalendarToolbar = (props: TDateToolbarProps) => {
  const {
    type, current, compare, pos,
    dateMax, dateMin,
    onPreviousYear,
    onPreviousMonth,
    onNextMonth,
    onNextYear,
  } = props;

  const dis = [false, false, false, false];

  if (type === 'range') {
    if (pos === 1) {
      dis[0] = !compareDate(compare, current, 'year', 1);
      dis[1] = !compareDate(compare, current, 'month', 1);
      dis[2] = !compareDate(current, dateMax, 'month', 0);
      dis[3] = !compareDate(current, dateMax, 'year', 0);
    } else {
      dis[0] = !compareDate(dateMin, current, 'year', 0);
      dis[1] = !compareDate(dateMin, current, 'month', 0);
      dis[2] = !compareDate(current, compare, 'month', 1);
      dis[3] = !compareDate(current, compare, 'year', 1);
    }
  } else {
    dis[0] = !compareDate(dateMin, current, 'year', 0);
    dis[1] = !compareDate(dateMin, current, 'month', 0);
    dis[2] = !compareDate(current, dateMax, 'month', 0);
    dis[3] = !compareDate(current, dateMax, 'year', 0);
  }

  return (
    <div class="devui-calendar-toolbar">
      <Item disabled={dis[0]} date={current} pos={pos} button={Year} cb={onPreviousYear} />
      <Item disabled={dis[1]} date={current} pos={pos} button={Month} rotate={-90} cb={onPreviousMonth} />
      <Title date={current} />
      <Item disabled={dis[2]} date={current} pos={pos} button={Month} rotate={90} cb={onNextMonth} />
      <Item disabled={dis[3]} date={current} pos={pos} button={Year} rotate={180} cb={onNextYear} />
    </div>
  );
};

export default CalendarToolbar;
