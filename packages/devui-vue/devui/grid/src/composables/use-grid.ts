import { computed, ComputedRef } from 'vue';
import { ScreenSizes, ColPropsBaseClass, screenSizes, colPropsBaseClass } from '../grid-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';

const colNs = useNamespace('col');

export function useColClassNames(props: ColPropsBaseClass): ComputedRef<Record<string, boolean>> {
  return computed<Record<string, boolean>>(() => ({
    [colNs.em('span', props.span ? String(props.span) : '')]: true,
    [colNs.em('offset', props.offset ? String(props.offset) : '')]: true,
    [colNs.em('pull', props.pull ? String(props.pull) : '')]: true,
    [colNs.em('push', props.push ? String(props.push) : '')]: true,
  }));
}

function setSpace(val: string) {
  return ` ${val.trim()}${val && ' '}`;
}

export function useSize(colSizes: ScreenSizes): ComputedRef<string> {
  const keys = Object.keys(colSizes).filter((key) => key in screenSizes) as (keyof ScreenSizes)[];
  return computed<string>(() => {
    return keys.reduce((total, key) => {
      const valueType = typeof colSizes[key];

      if (valueType === 'number') {
        total = `${setSpace(total)}${colNs.em(key, `span-${colSizes[key]}`)}`;
      } else if (valueType === 'object') {
        const colSizesKeys = Object.keys(colSizes[key] as ColPropsBaseClass);
        const sum = colSizesKeys
          .filter((item) => item in colPropsBaseClass)
          .reduce((tot, k) => {
            const baseClass =  colSizes[key] as ColPropsBaseClass;
            const _class = baseClass[k as keyof ColPropsBaseClass];
            if (typeof _class !== 'number') {
              return '';
            } else {
              tot = `${setSpace(tot)}${colNs.em(key, `${k}-${_class}`)}`;
            }
            return tot;
          }, '');
        total = `${setSpace(total)}${sum}`;
      }
      return total;
    }, '');
  });
}
