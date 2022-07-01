const getDateTime = (d: Date) => {
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const day = d.getDay();
  const hour = d.getHours();
  const minute = d.getMinutes();
  const second = d.getSeconds();
  const ms = d.getMilliseconds();
  return [year, month, date, day, hour, minute, second, ms];
};

const fixStart = (n: number, m: string, max = 2, ch = '0') => {
  return (n + '').padStart(Math.min(m.length, max), ch);
};

/**
 * - y: year yy 取后2位，其他情况取4位
 * - M: month 最多取2位补0
 * @param fmt
 * @param d
 */
export const formatDate = (fmt: string, d: Date): string => {
  const usage = getDateTime(d);
  let res = fmt;
  res = res.replace(/y+/g, m => {
    const year = usage[0] + '';
    if (m.length === 2) {
      return year.substring(2);
    }
    return year;
  });
  res = res.replace(/M+/g, m => fixStart(usage[1], m));
  res = res.replace(/d+/g, m => fixStart(usage[2], m));
  res = res.replace(/h+/g, m => fixStart(usage[4], m));
  res = res.replace(/m+/g, m => fixStart(usage[5], m));
  res = res.replace(/s+/g, m => fixStart(usage[6], m));
  return res;
};

export const formatRange = (fmt: string, a: Date, b: Date, conn = '-'): string => {
  const ab = [a, b];
  if(a.getTime() > b.getTime()) {
    ab.reverse();
  }
  return `${formatDate(fmt, ab[0])} ${conn} ${formatDate(fmt, ab[1])}`;
};

/**
 * 判断节点a是否在节点b中
 * @param a
 * @param b
 * @returns
 */
export const isIn = (a: Node | null, b: Node | null): boolean => {
  if (!b) {
    return false;
  }
  while (a) {
    if (a === b) {
      return true;
    }
    a = a.parentNode;
  }
  return false;
};

type EventItem = { el: Node | Window; cb: EventListenerOrEventListenerObject; name: string; capture: boolean };
export class EventManager {
  private readonly items: EventItem[];
  constructor() {
    this.items = [];
  }

  append(el: Node | Window, name: string, cb: EventListenerOrEventListenerObject, capture = false): void {
    el.addEventListener(name, cb, capture);
    this.items.push({ el, name, cb, capture });
  }

  dispose(): void {
    this.items.splice(0, this.items.length).forEach(({ el, name, cb, capture }) => {
      el.removeEventListener(name, cb, capture);
    });
  }
}

export const traceNode = (el: Node): Node[] => {
  const els: Node[] = [];
  while (el.parentNode) {
    els.push(el.parentNode);
    el = el.parentNode;
  }
  return els;
};

/**
 * 函数安全调用
 */
export const invokeFunction = <T>(fn?: (...args: T[]) => void, ...args: T[]): void => {
  if (typeof fn === 'function') {
    fn(...args);
  }
};

export const getMinDate = (a?: Date, b?: Date): Date | undefined => {
  if(a && b) {
    return a > b ? b : a;
  }
  return a || b || undefined;
};
