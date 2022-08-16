import { ITableInstanceAndDefaultRow } from '../table-types';
import { UseHorizontalScroll } from './use-table-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';

export function useHorizontalScroll(table: ITableInstanceAndDefaultRow): UseHorizontalScroll {
  const ns = useNamespace('table');

  const setScrollViewClass = (position: string) => {
    const element = table.vnode.el as HTMLElement;
    const className = ns.m(`scroll-${position}`);
    const elClassList = element.classList;
    if (!elClassList.contains(className)) {
      for (let i = 0; i < elClassList.length; i++) {
        const clName = elClassList[i];
        if (clName.startsWith(ns.m('scroll-'))) {
          elClassList.remove(clName);
        }
      }
      elClassList.add(className);
    }
  };

  const onTableScroll = (e: Event) => {
    const target = e.currentTarget as HTMLElement;
    const scrollLeft = target.scrollLeft;
    if (scrollLeft === 0) {
      if (target.clientWidth === target.scrollWidth) {
        setScrollViewClass('none');
      } else {
        setScrollViewClass('left');
      }
    } else if (scrollLeft + target.clientWidth === target.scrollWidth) {
      setScrollViewClass('right');
    } else {
      setScrollViewClass('middle');
    }
  };

  return { onTableScroll };
}
