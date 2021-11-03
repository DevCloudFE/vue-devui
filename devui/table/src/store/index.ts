import { watch, Ref, ref, customRef } from 'vue';
import { Column } from '../column/column.type';

export interface TableStore<T = Record<string, any>> {
  insertColumn(column: Column): void
  states: {
    _data: Ref<T[]>
    _columns: Ref<Column[]>
    _checkAll: Ref<boolean>
    _checkList: Ref<boolean[]>
  }
}

export function createStore<T>(dataSource: Ref<T[]>): TableStore<T> {
  const _data: Ref<T[]> = ref([]);
  const _columns: Ref<Column[]> = ref([]);
  const _checkList: Ref<boolean[]> = ref([]);
  const _checkAllRecord: Ref<boolean> = ref(false);
  const _checkAll: Ref<boolean> = customRef((track, trigger) => {
    return {
      get: () => {
        track();
        return _checkAllRecord.value;
      },
      set: (val: boolean) => {
        _checkAllRecord.value = val;
        // 只有在 set 的时候变更 _checkList 的数据
        for (let i = 0; i < _checkList.value.length; i++) {
          _checkList.value[i] = val;
        }
        trigger();
      }
    }
  });

  watch(dataSource, (value: T[]) => {
    _data.value = [...value];
    _checkList.value = new Array(value.length).fill(false);
  }, { deep: true, immediate: true });

  // // checkList 只有全为true的时候，
  // watch(_checkList, (list) => {
  //   let allFalse
  //   let allTrue = false;
  //   for (let i = 0; i < list.length; i++) {
  //     current &&= list[i];
  //   }
  //   if (status === 1) {
  //     _checkAllRecord.value = current;
  //   }
  // }, { immediate: true, deep: true });

  const insertColumn = (column: Column) => {
    _columns.value.push(column);
  };

  return {
    insertColumn,
    states: {
      _data,
      _columns,
      _checkList,
      _checkAll
    },
  };
}