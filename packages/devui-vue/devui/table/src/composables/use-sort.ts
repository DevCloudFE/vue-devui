import type { ComponentInternalInstance, Ref } from 'vue';
import { SortDirection, SortMethod } from '../components/column/column-types';
import { UseSort } from './use-table-types';

export function useSort<T extends Record<string, unknown>>(dataSource: Ref<T[]>, _data: Ref<T[]>): UseSort<T> {
  const thList: ComponentInternalInstance[] = [];

  const sortData = (direction: SortDirection, sortMethod: SortMethod<T> | undefined) => {
    if (direction === 'ASC') {
      _data.value = _data.value.sort((a, b) => (sortMethod ? (sortMethod(a, b) ? 1 : -1) : 0));
    } else if (direction === 'DESC') {
      _data.value = _data.value.sort((a, b) => (sortMethod ? (sortMethod(a, b) ? -1 : 1) : 0));
    } else {
      _data.value = [...dataSource.value];
    }
  };

  const collectTh = (th: ComponentInternalInstance) => {
    thList.push(th);
  };

  return { thList, collectTh, sortData };
}
