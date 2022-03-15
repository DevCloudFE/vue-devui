import { computed } from 'vue';
import { ScreenSizes, ColPropsBaseClass, screenSizes, colPropsBaseClass } from './grid-types';

export const CLASS_PREFIX = 'devui-col';

export function formatClass (prefix: string, val: number | string | undefined) {
  return val !== undefined ? ` ${prefix}-${val}` : '';
}

export function useColClassNames (props: ColPropsBaseClass) {
  return computed<string>(() => {
    const spanClass = formatClass(`${CLASS_PREFIX}-span`, props.span);
    const offsetClass = formatClass(`${CLASS_PREFIX}-offset`, props.offset);
    const pullClass = formatClass(`${CLASS_PREFIX}-pull`, props.pull);
    const pushClass = formatClass(`${CLASS_PREFIX}-push`, props.push);
    return `${spanClass}${offsetClass}${pullClass}${pushClass}`;
  });
}

function setSpace (val: string) {
  return ` ${val.trim()}${val && ' '}`;
}

export function useSize (colSizes: ScreenSizes) {
  const keys = Object.keys(colSizes).filter(key => key in screenSizes) as (keyof ScreenSizes)[];
  return computed<string>(() => {
    return keys.reduce((total, key) => {
      const valueType = typeof colSizes[key];

      if (valueType === 'number') {
        total = `${setSpace(total)}${CLASS_PREFIX}-${key}-span-${colSizes[key]}`;
      } else if (valueType === 'object') {
        const colSizesKeys = Object.keys(colSizes[key]) as (keyof ColPropsBaseClass)[];
        const sum = colSizesKeys.filter(item => item in colPropsBaseClass).reduce((tot, k) => {
          if (typeof colSizes[key][k] !== 'number') {
            return '';
          } else {
            tot = `${setSpace(tot)}${CLASS_PREFIX}-${key}-${k}-${colSizes[key][k]}`;
          }
          return tot;
        }, '');
        total = `${setSpace(total)}${sum}`;
      }
      return total;
    }, '');
  });
}
