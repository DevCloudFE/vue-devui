export const getFormatTime = (leftTime: number): Map<string, number> => {
  const timeformat = new Map([
    ['Y', 0],
    ['M', 0],
    ['D', 0],
    ['H', 0],
    ['m', 0],
    ['s', 0],
    ['S', 0],
  ]);
  const year = Math.floor(leftTime / (365 * 24 * 60 * 60 * 1000));
  const month = Math.floor((leftTime / (30 * 24 * 60 * 60 * 1000)) % 12);
  const day = Math.floor((leftTime / (24 * 60 * 60 * 1000)) % 30);
  const hour = Math.floor((leftTime / (60 * 60 * 1000)) % 24);
  const minute = Math.floor((leftTime / (60 * 1000)) % 60);
  const second = Math.floor((leftTime / 1000) % 60);
  const millsecond = leftTime % 1000;
  timeformat.set('Y', year);
  timeformat.set('M', month);
  timeformat.set('D', day);
  timeformat.set('H', hour);
  timeformat.set('m', minute);
  timeformat.set('s', second);
  timeformat.set('S', millsecond);
  return timeformat;
};

export const getLegalTime = (s: Set<string>, timeformat: Map<string, number>): Map<string, number> => {
  const dateValue = new Map([
    ['Y', 0],
    ['M', 0],
    ['D', 0],
    ['H', 0],
    ['m', 0],
    ['s', 0],
    ['S', 0],
  ]);
  const m = new Map([
    ['Y', 12],
    ['M', 30],
    ['D', 24],
    ['H', 60],
    ['m', 60],
    ['s', 1000],
    ['S', 1],
  ]);
  let storage = 0;
  for (const k of dateValue.keys()) {
    if (s.has(k)) {
      dateValue.set(k, (timeformat.get(k) || 0) + storage);
      storage = 0;
    } else {
      storage += (timeformat.get(k) || 0) * (m.get(k) || 0);
    }
  }
  if (!s.has('S') && (timeformat.get('S') || 0) > 500) {
    dateValue.set('s', (dateValue.get('s') || 0) + 1);
  }
  return dateValue;
};

interface ITimeSplit {
  k: string;
  n: number;
}
export const getTimeSplit = (format: string): ITimeSplit[] => {
  const fomatMap = new Set(['Y', 'M', 'D', 'H', 'm', 's', 'S']);
  const m: ITimeSplit[] = [];
  for (let i = 0; i < format.length; i++) {
    const k = format[i];
    if (m.length === 0 || m[m.length - 1].k !== k || !fomatMap.has(k)) {
      m.push({ k, n: 1 });
    } else {
      m[m.length - 1].n++;
    }
  }
  return m;
};
export const getDeduplication = (format: string): Set<string> => {
  const fomatMap = new Set(['Y', 'M', 'D', 'H', 'm', 's', 'S']);
  const s: Set<string> = new Set();
  for (let i = 0; i < format.length; i++) {
    const k = format[i];
    if (fomatMap.has(k)) {
      s.add(k);
    }
  }
  return s;
};

export const numFormat = (n: number, len: number): number | string => {
  const maxNum = 10 ** len - 1;
  if (n >= maxNum) {
    return n;
  } else {
    const carryLen = len - n.toString().length;
    let str = '';
    for (let i = 0; i < carryLen; i++) {
      str += '0';
    }
    return str + n;
  }
};

export const intervalTimer = (callback: () => void, interval = 0): () => void => {
  let counter = 1;
  let timeoutId: NodeJS.Timeout;
  const startTime = Date.now();

  function main() {
    const nowTime = Date.now();
    const nextTime = startTime + counter * interval;
    timeoutId = setTimeout(main, interval - (nowTime - nextTime));

    counter += 1;
    callback();
  }

  timeoutId = setTimeout(main, interval);

  return () => {
    clearTimeout(timeoutId);
  };
};
