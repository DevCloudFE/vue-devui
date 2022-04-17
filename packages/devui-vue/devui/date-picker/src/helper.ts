import type { Ref } from 'vue';
import { formatDate, formatRange } from './utils';

export type TState = {
  range?: boolean;
  current?: Date;
  next?: Date;
  start?: Date;
  end?: Date;
  hover?: Date;
  show?: boolean;
  input?: string;
  value?: string;
  placeholder?: string;
};

/**
 * Calendar 面板年月切换逻辑
 * @param state
 * @param index
 * @param pos
 * @param date
 */
export const handleCalendarSwitchState = (state: TState, index: number, pos: number, date: Date) => {
  switch (index) {
  case 0: // previous year
    const preYear = new Date(date);
    preYear.setFullYear(preYear.getFullYear() - 1);
    pos === 0 ? (state.current = preYear) : (state.next = preYear);
    break;
  case 1: // previous month
    const preMonth = new Date(date);
    preMonth.setMonth(preMonth.getMonth() - 1);
    pos === 0 ? (state.current = preMonth) : (state.next = preMonth);
    break;
  case 2: // next month
    const nextMonth = new Date(date);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    pos === 0 ? (state.current = nextMonth) : (state.next = nextMonth);
    break;
  case 3: // next year
    const nextYear = new Date(date);
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    pos === 0 ? (state.current = nextYear) : (state.next = nextYear);
    break;
  }
};

/**
 * 格式化输入日期字符串
 * @param state
 * @param props
 * @returns
 */
export const formatValue = (state: TState, props: any) => {
  const { format = 'y/MM/dd', range, rangeSpliter = '-' } = props || {};
  if (range) {
    if (!state.start) {
      return '';
    } else if(!state.end) {
      return formatDate(format, state.start);
    }
    if(state.end < state.start) {
      const end = state.end;
      state.end = state.start;
      state.start = end;
    }
    return formatRange(format,
      state.start,
      state.end,
      rangeSpliter
    );
  } else {
    if (!state.start) {
      return '';
    }
    return formatDate(format, state.start);
  }
};

/**
 * 格式化placeholder显示
 * @param props
 * @returns
 */
export const formatPlaceholder = (props: any) => {
  if (!props) {return '';}
  const format = props.format || `y/MM/dd`;
  const sp = props.rangeSpliter || '-';
  return props.range ? `${format} ${sp} ${format}` : format;
};

/**
 * 输出日期选择结果
 * @param id
 * @param output
 */
export const handleValue = (id: string | undefined, output: string) => {
  if (id && typeof id === 'string') {
    const el = document.querySelector(id);
    if (el instanceof HTMLInputElement) {
      el.value = output;
    }
  }
};

/**
 * 获取绑定节点
 * @returns
 */
export const getAttachInputDom = (props: any) => {
  const { attach, attachInputDom = attach } = props || {};
  if (!attachInputDom || typeof attachInputDom !== 'string') {
    return null;
  }
  const el = document.querySelector(attachInputDom);
  if (!el) {
    return null;
  }
  return el;
};

/**
 * 绑定弹出层场景，计算弹出层位置。
 * @param state
 * @param props
 * @param container
 * @returns
 */
export const handlePositionFactory = (state: {
  x?: string;
  y?: string;
  attachInputDom?: string;
  show?: boolean;
  st?: boolean;
}, props: any, container: Ref<Element>) => () => {
  if (!state.show) {
    state.x = `-100%`;
    state.y = `-100%`;
    return;
  }
  const el = getAttachInputDom(props);
  if (!el) {
    state.st = true;
    return;
  }
  const { left, top, height } = el.getBoundingClientRect();
  const { height: _height } = container.value.getBoundingClientRect();
  const bottom = window.innerHeight - top - height;
  state.x = `${left}px`;
  if (bottom > top) {
    state.y = `${top + height}px`;
  } else {
    state.y = `${top - _height}px`;
  }
};
